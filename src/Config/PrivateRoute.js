import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js';
import SplashScreen from '../Components/SplashScreen';

const PrivateRoute = ({ children }) => {

  console.log('PrivateRoute.js');
 


  const { user, isLoading} = UserAuth();
  console.log('PrivateRoute user:'+user);

  if (isLoading) {
    console.log('PrivateRoute isLoading');
    return <SplashScreen />; // or loading spinner, etc
  }

  if (!user) {
    console.log('loading now...')
    console.log(user);
    return <Navigate to='/SignIn' />;
  }
  console.log('parada shopping');
  return children;
};

export default PrivateRoute;