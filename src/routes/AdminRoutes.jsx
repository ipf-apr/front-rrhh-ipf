import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { isAdmin } = useContext(AuthContext);
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  } 
  return <Outlet />;
};