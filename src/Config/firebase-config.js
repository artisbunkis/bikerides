// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const app =  initializeApp({

  apiKey: "AIzaSyCko_u27B2N3weHz-bZwytWpZX8lp_KLmk",
  authDomain: "bikerides-c9d55.firebaseapp.com",
  databaseURL: "https://bikerides-c9d55-default-rtdb.firebaseio.com",
  projectId: "bikerides-c9d55",
  storageBucket: "bikerides-c9d55.appspot.com",
  messagingSenderId: "958120181601",
  appId: "1:958120181601:web:5458b965da245a9d7ecf20",
  measurementId: "G-0K6K3YT2F8"

});

// Initialize Firebase

export const auth = getAuth(app);
export default app;

export const storage = getStorage(app);
export const db = getFirestore();

export const googleProvider = new GoogleAuthProvider();