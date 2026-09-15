import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error captured:", err);

  // Jika error berasal dari validasi Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: formattedErrors,
    });
  }

  // Ambil pesan error dengan aman
  const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan pada server";

  // Jika error kustom pencarian data
  if (
    errorMessage === "Karyawan tidak ditemukan" ||
    errorMessage === "Departemen tidak ditemukan" ||
    errorMessage === "Posisi tidak ditemukan"
  ) {
    return res.status(404).json({ success: false, error: errorMessage });
  }

  // Error default / server error
  return res.status(500).json({
    success: false,
    error: errorMessage,
  });
};