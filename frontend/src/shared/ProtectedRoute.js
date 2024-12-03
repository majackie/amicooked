import React from 'react';
import { Navigate } from 'react-router-dom';

// Helper function to determine if current user is logged in or not
// @return true if token exists in localStorage, else false.
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * A ProtectedRoute component ensuring user-account-only route is protected
 * and kept hidden. 
 * It redirects non-users to Login page.
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
