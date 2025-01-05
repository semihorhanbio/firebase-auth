// server/src/types/express/index.d.ts
import { Request } from "express";

export interface UserPayload {
  id: string;
  email: string;
  // Add other user properties
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}
