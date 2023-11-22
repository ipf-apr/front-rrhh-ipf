import { createContext } from "react";
import { apiStoreEmployee } from "../services/local/employees/create";
import { usePromise } from "../hooks/usePromise";
import { fetchEmployees } from "../services/local/employees";
import { apiUpdateEmployee } from "../services/local/employees/update";

export const EmployeeContext = createContext({});

export const EmployeeContextProvider = ({ children }) => {
  const {
    data: employees,
    loading,
    error,
    mutateData,
  } = usePromise(fetchEmployees);

  const storeEmployee = async (employee) => {
    try {
      const data = await apiStoreEmployee(employee);
      if (!employees && employees.length === 0) {
        return mutateData([data]);
      }
      mutateData([...employees, data]);
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  const showEmployee = (employeeId) => {
    return employees?.find((emp) => emp.id == employeeId);
  };

  const updateEmployee = async (employeeId, employeeData) => {
    try {
      console.log("employeeData", employeeData);
      console.log("employeeId", employeeId);

      const data = await apiUpdateEmployee(employeeData, employeeId);

      console.log("data", data);

      if (employees && employees.length !== 0) {
        const newEmployees = employees.map((emp) => {
          if (emp.id == employeeId) {
            return data;
          }
          return emp;
        });
        console.log('newEmployees', newEmployees);
        return mutateData(newEmployees);
      }
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        storeEmployee,
        updateEmployee,
        showEmployee,
        employees,
        loading,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
