/*
  Warnings:

  - You are about to drop the column `nacionalidad` on the `Estudiante` table. All the data in the column will be lost.
  - Added the required column `nacionalidadId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "nacionalidad",
ADD COLUMN     "nacionalidadId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Nacionalidad" (
    "id" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,

    CONSTRAINT "Nacionalidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES "Nacionalidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
