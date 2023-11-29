import { createContext, useCallback, useState } from "react";
import { apiStoreEmployee } from "../services/local/employees/create";
import { usePromise } from "../hooks/usePromise";
import { fetchEmployees } from "../services/local/employees";
import { apiUpdateEmployee } from "../services/local/employees/update";
import { apiDeleteEmployee } from "../services/local/employees/delete";
import { apiStoreEmployeeAvatar } from "../services/local/employees/avatar/create";

export const EmployeesContext = createContext({});

export const EmployeesContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);

  const {
    data: employees,
    loading,
    error,
    mutateData,
  } = usePromise(useCallback(() => fetchEmployees(searchData), [searchData]));

  const searchEmployees = (searchData) => {
    setSearchData(searchData);
  };

  const storeEmployee = async (employee) => {
    try {
      const data = await apiStoreEmployee(employee);
      if (!employees && employees.length === 0) {
        return mutateData([data]);
      }
      mutateData([...employees, data]);
      return data.id;
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
        const newEmployees = generateNewsEmployeesFromUpdatedEmployee(
          data,
          employeeId
        );
        console.log("newEmployees", newEmployees);
        return mutateData(newEmployees);
      }
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  const generateNewsEmployeesFromUpdatedEmployee = (employee, employeeId) => {
    return employees.map((emp) => {
      if (emp.id == employeeId) {
        return employee;
      }
      return emp;
    });
  };

  const updateCategoriesToEmployee = (employeeId, categories) => {
    // employee.Categories
    const employee = employees.find((emp) => emp.id == employeeId);
    console.log("updateCategoriesToEmployee", employee);
    console.log("updateCategoriesToEmployee", categories);
    if (employee) {
      employee.Categories = categories;
      const newEmployees = generateNewsEmployeesFromUpdatedEmployee(
        employee,
        employeeId
      );
      console.log("newEmployees", newEmployees);
      return mutateData(newEmployees);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const data = await apiDeleteEmployee(employeeId);

      if (employees && employees.length !== 0) {
        const newEmployees = employees.filter((emp) => {
          if (emp.id != employeeId) {
            return emp;
          }
          return;
        });
        return mutateData(newEmployees);
      }
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };

  const storeAvatar = async (employeeId, formData) => {
    try {
      const data = await apiStoreEmployeeAvatar(employeeId, formData);

      if (employees && employees.length !== 0) {
        const newEmployees = generateNewsEmployeesFromUpdatedEmployee(
          data.employee,
          employeeId
        );
        console.log("newEmployees", newEmployees);
        return mutateData(newEmployees);
      }

    } catch (error) {
      throw error;
    }
  }

  return (
    <EmployeesContext.Provider
      value={{
        searchEmployees,
        storeEmployee,
        updateEmployee,
        showEmployee,
        deleteEmployee,
        updateCategoriesToEmployee,
        storeAvatar,
        employees,
        loading,
        error,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
