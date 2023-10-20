import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login.jsx";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import NotFoundPage from "./pages/Error/NotFoundPage";
import Main from "./components/Main";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="users" element={<Employees />} />
          <Route path="categories" element={<Employees />} />
          <Route path="job-positions" element={<Employees />} />
          <Route path="skills" element={<Employees />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
