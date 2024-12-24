/*
  Warnings:

  - Added the required column `task` to the `NotificationCron` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationCron" ADD COLUMN     "task" TEXT NOT NULL;
