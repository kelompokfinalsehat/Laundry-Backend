import { prisma } from "../../configs/prisma-client.config";

const OVERDUE_WINDOW_DAYS = 7;

export async function runOverdueCheckJob(): Promise<{ overdueCount: number }> {
  const deadline = new Date(Date.now() - OVERDUE_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const candidates = await prisma.bill.findMany({
    where: {
      expiredAt: { lte: deadline },
      paymentStatus: "UNPAID",
      order: { customerStatus: { not: "OVERDUE" } },
    },
    select: { id: true, orderId: true },
  });

  let overdueCount = 0;

  for (const bill of candidates) {
    const updated = await prisma.$transaction(async (tx) => {
      const stillEligible = await tx.bill.findFirst({
        where: {
          id: bill.id,
          paymentStatus: "UNPAID",
          order: { customerStatus: { not: "OVERDUE" } },
        },
      });
      if (!stillEligible) return false;

      await tx.order.update({
        where: { id: bill.orderId },
        data: { customerStatus: "OVERDUE" },
      });
      return true;
    });

    if (updated) overdueCount += 1;
  }

  return { overdueCount };
}