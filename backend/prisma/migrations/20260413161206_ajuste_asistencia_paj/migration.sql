/*
  Warnings:

  - You are about to drop the column `presente` on the `Asistencia` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoAsistencia" AS ENUM ('P', 'A', 'J');

-- AlterTable
ALTER TABLE "Asistencia" DROP COLUMN "presente",
ADD COLUMN     "cerrado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "comentario" TEXT,
ADD COLUMN     "estado" "EstadoAsistencia" NOT NULL DEFAULT 'P';
