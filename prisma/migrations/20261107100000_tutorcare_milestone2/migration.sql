-- Migration: TutorCare Milestone 2 (Tutor & Booking Entities)

-- CreateEnum
CREATE TYPE "ModaBelajar" AS ENUM ('Online', 'Offline', 'Hybrid');

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "mataPelajaran" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL DEFAULT 'SMP & SMA',
    "moda" "ModaBelajar" NOT NULL DEFAULT 'Hybrid',
    "tarifPerJam" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "pengalamanTahun" INTEGER NOT NULL DEFAULT 3,
    "avatarUrl" TEXT,
    "bio" TEXT NOT NULL,
    "kontakWa" TEXT NOT NULL DEFAULT '081234567890',
    "tersedia" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "kodeBooking" TEXT NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "namaSiswa" TEXT NOT NULL,
    "kontakSiswa" TEXT NOT NULL,
    "jenjangSiswa" TEXT NOT NULL DEFAULT 'SMA',
    "tanggalSesi" TIMESTAMP(3) NOT NULL,
    "durasiJam" INTEGER NOT NULL DEFAULT 2,
    "catatan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Menunggu Konfirmasi',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_kodeBooking_key" ON "Booking"("kodeBooking");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
