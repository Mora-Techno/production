-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('leader', 'admin', 'employee');
CREATE TYPE "SubscriptionTier" AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE "BillingCycle" AS ENUM ('monthly');
CREATE TYPE "WorkstationMemberRole" AS ENUM ('admin', 'member');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'free',
    "billingCycle" "BillingCycle" NOT NULL DEFAULT 'monthly',
    "subscriptionStartsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionEndsAt" TIMESTAMP(3),
    "leaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workstations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstation_members" (
    "id" TEXT NOT NULL,
    "workstationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkstationMemberRole" NOT NULL DEFAULT 'member',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workstation_members_pkey" PRIMARY KEY ("id")
);

-- AlterTable: migrate User.role -> companyRole
ALTER TABLE "User" ADD COLUMN "companyRole" "CompanyRole" NOT NULL DEFAULT 'employee';
ALTER TABLE "User" ADD COLUMN "companyId" TEXT;

UPDATE "User" SET "companyRole" = 'employee' WHERE "role" = 'user';
UPDATE "User" SET "companyRole" = 'admin' WHERE "role" = 'admin';

ALTER TABLE "User" DROP COLUMN "role";

-- CreateIndex
CREATE UNIQUE INDEX "companies_leaderId_key" ON "companies"("leaderId");
CREATE UNIQUE INDEX "workstation_members_workstationId_userId_key" ON "workstation_members"("workstationId", "userId");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "workstation_members" ADD CONSTRAINT "workstation_members_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "workstations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workstation_members" ADD CONSTRAINT "workstation_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
