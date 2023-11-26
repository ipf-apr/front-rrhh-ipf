import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchUsers } from "../services/local/users";


export const UsersContext = createContext({});

export const UsersContextProvider = ({children}) => {

  const { data: users, error, loading, mutateData } =   usePromise(fetchUsers);

  return (
    <UsersContext.Provider value={{ users, error, loading }}>
        {children}
    </UsersContext.Provider>
  )
}
