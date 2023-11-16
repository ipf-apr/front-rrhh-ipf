import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Aside from "./Aside";

function Main() {
  return (
    <>
      {/* NavBar */}
      <NavBar />
      {/* Contenido Principal */}
      <div className="d-flex overflow-hidden">
        <Aside />
        <div className="col p-4 my-2 overflow-y-scroll h-100">
          <Outlet />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
