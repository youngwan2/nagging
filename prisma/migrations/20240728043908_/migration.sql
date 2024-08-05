/*
  Warnings:

  - The primary key for the `NotificationReports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `reportId` to the `NotificationReports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationReports" DROP CONSTRAINT "NotificationReports_pkey",
ADD COLUMN     "reportId" INTEGER NOT NULL,
ADD CONSTRAINT "NotificationReports_pkey" PRIMARY KEY ("reportId");
