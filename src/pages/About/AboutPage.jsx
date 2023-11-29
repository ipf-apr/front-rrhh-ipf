import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const AboutPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="d-flex justify-content-center my-5">
          {isAuthenticated() ? (
            <Link className="btn btn-outline-primary" to="/">
              Volver
            </Link>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="text-center">Sistema de Recursos Humanos</h1>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="text-center">
                  Bienvenidos a nuestro Sistema, nos honra su presencia y
                  esperamos satisfacer sus consultas
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- quienes sosmos --> */}
        <section>
          <div className="container">
            <h2 className="text-center">Misión</h2>
            <div className="d-flex flex-column ">
              <div>
                <p className="text-center">
                  ¿Cuál es el principal problema con el que se encuentra el
                  empleado de RR.HH?
                </p>
                <ul>
                  <li>
                    <strong>La falta de tiempo</strong> para realizar las tareas
                    administrativas y operativas que requiere su puesto de
                    trabajo.
                  </li>
                  <li>
                    <strong>Ineficiencia</strong> en la gestión de datos
                  </li>
                  <li>
                    <strong>Procesos manuales y lentos</strong>
                  </li>

                  <li>
                    <strong>
                      Dificultades en la toma de decisiones estratégicas
                    </strong>
                  </li>
                  <li>
                    <strong>Dificultades en la gestión del talento</strong>
                  </li>
                </ul>
              </div>
              <div>
                {/* <!-- resaltar la plataforma adecuada y adaptable en gestión de rr.hh acorde a las necesidades de la empresa --> */}
                <p className="text-center">
                  ¿Qué es lo que necesita el empleado de RR.HH?
                </p>
                <p className="text-start">
                  <strong>
                    Una plataforma adecuada y adaptable a las necesidades de la
                    empresa para la gestión de RR.HH.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h2 className="text-center">Quienes somos</h2>
            <div className="d-flex flex-column flex-md-row gap-2">
              <div className="col">
                <div className="card" width={"18rem;"}>
                  <img
                    src="ruiz_diaz_alejandro.JPG"
                    className="card-img img-fluid "
                    height={300}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>RUIZ DIAZ ALEJANDRO NAHUEL</strong>
                    </h5>
                    <div className="card-text">
                      <p>
                        Senior fullstack developer con el stack TALL (Tailwind
                        Css, AlpineJs, Laravel (PHP), Livewire).
                      </p>
                      <p>
                        Además soy administrador de servidores Linux (Debian)
                      </p>
                      <p>
                        Experto Universitario en Hacking Ético y Experto
                        Universitario en Seguridad de la Información
                      </p>
                      <p>
                        Estudiante de la Tecnicatura Superior en Desarrollo de
                        Software Multiplataforma en el Instituto Politécnico
                        Formosa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="acosta_gabriel.jpeg"
                    className="card-img img-fluid"
                    height={300}
                    alt="..."
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>ACOSTA GABRIEL</strong>
                    </h5>
                    <div className="card-text">
                      <p>Estudiante autodidacta de la Seguridad Informática</p>
                      <p>
                        Estudiante de la carrera "Tecnicatura Superior en
                        Desarrollo de Software Multiplataforma".
                      </p>
                      <p>Desarrollo Backend con Python (FastApi, Django)</p>
                      <p>Desarrollo Backend con Node.js (Express).</p>
                      <p>
                        Desarrollo Front-end con HTML5, CSS3 Y JAVASCRIPT
                        (REACT, BOOTSTRAP 5.3).
                      </p>
                      <p>
                        Manejo de sistemas basados en Unix a nivel intermedio...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center "></div>
                <div className="text-dark col me-5 mt-5">
                  <h5 className="text-center"></h5>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    className="card-img img-fluid"
                    height={300}
                    src="pedemonte_ricardo.jpg"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>PEDEMONTE RICARDO MARTIN</strong>
                    </h5>
                    <div className="card-text">
                      <p>
                        Licenciado en Seguridad en Tecnologías de la Información
                        y Comunicaciones.
                      </p>
                      <p>Especialista en Investigación de Cibercrimen.</p>
                      <p>
                        Estudiante de la Tecnicatura Superior en Desarrollo de
                        Software Multiplataforma en el Instituto Politécnico
                        Formosa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center "></div>
                <div className="text-dark col me-5 mt-5">
                  <h5 className="text-center"></h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
