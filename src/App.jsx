import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Auth/Login.jsx";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Employees } from "./pages/Employees/Employees";

import NotFoundPage from "./pages/Error/NotFoundPage";
import Main from "./components/Main";
import { EmployeesRoutes } from "./routes/EmployeesRoutes";
import { CategoriesRoutes } from "./routes/CategoriesRoutes.jsx";
import { JobPositionsRoutes } from "./routes/JobPositionsRoutes.jsx";
import { SkillsRoutes } from "./routes/SkillsRoutes.jsx";
import { UsersRoutes } from "./routes/UsersRoutes.jsx";
import { AdminRoutes } from "./routes/AdminRoutes.jsx";
import { AboutPage } from "./pages/About/AboutPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="employees/*" element={<EmployeesRoutes />} />
          <Route path="/" element={<AdminRoutes />}>
            <Route path="users/*" element={<UsersRoutes />} />
            <Route path="categories/*" element={<CategoriesRoutes />} />
            <Route path="job-positions/*" element={<JobPositionsRoutes />} />
            <Route path="skills/*" element={<SkillsRoutes />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
