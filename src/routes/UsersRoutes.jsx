import { Route, Routes } from "react-router-dom";
import { UsersIndex } from "../pages/Users/UsersIndex";
import { UsersContextProvider } from "../contexts/UsersContext";
import { UserCreate } from "../pages/Users/UserCreate";

export const UsersRoutes = () => {
  return (
    <UsersContextProvider>
      <Routes>
        <Route path="/" element={<UsersIndex />} />        
        <Route path="/create" element={<UserCreate />} />
      </Routes>
    </UsersContextProvider>
  );
};
