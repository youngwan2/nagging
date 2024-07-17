-- DropForeignKey
ALTER TABLE "AdsenseAccount" DROP CONSTRAINT "AdsenseAccount_userId_fkey";

-- AddForeignKey
ALTER TABLE "AdsenseAccount" ADD CONSTRAINT "AdsenseAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
