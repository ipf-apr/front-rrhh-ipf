import { useContext, useState } from "react";
import { SkillsContext } from "../../contexts/SkillsContext";
import { useForm } from "../../hooks/useForm";
import { Spinner } from "../../components/Spinner";
import { ShowErrors } from "../../components/ShowErrors";
import { AlertDelete } from "../../components/AlertDelete";

import toast from "react-hot-toast";


export const SkillsIndex = () => {
  const { skills, error, loading, storeSkill, updateSkill, deleteSkill } =
    useContext(SkillsContext);
  const [validationErrors, setValidationErrors] = useState([]);
  const [disable, setDisable] = useState(false);

  const {
    form: skill,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    id: "",
    nameSkill: "",
  });

  const showEditModal = ({ target }) => {
    const sk = skills.find((skill) => skill.id == target.dataset.id);
    setForm({ id: sk.id, nameSkill: sk.nameSkill });
    const btnCreate = document.querySelector("#btnCreate");
    btnCreate.click();
    btnCreate.blur();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setValidationErrors([]);
    try {
      if (skill.id != "") {
        await updateSkill(skill, skill.id);
        toast.success("Habilidad actualizada con éxito");
      } else {
        await storeSkill(skill);
        toast.success("Habilidad creada con éxito");
      }

      setDisable(false);
      reset();
      document.querySelector("#btnCancel").click();
    } catch (error) {
      setDisable(false);
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);
        return;
      }
      console.log(error);
    }
  };

  const handleDeleteSkill = async ({ target }) => {
    const id = target.dataset.id;

    AlertDelete(() => {
      deleteSkill(id);
    });
  };

  return (
    <>
      <div className="row py-5 px-md-5">
        <header className="d-sm-flex align-items-center justify-content-between">
          <h1>Listado de Habilidades de Empleados</h1>
          <div className="float-end">
            <button
              id="btnCreate"
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#modalSkillCreate"
            >
              Nueva Habilidad
            </button>
           
          </div>
        </header>
        <main className="col">
          
          <div className="overflow-auto">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Habilidad</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="text-center" colSpan={3}>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={8} className="text-center text-danger ">
                      {error.message}
                    </td>
                  </tr>
                )}
                {skills && skills.length == 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No hay habilidades registradas aún.
                    </td>
                  </tr>
                )}
                {skills &&
                  skills.length != 0 &&
                  skills &&
                  skills.map((skill, index) => {
                    return (
                      <tr key={`skill-item-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td className="w-50 ">{skill.nameSkill}</td>
                        <td className="w-25 ">
                          <div className="d-flex gap-2 flex-column flex-md-row justify-content-center ">
                            <button
                              data-id={skill.id}
                              className="btn btn-outline-success"
                              onClick={showEditModal}
                            >
                              Editar
                            </button>
                            <button
                              data-id={skill.id}
                              onClick={handleDeleteSkill}
                              className="btn btn-outline-danger"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        data-backdrop="static"
        data-keyboard="false"
        id="modalSkillCreate"
        tabIndex="-1"
        aria-labelledby="modalSkillCreateLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
         
        >
          <form
            onSubmit={handleSubmit}
            id="createEditSkillForm"
            className="modal-content"
          >
            <div className="modal-header">
              <div className="d-flex flex-column ">
                <h1 className="modal-title fs-5" id="modalSkillCreateLabel">
                  Nueva Habilidad
                </h1>
                {validationErrors.length != 0 && (
                  <ShowErrors errors={validationErrors} />
                )}
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3 needs-validation">
                <div className="col-12">
                  <label htmlFor="nameSkill" className="form-label">
                    Nombre de Habilidad de Empleado
                    <small className=" text-danger">(*)</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameSkill"
                    name="nameSkill"
                    value={skill.nameSkill}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="btnCancel"
                onClick={reset}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
