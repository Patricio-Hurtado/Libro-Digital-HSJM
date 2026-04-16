/*
  Warnings:

  - The values [TUTOR,ABUELO] on the enum `Parentesco` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Parentesco_new" AS ENUM ('MADRE', 'PADRE', 'ABUELA_O', 'TIA_O', 'HERMANA_O', 'OTRO');
ALTER TABLE "EstudianteApoderado" ALTER COLUMN "parentesco" TYPE "Parentesco_new" USING ("parentesco"::text::"Parentesco_new");
ALTER TYPE "Parentesco" RENAME TO "Parentesco_old";
ALTER TYPE "Parentesco_new" RENAME TO "Parentesco";
DROP TYPE "public"."Parentesco_old";
COMMIT;
