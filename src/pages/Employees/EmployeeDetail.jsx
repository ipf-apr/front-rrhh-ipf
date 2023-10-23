import { useParams } from "react-router-dom";

export const EmployeeDetail = () => {

    const { employeeId } = useParams();
    console.log(employeeId)

  const addCategoryToEmployee = () => {};
  const addJobPositionToEmployee = () => {};

  
  return (
    <>
      <div className="container p-5 col">
        <div className="col rounded shadow p-3">
          <a
            className="btn btn-outline-success relative float-end"
            id="btnEdit"
          >
            Editar
          </a>
          <div>
            <img className="rounded" src="https://i.pravatar.cc/200" alt="" />
          </div>
          <div className="d-flex fs-6">
            <span id="fullName" className="fs-2"></span>
          </div>
          <div className="d-flex fs-6">
            <strong>Nro. documento:</strong>
            <p className="mx-3" id="dni"></p>
          </div>
          <div className="d-flex">
            <strong>Nro. Legajo:</strong>
            <p className="mx-3" id="profileNro"></p>
          </div>
          <div className="d-flex">
            <strong>Edad:</strong>
            <p className="mx-3" id="age"></p>
          </div>
          <div className="d-flex">
            <strong>Domicilio:</strong>
            <p className="mx-3" id="address"></p>
          </div>
          <div className="d-flex">
            <strong>Teléfono:</strong>
            <p className="mx-3" id="phone"></p>
          </div>
          <div className="d-flex">
            <strong>Año Ingreso:</strong>
            <p className="mx-3" id="dateIn"></p>
          </div>
          <div className="d-flex">
            <strong>Antigüedad:</strong>
            <p className="mx-3" id="antiquity"></p>
          </div>
          <div className="d-flex">
            <strong>Condición de promoción:</strong>
            <p className="mx-3" id="promotion"></p>
          </div>
        </div>
        <div className="col">
          <div className="rounded shadow p-2 mb-2">
            <div className="d-flex justify-content-between align-items-center ">
              <strong>Categorías:</strong>
              <button
                onClick={addCategoryToEmployee}
                data-id="<%= id  %>"
                className="btn btn-success"
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
          <div className="rounded shadow p-2 mb-2">
            <div className="d-flex justify-content-between align-items-center ">
              <strong>Puesto laboral actual:</strong>
              <button
                onClick={addJobPositionToEmployee}
                data-id="<%= id  %>"
                className="btn btn-success"
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
          <div className="rounded shadow p-2 mb-2">
            <strong>Habilidades / Skills: (h)</strong>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalCategoryCreate"
            >
              +
            </button>
            <ul id="listSkills"></ul>
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
      {/* Modal AddCategoryToEmployee */}
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
      {/* Modal AddSkillsToEmployee */}
      <div
        className="modal fade"
        id="modalCategoryCreate"
        tabIndex="-1"
        aria-labelledby="modalCategoryCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalCategoryCreateLabel">
                Habilidades
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" id="formSKills">
              <div className="modal-body">
                <div className="col-12">
                  <label htmlFor="selectSkills" className="form-label">
                    Habilidades<small className=" text-danger">(*)</small>
                  </label>
                  <select
                    className="form-select"
                    name="selectCategories"
                    id="selectSkills"
                  ></select>
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
                <button className="btn btn-secondary" type="reset">
                  Borrar Campos
                </button>
                <button
                  id="btnSaveSkill"
                  type="submit"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
