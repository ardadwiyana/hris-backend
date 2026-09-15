import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export class AttendanceController {
  private service = new AttendanceService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  });

  storeOrUpdate = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.recordAttendance(req.body);
    res.json({ success: true, data });
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ success: true, message: "Absensi berhasil dihapus" });
  });
}