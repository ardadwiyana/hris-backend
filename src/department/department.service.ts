import { DepartmentRepository } from "./department.repository.js";

export class DepartmentService {
  private repo = new DepartmentRepository();

  async getAll() { return await this.repo.findAll(); }

  async getById(id: number) {
    const dept = await this.repo.findById(id);
    if (!dept) throw new Error("Departemen tidak ditemukan");
    return dept;
  }

  async create(payload: { nama_departemen: string }) {
    return await this.repo.create(payload);
  }

  async update(id: number, payload: { nama_departemen?: string }) {
    await this.getById(id);
    return await this.repo.update(id, payload);
  }

  async delete(id: number) {
    await this.getById(id);
    return await this.repo.delete(id);
  }
}