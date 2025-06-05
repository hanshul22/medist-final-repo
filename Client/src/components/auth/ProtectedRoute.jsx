import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();

  // Check if user is authenticated and has the required role
  if (!isAuthenticated || userRole !== requiredRole) {
    // Redirect to login page and save the location they tried to access
    return <Navigate to="/admin_login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;