/*
  Warnings:

  - You are about to drop the column `alergias` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `comuna` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `emailApoderado` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `nombreApoderado` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `parentesco` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `restriccionesAliment` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `rutApoderado` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `tipoSangre` on the `Estudiante` table. All the data in the column will be lost.
  - The `estado` column on the `Estudiante` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `comunaId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexoId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoSangreId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoApoderado" AS ENUM ('TITULAR', 'SUPLENTE');

-- CreateEnum
CREATE TYPE "Parentesco" AS ENUM ('MADRE', 'PADRE', 'TUTOR', 'ABUELO', 'OTRO');

-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "alergias",
DROP COLUMN "comuna",
DROP COLUMN "emailApoderado",
DROP COLUMN "nivel",
DROP COLUMN "nombreApoderado",
DROP COLUMN "parentesco",
DROP COLUMN "restriccionesAliment",
DROP COLUMN "rutApoderado",
DROP COLUMN "sexo",
DROP COLUMN "telefono",
DROP COLUMN "tipoSangre",
ADD COLUMN     "comunaId" TEXT NOT NULL,
ADD COLUMN     "nivelId" TEXT NOT NULL,
ADD COLUMN     "restriccionesAlimentarias" TEXT,
ADD COLUMN     "sexoId" TEXT NOT NULL,
ADD COLUMN     "tipoSangreId" TEXT NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Estado";

-- DropEnum
DROP TYPE "Nivel";

-- CreateTable
CREATE TABLE "Apoderado" (
    "id" TEXT NOT NULL,
    "nombreApoderado" TEXT NOT NULL,
    "rutApoderado" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "emailApoderado" TEXT NOT NULL,

    CONSTRAINT "Apoderado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstudianteApoderado" (
    "id" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "apoderadoId" TEXT NOT NULL,
    "tipoApoderado" "TipoApoderado" NOT NULL,
    "parentesco" "Parentesco" NOT NULL,
    "prioridad" INTEGER NOT NULL,

    CONSTRAINT "EstudianteApoderado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoSanguineo" (
    "id" TEXT NOT NULL,
    "grupo" TEXT NOT NULL,

    CONSTRAINT "GrupoSanguineo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comuna" (
    "id" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,

    CONSTRAINT "Comuna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nivel" (
    "id" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sexo" (
    "id" TEXT NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Sexo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apoderado_rutApoderado_key" ON "Apoderado"("rutApoderado");

-- CreateIndex
CREATE UNIQUE INDEX "EstudianteApoderado_estudianteId_prioridad_key" ON "EstudianteApoderado"("estudianteId", "prioridad");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_tipoSangreId_fkey" FOREIGN KEY ("tipoSangreId") REFERENCES "GrupoSanguineo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_comunaId_fkey" FOREIGN KEY ("comunaId") REFERENCES "Comuna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "Sexo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteApoderado" ADD CONSTRAINT "EstudianteApoderado_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteApoderado" ADD CONSTRAINT "EstudianteApoderado_apoderadoId_fkey" FOREIGN KEY ("apoderadoId") REFERENCES "Apoderado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
