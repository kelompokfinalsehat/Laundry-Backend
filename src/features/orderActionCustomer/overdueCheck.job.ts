import { runOverdueCheckJob } from "./overdueCheck.services";
import { logger } from "../../configs/logger.config";
import cron from "node-cron";

export async function executeOverdueCheckJob() {
  try {
    const result = await runOverdueCheckJob();

    logger.info(
      `[OVERDUE-CHECK] ${result.overdueCount} order diubah menjadi OVERDUE`,
    );

    return result;
  } catch (error) {
    logger.error("[OVERDUE-CHECK] Job gagal", {
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
}

export function startOverdueCheckJob() {
  // Jalan 1x sehari pada pukul 00:00 UTC
  cron.schedule("0 0 * * *", async () => {
    await executeOverdueCheckJob();
  });

  logger.info("[OVERDUE-CHECK] Scheduler started - daily");
}
