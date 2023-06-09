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
    "current_cycle" TEXT NOT NULL,
    "current_term" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceData_pkey" PRIMARY KEY ("id")
);
