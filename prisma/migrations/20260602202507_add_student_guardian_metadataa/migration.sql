/*
  Warnings:

  - You are about to drop the `_DocumentToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DocumentToStudent" DROP CONSTRAINT "_DocumentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentToStudent" DROP CONSTRAINT "_DocumentToStudent_B_fkey";

-- DropTable
DROP TABLE "_DocumentToStudent";
