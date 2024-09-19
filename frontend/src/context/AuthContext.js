// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import { setAuthToken } from '../services/api';  // Import setAuthToken function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));  // Load token from localStorage

  const login = (token) => {
    localStorage.setItem('token', token);  // Save token to localStorage
    setToken(token);
    setAuthToken(token);  // Set the token globally for all requests
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove token
    setToken(null);
    setAuthToken(null);  // Remove the token from axios headers
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
