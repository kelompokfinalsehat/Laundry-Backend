import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get("/", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.getEmployees)
router.get("/team", AuthMiddleware.authorized([Role.OUTLET_ADMIN]), EmployeeController.getCurrentOutletEmployee)
router.get("/:id", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.getEmployeeById)
router.post("/invite", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.inviteEmployee)
router.post("/assignments", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.assignEmployee)
router.post("/:id/resend-invitation", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.resendInvitation)
router.patch("/:id/activate", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.activateEmployee)
router.patch("/:id/deactivate", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.deactivateEmployee)
router.patch("/:id", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.updateEmployee)

export default router