-- AlterTable
ALTER TABLE "StudentGuardian" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "isEmergency" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relationship" TEXT;
