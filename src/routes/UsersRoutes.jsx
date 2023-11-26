import { Route, Routes } from "react-router-dom";
import { UsersIndex } from "../pages/Users/UsersIndex";
import { UsersContextProvider } from "../contexts/UsersContext";
import { UserCreate } from "../pages/Users/UserCreate";
import { UserEdit } from "../pages/Users/UserEdit";
import { UserDetail } from "../pages/Users/UserDetail";

export const UsersRoutes = () => {
  return (
    <UsersContextProvider>
      <Routes>
        <Route path="/" element={<UsersIndex />} />        
        <Route path="/create" element={<UserCreate />} />
        <Route path="/:userId/edit" element={<UserEdit />} />
        <Route path="/:userId/show" element={<UserDetail />} />
      </Routes>
    </UsersContextProvider>
  );
};
