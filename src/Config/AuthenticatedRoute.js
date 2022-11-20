import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';

const AuthenticatedRoute = ({ children }) => {
  const { user } = UserAuth();


  if (user!==null) {

    return <Navigate to='/' />;
  }

  return children;
};

export default AuthenticatedRoute;