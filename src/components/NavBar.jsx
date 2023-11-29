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
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#aside"
            aria-controls="aside"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              style={{ width: "24px", height: "24px" }}
              className="text-white"
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
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              ></path>
            </svg>
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
            <span className="text-white mx-2">
              {userRol == "admin" ? "(Administrador)" : ""}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
