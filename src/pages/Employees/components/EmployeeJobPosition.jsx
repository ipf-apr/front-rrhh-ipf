import { useCallback, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { usePromise } from "../../../hooks/usePromise";
import { fetchEmployeeJobPositions } from "../../../services/local/employees/jobPositions";
import { fetchJobPositions } from "../../../services/local/jobPositions";
import { apiStoreEmployeeJobPosition } from "../../../services/local/employees/jobPositions/store";
import { Spinner } from "../../../components/Spinner";

export const EmployeeJobPosition = ({ employeeId }) => {
  const [validationErrors, setValidationErrors] = useState(null);

  const {
    data: allJobPositions,
    error,
    loading: loadingJobPositions,
  } = usePromise(fetchJobPositions);

  const {
    data: employeeJobPositions,
    error: employeeJobPositionError,
    loading: loadingEmployeeJobPosition,
    mutateData,
  } = usePromise(
    useCallback(() => fetchEmployeeJobPositions(employeeId), [employeeId])
  );

  const {
    form: jobPosition,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    selectedJobPosition: "",
  });

  const addJobPositionToEmployee = async (e) => {
    e.preventDefault();
    try {
      const jobPositionId = jobPosition?.selectedJobPosition;
      const jobPositionAlready = employeeJobPositions?.find(
        (jobPosition) => jobPosition.selectedJobPosition == jobPositionId
      );
      console.log(jobPositionId);
      if (!jobPositionAlready) {
        if (jobPositionId) {
          const data = await apiStoreEmployeeJobPosition(
            employeeId,
            jobPositionId
          );
          console.log(data);
          if (data.employeeJobPosition) {
            const jobPosition = allJobPositions.find(
              (jobPosition) => jobPosition.id == jobPositionId
            );
            if (!employeeJobPositions && employeeJobPositions.length === 0) {
              return mutateData([jobPosition]);
            }
            document.querySelector("#btnCancelSaveJobPosition").click();
            document.querySelector("#btnCancelSaveJobPosition").blur();
            return mutateData([...employeeJobPositions, jobPosition]);
          } else {
            return setValidationErrors(data.message);
          }
        }
      }
      return setValidationErrors(
        "La categoría ya fue agregada a este empleado."
      );
    } catch (error) {
      console.log(error);
      setValidationErrors(error);
    }
  };
  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Puestos laborales:</strong>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalAddJobPositionToEmployee"
          >
            +
          </button>
        </div>
        <ul className="mx-3">
          {loadingEmployeeJobPosition && <Spinner />}
          {employeeJobPositions && employeeJobPositions.length > 0 ? (
            employeeJobPositions.map((jobPosition, index) => {
              return (
                <li key={`jobPosition-employee-${jobPosition.id}`}>
                  <span className={index == 0 ? 'text-primary fw-bold ' : '' }>  {jobPosition.position} { index == 0 ? '- Actual' : ' - Anterior'}</span>
                </li>
              );
            })
          ) : (
            <li>Este empleado no tiene puestos laborales registrados.</li>
          )}
        </ul>
      </div>
      {/* Modal AddJobPositionToEmployee */}
      <div
        className="modal fade"
        id="modalAddJobPositionToEmployee"
        tabIndex="-1"
        aria-labelledby="modalAddJobPositionToEmployeeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            onSubmit={addJobPositionToEmployee}
            id="formAddJobPositionToEmployee"
            className="modal-content"
          >
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="modalAddJobPositionToEmployeeLabel"
              >
                Agregar Puesto a Empleado
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <input type="hidden" id="isCreating" />
                <div id="validationErrorsAddJobPositions"></div>
                <div className="col-12">
                  <label htmlFor="selectJobPosition" className="form-label">
                    Puestos Laborales<small className=" text-danger">(*)</small>
                  </label>
                  <select
                    className="form-select"
                    name="selectedJobPosition"
                    id="selectedJobPosition"
                    onChange={handleInputChange}
                    defaultValue={""}
                  >
                    <option value="">-- Seleccione --</option>
                    {allJobPositions &&
                      allJobPositions.map((jobPosition) => {
                        return (
                          <option
                            key={`job-position-all-${jobPosition.id}`}
                            value={jobPosition.id}
                          >
                            {jobPosition.position}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="btnCancelSaveJobPosition"
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
