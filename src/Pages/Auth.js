import React, { useEffect, useState } from "react";
import app from "../Config/firebase-config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  
  // Mainīgo deklarēšana:
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  // Klausīšanās funkcija:
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  // Ja lādējas:
  if (pending) {
    return <>Loading...</>;
  }

  // Ja izdodas autorizēties, tad atgriež lietotāja kontekstu:
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
