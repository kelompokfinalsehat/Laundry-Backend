/*
  Warnings:

  - A unique constraint covering the columns `[order_id,station_type]` on the table `worker_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "worker_assignments_order_id_station_type_key" ON "worker_assignments"("order_id", "station_type");
