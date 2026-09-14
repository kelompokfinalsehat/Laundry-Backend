import { prisma } from "../../configs/prisma-client.config";

export async function runOverdueCheckJob(): Promise<{ overdueCount: number }> {
  const deadline = new Date();

  const overdueBills = await prisma.bill.findMany({
    where: {
      expiresAt: { lte: deadline },
      paymentStatus: "UNPAID",
      order: { customerStatus: { not: "OVERDUE" } },
    },
    select: { orderId: true },
    distinct: ["orderId"],
  });

  if (overdueBills.length === 0) {
    return { overdueCount: 0 };
  }

  const result = await prisma.order.updateMany({
    where: {
      id: { in: overdueBills.map((b) => b.orderId) },
      customerStatus: { not: "OVERDUE" },
    },
    data: { customerStatus: "OVERDUE" },
  });

  return { overdueCount: result.count };
}
