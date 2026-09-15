import { z } from "zod";

export const createLeaveSchema = z.object({
  employee_id: z.number(),
  tanggal_mulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  tanggal_selesai: z.string().min(1, "Tanggal selesai wajib diisi"),
  jenis: z.string().min(1, "Jenis cuti wajib diisi"),
  alasan: z.string().optional(),
  status: z.string().optional(),
});

export const updateLeaveStatusSchema = z.object({
  status: z.string().min(1, "Status wajib diisi"),
});