import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { CustomerController } from "./customer.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get("/", CustomerController.getCustomers)
router.get("/:id", CustomerController.getCustomerById)

export default router