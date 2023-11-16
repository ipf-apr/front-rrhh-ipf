import { createContext } from "react";
import { apiStoreEmployee } from "../services/local/employees/create";
import { usePromise } from "../hooks/usePromise";
import { fetchEmployees } from "../services/local/employees";

export const EmployeeContext = createContext({});

export const EmployeeContextProvider = ({ children }) => {
  const {
    data: employees,
    loading,
    error,
    mutateData,
  } = usePromise(fetchEmployees);

  const storeEmployee = async (employeeId) => {
    try {
      const data = await apiStoreEmployee(employeeId);
      if (employees?.length === 0) {
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

  const editEmployee = async (employeeId) => {
    try {
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        storeEmployee,
        showEmployee,
        editEmployee,
        employees,
        loading,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
