// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import admin from "../config/firebase.config";
import { AuthRequest } from "../middleware/auth.middleware";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: userRecord,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({
      message: "Error creating user",
      error: typedError.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    res.status(200).json({
      message: "User signed in successfully",
      user: decodedToken,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(401).json({
      message: "Error signing in",
      error: typedError.message,
    });
  }
};

export const signOut = async (req: AuthRequest, res: Response) => {
  try {
    // Firebase handles token invalidation on the client side
    // Here we can add any additional server-side logout logic if needed
    res.status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(400).json({
      message: "Error signing out",
      error: typedError.message,
    });
  }
};
