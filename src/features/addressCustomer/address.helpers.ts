import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";

export async function assertOwnership(customerId: string, addressId: string) {
  const address = await prisma.customerAddress.findFirst({
    where: { id: addressId, customerId, deletedAt: null },
  });
 
  if (!address) {
    throw new ResponseError( "ADDRESS_FORBIDDEN", "Alamat tidak ditemukan atau bukan milik kamu.");
  }
 
  return address;
}