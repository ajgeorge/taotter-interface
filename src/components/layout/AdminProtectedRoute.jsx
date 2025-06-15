import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  
  // If not authenticated or not an admin, redirect to admin login
  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
}
