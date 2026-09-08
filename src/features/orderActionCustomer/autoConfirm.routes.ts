import { Router } from "express";
import { executeAutoConfirmJob } from "./autoConfirm.job";

const router = Router();

router.get("/auto-confirm", async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (
      process.env.CRON_SECRET &&
      authorization !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await executeAutoConfirmJob();

    return res.status(200).json({
      success: true,
      confirmedCount: result.confirmedCount,
    });
  } catch (error) {
    next(error);
  }
});

export default router;