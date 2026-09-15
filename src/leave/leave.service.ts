import { LeaveRepository } from "./leave.repository.js";

export class LeaveService {
  private repo = new LeaveRepository();

  async getAll() { return await this.repo.findAll(); }

  async createLeave(payload: any) {
    const data = {
      employee_id: Number(payload.employee_id),
      tanggal_mulai: new Date(payload.tanggal_mulai),
      tanggal_selesai: new Date(payload.tanggal_selesai),
      jenis: payload.jenis,
      alasan: payload.alasan,
      status: payload.status || "Pending",
    };
    return await this.repo.create(data);
  }

  async updateStatus(id: number, status: string) {
    return await this.repo.updateStatus(id, status);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}