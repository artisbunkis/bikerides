import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';

const AuthenticatedRoute = ({ children }) => {
  const { user } = UserAuth();

  console.log(user);
  if (user!==null) {
    console.log('AUTHROUTE loading now...')
    return <Navigate to='/' />;
  }
  console.log("return children authroute");
  return children;
};

export default AuthenticatedRoute;