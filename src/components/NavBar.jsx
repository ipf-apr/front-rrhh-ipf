

function NavBar() {
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
                <a className="nav-link active" aria-current="page" href="/">
                  Sistema de Gestión de Recursos Humanos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
