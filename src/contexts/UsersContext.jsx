import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchUsers } from "../services/local/users";
import { apiStoreUser } from "../services/local/users/create";
import { apiUpdateUser } from "../services/local/users/update";
import { apiDeleteUser } from "../services/local/users/delete";

export const UsersContext = createContext({});

export const UsersContextProvider = ({ children }) => {
  const { data: users, error, loading, mutateData } = usePromise(fetchUsers);

  const storeUser = async (user) => {
    try {
      const data = await apiStoreUser(user);
      console.log(data);
      if (!users && users.length === 0) {
        return mutateData([data.user]);
      }
      mutateData([...users, data.user]);
      return data.user.id;
    } catch (error) {
      console.log("error on storeUser");
      throw error;
    }
  };

  const showUser = (userId) => {
    return users?.find((user) => user.id == userId);
  };

  const updateUser = async (userId, userData) => {
    try {
      const data = await apiUpdateUser(userId, userData);

      console.log("data", data);

      if (users && users.length !== 0) {
        const newUsers = users.map((user) => {
          if (user.id == userId) {
            return data.user;
          }
          return user;
        });
        console.log("newUsers", newUsers);
        return mutateData(newUsers);
      }
    } catch (error) {
      console.log("error on updateUser");
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const data = await apiDeleteUser(userId);

      console.log(data)

      if (users && users.length !== 0) {
        const newUsers = users.filter((user) => {
          if (user.id != userId) {
            return user;
          }
          return;
        });
        return mutateData(newUsers);
      }
    } catch (error) {
      console.log("error on deleteUser");
      throw error;
    }
  };

  return (
    <UsersContext.Provider
      value={{ storeUser, showUser, updateUser, deleteUser, users, error, loading }}
    >
      {children}
    </UsersContext.Provider>
  );
};
