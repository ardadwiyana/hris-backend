import { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export class UserController {
  private service = new UserService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  });

  // register = asyncHandler(async (req: Request, res: Response) => {
  //   const data = await this.service.register(req.body);
  //   res.status(201).json({ success: true, message: "Registrasi berhasil", data });
  // });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.login(req.body);
    res.json({ success: true, message: "Login berhasil", data: result });
  });

  // destroy = asyncHandler(async (req: Request, res: Response) => {
  //   await this.service.deleteUser(Number(req.params.id));
  //   res.json({ success: true, message: "User berhasil dihapus" });
  // });
}