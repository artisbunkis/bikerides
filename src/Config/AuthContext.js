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
  console.log('auth: '+user);
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
    <UserContext.Provider value={{ createUser, user, logout, signIn, signInWithGoogle, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};


