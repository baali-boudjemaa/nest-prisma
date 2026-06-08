/*
  Warnings:

  - Added the required column `type` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassroomType" AS ENUM ('NURSERY', 'SCHOOL');

-- DropForeignKey
ALTER TABLE "EmployeeClassroom" DROP CONSTRAINT "EmployeeClassroom_classId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "type" "ClassroomType" NOT NULL;
