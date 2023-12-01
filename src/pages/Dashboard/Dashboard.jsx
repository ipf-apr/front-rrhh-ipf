import { Link } from "react-router-dom";
import { usePromise } from "../../hooks/usePromise";
import { fetchDashboard } from "../../services/local/dashboard";
import { formatDate } from "../../helpers/formatDate";

export const Dashboard = () => {
  const { data, error, loading } = usePromise(fetchDashboard);

  console.log(data);

  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header className="d-flex align-items-center justify-content-between">
        <h1>Página de inicio</h1>
      </header>
      <main className="col h-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex align-items-center gap-3 ">
              <h3 className="card-title">Ultimos Empleados </h3>
              <span className="badge bg-danger ">6 Empleados</span>
            </div>
            <div className="card-body p-2">
              <ul className="list-unstyled d-flex flex-wrap justify-content-evenly  gap-2">
                {!loading &&
                  data.lastsEmployees?.map((employee) => {
                    console.log(employee);
                    return (
                      <li
                        style={{ width: "150px" }}
                        key={`employee-last-five-${employee.id}`}
                        className="text-center col-3"
                      >
                        <Link
                          to={`/employees/${employee.id}/show`}
                          className="text-dark text-decoration-none"
                        >
                          <img
                            style={{ height: "100px", borderRadius: "50%" }}
                            src={employee.imageUrl}
                            alt={employee.name}
                          />
                          <div className="fs-6 text-truncate">
                            <strong>{employee.name}</strong>
                          </div>
                          <span className="">
                            {formatDate(employee.createdAt)}
                          </span>
                        </Link>
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
        </div>
      </main>
    </div>
  );
};
