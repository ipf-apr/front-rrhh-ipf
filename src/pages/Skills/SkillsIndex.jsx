import { useContext, useState } from "react";
import { SkillsContext } from "../../contexts/SkillsContext";
import { useForm } from "../../hooks/useForm";
import { Spinner } from "../../components/Spinner";
import { ShowErrors } from "../../components/ShowErrors";

export const SkillsIndex = () => {
  const { skills, error, loading, storeSkill, updateSkill } =
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
      } else {
        await storeSkill(skill);
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

  return (
    <>
      <div className="container-fluid py-5 px-md-5 col">
        <header className="d-flex align-items-center justify-content-between">
          <h1>Listado de Habilidades de Empleados</h1>
          <div>
            <button
              id="btnCreate"
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#modalSkillCreate"
            >
              Nueva Habilidad
            </button>
            <a
              className="btn btn-outline-primary"
              data-bs-toggle="collapse"
              href="#collapseSearch"
              role="button"
              aria-expanded="false"
              aria-controls="collapseSearch"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </a>
          </div>
        </header>
        <main className="col">
          <div className="collapse" id="collapseSearch">
            <div className="card card-body">
              <form id="formSearch" className="row">
                <input
                  placeholder="Nombre del Habilidad de Empleado"
                  className="form-control col"
                  type="search"
                  name="sName"
                  id="sName"
                />
                <div className="d-flex flex-row m-2  justify-content-end gap-2">
                  <button
                    type="submit"
                    className="btn btn-outline-primary align-items-end"
                  >
                    <span>Buscar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                  <a
                    id="btnCleanSearch"
                    className="btn btn-outline-danger align-items-end"
                  >
                    <span>Limpiar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </a>
                </div>
              </form>
            </div>
          </div>
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
                            <button className="btn btn-outline-danger">
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
        id="modalSkillCreate"
        tabIndex="-1"
        aria-labelledby="modalSkillCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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