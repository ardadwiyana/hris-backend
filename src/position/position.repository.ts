import { prisma } from "../lib/prisma.js";

export class PositionRepository {
  async findAll() { 
    return await prisma.positions.findMany({ 
      include: { departments: true, employees: true } 
    }); 
  }

  async findById(id: number) { 
    return await prisma.positions.findUnique({ 
      where: { id }, 
      include: { departments: true, employees: true } 
    }); 
  }

  async create(data: { nama_posisi: string; department_id: number }) { 
    return await prisma.positions.create({ data }); 
  }

  async update(id: number, data: { nama_posisi?: string; department_id?: number }) { 
    return await prisma.positions.update({ where: { id }, data }); 
  }

  async delete(id: number) { 
    return await prisma.positions.delete({ where: { id } }); 
  }
}