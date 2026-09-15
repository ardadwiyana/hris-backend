import { prisma } from "../lib/prisma.js";

export class LeaveRepository {
  async findAll() {
    return await prisma.leaves.findMany({
      include: { employees: { select: { nama_lengkap: true, nik: true } } },
    });
  }

  async create(data: any) {
    return await prisma.leaves.create({ data });
  }

  async updateStatus(id: number, status: string) {
    return await prisma.leaves.update({ where: { id }, data: { status } });
  }

  async delete(id: number) {
    return await prisma.leaves.delete({ where: { id } });
  }
}