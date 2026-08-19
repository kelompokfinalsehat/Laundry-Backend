/*
  Warnings:

  - A unique constraint covering the columns `[order_id,task_type]` on the table `driver_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "driver_assignments_order_id_task_type_key" ON "driver_assignments"("order_id", "task_type");
