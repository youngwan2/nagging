/*
  Warnings:

  - Added the required column `reportId` to the `NotificationCron` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NotificationCron_userId_idx";

-- AlterTable
ALTER TABLE "NotificationCron" ADD COLUMN     "reportId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "NotificationCron_userId_reportId_idx" ON "NotificationCron"("userId", "reportId");

-- AddForeignKey
ALTER TABLE "NotificationCron" ADD CONSTRAINT "NotificationCron_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "NotificationReports"("reportId") ON DELETE NO ACTION ON UPDATE CASCADE;
