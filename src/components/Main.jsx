import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Aside } from "../pages/Aside/Aside";
import NavBar from "./NavBar";
import Footer from "./Footer";
function Main() {
  return (
    <>
      {/* NavBar */}
      <NavBar />
      <div className="d-flex">
        <Aside />
        <Dashboard />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
