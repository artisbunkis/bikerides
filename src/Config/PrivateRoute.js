import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';

const PrivateRoute = ({ children }) => {

  // Saites, kurai pieeja tikai autorizējušiem lietotājiemL:
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/SignIn' />;
  }

  return children;
};

export default PrivateRoute;