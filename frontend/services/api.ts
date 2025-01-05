// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const authApi = {
  async signIn(idToken: string) {
    try {
      const response = await api.post("/auth/signin", { idToken });
      return response.data;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  async signOut(idToken: string) {
    try {
      const response = await api.post(
        "/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  },
};
