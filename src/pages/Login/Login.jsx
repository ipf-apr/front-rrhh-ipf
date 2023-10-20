import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, isAuthenticated } = useContext(AuthContext);

  useEffect(
    function () {
      if (isAuthenticated()) {
        return navigate("/");
      }
    },
    [isAuthenticated]
  );

  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = authForm;
    try {
      await loginUser({ username, password });
      navigate("/");
    } catch (error) {
      return alert("error al iniciar sesión: " + error);
    }
  };

  const handleOnChange = ({ target }) => {
    setAuthForm({ ...authForm, [target.name]: target.value });
  };

  return (
    <>
      <main className="min-vh-100 d-flex flex-column justify-content-center align-content-center text-center ">
        <h1 className="fs-4 mt-5 w-100">
          Sistema de Gestión de Recursos Humanos
        </h1>
        <form
          id="formLogin"
          onSubmit={handleSubmit}
          className="col-11 col-lg-4 text-start p-4 rounded border border-2 shadow-sm mx-auto"
        >
          <div className="d-flex flex-column p-2">
            <div className="text-center font-monospace">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                placeholder="userexample"
                value={authForm.username}
                onChange={handleOnChange}
              />
              <label htmlFor="username">Nombre de usuario</label>
            </div>
          </div>
          <div className="d-flex flex-column p-2">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="passwordexample"
                value={authForm.password}
                onChange={handleOnChange}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
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
