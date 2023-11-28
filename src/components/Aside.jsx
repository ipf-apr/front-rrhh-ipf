import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Aside() {
  const { logoutUser, isAdmin } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  return (
    <aside
      id="aside"
      tabIndex="-1"
      className="offcanvas-lg offcanvas-start bg-dark px-3 h-100 col-2"
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
            <NavLink
              to="/"
              className="nav-link text-white"
              data-bs-target="#aside"
              data-bs-dismiss="offcanvas"
            >
              Inicio
            </NavLink>
          </li>
          <li className="nav-item" data-bs-target="#aside" data-bs-dismiss="offcanvas">
            <NavLink
              to="/employees"
              className="nav-link text-white"
              aria-current="page"
            >
              Empleados
            </NavLink>
          </li>
          {isAdmin() && (
            <>
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
                <li className="nav-item" data-bs-target="#aside" data-bs-dismiss="offcanvas">
                  <NavLink
                    to="/users"
                    className="nav-link text-white"
                    aria-current="page"
                  >
                    Usuarios
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-target="#aside" data-bs-dismiss="offcanvas">
                  <NavLink to="/categories" className="nav-link text-white">
                    Categorías
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-target="#aside" data-bs-dismiss="offcanvas">
                  <NavLink to="/job-positions" className="nav-link text-white">
                    Puestos Laborales
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-target="#aside" data-bs-dismiss="offcanvas">
                  <NavLink to="/skills" className="nav-link text-white">
                    Habilidades
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </ul>
        <div className="position-absolute bottom-0 mb-5">
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-outline-primary"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
export default Aside;
