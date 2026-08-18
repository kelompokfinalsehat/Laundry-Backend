import { BillPaymentStatus, Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ReportHelper } from "./report.helper";
import { SalesQuery, SalesReport, SalesSummary } from "./report.type";

export class ReportRepository {
    static async getSalesReport(query: SalesQuery, scopedOutletId?: string): Promise<SalesReport>{
        const {startDate, endDate} = ReportHelper.getPeriodRange(query)
        const outletId = scopedOutletId ?? query.outletId
        const where: Prisma.BillWhereInput = {
            paymentStatus: BillPaymentStatus.PAID,
            createdAt: {
                gte: startDate,
                lte: endDate
            },
            ...(outletId && {order: {outletId}})
        }
        const bills = await prisma.bill.findMany({
            where,
            select: ReportHelper.billSelect,
            orderBy: {createdAt: "asc"}
            
        })
        const summary = ReportHelper.buildSumary(bills)
        const trend = ReportHelper.buildTrend(bills, query.period, startDate, endDate)
        const breakdown = ReportHelper.buildBreakdown(bills)
        return {
            period:{
                type: query.period,
                startDate,
                endDate
            },
            summary,
            trend,
            breakdown
        }
    }
}