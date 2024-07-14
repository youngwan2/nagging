/*
  Warnings:

  - The primary key for the `AdsenseAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AdsenseAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdsenseAccount" DROP CONSTRAINT "AdsenseAccount_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AdsenseAccount_pkey" PRIMARY KEY ("accountId");
