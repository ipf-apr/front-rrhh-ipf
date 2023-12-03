import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "../../components/Spinner";

import { usePromise } from "../../hooks/usePromise";
import { fetchDashboard } from "../../services/local/dashboard";
import { formatDate } from "../../helpers/formatDate";
import { showGender } from "../../helpers/showGender";
import { ShowErrors } from "../../components/ShowErrors";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const { data, error, loading } = usePromise(fetchDashboard);

  const navigate = useNavigate();

  const handleNavigateToEmployeesBy = (url) => () => {
    navigate(url);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Resumen actual Empleados",
    bodyClass: "m-2",
    suppressErrors: true,
    pageStyle: "width: 100vw",
    removeAfterPrint: true,
    copyStyles: true,
    onAfterPrint: (event) => {
      toast.success("Se ha impreso correctamente el resumen de empleados.");
    },
  });

  return (
    <div  className="container-fluid py-5 px-md-5 col">
      <header className="d-flex align-items-center justify-content-between">
        <h1>Página de inicio</h1>
        <div>
          <button
            className="btn btn-outline-primary d-print-none"
            onClick={handlePrint}
          >
            Imprimir
          </button>
        </div>
        <ShowErrors errors={error} />
      </header>
      <main ref={componentRef} className="row h-100">
        <div className="col-md-6 h-100">
          {loading ? (
            <div className="d-flex justify-content-center w-100 ">
              <Spinner />
            </div>
          ) : (
            <div className="card m-1">
              <div className="card-header d-flex align-items-center gap-3">
                <h3 className="card-title">Ultimos Empleados </h3>
                <span className="badge bg-danger ">6 Empleados</span>
              </div>
              <div className="card-body p-2">
                <ul className="list-unstyled d-flex flex-wrap justify-content-evenly  gap-3">
                  {!loading &&
                    data &&
                    data.lastsEmployees?.map((employee) => {
                      return (
                        <li
                          style={{ width: "150px", cursor: "pointer" }}
                          key={`employee-last-five-${employee.id}`}
                          className="text-center border rounded-2 p-2 col-3 shadow"
                          onClick={handleNavigateToEmployeesBy(`/employees/${employee.id}/show`)}
                        >
                       
                            <img
                              style={{ height: "50px", borderRadius: "50%" }}
                              src={employee.imageUrl}
                              alt={employee.name}
                            />
                            <div className="fs-6 text-truncate">
                              <strong>{employee.name}</strong>
                            </div>
                            <span className="">
                              {formatDate(employee.createdAt)}
                            </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <Link
                className="card-footer text-center text-dark text-decoration-none"
                to="/employees"
              >
                <div className="">Ver todos los empleados</div>
              </Link>
            </div>
          )}
        </div>
        <div className="col-md-6 h-100">
          {loading ? (
            <div className="d-flex justify-content-center w-100 ">
              <Spinner />
            </div>
          ) : (
            <div className="card g- m-1">
              <div className="card-header d-flex align-items-center gap-3 ">
                <h3 className="card-title">Empleados por género </h3>
              </div>
              <div className="card-body p-2">
                <ul className="list-unstyled d-flex flex-wrap justify-content-evenly gap-3">
                  {!loading &&
                    data &&
                    data.employeesByGender?.length > 0 &&
                    data.employeesByGender?.map((employee) => {
                      return (
                        <li
                          key={`employee-by-gender-${employee.gender}`}
                          style={{ cursor: "pointer" }}
                          className="text-center border rounded-2 p-2 col-3 shadow"
                          onClick={handleNavigateToEmployeesBy(
                            `/employees?gender=${employee.gender}`
                          )}
                        >
                          <p className="fs-1 fw-bold">{employee.count}</p>
                          <div className="text-truncate">
                            <small>{showGender(employee.gender)}s</small>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6 h-100"  style={{ pageBreakBefore: "always" }}>
          {loading ? (
            <div className="d-flex justify-content-center w-100 ">
              <Spinner />
            </div>
          ) : (
            <div className="card m-1">
              <div className="card-header d-flex align-items-center gap-3 ">
                <h3 className="card-title">Empleados por Puesto Laboral </h3>
              </div>
              <div className="card-body p-2">
                <ul className="list-unstyled d-flex flex-wrap justify-content-evenly gap-3">
                  {!loading &&
                    data &&
                    data.employeesByJobPosition?.length > 0 &&
                    data.employeesByJobPosition?.map((employee) => {
                      return (
                        <li
                          key={`employee-by-gender-${employee.jobPosition}`}
                          style={{ cursor: "pointer" }}
                          className="text-center border rounded-2 p-2 col-3 shadow"
                          onClick={handleNavigateToEmployeesBy(
                            `/employees?selectedJobPosition=${employee.jobPositionId}`
                          )}
                        >
                          <p className="fs-1 fw-bold">
                            {employee.employeeByJobPosition}
                          </p>
                          <div className="text-truncate">
                            <small>{employee.jobPosition}</small>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6 h-100">
          {loading ? (
            <div className="d-flex justify-content-center w-100 ">
              <Spinner />
            </div>
          ) : (
            <div className="card m-1">
              <div className="card-header d-flex align-items-center gap-3 ">
                <h3 className="card-title">Empleados por Habilidades </h3>
              </div>
              <div className="card-body p-2">
                <ul className="list-unstyled d-flex flex-wrap justify-content-evenly gap-3">
                  {!loading &&
                    data &&
                    data.employeesBySkills?.length > 0 &&
                    data.employeesBySkills?.map((employee) => {
                      return (
                        <li
                          key={`employee-by-gender-${employee.skill}`}
                          style={{ cursor: "pointer" }}
                          className="text-center border rounded-2 p-2 col-3 shadow"
                          onClick={handleNavigateToEmployeesBy(
                            `/employees?selectedSkill=${employee.skillId}`
                          )}
                        >
                          <p className="fs-1 fw-bold">
                            {employee.employeeBySkill}
                          </p>
                          <div>
                            <small>{employee.skill}</small>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
