import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmployeeCreateEditForm } from "./components/EmployeeCreateEditForm";

export const EmployeeCreate = () => {

  const { storeEmployee } = useContext(EmployeeContext);

  const [validationErrors, setValidationErrors] = useState([]);
  const [ disable, setDisable ]  = useState(false);

  const navigate = useNavigate();

  const {
    form: datos,
    handleInputChange,
    reset,
  } = useForm({
    lastName: "",
    name: "",
    dni: "",
    domicilio: "",
    fechaNac: "",
    phone: "",
    nroLegajo: "",
    ingreso: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    setValidationErrors([]);
    try {
      await storeEmployee(datos);
      setDisable(false)
      reset();
      navigate("/employees");
    } catch (error) {
      setDisable(false)
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);
        return;
      }
      console.log(error);
    }
  };

  return (
    <>
      <h1>Crear Empleado</h1>

      <EmployeeCreateEditForm
        employeeData={datos}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        disable={disable}
      />
    </>
  );
};
