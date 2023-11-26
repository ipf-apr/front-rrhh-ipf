export const UserCreateEditForm = ({
  submitting,
  userData,
  validationErrors,
  handleSubmit,
  handleInputChange,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      id="formNewUser"
      className="row g-3 "
    >
      <div className="col-md-4">
        <label htmlFor="lastName" className="form-label">
          Apellido <small className="text-danger">(*)</small>
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          onChange={handleInputChange}
          placeholder="Ingrese el nombre"
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="name" className="form-label">
          Nombres <small className=" text-danger">(*)</small>
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={handleInputChange}
          placeholder="Ingrese el apellido"
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="username" className="form-label">
          Usuario <small className=" text-danger">(*)</small>
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Ingrese el nombre de usuario"
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label htmlFor="role" className="form-label">
          Rol<small className=" text-danger">(*)</small>
        </label>
        <select
          name="role"
          id="role"
          className="form-select"
          aria-label=".form-select-sm example"
          required
          onChange={handleInputChange}
          defaultValue={""}
        >
          <option disabled value={""}>
            --Seleccione el Rol--
          </option>
          <option value={"admin"}>Administración</option>
          <option value={"user"}>Usuario</option>
        </select>
      </div>
      {!userData.id && (
        <p className="text-danger">
          La contraseña se asignará automáticamente a "password"
        </p>
      )}
      <div className="d-flex w-100 align-items-center justify-content-start gap-2">
        <button
          disabled={submitting}
          className="btn btn-outline-primary"
          type="submit"
        >
          Guardar
        </button>
        <button className="btn btn-outline-danger">Cancelar</button>
      </div>
    </form>
  );
};
