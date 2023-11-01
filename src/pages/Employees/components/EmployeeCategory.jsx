export const EmployeeCategory = () => {
  const addCategoryToEmployee = () => {};
  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Categorías:</strong>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalAddCategoryToEmployee"
          >
            +
          </button>
        </div>
        <div className="mx-3" id="categories">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      </div>
      {/* Modal AddCategoryToEmployee */}
      <div
        className="modal fade"
        id="modalAddCategoryToEmployee"
        tabIndex="-1"
        aria-labelledby="modalAddCategoryToEmployeeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form id="formAddCategoryToEmployee" className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="modalAddCategoryToEmployeeLabel"
              >
                Nueva Categoría de Empleado
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
                <div id="validationErrorsAddCategories"></div>
                <div className="col-12">
                  <label htmlFor="selectCategories" className="form-label">
                    Categoría de Empleado
                    <small className=" text-danger">(*)</small>
                  </label>
                  <select
                    className="form-select"
                    name="selectCategories"
                    id="selectCategories"
                  ></select>
                </div>
                <div className="col-12">
                  <label htmlFor="datePromotion" className="form-label">
                    Año de promoción<small className=" text-danger">(*)</small>
                  </label>
                  <input
                    className="form-control"
                    id="datePromotion"
                    type="date"
                  />
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
