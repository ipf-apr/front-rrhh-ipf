import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Auth/Login.jsx";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Employees } from "./pages/Employees/Employees";

import NotFoundPage from "./pages/Error/NotFoundPage";
import Main from "./components/Main";
import { EmployeesRoutes } from "./routes/EmployeesRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees/*" element={<EmployeesRoutes />} />
          <Route path="users" element={<Employees />} />
          <Route path="categories" element={<Employees />} />
          <Route path="job-positions" element={<Employees />} />
          <Route path="skills" element={<Employees />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
