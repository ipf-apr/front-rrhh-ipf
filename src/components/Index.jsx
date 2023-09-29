import { Main } from "../pages/Main/Main";
import { Aside } from "../pages/Aside/Aside";
function Index() {
  return (
    <div className="d-flex">
      <Aside />
      <Main />
    </div>
  );
}

export default Index;
