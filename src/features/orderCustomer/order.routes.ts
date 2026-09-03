import { Router } from "express";
import { OrderController } from "./order.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { OrderActionController } from "../orderActionCustomer/orderAction.controllers";
import { MulterMiddleware } from "../../middlewares/multer.middleware";

const router = Router();

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const multerUploads = new MulterMiddleware(
  ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

router.post(
  "/",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.create,
);
router.get(
  "/",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.getListOrder,
);
router.get(
  "/:id",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.getDetailOrder,
);

router.patch(
  "/:id/confirm",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderActionController.confirm,
);

router.post(
  "/:id/complaint",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  multerUploads.single("PHOTO"),
  OrderActionController.complaint,
);



export default router;
