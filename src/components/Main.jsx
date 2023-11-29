import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Aside from "./Aside";
import { Toaster } from "react-hot-toast";

function Main() {
  return (
    <>
      {/* NavBar */}
      <NavBar />
      {/* Contenido Principal */}
      <div className="d-flex overflow-hidden">
        <Aside />
        <div
          style={{ scrollBehavior: "smooth", height: "calc(100vh - 56px)"}}
          className="col p-4 my-2 overflow-y-auto h-100"
        >
          <Outlet />
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
