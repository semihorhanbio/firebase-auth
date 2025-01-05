// server/src/routes/protectedRoutes.ts
import { Router, Response } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { AuthRequest } from "../types/express";

const router = Router();

router.get("/protected", authenticateJWT, (req: AuthRequest, res: Response) => {
  if (req.user) {
    res
      .status(200)
      .json({ message: "This is protected data.", user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
});

export default router;
