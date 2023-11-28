import { useContext, useState } from "react";
import { JobPositionsContext } from "../../contexts/JobPositionsContext";
import { useForm } from "../../hooks/useForm";
import { Spinner } from "../../components/Spinner";
import { AlertDelete } from "../../components/AlertDelete";
import { ShowErrors } from "../../components/ShowErrors";

import toast from "react-hot-toast";


export const JobPositionsIndex = () => {
  const { jobPositions, error, loading, updateJobPosition, storeJobPosition, deleteJobPosition } =
    useContext(JobPositionsContext);

  const [validationErrors, setValidationErrors] = useState([]);
  const [disable, setDisable] = useState(false);
  const {
    form: jobPosition,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    id: "",
    position: "",
    observations: "",
  });

  const showEditModal = ({ target }) => {
    const jposition = jobPositions.find(
      (jposition) => jposition.id == target.dataset.id
    );
    console.log(jposition);
    setForm({
      id: jposition.id,
      position: jposition.position,
      observations: jposition.observations,
    });
    document.querySelector("#btnCreate").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setValidationErrors([]);
    try {
      if (jobPosition.id != "") {
        await updateJobPosition(jobPosition, jobPosition.id);
        toast.success("Puesto Laboral actualizado con éxito");
      } else {
        await storeJobPosition(jobPosition);
        toast.success("Puesto Laboral creado con éxito");
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

  const handleDeleteJobPosition = ({ target }) => {
    const id = target.dataset.id;

    AlertDelete(() => {
      deleteJobPosition(id);
    });
  };

  return (
    <>
      <div className="container-fluid py-5 px-md-5 col">
        <header className="d-flex align-items-center justify-content-between">
          <h1>Listado de Puestos Laborales</h1>
          <div>
            <button
              id="btnCreate"
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#modalJobPositionCreate"
            >
              Nuevo Puesto Laboral
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
                  placeholder="Nombre del Puesto Laboral"
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
                  <th scope="col">Nombre Puesto Laboral</th>
                  <th scope="col">Observaciones</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="text-center" colSpan={4}>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {jobPositions && jobPositions.length == 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No hay categorías registradas aún.
                    </td>
                  </tr>
                )}

                {jobPositions &&
                  jobPositions.length != 0 &&
                  jobPositions &&
                  jobPositions.map((jobPosition, index) => {
                    return (
                      <tr key={`jobPosition-item-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td className="w-25 text-nowrap ">
                          {jobPosition.position}
                        </td>
                        <td className="w-50">{jobPosition.observations}</td>
                        <td className="w-25 ">
                          <div className="d-flex gap-2 flex-column flex-md-row justify-content-center ">
                            <button
                              onClick={showEditModal}
                              data-id={jobPosition.id}
                              className="btn btn-outline-success"
                            >
                              Editar
                            </button>
                            <button
                              onClick={handleDeleteJobPosition}
                              data-id={jobPosition.id}
                              className="btn btn-outline-danger"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                {error && (
                  <tr>
                    <td colSpan={8} className="text-center text-danger ">
                      {error.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="modalJobPositionCreate"
        tabIndex="-1"
        aria-labelledby="modalJobPositionCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            onSubmit={handleSubmit}
            id="createEditJobPositionForm"
            className="modal-content"
          >
            <div className="modal-header">
            <div className="d-flex flex-column ">
              <h1 className="modal-title fs-5" id="modalJobPositionCreateLabel">
                Nuevo Puesto Laboral
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
                  <label htmlFor="position" className="form-label">
                    Nombre de Puesto Laboral
                    <small className=" text-danger">(*)</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={jobPosition.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="position" className="form-label">
                    Observaciones
                  </label>
                  <textarea
                    className="form-control"
                    onChange={handleInputChange}
                    id="observations"
                    name="observations"
                    rows="5"
                    value={jobPosition.observations}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCancel"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
