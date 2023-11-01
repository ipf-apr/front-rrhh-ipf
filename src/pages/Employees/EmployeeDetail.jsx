import { useParams } from "react-router-dom";
import { EmployeeCategory } from "./components/EmployeeCategory";
import { EmployeeJobPosition } from "./components/EmployeeJobPosition";
import { EmployeeSkills } from "./components/EmployeeSkills";

export const EmployeeDetail = () => {
  const { employeeId } = useParams();

  // const { data, loading, error } = usePromise();
  
  return (
    <>
      <div className="container p-5 col">
        <div className="col rounded shadow p-3">
          <a
            className="btn btn-outline-success relative float-end"
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
          <EmployeeCategory />
          <EmployeeJobPosition />
          <EmployeeSkills />
        </div>
      </div>
    </>
  );
};
