/*
  Warnings:

  - You are about to drop the column `enfermedades` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `medicamentos` on the `Estudiante` table. All the data in the column will be lost.
  - Added the required column `nivel` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentesco` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Made the column `direccion` on table `Estudiante` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('SALA_CUNA_MENOR', 'SALA_CUNA_MAYOR', 'NIVEL_MEDIO_MENOR', 'NIVEL_MEDIO_MAYOR');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('VIGENTE', 'RETIRADO');

-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "enfermedades",
DROP COLUMN "medicamentos",
ADD COLUMN     "comuna" TEXT NOT NULL DEFAULT 'Melipilla',
ADD COLUMN     "estado" "Estado" NOT NULL DEFAULT 'VIGENTE',
ADD COLUMN     "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nacionalidad" TEXT NOT NULL DEFAULT 'Chilena',
ADD COLUMN     "nivel" "Nivel" NOT NULL,
ADD COLUMN     "parentesco" TEXT NOT NULL,
ADD COLUMN     "prevision" TEXT,
ADD COLUMN     "restriccionesAliment" TEXT,
ADD COLUMN     "sexo" TEXT NOT NULL,
ADD COLUMN     "vacunasAlDia" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "direccion" SET NOT NULL;
