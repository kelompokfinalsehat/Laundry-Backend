import { prisma } from "../../configs/prisma-client.config";
import { CloudinaryUtil } from "../../utils/cloudinary.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { orderActionHelper } from "./orderAction.helpers";
import {
  ComplaintOrderInput,
  DetailOrderInput,
} from "./orderAction.validations";

export class OrderActionServices {
  static async confirm(payload: userPayload, { params }: DetailOrderInput) {
    const order = await prisma.order.findFirst({
      where: { id: params.id, customerId: payload.sub },
      include: { complaint: true },
    });

    if (!order) {
      throw new ResponseError(
        "ORDER_FORBIDDEN",
        "Order tidak ditemukan atau bukan milik kamu.",
      );
    }

    if (order.customerStatus !== "WAITING_CUSTOMER_CONFIRMATION") {
      throw new ResponseError("CONFLICT", "Order belum siap dikonfirmasi.");
    }

    if (order.complaint && order.complaint.status === "OPEN") {
      throw new ResponseError(
        "COMPLAINT_NOT_ALLOWED",
        "Tidak bisa konfirmasi selagi komplain masih diproses.",
      );
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { customerStatus: "RECEIVED_BY_CUSTOMER", completedAt: new Date() },
    });

    return { message: "Konfirmasi berhasil. Terima kasih!" };
  }

  static async complaint(
    payload: userPayload,
    file: Express.Multer.File,
    { params, body }: ComplaintOrderInput,
  ) {
    const order = await prisma.order.findFirst({
      where: { id: params.id, customerId: payload.sub },
      include: { complaint: true, driverAssignments: true },
    });

    if (!order) {
      throw new ResponseError(
        "ORDER_FORBIDDEN",
        "Order tidak ditemukan atau bukan milik kamu.",
      );
    }

    if (order.complaint) {
      throw new ResponseError("COMPLAINT_ALREADY_EXISTS");
    }

    if (!orderActionHelper.isComplaintWindowOpen(order)) {
      throw new ResponseError("COMPLAINT_WINDOW_CLOSED");
    }

    const proofPhotoUrl = await CloudinaryUtil.uploadStream(
      file.buffer,
      "complaints",
    );

    const complaint = await prisma.complaint.create({
      data: {
        orderId: order.id,
        customerId: payload.sub,
        category: body.category,
        description: body.description,
        proofPhotoUrl,
        status: "OPEN",
      },
    });

    return {
      id: complaint.id,
      category: complaint.category,
      status: complaint.status,
    };
  }
}
