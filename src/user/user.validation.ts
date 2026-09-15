import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").regex(emailRegex, "Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.string().optional(),
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username wajib diisi").regex(emailRegex, "Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});