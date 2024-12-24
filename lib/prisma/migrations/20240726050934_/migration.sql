/*
  Warnings:

  - Added the required column `cronFunction` to the `NotificationCron` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationCron" ADD COLUMN     "cronFunction" TEXT NOT NULL;
