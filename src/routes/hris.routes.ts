import { Router } from "express";
import { EmployeeController } from "../employee/employee.controller.js";
import { DepartmentController } from "../department/department.controller.js";
import { PositionController } from "../position/position.controller.js";
import { AttendanceController } from "../attendance/attendance.controller.js";
import { LeaveController } from "../leave/leave.controller.js";
import { UserController } from "../user/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();
const empCtrl = new EmployeeController();
const deptCtrl = new DepartmentController();
const posCtrl = new PositionController();
const attCtrl = new AttendanceController();
const leaveCtrl = new LeaveController();
const userCtrl = new UserController();

// Public Routes (Tanpa token)
// router.post("/auth/register", userCtrl.register);
router.post("/auth/login", userCtrl.login);

// Employees
router.get("/employees", authenticateToken, authorizeRoles("admin", "manager", "employee"), empCtrl.index);
router.get("/employees/:id", authenticateToken, authorizeRoles("admin", "manager", "employee"), empCtrl.show);
router.post("/employees", authenticateToken, authorizeRoles("admin"), empCtrl.store);
router.put("/employees/:id", authenticateToken, authorizeRoles("admin", "manager"), empCtrl.update);
router.delete("/employees/:id", authenticateToken, authorizeRoles("admin"), empCtrl.destroy);

// Departments
router.get("/departments", deptCtrl.index);
router.get("/departments/:id", deptCtrl.show);
router.post("/departments", deptCtrl.store);
router.put("/departments/:id", deptCtrl.update);
router.delete("/departments/:id", deptCtrl.destroy);

// Positions
router.get("/positions", posCtrl.index);
router.get("/positions/:id", posCtrl.show);
router.post("/positions", posCtrl.store);
router.put("/positions/:id", posCtrl.update);
router.delete("/positions/:id", posCtrl.destroy);

// Attendances
router.get("/attendances", attCtrl.index);
router.post("/attendances", attCtrl.storeOrUpdate);
router.delete("/attendances/:id", attCtrl.destroy);

// Leaves
router.get("/leaves", leaveCtrl.index);
router.post("/leaves", leaveCtrl.store);
router.patch("/leaves/:id/status", leaveCtrl.updateStatus);
router.delete("/leaves/:id", leaveCtrl.destroy);

// Users
router.get("/users", userCtrl.index);
// router.post("/users", userCtrl.register);
// router.delete("/users/:id", userCtrl.destroy);

export default router;