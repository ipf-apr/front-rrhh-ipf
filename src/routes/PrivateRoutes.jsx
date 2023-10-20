import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated()) {
        navigate("/login");
      }
    },
    [isAuthenticated]
  );

  return <Outlet />;
};
