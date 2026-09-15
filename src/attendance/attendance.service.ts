import { AttendanceRepository } from "./attendance.repository.js";

export class AttendanceService {
  private repo = new AttendanceRepository();

  async getAll() { 
    return await this.repo.findAll(); 
  }

  async recordAttendance(payload: { employee_id: number; tanggal: string; clock_in?: string; clock_out?: string; status?: string }) {
    const employeeId = Number(payload.employee_id);
    const dateObj = new Date(payload.tanggal);
    
    const clockInObj = payload.clock_in ? new Date(`1970-01-01T${payload.clock_in}Z`) : undefined;
    const clockOutObj = payload.clock_out ? new Date(`1970-01-01T${payload.clock_out}Z`) : undefined;

    return await this.repo.upsertAttendance(employeeId, dateObj, clockInObj, clockOutObj, payload.status);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}