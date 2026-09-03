import z from "zod";

export class DashboardValidation {
    static readonly QUERY = {
        getDashboard: z.object({
            outletId: z.uuid().optional()
        })
    }
}