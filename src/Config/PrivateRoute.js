import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    console.log('loading now...')
    return <Navigate to='/SignIn' />;
  }
  return children;
};

export default PrivateRoute;