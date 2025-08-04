import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If token doesn't exist, redirect to login
  if (!auth.token) {
    return <Navigate to="/user-login" />;
  }

  return children;
};

export default PrivateRoute;
