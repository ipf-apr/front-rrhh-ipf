import { useContext, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { UserCreateEditForm } from "./components/UserCreateEditForm";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ShowErrors } from "../../components/ShowErrors";

export const UserCreate = () => {
  const { storeUser, loading } = useContext(UsersContext);

  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();

  const {
    form: userData,
    handleInputChange,
    reset,
  } = useForm({
    id: "",
    lastName: "",
    name: "",
    username: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    try {
      const userId = await storeUser({...userData, password: 'password'});
      reset();
      navigate(`/users/${userId}/show`);
    } catch (error) {
      if (error.statusCode == 400) {
        console.log(error.errors);
        setValidationErrors(error.errors);
        return;
      }
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header>
        <h1>Nuevo Usuario</h1>
        <ShowErrors errors={validationErrors} />
      </header>
      <main>
        <UserCreateEditForm
          submitting={loading}
          userData={userData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      </main>
    </div>
  );
};
