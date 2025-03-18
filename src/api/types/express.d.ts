// src/types/express.d.ts
import { ObjectId } from 'mongoose';

declare module 'express' {
  interface Request {
    user?: {
      id: string; // ObjectId as string from JWT
      email?: string; // Optional, if included in token
    };
  }
}