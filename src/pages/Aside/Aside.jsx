import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <aside
      id="aside"
      tabIndex="-1"
      className="offcanvas-lg offcanvas-start bg-dark px-3 col-2"
    >
      <div className="offcanvas-header border-bottom text-white">
        <h5 className="offcanvas-title" id="asideTitle">
          Menú
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          data-bs-target="#aside"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav nav-pills w-100 flex-column g-3">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-white">
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className="nav-link text-white"
              aria-current="page"
            >
              Empleados
            </Link>
          </li>
          <a
            className="nav-link text-white dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseMenuAdmin"
            role="button"
            aria-expanded="false"
            aria-controls="collapseMenuAdmin"
            aria-current="page"
          >
            Administración
          </a>
          <ul className="collapse" id="collapseMenuAdmin">
            <li>
              <a href="/users" className="nav-link text-white" aria-current="page">
                Usuarios
              </a>
            </li>
            <li>
              <Link to="/categories" className="nav-link text-white">
                Categorías
              </Link>
            </li>
            <li>
              <Link to="/job-positions" className="nav-link text-white">
                Puestos Laborales
              </Link>
            </li>            
            <li>
              <Link to="/skills" className="nav-link text-white">
                Habilidades
              </Link>
            </li>
          </ul>
        </ul>
        <div className="position-absolute bottom-0 mb-5">
          <form action="/logout" method="POST">
            <button type="submit" className="btn btn-outline-primary">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
