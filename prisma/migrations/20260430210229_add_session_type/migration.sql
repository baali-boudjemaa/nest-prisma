/*
  Warnings:

  - Added the required column `sessionname` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionName" AS ENUM ('Matinée', 'Journée_Complète', 'Périscolaire');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "sessionname" "SessionName" NOT NULL;
