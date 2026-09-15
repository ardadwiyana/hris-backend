import { Request, Response } from "express";
import { DepartmentService } from "./department.service.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export class DepartmentController {
  private service = new DepartmentService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getById(Number(req.params.id));
    res.json({ success: true, data });
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.create(req.body);
    res.status(201).json({ success: true, data });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ success: true, message: "Departemen berhasil dihapus" });
  });
}