-- CreateTable
CREATE TABLE "NotificationCron" (
    "userId" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,

    CONSTRAINT "NotificationCron_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "NotificationCron_userId_idx" ON "NotificationCron"("userId");

-- AddForeignKey
ALTER TABLE "NotificationCron" ADD CONSTRAINT "NotificationCron_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
