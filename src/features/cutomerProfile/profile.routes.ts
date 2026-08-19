import { Router } from "express";
import { MulterMiddleware } from "../../middlewares/multer.middleware";
import { CustomerProfileController } from "./profile.controllers";


const router = Router()

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const multerUploads = new MulterMiddleware(

  ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

router.patch("/me", CustomerProfileController.updateCustomerProfile);
router.patch(
  "/photo",
  multerUploads.single("PROFILE_PHOTO"),
  CustomerProfileController.updateCustomerProfilePhoto,
);
router.patch("/email", CustomerProfileController.requestEmailChange);
router.post("/email/confirm", CustomerProfileController.confirmEmailChange)

export default router;

