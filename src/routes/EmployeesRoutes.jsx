import { Route } from "react-router-dom";
import { Employees } from "../pages/Employees/Employees";
import { Routes } from "react-router-dom";
import { EmployeeDetail } from "../pages/Employees/EmployeeDetail";
import { EmployeeCreate } from "../pages/Employees/EmployeeCreate";
import { EmployeeContextProvider } from "../contexts/EmployeeContext";

export const EmployeesRoutes = () => {
  return (
    <EmployeeContextProvider>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/:employeeId/show" element={<EmployeeDetail />} />
      </Routes>
    </EmployeeContextProvider>
  );
};
