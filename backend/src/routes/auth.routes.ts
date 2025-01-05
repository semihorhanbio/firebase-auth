// src/routes/auth.routes.ts
import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", authMiddleware, signOut);

export default router;
