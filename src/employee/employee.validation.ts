import { z } from "zod";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createEmployeeSchema = z.object({
  nik: z.string().min(1, "NIK wajib diisi"),
  nama_lengkap: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().min(1, "Email wajib diisi").regex(emailRegex, "Format email tidak valid"),
  telepon: z.string().optional(),
  alamat: z.string().optional(),
  jenis_kelamin: z.string().optional(), 
  tanggal_lahir: z.string().optional(),
  department_id: z.number().optional().nullable(),
  position_id: z.number().optional().nullable(),
  tanggal_bergabung: z.string().min(1, "Tanggal bergabung wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  user_id: z.number().optional().nullable(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();