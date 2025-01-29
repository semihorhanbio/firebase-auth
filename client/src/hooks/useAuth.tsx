// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";

// Axios instance for API calls
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

interface UserInfo extends User {
  serverData?: unknown;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUserSignIn = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken(true);
      const response = await api.post("/auth/signin", { idToken });

      const userWithServerData = {
        ...firebaseUser,
        serverData: response.data,
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
        await api.post(
          "/auth/signout",
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
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
