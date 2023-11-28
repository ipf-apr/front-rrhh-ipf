import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { EmployeeCategory } from "./components/EmployeeCategory";
import { EmployeeJobPosition } from "./components/EmployeeJobPosition";
import { EmployeeSkills } from "./components/EmployeeSkills";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { Spinner } from "../../components/Spinner";
import { formatDate } from "../../helpers/formatDate";

import toast from "react-hot-toast";

export const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const location = useLocation();

  const [employee, setEmployee] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  const { employees, showEmployee } = useContext(EmployeesContext);

  useEffect(() => {
    const emp = showEmployee(employeeId);
    if (emp && location.state?.from === "edit") {
      setTimeout(() => {
        toast.success("Empleado se editó correctamente!", {
          ariaProps: {
            role: "alert",
          },
        });
      }, 1000);
    }
    setEmployee(emp);
  }, [employees]);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {employee ? (
        <div className="d-block d-md-flex gap-2">
          <div className="col rounded shadow p-3">
            <Link
              to={`/employees/${employeeId}/edit`}
              className="btn btn-outline-success relative float-end"
            >
              Editar
            </Link>
            <div style={{ height: 200, width: 200 }}>
              {!imageLoaded && (
                <div className="d-flex align-items-center justify-content-center ">
                  <Spinner />
                </div>
              )}
              <img
                className="rounded img-fluid"
                src={employee.imageUrl}
                onLoad={handleImageLoaded.bind(this)}
              />
            </div>
            <div className="d-flex fs-6">
              <span id="fullName" className="fs-2">
                {employee.fullName}
              </span>
            </div>
            <div className="d-flex fs-6">
              <strong>Nro. documento:</strong>
              <p className="mx-3">{employee?.dni}</p>
            </div>
            <div className="d-flex">
              <strong>Nro. Legajo:</strong>
              <p className="mx-3" id="profileNro">
                {employee?.profileNro}
              </p>
            </div>
            <div className="d-flex">
              <strong>Edad:</strong>
              <p className="mx-3" id="age">
                {employee?.age}
              </p>
            </div>
            <div className="d-flex">
              <strong>Domicilio:</strong>
              <p className="mx-3" id="address">
                {employee?.address}
              </p>
            </div>
            <div className="d-flex">
              <strong>Teléfono:</strong>
              <p className="mx-3" id="phone">
                {employee?.phone}
              </p>
            </div>
            <div className="d-flex">
              <strong>Año Ingreso:</strong>
              <p className="mx-3" id="dateIn">
                {formatDate(employee.dateIn)}
              </p>
            </div>
            <div className="d-flex">
              <strong>Antigüedad:</strong>
              <p className="mx-3" id="antiquity">
                {employee?.antiquity}
              </p>
            </div>
            <div className="d-flex">
              <strong>Condición de promoción:</strong>
              <p className="mx-3" id="promotion">
                {employee?.promotion ? "Habilitado" : "Inhabilitado"}
              </p>
            </div>
          </div>
          <div className="col mt-2">
            <EmployeeCategory employeeId={employeeId} />
            <EmployeeJobPosition employeeId={employeeId} />
            <EmployeeSkills employeeId={employeeId} />
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center ">
          <span>
            Cargando.. <Spinner size={"small"} />
          </span>
        </div>
      )}
    </>
  );
};
