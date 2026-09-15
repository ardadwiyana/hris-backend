import { prisma } from "../lib/prisma.js";

export class DepartmentRepository {
  async findAll() {
    return await prisma.departments.findMany({ include: { employees: true } });
  }

  async findById(id: number) {
    return await prisma.departments.findUnique({
      where: { id },
      include: { employees: true },
    });
  }

  async create(data: { nama_departemen: string }) {
    return await prisma.departments.create({ data });
  }

  async update(id: number, data: { nama_departemen?: string }) {
    return await prisma.departments.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await prisma.departments.delete({ where: { id } });
  }
}