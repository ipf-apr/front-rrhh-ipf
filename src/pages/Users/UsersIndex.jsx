import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { Spinner } from "../../components/Spinner";
import { Link } from "react-router-dom";

export const UsersIndex = () => {
  const { users, error, loading } = useContext(UsersContext);

  return (
    <div className="container-fluid py-5 px-md-5 col">
      <header className="d-flex align-items-center justify-content-between">
        <h1>Listado de Usuarios del Sistema</h1>
        <Link className="btn btn-outline-success" to={`/users/create`}>
          Nuevo Usuario
        </Link>
      </header>
      <main className="col">
        <div className="overflow-auto">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Nombres</th>
                <th scope="col">Usuario</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="text-center" colSpan={3}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={8} className="text-center text-danger ">
                    {error.message}
                  </td>
                </tr>
              )}
              {users && users.length == 0 && !loading && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No hay usuarios registrados aún.
                  </td>
                </tr>
              )}
              {users &&
                users.length != 0 &&
                users &&
                users.map((user, index) => {
                  return (
                    <tr key={`user-item-${index}`}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.lastName}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td className="w-25 ">
                        <div className="d-flex gap-2 flex-column flex-md-row justify-content-center ">
                          <Link
                            to={`/users/${user.id}/edit`}
                            className="btn btn-outline-success"
                          >
                            Editar
                          </Link>
                          <Link
                            to={`/users/${user.id}/show`}
                            className="btn btn-outline-primary"
                          >
                            Ver
                          </Link>
                          <button
                            className="btn btn-outline-danger"
                            data-id={user.id}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
