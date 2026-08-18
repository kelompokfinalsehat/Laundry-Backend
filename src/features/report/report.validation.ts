import z from "zod"

export class ReportValidation {
    static readonly PARAMS = {

    }
    static readonly QUERY = {
        getSales: z.object({
            period: z.enum(["DAY", "MONTH", "YEAR"]),
            date: z.coerce.date().optional(),
            month: z.coerce.number().int().min(1).max(12).optional(),
            year: z.coerce.number().int().min(2025).max(2100).optional(),
            outletId: z.uuid().optional()
        }).superRefine((data, ctx) => {
            if(data.period === "DAY" && !data.date){
                ctx.addIssue({
                    code: "custom",
                    path: ["date"],
                    message: "Tanggal wajib diisi untuk periode DAY"
                })
            }
            if(data.period === "MONTH" && (!data.month || !data.year)){
                ctx.addIssue({
                    code: "custom",
                    path: ["month"],
                    message: "Bulan dan tahun wajib diisi untuk periode MONTH"
                })
            }
            if(data.period === "YEAR" && !data.year){
                ctx.addIssue({
                    code: "custom",
                    path: ["year"],
                    message: "Year wajib diisi untuk periode YEAR"
                })
            }
        })
    }
    static readonly BODY = {}
}