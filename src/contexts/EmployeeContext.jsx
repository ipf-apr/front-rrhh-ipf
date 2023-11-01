import { createContext, useState } from "react";
import { fetchEmployees } from "../services/local/employees";

export const EmployeeContext = createContext({});

export const EmployeeContextProvider = ({ children }) => {
   
  
    const listEmployees = async () => {
        try {
            const resp = await fetchEmployees();
          } catch (error) {
            console.log("error on loginUser");
            console.log(error);
            throw error.errors;
          }
    }
  
    return (
    <EmployeeContext.Provider value={{}}>{children}</EmployeeContext.Provider>
  );
};
