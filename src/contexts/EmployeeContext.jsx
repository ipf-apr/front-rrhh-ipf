import { createContext } from "react";
import { apiStoreEmployee } from "../services/local/employees/create";

export const EmployeeContext = createContext({});

export const EmployeeContextProvider = ({ children }) => {

  const storeEmployee = async (datos) => {
    try {
      return await apiStoreEmployee(datos);
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider value={{ storeEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
