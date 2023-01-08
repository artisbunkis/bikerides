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
  
  // Izveidot lietotāju:
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };
 
  // Pieslēgties sistēmai:
  const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Atslēgties no sistēmas:
  const logout = () => {
    return signOut(auth)
  }

  // Pieslēgties ar Google:
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  }

  // Klausīšanās funkcija (ja izlogojas):
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


