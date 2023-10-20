import { createContext } from "react";
import { login } from "../services/local/auth.services";
import { useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginUser = async ({ username, password }) => {
    try {
      const resp = await login({ username, password });
      localStorage.setItem("token", resp.token);
      setToken(resp.token);
    } catch (error) {
      console.log("error on loginUser");
      console.log(error);
      throw error.errors;
    }
  };

  const logoutUser = () => {
    try {
      localStorage.clear("token");
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
    <AuthContext.Provider
      value={{ token, loginUser, logoutUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
