export const EmployeeJobPosition = () => {
  const addJobPositionToEmployee = () => {};
  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Puesto laboral actual:</strong>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalAddJobPositionToEmployee"
          >
            +
          </button>
        </div>
        <div id="jobPosition" className="mx-3">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
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
          <form id="formAddJobPositionToEmployee" className="modal-content">
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
                    name="selectJobPositions"
                    id="selectJobPositions"
                  ></select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
