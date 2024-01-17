
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
