import { EmployeeRepository } from "./employee.repository.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

const formatDDMMYYYY = (date: Date) => {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}${m}${y}`;
};

export class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  async getAllEmployees() {
    return await this.employeeRepository.findAll();
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Karyawan tidak ditemukan");
    }
    return employee;
  }

  async createEmployee(payload: any) {
    const tanggalBergabung = new Date(payload.tanggal_bergabung);
    
    // 1. Buat password otomatis: huruf pertama nama lengkap (lowercase) + ddmmyyyy
    const hurufPertama = payload.nama_lengkap.trim().charAt(0).toLowerCase();
    const tanggalStr = formatDDMMYYYY(tanggalBergabung);
    const plainPassword = `${hurufPertama}${tanggalStr}`;
    
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 2. Gunakan Prisma Transaction agar tabel users dan employees tersimpan serentak
    const result = await prisma.$transaction(async (tx) => {
      // Buat user otomatis
      const newUser = await tx.users.create({
        data: {
          username: payload.email, // email = username
          password: hashedPassword,
          role: "employee",
        },
      });

      // Buat employee dengan menghubungkan user_id
      const data = {
        nik: payload.nik,
        nama_lengkap: payload.nama_lengkap,
        email: payload.email,
        telepon: payload.telepon,
        alamat: payload.alamat,
        jenis_kelamin: payload.jenis_kelamin || null,
        tanggal_lahir: payload.tanggal_lahir ? new Date(payload.tanggal_lahir) : null,
        department_id: payload.department_id ? Number(payload.department_id) : null,
        position_id: payload.position_id ? Number(payload.position_id) : null,
        tanggal_bergabung: tanggalBergabung,
        status: payload.status,
        user_id: newUser.id,
      };

      const newEmployee = await tx.employees.create({ data });

      return { employee: newEmployee, generatedPassword: plainPassword };
    });

    return result;
  }

  async updateEmployee(id: number, payload: any) {
    // Pastikan karyawan ada terlebih dahulu
    await this.getEmployeeById(id);

    const data: any = {};
    if (payload.nik) data.nik = payload.nik;
    if (payload.nama_lengkap) data.nama_lengkap = payload.nama_lengkap;
    if (payload.email) data.email = payload.email;
    if (payload.telepon !== undefined) data.telepon = payload.telepon;
    if (payload.alamat !== undefined) data.alamat = payload.alamat;
    if (payload.jenis_kelamin !== undefined) data.jenis_kelamin = payload.jenis_kelamin;
    if (payload.tanggal_lahir) data.tanggal_lahir = new Date(payload.tanggal_lahir);
    if (payload.department_id !== undefined) data.department_id = payload.department_id ? Number(payload.department_id) : null;
    if (payload.position_id !== undefined) data.position_id = payload.position_id ? Number(payload.position_id) : null;
    if (payload.tanggal_bergabung) data.tanggal_bergabung = new Date(payload.tanggal_bergabung);
    if (payload.status) data.status = payload.status;

    return await this.employeeRepository.update(id, data);
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployeeById(id);
    
    // Hapus employee dan user terkait secara bersamaan jika perlu
    return await prisma.$transaction(async (tx) => {
      await tx.employees.delete({ where: { id } });
      if (employee.user_id) {
        await tx.users.delete({ where: { id: employee.user_id } });
      }
      return { message: "Karyawan dan akun pengguna berhasil dihapus" };
    });
  }
}