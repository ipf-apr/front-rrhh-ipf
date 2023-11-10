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
    setData,
  } = usePromise(fetchEmployees);

  const storeEmployee = async (datos) => {
    try {
      const data = await apiStoreEmployee(datos);

      setData([...employees, data]);

      return true;
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  const editEmployee = async (datos) => {
    try {
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ storeEmployee, editEmployee, employees, loading, error }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
