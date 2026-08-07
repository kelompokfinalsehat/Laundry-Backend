import { prisma } from "../../configs/prisma-client.config";

export class OutletRepository {
    static async findById(id: string){
        return await prisma.outlet.findUnique({where: {id}})
    }
}