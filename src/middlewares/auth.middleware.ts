import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "Akses ditolak, token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token tidak valid atau sudah kedaluwarsa" });
    }
    req.user = user;
    next();
  });
};