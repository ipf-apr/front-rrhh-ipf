import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import { EmployeeCategory } from "./components/EmployeeCategory";
import { EmployeeJobPosition } from "./components/EmployeeJobPosition";
import { EmployeeSkills } from "./components/EmployeeSkills";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { Spinner } from "../../components/Spinner";
import { formatDate } from "../../helpers/formatDate";

import toast from "react-hot-toast";
import { EmployeeAvatar } from "./components/EmployeeAvatar";
import { useReactToPrint } from "react-to-print";

export const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const location = useLocation();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${employee?.fullName} - ${employee?.profileNro} - Ficha de empleado`,
    bodyClass: "m-2",
    suppressErrors: true,
    pageStyle: "width: 100vw",
    removeAfterPrint: true,
    copyStyles: true,
    onAfterPrint: (event) => {
      toast.success("Se ha impreso correctamente el listado de empleados.");
    },
  });


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

  return (
    <>
      {employee ? (
        <div ref={componentRef} className="d-block d-md-flex gap-2">
          <div className="col rounded shadow p-3">
            <button
              className="btn btn-outline-primary relative float-end d-print-none mx-2 "
              onClick={handlePrint}
            >
              Imprimir
            </button>
            <Link
              to={`/employees/${employeeId}/edit`}
              className="btn btn-outline-success relative float-end d-print-none "
            >
              Editar
            </Link>
           <div className="d-flex justify-content-center justify-content-md-start ">
           <EmployeeAvatar employee={employee} />
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
              <strong>Fecha de Nacimiento:</strong>
              <p className="mx-3" id="address">
                {formatDate(employee.dateBirthday)}
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
