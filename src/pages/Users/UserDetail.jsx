import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";

export const UserDetail = () => {
  const { userId } = useParams();

  const { users, error, loading, showUser } = useContext(UsersContext);

  const [user, serUser] = useState({});

  useEffect(() => {
    const user = showUser(userId);
    serUser(user);
    console.log(user)
  }, [users]);

  return (
    user && (
      <div
        className="container-fluid py-5 px-md-5 col"
        id="id"
        data-id="<%= id  %>"
      >
        <header className="d-flex align-items-center justify-content-between">
          <h1 id="fullName">{user.fullName}</h1>
          <Link
            to={`/users/${userId}/edit`}
            id="btnEdit"
            className="btn btn-outline-success"
          >
            Editar
          </Link>
        </header>
        <main>
          <div className="d-flex display-6">
            <strong>Nombre de usuario:</strong>
            <p id="username" className="mx-3">
              {user.username}
            </p>
          </div>
          <div className="d-flex display-6">
            <strong>Rol:</strong>
            <p id="role" className="mx-3">{user.role}</p>
          </div>
        </main>
      </div>
    )
  );
};
