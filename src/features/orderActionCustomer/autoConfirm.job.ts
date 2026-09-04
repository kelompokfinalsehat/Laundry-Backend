import cron from "node-cron";
import { runAutoConfirmJob } from "./autoConfirm.services";
import { logger } from "../../configs/logger.config"; // sesuaikan path

export function startAutoConfirmJob() {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const result = await runAutoConfirmJob();

      logger.info(
        `[AUTO-CONFIRM] ${result.confirmedCount} order berhasil di-confirm`,
      );
    } catch (error) {
      logger.error("[AUTO-CONFIRM] Job gagal", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  logger.info("[AUTO-CONFIRM] Scheduler started");
}