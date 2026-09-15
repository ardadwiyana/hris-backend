import { prisma } from "../lib/prisma.js";

export class UserRepository {
  async findAll() { return await prisma.users.findMany({ include: { employees: true } }); }
  async findById(id: number) { return await prisma.users.findUnique({ where: { id }, include: { employees: true } }); }
  // async create(data: any) { return await prisma.users.create({ data }); }
  // async delete(id: number) { return await prisma.users.delete({ where: { id } }); }
  async findByUsername(username: string) {
  return await prisma.users.findUnique({ where: { username } });
}
}