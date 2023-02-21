/*
  Warnings:

  - You are about to drop the `device_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "device_data";

-- CreateTable
CREATE TABLE "DeviceData" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "current_temperature" DOUBLE PRECISION NOT NULL,
    "resistance_state" BOOLEAN NOT NULL,
    "pump_state" BOOLEAN NOT NULL,
    "pump_on_time_total" INTEGER NOT NULL,
    "resistance_on_time_total" INTEGER NOT NULL,
    "pump_kwh" DOUBLE PRECISION NOT NULL,
    "resistance_kwh" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceData_pkey" PRIMARY KEY ("id")
);
