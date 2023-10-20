function Login() {
  return (
    <>
      <main className="min-vh-100 d-flex flex-column justify-content-center align-content-center text-center ">
        <h1 className="fs-4 mt-5 w-100">
          Sistema de Gestión de Recursos Humanos
        </h1>
        <form
          id="formLogin"
          className="text-start p-4 rounded border border-2 shadow mx-auto"
        >
          <div className="d-flex flex-column p-2">
            <label className="form-label" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="d-flex flex-column p-2">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
