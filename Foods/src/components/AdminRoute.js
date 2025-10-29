import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulated authentication + role check
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Example: store user object with role

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />; // Redirect non-admin users to home
  }

  return children;
};

export default AdminRoute;
