import { createContext, useState, useEffect } from "react";
import { login } from "../services/local/auth.services";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userFullName, setUserFullName] = useState(
    localStorage.getItem("userFullName")
  );
  const [userRol, setUserRol] = useState(localStorage.getItem("userRol"));

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("token", token);
    localStorage.setItem("userFullName", userFullName);
    localStorage.setItem("userRol", userRol);
  }, [token]);

  const loginUser = async ({ username, password }) => {
    try {
      const resp = await login({ username, password });
      setToken(resp.token);
      setUserFullName(resp.fullName);
      setUserRol(resp.rol);
    } catch (error) {
      console.log("error on loginUser");
      console.log(error.errors || error);
      throw error.errors || error.message || error;
    }
  };

  const logoutUser = () => {
    try {
      setToken(null);
      setUserFullName(null);
      setUserRol(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userFullName");
      localStorage.removeItem("userRol");
    } catch (error) {
      console.log("error on logoutUser");
      console.log(error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    return token != null;
  };

  const isAdmin = () => {
    return userRol === "admin";
  }

  return (
    <AuthContext.Provider
      value={{ loginUser, logoutUser, isAuthenticated, isAdmin, userFullName, userRol }}
    >
      {children}
    </AuthContext.Provider>
  );
};
