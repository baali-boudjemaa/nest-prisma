/*
  Warnings:

  - You are about to drop the `StudentDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentDocument" DROP CONSTRAINT "StudentDocument_studentId_fkey";

-- DropTable
DROP TABLE "StudentDocument";

-- CreateTable
CREATE TABLE "_DocumentToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DocumentToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DocumentToStudent_B_index" ON "_DocumentToStudent"("B");

-- AddForeignKey
ALTER TABLE "_DocumentToStudent" ADD CONSTRAINT "_DocumentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToStudent" ADD CONSTRAINT "_DocumentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
