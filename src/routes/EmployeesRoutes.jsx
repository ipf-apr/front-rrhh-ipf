import { Route } from "react-router-dom";
import { Employees } from "../pages/Employees/Employees";
import { Routes } from "react-router-dom";
import { EmployeeDetail } from "../pages/Employees/EmployeeDetail";
import { EmployeeCreate } from "../pages/Employees/EmployeeCreate";
import { EmployeesContextProvider } from "../contexts/EmployeesContext";
import { EmployeeEdit } from "../pages/Employees/EmployeeEdit";

export const EmployeesRoutes = () => {
  return (
    <EmployeesContextProvider>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/:employeeId/show" element={<EmployeeDetail />} />
        <Route path="/:employeeId/edit" element={<EmployeeEdit />} />
      </Routes>
    </EmployeesContextProvider>
  );
};
