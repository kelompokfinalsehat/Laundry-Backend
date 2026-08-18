import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { ComplaintController } from "./complaint.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]))
router.get("/", ComplaintController.getComplaints)
router.get("/:id", ComplaintController.getComplaintById)

// TODO Decide complaint pending, butuh keputusan bersama

export default router