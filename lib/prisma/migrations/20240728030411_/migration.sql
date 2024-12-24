-- CreateTable
CREATE TABLE "NotificationReports" (
    "userId" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationReports_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "NotificationReports_userId_idx" ON "NotificationReports"("userId");

-- AddForeignKey
ALTER TABLE "NotificationReports" ADD CONSTRAINT "NotificationReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
