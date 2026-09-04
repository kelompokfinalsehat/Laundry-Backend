import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { MulterMiddleware } from "../../middlewares/multer.middleware";
import { EmployeeProfileController } from "./employeeProfile.controllers";

export const EmployeeProfileRoute = Router();

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const multerUploads = new MulterMiddleware(
  ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

EmployeeProfileRoute.get(
  "/me",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER", "DRIVER", "OUTLET_ADMIN", "SUPER_ADMIN"]),
  EmployeeProfileController.getProfile,
);

EmployeeProfileRoute.patch(
  "/me",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER", "DRIVER", "OUTLET_ADMIN", "SUPER_ADMIN"]),
  EmployeeProfileController.updateProfile,
);

EmployeeProfileRoute.patch(
  "/photo",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER", "DRIVER", "OUTLET_ADMIN", "SUPER_ADMIN"]),
  multerUploads.single("PROFILE_PHOTO"),
  EmployeeProfileController.updateProfilePhoto,
);
