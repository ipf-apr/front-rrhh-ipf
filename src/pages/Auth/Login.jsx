import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.jsx";

function Login() {
  const { loginUser, isAuthenticated } = useContext(AuthContext);
  
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  const [loading, setLoading ] = useState(false)
  
  const {
    form: datos,
    handleInputChange,
    reset,
  } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await loginUser(datos);
      reset();
      <Navigate to="/" replace />;
    } catch (error) {
      console.log(error);
      setLoading(false)
      if (error.includes("Failed to fetch")) {
        return alert(
          "error al iniciar sesión: El servidor no respondió a la petición."
          );
        }
      return alert("error al iniciar sesión: " + error);
    }
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
                value={datos.username}
                onChange={handleInputChange}
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
                value={datos.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
          </div>
          <div className="mt-3">
            <button disabled={loading}  type="submit" className="btn btn-primary w-100">
              <span className="mx-2">Iniciar Sesión</span>
              {loading &&  <div className="spinner-border spinner-border-sm" role="status"></div> }
            </button>

          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
