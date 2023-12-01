import { Link, useSearchParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { formatDate } from "../../helpers/formatDate";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

import { AlertDelete } from "../../components/AlertDelete";
import { SelectJobPosition } from "../../components/SelectJobPosition";
import { SelectCategory } from "../../components/SelectCategory";
import { SelectSkill } from "../../components/selectSkill";

import { useReactToPrint } from "react-to-print";
import { toast } from "react-hot-toast";
import { showGender } from "../../helpers/showGender";

export const Employees = () => {
  const { employees, loading, error, searchEmployees, deleteEmployee } =
    useContext(EmployeesContext);
  const [searchParams, setSearchParams] = useSearchParams();


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Listado de Empleados",
    bodyClass: "m-2",
    suppressErrors: true,
    pageStyle: "width: 100vw",
    removeAfterPrint: true,
    copyStyles: true,
    onAfterPrint: (event) => {
      toast.success("Se ha impreso correctamente el listado de empleados.");
    },
  });

  const { isAdmin } = useContext(AuthContext);

  const [isSearch, setIsSearch] = useState(false);
  const [jobName, setJobName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [skillName, setSkillName] = useState("");

  const { form: search, handleInputChange, reset, setForm } = useForm({});

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search) {
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

  const handleDeleteEmployee = ({ target }) => {
    const employeeId = target.dataset.id;
    AlertDelete(() => {
      deleteEmployee(employeeId);
    });
  };

  return (
    <div ref={componentRef} className="row ">
      <header className="d-sm-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center  gap-2">
          <div className="d-flex flex-column ">
            <h1>Listado de Empleados</h1>
          </div>
          <div>
            <button
              className="btn btn-outline-primary  d-print-none"
              onClick={handlePrint}
            >
              Imprimir
            </button>
          </div>
        </div>
        <div className="d-sm-flex float-end  gap-1 d-print-none ">
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
        <ul className="d-print-flex flex-column d-none ">
          {search && <p>Filtros aplicados:</p>}
          {search && search.lastName && (
            <li>
              <small>Apellidos: {search.lastName}</small>
            </li>
          )}
          {search && search.name && (
            <li>
              <small>Nombres: {search.name}</small>
            </li>
          )}
          {search && search.dni && (
            <li>
              <small>Nro. de documento: {search.dni}</small>
            </li>
          )}
          {search && search.promotion && (
            <li>
              <small className="mx-1">
                Condición de ascenso:
                {search.promotion == 1 ? "Habilitado" : "Inhabilitado"}
              </small>
            </li>
          )}
          {search && search.gender && (
            <li>
              <small className="mx-1">
                Género:
                {showGender(search.gender)}
              </small>
            </li>
          )}
          {search && search.selectedJobPosition && (
            <li>
              <small>Puesto laboral: {jobName}</small>
            </li>
          )}
          {search && search.selectedCategory && (
            <li>
              <small>Categoría: {categoryName}</small>
            </li>
          )}
          {search && search.selectedSkill && (
            <li>
              <small>Habilidad: {skillName}</small>
            </li>
          )}
        </ul>
        <div className="collapse d-print-none " id="collapseSearch">
          <div className="card mt-2">
            <form onSubmit={handleSubmitSearch} id="formSearch">
              <div className="d-flex flex-column  flex-md-row flex-md-wrap gap-2 card-body ">
                <div className="">
                  <input
                    placeholder="Apellidos"
                    className="form-control"
                    type="search"
                    name="lastName"
                    id="sLastName"
                    value={search.lastName ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <input
                    placeholder="Nombres"
                    className="form-control"
                    type="search"
                    name="name"
                    id="sName"
                    value={search.name ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <input
                    placeholder="DNI"
                    className="form-control"
                    type="search"
                    name="dni"
                    id="sDni"
                    value={search.dni ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <select
                    className="form-select"
                    name="promotion"
                    id="sPromotion"
                    onChange={handleInputChange}
                    value={search.promotion ?? ""}
                  >
                    <option defaultValue="">
                      -- Seleccionar Condición Promoción --
                    </option>
                    <option value="1">Habilitado</option>
                    <option value="0">Inhabilitado</option>
                  </select>
                </div>
                <div>
                  <select
                    className="form-select"
                    name="gender"
                    id="sGender"
                    onChange={handleInputChange}
                    value={search.gender ?? ""}
                  >
                    <option defaultValue="">-- Seleccionar Género --</option>
                    <option value="f">Femenino</option>
                    <option value="m">Masculino</option>
                    <option value="x">No Binario</option>
                    <option value="o">Otro</option>
                  </select>
                </div>

                <div className="">
                  <SelectJobPosition
                    handleInputChange={handleInputChange}
                    setJobName={setJobName}
                    value={search.selectedJobPosition ?? ""}
                  />
                </div>
                <div className="">
                  <SelectCategory
                    handleInputChange={handleInputChange}
                    setCategoryName={setCategoryName}
                    value={search.selectedCategory ?? ""}
                  />
                </div>
                <div className="">
                  <SelectSkill
                    handleInputChange={handleInputChange}
                    setSkillName={setSkillName}
                    value={search.selectedSkill ?? ""}
                  />
                </div>
              </div>
              <div className="card-footer  d-flex flex-row m-2  justify-content-end gap-2">
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
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Apellidos y Nombres</th>
              <th scope="col">Edad</th>
              <th scope="col">Género</th>
              <th scope="col">Categoría</th>
              <th scope="col">Fecha Promoción</th>
              <th scope="col">Condición</th>
              <th scope="col" className="d-print-none ">
                Acciones
              </th>
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
                  categoryName = employee.Categories[0]?.name ?? "No asignado";
                }
                return (
                  <tr key={employee.id}>
                    <th scope="row">
                      <div
                        className="d-flex justify-content-center "
                        style={{ height: 50, width: 50 }}
                      >
                        <img
                          style={{ objectFit: "cover", height: 50 }}
                          className="rounded img-fluid"
                          src={employee.imageUrl}
                        />
                      </div>
                    </th>
                    <td>{employee.fullName}</td>
                    <td className="text-nowrap">{employee.age}</td>
                    <td className="text-nowrap">
                      {showGender(employee.gender)}
                    </td>
                    <td className="text-nowrap">{categoryName}</td>
                    <td>{date ?? "-"}</td>
                    <td>
                      {employee.promotion ? "Habilitado" : " Inhabilitado"}
                    </td>
                    <td className="d-print-none ">
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
      </main>
    </div>
  );
};
