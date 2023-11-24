export const EmployeeSkills = () => {
  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Habilidades / Skills:</strong>
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalSkillCreate"
          >
            +
          </button>
        </div>
        <ul className="mx-3">
          <li>Este empleado no tiene habilidades registradas.</li>
        </ul>
      </div>

      {/* Modal AddSkillsToEmployee */}
      <div
        className="modal fade"
        id="modalSkillCreate"
        tabIndex="-1"
        aria-labelledby="modalSkillCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalSkillCreateLabel">
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
                    Seleccionar una Habilidad<small className=" text-danger">(*)</small>
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
