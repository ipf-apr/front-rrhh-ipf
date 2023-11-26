import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { useForm } from "../../hooks/useForm";
import { EmployeeCreateEditForm } from "./components/EmployeeCreateEditForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "../../components/Spinner";

export const EmployeeEdit = () => {
  const { employeeId } = useParams();

  const { loading, employees, updateEmployee, showEmployee } =
    useContext(EmployeesContext);

  const employeeData = {
    lastName: "",
    name: "",
    dni: "",
    domicilio: "",
    fechaNac: "",
    phone: "",
    nroLegajo: "",
    ingreso: "",
  };

  const {
    form: datos,
    setForm,
    handleInputChange,
    reset,
  } = useForm(employeeData);

  useEffect(() => {
    const emp = showEmployee(employeeId);
    if (emp) {
      setForm({
        lastName: emp.lastName,
        name: emp.name,
        dni: emp.dni,
        domicilio: emp.address,
        fechaNac: emp.dateBirthday,
        phone: emp.phone,
        nroLegajo: emp.profileNro,
        ingreso: emp.dateIn,
      });
    }
  }, [employees]);

  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    try {
      await updateEmployee(employeeId, datos);
      reset();
      navigate("/employees");
    } catch (error) {
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);

        return;
      }
      console.log(error);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1>Editar Empleado</h1>
      <EmployeeCreateEditForm
        employeeData={datos}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </>
  );
};
