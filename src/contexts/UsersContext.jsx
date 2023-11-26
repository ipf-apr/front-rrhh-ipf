import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchUsers } from "../services/local/users";
import { apiStoreUser } from "../services/local/users/create";


export const UsersContext = createContext({});

export const UsersContextProvider = ({children}) => {

  const { data: users, error, loading, mutateData } =   usePromise(fetchUsers);

  const storeUser = async (user) => {
    try {
      const data = await apiStoreUser(user);
      console.log(data)
      if (!users && users.length === 0) {
        return mutateData([data.user]);
      }
      mutateData([...users, data.user]);
      return data.user.id;
    } catch (error) {
      console.log("error on storeEmployee");
      throw error;
    }
  };


  return (
    <UsersContext.Provider value={{storeUser, users, error, loading }}>
        {children}
    </UsersContext.Provider>
  )
}
