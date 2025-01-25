import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Check if the user is authenticated

  // If the user is authenticated, render the child routes
  // Otherwise, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;