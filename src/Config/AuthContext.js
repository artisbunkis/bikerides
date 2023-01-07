import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from './firebase-config.js';
import SplashScreen from '../Components/SplashScreen.js';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const createUser = (email, password, username, photo) => {

    return createUserWithEmailAndPassword(auth, email, password)
  };

 

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  }


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);
    });
    return () => {

      unsubscribe();

    };
  }, []);

  return loading ? <SplashScreen/> : (
    <UserContext.Provider value={{ createUser, user, logout, signIn, signInWithGoogle, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};


