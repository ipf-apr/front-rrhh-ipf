import { useEffect, useState } from "react";
import { Spinner } from "../../../components/Spinner";
import { fetchEmployeeCategories } from "../../../services/local/employees/employeeCategory";
import { usePromise } from "../../../hooks/usePromise";
import { fetchCategories } from "../../../services/local/categories";

export const EmployeeCategory = ({ employeeId }) => {


  const {data: allCategories, error, loading: loadingCategories} = usePromise(fetchCategories)

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    try {
      const data = await fetchEmployeeCategories(employeeId);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const addCategoryToEmployee = () => {};

  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Categorías:</strong>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalAddCategoryToEmployee"
          >
            +
          </button>
        </div>
        {loading && <Spinner />}
        <ul className="mx-3">
          {categories.length > 0 ? (
            categories.map((category) => {
              <li key={ `category-employee-${category.id}` }>{category}</li>;
            })
          ) : (
            <li>Este empleado no tiene categorías registradas.</li>
          )}
        </ul>
      </div>
      {/* Modal AddCategoryToEmployee */}
      <div
        className="modal fade"
        id="modalAddCategoryToEmployee"
        tabIndex="-1"
        aria-labelledby="modalAddCategoryToEmployeeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form id="formAddCategoryToEmployee" className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="modalAddCategoryToEmployeeLabel"
              >
                Nueva Categoría de Empleado
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <input type="hidden" id="isCreating" />
                <div id="validationErrorsAddCategories"></div>
                <div className="col-12">
                  <label htmlFor="selectCategories" className="form-label">
                    Categoría de Empleado
                    <small className=" text-danger">(*)</small>
                  </label>
                  <select
                    className="form-select"
                    name="selectCategories"
                    id="selectCategories"
                  >
                    <option value="">-- Seleccione --</option>
                    {
                      allCategories && allCategories.map((category) => {
                        return <option key={ `category-all-${category.id}` } value={category.id} >{category.name}</option>
                      })
                    }

                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="datePromotion" className="form-label">
                    Año de promoción<small className=" text-danger">(*)</small>
                  </label>
                  <input
                    className="form-control"
                    id="datePromotion"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
