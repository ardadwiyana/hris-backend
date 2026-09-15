import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private repo = new UserRepository();

  async getAll() {
    return await this.repo.findAll();
  }

  // async register(payload: any) {
  //   // Hash password sebelum disimpan ke database
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

  //   const data = {
  //     username: payload.username,
  //     password: hashedPassword,
  //     role: payload.role || "employee",
  //   };

  //   return await this.repo.create(data);
  // }

  async login(payload: any) {
    const user = await this.repo.findByUsername(payload.username);
    if (!user) {
      throw new Error("Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username atau password salah");
    }

    // Buat JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" } as any
    );

    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }

  // async deleteUser(id: number) {
  //   return await this.repo.delete(id);
  // }
}
