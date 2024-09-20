import React, { createContext, useState } from "react";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
