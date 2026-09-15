import { Request, Response } from "express";
import { PositionService } from "./position.service.js";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { createPositionSchema, updatePositionSchema } from "./position.validation.js";

export class PositionController {
  private service = new PositionService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.getById(Number(req.params.id));
    res.json({ success: true, data });
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createPositionSchema.parse(req.body);
    const data = await this.service.create(validatedData);
    res.status(201).json({ success: true, data });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updatePositionSchema.parse(req.body);
    const data = await this.service.update(Number(req.params.id), validatedData);
    res.json({ success: true, data });
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ success: true, message: "Posisi berhasil dihapus" });
  });
}