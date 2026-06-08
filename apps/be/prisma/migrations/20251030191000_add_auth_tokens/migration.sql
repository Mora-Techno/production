-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
ALTER TABLE "User" ADD COLUMN "refreshToken" TEXT;
ALTER TABLE "User" ADD COLUMN "refreshTokenExpiresAt" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "magicLinkToken" TEXT;
ALTER TABLE "User" ADD COLUMN "magicLinkExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
