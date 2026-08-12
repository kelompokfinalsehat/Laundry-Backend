import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

// Super Admin Scope
router.get("/", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]) ,EmployeeController.getEmployees)
router.get("/:id", EmployeeController.getEmployeeById)
router.post("/invite", EmployeeController.inviteEmployee)
router.patch("/:id", EmployeeController.updateEmployee)
router.post("/:id/resend-invitation", EmployeeController.resendInvitation)
router.patch("/:id/activate", EmployeeController.activateEmployee)
router.patch("/:id/deactivate", EmployeeController.deactivateEmployee)
router.post("/assignments", EmployeeController.assignEmployee)

export default router