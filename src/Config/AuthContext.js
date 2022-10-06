import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase-config.js';
import SplashScreen from '../Components/SplashScreen.js';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  
  console.log('auth: '+user)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }



  useEffect(() => {
    console.log('laadee user');

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser.email);
      console.log('IELOGOJIES IR OK')
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {

      unsubscribe();

      console.log('gatavs');
    };
  }, []);

  return loading ? <SplashScreen/> : (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

