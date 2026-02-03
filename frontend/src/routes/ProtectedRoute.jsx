import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
