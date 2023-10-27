import { createContext, useState } from "react";
import { login } from "../services/local/auth.services";
import { useEffect } from "react";

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
      console.log(error);
      throw error.errors;
    }
  };

  const logoutUser = () => {
    try {
      setToken(null);
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
