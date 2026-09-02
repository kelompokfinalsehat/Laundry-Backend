import cron from "node-cron";
import { runAutoConfirmJob } from "./autoconfirm.services";

export function startAutoConfirmJob() {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const result = await runAutoConfirmJob();

      console.log(
        `[AUTO-CONFIRM] ${result.confirmedCount} order berhasil di-confirm`,
      );
    } catch (error) {
      console.error("[AUTO-CONFIRM] Job gagal:", error);
    }
  });

  console.log("[AUTO-CONFIRM] Scheduler started");
}