export const ShowErrors = ({ errors }) => {
  console.log('errors', errors);
  return Array.isArray(errors) ? (
    <div className="text-danger ">
      <h6 className="">
        Mmh, se encontraron los siguientes errores de validación:
      </h6>
      <ul className="d-flex flex-column align-items-start justify-content-start">
        {errors.map((error, index) => (
          <li key={"employee-validation-" + index}>
            <small>{error.msg}</small>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <h6 className="text-danger">{errors.message || errors}</h6>
    </div>
  );
};
