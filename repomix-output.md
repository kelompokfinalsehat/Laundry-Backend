This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
api/
  index.ts
prisma/
  migrations/
    20260730155411_init/
      migration.sql
    20260731120319_update_user_and_attendance_schema/
      migration.sql
    20260802142949_simplify_schema_remove_unused_fields/
      migration.sql
    20260803112937_redesign_notification_system_and_split_user_model/
      migration.sql
    20260804133616_make_password_hash_nullable_for_employee/
      migration.sql
    20260806185120_add_refresh_tokens/
      migration.sql
    20260812105735_update_driver_and_customer/
      migration.sql
    20260818182252_remove_notif_availablesince_weight_req_amount/
      migration.sql
    20260819095953_add_unique_order_task_to_driver_assignment/
      migration.sql
    20260819100444_add_unique_constraints_to_driver_and_worker_assignment/
      migration.sql
    20260819171602_menambahkan_paid_at_ditable_order_dan_bill/
      migration.sql
    20260825185139_menyesuaikan_field_alamat_untuk_simpan_id_api_raja_ongkir/
      migration.sql
    20260825201033_menyesuaikan_field_alamat/
      migration.sql
    20260826120841_add_worker_assignment_attempt/
      migration.sql
    20260828182906_add_order_completed_at/
      migration.sql
    20260829191856_tambah_direct_url_payment/
      migration.sql
    migration_lock.toml
  schema.prisma
  seed.ts
src/
  configs/
    axios.config.ts
    env.config.ts
    nodemailer.configs.ts
    prisma-client.config.ts
  constants/
    message.constant.ts
    pagination.constant.ts
  features/
    addressCustomer/
      address.controller.ts
      address.helpers.ts
      address.routes.ts
      address.services.ts
      address.validation.ts
    authCustomer/
      authCustomer.controllers.ts
      authCustomer.helpers.ts
      authCustomer.routes.ts
      authCustomer.services.ts
      AuthCustomer.validation.ts
    authEmployee/
      authEmployee.controllers.ts
      authEmployee.routes.ts
      authEmployee.services.ts
      authEmployee.validation.ts
    authShared/
      authSession.controllers.ts
    bypass/
      bypass.controller.ts
      bypass.helper.ts
      bypass.repository.ts
      bypass.route.ts
      bypass.service.ts
      bypass.type.ts
      bypass.validation.ts
    complaint/
      complaint.controller.ts
      complaint.helper.ts
      complaint.repository.ts
      complaint.route.ts
      complaint.service.ts
      complaint.type.ts
      complaint.validation.ts
    customer/
      customer.controller.ts
      customer.repository.ts
      customer.route.ts
      customer.service.ts
      customer.type.ts
      customer.validation.ts
    cutomerProfile/
      profile.controllers.ts
      profile.routes.ts
      profile.service.ts
      profile.validation.ts
    dashboard/
      dashboard.controller.ts
      dashboard.repository.ts
      dashboard.route.ts
      dashboard.service.ts
      dashboard.type.ts
      dashboard.validation.ts
    employee/
      employee.controller.ts
      employee.helper.ts
      employee.repository.ts
      employee.route.ts
      employee.service.ts
      employee.type.ts
      employee.validation.ts
    laundry-item/
      laundry-item.controller.ts
      laundry-item.helper.ts
      laundry-item.repository.ts
      laundry-item.route.ts
      laundry-item.service.ts
      laundry-item.type.ts
      laundry-item.validation.ts
    mailers/
      mailer.helpers.ts
      mailer.service.ts
    order/
      order.controller.ts
      order.helper.ts
      order.repository.ts
      order.route.ts
      order.service.ts
      order.type.ts
      order.validation.ts
    orderCustomer/
      order.constans.ts
      order.controllers.ts
      order.helpers.ts
      order.routes.ts
      order.services.ts
      order.validation.ts
    outlet/
      outlet.controller.ts
      outlet.helper.ts
      outlet.repository.ts
      outlet.route.ts
      outlet.service.ts
      outlet.type.ts
      outlet.validation.ts
    paymentCustomer/
      payments.controllers.ts
      payments.repositories.ts
      payments.routes.ts
      payments.services.ts
      payments.validations.ts
    pricing/
      pricing.controller.ts
      pricing.helper.ts
      pricing.repository.ts
      pricing.route.ts
      pricing.service.ts
      pricing.type.ts
      pricing.validation.ts
    region/
      region.controllers.ts
      region.routes.ts
      region.services.ts
      region.validations.ts
    report/
      report.controller.ts
      report.helper.ts
      report.repository.ts
      report.route.ts
      report.service.ts
      report.type.ts
      report.validation.ts
    shared/
      driverQueue.service.ts
  helpers/
    date.helper.ts
    file.helper.ts
    pagination.helper.ts
    prisma.helper.ts
    query.helper.ts
    response.helper.ts
  middlewares/
    auth.middleware.ts
    auth.middlewares.ts
    error-handler.middleware.ts
    multer.middleware.ts
  routes/
    index.ts
  types/
    api-response.ts
    geocoding.type.ts
    pagination.ts
  utils/
    Auth/
      bcrypt.utils.ts
      cookie.utils.ts
      google.utils.ts
      jwt.utils.ts
      refreshToken.utils.ts
      token.utils.ts
    errors/
      errors.ts
      response-error.utils.ts
    mailer/
      template/
        change-email-verification.hbs
        email-verification.hbs
        employee-invitation.hbs
        password-reset.hbs
        tamplate.util.ts
      mailer.utils.ts
    orderCustomer/
      order.code.ts
    cloudinary.utils.ts
    geocoding.util.ts
    midtrans.utils.ts
    pagination.util.ts
  validations/
    pagination.validation.ts
    validate.ts
  app.ts
.gitignore
package.json
prisma.config.ts
tsconfig.json
```

# Files

## File: api/index.ts
```typescript
import app from "../src/app";

export default app;
```

## File: prisma/migrations/20260730155411_init/migration.sql
```sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'SUPER_ADMIN', 'OUTLET_ADMIN', 'WORKER', 'DRIVER');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DutyStatus" AS ENUM ('ON_DUTY', 'OFF_DUTY');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY');

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('WASHING', 'IRONING', 'PACKING');

-- CreateEnum
CREATE TYPE "AuthTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'ACCOUNT_INVITATION');

-- CreateEnum
CREATE TYPE "HandoverMethod" AS ENUM ('DIRECT', 'CONTACTLESS');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('WAITING_DRIVER_PICKUP', 'ON_THE_WAY_TO_OUTLET', 'ARRIVED_AT_OUTLET', 'WASHING', 'IRONING', 'PACKING', 'WAITING_PAYMENT', 'READY_FOR_DELIVERY', 'ON_THE_WAY_TO_CUSTOMER', 'RECEIVED_BY_CUSTOMER');

-- CreateEnum
CREATE TYPE "InternalStatus" AS ENUM ('ON_HOLD_BYPASS', 'PAUSED_OFF_HOURS');

-- CreateEnum
CREATE TYPE "BillPaymentStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateEnum
CREATE TYPE "PickupDeliveryType" AS ENUM ('PICKUP', 'DELIVERY');

-- CreateEnum
CREATE TYPE "DriverAssignmentStatus" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkerAssignmentStatus" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'PAUSED_OFF_HOURS', 'ON_HOLD_BYPASS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BypassStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentTransactionStatus" AS ENUM ('PENDING', 'SETTLEMENT', 'CAPTURE', 'DENY', 'CANCEL', 'EXPIRE');

-- CreateEnum
CREATE TYPE "ComplaintCategory" AS ENUM ('TIDAK_SESUAI', 'RUSAK', 'HILANG');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('OPEN', 'APPROVED', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PAYMENT_DUE', 'DRIVER_ASSIGNMENT', 'WORKER_ASSIGNMENT', 'BYPASS_REQUEST', 'NEW_COMPLAINT');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" "Role" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "auth_provider" "AuthProvider" NOT NULL DEFAULT 'EMAIL',
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "profile_photo_url" TEXT,
    "phone" TEXT,
    "account_status" "AccountStatus",
    "duty_status" "DutyStatus",
    "availability_status" "AvailabilityStatus",
    "current_outlet_id" UUID,
    "station_type" "StationType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" "AuthTokenType" NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outlets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "outlets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "label" TEXT,
    "formatted_address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "phone" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "customer_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laundry_pricings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "price_per_kg" DECIMAL(12,2) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "laundry_pricings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_rates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "max_distance_meters" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipping_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laundry_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "laundry_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_code" TEXT NOT NULL,
    "customer_id" UUID NOT NULL,
    "outlet_id" UUID NOT NULL,
    "address_snapshot" TEXT NOT NULL,
    "address_phone_snapshot" TEXT NOT NULL,
    "address_latitude" DECIMAL(10,7) NOT NULL,
    "address_longitude" DECIMAL(10,7) NOT NULL,
    "distance_meters" DECIMAL(10,2) NOT NULL,
    "handover_method" "HandoverMethod" NOT NULL,
    "contactless_instruction" TEXT,
    "pickup_date" DATE NOT NULL,
    "customer_status" "CustomerStatus" NOT NULL,
    "internal_status" "InternalStatus",
    "received_at" TIMESTAMP(3),
    "received_by" UUID,
    "cancelled_at" TIMESTAMP(3),
    "cancel_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "laundry_pricing_id" UUID,
    "price_per_kg_snapshot" DECIMAL(12,2),
    "shipping_rate_id" UUID,
    "shipping_fee_snapshot" DECIMAL(12,2),
    "weight_kg" DECIMAL(10,2),
    "total_amount" DECIMAL(12,2),
    "payment_status" "BillPaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "laundry_item_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,
    "outlet_id" UUID NOT NULL,
    "task_type" "PickupDeliveryType" NOT NULL,
    "queued_at" TIMESTAMP(3) NOT NULL,
    "assigned_at" TIMESTAMP(3),
    "departed_at" TIMESTAMP(3),
    "picked_up_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "cancel_reason" TEXT,
    "status" "DriverAssignmentStatus" NOT NULL,
    "reassigned_from" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "driver_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proof_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "driver_assignment_id" UUID NOT NULL,
    "photo_type" "PickupDeliveryType" NOT NULL,
    "photo_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proof_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "worker_id" UUID NOT NULL,
    "outlet_id" UUID NOT NULL,
    "station_type" "StationType" NOT NULL,
    "queued_at" TIMESTAMP(3) NOT NULL,
    "assigned_at" TIMESTAMP(3),
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "status" "WorkerAssignmentStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "worker_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bypass_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "worker_assignment_id" UUID NOT NULL,
    "station_type" "StationType" NOT NULL,
    "requested_by" UUID NOT NULL,
    "quantity_diff_json" TEXT,
    "status" "BypassStatus" NOT NULL DEFAULT 'PENDING',
    "decided_by" UUID,
    "decided_at" TIMESTAMP(3),
    "approval_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bypass_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bill_id" UUID NOT NULL,
    "gateway_order_id" TEXT NOT NULL,
    "midtrans_transaction_id" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "PaymentTransactionStatus" NOT NULL,
    "is_final" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_webhooks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payment_id" UUID NOT NULL,
    "event_type" TEXT,
    "raw_payload" TEXT NOT NULL,
    "signature" TEXT,
    "is_valid" BOOLEAN NOT NULL DEFAULT false,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "category" "ComplaintCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "proof_photo_url" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'OPEN',
    "handled_by" UUID,
    "response_note" TEXT,
    "decided_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "outlet_id" UUID NOT NULL,
    "attendance_date" DATE NOT NULL,
    "clock_in_at" TIMESTAMP(3),
    "clock_out_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "order_id" UUID,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_id" UUID,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID,
    "old_ref_id" UUID,
    "new_ref_id" UUID,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_role_current_outlet_id_idx" ON "users"("role", "current_outlet_id");

-- CreateIndex
CREATE INDEX "auth_tokens_user_id_type_idx" ON "auth_tokens"("user_id", "type");

-- CreateIndex
CREATE INDEX "auth_tokens_token_hash_idx" ON "auth_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "customer_addresses_customer_id_idx" ON "customer_addresses"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_code_key" ON "orders"("order_code");

-- CreateIndex
CREATE INDEX "orders_customer_id_idx" ON "orders"("customer_id");

-- CreateIndex
CREATE INDEX "orders_outlet_id_idx" ON "orders"("outlet_id");

-- CreateIndex
CREATE INDEX "orders_customer_status_idx" ON "orders"("customer_status");

-- CreateIndex
CREATE INDEX "orders_pickup_date_idx" ON "orders"("pickup_date");

-- CreateIndex
CREATE UNIQUE INDEX "bills_order_id_key" ON "bills"("order_id");

-- CreateIndex
CREATE INDEX "bills_order_id_idx" ON "bills"("order_id");

-- CreateIndex
CREATE INDEX "bills_payment_status_idx" ON "bills"("payment_status");

-- CreateIndex
CREATE INDEX "driver_assignments_outlet_id_status_idx" ON "driver_assignments"("outlet_id", "status");

-- CreateIndex
CREATE INDEX "driver_assignments_driver_id_idx" ON "driver_assignments"("driver_id");

-- CreateIndex
CREATE INDEX "driver_assignments_order_id_idx" ON "driver_assignments"("order_id");

-- CreateIndex
CREATE INDEX "worker_assignments_outlet_id_station_type_status_idx" ON "worker_assignments"("outlet_id", "station_type", "status");

-- CreateIndex
CREATE INDEX "worker_assignments_worker_id_idx" ON "worker_assignments"("worker_id");

-- CreateIndex
CREATE INDEX "worker_assignments_order_id_idx" ON "worker_assignments"("order_id");

-- CreateIndex
CREATE INDEX "bypass_requests_order_id_idx" ON "bypass_requests"("order_id");

-- CreateIndex
CREATE INDEX "bypass_requests_status_idx" ON "bypass_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_gateway_order_id_key" ON "payments"("gateway_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_midtrans_transaction_id_key" ON "payments"("midtrans_transaction_id");

-- CreateIndex
CREATE INDEX "payments_bill_id_idx" ON "payments"("bill_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payment_webhooks_payment_id_idx" ON "payment_webhooks"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "complaints_order_id_key" ON "complaints"("order_id");

-- CreateIndex
CREATE INDEX "attendances_user_id_attendance_date_idx" ON "attendances"("user_id", "attendance_date");

-- CreateIndex
CREATE INDEX "attendances_outlet_id_idx" ON "attendances"("outlet_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_idx" ON "audit_logs"("actor_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_current_outlet_id_fkey" FOREIGN KEY ("current_outlet_id") REFERENCES "outlets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_laundry_pricing_id_fkey" FOREIGN KEY ("laundry_pricing_id") REFERENCES "laundry_pricings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_shipping_rate_id_fkey" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_laundry_item_id_fkey" FOREIGN KEY ("laundry_item_id") REFERENCES "laundry_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_reassigned_from_fkey" FOREIGN KEY ("reassigned_from") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proof_photos" ADD CONSTRAINT "proof_photos_driver_assignment_id_fkey" FOREIGN KEY ("driver_assignment_id") REFERENCES "driver_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_worker_assignment_id_fkey" FOREIGN KEY ("worker_assignment_id") REFERENCES "worker_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_decided_by_fkey" FOREIGN KEY ("decided_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_webhooks" ADD CONSTRAINT "payment_webhooks_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_handled_by_fkey" FOREIGN KEY ("handled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## File: prisma/migrations/20260731120319_update_user_and_attendance_schema/migration.sql
```sql
/*
  Warnings:

  - A unique constraint covering the columns `[user_id,attendance_date]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CustomerStatus" ADD VALUE 'WAITING_CUSTOMER_CONFIRMATION';

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "worker_assignments" DROP CONSTRAINT "worker_assignments_worker_id_fkey";

-- DropIndex
DROP INDEX "attendances_user_id_attendance_date_idx";

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "driver_assignments" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "available_since_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "worker_assignments" ALTER COLUMN "worker_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attendances_user_id_attendance_date_key" ON "attendances"("user_id", "attendance_date");

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## File: prisma/migrations/20260802142949_simplify_schema_remove_unused_fields/migration.sql
```sql
/*
  Warnings:

  - The values [CLOSED] on the enum `ComplaintStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELLED] on the enum `DriverAssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PAUSED_OFF_HOURS] on the enum `WorkerAssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `auth_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `cancel_reason` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled_at` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `reassigned_from` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `cancel_reason` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `contactless_instruction` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `handover_method` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `internal_status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `availability_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `duty_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proof_photos` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `laundry_pricing_id` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_per_kg_snapshot` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shipping_rate_id` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shipping_fee_snapshot` on table `bills` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('OFF_DUTY', 'AVAILABLE', 'BUSY');

-- AlterEnum
BEGIN;
CREATE TYPE "ComplaintStatus_new" AS ENUM ('OPEN', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."complaints" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "complaints" ALTER COLUMN "status" TYPE "ComplaintStatus_new" USING ("status"::text::"ComplaintStatus_new");
ALTER TYPE "ComplaintStatus" RENAME TO "ComplaintStatus_old";
ALTER TYPE "ComplaintStatus_new" RENAME TO "ComplaintStatus";
DROP TYPE "public"."ComplaintStatus_old";
ALTER TABLE "complaints" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DriverAssignmentStatus_new" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "driver_assignments" ALTER COLUMN "status" TYPE "DriverAssignmentStatus_new" USING ("status"::text::"DriverAssignmentStatus_new");
ALTER TYPE "DriverAssignmentStatus" RENAME TO "DriverAssignmentStatus_old";
ALTER TYPE "DriverAssignmentStatus_new" RENAME TO "DriverAssignmentStatus";
DROP TYPE "public"."DriverAssignmentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkerAssignmentStatus_new" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'ON_HOLD_BYPASS', 'COMPLETED');
ALTER TABLE "worker_assignments" ALTER COLUMN "status" TYPE "WorkerAssignmentStatus_new" USING ("status"::text::"WorkerAssignmentStatus_new");
ALTER TYPE "WorkerAssignmentStatus" RENAME TO "WorkerAssignmentStatus_old";
ALTER TYPE "WorkerAssignmentStatus_new" RENAME TO "WorkerAssignmentStatus";
DROP TYPE "public"."WorkerAssignmentStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_laundry_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_shipping_rate_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_reassigned_from_fkey";

-- DropForeignKey
ALTER TABLE "proof_photos" DROP CONSTRAINT "proof_photos_driver_assignment_id_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "laundry_pricing_id" SET NOT NULL,
ALTER COLUMN "price_per_kg_snapshot" SET NOT NULL,
ALTER COLUMN "shipping_rate_id" SET NOT NULL,
ALTER COLUMN "shipping_fee_snapshot" SET NOT NULL;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "cancel_reason",
DROP COLUMN "cancelled_at",
DROP COLUMN "reassigned_from";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "channel";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cancel_reason",
DROP COLUMN "cancelled_at",
DROP COLUMN "contactless_instruction",
DROP COLUMN "handover_method",
DROP COLUMN "internal_status";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "availability_status",
DROP COLUMN "duty_status",
ADD COLUMN     "work_status" "WorkStatus";

-- DropTable
DROP TABLE "audit_logs";

-- DropTable
DROP TABLE "proof_photos";

-- DropEnum
DROP TYPE "AvailabilityStatus";

-- DropEnum
DROP TYPE "DutyStatus";

-- DropEnum
DROP TYPE "HandoverMethod";

-- DropEnum
DROP TYPE "InternalStatus";

-- DropEnum
DROP TYPE "NotificationChannel";

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_laundry_pricing_id_fkey" FOREIGN KEY ("laundry_pricing_id") REFERENCES "laundry_pricings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_shipping_rate_id_fkey" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

## File: prisma/migrations/20260803112937_redesign_notification_system_and_split_user_model/migration.sql
```sql
/*
  Warnings:

  - You are about to drop the column `user_id` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `auth_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `queued_at` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `queued_at` on the `worker_assignments` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employee_id,attendance_date]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outlet_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_role` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_scheduled_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CustomerStatus" ADD VALUE 'SCHEDULED';
ALTER TYPE "CustomerStatus" ADD VALUE 'OVERDUE';

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_user_id_fkey";

-- DropForeignKey
ALTER TABLE "auth_tokens" DROP CONSTRAINT "auth_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bypass_requests" DROP CONSTRAINT "bypass_requests_decided_by_fkey";

-- DropForeignKey
ALTER TABLE "bypass_requests" DROP CONSTRAINT "bypass_requests_requested_by_fkey";

-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_handled_by_fkey";

-- DropForeignKey
ALTER TABLE "customer_addresses" DROP CONSTRAINT "customer_addresses_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_order_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_received_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_current_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "worker_assignments" DROP CONSTRAINT "worker_assignments_worker_id_fkey";

-- DropIndex
DROP INDEX "attendances_user_id_attendance_date_key";

-- DropIndex
DROP INDEX "auth_tokens_user_id_type_idx";

-- DropIndex
DROP INDEX "notifications_user_id_is_read_idx";

-- DropIndex
DROP INDEX "worker_assignments_outlet_id_station_type_status_idx";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "user_id",
ADD COLUMN     "employee_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" UUID,
ADD COLUMN     "employee_id" UUID;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "queued_at";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "is_read",
DROP COLUMN "order_id",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "outlet_id" UUID NOT NULL,
ADD COLUMN     "target_role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "pickup_scheduled_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "worker_assignments" DROP COLUMN "queued_at";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "NotificationType";

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "auth_provider" "AuthProvider" NOT NULL DEFAULT 'EMAIL',
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "profile_photo_url" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" "Role" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "profile_photo_url" TEXT,
    "phone" TEXT,
    "account_status" "AccountStatus" NOT NULL,
    "work_status" "WorkStatus",
    "available_since_at" TIMESTAMP(3),
    "current_outlet_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE INDEX "employees_role_idx" ON "employees"("role");

-- CreateIndex
CREATE INDEX "employees_role_current_outlet_id_idx" ON "employees"("role", "current_outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendances_employee_id_attendance_date_key" ON "attendances"("employee_id", "attendance_date");

-- CreateIndex
CREATE INDEX "auth_tokens_customer_id_type_idx" ON "auth_tokens"("customer_id", "type");

-- CreateIndex
CREATE INDEX "auth_tokens_employee_id_type_idx" ON "auth_tokens"("employee_id", "type");

-- CreateIndex
CREATE INDEX "bills_created_at_idx" ON "bills"("created_at");

-- CreateIndex
CREATE INDEX "notifications_target_role_outlet_id_sent_at_idx" ON "notifications"("target_role", "outlet_id", "sent_at");

-- CreateIndex
CREATE INDEX "orders_pickup_scheduled_at_idx" ON "orders"("pickup_scheduled_at");

-- CreateIndex
CREATE INDEX "worker_assignments_outlet_id_status_idx" ON "worker_assignments"("outlet_id", "status");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_current_outlet_id_fkey" FOREIGN KEY ("current_outlet_id") REFERENCES "outlets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_decided_by_fkey" FOREIGN KEY ("decided_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_handled_by_fkey" FOREIGN KEY ("handled_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

## File: prisma/migrations/migration_lock.toml
```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

## File: src/configs/prisma-client.config.ts
```typescript
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
```

## File: prisma/migrations/20260804133616_make_password_hash_nullable_for_employee/migration.sql
```sql
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "password_hash" DROP NOT NULL;
```

## File: prisma/migrations/20260806185120_add_refresh_tokens/migration.sql
```sql
-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID,
    "employee_id" UUID,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_customer_id_idx" ON "refresh_tokens"("customer_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_employee_id_idx" ON "refresh_tokens"("employee_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_hash_idx" ON "refresh_tokens"("token_hash");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## File: prisma/migrations/20260812105735_update_driver_and_customer/migration.sql
```sql
/*
  Warnings:

  - You are about to drop the column `departed_at` on the `driver_assignments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "pending_email" TEXT;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "departed_at";
```

## File: prisma/migrations/20260818182252_remove_notif_availablesince_weight_req_amount/migration.sql
```sql
/*
  Warnings:

  - You are about to drop the column `available_since_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `weight_kg` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_amount` on table `bills` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_outlet_id_fkey";

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "weight_kg" SET NOT NULL,
ALTER COLUMN "total_amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "available_since_at";

-- DropTable
DROP TABLE "notifications";
```

## File: prisma/migrations/20260819095953_add_unique_order_task_to_driver_assignment/migration.sql
```sql
/*
  Warnings:

  - A unique constraint covering the columns `[order_id,task_type]` on the table `driver_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "driver_assignments_order_id_task_type_key" ON "driver_assignments"("order_id", "task_type");
```

## File: prisma/migrations/20260819100444_add_unique_constraints_to_driver_and_worker_assignment/migration.sql
```sql
/*
  Warnings:

  - A unique constraint covering the columns `[order_id,station_type]` on the table `worker_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "worker_assignments_order_id_station_type_key" ON "worker_assignments"("order_id", "station_type");
```

## File: prisma/migrations/20260819171602_menambahkan_paid_at_ditable_order_dan_bill/migration.sql
```sql
-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "paid_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paid_at" TIMESTAMP(3);
```

## File: prisma/migrations/20260825185139_menyesuaikan_field_alamat_untuk_simpan_id_api_raja_ongkir/migration.sql
```sql
/*
  Warnings:

  - Added the required column `city_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_detail` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "district_id" TEXT NOT NULL,
ADD COLUMN     "province_id" TEXT NOT NULL,
ADD COLUMN     "street_detail" TEXT NOT NULL,
ADD COLUMN     "sub_district_id" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;
```

## File: prisma/migrations/20260825201033_menyesuaikan_field_alamat/migration.sql
```sql
/*
  Warnings:

  - Added the required column `city_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" ADD COLUMN     "city_name" TEXT NOT NULL,
ADD COLUMN     "district_name" TEXT NOT NULL,
ADD COLUMN     "province_name" TEXT NOT NULL,
ADD COLUMN     "sub_district_name" TEXT NOT NULL;
```

## File: prisma/migrations/20260826120841_add_worker_assignment_attempt/migration.sql
```sql
-- AlterTable
ALTER TABLE "worker_assignments" ADD COLUMN     "attempt" INTEGER NOT NULL DEFAULT 0;
```

## File: prisma/migrations/20260828182906_add_order_completed_at/migration.sql
```sql
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "completed_at" TIMESTAMP(3);
```

## File: prisma/migrations/20260829191856_tambah_direct_url_payment/migration.sql
```sql
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "redirectUrl" TEXT;
```

## File: src/configs/nodemailer.configs.ts
```typescript
import nodemailer from "nodemailer";

import {
  NODEMAILER_GOOGLE_APP_PASSWORD,
  NODEMAILER_GOOGLE_APP_USER_EMAIL,
} from "./env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_GOOGLE_APP_USER_EMAIL,
    pass: NODEMAILER_GOOGLE_APP_PASSWORD,
  },
});

export default transporter;
```

## File: src/features/addressCustomer/address.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AddressValidation } from "./address.validation";
import { AddressService } from "./address.services";
import { StatusCodes } from "http-status-codes";

export class AddressController {
  static async create(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(AddressValidation.CREATE_ADDRESS, {
      body: req.body,
    });

    const address = await AddressService.create(payload, { body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "Alamat baru berhasil di tambahkan.",
    });
  }
  static async getAddress(req: Request, res: Response) {
    const payload = res.locals.payload;
    
    const address = await AddressService.getAddress(payload);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "List alamat berhasil didapatkan",
    });
  }
  static async update(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params, body } = validate(AddressValidation.UPDATE_ADDRESS, {
      params: req.params,
      body: req.body,
    });

   const address =  await AddressService.update(payload, { params, body });

   return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "Alamat berhasil di perbarui.",
    });
  }
  static async delete(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(AddressValidation.ADDRESS_ID, {
      params: req.params,
    });

   const address = await AddressService.delete(payload,{params})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: `${address} berhasil di hapus dari alamat anda`,
    });
  }
  static async setPrimary(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(AddressValidation.ADDRESS_ID, {
      params: req.params,
    });

    const address = await AddressService.setPrimary(payload,{params})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: `${address} berhasil dijadikan sebagai alamat utama`,
    });
  }
}
```

## File: src/features/addressCustomer/address.helpers.ts
```typescript
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
```

## File: src/features/addressCustomer/address.routes.ts
```typescript
import { Router } from "express";
import { AddressController } from "./address.controller";

const router = Router();

router.post("/", AddressController.create);
router.get("/", AddressController.getAddress);
router.patch("/:id", AddressController.update);
router.delete("/:id", AddressController.delete);
router.patch("/:id/set-primary", AddressController.setPrimary);

export default router;
```

## File: src/features/authCustomer/authCustomer.helpers.ts
```typescript
import { Customer, AuthToken } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class AuthCustomerHelper {
  /** Dipakai di register — pastikan email belum terdaftar. */
  static assertEmailAvailable(existing: Customer | null): void {
    if (existing) {
      throw new ResponseError("EMAIL_ALREADY_REGISTERED");
    }
  }

  /**
   * Dipakai di verifyCustomerEmail & resetPassword — validasi AuthToken
   * generik (belum dipakai, belum kedaluwarsa, punya customerId).
   * Setelah lolos, TypeScript otomatis tahu record.customerId pasti string.
   */
  static assertValidAuthToken(
    record: AuthToken | null,
    context: "EMAIL_VERIFICATION" | "PASSWORD_RESET",
  ): asserts record is AuthToken & { customerId: string } {
    const label =
      context === "EMAIL_VERIFICATION" ? "verifikasi" : "reset password";

    if (!record || !record.customerId) {
      throw new ResponseError("INVALID_TOKEN", `Link ${label} tidak valid.`);
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        `Link ${label} ini sudah pernah dipakai.`,
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        `Link ${label} sudah kedaluwarsa. Silakan minta link baru.`,
      );
    }
  }

  /** Dipakai di resendVerification — tolak kalau email sudah terverifikasi. */
  static assertNotYetVerified(customer: Customer): void {
    if (customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terverifikasi. Silakan login.",
      );
    }
  }

  /**
   * Dipakai di login — validasi customer boleh login pakai email/password.
   * Setelah lolos, TypeScript tahu customer.passwordHash pasti string.
   */
  static assertCustomerCanLogin(
    customer: Customer | null,
  ): asserts customer is Customer & { passwordHash: string } {
    if (!customer || customer.deletedAt) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    if (!customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Akun ini belum terverifikasi",
      );
    }

    if (customer.authProvider !== "EMAIL" || !customer.passwordHash) {
      throw new ResponseError(
        "GOOGLE_ACCOUNT_NO_PASSWORD",
        "Akun ini terdaftar via Google. Silakan login dengan Google.",
      );
    }
  }

  /** Dipakai di login — validasi hasil compare password. */
  static assertPasswordMatches(isValid: boolean): void {
    if (!isValid) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }
  }

  /** Dipakai di loginGoogle — tolak kalau email sudah dipakai provider EMAIL. */
  static assertGoogleLoginAllowed(existing: Customer | null): void {
    if (existing && existing.authProvider !== "GOOGLE") {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terdaftar menggunakan email/password. Silakan login dengan cara itu.",
      );
    }
  }

  /** Dipakai di loginGoogle — pastikan akun belum di-soft-delete. */
  static assertAccountActive(customer: Customer): void {
    if (customer.deletedAt) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun ini tidak aktif.");
    }
  }

  /**
   * Dipakai di forgotPassword — beda dari yang lain, ini TIDAK throw
   * (harus selalu balas generic response demi mencegah email enumeration).
   * Cukup dicek: apakah token reset perlu benar-benar diterbitkan atau tidak.
   */
  static assertPasswordResetEligible(
    customer: Customer | null,
  ): customer is Customer {
    if (!customer || customer.deletedAt) {
      return false; // caller balas generic response
    }

    if (customer.authProvider !== "EMAIL") {
      throw new ResponseError("GOOGLE_ACCOUNT_NO_PASSWORD");
    }

    return true;
  }
}
```

## File: src/features/authEmployee/authEmployee.validation.ts
```typescript
import * as z from "zod";

export class AuthEmployeeValidation {
  static readonly LOGIN_EMPLOYEE = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(1, "Password wajib diisi"),
    }),
  });

  static readonly ACCEPT_INVITATION = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      password: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });

  static readonly FORGOT_PASSWORD = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
    }),
  });

  static readonly RESET_PASSWORD = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      newPassword: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });
}

export type LoginEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.LOGIN_EMPLOYEE
>;
export type AcceptInvitationInput = z.infer<
  typeof AuthEmployeeValidation.ACCEPT_INVITATION
>;
export type ForgotPasswordEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.FORGOT_PASSWORD
>;
export type ResetPasswordEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.RESET_PASSWORD
>;
```

## File: src/features/bypass/bypass.type.ts
```typescript
import z from "zod";
import { BypassValidation } from "./bypass.validation";

export type BypassQuery = z.infer<typeof BypassValidation.QUERY.getBypassRequests>
export type ApproveBypassBody = z.infer<typeof BypassValidation.BODY.approve>
export type QuantityDifference = {
    orderItemId: string,
    officialQuantity: number,
    submittedQuantity: number,
    difference: number
}
```

## File: src/features/complaint/complaint.helper.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { ComplaintQuery } from "./complaint.type";

export class ComplaintHelper {
  static readonly listInclude = Prisma.validator<Prisma.ComplaintInclude>()({
    customer: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },

    order: {
      select: {
        id: true,
        orderCode: true,
        outletId: true,
      },
    },

    handledByUser: {
      select: {
        id: true,
        name: true,
      },
    },
  });
  static readonly detailInclude = Prisma.validator<Prisma.ComplaintInclude>()({
    customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      order: {
        include: {
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },

          orderItems: {
            include: {
              laundryItem: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },

          bill: {
            select: {
              id: true,
              weightKg: true,
              totalAmount: true,
              paymentStatus: true,
            },
          },
        },
      },

      handledByUser: {
        select: {
          id: true,
          name: true,
        },
      },
  })
  static defineComplaintQuery(query: ComplaintQuery, outletId?: string){
    const where: Prisma.ComplaintWhereInput = {}
        if(outletId) where.order = {outletId}
        if(query.search){
            where.OR = [
                {order: {orderCode: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
                {customer: {name: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
                {customer: {email: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
            ]
        }
        if(query.status) where.status = query.status
        if(query.category) where.category = query.category
        if(query.startDate || query.endDate){
            where.createdAt = {
                ...(query.startDate && {
                    gte: query.startDate
                }),
                ...(query.endDate && {
                    lte: query.endDate
                })
            }
        }
        return where
  }
}
```

## File: src/features/customer/customer.type.ts
```typescript
import z from "zod";
import { CustomerValidation } from "./customer.validation";

export type CustomerQuery = z.infer<typeof CustomerValidation.QUERY.getCustomers>
```

## File: src/features/dashboard/dashboard.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { DashboardValidation } from "./dashboard.validation";
import { DashboardService } from "./dashboard.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class DashboardController {
    static async getDashboard(req: Request, res: Response){
        const query = validate(DashboardValidation.QUERY.getDashboard, req.query)
        const {sub} = res.locals.payload
        const result = await DashboardService.getDashboard(query, sub)
        return ResponseHelper.success(res, Message.FETCHED, result)
    }
}
```

## File: src/features/dashboard/dashboard.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { DashboardController } from "./dashboard.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]))
router.get("/", DashboardController.getDashboard)

export default router
```

## File: src/features/dashboard/dashboard.validation.ts
```typescript
import z from "zod";

export class DashboardValidation {
    static readonly QUERY = {
        getDashboard: z.object({
            outletId: z.uuid().optional()
        })
    }
}
```

## File: src/features/laundry-item/laundry-item.type.ts
```typescript
import z from "zod";
import { LaundryItemValidation } from "./laundry-item.validation";

export type LaundryItemQuery = z.infer<typeof LaundryItemValidation.QUERY.getLaundryItems>
export type CreateLaundryItemBody = z.infer<typeof LaundryItemValidation.BODY.createLaundryItem>
export type UpdateLaundryItemBody = z.infer<typeof LaundryItemValidation.BODY.updateLaundryItem>
```

## File: src/features/orderCustomer/order.constans.ts
```typescript
import { CustomerStatus } from "../../../generated/prisma";


export const ORDER_STATUS_GROUPS = {
  BELUM_BAYAR: [
    CustomerStatus.WAITING_PAYMENT,
    CustomerStatus.OVERDUE,
  ],
  SEDANG_DIPROSES: [
    CustomerStatus.SCHEDULED,
    CustomerStatus.WAITING_DRIVER_PICKUP,
    CustomerStatus.ON_THE_WAY_TO_OUTLET,
    CustomerStatus.ARRIVED_AT_OUTLET,
    CustomerStatus.WASHING,
    CustomerStatus.IRONING,
    CustomerStatus.PACKING,
  ],
  DIKIRIM: [
    CustomerStatus.READY_FOR_DELIVERY,
    CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
    CustomerStatus.WAITING_CUSTOMER_CONFIRMATION,
  ],
  SELESAI: [
    CustomerStatus.RECEIVED_BY_CUSTOMER,
  ],
} as const satisfies Record<string, CustomerStatus[]>;

export type OrderStatusGroupKey = keyof typeof ORDER_STATUS_GROUPS;

// Label untuk ditampilkan di tab UI, biar frontend tidak hardcode string terpisah
export const ORDER_STATUS_GROUP_LABELS: Record<OrderStatusGroupKey, string> = {
  BELUM_BAYAR: "Belum Bayar",
  SEDANG_DIPROSES: "Sedang Diproses",
  DIKIRIM: "Dikirim",
  SELESAI: "Selesai",
};

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  SCHEDULED: "Menunggu Jadwal Pickup",
  WAITING_DRIVER_PICKUP: "Menunggu Penjemputan Driver",
  ON_THE_WAY_TO_OUTLET: "Laundry Sedang Menuju Outlet",
  ARRIVED_AT_OUTLET: "Laundry Telah Sampai Outlet",
  WASHING: "Laundry Sedang Dicuci",
  IRONING: "Laundry Sedang Disetrika",
  PACKING: "Laundry Sedang Di Packing",
  WAITING_PAYMENT: "Menunggu Pembayaran",
  OVERDUE: "Pembayaran Terlambat", // terminal — BR-PAY-04
  READY_FOR_DELIVERY: "Laundry Siap Diantar",
  ON_THE_WAY_TO_CUSTOMER: "Laundry Sedang Dikirim Menuju Customer",
  WAITING_CUSTOMER_CONFIRMATION: "Menunggu Konfirmasi Customer",
  RECEIVED_BY_CUSTOMER: "Laundry Telah Diterima Customer / Selesai", // terminal normal
};
 
/**
 * Urutan progres normal. TIDAK ADA status CANCELLED — BR-PICKUP-03 (v2.2):
 * "Setelah request dibuat, customer tidak dapat membatalkan atau mengubah
 * pickup." Tidak ada endpoint cancel, status CANCELLED, atau cancel reason.
 */
export const CUSTOMER_STATUS_ORDER = [
  "SCHEDULED",
  "WAITING_DRIVER_PICKUP",
  "ON_THE_WAY_TO_OUTLET",
  "ARRIVED_AT_OUTLET",
  "WASHING",
  "IRONING",
  "PACKING",
  "WAITING_PAYMENT",
  "READY_FOR_DELIVERY",
  "ON_THE_WAY_TO_CUSTOMER",
  "WAITING_CUSTOMER_CONFIRMATION",
  "RECEIVED_BY_CUSTOMER",
] as const;
```

## File: src/features/outlet/outlet.helper.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OutletRepository } from "./outlet.repository";

export class OutletHelper {
    static async findOutletByIdOrThrow(id: string){
        const outlet = await OutletRepository.findById(id)
        if(!outlet) throw new ResponseError('RESOURCE_NOT_FOUND', 'Outlet not found.')
        return outlet
    }
}
```

## File: src/features/outlet/outlet.type.ts
```typescript
import z from "zod";
import { OutletValidation } from "./outlet.validation";

export type OutletQuery = z.infer<typeof OutletValidation.QUERY.getOutlets>
export type CreateOutletBody = z.infer<typeof OutletValidation.BODY.createOutlet>
export type UpdateOutletBody = z.infer<typeof OutletValidation.BODY.updateOutlet>
```

## File: src/features/paymentCustomer/payments.repositories.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { OrderIdInput } from "./payments.validations";




export class PaymentRepository {
    static async getOwnedOrderWithBill(payload:userPayload,{params}:OrderIdInput) {
  const order = await prisma.order.findFirst({
    where: { id: params.id, customerId: payload.sub },
    include: { bill: true, customer: true },
  });
 
  if (!order) {
    throw new ResponseError("ORDER_FORBIDDEN");
  }
  if (!order.bill) {
    throw new ResponseError("BILL_NOT_FOUND");
  }
 
  return order;
}
}
```

## File: src/features/paymentCustomer/payments.routes.ts
```typescript
import { Router } from "express";
import { PaymentController } from "./payments.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router();

router.post(
  "/:id/payment",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  PaymentController.createPaymentAttempt,
);
router.get(
  "/:id/payment",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  PaymentController.getLatestPaymentAttempt,
);
router.post("/payment/webhook", PaymentController.MidtransWebhook);

export default router;
```

## File: src/features/paymentCustomer/payments.validations.ts
```typescript
import * as z from "zod";

export class PaymentValidation {
  static readonly ORDER_ID = z.object({
    params: z.object({
      id: z.string().uuid("ID order tidak valid"),
    }),
  });

  static readonly MIDTRANS_WEEBHOOK = z.object({
    payload: z.object({
      order_id: z.string().min(1),
      status_code: z.string().min(1),
      gross_amount: z.string().min(1),
      signature_key: z.string().min(1),
      transaction_status: z.string().min(1),
      transaction_id: z.string().optional(),
    }),
  });
}

export type OrderIdInput = z.infer<typeof PaymentValidation.ORDER_ID>;
export type MidtransWebhookInput = z.infer<
  typeof PaymentValidation.MIDTRANS_WEEBHOOK
>;
```

## File: src/features/pricing/pricing.controller.ts
```typescript
import { Request, Response } from "express";
import { PricingService } from "./pricing.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";
import { validate } from "../../validations/validate";
import { PricingValidation } from "./pricing.validation";

export class PricingController {
    static async getLaundryPricing(_req: Request, res: Response){
        const laundryPricing = await PricingService.getLaundryPricing()
        return ResponseHelper.success(res, Message.FETCHED, laundryPricing)
    }
    static async createLaundryPricing(req: Request, res: Response){
        const body = validate(PricingValidation.BODY.createOrUpdateLaundryPricing, req.body)
        const laundryPricing = await PricingService.createLaundryPricing(body)
        return ResponseHelper.created(res, Message.CREATED, laundryPricing)
    }
    static async updateLaundryPricing(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const body = validate(PricingValidation.BODY.createOrUpdateLaundryPricing, req.body)
        const laundryPricing = await PricingService.updateLaundryPricing(id, body)
        return ResponseHelper.success(res, Message.UPDATED, laundryPricing)
    }
    static async getShippingRates(req: Request, res: Response){
        const query = validate(PricingValidation.QUERY.getShippingRates, req.query)
        const result = await PricingService.getShippingRates(query)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const shippingRate = await PricingService.getShippingRateById(id)
        return ResponseHelper.success(res, Message.FETCHED, shippingRate)
    }
    static async createShippingRate(req: Request, res: Response){
        const body = validate(PricingValidation.BODY.createShippingRate, req.body)
        const shippingRate = await PricingService.createShippingRate(body)
        return ResponseHelper.created(res, Message.CREATED, shippingRate)
    }
    static async updateShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const body = validate(PricingValidation.BODY.updateShippingRate, req.body)
        const shippingRate = await PricingService.updateShippingRate(id, body)
        return ResponseHelper.success(res, Message.UPDATED, shippingRate)
    }
    static async deactivateShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        await PricingService.deactivateShippingRate(id)
        return ResponseHelper.success(res, Message.DELETED, null)
    }
}
```

## File: src/features/pricing/pricing.helper.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { PricingRepository } from "./pricing.repository";

export class PricingHelper {
    static async findLaundryPricingOrThrow(){
        const pricing = await PricingRepository.findCurrentLaundryPricing()
        if(!pricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry pricing not found.')
        return pricing
    }
    static async findShippingRateByIdOrThrow(id: string){
        const pricing = await PricingRepository.findShippingRateById(id)
        if(!pricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Shipping rate not found.')
        return pricing
    }
}
```

## File: src/features/pricing/pricing.type.ts
```typescript
import z from "zod";
import { PricingValidation } from "./pricing.validation";

export type LaundryPricingBody = z.infer<typeof PricingValidation.BODY.createOrUpdateLaundryPricing>
export type ShippingRateQuery = z.infer<typeof PricingValidation.QUERY.getShippingRates>
export type CreateShippingRateBody = z.infer<typeof PricingValidation.BODY.createShippingRate>
export type UpdateShippingRateBody = z.infer<typeof PricingValidation.BODY.updateShippingRate>
```

## File: src/features/shared/driverQueue.service.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";


/**
 * BR-PAY-03: kalau Bill jadi PAID setelah Packing selesai (dan Order bukan
 * OVERDUE), buat DriverAssignment DELIVERY berstatus QUEUED. Kalau Packing
 * baru selesai belakangan sementara Bill udah PAID duluan, job delivery
 * dibuat pas station itu yang selesai (dipanggil dari worker-assignment
 * service, bukan dari sini — file ini cuma "pintu masuk" umum yang aman
 * dipanggil dari kedua arah, idempotent).
 */
export class DriverQueueService {
  static async enqueueDeliveryIfEligible(orderId: string): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        bill: true,
        workerAssignments: { where: { stationType: "PACKING" } },
        driverAssignments: { where: { taskType: "DELIVERY" } },
      },
    });

    if (!order || !order.bill) return;
    if (order.customerStatus === "OVERDUE") return; // BR-PAY-04: terminal, tidak diproses lagi
    if (order.bill.paymentStatus !== "PAID") return;

    const packingCompleted = order.workerAssignments.some((w) => w.status === "COMPLETED");
    if (!packingCompleted) return;

    // Idempotency guard: job delivery buat order ini udah ada, jangan bikin dobel.
    const hasDeliveryJob = order.driverAssignments.length > 0;
    if (hasDeliveryJob) return;

    await prisma.$transaction(async (tx) => {
      // Re-cek di dalam transaction, jaga-jaga ada race condition dua
      // trigger (webhook & worker-completion) jalan nyaris bersamaan.
      const existing = await tx.driverAssignment.findFirst({
        where: { orderId, taskType: "DELIVERY" },
      });
      if (existing) return;

      await tx.driverAssignment.create({
        data: {
          orderId,
          outletId: order.outletId,
          taskType: "DELIVERY",
          status: "QUEUED",
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { customerStatus: "READY_FOR_DELIVERY" },
      });
    });
  }
}
```

## File: src/helpers/date.helper.ts
```typescript

```

## File: src/helpers/file.helper.ts
```typescript

```

## File: src/helpers/prisma.helper.ts
```typescript

```

## File: src/helpers/query.helper.ts
```typescript

```

## File: src/middlewares/auth.middleware.ts
```typescript

```

## File: src/middlewares/error-handler.middleware.ts
```typescript
/**
 * error-handler.middleware.ts
 *
 * Middleware global penangkap SEMUA error di aplikasi. Dipasang SEKALI di
 * entry point (app.ts / server.ts), setelah semua route terdaftar:
 *
 *   app.use(errorHandler);
 *
 * Menangani 4 sumber error:
 *   1. ResponseError    -> error bisnis yang sengaja di-throw (lihat response-error.util.ts)
 *   2. ZodError          -> gagal validasi input (lihat validation.ts)
 *   3. Prisma error      -> constraint violation (unique, record not found, dst)
 *   4. Error lain / bug  -> fallback 500, detail tidak dibocorkan ke client
 *
 * Format response mengikuti Popo_Laundry_API_Contract_Fitur_1_2_3_v2_0.md
 * bagian 2.6 (Error response).
 */

import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma"; // sesuaikan path output prisma client di project kalian
import { ResponseError } from "../utils/errors/response-error.utils";

// Belum pakai logger library (mis. winston/pino). Sementara pakai console.
// Kalau nanti tim pasang logger, tinggal ganti 2 baris console.* di bawah ini
// jadi logger.warn(...) / logger.error(...) -- struktur pesan tetap sama.
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;

  // ResponseError adalah error yang sengaja dilempar (expected), jadi cukup warn.
  // Selain itu dianggap bug tak terduga, jadi di-log sebagai error.
  if (err instanceof ResponseError) {
    console.warn(`[WARN] ${message}`, {
      path: req.originalUrl,
      code: err.code,
    });
  } else {
    console.error(`[ERROR] ${message}`, { path: req.originalUrl, stack });
  }

  // 1. Error validasi Zod (biasanya dari validate() di validation.ts)
  if (err instanceof ZodError) {
    const fields: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const key = issue.path.join(".") || "_";
      fields[key] = [...(fields[key] ?? []), issue.message];
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Data yang dikirim tidak valid.",
        fields,
      },
    });
  }

  // 2. Error bisnis yang sengaja di-throw lewat ResponseError
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields ? { fields: err.fields } : {}),
      },
    });
  }

  // 3. Error dari Prisma (unique constraint, record not found, dst).
  // Ini SERING terjadi di Popo Laundry karena banyak constraint unik:
  // - email unik saat register
  // - @@unique([userId, attendanceDate]) saat clock-in dobel
  // - gatewayOrderId/midtransTransactionId unik saat payment
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: "Data sudah ada (duplikat).",
        },
      });
    }

    if (err.code === "P2025") {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: "RESOURCE_NOT_FOUND",
          message: "Data tidak ditemukan.",
        },
      });
    }
  }

  // 4. Fallback: error tak terduga / bug. Jangan bocorkan detail internal.
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan pada server.",
    },
  });
}
```

## File: src/middlewares/multer.middleware.ts
```typescript
import { Request } from "express";
import multer, { FileFilterCallback, Multer, StorageEngine } from "multer";
import path from "path";

export class MulterMiddleware {
  private acceptedFiles: string[] = [];
  private storageType: 'diskStorage' | 'memoryStorage' = 'diskStorage'

  constructor(acceptedFiles: string[], storageType:'diskStorage' | 'memoryStorage') {
    this.acceptedFiles = acceptedFiles;
    this.storageType = storageType
  }

  private storage(): StorageEngine {
    if (this.storageType === "diskStorage") {
      return multer.diskStorage({
        destination: function (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void,
        ) {
          const mainDir = path.join(process.cwd());
          cb(null, `${mainDir}/src/uploads`);
        },
        filename: function (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void,
        ) {
          const extensionFile = file.originalname.split(".").splice(-1);
          const uniqueSuffix =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            "." +
            extensionFile;
          cb(null, file.fieldname + "-" + uniqueSuffix);
        },
      });
    }
    return multer.memoryStorage();
  }

  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) {
    if (this.acceptedFiles.includes(file?.mimetype)) return cb(null, true);

    return cb(new Error(`File format for ${file.originalname} not accepted`));
  }

  public upload(limitsFileSize: number): Multer {
    return multer({
      storage: this.storage(),
      fileFilter: this.fileFilter.bind(this),
      limits: {
        fileSize: limitsFileSize,
      },
    });
  }
}

// const upload = multer({ storage: storage });
```

## File: src/types/api-response.ts
```typescript
import { PaginationMeta } from "./pagination";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta
}
```

## File: src/types/geocoding.type.ts
```typescript
export interface Coordinate {
    latitude: number;
    longitude: number
}
```

## File: src/utils/Auth/google.utils.ts
```typescript
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../configs/env.config";
import { ResponseError } from "../errors/response-error.utils";

export type GoogleProfile = {
  email: string;
  name: string;
  emailVerified: boolean;
};

export class GoogleAuthService {
  private static readonly client = new OAuth2Client(GOOGLE_CLIENT_ID);

  /**
   * Verifikasi idToken ke server Google (bukan cuma decode payload-nya doang
   * di sisi kita) — ini yang memastikan token beneran diterbitkan Google
   * buat client ID kita, bukan dipalsukan / dipakai buat aplikasi lain.
   */
  static async verifyIdToken(idToken: string): Promise<GoogleProfile> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new ResponseError("INVALID_TOKEN", "Google token tidak valid.");
    }

    return {
      email: payload.email,
      name: payload.name ?? "",
      emailVerified: payload.email_verified ?? false,
    };
  }
}
```

## File: src/utils/Auth/refreshToken.utils.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../errors/response-error.utils";
import { AuthTokenUtil } from "./token.utils";

const REFRESH_TOKEN_EXPIRY_HOURS = 30 * 24; // 30 hari

export type TokenOwner =
  | { customerId: string; employeeId?: undefined }
  | { employeeId: string; customerId?: undefined };

export class RefreshTokenService {
  private static readonly EXPIRY_HOURS = REFRESH_TOKEN_EXPIRY_HOURS;

  /**
   * Convert TokenOwner jadi object Prisma-safe — cuma menyertakan key
   * yang benar-benar terisi, supaya cocok dengan exactOptionalPropertyTypes.
   */
  private static toOwnerFields(
    owner: TokenOwner,
  ): { customerId: string } | { employeeId: string } {
    return owner.customerId
      ? { customerId: owner.customerId }
      : { employeeId: owner.employeeId! };
  }

  /**
   * Menerbitkan refresh token baru untuk owner (customer/employee).
   */
  static async issue(owner: TokenOwner): Promise<string> {
    const rawToken = AuthTokenUtil.generateRawToken();
    const tokenHash = AuthTokenUtil.hashToken(rawToken);
    const expiresAt = AuthTokenUtil.addHours(new Date(), this.EXPIRY_HOURS);

    await prisma.refreshToken.create({
      data: {
        ...this.toOwnerFields(owner),
        tokenHash,
        expiresAt,
      },
    });

    return rawToken;
  }

  /**
   * Validasi refresh token, lalu ROTATE: token lama di-revoke, token baru
   * diterbitkan. Melempar AppError kalau token nggak valid/expired/revoked —
   * pesannya dibedakan biar controller bisa nentuin respons yang tepat
   * (paksa login ulang vs sekadar tolak).
   */
  static async rotate(
    rawToken: string,
  ): Promise<{ owner: TokenOwner; newRawToken: string }> {
    const tokenHash = AuthTokenUtil.hashToken(rawToken);
    const record = await prisma.refreshToken.findUnique({ where: { tokenHash } });

    const isValid = record && !record.revokedAt && record.expiresAt > new Date();

    if (!isValid) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Sesi berakhir, silakan login ulang.",
      );
    }

    const owner: TokenOwner = record.customerId
      ? { customerId: record.customerId }
      : { employeeId: record.employeeId! };

    const [, newRawToken] = await prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: { id: record.id },
        data: { revokedAt: new Date() },
      });

      const raw = AuthTokenUtil.generateRawToken();

      await tx.refreshToken.create({
        data: {
          ...this.toOwnerFields(owner),
          tokenHash: AuthTokenUtil.hashToken(raw),
          expiresAt: AuthTokenUtil.addHours(new Date(), this.EXPIRY_HOURS),
        },
      });

      return [null, raw] as const;
    });

    return { owner, newRawToken };
  }

  /**
   * Revoke satu refresh token (dipakai saat logout).
   * Pakai updateMany, bukan update — biar nggak error kalau tokennya udah
   * nggak ada/nggak valid (logout tetap harus "berhasil" dari sisi user).
   */
  static async revoke(rawToken: string): Promise<void> {
    const tokenHash = AuthTokenUtil.hashToken(rawToken);

    await prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
```

## File: src/utils/errors/response-error.utils.ts
```typescript
/**
 * response-error.util.ts
 *
 * Class error yang dipakai di seluruh aplikasi. Cukup panggil dengan SATU
 * key dari errors.ts, status HTTP dan error code otomatis ikut.
 *
 * Contoh pemakaian paling umum (pakai pesan default dari errors.ts):
 *
 *   throw new ResponseError('CLOCK_OUT_BLOCKED');
 *
 * Contoh dengan pesan custom (kalau butuh detail spesifik untuk kasus ini):
 *
 *   throw new ResponseError(
 *     'QUANTITY_MISMATCH',
 *     'Kaos: seharusnya 5, yang diinput 4.'
 *   );
 *
 * Contoh dengan detail per-field (khusus VALIDATION_ERROR, biar frontend bisa
 * highlight input mana yang salah):
 *
 *   throw new ResponseError(
 *     'VALIDATION_ERROR',
 *     undefined,
 *     { email: ['Format email tidak valid.'] }
 *   );
 */

import { AppErrors, AppErrorKey } from "./errors";

export class ResponseError extends Error {
  statusCode: number;
  code: string;
  fields?: Record<string, string[]>;

  constructor(
    errorKey: AppErrorKey,
    customMessage?: string,
    fields?: Record<string, string[]>,
  ) {
    const definition = AppErrors[errorKey];

    super(customMessage ?? definition.message);

    this.statusCode = definition.status;
    this.code = definition.code;

    // Hanya di-assign kalau benar-benar ada nilainya, supaya property
    // "fields" tidak pernah ter-set sebagai undefined secara eksplisit
    // (wajib karena exactOptionalPropertyTypes: true di tsconfig).
    if (fields !== undefined) {
      this.fields = fields;
    }

    // Wajib untuk custom Error class di TypeScript yang di-compile ke ES5/CommonJS,
    // supaya `instanceof ResponseError` tetap benar setelah error di-throw/catch.
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
```

## File: src/utils/mailer/template/change-email-verification.hbs
```handlebars
<!doctype html>
<html lang="id">
  <body
    style="margin:0; padding:0; background-color:#F5F6F2; font-family:Arial, Helvetica, sans-serif;"
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color:#F5F6F2; padding:32px 16px;"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="480"
            cellpadding="0"
            cellspacing="0"
            style="background-color:#FFFFFF; border-radius:12px; overflow:hidden;"
          >

            <!-- Header -->
            <tr>
              <td
                style="background-color:#2C6E8C; padding:24px 32px;"
              >
                <span
                  style="font-size:20px; font-weight:700; color:#F5F6F2;"
                >
                  Popo Laundry
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1
                  style="margin:0 0 16px; font-size:20px; color:#26313A;"
                >
                  Verifikasi perubahan email
                </h1>

                <p
                  style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#26313A;"
                >
                  Kami menerima permintaan untuk mengganti alamat email
                  akun Popo Laundry kamu. Klik tombol di bawah untuk
                  memverifikasi perubahan email tersebut.
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td
                      style="border-radius:8px; background-color:#F2A93B;"
                    >
                      <a
                        href="{{verificationUrl}}"
                        style="display:inline-block; padding:12px 28px; font-size:14px; font-weight:700; color:#412402; text-decoration:none;"
                      >
                        Verifikasi Email Baru
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="margin:24px 0 0; font-size:13px; line-height:1.6; color:#5F6B72;"
                >
                  Link ini hanya berlaku selama
                  <strong>{{expiryHours}} jam</strong>
                  dan hanya bisa digunakan satu kali.
                  Setelah berhasil diverifikasi, alamat email akun kamu
                  akan diperbarui.
                </p>

                <p
                  style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#5F6B72;"
                >
                  Tombol tidak berfungsi? Salin dan tempel tautan berikut
                  ke browser kamu:<br />

                  <a
                    href="{{verificationUrl}}"
                    style="color:#2C6E8C; word-break:break-all;"
                  >
                    {{verificationUrl}}
                  </a>
                </p>

                <p
                  style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#5F6B72;"
                >
                  Jika kamu tidak meminta perubahan email ini,
                  abaikan saja email ini. Alamat email akun kamu tidak
                  akan berubah tanpa verifikasi.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="padding:20px 32px; background-color:#F5F6F2;"
              >
                <p
                  style="margin:0; font-size:12px; color:#5F6B72;"
                >
                  Email ini dikirim secara otomatis oleh Popo Laundry.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## File: src/utils/mailer/template/email-verification.hbs
```handlebars
<!doctype html>
<html lang="id">
  <body style="margin:0; padding:0; background-color:#F5F6F2; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F6F2; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background-color:#2C6E8C; padding:24px 32px;">
                <span style="font-size:20px; font-weight:700; color:#F5F6F2;">Popo Laundry</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px; font-size:20px; color:#26313A;">Verifikasi email kamu</h1>
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#26313A;">
                  Terima kasih sudah mendaftar di Popo Laundry. Klik tombol di bawah untuk memverifikasi
                  email kamu sekaligus membuat password akun.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px; background-color:#F2A93B;">
                      <a href="{{verificationUrl}}"
                         style="display:inline-block; padding:12px 28px; font-size:14px; font-weight:700; color:#412402; text-decoration:none;">
                        Verifikasi Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; font-size:13px; line-height:1.6; color:#5F6B72;">
                  Link ini hanya berlaku selama <strong>{{expiryHours}} jam</strong> dan cuma bisa dipakai satu kali.
                  Kalau sudah kedaluwarsa, kamu bisa minta link baru lewat halaman verifikasi.
                </p>

                <p style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#5F6B72;">
                  Tombol tidak berfungsi? Salin dan tempel tautan berikut ke browser kamu:<br />
                  <a href="{{verificationUrl}}" style="color:#2C6E8C; word-break:break-all;">{{verificationUrl}}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#F5F6F2;">
                <p style="margin:0; font-size:12px; color:#5F6B72;">
                  Kalau kamu nggak merasa mendaftar di Popo Laundry, abaikan saja email ini.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## File: src/utils/mailer/template/employee-invitation.hbs
```handlebars
<!doctype html>
<html lang="id">
  <body style="margin:0; padding:0; background-color:#F5F6F2; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F6F2; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background-color:#2C6E8C; padding:24px 32px;">
                <span style="font-size:20px; font-weight:700; color:#F5F6F2;">
                  Popo Laundry
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px; font-size:20px; color:#26313A;">
                  Undangan akun Popo Laundry
                </h1>

                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#26313A;">
                  Halo <strong>{{name}}</strong>, kamu telah diundang untuk bergabung
                  sebagai employee di Popo Laundry.
                </p>

                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#26313A;">
                  Klik tombol di bawah untuk menerima undangan, membuat password,
                  dan mengaktifkan akun kamu.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px; background-color:#F2A93B;">
                      <a target="_blank" href="{{invitationUrl}}"
                         style="display:inline-block; padding:12px 28px; font-size:14px; font-weight:700; color:#412402; text-decoration:none;">
                        Aktifkan Akun
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; font-size:13px; line-height:1.6; color:#5F6B72;">
                  Link ini hanya berlaku selama <strong>{{expiryHours}} jam</strong>
                  dan hanya bisa digunakan satu kali.
                </p>

                <p style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#5F6B72;">
                  Tombol tidak berfungsi? Salin dan tempel tautan berikut ke browser kamu:<br />
                  <a target="_blank" href="{{invitationUrl}}" style="color:#2C6E8C; word-break:break-all;">
                    {{invitationUrl}}
                  </a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#F5F6F2;">
                <p style="margin:0; font-size:12px; color:#5F6B72;">
                  Kalau kamu tidak merasa menerima undangan dari Popo Laundry,
                  abaikan saja email ini.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## File: src/utils/mailer/template/tamplate.util.ts
```typescript
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export class TemplateUtil {
  static compile(templateName: string, data: any) {
    const mainDir = path.join(process.cwd());

    const templateHtml = fs.readFileSync(
      `${mainDir}/src/utils/mailer/template/${templateName}.hbs`,
      "utf-8",
    );

    const compiledTemplateHtml = Handlebars.compile(templateHtml);

    return compiledTemplateHtml(data);
  }
}
```

## File: src/utils/mailer/mailer.utils.ts
```typescript
import transporter from "../../configs/nodemailer.configs";

type SendMail = {
  to: string;
  subject: string;
  html: string;
};

export class MailerUtil {
  static async sendMail({ to, subject, html }: SendMail) {
    return await transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}
```

## File: src/utils/orderCustomer/order.code.ts
```typescript
import crypto from "crypto";

export function generateOrderCode(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `PL-${datePart}-${randomPart}`;
}
```

## File: src/utils/cloudinary.utils.ts
```typescript
import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/env.config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME!,
  api_key: CLOUDINARY_API_KEY!,
  api_secret: CLOUDINARY_API_SECRET!,
});
export class CloudinaryUtil {
  static async uploadStream(file: Buffer, dirName?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          ...(dirName && { folder: `uploads/${dirName}` }), 
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }
          return resolve(result.secure_url);
        },
      )
      .end(file);
  });
}



static extractPublicId(url: string): string {
  const urlAfterUpload = url.split('/upload/')[1]?? '';
  const urlWithoutVersion = urlAfterUpload.replace(/^v\d+\//, '');
  const publicId = urlWithoutVersion.replace(/\.[^/.]+$/, '');
  return publicId;
}

static async delete(publicIds: string[]) {
    await cloudinary.api.delete_resources(publicIds);
  }
}
```

## File: src/utils/midtrans.utils.ts
```typescript
import crypto from "crypto";
import { MIDTRANS_SERVER_KEY, MIDTRANS_SNAP_BASE_URL } from "../configs/env.config";


type CreateTransactionParams = {
  gatewayOrderId: string; // order_id unik per attempt, BUKAN Order.id — Midtrans menolak reuse
  amount: number;
  customerName: string;
  customerEmail: string;
};

type CreateTransactionResult = { token: string; redirectUrl: string };

export class MidtransClient {
  static async createTransaction({
    gatewayOrderId,
    amount,
    customerName,
    customerEmail,
  }: CreateTransactionParams): Promise<CreateTransactionResult> {
    const authHeader = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");

    const res = await fetch(MIDTRANS_SNAP_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: gatewayOrderId,
          gross_amount: Math.round(amount),
        },
        customer_details: {
          first_name: customerName,
          email: customerEmail,
        },
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(`Midtrans createTransaction gagal: ${res.status} ${JSON.stringify(errorBody)}`);
    }

    const json = await res.json();
    return { token: json.token, redirectUrl: json.redirect_url };
  }

  /**
   * BR-PAY-02: "Payment status hanya diperbarui dari webhook Midtrans yang
   * signaturenya valid." Formula resmi Midtrans:
   * SHA512(order_id + status_code + gross_amount + ServerKey)
   */
  static verifySignature(payload: {
    order_id: string;
    status_code: string;
    gross_amount: string;
    signature_key: string;
  }): boolean {
    const expected = crypto
      .createHash("sha512")
      .update(payload.order_id + payload.status_code + payload.gross_amount + MIDTRANS_SERVER_KEY)
      .digest("hex");

    return expected === payload.signature_key;
  }
}
```

## File: src/utils/pagination.util.ts
```typescript
export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export function countSkip({ page, limit }: { page: number; limit: number }) {
  return (page - 1) * limit;
}

export function makePaginationMeta({
  page,
  limit,
  totalItems,
}: {
  page: number;
  limit: number;
  totalItems: number;
}): PaginationMeta {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
```

## File: src/validations/pagination.validation.ts
```typescript
import * as zod from "zod";

// Schema dasar buat page & limit, dipakai SEMUA endpoint list.
// Angka default dan batas maksimum ini SENGAJA ditaruh di satu tempat,
// biar kalau nanti tim sepakat ganti (misal maxlimit dari 100 jadi
// 50), cukup diubah di sini, tidak perlu ubah satu-satu di tiap module.
export const paginationSchema = zod.object({
  page: zod.coerce.number().int().min(1).default(1),
  limit: zod.coerce.number().int().min(1).max(100).default(10),
});
```

## File: src/app.ts
```typescript
import express from 'express';
import routes from "./routes";
import cors from "cors";
import { API_PREFIX, NODE_ENV, PORT, WHITE_LIST } from './configs/env.config';
import { errorHandler } from './middlewares/error-handler.middleware';
import cookieParser from 'cookie-parser';



const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || WHITE_LIST.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(`${API_PREFIX}/v1`, routes);

app.use(errorHandler);

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`[🔌LaundryApp] Application is running on port: ${PORT}`);
  });
}



export default app;
```

## File: prisma.config.ts
```typescript
// This file was generated by Prisma, and assumes you have installed the following:
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## File: tsconfig.json
```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./",
    "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "commonjs",
    "target": "ES6",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

## File: src/constants/pagination.constant.ts
```typescript
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
```

## File: src/features/authCustomer/AuthCustomer.validation.ts
```typescript
import * as z from "zod";

export class AuthCustomerValidation {
  static readonly REGISTER_CUSTOMER = z.object({
    body: z.object({
      email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid!")
        .transform((email) => email.trim().toLowerCase()),
    }),
  });

  static readonly VERIFY_EMAIL_CUSTOMER = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      name: z
        .string()
        .min(1, "Nama wajib diisi")
        .max(100, "Nama maksimal 100 karakter"),
      password: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });

  static readonly LOGIN_CUSTOMER = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(1, "Password wajib diisi"),
    }),
  });

  static readonly GOOGLE_LOGIN = z.object({
    body: z.object({ idToken: z.string().min(1, "idToken wajib diisi") }),
  });

  static readonly FORGOT_PASSWORD = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
    }),
  });

  static readonly RESET_PASSWORD = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      newPassword: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });
}

export type RegisterCustomerInput = z.infer<
  typeof AuthCustomerValidation.REGISTER_CUSTOMER
>;
export type VerifyEmailInput = z.infer<
  typeof AuthCustomerValidation.VERIFY_EMAIL_CUSTOMER
>;
export type LoginCustomerInput = z.infer<
  typeof AuthCustomerValidation.LOGIN_CUSTOMER
>;
export type LoginGoogleInput = z.infer<
  typeof AuthCustomerValidation.GOOGLE_LOGIN
>;
export type ForgotPasswordInput = z.infer<
  typeof AuthCustomerValidation.FORGOT_PASSWORD
>;
export type ResetPasswordInput = z.infer<
  typeof AuthCustomerValidation.RESET_PASSWORD
>;
```

## File: src/features/bypass/bypass.helper.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { QuantityDifference } from "./bypass.type";

type differenceType = {
  items: QuantityDifference[]
}

export class BypassHelper {
  static parseQuantityDifferences(value: string | null): QuantityDifference[] {
    if (!value) return [];
    try {
      const parsed: differenceType = JSON.parse(value);
      if (!Array.isArray(parsed.items)) throw new Error();
      return parsed.items;
    } catch {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "Invalid bypass quantity data.",
      );
    }
  }
  static validateDifferences(differences: QuantityDifference[], orderItems: {id: string, quantity: number}[]){
    const orderItemMap = new Map(orderItems.map(item => [item.id, item.quantity]))
    for(const difference of differences){
        const officialQuantity = orderItemMap.get(difference.orderItemId)
        if(officialQuantity === undefined) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Bypass quantity item is invalid.')
        if(difference.officialQuantity !== officialQuantity) throw new ResponseError('CONFLICT', 'Bypass quantity is no longer valid.')
        if(!Number.isInteger(difference.submittedQuantity) || difference.submittedQuantity < 0) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Invalid submitted quantity.')
        if(difference.difference !== difference.submittedQuantity - difference.officialQuantity) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Invalid quantity difference.')
    }
  }
}
```

## File: src/features/bypass/bypass.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { BypassController } from "./bypass.controller";

const router = Router()

router.get('/', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]), BypassController.getBypassRequests)
router.get('/:id', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]), BypassController.getBypassRequestById)
router.post('/:id/approve', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), BypassController.approve)
router.post('/:id/reject', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), BypassController.reject)

export default router
```

## File: src/features/complaint/complaint.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ComplaintValidation } from "./complaint.validation";
import { ComplaintService } from "./complaint.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class ComplaintController {
  static async getComplaints(req: Request, res: Response) {
    const query = validate(ComplaintValidation.QUERY.getComplaints, req.query);
    const { sub } = res.locals.payload;
    const complaints = await ComplaintService.getComplaints(query, sub);
    return ResponseHelper.paginated(
      res,
      Message.FETCHED,
      complaints.data,
      complaints.meta,
    );
  }
  static async getComplaintById(req: Request, res: Response) {
    const { id } = validate(ComplaintValidation.PARAMS.complaintId, req.params);
    const { sub } = res.locals.payload;
    const complaint = await ComplaintService.getComplaintById(id, sub);
    return ResponseHelper.success(res, Message.FETCHED, complaint);
  }
  static async decideComplaint(req: Request, res: Response) {
    const {id} = validate(ComplaintValidation.PARAMS.complaintId, req.params)
    const body = validate(ComplaintValidation.BODY.decide, req.body)
    const {sub} = res.locals.payload
    const complaint = await ComplaintService.decideComplaint(id, body, sub)
    return ResponseHelper.success(res, Message.UPDATED, complaint)
  }
}
```

## File: src/features/complaint/complaint.repository.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ComplaintHelper } from "./complaint.helper";
import { ComplaintQuery, DecideDTOParams } from "./complaint.type";

export class ComplaintRepository {
    static async findAll(query: ComplaintQuery, outletId?: string){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const where = ComplaintHelper.defineComplaintQuery(query, outletId)
        const [complaints, totalItems] = await prisma.$transaction([
            prisma.complaint.findMany({where, skip, take, include: ComplaintHelper.listInclude, orderBy: {[query.sortBy]: query.sortOrder}}),
            prisma.complaint.count({where})
        ])
        return {
            data: complaints,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findById(id: string, outletId?: string){
        return prisma.complaint.findFirst({where: {id, ...(outletId && {order: {outletId}})}, include: ComplaintHelper.detailInclude})
    }
    static async decide({id, handledBy, decision, responseNote}:DecideDTOParams){
        return prisma.complaint.update({where: {id}, data: {
            status: decision,
            handledBy,
            responseNote,
            decidedAt: new Date()
        }})
    }
}
```

## File: src/features/complaint/complaint.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { ComplaintController } from "./complaint.controller";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get("/", AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), ComplaintController.getComplaints)
router.get("/:id", AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), ComplaintController.getComplaintById)
router.patch("/:id/decision", AuthMiddleware.authorized([Role.OUTLET_ADMIN]), ComplaintController.decideComplaint)

export default router
```

## File: src/features/complaint/complaint.service.ts
```typescript
import { ComplaintStatus } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { ComplaintRepository } from "./complaint.repository";
import { ComplaintQuery, DecideComplaintBody, DecideDTOParams } from "./complaint.type";

export class ComplaintService {
    static async getComplaints(query: ComplaintQuery, outletAdminId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        return ComplaintRepository.findAll(query, employee.currentOutletId ?? undefined)
    }
    static async getComplaintById(id: string, outletAdminId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        const complaint = await ComplaintRepository.findById(id, employee.currentOutletId ?? undefined)
        if(!complaint) throw new ResponseError('RESOURCE_NOT_FOUND', 'Complaint tidak ditemukan.')
        return complaint
    }
    static async decideComplaint(id: string, body: DecideComplaintBody, outletAdminId: string){
        const {decision, responseNote} = body
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        if(!employee.currentOutletId) throw new ResponseError('FORBIDDEN', 'Outlet admin belum memiliki outlet akitf.')
        const complaint = await ComplaintRepository.findById(id, employee.currentOutletId)
        if(!complaint) throw new ResponseError('RESOURCE_NOT_FOUND', 'Complaint tidak ditemukan.')
        if(complaint.status !== ComplaintStatus.OPEN) throw new ResponseError('CONFLICT', 'Complaint ini sudah diputuskan.')
        return ComplaintRepository.decide({id, handledBy: employee.id, decision, responseNote})
    }
}
```

## File: src/features/complaint/complaint.type.ts
```typescript
import z from "zod";
import { ComplaintValidation } from "./complaint.validation";
import { ComplaintStatus } from "../../../generated/prisma";

export type ComplaintQuery = z.infer<typeof ComplaintValidation.QUERY.getComplaints>
export type DecideComplaintBody = z.infer<typeof ComplaintValidation.BODY.decide>
export type DecideDTOParams = DecideComplaintBody & {
    id: string,
    handledBy: string
}
```

## File: src/features/complaint/complaint.validation.ts
```typescript
import z from "zod";
import { ComplaintCategory, ComplaintStatus } from "../../../generated/prisma";

export class ComplaintValidation {
  static readonly QUERY = {
    getComplaints: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(100).positive().optional(),
      search: z.string().trim().optional(),
      status: z.enum(ComplaintStatus).optional(),
      category: z.enum(ComplaintCategory).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["createdAt", "decidedAt"]).default('createdAt'),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }).superRefine((data, ctx) => {
        if(data.startDate && data.endDate && data.endDate < data.startDate){
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date tidak boleh sebelum start date."
            })
        }
    }),
  };
  static readonly PARAMS = {
    complaintId: z.object({
        id: z.uuid()
    })
  };
  static readonly BODY = {
    decide: z.object({
        decision: z.enum([ComplaintStatus.APPROVED, ComplaintStatus.REJECTED]),
        responseNote: z.string().trim().min(1)
    })
  };
}
```

## File: src/features/customer/customer.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { CustomerValidation } from "./customer.validation";
import { CustomerService } from "./customer.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class CustomerController {
    static async getCustomers(req: Request, res: Response){
        const query = validate(CustomerValidation.QUERY.getCustomers, req.query)
        const customers = await CustomerService.getCustomers(query)
        return ResponseHelper.paginated(res, Message.FETCHED, customers.data, customers.meta)
    }
    static async getCustomerById(req: Request, res: Response){
        const {id} = validate(CustomerValidation.PARAMS.customerId, req.params)
        const customer = await CustomerService.getCustomerById(id)
        return ResponseHelper.success(res, Message.FETCHED, customer)
    }
}
```

## File: src/features/customer/customer.repository.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { CustomerQuery } from "./customer.type";

export class CustomerRepository {
  static async findCustomers(query: CustomerQuery) {
    const { page, pageSize, take, skip } = PaginationHelper.paginate(query);
    const where: Prisma.CustomerWhereInput = {};
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.isEmailVerified !== undefined) where.isEmailVerified = query.isEmailVerified;
    const [customers, totalItems] = await prisma.$transaction([
      prisma.customer.findMany({
        where,
        skip,
        take,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isEmailVerified: true,
          createdAt: true,
        },
      }),
      prisma.customer.count({ where }),
    ]);
    return {
      data: customers,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,

        addresses: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            label: true,
            formattedAddress: true,
            latitude: true,
            longitude: true,
            phone: true,
            isPrimary: true,
            createdAt: true,
          },
        },
      },
    });
  }
}
```

## File: src/features/customer/customer.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { CustomerController } from "./customer.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get("/", CustomerController.getCustomers)
router.get("/:id", CustomerController.getCustomerById)

export default router
```

## File: src/features/customer/customer.service.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { CustomerRepository } from "./customer.repository";
import { CustomerQuery } from "./customer.type";

export class CustomerService {
    static async getCustomers(query: CustomerQuery){
        return CustomerRepository.findCustomers(query)
    }
    static async getCustomerById(id: string){
        const customer = await CustomerRepository.findCustomerById(id)
        if(!customer) throw new ResponseError('RESOURCE_NOT_FOUND', 'Customer tidak ditemukan.')
        return customer
    }
}
```

## File: src/features/customer/customer.validation.ts
```typescript
import z from "zod";

export class CustomerValidation {
  static readonly QUERY = {
    getCustomers: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(10).positive().optional(),
      search: z.string().trim().optional(),
      isEmailVerified: z.enum(["true", "false"]).transform(value => value === "true").optional(),
      sortBy: z.enum(["name", "email", "createdAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc")
    }),
  };
  static readonly PARAMS = {
    customerId: z.object({
        id: z.uuid()
    })
  }
}
```

## File: src/features/cutomerProfile/profile.service.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { CloudinaryUtil } from "../../utils/cloudinary.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { AuthTokenIssuer } from "../mailers/mailer.helpers";
import {
  ConfirmEmailChangeInput,
  UpdateEmailInput,
  UpdateProfileInput,
} from "./profile.validation";

export class CustomerProfileService {
  static async updateCustomerProfile(
    payload: userPayload,
    { body }: UpdateProfileInput,
  ) {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    let passwordHash: string | undefined;

    if (body.newPassword) {
      // BR-AUTH-05: akun Google nggak punya password lokal, nggak bisa ganti password di sini.
      if (customer.authProvider !== "EMAIL" || !customer.passwordHash) {
        throw new ResponseError(
          "GOOGLE_ACCOUNT_NO_PASSWORD",
          "Akun Google tidak memiliki password lokal.",
        );
      }

      const isCurrentPasswordValid = await BcryptUtil.compare(
        body.currentPassword!,
        customer.passwordHash,
      );
      if (!isCurrentPasswordValid) {
        throw new ResponseError("CURRENT_PASSWORD_INVALID");
      }

      passwordHash = await BcryptUtil.hash(body.newPassword);
    }

    const updated = await prisma.customer.update({
      where: { id: payload.sub },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(passwordHash !== undefined && { passwordHash }),
      },
    });

    return {
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      profilePhotoUrl: updated.profilePhotoUrl,
    };
  }
  static async updateCustomerProfilePhoto(
    payload: userPayload,
    file: Express.Multer.File,
  ) {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    const previousPhotoUrl = customer.profilePhotoUrl;

    const profilePhotoUrl = await CloudinaryUtil.uploadStream(
      file.buffer,
      "customers",
    );

    const updated = await prisma.customer.update({
      where: { id: payload.sub },
      data: { profilePhotoUrl },
    });

    if (previousPhotoUrl) {
      const previousPublicId = CloudinaryUtil.extractPublicId(previousPhotoUrl);
      if (previousPublicId) {
        await CloudinaryUtil.delete([previousPublicId]);
      }
    }
    return { profilePhotoUrl: updated.profilePhotoUrl };
  }
  static async requestEmailChange(
    payload: userPayload,
    { body }: UpdateEmailInput,
  ) {
    const existing = await prisma.customer.findUnique({
      where: { email: body.newEmail },
    });

    if (existing) throw new ResponseError("EMAIL_ALREADY_REGISTERED");

    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    if (customer.authProvider !== "EMAIL") {
      throw new ResponseError("GOOGLE_ACCOUNT_EMAIL_LOCKED");
    }

    await AuthTokenIssuer.issueEmailChangeVerificationToken(
      customer.id,
      body.newEmail,
    );

    return { message: "Link konfirmasi telah dikirim ke email baru kamu." };
  }
  static async confirmEmailChange(
    payload: userPayload,
    { body }: ConfirmEmailChangeInput,
  ) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "EMAIL_VERIFICATION", customerId: payload.sub },
    });

    if (!record) {
      throw new ResponseError("INVALID_TOKEN", "Link konfirmasi tidak valid.");
    }
    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link konfirmasi ini sudah pernah dipakai.",
      );
    }
    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link konfirmasi sudah kedaluwarsa.",
      );
    }

    const customer = await prisma.customer.findUniqueOrThrow({ where: { id: payload.sub } });
  if (!customer.pendingEmail) {
    throw new ResponseError( "EMAIL_NOT_VERIFIED", "Tidak ada permintaan ganti email yang menunggu.");
  }

  await prisma.$transaction([
    prisma.customer.update({
      where: { id: payload.sub },
      data: { email: customer.pendingEmail, pendingEmail: null, isEmailVerified: true },
    }),
    prisma.authToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);
 
  return { message: "Email berhasil diperbarui." };
  }
}
```

## File: src/features/cutomerProfile/profile.validation.ts
```typescript
import * as z from "zod";

export class ProfileCustomerValidation {
  static readonly UPDATE_PROFILE = z.object({
    body: z
      .object({
        name: z.string().min(1, "Nama tidak boleh kosong").max(100).optional(),
        phone: z
          .string()
          .min(8, "Nomor telepon tidak valid")
          .max(20)
          .optional(),
        currentPassword: z.string().optional(),
        newPassword: z
          .string()
          .min(8, "Password minimal 8 karakter")
          .optional(),
      })
      .refine((v) => (v.newPassword ? !!v.currentPassword : true), {
        message: "Password saat ini wajib diisi untuk mengganti password",
        path: ["currentPassword"],
      }), 
  });

  static readonly UPDATE_EMAIL = z.object({
    body: z.object({
      newEmail: z.string().email("Format email tidak valid"),
    }),
  });

  static readonly CONFIRM_EMAIL = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
    }),
  });
}

export type UpdateProfileInput = z.infer<typeof ProfileCustomerValidation.UPDATE_PROFILE>;
export type UpdateEmailInput = z.infer<typeof ProfileCustomerValidation.UPDATE_EMAIL>;
export type ConfirmEmailChangeInput = z.infer<typeof ProfileCustomerValidation.CONFIRM_EMAIL>;
```

## File: src/features/dashboard/dashboard.service.ts
```typescript
import { EmployeeHelper } from "../employee/employee.helper";
import { DashboardRepository } from "./dashboard.repository";
import { DashboardQuery } from "./dashboard.type";

export class DashboardService {
    static async getDashboard(query: DashboardQuery, employeeId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        const dashboard = await  DashboardRepository.getDashboard(query, employee.currentOutletId ?? undefined)
        return dashboard
    }
}
```

## File: src/features/laundry-item/laundry-item.helper.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { LaundryItemRepository } from "./laundry-item.repository";

export class LaundryItemHelper {
    static async findLaundryItemByIdOrThrow(id: string){
        const laundryItem = await LaundryItemRepository.findById(id)
        if(!laundryItem) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry item tidak ditemukan.')
        return laundryItem
    }
}
```

## File: src/features/order/order.helper.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OrderRepository } from "./order.repository";

export class OrderHelper {
    static async findOrderByIdOrThrow(id: string, outletId?: string){
        const order = await OrderRepository.findById(id, outletId)
        if(!order) throw new ResponseError('RESOURCE_NOT_FOUND', 'Order tidak ditemukan.')
        return order
    }
}
```

## File: src/features/order/order.type.ts
```typescript
import z from "zod";
import { OrderValidation } from "./order.validation";
import { Prisma } from "../../../generated/prisma";

export type OrderQuery = z.infer<typeof OrderValidation.QUERY.getOrders>
export type CreateOrderBody = z.infer<typeof OrderValidation.BODY.createOrder>
export type CreateOrderTransactionData = {
    orderId: string;
    outletId: string;
    weightKg: Prisma.Decimal;
    laundryPricingId: string;
    pricePerKgSnapshot: Prisma.Decimal;
    shippingRateId: string;
    shippingFeeSnapshot: Prisma.Decimal;
    totalAmount: Prisma.Decimal;
    items: {
        laundryItemId: string;
        quantity: number;
    }[];
}
```

## File: src/features/orderCustomer/order.controllers.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OrderCustomerValidation } from "./order.validation";
import { OrderService } from "./order.services";
import { StatusCodes } from "http-status-codes";


export class OrderController {
  static async create(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(OrderCustomerValidation.CREATE_ORDER, {
      body: req.body,
    });

    const order = await OrderService.create(payload, { body });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: order,
      message: "Pickup berhasil dijadwalkan!",
    });
  }
  static async getListOrder(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { query } = validate(OrderCustomerValidation.LIST_ORDER, {
      query: req.query,
    });

    const { data, meta } = await OrderService.getListOrder(payload, {
      query,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "histori laundy kamu berahasil di dapatkan",
      data: data,
      meta,
    });
  }
  static async getDetailOrder(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(OrderCustomerValidation.ORDER_DETAIL, {
      params: req.params,
    });

    const order = await OrderService.getDetailOrder(payload, { params });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: order,
      message: `Detail order ${order.orderCode} berhasil di dapatkan`,
    });
  }
}
```

## File: src/features/orderCustomer/order.helpers.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import {
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_ORDER,
} from "./order.constans";

const OPERATIONAL_START_HOUR = 8; // BR-OUTLET-01
const OPERATIONAL_END_HOUR = 19; // BR-PICKUP-01 (jendela request, bukan jam tutup outlet 20.00)

const JAKARTA_OFFSET_HOURS = 7; // WIB = UTC+7, tanpa DST

function toJakartaTime(now: Date): Date {
  return new Date(now.getTime() + JAKARTA_OFFSET_HOURS * 60 * 60 * 1000);
}

export class OrderHelper {
  static assertWithinRequestWindow(now: Date) {
    const jakartaTime = toJakartaTime(now);
    const day = jakartaTime.getUTCDay(); // pakai getUTCDay, bukan getDay
    const hour = jakartaTime.getUTCHours(); // pakai getUTCHours, bukan getHours

    const isMondayToSaturday = day >= 1 && day <= 6;
    const isWithinHours =
      hour >= OPERATIONAL_START_HOUR && hour < OPERATIONAL_END_HOUR;

    if (!isMondayToSaturday || !isWithinHours) {
      throw new ResponseError(
        "OUTLET_NOT_AVAILABLE",
        "Request pickup hanya bisa dibuat Senin-Sabtu, pukul 08.00-19.00.",
      );
    }
  }

  static buildPickupScheduledAt(pickupDate: string, pickupTime: string): Date {
    // NOTE: konstruksi naive, asumsi server jalan di timezone yang sama
    // dengan operasional outlet (WIB/Asia-Jakarta). Kalau server di-deploy
    // di timezone lain, ini perlu di-convert eksplisit.
    const scheduledAt = new Date(`${pickupDate}T${pickupTime}:00`);

    if (Number.isNaN(scheduledAt.getTime())) {
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal atau jam pickup tidak valid.",
      );
    }

    const day = scheduledAt.getDay();
    if (day === 0) {
      // BR-PICKUP-02: tanggal pickup hanya boleh Senin-Sabtu.
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal pickup tidak boleh hari Minggu.",
      );
    }

    if (scheduledAt.getTime() <= Date.now()) {
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal/jam pickup harus di masa depan.",
      );
    }

    return scheduledAt;
  }

  static buildTimeline(order: {
    customerStatus: string;
    createdAt: Date;
    receivedAt: Date | null;
    driverAssignments: {
      taskType: string;
      pickedUpAt: Date | null;
      deliveredAt: Date | null;
    }[];
    workerAssignments: {
      stationType: string;
      startedAt: Date | null;
      completedAt: Date | null;
    }[];
    bill: { paidAt: Date | null } | null;
  }) {
    // Ambil timestamp dari field yang KEBETULAN ada — bukan riwayat lengkap
    // asli (nggak ada tabel status history di v2.1), lihat catatan di atas.
    const pickup = order.driverAssignments.find((a) => a.taskType === "PICKUP");
    const delivery = order.driverAssignments.find(
      (a) => a.taskType === "DELIVERY",
    );
    const washing = order.workerAssignments.find(
      (w) => w.stationType === "WASHING",
    );
    const ironing = order.workerAssignments.find(
      (w) => w.stationType === "IRONING",
    );
    const packing = order.workerAssignments.find(
      (w) => w.stationType === "PACKING",
    );

    const timestampByStatus: Record<string, Date | null> = {
      SCHEDULED: order.createdAt,
      ON_THE_WAY_TO_OUTLET: pickup?.pickedUpAt ?? null,
      ARRIVED_AT_OUTLET: order.receivedAt,
      WASHING: washing?.startedAt ?? null,
      IRONING: ironing?.startedAt ?? null,
      PACKING: packing?.startedAt ?? null,
      ON_THE_WAY_TO_CUSTOMER: delivery?.deliveredAt
        ? null
        : (delivery?.pickedUpAt ?? null),
      RECEIVED_BY_CUSTOMER:
        order.bill?.paidAt && delivery?.deliveredAt
          ? delivery.deliveredAt
          : null,
    };

    const currentIndex = CUSTOMER_STATUS_ORDER.indexOf(
      order.customerStatus as (typeof CUSTOMER_STATUS_ORDER)[number],
    );

    return CUSTOMER_STATUS_ORDER.map((status, index) => ({
      status,
      label: CUSTOMER_STATUS_LABELS[status],
      timestamp: timestampByStatus[status] ?? null,
      isCompleted: currentIndex >= 0 && index < currentIndex,
      isCurrent: status === order.customerStatus,
    }));
  }

  static getTodayInJakarta(now: Date = new Date()): string {
  const jakartaTime = toJakartaTime(now);
  const yyyy = jakartaTime.getUTCFullYear();
  const mm = String(jakartaTime.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(jakartaTime.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
}
```

## File: src/features/orderCustomer/order.routes.ts
```typescript
import { Router } from "express";
import { OrderController } from "./order.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router();

router.post(
  "/",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.create,
);
router.get(
  "/",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.getListOrder,
);
router.get(
  "/:id",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  OrderController.getDetailOrder,
);

export default router;
```

## File: src/features/orderCustomer/order.validation.ts
```typescript
import * as z from "zod";
import { ORDER_STATUS_GROUPS } from "./order.constans";
import { OrderHelper } from "./order.helpers";

const SORTABLE_FIELDS = ["createdAt", "pickupDate"] as const;

const orderStatusGroupKeys = Object.keys(ORDER_STATUS_GROUPS) as [
  keyof typeof ORDER_STATUS_GROUPS,
  ...(keyof typeof ORDER_STATUS_GROUPS)[],
];

export class OrderCustomerValidation {
  static readonly CREATE_ORDER = z.object({
    body: z
      .object({
        addressId: z.string().uuid("Alamat tidak valid"),
        pickupDate: z.string().date("Format tanggal tidak valid (YYYY-MM-DD)"),
        pickupTime: z
          .string()
          .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Format jam tidak valid (HH:mm)",
          ),
        locationPermissionGranted: z.boolean(),
      })
      .refine(
  (data) => {
    const today = OrderHelper.getTodayInJakarta();
    return data.pickupDate === today;
  },
  {
    message: "Tanggal pickup harus hari ini",
    path: ["pickupDate"],
  },
)
      .refine(
        (data) => {
          const pickupDateTime = new Date(
            `${data.pickupDate}T${data.pickupTime}:00`,
          );
          return pickupDateTime.getTime() > Date.now();
        },
        { message: "Waktu pickup harus di masa depan", path: ["pickupTime"] },
      ),
  });

  static readonly LIST_ORDER = z.object({
    query: z
      .object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        search: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.string().trim().max(50).optional(),
        ),
        statusGroup: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.enum(orderStatusGroupKeys).optional(),
        ),
        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        endDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        sortBy: z.enum(SORTABLE_FIELDS).default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
      })
      .refine(
        (data) => {
          if (data.startDate && data.endDate) {
            return new Date(data.startDate) <= new Date(data.endDate);
          }
          return true;
        },
        {
          message: "Tanggal awal harus sebelum atau sama dengan tanggal akhir",
          path: ["startDate"],
        },
      ),
  });
  static readonly ORDER_DETAIL = z.object({
    params: z.object({ id: z.string().uuid("ID order tidak valid") }),
  });
}

export type CreateOrderInput = z.infer<
  typeof OrderCustomerValidation.CREATE_ORDER
>;
export type ListOrderInput = z.infer<typeof OrderCustomerValidation.LIST_ORDER>;
export type DetailOrderInput = z.infer<
  typeof OrderCustomerValidation.ORDER_DETAIL
>;
```

## File: src/features/paymentCustomer/payments.controllers.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { PaymentValidation } from "./payments.validations";
import { PaymentService } from "./payments.services";
import { StatusCodes } from "http-status-codes";

export class PaymentController {
  static async createPaymentAttempt(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(PaymentValidation.ORDER_ID, {
      params: req.params,
    });

    const result = await PaymentService.createPaymentAttempt(payload, {
      params,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
      message: "percobaan pembayaran berhasil di buat!",
    });
  }
  static async getLatestPaymentAttempt(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(PaymentValidation.ORDER_ID, {
      params: req.params,
    });

    const result = await PaymentService.getLastestPaymentAttempt(payload, {
      params,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "histori percobaan pembayaran berhasil dibuat.",
    });
  }
  static async MidtransWebhook(req: Request, res: Response) {
    const { payload } = validate(PaymentValidation.MIDTRANS_WEEBHOOK, {
      payload: req.body,
    });
   
    const result = await PaymentService.MidtransWebhook({ payload });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "pembayaran berhasil di validasi.",
    });
  }
}
```

## File: src/features/pricing/pricing.repository.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ShippingRateQuery } from "./pricing.type";

export class PricingRepository {
  static async findCurrentLaundryPricing() {
    return await prisma.laundryPricing.findFirst({
      where: { deletedAt: null },
    });
  }
  static async findLaundryPricingById(id: string) {
    return await prisma.laundryPricing.findFirst({
      where: { id, deletedAt: null },
    });
  }
  static async createLaundryPricing(data: Prisma.LaundryPricingCreateInput) {
    return await prisma.laundryPricing.create({ data });
  }
  static async updateLaundryPricing(
    id: string,
    data: Prisma.LaundryPricingUpdateInput,
  ) {
    return await prisma.laundryPricing.update({ where: { id }, data });
  }
  static async getShippingRates(query: ShippingRateQuery) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const sortField = query.sortBy ?? "maxDistanceMeters";
    const where: Prisma.ShippingRateWhereInput = { deletedAt: null };
    if (query.search) {
      where.OR = [
        { maxDistanceMeters: Number(query.search) || undefined },
        { price: Number(query.search) || undefined },
      ];
    }
    const [shippingRates, totalItems] = await prisma.$transaction([
      prisma.shippingRate.findMany({
        where,
        take,
        skip,
        orderBy: {
          [sortField]: query.sortOrder ?? "asc",
        },
      }),
      prisma.shippingRate.count({ where }),
    ]);
    return {
      data: shippingRates,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findShippingRateById(id: string) {
    return prisma.shippingRate.findFirst({ where: { id, deletedAt: null } });
  }
  static async findShippingRateByExactDistance(distance: number) {
    return prisma.shippingRate.findFirst({where: {deletedAt: null, maxDistanceMeters: distance}})
  }
  static async findShippingRateByDistanceMeter(distance: number) {
    return prisma.shippingRate.findFirst({
      where: {
        deletedAt: null,
        maxDistanceMeters: {
          gte: distance,
        },
      },
      orderBy: { maxDistanceMeters: "asc" },
    });
  }
  static async createShippingRate(data: Prisma.ShippingRateCreateInput){
    return prisma.shippingRate.create({data})
  }
  static async updateShippingRate(id: string, data: Prisma.ShippingRateUpdateInput){
    return prisma.shippingRate.update({where: {id}, data})
  }
}
```

## File: src/features/pricing/pricing.route.ts
```typescript
import { Router } from "express";
import { PricingController } from "./pricing.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get('/laundry', PricingController.getLaundryPricing)
router.post('/laundry', PricingController.createLaundryPricing)
router.patch('/laundry/:id', PricingController.updateLaundryPricing)
router.get('/shipping', PricingController.getShippingRates)
router.get('/shipping/:id', PricingController.getShippingRate)
router.post('/shipping', PricingController.createShippingRate)
router.patch('/shipping/:id', PricingController.updateShippingRate)
router.patch('/shipping/:id/deactivate', PricingController.deactivateShippingRate)

export default router
```

## File: src/features/pricing/pricing.validation.ts
```typescript
import z from "zod";

export class PricingValidation {
  static readonly PARAMS = {
    pricingId: z.object({
      id: z.uuid(),
    }),
  };
  static readonly BODY = {
    createOrUpdateLaundryPricing: z.object({
      pricePerKg: z.coerce.number().positive(),
    }),
    createShippingRate: z.object({
        maxDistanceMeters: z.coerce.number().int().positive(),
        price: z.coerce.number().int().positive()
    }),
    updateShippingRate: z.object({
        maxDistanceMeters: z.coerce.number().int().positive().optional(),
        price: z.coerce.number().int().positive().optional()
    }).refine(data => data.maxDistanceMeters !== undefined || data.price !== undefined, {error: "At least one field must be provided."})
  };
  static readonly QUERY = {
    getShippingRates: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["price", "maxDistanceMeters", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
}
```

## File: src/features/region/region.controllers.ts
```typescript
// controllers/region.controller.ts
import { Request, Response } from "express";
import { RegionService } from "./region.services";
import { validate } from "../../validations/validate";
import { RegionValidation } from "./region.validations";
import { GeocodingUtil } from "../../utils/geocoding.util";

export class RegionController {
  static async getProvinces(req: Request, res: Response) {
    const data = await RegionService.getProvinces();
    res.json({ success: true, data });
  }

  static async getCities(req: Request, res: Response) {
    const { params } = validate(RegionValidation.GET_CITIES, {
      params: req.params,
    });
    const data = await RegionService.getCities({ params });
    res.json({ success: true, data });
  }

  static async getDistricts(req: Request, res: Response) {
    const { params } = validate(RegionValidation.GET_DISTRICTS, {
      params: req.params,
    });
    const data = await RegionService.getDistricts({ params });
    res.json({ success: true, data });
  }

  static async getSubDistricts(req: Request, res: Response) {
    const { params } = validate(RegionValidation.GET_SUB_DISTRICTS, {
      params: req.params,
    });
    const data = await RegionService.getSubDistrict({ params });
    res.json({ success: true, data });
  }

  static async previewLocation(req: Request, res: Response) {
    const { body } = validate(RegionValidation.PREVIEW_LOCATION, {
      body: req.body,
    });

    const data = await RegionService.previewLocation({ body });
    res.json({ success: true, data });
  }
}
```

## File: src/features/region/region.routes.ts
```typescript
import { Router } from "express";
import { RegionController } from "./region.controllers";

const router = Router();

router.get("/provinces", RegionController.getProvinces);
router.get("/cities/:provinceId", RegionController.getCities);
router.get("/districts/:cityId", RegionController.getDistricts);
router.get("/sub-districts/:districtId", RegionController.getSubDistricts);
router.post("/preview-location", RegionController.previewLocation);

export default router;
```

## File: src/features/region/region.services.ts
```typescript
// services/region.service.ts
import { rajaOngkirClient } from "../../configs/axios.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import {
  PreviewlocationInput,
  RegionCitiesInput,
  RegionDistrictInput,
  RegionSubDistrictInput,
} from "./region.validations";

// catatan: saat naik ke production console.error ganti jadi logger

export class RegionService {
  static async getProvinces() {
    try {
      const res = await rajaOngkirClient.get("/destination/province");
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getProvinces error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar provinsi.",
      );
    }
  }

  static async getCities({ params }: RegionCitiesInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/city/${params.provinceId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getCities error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar kota/kabupaten.",
      );
    }
  }

  static async getDistricts({ params }: RegionDistrictInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/district/${params.cityId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getDistricts error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar kecamatan.",
      );
    }
  }

  static async getSubDistrict({ params }: RegionSubDistrictInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/sub-district/${params.districtId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getSubDistricts error:", error);
      throw new ResponseError("GEOCODING_FAILED", "Gagal memuat Kelurahan");
    }
  }

  static async previewLocation({ body }: PreviewlocationInput) {
    const formattedAddress = `${body.streetDetail},${body.subDistrictName} ${body.districtName}, ${body.cityName}, ${body.provinceName} ${body.zipCode}`;

    try {
      const { latitude, longitude } =
        await GeocodingUtil.geocode(formattedAddress);
      return { latitude, longitude, found: true };
    } catch {
      return { latitude: null, longitude: null, found: false };
    }
  }
}
```

## File: src/features/region/region.validations.ts
```typescript
import { z } from "zod";

export class RegionValidation {
  static readonly GET_CITIES = z.object({
    params: z.object({
      provinceId: z.string().regex(/^\d+$/, "ID provinsi tidak valid"),
    }),
  });

  static readonly GET_DISTRICTS = z.object({
    params: z.object({
      cityId: z.string().regex(/^\d+$/, "ID kota/kabupaten tidak valid"),
    }),
  });

  static readonly GET_SUB_DISTRICTS = z.object({
    params: z.object({
      districtId: z.string().regex(/^\d+$/, "ID kecamatan tidak valid"),
    }),
  });

  static readonly PREVIEW_LOCATION = z.object({
    body: z.object({
      provinceName: z.string().min(1),
      cityName: z.string().min(1),
      districtName: z.string().min(1),
      subDistrictName: z.string().min(1),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      streetDetail: z.string().min(10, "Detail alamat terlalu pendek"),
    }),
  });
}

export type RegionCitiesInput = z.infer<typeof RegionValidation.GET_CITIES>;
export type RegionDistrictInput = z.infer<
  typeof RegionValidation.GET_DISTRICTS
>;
export type RegionSubDistrictInput = z.infer<
  typeof RegionValidation.GET_SUB_DISTRICTS
>;
export type PreviewlocationInput = z.infer<
  typeof RegionValidation.PREVIEW_LOCATION
>;
```

## File: src/helpers/pagination.helper.ts
```typescript
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination.constant";
import { PaginationQuery } from "../types/pagination";

export class PaginationHelper {
    static paginate(query: PaginationQuery){
        const page = Number(query.page) || DEFAULT_PAGE
        const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE
        const skip = (page - 1) * pageSize
        return {
            page,
            pageSize,
            skip,
            take: pageSize
        }
    }
    static meta(page: number, pageSize: number, totalItems: number){
        const totalPages = Math.ceil(totalItems/pageSize)
        return {
            page,
            pageSize,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    }
}
```

## File: src/helpers/response.helper.ts
```typescript
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PaginationMeta } from "../types/pagination";

export class ResponseHelper {
    static success<T>(
        res: Response,
        message: string,
        data: T
    ){
        return res.status(StatusCodes.OK).json({
            success: true,
            message,
            data
        })
    }
    static created<T>(
        res: Response,
        message: string,
        data: T
    ){
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message,
            data
        })
    }
    static paginated<T>(res: Response, message: string, data: T, meta: PaginationMeta){
        return res.status(StatusCodes.OK).json({
            success: true,
            message,
            data,
            meta
        })
    }

}
```

## File: src/types/pagination.ts
```typescript
export interface PaginationMeta {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginationQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc"
}
```

## File: src/utils/Auth/bcrypt.utils.ts
```typescript
import bcrypt from "bcrypt";

export class BcryptUtil {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
```

## File: src/utils/Auth/token.utils.ts
```typescript
import crypto from "crypto";

export class AuthTokenUtil {
  private static readonly TOKEN_BYTES = 32;

  static generateRawToken(): string {
    return crypto.randomBytes(this.TOKEN_BYTES).toString("hex");
  }

  static hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  static addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  static generateTokenPair(): { rawToken: string; tokenHash: string } {
    const rawToken = this.generateRawToken();
    const tokenHash = this.hashToken(rawToken);
    return { rawToken, tokenHash };
  }
}
```

## File: src/utils/mailer/template/password-reset.hbs
```handlebars
<!doctype html>
<html lang="id">
  <body style="margin:0; padding:0; background-color:#F5F6F2; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F6F2; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background-color:#2C6E8C; padding:24px 32px;">
                <span style="font-size:20px; font-weight:700; color:#F5F6F2;">Popo Laundry</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px; font-size:20px; color:#26313A;">Reset password kamu</h1>
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#26313A;">
                  Kami menerima permintaan untuk reset password akun Popo Laundry kamu. Klik tombol
                  di bawah untuk membuat password baru.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px; background-color:#F2A93B;">
                      <a target="_blank" href="{{resetUrl}}"
                         style="display:inline-block; padding:12px 28px; font-size:14px; font-weight:700; color:#412402; text-decoration:none;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; font-size:13px; line-height:1.6; color:#5F6B72;">
                  Link ini hanya berlaku selama <strong>{{expiryHours}} jam</strong> dan cuma bisa dipakai satu kali.
                </p>

                <p style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#5F6B72;">
                  Tombol tidak berfungsi? Salin dan tempel tautan berikut ke browser kamu:<br />
                  <a target="_blank" href="{{resetUrl}}" style="color:#2C6E8C; word-break:break-all;">{{resetUrl}}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#F5F6F2;">
                <p style="margin:0; font-size:12px; color:#5F6B72;">
                  Kalau kamu nggak merasa minta reset password, abaikan saja email ini — password kamu tetap aman.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## File: src/configs/axios.config.ts
```typescript
import axios from "axios";
import { OPENCAGE_API_KEY, RAJAONGKIR_API_KEY } from "./env.config";
export const rajaOngkirClient = axios.create({
  baseURL: "https://rajaongkir.komerce.id/api/v1",
  headers: {
    key: RAJAONGKIR_API_KEY,
  },
});
import { OPENCAGE_BASE_URL } from "./env.config";

export const opencageClient = axios.create({
    baseURL: OPENCAGE_BASE_URL,
    timeout: 10000
})
```

## File: src/features/bypass/bypass.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { BypassValidation } from "./bypass.validation";
import { BypassService } from "./bypass.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class BypassController {
    static async getBypassRequests(req: Request, res: Response){
        const query = validate(BypassValidation.QUERY.getBypassRequests, req.query)
        const {sub} = res.locals.payload
        const result = await BypassService.getBypastRequests(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getBypassRequestById(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const {sub} = res.locals.payload
        const bypass = await BypassService.getBypastRequestById(id, sub)
        return ResponseHelper.success(res, Message.FETCHED, bypass)
    }
    static async approve(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const body = validate(BypassValidation.BODY.approve, req.body)
        const {sub} = res.locals.payload
        const bypass = await BypassService.approve(id, sub, body.password, body.problemNote)
        return ResponseHelper.success(res, Message.APPROVED, bypass)
    }
    static async reject(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const {sub} = res.locals.payload
        const bypass = await BypassService.reject(id, sub)
        return ResponseHelper.success(res, Message.REJECTED, bypass)
    }
}
```

## File: src/features/bypass/bypass.validation.ts
```typescript
import z from "zod";
import { BypassStatus, StationType } from "../../../generated/prisma";

export class BypassValidation {
  static readonly QUERY = {
    getBypassRequests: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      status: z.enum(BypassStatus).optional(),
      stationType: z.enum(StationType).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["createdAt", "decidedAt"]).default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }),
  };
  static readonly PARAMS = {
    bypassId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    approve: z.object({
        password: z.string().min(1),
        problemNote: z.string().min(1)
    })
  }
}
```

## File: src/features/cutomerProfile/profile.routes.ts
```typescript
import { Router } from "express";
import { MulterMiddleware } from "../../middlewares/multer.middleware";
import { CustomerProfileController } from "./profile.controllers";


const router = Router()

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const multerUploads = new MulterMiddleware(

  ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

router.patch("/me", CustomerProfileController.updateCustomerProfile);
router.patch(
  "/photo",
  multerUploads.single("PROFILE_PHOTO"),
  CustomerProfileController.updateCustomerProfilePhoto,
);
router.patch("/email", CustomerProfileController.requestEmailChange);
router.post("/email/confirm", CustomerProfileController.confirmEmailChange)

export default router;
```

## File: src/features/dashboard/dashboard.type.ts
```typescript
import z from "zod";
import {
  CustomerStatus,
  StationType,
} from "../../../generated/prisma";
import { DashboardValidation } from "./dashboard.validation";

export type DashboardQuery = z.infer<typeof DashboardValidation.QUERY.getDashboard>

export interface DashboardSummary {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  outletName?: string
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
}

export interface OrderOverviewItem {
  status: CustomerStatus;
  total: number;
}

export interface RecentOrderItem {
  id: string;
  orderCode: string;
  customerName: string;
  status: CustomerStatus;
  createdAt: Date;
}

export interface PendingReceiveItem {
  id: string;
  orderCode: string;
  customerName: string;
  createdAt: Date;
}

export interface PendingBypassItem {
  id: string;
  orderId: string;
  orderCode: string;
  workerName: string;
  stationType: StationType;
  createdAt: Date;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  revenueTrend: RevenueTrendItem[];
  orderOverview: OrderOverviewItem[];
  recentOrders: RecentOrderItem[];

  pendingReceive: {
    total: number;
    items: PendingReceiveItem[];
  };

  pendingBypass: {
    total: number;
    items: PendingBypassItem[];
  };
}
```

## File: src/features/employee/employee.helper.ts
```typescript
import { EmployeeRepository } from "./employee.repository";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { Prisma, Role } from "../../../generated/prisma";

export class EmployeeHelper {
  static async findEmployeeByIdOrThrow(id: string) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) throw new ResponseError("RESOURCE_NOT_FOUND", "Employee not found.");
    if (employee.role === Role.OUTLET_ADMIN && !employee.currentOutletId) throw new ResponseError("INVALID_CREDENTIALS", "Data akun belum lengkap.");
    return employee;
  }
}
```

## File: src/features/employee/employee.type.ts
```typescript
import z from "zod";
import { EmployeeValidation } from "./employee.validation";
import { Role } from "../../../generated/prisma";

export type EmployeeQuery = z.infer<typeof EmployeeValidation.Query.getEmployees>;
export type OutletTeamQuery = z.infer<typeof EmployeeValidation.Query.getCurrentOutletEmployees>;
export type OutletAttendanceQuery = z.infer<typeof EmployeeValidation.Query.getCurrentOutletAttendance>;
export type InviteEmployeeBody = z.infer<typeof EmployeeValidation.Body.inviteEmployee>;
export type UpdateEmployeeBody = z.infer<typeof EmployeeValidation.Body.updateEmployee>;
export type AssignEmployeeBody = z.infer<typeof EmployeeValidation.Body.assignEmployee>;

export enum AttendanceStatus {
  NOT_CLOCKED_IN = "NOT_CLOCKED_IN",
  CLOCKED_IN = "CLOCKED_IN",
  CLOCKED_OUT = "CLOCKED_OUT",
}

export type EmployeeWithAttendace = {
  role: Role;
  name: string;
  email: string;
  id: string;
  attendances: {
    clockInAt: Date | null;
    clockOutAt: Date | null;
    id: string;
    attendanceDate: Date;
  }[];
}[];
```

## File: src/features/laundry-item/laundry-item.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { LaundryItemValidation } from "./laundry-item.validation";
import { LaundryItemService } from "./laundry-item.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class LaundryItemController {
    static async getLaundryItems(req: Request, res: Response){
        const query = validate(LaundryItemValidation.QUERY.getLaundryItems, req.query)
        const result = await LaundryItemService.getLaundryItems(query)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        const laundryItem = await LaundryItemService.getLaundryItem(id)
        return ResponseHelper.success(res, Message.FETCHED, laundryItem)
    }
    static async createLaundryItem(req: Request, res: Response){
        const body = validate(LaundryItemValidation.BODY.createLaundryItem, req.body)
        const laundryItem = await LaundryItemService.createLaundryItem(body)
        return ResponseHelper.created(res, Message.CREATED, laundryItem)
    }
    static async updateLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        const body = validate(LaundryItemValidation.BODY.updateLaundryItem, req.body)
        const laundryItem = await LaundryItemService.updateLaundryItem(id, body)
        return ResponseHelper.success(res, Message.UPDATED, laundryItem)
    }
    static async deactivateLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        await LaundryItemService.deactivateLaundryItem(id)
        return ResponseHelper.success(res, Message.DELETED, null)
    }
}
```

## File: src/features/laundry-item/laundry-item.validation.ts
```typescript
import z from "zod";

export class LaundryItemValidation {
  static readonly QUERY = {
    getLaundryItems: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["name", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
  static readonly PARAMS = {
    laundryItemId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    createLaundryItem: z.object({
        name: z.string().trim().min(2).max(100)
    }),
    updateLaundryItem: z.object({
        name: z.string().trim().min(2).max(100).optional()
    }).refine(data => data.name !== undefined, {error: "At least one field must be provided."})
  }
}
```

## File: src/features/mailers/mailer.helpers.ts
```typescript
import { AuthTokenType } from "../../../generated/prisma";
import {
  EMAIL_VERIFICATION_EXPIRY_HOURS,
  PASSWORD_RESET_EXPIRY_HOURS,
} from "../../configs/env.config";
import { prisma } from "../../configs/prisma-client.config";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { MailerService } from "./mailer.service"; // sesuaikan path sesuai lokasi asli

export class AuthTokenIssuer {
  static async issueEmailVerificationToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueCustomerToken(
      customerId,
      "EMAIL_VERIFICATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendEmailVerification({ to: email, token: rawToken });
  }

  static async issueEmailChangeVerificationToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueChangeEmailToken(
      customerId,
      email,
      "EMAIL_VERIFICATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendChangeEmailVerification({
      to: email,
      token: rawToken,
    });
  }

  static async issueEmployeInvitationToken(
    employeeId: string,
    email: string,
    name: string
  ): Promise<void> {
    const rawToken = await this.issueEmployeToken(
      employeeId,
      "ACCOUNT_INVITATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendEmployeeInvitation({ to: email, token: rawToken, name });
  }

  static async issuePasswordResetToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueCustomerToken(
      customerId,
      "PASSWORD_RESET",
      PASSWORD_RESET_EXPIRY_HOURS,
    );
    await MailerService.sendPasswordReset({ to: email, token: rawToken });
  }

  static async issueEmployePasswordResetToken(
    employeeId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueEmployeToken(
      employeeId,
      "PASSWORD_RESET",
      PASSWORD_RESET_EXPIRY_HOURS,
    );
    await MailerService.sendEmployeePasswordReset({ to: email, token: rawToken });
  }

  private static async issueCustomerToken(
    customerId: string,

    type: AuthTokenType,
    expiryHours: number,
  ): Promise<string> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(new Date(), expiryHours);

    await prisma.$transaction([
      prisma.authToken.deleteMany({
        where: { customerId, type, usedAt: null },
      }),
      prisma.authToken.create({
        data: { customerId, type, tokenHash, expiresAt },
      }),
    ]);

    return rawToken;
  }

  private static async issueChangeEmailToken(
    customerId: string,
    email: string,
    type: AuthTokenType,
    expiryHours: number,
  ): Promise<string> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(new Date(), expiryHours);

    await prisma.$transaction([
      prisma.customer.update({
        where: { id: customerId },
        data: { pendingEmail: email },
      }),
      prisma.authToken.deleteMany({
        where: { customerId, type, usedAt: null },
      }),
      prisma.authToken.create({
        data: { customerId, type, tokenHash, expiresAt },
      }),
    ]);

    return rawToken;
  }

  private static async issueEmployeToken(
    employeeId: string,
    type: AuthTokenType,
    expiryHours: number,
  ): Promise<string> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(new Date(), expiryHours);

    await prisma.$transaction([
      prisma.authToken.deleteMany({
        where: { employeeId, type, usedAt: null },
      }),
      prisma.authToken.create({
        data: { employeeId, type, tokenHash, expiresAt },
      }),
    ]);

    return rawToken;
  }
}
```

## File: src/features/order/order.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { OrderController } from "./order.controller";

const router = Router()

router.get("/", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), OrderController.getOrders)
router.get("/:id", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), OrderController.getOrderById)
router.post('/:id/receive', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), OrderController.receiveOrder)
router.post('/:id/create-order', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), OrderController.createOrder)

export default router
```

## File: src/features/order/order.validation.ts
```typescript
import z from "zod";
import { BillPaymentStatus, CustomerStatus } from "../../../generated/prisma";

export class OrderValidation {
  static readonly QUERY = {
    getOrders: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      outletId: z.uuid().optional(),
      customerStatus: z.enum(CustomerStatus).optional(),
      paymentStatus: z.enum(BillPaymentStatus).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["pickupScheduledAt", "orderCode", "createdAt"]).default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).default("desc"),
    }),
  };
  static readonly PARAMS = {
    orderId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    createOrder: z.object({
        weightKg: z.coerce.number().positive(),
        items: z.array(z.object({
            laundryItemId: z.uuid(),
            quantity: z.coerce.number().int().positive()
        })).min(1)
    }).superRefine((data, ctx) => {
        const ids = data.items.map(item => item.laundryItemId)
        if(new Set(ids).size !== ids.length){
            ctx.addIssue({
                code: "custom",
                path: ["items"],
                message: "Laundry item tidak boleh duplikat."
            })
        }
    })
  }
}
```

## File: src/features/orderCustomer/order.services.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import { generateOrderCode } from "../../utils/orderCustomer/order.code";
import { userPayload } from "../../validations/validate";
import { CUSTOMER_STATUS_LABELS, ORDER_STATUS_GROUPS } from "./order.constans";
import { OrderHelper } from "./order.helpers";
import {
  CreateOrderInput,
  DetailOrderInput,
  ListOrderInput,
} from "./order.validation";

const SERVICE_RADIUS_METERS = 10_000;
export class OrderService {
  static async create(payload: userPayload, { body }: CreateOrderInput) {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    // BR-AUTH-01: user belum terverifikasi tidak dapat membuat request pickup.
    if (!customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Email kamu belum diverifikasi.",
      );
    }

    if (!body.locationPermissionGranted) {
      throw new ResponseError("LOCATION_PERMISSION_REQUIRED");
    }

    // ini di comment supaya bisa di tes kapanpun
    // const now = new Date();
    // OrderHelper.assertWithinRequestWindow(now);

    const pickupScheduledAt = OrderHelper.buildPickupScheduledAt(
      body.pickupDate,
      body.pickupTime,
    );

    const address = await prisma.customerAddress.findFirst({
      where: { id: body.addressId, customerId: payload.sub, deletedAt: null },
    });

    if (!address) {
      throw new ResponseError(
        "ADDRESS_FORBIDDEN",
        "Alamat tidak ditemukan atau bukan milik kamu.",
      );
    }

    const activeOutlets = await prisma.outlet.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        staffOnDuty: {
          some: { role: "OUTLET_ADMIN", accountStatus: "ACTIVE" },
        },
      },
    });

    if (activeOutlets.length === 0) {
      throw new ResponseError(
        "OUTLET_NOT_AVAILABLE",
        "Tidak ada outlet aktif yang bisa melayani saat ini.",
      );
    }

    let nearestOutlet: (typeof activeOutlets)[number] | null = null;
    let nearestDistance = Infinity;

    for (const outlet of activeOutlets) {
      const distance = GeocodingUtil.haversineDistanceMeters(
        Number(address.latitude),
        Number(address.longitude),
        Number(outlet.latitude),
        Number(outlet.longitude),
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestOutlet = outlet;
      }

      if (!nearestOutlet || nearestDistance > SERVICE_RADIUS_METERS) {
        throw new ResponseError(
          "OUTSIDE_SERVICE_RADIUS",
          "Tidak ada outlet dalam radius 10 km dari alamat ini.",
        );
      }

      const orderCode = generateOrderCode();

      const order = await prisma.$transaction(async (tx) => {
        const created = await tx.order.create({
          data: {
            orderCode,
            customerId: payload.sub,
            outletId: nearestOutlet!.id,
            addressSnapshot: address.formattedAddress,
            addressPhoneSnapshot: address.phone,
            addressLatitude: address.latitude,
            addressLongitude: address.longitude,
            distanceMeters: nearestDistance,
            pickupDate: new Date(body.pickupDate),
            pickupScheduledAt,
            customerStatus: "SCHEDULED",
          },
        });

        await tx.driverAssignment.create({
          data: {
            orderId: created.id,
            outletId: created.outletId,
            taskType: "PICKUP",
            status: "QUEUED",
          },
        });

        return created;
      });
      return {
        id: order.id,
        orderCode: order.orderCode,
        customerStatus: order.customerStatus,
        outletId: order.outletId,
        distanceMeters: nearestDistance,
        pickupDate: order.pickupDate,
        pickupScheduledAt: order.pickupScheduledAt,
      };
    }
  }
  static async getListOrder(payload: userPayload, { query }: ListOrderInput) {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    const where: Prisma.OrderWhereInput = { customerId: payload.sub };

    if (query.statusGroup) {
      where.customerStatus = { in: ORDER_STATUS_GROUPS[query.statusGroup] };
    }

    if (query.search) {
      where.orderCode = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    if (query.startDate || query.endDate) {
      where.pickupDate = {
        ...(query.startDate && {
          gte: new Date(`${query.startDate}T00:00:00`),
        }),
        ...(query.endDate && {
          lte: new Date(`${query.endDate}T23:59:59.999`),
        }),
      };
    }
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { [query.sortBy]: query.sortOrder },
        include: {
          bill: { select: { totalAmount: true, paymentStatus: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const data = orders.map((order) => ({
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel: CUSTOMER_STATUS_LABELS[order.customerStatus],
      pickupDate: order.pickupDate,
      totalAmount: order.bill?.totalAmount ?? null,
      paymentStatus: order.bill?.paymentStatus ?? null,
    }));

    return {
      data,
      meta: {
        page: query.page,
        limit: take,
        totalData: totalOrders,
        totalPage: Math.ceil(totalOrders / take),
      },
    };
  }

  static async getDetailOrder(
    payload: userPayload,
    { params }: DetailOrderInput,
  ) {
    const order = await prisma.order.findFirst({
      where: { id: params.id, customerId: payload.sub },
      include: {
        bill: true,
        orderItems: { include: { laundryItem: true } },
        driverAssignments: true,
        workerAssignments: true,
        complaint: true,
      },
    });

    if (!order) {
      throw new ResponseError(
        "FORBIDDEN",
        "Order tidak ditemukan atau bukan milik kamu.",
      );
    }
    return {
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel: CUSTOMER_STATUS_LABELS[order.customerStatus],
      addressSnapshot: order.addressSnapshot,
      addressPhoneSnapshot: order.addressPhoneSnapshot,
      pickupDate: order.pickupDate,
      pickupScheduledAt: order.pickupScheduledAt,
      bill: order.bill,
      orderItems: order.orderItems,
      complaint: order.complaint,
      timeline: OrderHelper.buildTimeline(order),
      allowedActions: {
        canPay: order.bill !== null && order.bill.paymentStatus !== "PAID",
        canConfirmReceived:
          order.customerStatus === "WAITING_CUSTOMER_CONFIRMATION",
        canFileComplaint:
          order.customerStatus === "WAITING_CUSTOMER_CONFIRMATION" &&
          !order.complaint,
      },
    };
  }
}
```

## File: src/features/outlet/outlet.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OutletValidation } from "./outlet.validation";
import { OutletService } from "./outlet.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class OutletController {
    static async getOutlets(req: Request, res: Response){
        const query = validate(OutletValidation.QUERY.getOutlets, req.query);
        const outlets = await OutletService.getOutlets(query)
        return ResponseHelper.paginated(res, Message.FETCHED, outlets.data, outlets.meta)
    }
    static async getOutletById(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const outlet = await OutletService.getOutletById(id)
        return ResponseHelper.success(res, Message.FETCHED, outlet)
    }
    static async createOutlet(req: Request, res: Response){
        const body = validate(OutletValidation.BODY.createOutlet, req.body)
        const outlet = await OutletService.createOutlet(body)
        return ResponseHelper.created(res, Message.CREATED, outlet)
    }
    static async updateOutlet(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const body = validate(OutletValidation.BODY.updateOutlet, req.body)
        const outlet = await OutletService.updateOutlet(id, body)
        return ResponseHelper.success(res, Message.UPDATED, outlet)
    }
    static async deactivateOutlet(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const outlet = await OutletService.deactivateOutlet(id)
        return ResponseHelper.success(res, "Outlet deactivate successfully.", outlet)
    }
}
```

## File: src/features/outlet/outlet.validation.ts
```typescript
import z from "zod";

export class OutletValidation {
  static readonly QUERY = {
    getOutlets: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["name", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
  static readonly PARAMS = {
    outletId: z.object({
      id: z.uuid(),
    }),
  };
  static readonly BODY = {
    createOutlet: z.object({
      name: z.string().trim().min(3).max(100),
      address: z.string().trim().min(10).max(255),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
    updateOutlet: z
      .object({
        name: z.string().trim().min(3).max(100).optional(),
        address: z.string().trim().min(10).max(255).optional(),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
      })
      .refine((data) => data.name !== undefined || data.address !== undefined || data.latitude !== undefined || data.longitude !== undefined, {
        error: "At least one field must be provided.",
      })
      .refine((data) => (data.latitude === undefined && data.longitude === undefined) || (data.latitude !== undefined && data.longitude !== undefined), {
        error: "Latitude dan longitude harus dikirim bersamaan.",
        path: ["latitude"],
      }),
  };
}
```

## File: src/features/paymentCustomer/payments.services.ts
```typescript
import { date } from "zod";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { MidtransClient } from "../../utils/midtrans.utils";
import { userPayload } from "../../validations/validate";
import { DriverQueueService } from "../shared/driverQueue.service";
import { PaymentRepository } from "./payments.repositories";
import { MidtransWebhookInput, OrderIdInput } from "./payments.validations";

// Status yang dianggap "sukses" (BR-PAY-02): SETTLEMENT dan CAPTURE.
const SUCCESS_STATUSES = new Set(["settlement", "capture"]);
// Terminal-gagal: attempt ini nggak akan pernah berhasil, customer boleh bikin attempt baru (BR-PAY-01).
const FAILED_STATUSES = new Set(["deny", "cancel", "expire"]);

export class PaymentService {
  static async createPaymentAttempt(
    payload: userPayload,
    { params }: OrderIdInput,
  ) {
    const order = await PaymentRepository.getOwnedOrderWithBill(payload, {
      params,
    });
    const bill = order.bill!;

    if (order.customerStatus === "OVERDUE") {
      throw new ResponseError("ORDER_OVERDUE");
    }

    if (bill.paymentStatus === "PAID") {
      throw new ResponseError("PAYMENT_ALREADY_PAID");
    }

    const pendingAttempt = await prisma.payment.findFirst({
      where: { billId: bill.id, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    if (pendingAttempt) {
      throw new ResponseError("PAYMENT_ALREADY_PENDING");
    }

    const attemptCount = await prisma.payment.count({
      where: { billId: bill.id },
    });
    const gatewayOrderId = `PAY-${order.orderCode}-${bill.id.slice(0, 4)}-${attemptCount + 1}`;

    const { token, redirectUrl } = await MidtransClient.createTransaction({
      gatewayOrderId,
      amount: Number(bill.totalAmount ?? 0),
      customerName: order.customer.name,
      customerEmail: order.customer.email,
    });

    const payment = await prisma.payment.create({
      data: {
        billId: bill.id,
        gatewayOrderId,
        amount: bill.totalAmount ?? 0,
        redirectUrl,
        status: "PENDING",
        isFinal: false,
      },
    });

    return {
      paymentId: payment.id,
      gatewayOrderId,
      snapToken: token,
      redirectUrl,
    };
  }

  static async getLastestPaymentAttempt(
    payload: userPayload,
    { params }: OrderIdInput,
  ) {
    const order = await PaymentRepository.getOwnedOrderWithBill(payload, {
      params,
    });

    const latest = await prisma.payment.findFirst({
      where: { billId: order.bill!.id },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      throw new ResponseError(
        "BILL_NOT_FOUND",
        "Belum ada percobaan pembayaran untuk order ini.",
      );
    }

    return {
      id: latest.id,
      status: latest.status,
      amount: latest.amount,
      redirectUrl: latest.redirectUrl,
      isFinal: latest.isFinal,
      paidAt: latest.paidAt,
      billPaymentStatus: order.bill!.paymentStatus,
    };
  }
  static async MidtransWebhook({ payload }: MidtransWebhookInput) {
    const isValidSignature = MidtransClient.verifySignature({
      order_id: payload.order_id,
      status_code: payload.status_code,
      gross_amount: payload.gross_amount,
      signature_key: payload.signature_key,
    });

    const payment = await prisma.payment.findUnique({
      where: { gatewayOrderId: payload.order_id },
      include: { bill: { include: { order: true } } },
    });

    if (payment) {
      await prisma.paymentWebhook.create({
        data: {
          paymentId: payment.id,
          eventType: payload.transaction_status,
          rawPayload: JSON.stringify(payload),
          signature: payload.signature_key,
          isValid: isValidSignature,
        },
      });
    }

    if (!isValidSignature) {
      throw new ResponseError(
        "INVALID_PAYMENT_SIGNATURE",
        "Signature webhook tidak valid.",
      );
    }

    if (!payment) {
      return { received: true };
    }

    const order = payment.bill.order;

    if (order.customerStatus === "OVERDUE") {
      return { received: true };
    }

    if (payment.isFinal) {
      return { received: true };
    }

    const status = payload.transaction_status.toLowerCase();

    await prisma.$transaction(async (tx) => {
      if (SUCCESS_STATUSES.has(status)) {
        // Re-cek UNPAID di dalam transaction — mencegah dua webhook/attempt
        // beda nyalain PAID dua kali kalau race condition (BR-PAY-01: "Satu
        // Bill hanya berubah PAID sekali").
        await tx.bill.updateMany({
          where: { id: payment.bill.id, paymentStatus: "UNPAID" },
          data: { paymentStatus: "PAID" },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { paidAt: new Date() },
        });

        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: status === "settlement" ? "SETTLEMENT" : "CAPTURE",
            isFinal: true,
            paidAt: new Date(),
          },
        });
      } else if (FAILED_STATUSES.has(status)) {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: status.toUpperCase() as "DENY" | "CANCEL" | "EXPIRE",
            isFinal: true,
          },
        });
      }
    });

    if (SUCCESS_STATUSES.has(status)) {
      await DriverQueueService.enqueueDeliveryIfEligible(order.id);
    }

    return { received: true };
  }
}
```

## File: src/features/report/report.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ReportValidation } from "./report.validation";
import { ReportService } from "./report.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class ReportController {
    static async getSalesReport(req: Request, res: Response){
        const query = validate(ReportValidation.QUERY.getSales, req.query)
        const {sub} = res.locals.payload
        const report = await ReportService.getSalesReport(query, sub)
        return ResponseHelper.success(res, Message.FETCHED, report)
    }
    static async getEmployeePerformanceReport(req: Request, res: Response){
        const query = validate(ReportValidation.QUERY.getEmployeePeformance, req.query)
        const {sub} = res.locals.payload
        const report = await ReportService.getEmployeePerformanceReport(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, report.data, report.meta)
    }
}
```

## File: src/features/report/report.route.ts
```typescript
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { ReportController } from "./report.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]))
router.get("/sales", ReportController.getSalesReport)
router.get("/employee-performance", ReportController.getEmployeePerformanceReport)

export default router
```

## File: src/features/report/report.service.ts
```typescript
import { EmployeeHelper } from "../employee/employee.helper";
import { ReportRepository } from "./report.repository";
import { EmployeePerformanceQuery, SalesQuery } from "./report.type";

export class ReportService {
    static async getSalesReport(query: SalesQuery, employeeId: string){   
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        return ReportRepository.getSalesReport(query, employee.currentOutletId ?? undefined)
    }
    static async getEmployeePerformanceReport(query: EmployeePerformanceQuery, employeeId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        return ReportRepository.getEmployeePerformanceReport(query, employee.currentOutletId ?? undefined)
    }
}
```

## File: src/features/report/report.type.ts
```typescript
import z from "zod";
import { ReportValidation } from "./report.validation";
import { PaginationMeta } from "../../types/pagination";
import { Role } from "../../../generated/prisma";

export type SalesPeriod = "DAY" | "MONTH" | "YEAR";

export type SalesQuery = z.infer<typeof ReportValidation.QUERY.getSales>;

export type SalesSummary = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalWeightKg: number;
  uniqueCustomers: number;
};

export type SalesComparison = {
  previousPeriod: {
    startDate: Date;
    endDate: Date;
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  revenueChangePercent: number | null;
  orderChangePercent: number | null;
  averageOrderValueChangePercent: number | null;
};

export type SalesTrendItem = {
  label: string;
  revenue: number;
  orders: number;
  totalWeightKg: number;
};

export type SalesBreakdownItem = {
  outletId: string;
  outletName: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  totalWeightKg: number;
  uniqueCustomers: number;
  revenueSharePercent: number;
};

export type SalesHighlight = {
  outletId: string;
  outletName: string;
  revenue: number;
  orders: number;
} | null;

export type SalesReport = {
  period: {
    type: SalesPeriod;
    startDate: Date;
    endDate: Date;
  };
  summary: SalesSummary;
  comparison: SalesComparison;
  trend: SalesTrendItem[];
  breakdown: SalesBreakdownItem[];
  highlights: {
    topOutlet: SalesHighlight;
    peak: SalesTrendItem | null;
  };
};

export type EmployeePerformanceQuery = z.infer<
  typeof ReportValidation.QUERY.getEmployeePeformance
>;

export type EmployeePerformanceItem = {
  employeeId: string;
  employeeName: string;
  role: Role
  completedJobs: number;
  pickupJobs: number;
  deliveryJobs: number;
  washingJobs: number;
  ironingJobs: number;
  packingJobs: number;
  averageCompletionMinutes: number | null;
};

export type EmployeePerformanceSummary = {
  totalEmployees: number;
  totalCompletedJobs: number;
  averageJobsPerEmployee: number;
  workerCompletedJobs: number;
  driverCompletedJobs: number;
  topPerformer: {
    employeeId: string;
    employeeName: string;
    role: Role
    completedJobs: number;
  } | null;
};

export type EmployeePerformanceReport = {
  data: {
    summary: EmployeePerformanceSummary;
    data: EmployeePerformanceItem[];
  };
  meta: PaginationMeta;
};
```

## File: src/validations/validate.ts
```typescript
import { ZodType } from "zod";

export type userPayload = {
  sub: string;
};

export function validate<T>(
  schema: ZodType<T>,
  data: unknown,
  useSafeParse: boolean = false,
): T {
  if (useSafeParse) {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
  return schema.parse(data);
}
```

## File: src/constants/message.constant.ts
```typescript
export const Message = {
    CREATED: "Data created successfully.",
    UPDATED: "Data updated successfully.",
    DELETED: "Data deleted successfully.",
    FETCHED: "Data fetched successfully.",
    INVITED: "Employee invited successfully.",
    RECEIVED: "Order received successfully.",
    APPROVED: "Bypass request approved successfully.",
    REJECTED: "Bypass request rejected successfully."
}
```

## File: src/features/addressCustomer/address.validation.ts
```typescript
import * as z from "zod";

export class AddressValidation {
  static readonly CREATE_ADDRESS = z.object({
    body: z.object({
      label: z.string().max(50).optional(),
      provinceId: z.string().min(1, "Provinsi wajib dipilih"),
      provinceName: z.string().min(1),
      cityId: z.string().min(1, "Kota/Kabupaten wajib dipilih"),
      cityName: z.string().min(1),
      districtId: z.string().min(1, "Kecamatan wajib dipilih"),
      districtName: z.string().min(1),
      subDistrictId: z.string().min(1, "Kelurahan wajib dipilih"),
      subDistrictName: z.string().min(1),
      streetDetail: z
        .string()
        .min(5, "Detail alamat terlalu pendek, tulis lebih lengkap"),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20),
      isPrimary: z.boolean().optional(),
    }),
  });

  static readonly UPDATE_ADDRESS = z.object({
    params: z.object({
      id: z.string().uuid("ID alamat tidak valid"),
    }),
    body: z.object({
      label: z.string().max(50).optional(),
      provinceId: z.string().min(1, "Provinsi wajib dipilih"),
      provinceName: z.string().min(1),
      cityId: z.string().min(1, "Kota/Kabupaten wajib dipilih"),
      cityName: z.string().min(1),
      districtId: z.string().min(1, "Kecamatan wajib dipilih"),
      districtName: z.string().min(1),
      subDistrictId: z.string().min(1, "Kelurahan wajib dipilih"),
      subDistrictName: z.string().min(1),
      streetDetail: z
        .string()
        .min(5, "Detail alamat terlalu pendek, tulis lebih lengkap"),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20).optional(),
    }),
  });

  static readonly ADDRESS_ID = z.object({
    params: z.object({
      id: z.string().uuid("ID alamat tidak valid"),
    }),
  });
}

export type CreateAddressInput = z.infer<
  typeof AddressValidation.CREATE_ADDRESS
>;
export type UpdateAddressInput = z.infer<
  typeof AddressValidation.UPDATE_ADDRESS
>;
export type AddressIdInout = z.infer<typeof AddressValidation.ADDRESS_ID>;
```

## File: src/features/authCustomer/authCustomer.routes.ts
```typescript
import { Router } from "express";
import { AuthCustomerController } from "./authCustomer.controllers";
import { AuthSessionController } from "../authShared/authSession.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

router.post("/register", AuthCustomerController.register);
router.post("/verify-email", AuthCustomerController.verifyCustomerEmail);
router.post("/resend-verification", AuthCustomerController.resendVerification);
router.post("/login", AuthCustomerController.login);
router.post("/login/google", AuthCustomerController.loginGoogle);
router.post("/forgot-password", AuthCustomerController.forgotPassword);
router.post("/reset-password", AuthCustomerController.resetPassword);
router.post("/logout", AuthSessionController.logout);
router.post("/refresh", AuthSessionController.refresh);
router.get("/me", AuthMiddleware.authenticated(), AuthSessionController.getMe);

export default router;
```

## File: src/features/authCustomer/authCustomer.services.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import {
  ForgotPasswordInput,
  LoginCustomerInput,
  LoginGoogleInput,
  RegisterCustomerInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from "./AuthCustomer.validation";
import { GoogleAuthService } from "../../utils/Auth/google.utils";
import { AuthTokenIssuer } from "../mailers/mailer.helpers";
import { AuthCustomerHelper } from "./authCustomer.helpers";

export class AuthCustomerService {
  static async register({ body }: RegisterCustomerInput) {
    const existing = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    AuthCustomerHelper.assertEmailAvailable(existing);

    const customer = await prisma.customer.create({
      data: {
        email: body.email,
        name: "",
        passwordHash: null,
        authProvider: "EMAIL",
        isEmailVerified: false,
      },
    });

    await AuthTokenIssuer.issueEmailVerificationToken(
      customer.id,
      customer.email,
    );

    return {
      email: customer.email,
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
    };
  }

  static async verifyCustomerEmail({ body }: VerifyEmailInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "EMAIL_VERIFICATION" },
    });

    AuthCustomerHelper.assertValidAuthToken(record, "EMAIL_VERIFICATION");
    // setelah baris di atas, TypeScript tahu record.customerId pasti string

    const passwordHash = await BcryptUtil.hash(body.password);

    await prisma.$transaction(async (tx) => {
      await tx.customer.update({
        where: { id: record.customerId },
        data: { name: body.name, passwordHash, isEmailVerified: true },
      });
      await tx.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
    });

    return { message: "Email berhasil diverifikasi. Silakan login." };
  }

  static async resendVerification({ body }: RegisterCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (!customer) {
      return {
        message: "Jika email terdaftar, link verifikasi baru telah dikirim.",
      };
    }

    AuthCustomerHelper.assertNotYetVerified(customer);

    await AuthTokenIssuer.issueEmailVerificationToken(
      customer.id,
      customer.email,
    );

    return { message: "link verifikasi baru telah dikirim." };
  }

  static async login({ body }: LoginCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    AuthCustomerHelper.assertCustomerCanLogin(customer);
    // setelah baris di atas, TypeScript tahu customer.passwordHash pasti string

    const isPasswordValid = await BcryptUtil.compare(
      body.password,
      customer.passwordHash,
    );
    AuthCustomerHelper.assertPasswordMatches(isPasswordValid);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      isEmailVerified: customer.isEmailVerified,
    };
  }

  static async loginGoogle({ body }: LoginGoogleInput) {
    const profile = await GoogleAuthService.verifyIdToken(body.idToken);

    const existing = await prisma.customer.findUnique({
      where: { email: profile.email },
    });

    AuthCustomerHelper.assertGoogleLoginAllowed(existing);

    const customer =
      existing ??
      (await prisma.customer.create({
        data: {
          email: profile.email,
          name: profile.name,
          passwordHash: null,
          authProvider: "GOOGLE",
          isEmailVerified: true,
        },
      }));

    AuthCustomerHelper.assertAccountActive(customer);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      isEmailVerified: customer.isEmailVerified,
    };
  }

  static async forgotPassword({ body }: ForgotPasswordInput) {
    const genericResponse = {
      message: "Jika email terdaftar, link reset password telah dikirim.",
    };

    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (!AuthCustomerHelper.assertPasswordResetEligible(customer)) {
      return genericResponse;
    }

    await AuthTokenIssuer.issuePasswordResetToken(customer.id, customer.email);

    return genericResponse;
  }

  static async resetPassword({ body }: ResetPasswordInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "PASSWORD_RESET" },
    });

    AuthCustomerHelper.assertValidAuthToken(record, "PASSWORD_RESET");

    const passwordHash = await BcryptUtil.hash(body.newPassword);

    await prisma.$transaction([
      prisma.customer.update({
        where: { id: record.customerId },
        data: { passwordHash },
      }),
      prisma.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({
        where: { customerId: record.customerId },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      message:
        "Password berhasil diperbarui. Silakan login dengan password baru.",
    };
  }
}
```

## File: src/features/authEmployee/authEmployee.routes.ts
```typescript
import { Router } from "express";
import { AuthEmployeeController } from "./authEmployee.controllers";
import { AuthSessionController } from "../authShared/authSession.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

router.post("/login", AuthEmployeeController.login);
router.post("/accept-invitation", AuthEmployeeController.acceptInvitation);
router.post("/forgot-password",AuthEmployeeController.forgotPassword)
router.post("/reset-password",AuthEmployeeController.resetPasword)

export default router;
```

## File: src/features/authEmployee/authEmployee.services.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AuthTokenIssuer } from "../mailers/mailer.helpers";
import {
  AcceptInvitationInput,
  ForgotPasswordEmployeeInput,
  LoginEmployeeInput,
  ResetPasswordEmployeeInput,
} from "./authEmployee.validation";

export class AuthEmployeeService {
  static async login({ body }: LoginEmployeeInput) {
    const employee = await prisma.employee.findUnique({
      where: { email: body.email },
    });

    if (!employee || employee.deletedAt) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    if (employee.accountStatus === "INVITED" || !employee.passwordHash) {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun belum diaktivasi. Selesaikan proses undangan terlebih dahulu.",
      );
    }

    if (employee.accountStatus === "INACTIVE") {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun ini sudah dinonaktifkan.",
      );
    }

    const isPasswordValid = await BcryptUtil.compare(
      body.password,
      employee.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role
    };
  }
  static async acceptInvitation({ body }: AcceptInvitationInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "ACCOUNT_INVITATION" },
    });

    if (!record || !record.employeeId) {
      throw new ResponseError("INVALID_TOKEN", "Link undangan tidak valid.");
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link undangan ini sudah pernah dipakai.",
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link undangan sudah kedaluwarsa. Hubungi Super Admin untuk mengirim ulang undangan.",
      );
    }

    const passwordHash = await BcryptUtil.hash(body.password);

    await prisma.$transaction([
      prisma.employee.update({
        where: { id: record.employeeId },
        data: { passwordHash, accountStatus: "ACTIVE" },
      }),
      prisma.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return { message: "Akun berhasil diaktivasi. Silakan login." };
  }
  static async forgotPassword({ body }: ForgotPasswordEmployeeInput) {
    const genericResponse = {
      message: "Jika email terdaftar, link reset password telah dikirim.",
    };

    const employee = await prisma.employee.findUnique({
      where: { email: body.email },
    });

    if (!employee || employee.deletedAt) {
      return genericResponse;
    }

    if (employee.accountStatus === "INVITED" || !employee.passwordHash) {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun belum diaktivasi. Selesaikan proses undangan terlebih dahulu.",
      );
    }

    if (employee.accountStatus === "INACTIVE") {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun ini sudah dinonaktifkan.",
      );
    }

    await AuthTokenIssuer.issueEmployePasswordResetToken(
      employee.id,
      employee.email,
    );

    return genericResponse;
  }
  static async resetPasword({ body }: ResetPasswordEmployeeInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "PASSWORD_RESET" },
    });

    if (!record || !record.employeeId) {
      throw new ResponseError(
        "INVALID_TOKEN",
        "Link reset password tidak valid.",
      );
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link reset password ini sudah pernah dipakai.",
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link reset password sudah kedaluwarsa. Silakan minta link baru.",
      );
    }

    const passwordHash = await BcryptUtil.hash(body.newPassword);

    await prisma.$transaction([
      prisma.employee.update({
        where: { id: record.employeeId },
        data: { passwordHash },
      }),
      prisma.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({
        where: { employeeId: record.employeeId },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      message:
        "Password berhasil diperbarui. Silakan login dengan password baru.",
    };
  }
}
```

## File: src/features/bypass/bypass.service.ts
```typescript
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { EmployeeRepository } from "../employee/employee.repository";
import { BypassHelper } from "./bypass.helper";
import { BypassRepository } from "./bypass.repository";
import { BypassQuery } from "./bypass.type";

export class BypassService {
    static async getBypastRequests(query: BypassQuery, sub: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
        return BypassRepository.findAll(query, employee.currentOutletId ?? undefined)
    }
    static async getBypastRequestById(id: string, sub: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
        const bypass = await BypassRepository.findById(id, employee.currentOutletId ?? undefined)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
        const differences = BypassHelper.parseQuantityDifferences(bypass.quantityDiffJson)
        const orderItems = bypass.order.orderItems
        return {
            id: bypass.id,
            order: {id: bypass.order.id, orderCode: bypass.order.orderCode},
            stationType: bypass.stationType,
            worker: bypass.requestedByUser ? {id: bypass.requestedByUser.id, name: bypass.requestedByUser.name} : null,
            status: bypass.status,
            differences: differences.map(difference => {
                const orderItem = orderItems.find(item => item.id === difference.orderItemId)
                if(!orderItem) throw new ResponseError("INTERNAL_SERVER_ERROR", 'Kuantitas bypas tidak sesuai.')
                return {
                    orderItemId: difference.orderItemId,
                    itemName: orderItem.laundryItem.name,
                    officialQuantity: difference.officialQuantity,
                    submittedQuantity: difference.submittedQuantity,
                    difference: difference.difference
                }
            }),
            createdAt: bypass.createdAt
        }
    }
    static async approve(id: string, decidedBy: string, password: string, problemNote: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(decidedBy)
        if(!employee.passwordHash) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
        const bypass = await BypassRepository.findForDecision(id, employee.currentOutletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
        const validPassword = await BcryptUtil.compare(password, employee.passwordHash)
        if(!validPassword) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        const differences = BypassHelper.parseQuantityDifferences(bypass.quantityDiffJson)
        BypassHelper.validateDifferences(differences, bypass.order.orderItems)
        const result = await BypassRepository.approve(id, decidedBy, problemNote, differences)
        if(!result) return BypassRepository.findById(id, employee.currentOutletId)
        return result
    }
    static async reject(id: string, decidedBy: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(decidedBy)
        if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
        const bypass = await BypassRepository.findForDecision(id, employee.currentOutletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
        const result = await BypassRepository.reject(id, decidedBy)
        if(!result) return BypassRepository.findById(id, employee.currentOutletId)
        return result
    }
}
```

## File: src/features/cutomerProfile/profile.controllers.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ProfileCustomerValidation } from "./profile.validation";
import { CustomerProfileService } from "./profile.service";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class CustomerProfileController {
  static async updateCustomerProfile(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.UPDATE_PROFILE, {
      body: req.body,
    });

    const result = await CustomerProfileService.updateCustomerProfile(payload, {
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "Update profile berhasil dilakukan.",
    });
  }
  static async updateCustomerProfilePhoto(req: Request, res: Response) {
    const payload = res.locals.payload;
    const file = req.file;

    if (!file) {
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "File foto wajib diunggah. diunggah",
      );
    }

    const result = await CustomerProfileService.updateCustomerProfilePhoto(
      payload,
      file,
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "Foto profil baru berhasil di update",
    });
  }
  static async requestEmailChange(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.UPDATE_EMAIL, {
      body: req.body,
    });

    const result = await CustomerProfileService.requestEmailChange(payload, {
      body,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      massage: "Link konfirmasi telah dikirim ke email baru kamu.",
    });
  }
  static async confirmEmailChange(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.CONFIRM_EMAIL, {
      body: req.body,
    });

    const result = await CustomerProfileService.confirmEmailChange(payload, {
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "perubahan email berahasil dilakukan ",
    });
  }
}
```

## File: src/features/dashboard/dashboard.repository.ts
```typescript
import {
  BillPaymentStatus,
  BypassStatus,
  CustomerStatus,
  Prisma,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { DashboardQuery, DashboardResponse } from "./dashboard.type";

export class DashboardRepository {
  private static readonly PendingOrderSelect =
    Prisma.validator<Prisma.OrderSelect>()({
      id: true,
      orderCode: true,
      createdAt: true,
      customer: {
        select: {
          name: true,
        },
      },
    });
  private static readonly PendingBypassSelect =
    Prisma.validator<Prisma.BypassRequestSelect>()({
      id: true,
      createdAt: true,
      workerAssignment: {
        select: {
          stationType: true,
          worker: {
            select: {
              name: true,
            },
          },
          order: {
            select: {
              id: true,
              orderCode: true,
            },
          },
        },
      },
    });
  private static readonly RecentOrderSelect =
    Prisma.validator<Prisma.OrderSelect>()({
      id: true,
      orderCode: true,
      customerStatus: true,
      createdAt: true,
      customer: {
        select: {
          name: true,
        },
      },
    });
  static async getDashboard(
    query: DashboardQuery,
    scopedOutletId?: string,
  ): Promise<DashboardResponse> {
    const outletId = scopedOutletId ?? query.outletId;
    const orderWhere: Prisma.OrderWhereInput = {
      ...(outletId && { outletId }),
    };
    const billWhere: Prisma.BillWhereInput = {
      ...(outletId && { order: { outletId } }),
    };
    const pendingReceiveWhere: Prisma.OrderWhereInput = {
      customerStatus: CustomerStatus.ON_THE_WAY_TO_OUTLET,
      ...(outletId && { outletId }),
    };
    const pendingBypassWhere: Prisma.BypassRequestWhereInput = {
      status: BypassStatus.PENDING,
      ...(outletId && { workerAssignment: { outletId } }),
    };
    const activeOrdersWhere: Prisma.OrderWhereInput = {
      ...orderWhere,
      customerStatus: { not: CustomerStatus.RECEIVED_BY_CUSTOMER },
    };
    const completedOrdersWhere: Prisma.OrderWhereInput = {
      ...orderWhere,
      customerStatus: CustomerStatus.RECEIVED_BY_CUSTOMER,
    };
    const paidBillWhere: Prisma.BillWhereInput = {
      ...billWhere,
      paymentStatus: BillPaymentStatus.PAID,
    };
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
    const revenueTrendWhere: Prisma.BillWhereInput = {
      ...paidBillWhere,
      paidAt: {
        gte: startDate,
        lte: endDate,
      },
    };
    const [totalPendingReceive, itemsPendingReceive] = await Promise.all([
      prisma.order.count({
        where: pendingReceiveWhere,
      }),
      prisma.order.findMany({
        where: pendingReceiveWhere,
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: this.PendingOrderSelect,
      }),
    ]);

    const [totalPendingBypass, itemsPendingBypass] = await Promise.all([
      prisma.bypassRequest.count({ where: pendingBypassWhere }),
      prisma.bypassRequest.findMany({
        where: pendingBypassWhere,
        take: 5,
        orderBy: { createdAt: "desc" },
        select: this.PendingBypassSelect,
      }),
    ]);
    const [totalOrders, activeOrders, completedOrders, revenueAggregate] =
      await Promise.all([
        prisma.order.count({
          where: orderWhere,
        }),

        prisma.order.count({
          where: activeOrdersWhere,
        }),

        prisma.order.count({
          where: completedOrdersWhere,
        }),

        prisma.bill.aggregate({
          where: paidBillWhere,
          _sum: {
            totalAmount: true,
          },
        }),
      ]);
    const recentOrders = await prisma.order.findMany({
      where: orderWhere,
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: this.RecentOrderSelect,
    });
    const orderOverview = await prisma.order.groupBy({
      by: ["customerStatus"],
      where: orderWhere,
      _count: {
        id: true,
      },
    });
    const revenueBills = await prisma.bill.findMany({
      where: revenueTrendWhere,
      select: {
        paidAt: true,
        totalAmount: true,
      },
      orderBy: {
        paidAt: "asc",
      },
    });
    const pendingReceive = {
      total: totalPendingReceive,
      items: itemsPendingReceive.map((order) => ({
        id: order.id,
        orderCode: order.orderCode,
        customerName: order.customer.name,
        createdAt: order.createdAt,
      })),
    };
    const pendingBypass = {
      total: totalPendingBypass,
      items: itemsPendingBypass.map((request) => ({
        id: request.id,
        orderId: request.workerAssignment.order.id,
        orderCode: request.workerAssignment.order.orderCode,
        workerName: request.workerAssignment.worker?.name ?? "-",
        stationType: request.workerAssignment.stationType,
        createdAt: request.createdAt,
      })),
    };
    const summary = {
      totalOrders,
      activeOrders,
      completedOrders,
      totalRevenue: Number(revenueAggregate._sum.totalAmount ?? 0),
    };
    const recentOrderData = recentOrders.map((order) => ({
      id: order.id,
      orderCode: order.orderCode,
      customerName: order.customer.name,
      status: order.customerStatus,
      createdAt: order.createdAt,
    }));
    const orderOverviewData = orderOverview.map((order) => ({
      status: order.customerStatus,
      total: order._count.id,
    }));
    const revenueMap = new Map<string, number>();
    const getDateKey = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    for (const bill of revenueBills) {
      if (!bill.paidAt) continue;
      const key = getDateKey(bill.paidAt);
      revenueMap.set(
        key,
        (revenueMap.get(key) ?? 0) + Number(bill.totalAmount),
      );
    }
    const revenueTrend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);

      const key = getDateKey(date);

      return {
        date: key,
        revenue: revenueMap.get(key) ?? 0,
      };
    });
    return {
      summary,
      revenueTrend,
      orderOverview: orderOverviewData,
      recentOrders: recentOrderData,
      pendingReceive,
      pendingBypass,
    };
  }
}
```

## File: src/features/employee/employee.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { EmployeeValidation } from "./employee.validation";
import { EmployeeService } from "./employee.service";
import { Message } from "../../constants/message.constant";
import { ResponseHelper } from "../../helpers/response.helper";

export class EmployeeController {
    static async getEmployees(req: Request, res: Response){
        const query = validate(EmployeeValidation.Query.getEmployees, req.query);
        const employees = await EmployeeService.getEmployees(query)
        return ResponseHelper.paginated(res, Message.FETCHED, employees.data, employees.meta)
    }
    static async getCurrentOutletEmployee(req: Request, res: Response){
       const query = validate(EmployeeValidation.Query.getCurrentOutletEmployees, req.query) 
       const {sub} = res.locals.payload
       const employees = await EmployeeService.getCurrentOutletEmployee(sub, query)
       return ResponseHelper.paginated(res, Message.FETCHED, employees.data, employees.meta)
    }
    static async getCurrentOutletAttendance(req: Request, res: Response){
        const query = validate(EmployeeValidation.Query.getCurrentOutletAttendance, req.query)
        const {sub} = res.locals.payload
        const attendance = await EmployeeService.getCurrentOutletAttendance(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, attendance.data, attendance.meta)
    }
    static async getEmployeeById(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.getEmployeeById(id)
        return ResponseHelper.success(res, Message.FETCHED, employee)
    }
    static async inviteEmployee(req: Request, res: Response){
        const body = validate(EmployeeValidation.Body.inviteEmployee, req.body)
        const employee = await EmployeeService.inviteEmployee(body)
        return ResponseHelper.created(res, Message.INVITED, employee)
    }
    static async updateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const body = validate(EmployeeValidation.Body.updateEmployee, req.body)
        const employee = await EmployeeService.updateEmployee(id, body)
        return ResponseHelper.success(res, Message.UPDATED, employee)
    }
    static async resendInvitation(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.resendInvitation(id)
        return ResponseHelper.success(res, "Invitation resend successfully.", employee)

    }
    static async activateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.activateEmployee(id)
        return ResponseHelper.success(res, "Employee account activate successfully.", employee)
    }
    static async deactivateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.deactivateEmployee(id)
        return ResponseHelper.success(res, "Employee account deactivate successfully", employee)
    }
    static async assignEmployee(req: Request, res: Response){
        const body = validate(EmployeeValidation.Body.assignEmployee, req.body)
        const employee = await EmployeeService.assignEmployee(body)
        return ResponseHelper.success(res, "Employee assigned successfully.", employee)
    }
}
```

## File: src/features/order/order.controller.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OrderValidation } from "./order.validation";
import { OrderService } from "./order.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class OrderController {
    static async getOrders(req: Request, res: Response){
        const query = validate(OrderValidation.QUERY.getOrders, req.query)
        const {sub} = res.locals.payload
        const result = await OrderService.getOrders(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getOrderById(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const {sub} = res.locals.payload
        const order = await OrderService.getOrderById(id, sub)
        return ResponseHelper.success(res, Message.FETCHED, order)
    }
    static async receiveOrder(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const {sub} = res.locals.payload
        const order = await OrderService.receiveOrder(id, sub)
        return ResponseHelper.success(res, Message.RECEIVED, order)
    }
    static async createOrder(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const body = validate(OrderValidation.BODY.createOrder, req.body)
        const {sub} = res.locals.payload
        const order = await OrderService.createOrder(id, sub, body)
        return ResponseHelper.success(res, Message.CREATED, order)
    }
}
```

## File: src/features/report/report.helper.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import {
  SalesBreakdownItem,
  SalesPeriod,
  SalesQuery,
  SalesSummary,
  SalesTrendItem,
} from "./report.type";

type BillReportRow = {
  totalAmount: Prisma.Decimal;
  weightKg: Prisma.Decimal;
  paidAt: Date | null;
  order: {
    customerId: string;
    outletId: string;
    outlet: {
      id: string;
      name: string;
    };
  };
};

export class ReportHelper {
  static readonly billSelect = Prisma.validator<Prisma.BillSelect>()({
    totalAmount: true,
    weightKg: true,
    paidAt: true,
    order: {
      select: {
        customerId: true,
        outletId: true,
        outlet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  });

  static getPeriodRange(query: SalesQuery) {
    if (query.period === "DAY") {
      const source = query.date ?? new Date();
      const startDate = new Date(
        source.getFullYear(),
        source.getMonth(),
        source.getDate(),
      );
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      return { startDate, endDate };
    }

    if (query.period === "MONTH") {
      const now = new Date();
      const year = query.year ?? now.getFullYear();
      const month = query.month ?? now.getMonth() + 1;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      return { startDate, endDate };
    }

    const year = query.year ?? new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return { startDate, endDate };
  }

  static getPreviousPeriodRange(period: SalesPeriod, startDate: Date) {
    if (period === "DAY") {
      const previousEndDate = new Date(startDate);
      const previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 1);

      return { startDate: previousStartDate, endDate: previousEndDate };
    }

    if (period === "MONTH") {
      const previousStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        1,
      );
      const previousEndDate = new Date(startDate);

      return { startDate: previousStartDate, endDate: previousEndDate };
    }

    const previousStartDate = new Date(startDate.getFullYear() - 1, 0, 1);
    const previousEndDate = new Date(startDate);

    return { startDate: previousStartDate, endDate: previousEndDate };
  }

  static buildSummary(bills: BillReportRow[]): SalesSummary {
    const totalRevenue = bills.reduce(
      (total, bill) => total + Number(bill.totalAmount),
      0,
    );

    const totalWeightKg = bills.reduce(
      (total, bill) => total + Number(bill.weightKg),
      0,
    );

    const totalOrders = bills.length;
    const uniqueCustomers = new Set(bills.map((bill) => bill.order.customerId))
      .size;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      totalWeightKg,
      uniqueCustomers,
    };
  }

  static buildTrend(
    bills: BillReportRow[],
    period: SalesPeriod,
    startDate: Date,
    endDate: Date,
  ): SalesTrendItem[] {
    const buckets = new Map<string, SalesTrendItem>();
    const current = new Date(startDate);

    while (current < endDate) {
      const label = this.getBucketLabel(current, period);

      buckets.set(label, {
        label,
        revenue: 0,
        orders: 0,
        totalWeightKg: 0,
      });

      this.moveToNextBucket(current, period);
    }

    for (const bill of bills) {
      if (!bill.paidAt) continue;

      const label = this.getBucketLabel(bill.paidAt, period);
      const bucket = buckets.get(label);

      if (!bucket) continue;

      bucket.revenue += Number(bill.totalAmount);
      bucket.orders += 1;
      bucket.totalWeightKg += Number(bill.weightKg);
    }

    return Array.from(buckets.values());
  }

  static buildBreakdown(
    bills: BillReportRow[],
    totalRevenue: number,
  ): SalesBreakdownItem[] {
    const breakdown = new Map<
      string,
      SalesBreakdownItem & { customerIds: Set<string> }
    >();

    for (const bill of bills) {
      const outlet = bill.order.outlet;
      const revenue = Number(bill.totalAmount);
      const weight = Number(bill.weightKg);

      const existing = breakdown.get(outlet.id);

      if (existing) {
        existing.revenue += revenue;
        existing.orders += 1;
        existing.totalWeightKg += weight;
        existing.customerIds.add(bill.order.customerId);
        continue;
      }

      breakdown.set(outlet.id, {
        outletId: outlet.id,
        outletName: outlet.name,
        revenue,
        orders: 1,
        averageOrderValue: 0,
        totalWeightKg: weight,
        uniqueCustomers: 0,
        revenueSharePercent: 0,
        customerIds: new Set([bill.order.customerId]),
      });
    }

    return Array.from(breakdown.values())
      .map(({ customerIds, ...item }) => ({
        ...item,
        averageOrderValue: item.orders > 0 ? item.revenue / item.orders : 0,
        uniqueCustomers: customerIds.size,
        revenueSharePercent:
          totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }

  static getPercentChange(current: number, previous: number): number | null {
    if (previous === 0) {
      return current === 0 ? 0 : null;
    }

    return ((current - previous) / previous) * 100;
  }

  private static getBucketLabel(date: Date, period: SalesPeriod): string {
    switch (period) {
      case "DAY":
        return `${date.getHours().toString().padStart(2, "0")}:00`;

      case "MONTH":
        return date.getDate().toString().padStart(2, "0");

      case "YEAR":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
    }
  }

  private static moveToNextBucket(date: Date, period: SalesPeriod) {
    switch (period) {
      case "DAY":
        date.setHours(date.getHours() + 1);
        return;

      case "MONTH":
        date.setDate(date.getDate() + 1);
        return;

      case "YEAR":
        date.setMonth(date.getMonth() + 1);
    }
  }
}
```

## File: src/features/report/report.validation.ts
```typescript
import z from "zod";
import { Role, StationType } from "../../../generated/prisma";

export class ReportValidation {
  static readonly PARAMS = {};
  static readonly QUERY = {
    getSales: z.object({
      period: z.enum(["DAY", "MONTH", "YEAR"]).default("MONTH"),
      date: z.coerce.date().default(() => new Date()),
      month: z.coerce
        .number()
        .int()
        .min(1)
        .max(12)
        .default(() => new Date().getMonth() + 1),
      year: z.coerce
        .number()
        .int()
        .min(2025)
        .max(2100)
        .default(() => new Date().getFullYear()),
      outletId: z.uuid().optional(),
    }),
    getEmployeePeformance: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
      stationType: z.enum([StationType.WASHING, StationType.IRONING, StationType.PACKING]).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      outletId: z.uuid().optional(),
      sortBy: z.enum(["completedJobs", "name"]).default("completedJobs"),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }).superRefine((data, ctx) => {
        if(data.role === Role.DRIVER && data.stationType){
            ctx.addIssue({
                code: "custom",
                path: ["stationType"],
                message: "Tipe station hanya dapat digunakan untuk worker."
            })
        }
        if(data.startDate && data.endDate && data.startDate > data.endDate){
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date tidak boleh sebelum start date."
            })
        }
    }),
  };
  static readonly BODY = {};
}
```

## File: src/utils/geocoding.util.ts
```typescript
import { isAxiosError } from "axios";
import { opencageClient } from "../configs/axios.config";
import { ResponseError } from "./errors/response-error.utils";
import haversine from "haversine-distance";

type GeocodeResult = {
  latitude: number;
  longitude: number;
};

export class GeocodingUtil {
  static async geocode(formattedAddress: string): Promise<GeocodeResult> {
    let res;

    try {
      res = await opencageClient.get("/json", {
        params: {
          q: formattedAddress,
          countrycode: "id",
          language: "id",
          limit: 5,
          no_annotations: 1,
        },
      });
      console.log(
        "OpenCage results:",
        JSON.stringify(res.data.results, null, 2),
      );
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          "OpenCage HTTP error:",
          error.response?.status,
          error.response?.data,
        );
      } else {
        console.error("OpenCage request error:", error);
      }

      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memproses alamat. Coba tulis alamat lebih lengkap.",
      );
    }

    const results = res.data?.results ?? [];

    if (!results.length) {
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Alamat tidak ditemukan. Coba tulis alamat lebih lengkap.",
      );
    }

    const result =
      results.find(
        (item: any) =>
          item.components?._type === "house" ||
          item.components?._type === "building",
      ) ??
      results.find((item: any) => item.components?._type === "road") ??
      results[0];

    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    };
  }
  static haversineDistanceMeters(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    return haversine({ lat: lat1, lon: lng1 }, { lat: lat2, lon: lng2 });
  }
}
```

## File: src/features/addressCustomer/address.services.ts
```typescript
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import { userPayload } from "../../validations/validate";
import { assertOwnership } from "./address.helpers";
import {
  AddressIdInout,
  CreateAddressInput,
  UpdateAddressInput,
} from "./address.validation";

const MAX_ADDRESSES_PER_CUSTOMER = 5;

export class AddressService {
  static async create(payload: userPayload, { body }: CreateAddressInput) {
    const existingCount = await prisma.customerAddress.count({
      where: { customerId: payload.sub, deletedAt: null },
    });

    if (existingCount >= MAX_ADDRESSES_PER_CUSTOMER) {
      throw new ResponseError(
        "ADDRESS_LIMIT_REACHED",
        `Maksimal ${MAX_ADDRESSES_PER_CUSTOMER} alamat tersimpan. Hapus salah satu untuk menambah alamat baru.`,
      );
    }

    const formattedAddress = `${body.streetDetail}, ${body.subDistrictName},${body.districtName}, ${body.cityName}, ${body.provinceName},${body.zipCode}`;

    const shouldBePrimary = existingCount === 0 || body.isPrimary === true;

    const result = await prisma.$transaction(async (tx) => {
      if (shouldBePrimary) {
        await tx.customerAddress.updateMany({
          where: { customerId: payload.sub, deletedAt: null },
          data: { isPrimary: false },
        });
      }
      return tx.customerAddress.create({
        data: {
          customerId: payload.sub,
          label: body.label ?? null,
          provinceId: body.provinceId,
          provinceName: body.provinceName,
          cityId: body.cityId,
          cityName: body.cityName,
          districtId: body.districtId,
          districtName: body.districtName,
          subDistrictId: body.subDistrictId,
          subDistrictName: body.subDistrictName,
          streetDetail: body.streetDetail,
          zipCode: body.zipCode,
          formattedAddress: formattedAddress,
          phone: body.phone,
          latitude: body.latitude,
          longitude: body.longitude,
          isPrimary: shouldBePrimary,
        },
      });
    });

    const { customerId, ...safeAddress } = result;
    return safeAddress;
  }
  static async getAddress(payload: userPayload) {
    const address = await prisma.customerAddress.findMany({
      where: { customerId: payload.sub, deletedAt: null },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });

    if (!address) throw new ResponseError("ADDRESS_FORBIDDEN");

    return address;
  }
  static async update(
    payload: userPayload,
    { params, body }: UpdateAddressInput,
  ) {
    const address = await assertOwnership(payload.sub, params.id);

    const locationFieldsChanged =
      (body.provinceName && body.provinceName !== address.provinceName) ||
      (body.cityName && body.cityName !== address.cityName) ||
      (body.districtName && body.districtName !== address.districtName) ||
      (body.subDistrictName &&
        body.subDistrictName !== address.subDistrictName) ||
      (body.zipCode && body.zipCode !== address.zipCode) ||
      (body.streetDetail && body.streetDetail !== address.streetDetail);

    let latitude = Number(address.latitude);
    let longitude = Number(address.longitude);
    let formattedAddress = address.formattedAddress;

    if (locationFieldsChanged) {
      const streetDetail = body.streetDetail ?? address.streetDetail;
      const subDistrictName = body.subDistrictName ?? address.subDistrictName;
      const districtName = body.districtName ?? address.districtName;
      const cityName = body.cityName ?? address.cityName;
      const provinceName = body.provinceName ?? address.provinceName;
      const zipCode = body.zipCode ?? address.zipCode;

      formattedAddress = `${streetDetail},${subDistrictName}, ${districtName}, ${cityName}, ${provinceName} ${zipCode}`;

      const geocoded = await GeocodingUtil.geocode(formattedAddress);
      latitude = geocoded.latitude;
      longitude = geocoded.longitude;
    }

    const updated = await prisma.customerAddress.update({
      where: { id: address.id },
      data: {
        label: body.label ?? address.label,
        provinceId: body.provinceId ?? address.provinceId,
        provinceName: body.provinceName?? address.provinceName,
        cityId: body.cityId ?? address.cityId,
        cityName:body.cityName ?? address.cityName,
        districtId: body.districtId ?? address.districtId,
        districtName:body.districtName?? address.districtName,
        subDistrictId: body.subDistrictId ?? address.subDistrictId,
        subDistrictName:body.subDistrictName?? address.subDistrictName,
        zipCode: body.zipCode ?? address.zipCode,
        streetDetail: body.streetDetail ?? address.streetDetail,
        formattedAddress,
        phone: body.phone ?? address.phone,
        latitude,
        longitude,
      },
    });
    const { customerId, ...saveUpdated } = updated;
    return saveUpdated;
  }
  static async delete(payload: userPayload, { params }: AddressIdInout) {
    const address = await assertOwnership(payload.sub, params.id);

    await prisma.customerAddress.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });

    if (address.isPrimary) {
      const nextAddress = await prisma.customerAddress.findFirst({
        where: { customerId: address.customerId, deletedAt: null },
        orderBy: { createdAt: "asc" },
      });

      if (nextAddress) {
        await prisma.customerAddress.update({
          where: { id: nextAddress.id },
          data: { isPrimary: true },
        });
      }
    }
    return address.label;
  }
  static async setPrimary(payload: userPayload, { params }: AddressIdInout) {
    const address = await assertOwnership(payload.sub, params.id);

    await prisma.$transaction([
      prisma.customerAddress.updateMany({
        where: { customerId: payload.sub, deletedAt: null },
        data: { isPrimary: false },
      }),
      prisma.customerAddress.update({
        where: { id: address.id },
        data: { isPrimary: true },
      }),
    ]);

    return address.label;
  }
}
```

## File: src/features/authCustomer/authCustomer.controllers.ts
```typescript
import { Request, Response } from "express";
import { AuthCustomerValidation } from "./AuthCustomer.validation";
import { validate } from "../../validations/validate";
import { AuthCustomerService } from "./authCustomer.services";
import { StatusCodes } from "http-status-codes";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";

export class AuthCustomerController {
  static async register(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.REGISTER_CUSTOMER, {
      body: req.body,
    });
    const result = await AuthCustomerService.register({ body });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
    });
  }

  static async verifyCustomerEmail(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.VERIFY_EMAIL_CUSTOMER, {
      body: req.body,
    });

    const result = await AuthCustomerService.verifyCustomerEmail({
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resendVerification(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.REGISTER_CUSTOMER, {
      body: req.body,
    });

    const result = await AuthCustomerService.resendVerification({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async login(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.LOGIN_CUSTOMER, {
      body: req.body,
    });

    const customer = await AuthCustomerService.login({ body });

    const accessToken = JWTUtil.signAccessToken({
      sub: customer.id,
      accountType: "customer",
      role: customer.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      customerId: customer.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: { user: customer, homeUrl: "/" },
      message: "login berhasil",
    });
  }

  static async loginGoogle(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.GOOGLE_LOGIN, {
      body: req.body,
    });

    const customer = await AuthCustomerService.loginGoogle({ body });

    const accessToken = JWTUtil.signAccessToken({
      sub: customer.id,
      accountType: "customer",
      role: customer.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      customerId: customer.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: { user: customer, homeUrl: "/" },
    });
  }

  static async forgotPassword(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.FORGOT_PASSWORD, {
      body: req.body,
    });

   const result = await AuthCustomerService.forgotPassword({body})
    
   return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resetPassword(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.RESET_PASSWORD, {
      body: req.body,
    });

    const result = await AuthCustomerService.resetPassword({body})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }
}
```

## File: src/features/bypass/bypass.repository.ts
```typescript
import { BypassStatus, CustomerStatus, Prisma, WorkerAssignmentStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { BypassQuery, QuantityDifference } from "./bypass.type";

export class BypassRepository {
  private static readonly bypassListInclude =
    Prisma.validator<Prisma.BypassRequestInclude>()({
      order: {
        select: {
          id: true,
          orderCode: true,
          outletId: true,
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      workerAssignment: {
        select: {
          id: true,
          stationType: true,
          status: true,
          worker: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      requestedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
      decidedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
    });
  private static readonly bypassDetailInclude =
    Prisma.validator<Prisma.BypassRequestInclude>()({
      order: {
        include: {
          orderItems: {
            include: {
              laundryItem: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      workerAssignment: {
        select: {
          id: true,
          stationType: true,
          status: true,
          workerId: true
        },
      },
      requestedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
      decidedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
    });
  static async findAll(query: BypassQuery, outletId?: string) {
    const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
    const where: Prisma.BypassRequestWhereInput = {}
    if(outletId) where.order = {outletId}
    if(query.search){
        where.OR = [
            {
                order: {
                    orderCode: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                }
            },
            {
                requestedByUser: {
                    name: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                }
            }
        ]
    }
    if(query.status) where.status = query.status
    if(query.stationType) where.stationType = query.stationType
    if(query.startDate || query.endDate) {
        where.createdAt = {
            ...(query.startDate && {
                gte: query.startDate
            }),
            ...(query.endDate && {
                lte: query.endDate
            })
        }
    }
    const [bypassRequests, totalItems] = await prisma.$transaction([
        prisma.bypassRequest.findMany({where, skip, take, include: this.bypassListInclude, orderBy: {[query.sortBy]: query.sortOrder}}),
        prisma.bypassRequest.count({where})
    ])
    return {
        data: bypassRequests,
        meta: PaginationHelper.meta(page, pageSize, totalItems)
    }
  }
  static async findById(id: string, outletId?: string){
    return await prisma.bypassRequest.findFirst({where: {id, ...(outletId && {order: {outletId}})}, include: this.bypassDetailInclude})
  }
  static async findForDecision(id: string, outletId: string){
    return await prisma.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING, order: {outletId}}, include: {order: {include: {orderItems: true}}, workerAssignment: true}})
  }
  static async approve(id: string, decidedBy: string, approvalNote: string, differences: QuantityDifference[]){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const bypass = await tx.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING}, include: {workerAssignment: true}})
        if(!bypass) return null
        if(bypass.workerAssignment.status !== WorkerAssignmentStatus.ON_HOLD_BYPASS) throw new ResponseError('CONFLICT', 'Status pengerjaan sedang tidak di-hold.')
        for(const difference of differences){
            await tx.orderItem.update({where: {id: difference.orderItemId}, data: {quantity: difference.submittedQuantity}})
        }
        await tx.order.update({where: {id: bypass.workerAssignment.orderId}, data: {customerStatus: CustomerStatus[bypass.stationType]}})
        await tx.workerAssignment.update({where: {id: bypass.workerAssignmentId}, data: {status: WorkerAssignmentStatus.IN_PROGRESS, startedAt: now}, include: {order: true, worker: true}})
        return tx.bypassRequest.update({where: {id}, data:{status: BypassStatus.APPROVED, decidedBy, decidedAt: now, approvalNote}})
    })
  }
  static async reject(id: string, decidedBy: string){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const bypass = await tx.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING}, include: {workerAssignment: true}})
        if(!bypass) return null
        if(bypass.workerAssignment.status !== WorkerAssignmentStatus.ON_HOLD_BYPASS) throw new ResponseError('CONFLICT', 'Status pengerjaan sedang tidak di-hold.')
        await tx.workerAssignment.update({where: {id: bypass.workerAssignmentId}, data: {status: WorkerAssignmentStatus.ASSIGNED}, include: {order: true, worker: true}})
        return tx.bypassRequest.update({where: {id}, data: {status: BypassStatus.REJECTED, decidedBy, decidedAt: now}})
    })
  }
}
```

## File: src/features/laundry-item/laundry-item.repository.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { LaundryItemQuery } from "./laundry-item.type";

export class LaundryItemRepository {
  static async findAll(query: LaundryItemQuery) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const sortField = query.sortBy ?? "createdAt";
    const where: Prisma.LaundryItemWhereInput = { deletedAt: null };
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    const [laundryItems, totalItems] = await prisma.$transaction([
      prisma.laundryItem.findMany({
        where,
        take,
        skip,
        orderBy: {
          [sortField]: query.sortOrder ?? "asc",
        },
      }),
      prisma.laundryItem.count({ where }),
    ]);
    return {
      data: laundryItems,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string) {
    return await prisma.laundryItem.findFirst({
      where: { id, deletedAt: null },
    });
  }
  static async findByName(name: string) {
    return prisma.laundryItem.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, deletedAt: null },
    });
  }
  static async create(data: Prisma.LaundryItemCreateInput) {
    return await prisma.laundryItem.create({ data });
  }
  static async update(id: string, data: Prisma.LaundryItemUpdateInput) {
    return await prisma.laundryItem.update({ where: { id }, data });
  }
  static async findByIds(ids: string[]) {
    return await prisma.laundryItem.findMany({
      where: { id: { in: ids }, deletedAt: null },
    });
  }
}
```

## File: src/features/laundry-item/laundry-item.route.ts
```typescript
import { Router } from "express";
import { LaundryItemController } from "./laundry-item.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get('/', AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), LaundryItemController.getLaundryItems)
router.get('/:id', AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), LaundryItemController.getLaundryItem)
router.post('/', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.createLaundryItem)
router.patch('/:id', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.updateLaundryItem)
router.patch('/:id/deactivate', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.deactivateLaundryItem)

export default router
```

## File: src/features/laundry-item/laundry-item.service.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { LaundryItemHelper } from "./laundry-item.helper";
import { LaundryItemRepository } from "./laundry-item.repository";
import { CreateLaundryItemBody, LaundryItemQuery, UpdateLaundryItemBody } from "./laundry-item.type";

export class LaundryItemService {
    static async getLaundryItems(query: LaundryItemQuery){
        return await LaundryItemRepository.findAll(query)
    }
    static async getLaundryItem(id: string){
        const laundryItem = await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        return laundryItem
    }
    static async createLaundryItem(body: CreateLaundryItemBody){
        const existingItem = await LaundryItemRepository.findByName(body.name)
        if(existingItem) throw new ResponseError('CONFLICT', 'Laundry item dengan nama tersebut sudah ada.')
        return await LaundryItemRepository.create(body)
    }
    static async updateLaundryItem(id: string, body: UpdateLaundryItemBody){
        const laundryItem = await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        if(body.name && body.name.toLowerCase() !== laundryItem.name.toLowerCase()){
            const existingItem = await LaundryItemRepository.findByName(body.name)
            if(existingItem && existingItem.id !== id) throw new ResponseError('CONFLICT', "Laundry Item dengan nama tersebut sudah ada.")
        }
        return await LaundryItemRepository.update(id, body)
    }
    static async deactivateLaundryItem(id: string){
        await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        return await LaundryItemRepository.update(id, {deletedAt: new Date()})
    }
}
```

## File: src/features/mailers/mailer.service.ts
```typescript
import { EMAIL_VERIFICATION_EXPIRY_HOURS, PASSWORD_RESET_EXPIRY_HOURS} from "../../configs/env.config";
import { MailerUtil } from "../../utils/mailer/mailer.utils";
import { TemplateUtil } from "../../utils/mailer/template/tamplate.util";
 
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3000";

 
type SendEmailVerificationParams = {
  to: string;
  token: string; 
};

type SendEmployeeInvitationParams = {
  to: string;
  token: string;
  name: string
}
 
export class MailerService {
  static async sendEmailVerification({ to, token }: SendEmailVerificationParams) {
    const verificationUrl = `${APP_BASE_URL}/verify-email?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("email-verification", {
      verificationUrl,
      expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Verifikasi email Popo Laundry kamu",
      html,
    });
  }

  static async sendEmployeeInvitation({
    to,
    token,
    name
}: SendEmployeeInvitationParams) {
    const invitationUrl =
        `${APP_BASE_URL}/internal/accept-invitation?token=${encodeURIComponent(token)}`;

    const html = TemplateUtil.compile(
        "employee-invitation",
        {
            name,
            invitationUrl,
            expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
        },
    );

    return MailerUtil.sendMail({
        to,
        subject: "Undangan akun Popo Laundry",
        html,
    });
}

  static async sendChangeEmailVerification({ to, token }: SendEmailVerificationParams) {
    const verificationUrl = `${APP_BASE_URL}/profil/confirm-email?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("change-email-verification", {
      verificationUrl,
      expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Verifikasi perubahan email Popo Laundry kamu",
      html,
    });
  }

   static async sendPasswordReset({ to, token }: SendEmailVerificationParams) {
    const resetUrl = `${APP_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("password-reset", {
      resetUrl,
      expiryHours: PASSWORD_RESET_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Reset password Popo Laundry kamu",
      html,
    });
  }

  static async sendEmployeePasswordReset({to, token}: SendEmailVerificationParams) {
    const resetUrl = `${APP_BASE_URL}/internal/reset-password?token=${encodeURIComponent(token)}`;
    const html = TemplateUtil.compile("password-reset", {
      resetUrl,
      expiryHours: PASSWORD_RESET_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Reset password Popo Laundry kamu",
      html,
    });
  }
}
```

## File: src/features/outlet/outlet.repository.ts
```typescript
import { AccountStatus, CustomerStatus, Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { OutletQuery } from "./outlet.type";

export class OutletRepository {
  private static readonly outletInclude =
    Prisma.validator<Prisma.OutletInclude>()({
      staffOnDuty: {
        select: {
          id: true,
          name: true,
          role: true,
          workStatus: true,
          accountStatus: true,
        },
      },
    });
  static async findAll(query: OutletQuery) {
    const { page, take, pageSize, skip } = PaginationHelper.paginate(query);
    const sortField = query.sortBy ?? "createdAt";
    const where: Prisma.OutletWhereInput = {deletedAt: null, isActive: true};
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    const [outlets, totalItems] = await prisma.$transaction([
      prisma.outlet.findMany({
        where,
        skip,
        take,
        include: this.outletInclude,
        orderBy: {
          [sortField]: query.sortOrder ?? "desc",
        },
      }),
      prisma.outlet.count({
        where,
      }),
    ]);

    return {
      data: outlets,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string) {
    return await prisma.outlet.findUnique({
      where: { id, deletedAt: null },
      include: this.outletInclude,
    });
  }
  static async create(data: Prisma.OutletCreateInput){
    return await prisma.outlet.create({
        data,
        include: this.outletInclude
    })
  }
  static async update(id: string, data: Prisma.OutletUpdateInput){
    return await prisma.outlet.update({
        where: {id},
        data,
        include: this.outletInclude
    })
  }
  static async hasActiveEmployee(id: string){
    return await prisma.employee.count({where: {currentOutletId: id, accountStatus: AccountStatus.ACTIVE}})
  }
  static async hasActiveOrders(id: string){
    return await prisma.order.count({where: {outletId: id, customerStatus: {notIn: [CustomerStatus.RECEIVED_BY_CUSTOMER, CustomerStatus.OVERDUE]}}})
  }
}
```

## File: src/features/outlet/outlet.route.ts
```typescript
import { Router } from "express";
import { OutletController } from "./outlet.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get("/", OutletController.getOutlets)
router.get("/:id", OutletController.getOutletById)
router.post("/", OutletController.createOutlet)
router.patch("/:id", OutletController.updateOutlet)
router.delete("/:id/deactivate", OutletController.deactivateOutlet)

export default router
```

## File: src/features/pricing/pricing.service.ts
```typescript
import { ResponseError } from "../../utils/errors/response-error.utils";
import { PricingHelper } from "./pricing.helper";
import { PricingRepository } from "./pricing.repository";
import { CreateShippingRateBody, LaundryPricingBody, ShippingRateQuery, UpdateShippingRateBody } from "./pricing.type";

export class PricingService {
    static async getLaundryPricing(){
        const laundryPricing = await PricingHelper.findLaundryPricingOrThrow()
        return laundryPricing
    }
    static async createLaundryPricing(body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findCurrentLaundryPricing()
        if(laundryPricing) throw new ResponseError('CONFLICT', 'Harga laundry sudah ada.')
        return await PricingRepository.createLaundryPricing(body)
    }
    static async updateLaundryPricing(id: string, body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findLaundryPricingById(id)
        if(!laundryPricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Harga laundry tidak ditemukan.')
        return await PricingRepository.updateLaundryPricing(id, body)
    }
    static async getShippingRates(query: ShippingRateQuery){
        return await PricingRepository.getShippingRates(query)
    }
    static async getShippingRateById(id: string){
        const shippingRate = await PricingHelper.findShippingRateByIdOrThrow(id)
        return shippingRate
    }
    static async createShippingRate(body: CreateShippingRateBody){
        const shippingRate = await PricingRepository.findShippingRateByExactDistance(body.maxDistanceMeters)
        if(shippingRate && !shippingRate.deletedAt) throw new ResponseError('CONFLICT', 'Harga untuk jarak sudah ada.')
        return await PricingRepository.createShippingRate(body)
    }
    static async updateShippingRate(id: string, body: UpdateShippingRateBody){
        await PricingHelper.findShippingRateByIdOrThrow(id)
        return await PricingRepository.updateShippingRate(id, body)
    }
    static async deactivateShippingRate(id: string){
        const shippingRate = await PricingHelper.findShippingRateByIdOrThrow(id)
        if(shippingRate.deletedAt) throw new ResponseError('CONFLICT', 'Harga ongkir sudah dinonaktifkan.')
        return await PricingRepository.updateShippingRate(id, {deletedAt: new Date()})
    }
    static async getShippingRateByDistance(distance: number){
        const shippingRate = await PricingRepository.findShippingRateByDistanceMeter(distance)
        if(!shippingRate) throw new ResponseError('OUTSIDE_SERVICE_RADIUS')
        return shippingRate
    }
}
```

## File: src/features/report/report.repository.ts
```typescript
import {
  BillPaymentStatus,
  DriverAssignmentStatus,
  PickupDeliveryType,
  Prisma,
  Role,
  StationType,
  WorkerAssignmentStatus,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ReportHelper } from "./report.helper";
import {
  EmployeePerformanceItem,
  EmployeePerformanceQuery,
  EmployeePerformanceReport,
  SalesQuery,
  SalesReport,
} from "./report.type";

type EmployeeAccumulator = EmployeePerformanceItem & {
  completionDurations: number[];
};

export class ReportRepository {
  static async getSalesReport(
    query: SalesQuery,
    scopedOutletId?: string,
  ): Promise<SalesReport> {
    const { startDate, endDate } = ReportHelper.getPeriodRange(query);

    const previousPeriod = ReportHelper.getPreviousPeriodRange(
      query.period,
      startDate,
    );

    const outletId = scopedOutletId ?? query.outletId;

    const buildWhere = (
      rangeStart: Date,
      rangeEnd: Date,
    ): Prisma.BillWhereInput => ({
      paymentStatus: BillPaymentStatus.PAID,
      paidAt: {
        gte: rangeStart,
        lt: rangeEnd,
      },
      ...(outletId && {
        order: {
          outletId,
        },
      }),
    });

    const [bills, previousBills] = await Promise.all([
      prisma.bill.findMany({
        where: buildWhere(startDate, endDate),
        select: ReportHelper.billSelect,
        orderBy: {
          paidAt: "asc",
        },
      }),

      prisma.bill.findMany({
        where: buildWhere(previousPeriod.startDate, previousPeriod.endDate),
        select: ReportHelper.billSelect,
      }),
    ]);

    const summary = ReportHelper.buildSummary(bills);

    const previousSummary = ReportHelper.buildSummary(previousBills);

    const trend = ReportHelper.buildTrend(
      bills,
      query.period,
      startDate,
      endDate,
    );

    const breakdown = ReportHelper.buildBreakdown(bills, summary.totalRevenue);

    const peak = trend.reduce<(typeof trend)[number] | null>(
      (highest, item) =>
        !highest || item.revenue > highest.revenue ? item : highest,
      null,
    );

    return {
      period: {
        type: query.period,
        startDate,
        endDate,
      },

      summary,

      comparison: {
        previousPeriod: {
          startDate: previousPeriod.startDate,
          endDate: previousPeriod.endDate,
          totalRevenue: previousSummary.totalRevenue,
          totalOrders: previousSummary.totalOrders,
          averageOrderValue: previousSummary.averageOrderValue,
        },

        revenueChangePercent: ReportHelper.getPercentChange(
          summary.totalRevenue,
          previousSummary.totalRevenue,
        ),

        orderChangePercent: ReportHelper.getPercentChange(
          summary.totalOrders,
          previousSummary.totalOrders,
        ),

        averageOrderValueChangePercent: ReportHelper.getPercentChange(
          summary.averageOrderValue,
          previousSummary.averageOrderValue,
        ),
      },

      trend,

      breakdown,

      highlights: {
        topOutlet: breakdown[0]
          ? {
              outletId: breakdown[0].outletId,
              outletName: breakdown[0].outletName,
              revenue: breakdown[0].revenue,
              orders: breakdown[0].orders,
            }
          : null,

        peak,
      },
    };
  }

  static async getEmployeePerformanceReport(
    query: EmployeePerformanceQuery,
    scopedOutletId?: string,
  ): Promise<EmployeePerformanceReport> {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);

    const outletId = scopedOutletId ?? query.outletId;

    const dateRange = this.getCompletedAtRange(query.startDate, query.endDate);

    const shouldQueryWorker = !query.role || query.role === Role.WORKER;

    const shouldQueryDriver = !query.role || query.role === Role.DRIVER;

    const workerWhere: Prisma.WorkerAssignmentWhereInput = {
      status: WorkerAssignmentStatus.COMPLETED,

      completedAt: {
        not: null,
        ...dateRange,
      },

      ...(outletId && {
        outletId,
      }),

      ...(query.stationType && {
        stationType: query.stationType,
      }),

      workerId: {
        not: null,
      },
    };

    const driverWhere: Prisma.DriverAssignmentWhereInput = {
      status: DriverAssignmentStatus.COMPLETED,

      completedAt: {
        not: null,
        ...dateRange,
      },

      ...(outletId && {
        outletId,
      }),

      driverId: {
        not: null,
      },
    };

    const [workerAssignments, driverAssignments] = await Promise.all([
      shouldQueryWorker
        ? prisma.workerAssignment.findMany({
            where: workerWhere,
            select: {
              workerId: true,
              stationType: true,
              startedAt: true,
              completedAt: true,
            },
          })
        : Promise.resolve([]),

      shouldQueryDriver && !query.stationType
        ? prisma.driverAssignment.findMany({
            where: driverWhere,
            select: {
              driverId: true,
              taskType: true,
              assignedAt: true,
              completedAt: true,
            },
          })
        : Promise.resolve([]),
    ]);

    const performanceMap = new Map<string, EmployeeAccumulator>();

    const getAccumulator = (employeeId: string, role: Role) => {
      const existing = performanceMap.get(employeeId);

      if (existing) {
        return existing;
      }

      const created: EmployeeAccumulator = {
        employeeId,
        employeeName: "",
        role,
        completedJobs: 0,
        pickupJobs: 0,
        deliveryJobs: 0,
        washingJobs: 0,
        ironingJobs: 0,
        packingJobs: 0,
        averageCompletionMinutes: null,
        completionDurations: [],
      };

      performanceMap.set(employeeId, created);

      return created;
    };

    for (const assignment of workerAssignments) {
      if (!assignment.workerId) continue;

      const item = getAccumulator(assignment.workerId, Role.WORKER);

      item.completedJobs += 1;

      if (assignment.stationType === StationType.WASHING) {
        item.washingJobs += 1;
      }

      if (assignment.stationType === StationType.IRONING) {
        item.ironingJobs += 1;
      }

      if (assignment.stationType === StationType.PACKING) {
        item.packingJobs += 1;
      }

      const duration = this.getDurationMinutes(
        assignment.startedAt,
        assignment.completedAt,
      );

      if (duration !== null) {
        item.completionDurations.push(duration);
      }
    }

    for (const assignment of driverAssignments) {
      if (!assignment.driverId) continue;

      const item = getAccumulator(assignment.driverId, Role.DRIVER);

      item.completedJobs += 1;

      if (assignment.taskType === PickupDeliveryType.PICKUP) {
        item.pickupJobs += 1;
      }

      if (assignment.taskType === PickupDeliveryType.DELIVERY) {
        item.deliveryJobs += 1;
      }

      const duration = this.getDurationMinutes(
        assignment.assignedAt,
        assignment.completedAt,
      );

      if (duration !== null) {
        item.completionDurations.push(duration);
      }
    }

    const employeeIds = [...performanceMap.keys()];

    if (employeeIds.length === 0) {
      return this.emptyEmployeePerformanceReport(page, pageSize);
    }

    const employees = await prisma.employee.findMany({
      where: {
        id: {
          in: employeeIds,
        },

        ...(query.search && {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        }),
      },

      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    const performance = employees
      .filter(
        (employee) =>
          employee.role === Role.DRIVER || employee.role === Role.WORKER,
      )
      .map((employee) => {
        const item = performanceMap.get(employee.id);

        if (!item) {
          throw new Error("Employee performance data is missing.");
        }

        const averageCompletionMinutes =
          item.completionDurations.length > 0
            ? item.completionDurations.reduce(
                (total, duration) => total + duration,
                0,
              ) / item.completionDurations.length
            : null;

        const { completionDurations, ...employeePerformance } = item;

        return {
          ...employeePerformance,
          employeeName: employee.name,
          role: employee.role,
          averageCompletionMinutes,
        };
      });

    this.sortPerformance(performance, query);

    const totalItems = performance.length;

    const totalCompletedJobs = performance.reduce(
      (total, employee) => total + employee.completedJobs,
      0,
    );

    const workerCompletedJobs = performance
      .filter((employee) => employee.role === Role.WORKER)
      .reduce((total, employee) => total + employee.completedJobs, 0);

    const driverCompletedJobs = performance
      .filter((employee) => employee.role === Role.DRIVER)
      .reduce((total, employee) => total + employee.completedJobs, 0);

    const topPerformer =
      [...performance].sort((a, b) => b.completedJobs - a.completedJobs)[0] ??
      null;

    const data = performance.slice(skip, skip + take);

    return {
      data: {
        summary: {
          totalEmployees: totalItems,

          totalCompletedJobs,

          averageJobsPerEmployee:
            totalItems > 0 ? totalCompletedJobs / totalItems : 0,

          workerCompletedJobs,

          driverCompletedJobs,

          topPerformer: topPerformer
            ? {
                employeeId: topPerformer.employeeId,
                employeeName: topPerformer.employeeName,
                role: topPerformer.role,
                completedJobs: topPerformer.completedJobs,
              }
            : null,
        },

        data,
      },

      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }

  private static getCompletedAtRange(
    startDate?: Date,
    endDate?: Date,
  ): Pick<Prisma.DateTimeNullableFilter, "gte" | "lt"> {
    const range: Pick<Prisma.DateTimeNullableFilter, "gte" | "lt"> = {};

    if (startDate) {
      range.gte = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
    }

    if (endDate) {
      const exclusiveEndDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
      );

      exclusiveEndDate.setDate(exclusiveEndDate.getDate() + 1);

      range.lt = exclusiveEndDate;
    }

    return range;
  }

  private static getDurationMinutes(
    startedAt: Date | null,
    completedAt: Date | null,
  ): number | null {
    if (!startedAt || !completedAt || completedAt <= startedAt) {
      return null;
    }

    return (completedAt.getTime() - startedAt.getTime()) / 60_000;
  }

  private static sortPerformance(
    performance: EmployeePerformanceItem[],
    query: EmployeePerformanceQuery,
  ) {
    performance.sort((a, b) => {
      if (query.sortBy === "name") {
        const comparison = a.employeeName.localeCompare(b.employeeName);

        return query.sortOrder === "asc" ? comparison : -comparison;
      }

      const comparison = a.completedJobs - b.completedJobs;

      return query.sortOrder === "asc" ? comparison : -comparison;
    });
  }

  private static emptyEmployeePerformanceReport(
    page: number,
    pageSize: number,
  ): EmployeePerformanceReport {
    return {
      data: {
        summary: {
          totalEmployees: 0,
          totalCompletedJobs: 0,
          averageJobsPerEmployee: 0,
          workerCompletedJobs: 0,
          driverCompletedJobs: 0,
          topPerformer: null,
        },

        data: [],
      },

      meta: PaginationHelper.meta(page, pageSize, 0),
    };
  }
}
```

## File: src/middlewares/auth.middlewares.ts
```typescript
import { NextFunction, Request, Response } from "express";
import { JWTUtil } from "../utils/Auth/jwt.utils";
import { ResponseError } from "../utils/errors/response-error.utils";

export class AuthMiddleware {
  static authenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies?.accessToken;

      if (!token) {
        return next(new ResponseError("ACCESS_TOKEN_REQUIRED"));
      }

      try {
        const payload = JWTUtil.verifyAccessToken(token);
        res.locals.payload = payload;
        next();
      } catch (err) {
        next(err); // JWTUtil sudah translate ke ResponseError yang benar, tinggal diteruskan
      }
    };
  }

  static authorized(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = res.locals.payload;

      if (!payload || !allowedRoles.includes(payload.role)) {
        return next(new ResponseError("FORBIDDEN", "Tidak punya akses."));
      }

      next();
    };
  }
}
```

## File: .gitignore
```
node_modules
# Keep environment variables out of version control
.env

generated/prisma
/src/generated/prisma
generated/prisma/
.DS_Store

*.zip
dist/
BE.md

prisma/seed
```

## File: prisma/seed.ts
```typescript
import { BillPaymentStatus } from "../generated/prisma";
import { prisma } from "../src/configs/prisma-client.config";

async function main() {
  console.log("🌱 Updating paidAt for paid bills...");

  const bills = await prisma.bill.findMany({
    where: {
      paymentStatus: BillPaymentStatus.PAID,
      paidAt: null,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  for (const bill of bills) {
    await prisma.bill.update({
      where: {
        id: bill.id,
      },
      data: {
        paidAt: bill.createdAt,
      },
    });
  }

  console.log(`✅ Updated ${bills.length} paid bills.`);
}

main()
  .catch((error) => {
    console.error("❌ Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## File: src/features/outlet/outlet.service.ts
```typescript
import { Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OutletHelper } from "./outlet.helper";
import { OutletRepository } from "./outlet.repository";
import { CreateOutletBody, OutletQuery, UpdateOutletBody } from "./outlet.type";

export class OutletService {
  static async getOutlets(query: OutletQuery) {
    return await OutletRepository.findAll(query);
  }
  static async getOutletById(id: string) {
    const outlet = await OutletHelper.findOutletByIdOrThrow(id);
    return outlet;
  }
  static async createOutlet(body: CreateOutletBody) {
    const { name, address, latitude, longitude } = body;

    return await OutletRepository.create({
      name,
      address,
      latitude,
      longitude,
    });
  }
  static async updateOutlet(id: string, body: UpdateOutletBody) {
    await OutletHelper.findOutletByIdOrThrow(id);
    const updateData: Prisma.OutletUpdateInput = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.latitude !== undefined) updateData.latitude = body.latitude;
    if (body.longitude !== undefined) updateData.longitude = body.longitude;

    return await OutletRepository.update(id, updateData);
  }
  static async deactivateOutlet(id: string) {
    const now = new Date();
    const outlet = await OutletHelper.findOutletByIdOrThrow(id);
    if (!outlet.isActive) throw new ResponseError("CONFLICT", "Outlet sudah tidak aktif.");
    const employeeCount = await OutletRepository.hasActiveEmployee(id);
    if (employeeCount > 0) throw new ResponseError("CONFLICT", "Outlet memiliki karyawan yang masih aktif.");
    const activeOrderCount = await OutletRepository.hasActiveOrders(id);
    if (activeOrderCount > 0) throw new ResponseError("CONFLICT", "Outlet memiliki order yang masih berjalan/aktif.");
    return await OutletRepository.update(id, { isActive: false, deletedAt: now });
  }
}
```

## File: src/utils/Auth/cookie.utils.ts
```typescript
import { Response } from "express";
import { TOKEN_MAX_AGE_MS } from "../../configs/env.config";

export class AuthCookieUtil {
  private static readonly isProd = process.env.NODE_ENV === "production";

  static setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      path: "/",
      maxAge: TOKEN_MAX_AGE_MS,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      path: "/api/v1/auth",
      maxAge: TOKEN_MAX_AGE_MS,
    });
  }

  static clearAuthCookies(res: Response): void {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: this.isProd,
      path: "/",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      path: "/api/v1/auth",
    });
  }
}
```

## File: src/features/employee/employee.route.ts
```typescript
import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get("/", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.getEmployees)
router.get("/team", AuthMiddleware.authorized([Role.OUTLET_ADMIN]), EmployeeController.getCurrentOutletEmployee)
router.get("/attendance", AuthMiddleware.authorized([Role.OUTLET_ADMIN]), EmployeeController.getCurrentOutletAttendance)
router.get("/:id", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.getEmployeeById)
router.post("/invite", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.inviteEmployee)
router.post("/assignments", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.assignEmployee)
router.post("/:id/resend-invitation", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.resendInvitation)
router.patch("/:id/activate", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.activateEmployee)
router.patch("/:id/deactivate", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.deactivateEmployee)
router.patch("/:id", AuthMiddleware.authorized([Role.SUPER_ADMIN]), EmployeeController.updateEmployee)

export default router
```

## File: src/features/employee/employee.validation.ts
```typescript
import z from "zod";
import { AccountStatus, Role, StationType, WorkStatus } from "../../../generated/prisma";
import { AttendanceStatus } from "./employee.type";

export class EmployeeValidation {
  static readonly Query = {
    getEmployees: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(50).optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]).optional(),
      accountStatus: z.enum(AccountStatus).optional(),
      workStatus: z.enum(WorkStatus).optional(),
      outletId: z.uuid().optional(),
      sortBy: z.enum(["name", "email", "role", "accountStatus", "createdAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc"),
    }),
    getCurrentOutletEmployees: z
      .object({
        page: z.coerce.number().positive().optional(),
        pageSize: z.coerce.number().min(1).max(100).optional(),
        search: z.string().trim().optional(),
        role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
        workStatus: z.enum(WorkStatus).optional(),
        stationType: z.enum(StationType).optional(),
        sortBy: z.enum(["name", "role", "workStatus"]).default("name"),
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
      })
      .superRefine((data, ctx) => {
        if (data.role === Role.DRIVER && data.stationType) {
          ctx.addIssue({
            code: "custom",
            path: ["stationType"],
            message: "Station type hanya berlaku untuk worker.",
          });
        }
      }),
    getCurrentOutletAttendance: z.object({
      page: z.coerce.number().positive().optional(),
      pageSize: z.coerce.number().min(1).max(100).optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
      date: z.coerce.date().optional(),
      status: z.enum(AttendanceStatus).optional(),
      sortBy: z.enum(["name", "clockInAt", "clockOutAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc"),
    }),
  };

  static readonly Params = {
    employeeId: z.object({
      id: z.uuid(),
    }),
  };

  static readonly Body = {
    inviteEmployee: z.object({
      name: z.string().trim().min(3).max(100),
      email: z.email(),
      role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]),
    }),
    updateEmployee: z
      .object({
        name: z.string().trim().min(3).max(100).optional(),
        role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]).optional(),
      })
      .refine((data) => data.name !== undefined || data.role !== undefined, { error: "At least one field must be provided." }),
    assignEmployee: z.object({
      employeeId: z.uuid(),
      outletId: z.uuid(),
    }),
  };
}
```

## File: src/utils/Auth/jwt.utils.ts
```typescript
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/env.config";
import { ResponseError } from "../errors/response-error.utils";
import { Role } from "../../../generated/prisma";
import { ACCESS_TOKEN_EXPIRES_IN } from "../../configs/env.config";

export interface JWTPayload {
  sub: string;
  accountType: "customer" | "employee";
  role: Role;
}

export class JWTUtil {
  static signAccessToken(payload: JWTPayload) {
    if (!JWT_SECRET_KEY) {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "JWT_SECRET_KEY belum dikonfigurasi",
      );
    }

    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
  }

  static verifyAccessToken(
    token: string,
    secretKey: string = JWT_SECRET_KEY!,
  ): JWTPayload {
    if (!secretKey) {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "JWT_SECRET_KEY belum dikonfigurasi",
      );
    }
    try {
      return jwt.verify(token, secretKey) as JWTPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ResponseError("ACCESS_TOKEN_EXPIRED", "Sesi kedaluwarsa."); // ✅
      }
      if (error instanceof JsonWebTokenError) {
        throw new ResponseError("INVALID_TOKEN", "Token tidak valid."); // ✅
      }
      throw error;
    }
  }
}
```

## File: package.json
```json
{
  "name": "laundry-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc && prisma generate",
    "postinstall": "prisma generate"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@prisma/adapter-pg": "^7.9.1",
    "@prisma/client": "6.19.3",
    "axios": "^1.19.0",
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.10.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "google-auth-library": "^11.0.0",
    "handlebars": "^4.7.9",
    "haversine-distance": "^1.2.4",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.3",
    "nodemailer": "^9.0.4",
    "pg": "^8.22.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/multer": "^2.2.0",
    "@types/cookie-parser": "^1.4.10",
    "@types/pg": "^8.20.0",
    "multer": "^2.2.0",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/nodemailer": "^8.0.1",
    "nodemon": "^3.1.14",
    "prisma": "6.19.3",
    "ts-node": "^10.9.2",
    "typescript": "^6.0.3"
  }
}
```

## File: src/features/authEmployee/authEmployee.controllers.ts
```typescript
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AuthEmployeeValidation } from "./authEmployee.validation";
import { AuthEmployeeService } from "./authEmployee.services";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";
import { StatusCodes } from "http-status-codes";

export class AuthEmployeeController {
  static async login(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.LOGIN_EMPLOYEE, {
      body: req.body,
    });
     const employee = await AuthEmployeeService.login({ body });
    const accessToken = JWTUtil.signAccessToken({
      sub: employee.id,
      accountType: "employee",
      role: employee.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      employeeId: employee.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: employee,
      message: "login berhasil",
    });
  }

  static async acceptInvitation(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.ACCEPT_INVITATION, {
      body: req.body,
    });

    const result = await AuthEmployeeService.acceptInvitation({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async forgotPassword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.FORGOT_PASSWORD, {
      body: req.body,
    });

    const result = await AuthEmployeeService.forgotPassword({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resetPasword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.RESET_PASSWORD, {
      body: req.body,
    });

    const result = await AuthEmployeeService.resetPasword({ body });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }
}
```

## File: src/features/employee/employee.repository.ts
```typescript
import { DriverAssignmentStatus, Prisma, Role, WorkerAssignmentStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { AttendanceStatus, EmployeeQuery, OutletAttendanceQuery, OutletTeamQuery } from "./employee.type";

export class EmployeeRepository {
  private static readonly employeeInclude = Prisma.validator<Prisma.EmployeeInclude>()({ currentOutlet: true });
  static async findAll(query: EmployeeQuery) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const where: Prisma.EmployeeWhereInput = { deletedAt: null, role: { not: Role.SUPER_ADMIN } };
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.role) where.role = query.role;
    if (query.accountStatus) where.accountStatus = query.accountStatus;
    if (query.workStatus) where.workStatus = query.workStatus;
    if (query.outletId) where.currentOutletId = query.outletId;
    const [employees, totalItems] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip,
        take,
        include: this.employeeInclude,
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
        omit: {
          passwordHash: true,
        },
      }),
      prisma.employee.count({ where }),
    ]);
    return {
      data: employees,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findOutletTeam(query: OutletTeamQuery, outletId: string) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const where: Prisma.EmployeeWhereInput = { currentOutletId: outletId, role: { in: [Role.DRIVER, Role.WORKER] } };
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.role) where.role = query.role;
    if (query.workStatus) where.workStatus = query.workStatus;
    if (query.stationType) {
      where.workerTasks = {
        some: {
          stationType: query.stationType,
          status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS] },
        },
      };
    }
    const [employees, totalItems] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip,
        take,
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          accountStatus: true,
          workStatus: true,
          workerTasks: {
            where: {
              status: {
                in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.ON_HOLD_BYPASS, WorkerAssignmentStatus.IN_PROGRESS],
              },
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              stationType: true,
              status: true,
              assignedAt: true,
              startedAt: true,
            },
          },
          driverTasks: {
            where: {
              status: {
                in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS],
              },
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              taskType: true,
              status: true,
              assignedAt: true,
              pickedUpAt: true,
            },
          },
        },
      }),
      prisma.employee.count({
        where,
      }),
    ]);
    return {
      data: employees,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findCurrentOutletAttendance(query: OutletAttendanceQuery, outletId: string) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const selectedDate = query.date ?? new Date();
    selectedDate.setHours(7, 0, 0, 0);
    const where: Prisma.EmployeeWhereInput = {
      currentOutletId: outletId,
      role: query.role ? query.role : { in: [Role.DRIVER, Role.WORKER] },
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: "insensitive" } }, { email: { contains: query.search, mode: "insensitive" } }],
      }),
    };
    const employees = await prisma.employee.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        attendances: {
          where: {
            attendanceDate: selectedDate,
          },
          select: {
            id: true,
            attendanceDate: true,
            clockInAt: true,
            clockOutAt: true,
          },
          take: 1,
        },
      },
    });
    const attendance = employees.map((employee) => {
      const attendance = employee.attendances[0];
      let status: AttendanceStatus;
      if (!attendance?.clockInAt) status = AttendanceStatus.NOT_CLOCKED_IN;
      else if (!attendance.clockOutAt) status = AttendanceStatus.CLOCKED_IN;
      else status = AttendanceStatus.CLOCKED_OUT;
      return {
        employeeId: employee.id,
        employeeName: employee.name,
        employeeEmail: employee.email,
        role: employee.role,
        attendanceDate: attendance?.attendanceDate ?? selectedDate,
        clockInAt: attendance?.clockInAt ?? null,
        clockOutAt: attendance?.clockOutAt ?? null,
        status,
      };
    });
    const filteredAttendance = query.status ? attendance.filter((item) => item.status === query.status) : attendance;
    filteredAttendance.sort((a, b) => {
      if (query.sortBy === "name") {
        const comparison = a.employeeName.localeCompare(b.employeeName);
        return query.sortOrder === "desc" ? -comparison : comparison;
      }
      const firstValue = query.sortBy === "clockInAt" ? a.clockInAt : a.clockOutAt;
      const secondValue = query.sortBy === "clockInAt" ? b.clockInAt : b.clockOutAt;

      const firstTime = firstValue?.getTime() ?? 0;
      const secondTime = secondValue?.getTime() ?? 0;

      const comparison = firstTime - secondTime;

      return query.sortOrder === "desc" ? -comparison : comparison;
    });

    const totalItems = filteredAttendance.length;
    const data = filteredAttendance.slice(skip, skip + take);
    const summary = {
      totalEmployees: employees.length,
      notClockedIn: attendance.filter((item) => item.status === AttendanceStatus.NOT_CLOCKED_IN).length,
      clockedIn: attendance.filter((item) => item.status === AttendanceStatus.CLOCKED_IN).length,
      clockedOut: attendance.filter((item) => item.status === AttendanceStatus.CLOCKED_OUT).length,
    };
    return {
      data: {
        summary,
        data,
      },
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string) {
    return await prisma.employee.findUnique({
      where: { id, deletedAt: null },
      include: this.employeeInclude,
    });
  }
  static async findByEmail(email: string) {
    return await prisma.employee.findUnique({
      where: { email },
    });
  }
  static async create(data: Prisma.EmployeeCreateInput) {
    return await prisma.employee.create({ data, include: this.employeeInclude });
  }
  static async update(id: string, data: Prisma.EmployeeUpdateInput) {
    return await prisma.employee.update({ where: { id }, data, include: this.employeeInclude });
  }
}
```

## File: src/features/authShared/authSession.controllers.ts
```typescript
import { Request, Response } from "express";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { Role } from "../../../generated/prisma";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";

export class AuthSessionController {
  static async getMe(req: Request, res: Response) {
    const { sub, accountType } = res.locals.payload!;
    if (accountType === "customer") {
      const customer = await prisma.customer.findUnique({ where: { id: sub } });

      if (!customer || customer.deletedAt) {
        throw new ResponseError("AUTHENTICATION_REQUIRED");
      }

      return res.json({
        success: true,
        data: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          role: customer.role,
          accountType: "customer",
          phone: customer.phone,
          profilePhotoUrl: customer.profilePhotoUrl,
          isEmailVerified: customer.isEmailVerified,
          authProvider: customer.authProvider,
        },
      });
    }

    const employee = await prisma.employee.findUnique({ where: { id: sub } });

    if (!employee || employee.deletedAt) {
      throw new ResponseError("AUTHENTICATION_REQUIRED");
    }

    return res.json({
      success: true,
      data: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        accountType: "employee",
        isEmailVerified: true,
      },
    });
  }
  /**
   * POST /auth/logout
   * Mencabut refresh token di database (bukan cuma hapus cookie), supaya
   * token yang mungkin sudah bocor sebelumnya tidak bisa dipakai lagi.
   */
  static async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await RefreshTokenService.revoke(refreshToken);
    }

    AuthCookieUtil.clearAuthCookies(res);

    return res.json({ success: true, data: { message: "Berhasil logout." } });
  }

  /**
   * POST /auth/refresh
   * Menukar refresh token lama dengan access token + refresh token baru,
   * tanpa user perlu login ulang. Role/data diambil ulang dari database
   * (bukan dari token lama) supaya perubahan role terbaru langsung berlaku.
   */
  
  static async refresh(req: Request, res: Response) {
    const rawRefreshToken = req.cookies.refreshToken;

    if (!rawRefreshToken) {
      throw new ResponseError(
        "AUTHENTICATION_REQUIRED",
        "Tidak ada sesi aktif.",
      );
    }

    const { owner, newRawToken } =
      await RefreshTokenService.rotate(rawRefreshToken);

    let sub: string;
    let accountType: "customer" | "employee";
    let role: Role;

    if (owner.customerId) {
      const customer = await prisma.customer.findUnique({
        where: {
          id: owner.customerId,
        },
      });

      if (!customer || customer.deletedAt) {
        throw new ResponseError("AUTHENTICATION_REQUIRED", "Sesi tidak valid.");
      }

      sub = customer.id;
      accountType = "customer";
      role = customer.role;
    } else {
      const employee = await prisma.employee.findUnique({
        where: {
          id: owner.employeeId!,
        },
      });

      if (!employee || employee.deletedAt) {
        throw new ResponseError("AUTHENTICATION_REQUIRED", "Sesi tidak valid.");
      }

      sub = employee.id;
      accountType = "employee";
      role = employee.role;
    }

    const newAccessToken = JWTUtil.signAccessToken({
      sub,
      accountType,
      role,
    });

    AuthCookieUtil.setAuthCookies(res, newAccessToken, newRawToken);

    return res.json({
      success: true,
      data: {
        message: "Token diperbarui.",
      },
    });
  }
}
```

## File: src/features/order/order.repository.ts
```typescript
import { CustomerStatus, DriverAssignmentStatus, PickupDeliveryType, Prisma, Role, StationType, WorkerAssignmentStatus, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { CreateOrderTransactionData, OrderQuery } from "./order.type";

export class OrderRepository {
  private static readonly orderListInclude =
    Prisma.validator<Prisma.OrderInclude>()({
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      outlet: {
        select: {
          id: true,
          name: true,
        },
      },
      bill: {
        select: {
          id: true,
          weightKg: true,
          totalAmount: true,
          paymentStatus: true,
        },
      },
    });
  private static readonly orderDetailInclude =
    Prisma.validator<Prisma.OrderInclude>()({
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      outlet: {
        select: {
          id: true,
          name: true,
        },
      },
      bill: {
        select: {
          id: true,
          weightKg: true,
          totalAmount: true,
          paymentStatus: true,
          paidAt: true
        },
      },
      orderItems: {
        include: {
          laundryItem: true,
        },
      },
      driverAssignments: {
        include: {
          driver: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      workerAssignments: {
        include: {
          worker: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      complaint: true,
    });
  static async findAll(query: OrderQuery, outletId?: string) {
    const { page, pageSize, take, skip } = PaginationHelper.paginate(query);
    const where: Prisma.OrderWhereInput = {};
    if(query.endDate){
      query.endDate.setDate(query.endDate.getDate() + 1)
      query.endDate.setHours(0, 0, 0, 0)
    }
    if (outletId) where.outletId = outletId;
    else if (query.outletId) where.outletId = query.outletId;
    if (query.search) {
      where.OR = [
        {
          orderCode: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          customer: {
            name: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
        {
          customer: {
            email: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    if(query.customerStatus) where.customerStatus = query.customerStatus
    if(query.paymentStatus) where.bill = {paymentStatus: query.paymentStatus}
    if(query.startDate || query.endDate) {
        where.pickupScheduledAt = {...(query.startDate && {gte: query.startDate}), ...(query.endDate && {lt: query.endDate})}
    }
    const [orders, totalItems] = await prisma.$transaction([
        prisma.order.findMany({
            where,
            skip,
            take,
            include: this.orderListInclude,
            orderBy: {[query.sortBy] : query.sortOrder}
        }),
        prisma.order.count({
            where
        })
    ])
    return {
        data: orders,
        meta: PaginationHelper.meta(page, pageSize, totalItems)
    }
  }
  static async findById(id: string, outletId?: string){
    return await prisma.order.findFirst({where: {id, ...(outletId && {outletId})}, include: this.orderDetailInclude})
  }
  static async findPickupAssignment(orderId: string){
    return await prisma.driverAssignment.findFirst({where: {orderId, taskType: PickupDeliveryType.PICKUP, status: {in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS]}}, include: {driver: true}})
  }
  static async receiveOrder(orderId: string, assignmentId: string, driverId: string, receivedBy: string){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const assignment = await tx.driverAssignment.updateMany({where: {id: assignmentId, orderId, driverId, status: DriverAssignmentStatus.IN_PROGRESS}, data: {status: DriverAssignmentStatus.COMPLETED, completedAt: now}})
        if(assignment.count === 0) throw new ResponseError("INVALID_STATE_TRANSITION", 'Pesanan sudah tidak dapat diterima.')
        await tx.employee.update({where: {id: driverId, role: Role.DRIVER}, data: {workStatus: WorkStatus.AVAILABLE}})
        await tx.order.update({where: {id: orderId}, data: {receivedAt: now, receivedBy, customerStatus: CustomerStatus.ARRIVED_AT_OUTLET}})
        return tx.order.findFirst({where: {id: orderId}, include: this.orderDetailInclude})
    })
  }
  static async createOrder(data: CreateOrderTransactionData){
    return await prisma.$transaction(async (tx) => {
        await tx.bill.create({data: {
            orderId: data.orderId,
            laundryPricingId: data.laundryPricingId,
            pricePerKgSnapshot: data.pricePerKgSnapshot,
            shippingRateId: data.shippingRateId,
            shippingFeeSnapshot: data.shippingFeeSnapshot,
            weightKg: data.weightKg,
            totalAmount: data.totalAmount
        }})
        await tx.orderItem.createMany({data: data.items.map((item) => ({
            orderId: data.orderId,
            laundryItemId: item.laundryItemId,
            quantity: item.quantity
        }))})
        await tx.workerAssignment.create({data: {
            orderId: data.orderId,
            outletId: data.outletId,
            stationType: StationType.WASHING,
            status: WorkerAssignmentStatus.QUEUED
        }})
        return tx.order.findFirst({where: {id: data.orderId}, include: this.orderDetailInclude})
    })
  }
}
```

## File: src/features/order/order.service.ts
```typescript
import {
  CustomerStatus,
  DriverAssignmentStatus,
  Prisma,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { LaundryItemRepository } from "../laundry-item/laundry-item.repository";
import { PricingRepository } from "../pricing/pricing.repository";
import { OrderHelper } from "./order.helper";
import { OrderRepository } from "./order.repository";
import { CreateOrderBody, OrderQuery } from "./order.type";

export class OrderService {
  static async getOrders(query: OrderQuery, sub: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
    return OrderRepository.findAll(query, employee.currentOutletId ?? undefined);
  }
  static async getOrderById(id: string, sub: string) {
  const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub);
  const order = await OrderHelper.findOrderByIdOrThrow(id, employee.currentOutletId ?? undefined);

  if (!order.bill || !order.bill.weightKg) {
    return order;
  }

  const laundryPricing = await PricingRepository.findCurrentLaundryPricing();
  const shippingRate = await PricingRepository.findShippingRateByDistanceMeter(
    Number(order.distanceMeters)
  );

  const weightKg = Number(order.bill.weightKg);
  const pricePerKg = laundryPricing ? Number(laundryPricing.pricePerKg) : 0;
  const shippingCost = shippingRate ? Number(shippingRate.price) : 0;
  const laundryCost = weightKg * pricePerKg;

  return {
    ...order,
    bill: {
      ...order.bill,
      laundryCost,
      shippingCost,
    },
  };
}
  static async receiveOrder(
    orderId: string,
    outletAdminId: string,
  ) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
    const order = await OrderHelper.findOrderByIdOrThrow(orderId, employee.currentOutletId ?? undefined)
    if (order.receivedAt) return order;
    if (order.customerStatus !== CustomerStatus.ON_THE_WAY_TO_OUTLET)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order belum siap untuk diterima.",
      );
    const assignment = await OrderRepository.findPickupAssignment(orderId);
    if (!assignment)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Penugasan pickup tidak ditemukan.",
      );
    if (
      assignment.status !== DriverAssignmentStatus.IN_PROGRESS ||
      !assignment.driverId
    )
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Penugasan tidak dalam progress.",
      );
    return OrderRepository.receiveOrder(
      orderId,
      assignment.id,
      assignment.driverId,
      outletAdminId,
    );
  }
  static async createOrder(
    orderId: string,
    outletAdminId: string,
    body: CreateOrderBody,
  ) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
    if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
    const order = await OrderHelper.findOrderByIdOrThrow(orderId, employee.currentOutletId)
    if (!order.receivedAt || order.customerStatus !== CustomerStatus.ARRIVED_AT_OUTLET)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order belum diterima outlet.",
      );
    if (order.bill) return order;
    const itemIds = body.items.map((item) => item.laundryItemId);
    const laundryItems = await LaundryItemRepository.findByIds(itemIds);
    const uniqueItemIds = new Set(itemIds);
    if (laundryItems.length !== uniqueItemIds.size)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "1 atau lebih laundry item tidak ditemukan.",
      );
    const laundryPricing = await PricingRepository.findCurrentLaundryPricing();
    if (!laundryPricing)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Harga laundry tidak ditemukan/kosong.",
      );
    const shippingRate =
      await PricingRepository.findShippingRateByDistanceMeter(
        Number(order.distanceMeters),
      );
    if (!shippingRate)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Harga ongkir tidak ditemukan.",
      );
    const weightKg = new Prisma.Decimal(body.weightKg);
    const laundryCost = weightKg.mul(laundryPricing.pricePerKg);
    const totalAmount = laundryCost.add(shippingRate.price);
    return OrderRepository.createOrder({
      orderId,
      outletId: employee.currentOutletId,
      weightKg,
      laundryPricingId: laundryPricing.id,
      pricePerKgSnapshot: laundryPricing.pricePerKg,
      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,
      totalAmount,
      items: body.items,
    });
  }
}
```

## File: src/utils/errors/errors.ts
```typescript
/**
 * ATURAN TIM:
 * - Jangan bikin ResponseError manual dengan status/code baru di luar file ini.
 * - Kalau butuh kasus error baru, tambahkan entrinya DI SINI dulu, baru dipakai.
 * - Pesan default boleh di-override per pemanggilan kalau butuh detail spesifik
 *   (lihat contoh pemakaian di response-error.util.ts).
 */

import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";

export const AppErrors = {
  // ===== Authentication & Token =====
  GEOCODING_SERVICE_ERROR: {
    code: "GEOCODING_SERVICE_ERROR",
    status: StatusCodes.BAD_GATEWAY,
    message: "Geocoding service error."
  },
  AUTHENTICATION_REQUIRED: {
    code: "AUTHENTICATION_REQUIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Anda belum login atau sesi telah berakhir.",
  },

  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    status: StatusCodes.UNAUTHORIZED,
    message: "Email atau password salah.",
  },
  ACCOUNT_NOT_ACTIVE: {
    code: "ACCOUNT_NOT_ACTIVE",
    status: StatusCodes.FORBIDDEN,
    message: "Akun Anda belum aktif atau telah dinonaktifkan.",
  },
  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_NOT_VERIFIED",
    status: StatusCodes.FORBIDDEN,
    message: "Email Anda belum diverifikasi.",
  },
  CURRENT_PASSWORD_INVALID: {
    code: "CURRENT_PASSWORD_INVALID",
    status: StatusCodes.FORBIDDEN,
    message: "Password saat ini salah.",
  },

  GOOGLE_ACCOUNT_NO_PASSWORD: {
    code: "GOOGLE_ACCOUNT_NO_PASSWORD",
    status: StatusCodes.FORBIDDEN,
    message: "Akun ini terdaftar via Google. Silakan login dengan Google.",
  },

  GOOGLE_ACCOUNT_EMAIL_LOCKED: {
    code: "GOOGLE_ACCOUNT_EMAIL_LOCKED",
    status: StatusCodes.FORBIDDEN,
    message: "Email akun Google tidak dapat diganti dari sini.",
  },
  ACCESS_TOKEN_EXPIRED: {
    code: "ACCESS_TOKEN_EXPIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Sesi kedaluwarsa. Silakan perbarui sesi Anda.",
  },
  ACCESS_TOKEN_REQUIRED: {
    code: "ACCESS_TOKEN_REQUIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token tidak ditemukan. Silakan perbarui sesi Anda.",
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token tidak valid.",
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token telah kedaluwarsa. Silakan minta ulang.",
  },
  TOKEN_ALREADY_USED: {
    code: "TOKEN_ALREADY_USED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token sudah pernah digunakan.",
  },
  EMAIL_ALREADY_REGISTERED: {
    code: "EMAIL_ALREADY_REGISTERED",
    status: StatusCodes.CONFLICT,
    message: "Email sudah terdaftar.",
  },
  INVALID_PAYMENT_SIGNATURE: {
    code: "INVALID_PAYMENT_SIGNATURE",
    status: StatusCodes.UNAUTHORIZED,
    message: "Signature webhook tidak valid.",
  },

  // ===== Authorization / Scope =====
  FORBIDDEN: {
    code: "FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "Anda tidak memiliki akses untuk melakukan aksi ini.",
  },
  OUTLET_SCOPE_FORBIDDEN: {
    code: "OUTLET_SCOPE_FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "Anda hanya dapat mengakses data outlet Anda sendiri.",
  },

  // ===== Resource & Validasi Umum =====
  RESOURCE_NOT_FOUND: {
    code: "RESOURCE_NOT_FOUND",
    status: StatusCodes.NOT_FOUND,
    message: "Data tidak ditemukan.",
  },
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Data yang dikirim tidak valid.",
  },
  CONFLICT: {
    code: "CONFLICT",
    status: StatusCodes.CONFLICT,
    message: "Terjadi konflik data.",
  },
  DUPLICATE_REQUEST: {
    code: "DUPLICATE_REQUEST",
    status: StatusCodes.CONFLICT,
    message: "Request ini sudah pernah diproses sebelumnya.",
  },
  INVALID_STATE_TRANSITION: {
    code: "INVALID_STATE_TRANSITION",
    status: StatusCodes.CONFLICT,
    message: "Status saat ini tidak mengizinkan aksi tersebut.",
  },

  // ===== File Upload =====
  FILE_TYPE_NOT_ALLOWED: {
    code: "FILE_TYPE_NOT_ALLOWED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tipe file tidak diizinkan.",
  },
  FILE_TOO_LARGE: {
    code: "FILE_TOO_LARGE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Ukuran file melebihi batas maksimum.",
  },
  // ===== Lokasi & Outlet (BR-LOC) =====
  OUTLET_NOT_AVAILABLE: {
    code: "OUTLET_NOT_AVAILABLE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tidak ada outlet aktif yang dapat melayani lokasi Anda.",
  },
  OUTSIDE_SERVICE_RADIUS: {
    code: "OUTSIDE_SERVICE_RADIUS",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Alamat berada di luar  jangkauan layanan (maks. 10 km).",
  },
  PRICING_NOT_AVAILABLE: {
    code: "PRICING_NOT_AVAILABLE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Master harga belum tersedia.",
  },
  INVALID_PICKUP_DATE: {
    code: "INVALID_PICKUP_DATE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tanggal tidak dapat di proses",
  },

  // ===== Payment & Bill (BR-PAY, BR-PRICE) =====
  PAYMENT_NOT_READY: {
    code: "PAYMENT_NOT_READY",
    status: StatusCodes.CONFLICT,
    message: "Order belum dapat dibayar. Menunggu proses outlet selesai.",
  },
  ORDER_FORBIDDEN: {
    code: "ORDER_FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "Order tidak ditemukan atau bukan milik kamu.",
  },
  BILL_NOT_FOUND: {
    code: "BILL_NOT_FOUND",
    status: StatusCodes.NOT_FOUND,
    message: "Invoice untuk order ini belum tersedia.",
  },
  PAYMENT_ALREADY_PAID: {
    code: "PAYMENT_ALREADY_PAID",
    status: StatusCodes.CONFLICT,
    message: "Tagihan ini sudah lunas.",
  },
  PAYMENT_ALREADY_PENDING: {
    code: "PAYMENT_ALREADY_PENDING",
    status: StatusCodes.CONFLICT,
    message:
      "Masih ada percobaan pembayaran yang berjalan. Cek status atau tunggu sampai kedaluwarsa.",
  },
  ORDER_OVERDUE: {
    code: "ORDER_OVERDUE",
    status: StatusCodes.CONFLICT,
    message: "Order ini sudah melewati batas waktu pembayaran.",
  },

  // ===== Driver / Worker Assignment (BR-DRV, BR-WRK) =====
  ACTIVE_ASSIGNMENT_EXISTS: {
    code: "ACTIVE_ASSIGNMENT_EXISTS",
    status: StatusCodes.CONFLICT,
    message: "Anda masih memiliki tugas aktif yang belum selesai.",
  },
  QUANTITY_MISMATCH: {
    code: "QUANTITY_MISMATCH",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Quantity yang diinput tidak sesuai dengan data resmi.",
  },
  BYPASS_ALREADY_DECIDED: {
    code: "BYPASS_ALREADY_DECIDED",
    status: StatusCodes.CONFLICT,
    message: "Request bypass ini sudah diputuskan sebelumnya.",
  },

  // ===== Attendance (BR-ATT) =====
  ATTENDANCE_ALREADY_CLOCKED_IN: {
    code: "ATTENDANCE_ALREADY_CLOCKED_IN",
    status: StatusCodes.CONFLICT,
    message: "Anda sudah melakukan absen datang hari ini.",
  },
  ATTENDANCE_NOT_CLOCKED_IN: {
    code: "ATTENDANCE_NOT_CLOCKED_IN",
    status: StatusCodes.CONFLICT,
    message: "Anda belum melakukan absen datang hari ini.",
  },
  CLOCK_OUT_BLOCKED: {
    code: "CLOCK_OUT_BLOCKED",
    status: StatusCodes.CONFLICT,
    message: "Tidak dapat absen pulang karena masih ada tugas aktif.",
  },

  // ===== Komplain (BR-CMP) =====
  COMPLAINT_NOT_ALLOWED: {
    code: "COMPLAINT_NOT_ALLOWED",
    status: StatusCodes.CONFLICT,
    message: "Komplain tidak dapat diajukan untuk order ini.",
  },

  // ===== Internal Server Error =====
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
  },

  // ===== Address error =====
  GEOCODING_FAILED: {
    code: "GEOCODING_FAILED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "tidak dapat mendapatkan alamat",
  },

  ADDRESS_LIMIT_REACHED: {
    code: "ADDRESS_LIMIT_REACHED",
    status: StatusCodes.CONFLICT,
    message: "tidak dapat menyimpan alamat",
  },

  LOCATION_PERMISSION_REQUIRED: {
    code: "LOCATION_PERMISSION_REQUIRED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Izin lokasi browser diperlukan untuk request pickup.",
  },

  ADDRESS_FORBIDDEN: {
    code: "ADDRESS_FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "alamat tidak ditemukan",
  },
} as const;

export type AppErrorKey = keyof typeof AppErrors;
```

## File: src/features/employee/employee.service.ts
```typescript
import {
  AccountStatus,
  Prisma,
  Role,
  WorkStatus,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AuthTokenIssuer } from "../mailers/mailer.helpers";
import { OutletRepository } from "../outlet/outlet.repository";
import { EmployeeHelper } from "./employee.helper";
import { EmployeeRepository } from "./employee.repository";
import {
  AssignEmployeeBody,
  EmployeeQuery,
  InviteEmployeeBody,
  OutletAttendanceQuery,
  OutletTeamQuery,
  UpdateEmployeeBody,
} from "./employee.type";

export class EmployeeService {
  static async getEmployees(query: EmployeeQuery) {
    return await EmployeeRepository.findAll(query);
  }
  static async getEmployeeById(id: string) {
    const employee = await EmployeeRepository.findById(id);
    if(!employee) throw new ResponseError('RESOURCE_NOT_FOUND', 'Employee tidak ditemukan.')
    return employee;
  }
  static async getCurrentOutletEmployee(
    adminOutletId: string,
    query: OutletTeamQuery,
  ) {
    const employee =
      await EmployeeHelper.findEmployeeByIdOrThrow(adminOutletId);
    if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
    return EmployeeRepository.findOutletTeam(query, employee.currentOutletId);
  }
  static async getCurrentOutletAttendance(query: OutletAttendanceQuery, adminOutletId: string){
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(adminOutletId)
    if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
    return EmployeeRepository.findCurrentOutletAttendance(query, employee.currentOutletId)
  }
  static async inviteEmployee(body: InviteEmployeeBody) {
    const existingEmployee = await EmployeeRepository.findByEmail(body.email);
    if (existingEmployee)
      throw new ResponseError("CONFLICT", "Email employee sudah ada.");
    const employeeData = {
      name: body.name,
      email: body.email,
      role: body.role,
      accountStatus: AccountStatus.INVITED,
      workStatus: WorkStatus.OFF_DUTY
    };
    const employee = await EmployeeRepository.create(employeeData);
    await AuthTokenIssuer.issueEmployeInvitationToken(
      employee.id,
      employee.email,
      employee.name,
    );
    return employee;
  }
  static async updateEmployee(id: string, body: UpdateEmployeeBody) {
    const { name, role } = body;
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    const updateData: Prisma.EmployeeUpdateInput = {};
    if (name) updateData.name = name;
    if (role) {
      if (employee.workStatus !== WorkStatus.OFF_DUTY && employee.workStatus !== null)
        throw new ResponseError("CONFLICT", "Employee masih bekerja.");
      updateData.role = role;
    }
    return await EmployeeRepository.update(id, updateData);
  }
  static async resendInvitation(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.INVITED)
      throw new ResponseError(
        "CONFLICT",
        "Akun employee tidak sedang menunggu undangan.",
      );
    await AuthTokenIssuer.issueEmployeInvitationToken(
      employee.id,
      employee.email,
      employee.name,
    );
    return employee;
  }
  static async activateEmployee(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.INACTIVE)
      throw new ResponseError("CONFLICT", "Akun sudah aktif.");
    const updateData: Prisma.EmployeeUpdateInput = {
      accountStatus: AccountStatus.ACTIVE,
    };
    return EmployeeRepository.update(id, updateData);
  }
  static async deactivateEmployee(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.ACTIVE)
      throw new ResponseError("CONFLICT", "Akun sudah tidak aktif.");
    if (employee.workStatus === WorkStatus.BUSY)
      throw new ResponseError("CONFLICT", "Employee sedang sibuk.");
    const updateData: Prisma.EmployeeUpdateInput = {
      accountStatus: AccountStatus.INACTIVE,
    };
    return EmployeeRepository.update(id, updateData);
  }
  static async assignEmployee(body: AssignEmployeeBody) {
    const { employeeId, outletId } = body;
    const employee = await EmployeeRepository.findById(employeeId);
    if(!employee) throw new ResponseError('RESOURCE_NOT_FOUND', 'Employee tidak ditemukan.')
    if (employee.accountStatus !== AccountStatus.ACTIVE)
      throw new ResponseError("CONFLICT", "Akun harus aktif.");
    if (employee.workStatus !== WorkStatus.OFF_DUTY && employee.workStatus !== null)
      throw new ResponseError("CONFLICT", "Employee masih bekerja.");
    const outlet = await OutletRepository.findById(outletId);
    if (!outlet)
      throw new ResponseError("RESOURCE_NOT_FOUND", "Outlet tidak ditemukan.");
    if (employee.currentOutletId === outletId)
      throw new ResponseError(
        "CONFLICT",
        "Employee sudah ditempatkan pada outlet ini.",
      );
    const updateData: Prisma.EmployeeUpdateInput = {
      currentOutlet: { connect: { id: outletId } },
    };
    return EmployeeRepository.update(employeeId, updateData);
  }
}
```

## File: src/configs/env.config.ts
```typescript
import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT as string) || 8001;
export const API_PREFIX = process.env.API_PREFIX;

// ===== cors ===== //
export const WHITE_LIST = (process.env.WHITE_LIST ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// ===== node mailer ===== //
export const NODEMAILER_GOOGLE_APP_PASSWORD =
  process.env.NODEMAILER_GOOGLE_APP_PASSWORD;
export const NODEMAILER_GOOGLE_APP_USER_EMAIL =
  process.env.NODEMAILER_GOOGLE_APP_USER_EMAIL;

// ===== google client ===== //
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// ===== cloudynary ===== //
export const CLOUDINARY_CLOUD_NAME = process.env
  .CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env
  .CLOUDINARY_API_SECRET as string;

// ===== jwt & token ===== //
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 30 hari
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 1;
export const PASSWORD_RESET_EXPIRY_HOURS = 1;

// ==== opencage ===== //
export const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
export const OPENCAGE_BASE_URL = process.env.OPENCAGE_BASE_URL;

// ===== api rajaOngkir ===== //
export const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY;

// ===== midtrans ===== //
export const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID;
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
export const MIDTRANS_IS_PRODUCTION =
  process.env.MIDTRANS_IS_PRODUCTION === "true";
export const MIDTRANS_SNAP_BASE_URL = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1/transactions"
  : "https://app.sandbox.midtrans.com/snap/v1/transactions";
```

## File: prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================================
// ENUMS
// ============================================================

enum Role {
  CUSTOMER
  SUPER_ADMIN
  OUTLET_ADMIN
  WORKER
  DRIVER
}

enum AuthProvider {
  EMAIL
  GOOGLE
}

enum AccountStatus {
  INVITED
  ACTIVE
  INACTIVE
}

/// Pengganti DutyStatus + AvailabilityStatus (digabung jadi satu sumber
/// kebenaran). OFF_DUTY = belum/sudah selesai kerja. AVAILABLE = sedang
/// bertugas dan siap mengambil job dari daftar tugas tersedia (assignment
/// v2.1 bersifat MANUAL, worker/driver memilih sendiri -- lihat BR-DRV dan
/// BR-WRK). BUSY = sedang mengerjakan satu assignment aktif.
enum WorkStatus {
  OFF_DUTY
  AVAILABLE
  BUSY
}

/// v2.1: StationType TIDAK LAGI melekat permanen ke Employee (Worker).
/// Enum ini sekarang HANYA dipakai di WorkerAssignment, untuk menandai
/// station APA yang sedang dikerjakan pada satu job tertentu. Worker
/// bersifat dinamis -- boleh mengambil job dari station manapun kapan
/// saja. Lihat BR-WRK-01 (v2.1).
enum StationType {
  WASHING
  IRONING
  PACKING
}

enum AuthTokenType {
  EMAIL_VERIFICATION
  PASSWORD_RESET
  ACCOUNT_INVITATION
}

/// Status customer-facing. v2.1 menambahkan SCHEDULED (sebelum
/// WAITING_DRIVER_PICKUP) dan OVERDUE (menggantikan WAITING_PAYMENT
/// setelah 7 hari tanpa pembayaran).
///
/// PERHATIAN -- OVERDUE ADALAH STATUS FINAL/TERMINAL:
/// Begitu Order berstatus OVERDUE, aplikasi TIDAK memproses order ini
/// lebih lanjut. Tidak ada transisi otomatis keluar dari OVERDUE.
/// Penyelesaian (termasuk pembayaran susulan) ditangani MANUAL oleh admin
/// DI LUAR aplikasi. Lihat BR-PAY-04 untuk detail lengkap.
enum CustomerStatus {
  SCHEDULED
  WAITING_DRIVER_PICKUP
  ON_THE_WAY_TO_OUTLET
  ARRIVED_AT_OUTLET
  WASHING
  IRONING
  PACKING
  WAITING_PAYMENT
  OVERDUE
  READY_FOR_DELIVERY
  ON_THE_WAY_TO_CUSTOMER
  WAITING_CUSTOMER_CONFIRMATION
  RECEIVED_BY_CUSTOMER
}

enum BillPaymentStatus {
  UNPAID
  PAID
}

enum PickupDeliveryType {
  PICKUP
  DELIVERY
}

/// v2.1: assignment bersifat MANUAL (worker/driver claim sendiri dari
/// daftar tugas tersedia), bukan FIFO otomatis. Status QUEUED tetap
/// dipakai untuk menandai "job tersedia, belum diambil siapapun".
enum DriverAssignmentStatus {
  QUEUED
  ASSIGNED
  IN_PROGRESS
  COMPLETED
}

/// PAUSED_OFF_HOURS dihapus -- lihat kesepakatan Fitur 3. Worker/driver
/// tidak dapat clock out selama masih ASSIGNED/IN_PROGRESS (BR-ATT-03),
/// sehingga tidak pernah ada assignment yang "ditinggal" dan butuh status
/// jeda terpisah.
enum WorkerAssignmentStatus {
  QUEUED
  ASSIGNED
  IN_PROGRESS
  ON_HOLD_BYPASS
  COMPLETED
}

enum BypassStatus {
  PENDING
  APPROVED
  REJECTED
}

enum PaymentTransactionStatus {
  PENDING
  SETTLEMENT
  CAPTURE
  DENY
  CANCEL
  EXPIRE
}

enum ComplaintCategory {
  TIDAK_SESUAI
  RUSAK
  HILANG
}

enum ComplaintStatus {
  OPEN
  APPROVED
  REJECTED
}

// ============================================================
// CUSTOMER & EMPLOYEE (v2.1: dipecah dari model User tunggal)
// ============================================================

/// v2.1: dipisah dari Employee. Sebelumnya digabung dalam satu tabel User
/// bersama Employee, menyebabkan banyak kolom nullable yang hanya relevan
/// untuk salah satu sisi (workStatus, stationType, currentOutletId, dst
/// selalu null untuk customer). Login Customer terpisah dari login
/// Employee -- lihat BR-AUTH-01 (v2.1).
model Customer {
  id              String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  role            Role         @default(CUSTOMER)
  name            String
  email           String       @unique
  passwordHash    String?      @map("password_hash")
  authProvider    AuthProvider @default(EMAIL) @map("auth_provider")
  isEmailVerified Boolean      @default(false) @map("is_email_verified")
  pendingEmail    String?      @map("pending_email")
  profilePhotoUrl String?      @map("profile_photo_url")
  phone           String?
  createdAt       DateTime     @default(now()) @map("created_at")
  updatedAt       DateTime     @default(now()) @map("updated_at")
  deletedAt       DateTime?    @map("deleted_at")

  authTokens      AuthToken[]
  addresses       CustomerAddress[]
  orders          Order[]
  complaintsFiled Complaint[]
  refreshTokens   RefreshToken[]

  @@index([email])
  @@map("customers")
}

/// v2.1: dipisah dari Customer. Mewakili SUPER_ADMIN, OUTLET_ADMIN,
/// WORKER, dan DRIVER. stationType DIHAPUS TOTAL dari model ini (worker
/// dinamis -- lihat BR-WRK-01 v2.1). workStatus tetap nullable
/// karena SUPER_ADMIN tidak memakainya.
model Employee {
  id              String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  role            Role
  name            String
  email           String        @unique
  passwordHash    String?       @map("password_hash")
  profilePhotoUrl String?       @map("profile_photo_url")
  phone           String?
  accountStatus   AccountStatus @map("account_status")
  workStatus      WorkStatus?   @map("work_status")
  currentOutletId String?       @map("current_outlet_id") @db.Uuid
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @default(now()) @map("updated_at")
  deletedAt       DateTime?     @map("deleted_at")

  currentOutlet Outlet? @relation("EmployeeCurrentOutlet", fields: [currentOutletId], references: [id])

  authTokens        AuthToken[]
  refreshTokens     RefreshToken[]
  ordersReceived    Order[]            @relation("OrderReceivedBy")
  driverTasks       DriverAssignment[] @relation("DriverAssignmentDriver")
  workerTasks       WorkerAssignment[]
  bypassRequested   BypassRequest[]    @relation("BypassRequestedBy")
  bypassDecided     BypassRequest[]    @relation("BypassDecidedBy")
  complaintsHandled Complaint[]        @relation("ComplaintHandledBy")
  attendances       Attendance[]

  @@index([role])
  @@index([role, currentOutletId])
  @@map("employees")
}

model AuthToken {
  id        String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  type      AuthTokenType
  tokenHash String        @map("token_hash")
  expiresAt DateTime      @map("expires_at")
  usedAt    DateTime?     @map("used_at")
  createdAt DateTime      @default(now()) @map("created_at")

  // v2.1: hanya salah satu dari customerId/employeeId yang diisi,
  // tergantung pemilik token. Divalidasi di level aplikasi (bukan di
  // level constraint database) karena Prisma tidak mendukung XOR check
  // native.
  customerId String? @map("customer_id") @db.Uuid
  employeeId String? @map("employee_id") @db.Uuid

  customer Customer? @relation(fields: [customerId], references: [id])
  employee Employee? @relation(fields: [employeeId], references: [id])

  @@index([customerId, type])
  @@index([employeeId, type])
  @@index([tokenHash])
  @@map("auth_tokens")
}

/// Refresh token — beda dari AuthToken (yang sekali pakai untuk
/// verifikasi/reset/invitation). RefreshToken dipakai BERKALI-KALI untuk
/// menerbitkan access token baru tanpa user login ulang, dan bisa dicabut
/// (revokedAt) kapan saja — misal saat logout.
///
/// Pola polymorphic sama seperti AuthToken: hanya salah satu dari
/// customerId/employeeId yang diisi, divalidasi di level aplikasi.
model RefreshToken {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  customerId String?   @map("customer_id") @db.Uuid
  employeeId String?   @map("employee_id") @db.Uuid
  tokenHash  String    @unique @map("token_hash")
  expiresAt  DateTime  @map("expires_at")
  revokedAt  DateTime? @map("revoked_at")
  createdAt  DateTime  @default(now()) @map("created_at")

  customer Customer? @relation(fields: [customerId], references: [id])
  employee Employee? @relation(fields: [employeeId], references: [id])

  @@index([customerId])
  @@index([employeeId])
  @@index([tokenHash])
  @@map("refresh_tokens")
}

// ============================================================
// OUTLETS & ADDRESSES
// ============================================================

model Outlet {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String
  address   String
  latitude  Decimal   @db.Decimal(10, 7)
  longitude Decimal   @db.Decimal(10, 7)
  isActive  Boolean   @default(true) @map("is_active")
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @default(now()) @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  staffOnDuty       Employee[]         @relation("EmployeeCurrentOutlet")
  orders            Order[]
  driverAssignments DriverAssignment[]
  workerAssignments WorkerAssignment[]
  attendances       Attendance[]

  @@map("outlets")
}

model CustomerAddress {
  id               String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  customerId       String    @map("customer_id") @db.Uuid
  label            String?
  provinceId       String    @map("province_id")
  provinceName     String    @map("province_name")
  cityId           String    @map("city_id")
  cityName         String    @map("city_name")
  districtId       String    @map("district_id")
  districtName     String    @map("district_name")
  subDistrictId    String    @map("sub_district_id")
  subDistrictName  String    @map("sub_district_name")
  zipCode          String    @map("zip_code")
  streetDetail     String    @map("street_detail")
  formattedAddress String    @map("formatted_address")
  latitude         Decimal   @db.Decimal(10, 7)
  longitude        Decimal   @db.Decimal(10, 7)
  phone            String
  isPrimary        Boolean   @default(false) @map("is_primary")
  createdAt        DateTime  @default(now()) @map("created_at")
  updatedAt        DateTime  @default(now()) @map("updated_at")
  deletedAt        DateTime? @map("deleted_at")

  customer Customer @relation(fields: [customerId], references: [id])

  @@index([customerId])
  @@map("customer_addresses")
}

// ============================================================
// PRICING
// ============================================================

/// Tidak ada versioning/soft-delete: harga di-update langsung (overwrite).
/// Konsistensi order lama dijamin oleh snapshot di Bill (pricePerKgSnapshot),
/// bukan oleh histori record di sini.
model LaundryPricing {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  pricePerKg Decimal   @map("price_per_kg") @db.Decimal(12, 2)
  deletedAt  DateTime? @map("deleted_at")
  createdAt  DateTime  @default(now()) @map("created_at")

  bills Bill[]

  @@map("laundry_pricings")
}

/// Sama seperti LaundryPricing -- di-update langsung tanpa histori multi-record.
model ShippingRate {
  id                String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  maxDistanceMeters Int       @map("max_distance_meters")
  price             Decimal   @db.Decimal(12, 2)
  deletedAt         DateTime? @map("deleted_at")
  createdAt         DateTime  @default(now()) @map("created_at")

  bills Bill[]

  @@map("shipping_rates")
}

model LaundryItem {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @default(now()) @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  orderItems OrderItem[]

  @@map("laundry_items")
}

// ============================================================
// ORDERS & BILLS
// ============================================================

model Order {
  id                   String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderCode            String  @unique @map("order_code")
  customerId           String  @map("customer_id") @db.Uuid
  outletId             String  @map("outlet_id") @db.Uuid
  addressSnapshot      String  @map("address_snapshot")
  addressPhoneSnapshot String  @map("address_phone_snapshot")
  addressLatitude      Decimal @map("address_latitude") @db.Decimal(10, 7)
  addressLongitude     Decimal @map("address_longitude") @db.Decimal(10, 7)
  distanceMeters       Decimal @map("distance_meters") @db.Decimal(10, 2)

  /// Tanggal pickup yang dipilih customer (existing).
  pickupDate DateTime @map("pickup_date") @db.Date

  /// v2.1 BARU. Jam pickup yang diminta customer, PADA HARI YANG SAMA
  /// dengan pickupDate (tidak ada pickup lintas hari). Dipakai oleh cron
  /// job untuk memindahkan status SCHEDULED -> WAITING_DRIVER_PICKUP,
  /// 30 menit sebelum jam ini. Lihat BR-PICKUP-04 (v2.1).
  pickupScheduledAt DateTime @map("pickup_scheduled_at")

  customerStatus CustomerStatus @map("customer_status")
  paidAt         DateTime?      @map("paid_at")
  receivedAt     DateTime?      @map("received_at")
  receivedBy     String?        @map("received_by") @db.Uuid
  completedAt    DateTime?      @map("completed_at")
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @default(now()) @map("updated_at")

  customer       Customer  @relation(fields: [customerId], references: [id])
  outlet         Outlet    @relation(fields: [outletId], references: [id])
  receivedByUser Employee? @relation("OrderReceivedBy", fields: [receivedBy], references: [id])

  bill              Bill?
  orderItems        OrderItem[]
  driverAssignments DriverAssignment[]
  workerAssignments WorkerAssignment[]
  bypassRequests    BypassRequest[]
  complaint         Complaint?

  @@index([customerId])
  @@index([outletId])
  @@index([customerStatus])
  @@index([pickupDate])
  @@index([pickupScheduledAt])
  @@map("orders")
}

/// Tagihan per order (1-1).
///
/// pricePerKgSnapshot & shippingFeeSnapshot adalah SATU-SATUNYA sumber
/// kebenaran harga untuk order yang sudah berjalan.
///
/// v2.1: createdAt pada model ini adalah acuan waktu untuk DUA mekanisme:
/// 1. Notifikasi "tagihan menunggu pembayaran" dikirim SEKALI, tepat saat
///    baris Bill ini dibuat (BR-ORDER-02).
/// 2. Cron job OVERDUE menghitung 7 hari sejak createdAt ini untuk
///    memutuskan kapan Order.customerStatus dipindah ke OVERDUE
///    (BR-PAY-04). TIDAK ADA kolom tambahan untuk overdue -- cukup
///    dihitung dari createdAt + paymentStatus setiap cron berjalan.
model Bill {
  id                  String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId             String            @unique @map("order_id") @db.Uuid
  laundryPricingId    String            @map("laundry_pricing_id") @db.Uuid
  pricePerKgSnapshot  Decimal           @map("price_per_kg_snapshot") @db.Decimal(12, 2)
  shippingRateId      String            @map("shipping_rate_id") @db.Uuid
  shippingFeeSnapshot Decimal           @map("shipping_fee_snapshot") @db.Decimal(12, 2)
  weightKg            Decimal           @map("weight_kg") @db.Decimal(10, 2)
  totalAmount         Decimal           @map("total_amount") @db.Decimal(12, 2)
  paymentStatus       BillPaymentStatus @default(UNPAID) @map("payment_status")
  paidAt              DateTime?         @map("paid_at")
  expiresAt           DateTime?         @map("expires_at")
  createdAt           DateTime          @default(now()) @map("created_at")
  updatedAt           DateTime          @default(now()) @map("updated_at")

  order          Order          @relation(fields: [orderId], references: [id])
  laundryPricing LaundryPricing @relation(fields: [laundryPricingId], references: [id])
  shippingRate   ShippingRate   @relation(fields: [shippingRateId], references: [id])

  payments Payment[]

  @@index([orderId])
  @@index([paymentStatus])
  @@index([createdAt])
  @@map("bills")
}

model OrderItem {
  id            String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId       String @map("order_id") @db.Uuid
  laundryItemId String @map("laundry_item_id") @db.Uuid
  quantity      Int

  order       Order       @relation(fields: [orderId], references: [id])
  laundryItem LaundryItem @relation(fields: [laundryItemId], references: [id])

  @@map("order_items")
}

// ============================================================
// DRIVER & WORKER ASSIGNMENTS (v2.1: manual claim, bukan FIFO otomatis)
// ============================================================

/// v2.1: queuedAt DIHAPUS. Job selalu dibuat langsung berstatus QUEUED
/// (tidak pernah ada state sebelumnya), sehingga queuedAt selalu identik
/// dengan createdAt -- kolom duplikat tanpa nilai tambah. Urutan tampilan
/// daftar tugas tersedia memakai createdAt. Assignment TIDAK LAGI otomatis
/// (FIFO dihapus) -- Driver memilih sendiri job dari daftar QUEUED di
/// outletnya. Lihat BR-DRV-01 (v2.1).
model DriverAssignment {
  id          String                 @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId     String                 @map("order_id") @db.Uuid
  driverId    String?                @map("driver_id") @db.Uuid
  outletId    String                 @map("outlet_id") @db.Uuid
  taskType    PickupDeliveryType     @map("task_type")
  assignedAt  DateTime?              @map("assigned_at")
  pickedUpAt  DateTime?              @map("picked_up_at")
  deliveredAt DateTime?              @map("delivered_at")
  completedAt DateTime?              @map("completed_at")
  status      DriverAssignmentStatus
  createdAt   DateTime               @default(now()) @map("created_at")
  updatedAt   DateTime               @default(now()) @map("updated_at")

  order  Order     @relation(fields: [orderId], references: [id])
  driver Employee? @relation("DriverAssignmentDriver", fields: [driverId], references: [id])
  outlet Outlet    @relation(fields: [outletId], references: [id])

  @@unique([orderId, taskType])
  @@index([outletId, status])
  @@index([driverId])
  @@index([orderId])
  @@map("driver_assignments")
}

/// v2.1: queuedAt DIHAPUS (alasan sama seperti DriverAssignment, lihat
/// komentar di atas). stationType TETAP ADA di model ini -- ini justru
/// menjadi SATU-SATUNYA sumber kebenaran "job ini station apa", karena
/// Employee/Worker tidak lagi punya stationType permanen (worker
/// dinamis). Assignment TIDAK LAGI otomatis per station -- Worker melihat
/// SEMUA job QUEUED lintas station pada outletnya dan memilih sendiri.
/// Lihat BR-WRK-01 (v2.1).
model WorkerAssignment {
  id          String                 @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId     String                 @map("order_id") @db.Uuid
  workerId    String?                @map("worker_id") @db.Uuid
  outletId    String                 @map("outlet_id") @db.Uuid
  stationType StationType            @map("station_type")
  attempt     Int                    @default(0)
  assignedAt  DateTime?              @map("assigned_at")
  startedAt   DateTime?              @map("started_at")
  completedAt DateTime?              @map("completed_at")
  status      WorkerAssignmentStatus
  createdAt   DateTime               @default(now()) @map("created_at")
  updatedAt   DateTime               @default(now()) @map("updated_at")

  order  Order     @relation(fields: [orderId], references: [id])
  worker Employee? @relation(fields: [workerId], references: [id])
  outlet Outlet    @relation(fields: [outletId], references: [id])

  bypassRequests BypassRequest[]

  @@unique([orderId, stationType])
  @@index([outletId, status])
  @@index([workerId])
  @@index([orderId])
  @@map("worker_assignments")
}

model BypassRequest {
  id                 String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId            String       @map("order_id") @db.Uuid
  workerAssignmentId String       @map("worker_assignment_id") @db.Uuid
  stationType        StationType  @map("station_type")
  requestedBy        String       @map("requested_by") @db.Uuid
  quantityDiffJson   String?      @map("quantity_diff_json")
  status             BypassStatus @default(PENDING)
  decidedBy          String?      @map("decided_by") @db.Uuid
  decidedAt          DateTime?    @map("decided_at")
  approvalNote       String?      @map("approval_note")
  createdAt          DateTime     @default(now()) @map("created_at")

  order            Order            @relation(fields: [orderId], references: [id])
  workerAssignment WorkerAssignment @relation(fields: [workerAssignmentId], references: [id])
  requestedByUser  Employee         @relation("BypassRequestedBy", fields: [requestedBy], references: [id])
  decidedByUser    Employee?        @relation("BypassDecidedBy", fields: [decidedBy], references: [id])

  @@index([orderId])
  @@index([status])
  @@map("bypass_requests")
}

// ============================================================
// PAYMENTS
// ============================================================

/// gatewayOrderId = order_id unik yang KITA generate & kirim ke Midtrans
/// tiap attempt (wajib unik per attempt, Midtrans menolak reuse).
/// midtransTransactionId = transaction_id yang DIBALIKIN Midtrans.
///
/// Status pembayaran diperbarui dari callback Midtrans yang telah diverifikasi.
/// Setiap callback disimpan pada PaymentWebhook. Perubahan state Payment dan Bill
/// wajib idempotent agar callback berulang tidak memproses pembayaran dua kali.
///
/// v2.1: webhook WAJIB menolak proses jika Order.customerStatus == OVERDUE.
/// Lihat BR-PAY-04.
model Payment {
  id                    String                   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  billId                String                   @map("bill_id") @db.Uuid
  gatewayOrderId        String                   @unique @map("gateway_order_id")
  midtransTransactionId String?                  @unique @map("midtrans_transaction_id")
  redirectUrl           String?
  amount                Decimal                  @db.Decimal(12, 2)
  status                PaymentTransactionStatus
  isFinal               Boolean                  @default(false) @map("is_final")
  paidAt                DateTime?                @map("paid_at")
  createdAt             DateTime                 @default(now()) @map("created_at")
  updatedAt             DateTime                 @default(now()) @map("updated_at")

  bill     Bill             @relation(fields: [billId], references: [id])
  webhooks PaymentWebhook[]

  @@index([billId])
  @@index([status])
  @@map("payments")
}

model PaymentWebhook {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  paymentId  String   @map("payment_id") @db.Uuid
  eventType  String?  @map("event_type")
  rawPayload String   @map("raw_payload")
  signature  String?
  isValid    Boolean  @default(false) @map("is_valid")
  receivedAt DateTime @default(now()) @map("received_at")

  payment Payment @relation(fields: [paymentId], references: [id])

  @@index([paymentId])
  @@map("payment_webhooks")
}

// ============================================================
// COMPLAINTS, ATTENDANCE
// ============================================================

model Complaint {
  id            String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId       String            @unique @map("order_id") @db.Uuid
  customerId    String            @map("customer_id") @db.Uuid
  category      ComplaintCategory
  description   String
  proofPhotoUrl String            @map("proof_photo_url")
  status        ComplaintStatus   @default(OPEN)
  handledBy     String?           @map("handled_by") @db.Uuid
  responseNote  String?           @map("response_note")
  decidedAt     DateTime?         @map("decided_at")
  createdAt     DateTime          @default(now()) @map("created_at")

  order         Order     @relation(fields: [orderId], references: [id])
  customer      Customer  @relation(fields: [customerId], references: [id])
  handledByUser Employee? @relation("ComplaintHandledBy", fields: [handledBy], references: [id])

  @@map("complaints")
}

/// role dihapus -- diambil lewat relasi ke Employee.role, tidak perlu
/// disimpan ulang di sini. Customer tidak memiliki Attendance.
model Attendance {
  id             String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  employeeId     String    @map("employee_id") @db.Uuid
  outletId       String    @map("outlet_id") @db.Uuid
  attendanceDate DateTime  @map("attendance_date") @db.Date
  clockInAt      DateTime? @map("clock_in_at")
  clockOutAt     DateTime? @map("clock_out_at")
  createdAt      DateTime  @default(now()) @map("created_at")

  employee Employee @relation(fields: [employeeId], references: [id])
  outlet   Outlet   @relation(fields: [outletId], references: [id])

  @@unique([employeeId, attendanceDate])
  @@index([outletId])
  @@map("attendances")
}
```

## File: src/routes/index.ts
```typescript
import { Router } from "express";
import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import addressCustomerRoutes from "../features/addressCustomer/address.routes";
import orderCustomerRoutes from "../features/orderCustomer/order.routes";
import regionAddressRoutes from "../features/region/region.routes";
import payementRoutes from "../features/paymentCustomer/payments.routes";
import { Role } from "../../generated/prisma";
import employeeRoutes from "../features/employee/employee.route";
import outletRoutes from "../features/outlet/outlet.route";
import laundryItemRoutes from "../features/laundry-item/laundry-item.route";
import pricingRoutes from "../features/pricing/pricing.route";
import orderRoutes from "../features/order/order.route"
import bypassRoutes from "../features/bypass/bypass.route"
import customerRoutes from "../features/customer/customer.route"
import complaintRoutes from "../features/complaint/complaint.route"
import reportRoutes from "../features/report/report.route";
import dashboardRoutes from "../features/dashboard/dashboard.route"

const router = Router();

router.use("/auth", authCustomerRoutes);
router.use("/auth/employee", authEmployeRoutes);
router.use("/profile", AuthMiddleware.authenticated(), profileCustomerRoutes);
router.use(
  "/address",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  addressCustomerRoutes,
);
router.use("/internal/employees", employeeRoutes);
router.use("/internal/outlets", outletRoutes);
router.use("/internal/laundry-items", laundryItemRoutes);
router.use("/internal/pricing", pricingRoutes);
router.use("/internal/orders", orderRoutes)
router.use("/internal/bypass-requests", bypassRoutes)
router.use("/internal/customers", customerRoutes)
router.use("/internal/complaints", complaintRoutes)
router.use("/internal/reports", reportRoutes)
router.use("/internal/dashboard", dashboardRoutes)

router.use(
  "/order",
  orderCustomerRoutes,
  payementRoutes,
);
router.use("/regions", AuthMiddleware.authenticated(), regionAddressRoutes);
export default router;
```
