import { runOverdueCheckJob } from "./overdueCheck.services";
import { logger } from "../../configs/logger.config";

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