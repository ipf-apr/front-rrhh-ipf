import { Spinner } from "../../../components/Spinner";
import { ShowErrors } from "../../../components/ShowErrors";
import { useNavigate } from "react-router-dom";

export const EmployeeCreateEditForm = ({
  employeeData,
  validationErrors,
  handleSubmit,
  handleInputChange,
  disable,
}) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header>
        {validationErrors.length != 0 && (
          <ShowErrors errors={validationErrors} />
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
          <div className="col-md-3">
          <label htmlFor="dni" className="form-label">
              Género <small className=" text-danger">(*)</small>
            </label>
            <select
              className="form-select"
              name="gender"
              id="gender"
              onChange={handleInputChange}
              value={employeeData.gender}
            >
              <option value="">-- Seleccionar Género --</option>
              <option value="f">Femenino</option>
              <option value="m">Masculino</option>
              <option value="x">No Binario</option>
              <option value="o">Otro</option>
            </select>
          </div>
          <div className="col-md-5">
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
          <div className="col-md-4">
            <label htmlFor="promotion" className="form-label">
              Condición de Promoción
            </label>
            <div className="d-flex gap-3">
              <label>
                <input
                  type="radio"
                  id="habilitado"
                  name="promotion"
                  value={1}
                  checked={employeeData.promotion == 1}
                  onChange={handleInputChange}
                />
                Habilitado
              </label>
              <label>
                <input
                  type="radio"
                  id="inhabilitado"
                  name="promotion"
                  checked={employeeData.promotion == 0}
                  onChange={handleInputChange}
                  value={0}
                />
                Inhabilitado
              </label>
            </div>
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
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
