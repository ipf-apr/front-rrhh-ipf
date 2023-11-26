import { Route, Routes } from "react-router-dom";
import { UsersIndex } from "../pages/Users/UsersIndex";
import { UsersContextProvider } from "../contexts/UsersContext";

export const UsersRoutes = () => {
  return (
    <UsersContextProvider>
      <Routes>
        <Route path="/" element={<UsersIndex />} />
      </Routes>
    </UsersContextProvider>
  );
};
