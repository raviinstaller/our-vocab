"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("loading");

  const router = useRouter();

  const googleSignIn = () => {
    setStatus("loading");
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((x) => {
        setStatus("authenticated");
        router.refresh();
      })
      .catch((err) => {
        setStatus("error");
        router.refresh();
      });
  };

  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        setStatus("unauthenticated");
        router.refresh();
      })
      .catch((err) => {
        setStatus("error");
        router.refresh();
      });
  };

  useEffect(() => {
    setStatus("loading");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      setStatus(currentUser ? "authenticated" : "unauthenticated");
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, status, googleSignIn, googleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
