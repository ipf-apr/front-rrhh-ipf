import { Link, useSearchParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { useContext, useEffect, useState } from "react";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { formatDate } from "../../helpers/formatDate";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

import { AlertDelete } from "../../components/AlertDelete";

export const Employees = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { employees, loading, error, searchEmployees, deleteEmployee } =
    useContext(EmployeesContext);

  const { isAdmin } = useContext(AuthContext);

  const [isSearch, setIsSearch] = useState(false);

  const { form: search, handleInputChange, reset, setForm } = useForm({});

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.lastName || search.name || search.promotion) {
      setSearchParams(search);
      searchEmployees(search);
      setIsSearch(true);
    }
  };

  const handleReset = () => {
    reset();
    setIsSearch(false);
    setSearchParams();
    searchEmployees();
  };

  const handleDeleteEmployee = ({target}) => {
    const employeeId = target.dataset.id;
    AlertDelete(() => {
      deleteEmployee(employeeId)
    });
  };

  return (
    <div className="row">
      <header className="d-sm-flex align-items-center justify-content-between">
        <h1>Listado de Empleados</h1>
        <div className="d-sm-flex float-end  gap-1">
          <Link className="btn btn-outline-success" to="/employees/create">
            Nuevo Empleado
          </Link>
          <a
            className="btn btn-outline-primary"
            data-bs-toggle="collapse"
            href="#collapseSearch"
            role="button"
            aria-expanded="false"
            aria-controls="collapseSearch"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </a>
        </div>
      </header>
      <main className="col">
        <div className="collapse" id="collapseSearch">
          <div className="card card-body mt-2">
            <form onSubmit={handleSubmitSearch} id="formSearch" className="row">
              <div className="d-flex flex-column flex-sm-row gap-2">
                <input
                  placeholder="Apellidos"
                  className="form-control"
                  type="search"
                  name="lastName"
                  id="sLastName"
                  value={search.lastName ?? ""}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="Nombres"
                  className="form-control"
                  type="search"
                  name="name"
                  id="sName"
                  value={search.name ?? ""}
                  onChange={handleInputChange}
                />
                <select
                  className="form-select"
                  name="promotion"
                  id="sPromotion"
                  onChange={handleInputChange}
                  value={search.promotion ?? ""}
                >
                  <option defaultValue="">
                    --Seleccionar Condición Promoción--
                  </option>
                  <option value="1">Habilitado</option>
                  <option value="0">Inhabilitado</option>
                </select>
              </div>
              <div className="d-flex flex-row m-2  justify-content-end gap-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary align-items-end"
                >
                  <span className="mx-1">Buscar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
                <button
                  role="button"
                  onClick={handleReset}
                  id="btnCleanSearch"
                  className="btn btn-outline-danger align-items-end"
                >
                  <span className="mx-1">Limpiar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Nombres</th>
                <th scope="col">Edad</th>
                <th scope="col">Categoría</th>
                <th scope="col">Fecha Promoción</th>
                <th scope="col">Condición de ascenso Actual</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="text-center" colSpan={8}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {employees && employees.length == 0 && !loading && (
                <tr>
                  <td colSpan={8} className="text-center">
                    {isSearch
                      ? "No se hallaron resultados con los parámetros ingresados."
                      : "No hay empleados registrados aún."}
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={8} className="text-center text-danger ">
                    {error.message}
                  </td>
                </tr>
              )}

              {employees &&
                employees.length != 0 &&
                employees &&
                employees.map((employee, index) => {
                  let date;
                  let categoryName = "No asignado";
                  if (employee.Categories) {
                    const dateIn =
                      employee?.Categories[0]?.CategoryEmployee.datePromotion;
                    date = formatDate(dateIn);
                    categoryName =
                      employee.Categories[0]?.name ?? "No asignado";
                  }

                  return (
                    <tr key={employee.id}>
                      <th scope="row">
                        <div className="d-flex justify-content-center " style={{ height: 50, width: 50 }}>
                          <img
                            style={{ objectFit: "cover",  height: 50  }}
                            className="rounded img-fluid"
                            src={employee.imageUrl}
                          />
                        </div>
                      </th>
                      <td>{employee.lastName}</td>
                      <td>{employee.name}</td>
                      <td>{employee.age}</td>
                      <td>{categoryName}</td>
                      <td>{date ?? "-"}</td>
                      <td>
                        {employee.promotion ? "Habilitado" : " Inhabilitado"}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Link
                            to={`/employees/${employee.id}/edit`}
                            className="btn btn-outline-success"
                          >
                            Editar
                          </Link>
                          <Link
                            to={`/employees/${employee.id}/show`}
                            className="btn btn-outline-primary"
                          >
                            Ver
                          </Link>
                          {isAdmin() && (
                            <button
                              data-id={employee.id}
                              onClick={handleDeleteEmployee}
                              className="btn btn-outline-danger"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
