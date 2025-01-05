// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/firebaseClient";
import { authApi } from "@/services/api";

interface UserInfo extends User {
  serverData?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUserSignIn = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken(true);
      const serverResponse = await authApi.signIn(idToken);

      const userWithServerData = {
        ...firebaseUser,
        serverData: serverResponse,
      };

      setUser(userWithServerData);
      return userWithServerData;
    } catch (error) {
      console.error("Error handling user sign in:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          await handleUserSignIn(firebaseUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleUserSignIn(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const idToken = await auth.currentUser?.getIdToken(true);
      if (idToken) {
        await authApi.signOut(idToken);
      }
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };
};
