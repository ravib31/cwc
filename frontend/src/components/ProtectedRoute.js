// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <Component />;
};

export default ProtectedRoute;
