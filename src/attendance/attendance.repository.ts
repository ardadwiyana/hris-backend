import { prisma } from "../lib/prisma.js";

export class AttendanceRepository {
  async findAll() {
    return await prisma.attendances.findMany({
      include: { employees: { select: { nama_lengkap: true, nik: true } } },
    });
  }

  async upsertAttendance(employee_id: number, tanggal: Date, clock_in?: Date, clock_out?: Date, status?: string) {
    return await prisma.attendances.upsert({
      where: {
        employee_id_tanggal: { employee_id, tanggal },
      },
      update: {
        ...(clock_in && { clock_in }),
        ...(clock_out && { clock_out }),
        ...(status && { status }),
      },
      create: {
        employee_id,
        tanggal,
        clock_in: clock_in || null,
        clock_out: clock_out || null,
        status: status || "Hadir",
      },
    });
  }

  async delete(id: number) {
    return await prisma.attendances.delete({ where: { id } });
  }
}