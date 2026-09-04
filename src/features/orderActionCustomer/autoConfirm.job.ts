import cron from "node-cron";
import { runAutoConfirmJob } from "./autoConfirm.services";
import { logger } from "../../configs/logger.config";

export async function executeAutoConfirmJob() {
  try {
    const result = await runAutoConfirmJob();

    logger.info(
      `[AUTO-CONFIRM] ${result.confirmedCount} order berhasil di-confirm`,
    );

    return result;
  } catch (error) {
    logger.error("[AUTO-CONFIRM] Job gagal", {
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
}

export function startAutoConfirmJob() {
  // Jalan 1x sehari pada pukul 00:00 UTC
  cron.schedule("0 0 * * *", async () => {
    await executeAutoConfirmJob();
  });

  logger.info("[AUTO-CONFIRM] Scheduler started - daily");
}