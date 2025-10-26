import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles }) {
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  // If user role is not allowed, redirect to login or unauthorized page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/account/login" replace />;
  }

   
  // Else render the child routes
  return <Outlet />;
}

export default ProtectedRoute;
