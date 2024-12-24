-- AddForeignKey
ALTER TABLE "AdsensePayment" ADD CONSTRAINT "AdsensePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
