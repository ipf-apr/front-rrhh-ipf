import { useNavigate, useParams } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Spinner } from "../../components/Spinner";
import { ShowErrors } from "../../components/ShowErrors";
import { UserCreateEditForm } from "./components/UserCreateEditForm";

export const UserEdit = () => {
  const { userId } = useParams();

  const { users, showUser, updateUser, error, loading } =
    useContext(UsersContext);
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();

  const userData = {
    lastName: "",
    name: "",
    username: "",
    role: "",
  };

  const { form: datos, setForm, handleInputChange, reset } = useForm(userData);

  useEffect(() => {
    const user = showUser(userId);
    if (user) {
      console.log("User", user);
      setForm({
        lastName: user.lastName,
        name: user.name,
        username: user.username,
        role: user.role,
      });
    }
}, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    try {
      await updateUser(userId, datos);
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
        <h1>Editar Usuario</h1>
        {!validationErrors && (
          <ShowErrors errors={validationErrors} />
        )}
      </header>
      <main>
        {loading ? (
          <Spinner />
        ) : (
          <UserCreateEditForm
            submitting={loading}
            userData={datos}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        )}
      </main>
    </div>
  );
};
