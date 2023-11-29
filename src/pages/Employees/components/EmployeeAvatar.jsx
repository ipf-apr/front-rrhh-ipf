import { useContext, useState } from "react";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { useForm } from "../../../hooks/useForm";
import { Spinner } from "../../../components/Spinner";
import toast from "react-hot-toast";
import { ShowErrors } from "../../../components/ShowErrors";

export const EmployeeAvatar = ({ employee }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState("");

  const { storeAvatar } = useContext(EmployeesContext);

  const { form, handleInputChange, reset } = useForm({ filename: "" });

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageAvatar = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    handleInputChange(e);
  };

  const handleResetImageAvatar = () => {
    setImagePreview("");
    reset();
  };

  const handleSubmitImageAvatar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageRoute", e.target.filename.files[0]);
    try {
      await storeAvatar(employee.id, formData);
      const btnCloseAvatarModal = document.getElementById(
        "btnCloseAvatarModal"
      );
      btnCloseAvatarModal.click();
      btnCloseAvatarModal.blur();

      toast.success("Imagen del empleado se guardó correctamente..");
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  return (
    <div style={{ height: 200, width: 200 }}>
      {!imageLoaded && (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Spinner />
        </div>
      )}
      {
        <div className="position-relative">
          <button
            title={
              employee.imageUrl.includes("default")
                ? "Agregar nueva imagen"
                : "Cambiar la imagen"
            }
            style={{ height: 30, width: 30 }}
            className="border-0 rounded-bottom position-absolute end-0 bg-opacity-75 bg-dark text-white"
            type="input"
            data-bs-toggle="modal"
            data-bs-target="#imageModal"
          >
            <div>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                ></path>
              </svg>
            </div>
          </button>
          <div className="d-flex justify-content-center ">
            <img
              style={{ height: 200, objectFit: "cover" }}
              className="rounded img-fluid"
              src={employee.imageUrl}
              onLoad={handleImageLoaded.bind(this)}
            />
          </div>
          {/* Modal */}
          <div
            className="modal fade"
            id="imageModal"
            tabIndex="-1"
            aria-labelledby="imageModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="imageModalLabel">
                    {employee.imageUrl.includes("default")
                      ? "Agregar imagen"
                      : "Cambiar imagen"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form
                  onSubmit={handleSubmitImageAvatar}
                  encType="multipart/form-data"
                >
                  <div className="modal-body">
                    <ShowErrors errors={errors} />
                    <label htmlFor="filename">Imagen del empleado</label>
                    <input
                      type="file"
                      name="filename"
                      id="filename"
                      accept="image/*"
                      value={form.filename}
                      onChange={handleImageAvatar}
                    />
                    <div className="d-flex justify-content-center my-2 ">
                      <img
                        style={{ width: 200 }}
                        className="img-fluid"
                        src={imagePreview}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      id="btnCloseAvatarModal"
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleResetImageAvatar}
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
          </div>
        </div>
      }
    </div>
  );
};
