import { useCallback, useContext, useState } from "react";
import { Spinner } from "../../../components/Spinner";

import { usePromise } from "../../../hooks/usePromise";
import { fetchCategories } from "../../../services/local/categories";
import { useForm } from "../../../hooks/useForm";
import { apiStoreEmployeeCategory } from "../../../services/local/employees/categories/store";
import { formatDate } from "../../../helpers/formatDate";
import { ShowErrors } from "../../../components/ShowErrors";
import { fetchEmployeeCategories } from "../../../services/local/employees/categories";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { SelectCategory } from "../../../components/SelectCategory";

export const EmployeeCategory = ({ employeeId }) => {
  const [validationErrors, setValidationErrors] = useState(null);

  const { updateCategoriesToEmployee } = useContext(EmployeesContext);

  const {
    data: employeeCategories,
    error: employeeCategoriesError,
    loading: loadingEmployeeCategories,
    mutateData,
  } = usePromise(
    useCallback(() => fetchEmployeeCategories(employeeId), [employeeId])
  );
  const {
    form: category,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    selectedCategory: "",
    datePromotion: "",
  });

  const addCategoryToEmployee = async (e) => {
    e.preventDefault();
    try {
      const categoryId = category?.selectedCategory;
      const datePromotion = category?.datePromotion;
      const categoryAlready = employeeCategories?.find(
        (category) => category.id == categoryId
      );

      console.log(categoryId, datePromotion, categoryAlready);
      if (!categoryAlready) {
        if (categoryId && datePromotion) {
          console.log(categoryId, datePromotion);
          const data = await apiStoreEmployeeCategory(
            employeeId,
            categoryId,
            datePromotion
          );
          console.log(data);
          if (data.category) {
            const newCategories = [
              {
                ...data.category,
                CategoryEmployee: {
                  datePromotion: data.datePromotion,
                },
              },
            ];
            if (!employeeCategories && employeeCategories.length === 0) {
              updateCategoriesToEmployee(employeeId, newCategories);
              return mutateData(newCategories);
            }
            document.querySelector("#btnCancelSaveCategory").click();
            document.querySelector("#btnCancelSaveCategory").blur();
            mutateData([
              {
                ...data.category,
                CategoryEmployee: {
                  datePromotion: data.datePromotion,
                },
              },
              ...employeeCategories,
            ]);
            updateCategoriesToEmployee(employeeId, newCategories);
          } else {
            return setValidationErrors(data.message);
          }
        } else {
          return setValidationErrors(
            "Tenes que seleccionar alguna categoría y colocar la fecha."
          );
        }
      } else {
        return setValidationErrors(
          "La categoría ya se encuentra agregada al empleado actual."
        );
      }
    } catch (error) {
      console.log(error);
      setValidationErrors(error);
    }
  };

  const resetForm = () => {
    reset();
    setValidationErrors(null);
  };

  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Categorías:</strong>
          <button
            className="btn btn-success d-print-none "
            data-bs-toggle="modal"
            data-bs-target="#modalAddCategoryToEmployee"
          >
            +
          </button>
        </div>
        <ul className="mx-3">
          {loadingEmployeeCategories && <Spinner />}

          {employeeCategoriesError && (
            <li>{employeeCategoriesError.message}</li>
          )}

          {employeeCategories &&
            employeeCategories.length == 0 &&
            !loadingEmployeeCategories && (
              <li>Este empleado no tiene categorías registradas.</li>
            )}

          {employeeCategories &&
            employeeCategories.length > 0 &&
            employeeCategories.map((category, index) => {
              console.log('employeeCategoriesMAP',category)
              return (
                <li key={`category-employee-${category.id}`}>
                  <span className={index == 0 ? "fw-bold text-blue" : ""}>
                    {category.name} en el año{" "}
                    {formatDate(category.CategoryEmployee?.datePromotion)}
                    {index == 0 ? " - Actual" : ""}
                  </span>
                </li>
              );
            })}
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
          <form
            onSubmit={addCategoryToEmployee}
            id="formAddCategoryToEmployee"
            className="modal-content"
          >
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
                  <label htmlFor="selectedCategory" className="form-label">
                    Categoría de Empleado
                    <small className=" text-danger">(*)</small>
                  </label>
                  <SelectCategory
                    handleInputChange={handleInputChange}
                    value={category.categoryId}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="datePromotion" className="form-label">
                    Año de promoción<small className=" text-danger">(*)</small>
                  </label>
                  <input
                    className="form-control"
                    id="datePromotion"
                    name="datePromotion"
                    type="date"
                    value={category.datePromotion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-2">
                  {validationErrors && <ShowErrors errors={validationErrors} />}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCancelSaveCategory"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetForm}
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
