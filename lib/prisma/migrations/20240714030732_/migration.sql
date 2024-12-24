/*
  Warnings:

  - The primary key for the `AdsenseAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AdsenseAccount" DROP CONSTRAINT "AdsenseAccount_pkey",
ALTER COLUMN "accountId" DROP NOT NULL,
ADD CONSTRAINT "AdsenseAccount_pkey" PRIMARY KEY ("userId");
