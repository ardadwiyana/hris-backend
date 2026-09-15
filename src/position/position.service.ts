import { PositionRepository } from "./position.repository.js";

export class PositionService {
  private repo = new PositionRepository();

  async getAll() { 
    return await this.repo.findAll(); 
  }

  async getById(id: number) {
    const pos = await this.repo.findById(id);
    if (!pos) throw new Error("Posisi tidak ditemukan");
    return pos;
  }

  async create(payload: any) { 
    const data = {
      nama_posisi: payload.nama_posisi,
      department_id: Number(payload.department_id),
    };
    return await this.repo.create(data); 
  }

  async update(id: number, payload: any) {
    await this.getById(id);
    
    const data: any = {};
    if (payload.nama_posisi) data.nama_posisi = payload.nama_posisi;
    if (payload.department_id) data.department_id = Number(payload.department_id);

    return await this.repo.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);
    return await this.repo.delete(id);
  }
}