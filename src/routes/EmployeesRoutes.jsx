import { Route } from "react-router-dom";
import { Employees } from "../pages/Employees/Employees";
import { Routes } from "react-router-dom";
import { EmployeeDetail } from "../pages/Employees/EmployeeDetail";

export const EmployeesRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/:employeeId/show" element={<EmployeeDetail />} />
    </Routes>
  );
};
