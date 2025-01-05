// src/types/custom.ts
import { Request } from 'express';

export interface UserPayload {
  uid: string;
  email?: string;
  // Add other user properties
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}