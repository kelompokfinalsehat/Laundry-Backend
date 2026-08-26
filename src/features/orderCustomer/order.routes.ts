import { Router } from "express";
import { OrderController } from "./order.controllers";

const router = Router()

router.post("/",OrderController.create)
router.get("/",OrderController.getListOrder)
router.get("/:id",OrderController.getDetailOrder)

export default router