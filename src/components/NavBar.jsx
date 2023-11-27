import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
  const { userFullName, userRol } = useContext(AuthContext);

  console.log(userFullName);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Navbar"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#aside"
            aria-controls="aside"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse justify-content-md-center collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Sistema de Gestión de Recursos Humanos
                </Link>
              </li>
            </ul>
          </div>
          <div className="position-absolute end-0 mx-3">
            <span className="text-white">{userFullName}</span>
            <span className="text-white mx-2 text-capitalize">({userRol})</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
