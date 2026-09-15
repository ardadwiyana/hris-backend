import { Request, Response } from "express";
import { EmployeeService } from "./employee.service.js";
import { createEmployeeSchema, updateEmployeeSchema } from "./employee.validation.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export class EmployeeController {
  private employeeService = new EmployeeService();

  index = asyncHandler(async (req: Request, res: Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.json({ success: true, data: employees });
  });

  show = asyncHandler(async (req: Request, res: Response) => {
    const employee = await this.employeeService.getEmployeeById(Number(req.params.id));
    res.json({ success: true, data: employee });
  });

  store = asyncHandler(async (req: Request, res: Response) => {
    // Validasi input body menggunakan Zod sebelum masuk ke service
    const validatedData = createEmployeeSchema.parse(req.body);
    const newEmployee = await this.employeeService.createEmployee(validatedData);
    res.status(201).json({ success: true, data: newEmployee });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updateEmployeeSchema.parse(req.body);
    const updatedEmployee = await this.employeeService.updateEmployee(Number(req.params.id), validatedData);
    res.json({ success: true, data: updatedEmployee });
  });

  destroy = asyncHandler(async (req: Request, res: Response) => {
    await this.employeeService.deleteEmployee(Number(req.params.id));
    res.json({ success: true, message: "Karyawan berhasil dihapus" });
  });
}