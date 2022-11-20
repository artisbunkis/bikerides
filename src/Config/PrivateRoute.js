import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import SplashScreen from '../Components/SplashScreen';

const PrivateRoute = ({ children }) => {


  const { user, isLoading } = UserAuth();

  //if (isLoading) {

    //return <SplashScreen />; // or loading spinner, etc
  //}

  if (!user) {
    return <Navigate to='/SignIn' />;
  }

  return children;
};

export default PrivateRoute;