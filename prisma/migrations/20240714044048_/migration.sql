-- CreateTable
CREATE TABLE "AdsensePayment" (
    "userId" TEXT NOT NULL,
    "paid" TEXT[],

    CONSTRAINT "AdsensePayment_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "AdsensePayment_userId_idx" ON "AdsensePayment"("userId");
