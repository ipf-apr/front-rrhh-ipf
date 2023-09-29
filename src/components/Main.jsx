import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Aside } from "../pages/Aside/Aside";
function Main() {
  return (
    <div className="d-flex">
      <Aside />
      <Dashboard />
    </div>
  );
}

export default Main;
