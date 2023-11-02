import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EmployeeCreate = () => {
  const { storeEmployee } = useContext(EmployeeContext);

  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();

  const {
    form: datos,
    handleInputChange,
    reset,
  } = useForm({
    lastName: "",
    name: "",
    dni: "",
    domicilio: "",
    fechaNac: "",
    phone: "",
    nroLegajo: "",
    ingreso: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    try {
      await storeEmployee(datos);
      reset();
      navigate("/employees");
    } catch (error) {
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);

        return;
      }
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header>
        <h1>Crear Empleado</h1>
        {
          validationErrors.length != 0 && <div>
            <h6 className="text-danger">Mmh se encontraron los siguientes errores de validación:</h6>
            <ul className="text-danger ">
              {validationErrors.map((error, index) => (
                <li key={"employee-validation-" + index}>{error.msg}</li>
              ))}
            </ul>
          </div>
        }
        {/*  */}
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Crear
            </button>
            <button className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </main>
    </div>
  );
};
