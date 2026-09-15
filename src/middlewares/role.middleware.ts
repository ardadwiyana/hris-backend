import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user; // Didapatkan dari middleware authenticateToken

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak: Anda tidak memiliki hak akses untuk tindakan ini",
      });
    }

    next();
  };
};