-- CreateTable
CREATE TABLE "AdsenseAccount" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AdsenseAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdsenseAccount_userId_idx" ON "AdsenseAccount"("userId");

-- AddForeignKey
ALTER TABLE "AdsenseAccount" ADD CONSTRAINT "AdsenseAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
