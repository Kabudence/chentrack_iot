-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMPERATURE', 'GAS', 'PRESSURE', 'LEVEL', 'MOTION', 'FATIGUE', 'GPS');

-- CreateEnum
CREATE TYPE "StatusAvailability" AS ENUM ('AVAILABLE', 'NOTAVAILABLE');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'PAUSED', 'FINISHED', 'CANCELLED', 'INCIDENT');

-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('NORMAL', 'ANOMALOUS', 'CRITICAL');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ALERT', 'INFO');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'ACKNOWLEDGED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "emergencyPhone" TEXT,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "license" TEXT NOT NULL,
    "availability" "StatusAvailability" NOT NULL DEFAULT 'AVAILABLE',
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "socialName" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" DOUBLE PRECISION NOT NULL,
    "state" "StatusAvailability" NOT NULL DEFAULT 'AVAILABLE',
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SensorType" NOT NULL,
    "unidad" TEXT,
    "precision" DOUBLE PRECISION,
    "rangeMin" DOUBLE PRECISION,
    "rangeMax" DOUBLE PRECISION,
    "typeGas" TEXT,
    "threshold" DOUBLE PRECISION,
    "sensitivity" DOUBLE PRECISION,
    "metodoMed" TEXT,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "alt" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "lastSeenAt" TIMESTAMP(3),
    "ownerType" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'ACTIVE',
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "dateRequest" TIMESTAMP(3) NOT NULL,
    "dateStart" TIMESTAMP(3),
    "dateEnd" TIMESTAMP(3),
    "productType" TEXT NOT NULL,
    "productQty" DOUBLE PRECISION NOT NULL,
    "productUnit" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sensorId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "RecordStatus" NOT NULL,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    "recordId" INTEGER,
    "serviceId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_dni_key" ON "Profile"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_profileId_key" ON "Driver"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ruc_key" ON "Company"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Company_profileId_key" ON "Company"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_plate_key" ON "Car"("plate");

-- CreateIndex
CREATE INDEX "Sensor_ownerType_ownerId_idx" ON "Sensor"("ownerType", "ownerId");

-- CreateIndex
CREATE INDEX "Record_serviceId_timestamp_idx" ON "Record"("serviceId", "timestamp");

-- CreateIndex
CREATE INDEX "Record_sensorId_timestamp_idx" ON "Record"("sensorId", "timestamp");

-- CreateIndex
CREATE INDEX "Notification_serviceId_idx" ON "Notification"("serviceId");

-- CreateIndex
CREATE INDEX "Notification_recordId_idx" ON "Notification"("recordId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
