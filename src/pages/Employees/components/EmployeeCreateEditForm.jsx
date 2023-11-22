import { Spinner } from "../../../components/Spinner";

export const EmployeeCreateEditForm = ({
  employeeData,
  validationErrors,
  handleSubmit,
  handleInputChange,
  disable,
}) => {
  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header>
        {validationErrors.length != 0 && (
          <div>
            <h6 className="text-danger">
              Mmh se encontraron los siguientes errores de validación:
            </h6>
            <ul className="text-danger ">
              {validationErrors.map((error, index) => (
                <li key={"employee-validation-" + index}>{error.msg}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <main>
        <form id="formNewEmployee" onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <label htmlFor="lastName" className="form-label">
              Apellido <small className="text-danger">(*)</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastName"
              value={employeeData.lastName}
              onChange={handleInputChange}
              placeholder="Ingrese el Apellido"
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Nombres <small className=" text-danger">(*)</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={employeeData.name}
              onChange={handleInputChange}
              placeholder="Ingrese los nombres"
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="dni" className="form-label">
              DNI <small className=" text-danger">(*)</small>
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">Nro</span>
              <input
                type="number"
                className="form-control"
                name="dni"
                id="dni"
                value={employeeData.dni}
                onChange={handleInputChange}
                aria-describedby="inputGroupPrepend"
                placeholder="Ingrese números"
                required
              />
            </div>
          </div>
          <div className="col-md-8">
            <label htmlFor="domicilio" className="form-label">
              Domicilio <small className=" text-danger">(*)</small>
            </label>
            <input
              type="text"
              className="form-control"
              name="domicilio"
              id="domicilio"
              value={employeeData.domicilio}
              onChange={handleInputChange}
              placeholder="Barrio, calle, altura/Mz. Cs."
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="fechaNac" className="form-label">
              Fecha de Nacimiento <small className=" text-danger">(*)</small>
            </label>
            <input
              type="date"
              className="form-control"
              name="fechaNac"
              id="fechaNac"
              value={employeeData.fechaNac}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback"></div>
          </div>
          <div className="col-md-4">
            <label htmlFor="phone" className="form-label">
              Celular <small className=" text-danger">(*)</small>
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">+549</span>
              <input
                type="number"
                className="form-control"
                name="phone"
                id="phone"
                value={employeeData.phone}
                onChange={handleInputChange}
                aria-describedby="inputGroupPrepend"
                placeholder="Ingrese números, sin cero ni quince"
                required
              />
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="nroLegajo" className="form-label">
              Nro. legajo <small className=" text-danger">(*)</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="-"
              name="nroLegajo"
              id="nroLegajo"
              value={employeeData.nroLegajo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="ingreso" className="form-label">
              Fecha de Ingreso<small className=" text-danger">(*)</small>
            </label>
            <input
              type="date"
              className="form-control"
              name="ingreso"
              id="ingreso"
              value={employeeData.ingreso}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex gap-1">
            <button
              disabled={disable}
              className="btn btn-primary"
              type="submit"
            >
              {disable ? (
                <span>
                  Guardando...
                  <Spinner size={"small"} />
                </span>
              ) : (
                <span>Guardar</span>
              )}
            </button>
            <button className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </main>
    </div>
  );
};
