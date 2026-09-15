import { prisma } from "../lib/prisma.js";

export class EmployeeRepository {
  async findAll() {
    return await prisma.employees.findMany({
      include: {
        departments: true,
        positions: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.employees.findUnique({
      where: { id },
      include: {
        departments: true,
        positions: true,
        attendances: true,
        leaves: true,
      },
    });
  }

  async create(data: any) {
    return await prisma.employees.create({ data });
  }

  async update(id: number, data: any) {
    return await prisma.employees.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.employees.delete({
      where: { id },
    });
  }
}