import { Request, Response } from "express";
import { LeaveService } from "./leave.service.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export class LeaveController {
  private service = new LeaveService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.createLeave(req.body);
    res.status(201).json({ success: true, data });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.body;
    const data = await this.service.updateStatus(Number(req.params.id), status);
    res.json({ success: true, data });
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ success: true, message: "Pengajuan cuti dihapus" });
  });
}