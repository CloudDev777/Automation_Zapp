import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        name: string;
        role: string;
        email: string;
        image?: string | null;
        company?: string | null;
      };
    }
  }
}
