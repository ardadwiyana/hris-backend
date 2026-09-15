import { z } from "zod";

export const createPositionSchema = z.object({
  nama_posisi: z.string().min(3, "Nama posisi minimal 3 karakter"),
  department_id: z.number().min(1, "Department ID wajib diisi"),
});

export const updatePositionSchema = createPositionSchema.partial();