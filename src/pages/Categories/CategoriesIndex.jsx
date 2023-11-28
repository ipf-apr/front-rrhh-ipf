import { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { Spinner } from "../../components/Spinner";
import { ShowErrors } from "../../components/ShowErrors";
import { AlertDelete } from "../../components/AlertDelete";

import toast from "react-hot-toast";

export const CategoriesIndex = () => {
  const {
    categories,
    error,
    loading,
    storeCategory,
    updateCategory,
    deleteCategory,
  } = useContext(CategoriesContext);

  const [validationErrors, setValidationErrors] = useState([]);
  const [disable, setDisable] = useState(false);
  const {
    form: category,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    id: "",
    name: "",
    permanency: "",
  });

  const showEditModal = ({ target }) => {
    const cat = categories.find((category) => category.id == target.dataset.id);
    setForm({ id: cat.id, name: cat.name, permanency: cat.permanency });
    document.querySelector("#btnCreate").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setValidationErrors([]);
    try {
      if (category.id != "") {
        await updateCategory(category, category.id);
        toast.success("Categoría actualizada con éxito");
      } else {
        await storeCategory(category);
        toast.success("Categoría creada con éxito");
      }

      setDisable(false);
      reset();
      document.querySelector("#btnCancel").click();
    } catch (error) {
      setDisable(false);
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);
        return;
      }
      console.log(error);
    }
  };

  const handleDeleteCategory = ({ target }) => {
    const id = target.dataset.id;

    AlertDelete(() => {
      deleteCategory(id);
    });
  };

  return (
    <>
      <div className="row">
        <header className="d-sm-flex align-items-center justify-content-between">
          <h1>Listado de Categorías</h1>
          <div className="float-end">
            <button
              id="btnCreate"
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#modalCategoryCreate"
            >
              Nueva Categoría
            </button>
           
          </div>
        </header>
        <main className="col">
          <div className="overflow-auto">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Categoría</th>
                  <th scope="col">Permanencia</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="text-center" colSpan={4}>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {categories && categories.length == 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No hay categorías registradas aún.
                    </td>
                  </tr>
                )}

                {categories &&
                  categories.length != 0 &&
                  categories &&
                  categories.map((category, index) => {
                    return (
                      <tr key={`category-item-${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td className="w-50 ">{category.name}</td>
                        <td className="w-2 ">{category.permanency} años</td>
                        <td className="w-25 ">
                          <div className="d-flex gap-2 flex-column flex-md-row justify-content-center ">
                            <button
                              onClick={showEditModal}
                              data-id={category.id}
                              className="btn btn-outline-success"
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              data-id={category.id}
                              onClick={handleDeleteCategory}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                {error && (
                  <tr>
                    <td colSpan={8} className="text-center text-danger ">
                      {error.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="modalCategoryCreate"
        tabIndex="-1"
        aria-labelledby="modalCategoryCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column ">
                <h1 className="modal-title fs-5" id="modalCategoryCreateLabel">
                  Nueva Categoría
                </h1>
                {validationErrors.length != 0 && (
                  <ShowErrors errors={validationErrors} />
                )}
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div id="validationErrors" className="text-danger my-2"></div>
              <div className="row g-3">
                <input type="hidden" id="isCreating" />
                <div className="col-6">
                  <label htmlFor="name" className="form-label">
                    Nombre de Categoría
                    <small className=" text-danger">(*)</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="permanency" className="form-label">
                    Años de Permanencia
                    <small className=" text-danger">(*)</small>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="permanency"
                    name="permanency"
                    value={category.permanency}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCancel"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={reset}
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
