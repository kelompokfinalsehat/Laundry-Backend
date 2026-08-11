import { Router } from "express";
import { EmployeeController } from "./employee.controller";

const router = Router()

// Super Admin Scope
router.get("/", EmployeeController.getEmployees)
router.get("/:id", EmployeeController.getEmployeeById)
router.post("/invite", EmployeeController.inviteEmployee)
router.patch("/:id", EmployeeController.updateEmployee)
router.post("/:id/resend-invitation", EmployeeController.resendInvitation)
router.patch("/:id/activate", EmployeeController.activateEmployee)
router.patch("/:id/deactivate", EmployeeController.deactivateEmployee)
router.post("/assignments", EmployeeController.assignEmployee)

export default router