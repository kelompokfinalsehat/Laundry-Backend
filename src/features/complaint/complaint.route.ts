import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { ComplaintController } from "./complaint.controller";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get("/", AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), ComplaintController.getComplaints)
router.get("/:id", AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), ComplaintController.getComplaintById)
router.patch("/:id/decision", AuthMiddleware.authorized([Role.OUTLET_ADMIN]), ComplaintController.decideComplaint)

export default router