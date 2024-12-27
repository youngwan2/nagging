-- DropIndex
DROP INDEX "NotificationReports_userId_idx";

-- CreateIndex
CREATE INDEX "NotificationReports_userId_reportId_idx" ON "NotificationReports"("userId", "reportId");
