import { createContext, useState, useEffect } from "react";
import { login } from "../services/local/auth.services";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("token", token);
  }, [token]);

  const loginUser = async ({ username, password }) => {
    try {
      const resp = await login({ username, password });
      setToken(resp.token);
    } catch (error) {
      console.log("error on loginUser");
      console.log(error.errors || error);
      throw error.errors || error.message || error;
    }
  };

  const logoutUser = () => {
    try {
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.log("error on logoutUser");
      console.log(error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    return token != null;
  };

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
