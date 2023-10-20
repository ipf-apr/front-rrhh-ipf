import { Outlet} from 'react-router-dom'

import NavBar from "./NavBar";
import Footer from "./Footer";
import Aside from './Aside';

function Main() {
  return (
    <>
      {/* NavBar */}
      <NavBar />
      {/* Contenido Principal */}
      <div className="d-flex">
        <Aside />
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
