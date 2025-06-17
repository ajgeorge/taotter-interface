import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export default function StartupProtectedRoute({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      window.location.href = "/startup/login";
    }
  }, [dispatch, token]);

  // If not authenticated or not a startup, redirect to startup login
  if (!isAuthenticated || userType !== 'startup' || isTokenExpired(token)) {
    return <Navigate to="/startup/login" state={{ from: location }} replace />;
  }

  return children;
}
