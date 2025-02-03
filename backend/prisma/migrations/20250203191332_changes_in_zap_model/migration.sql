/*
  Warnings:

  - You are about to drop the column `isActive` on the `Zap` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ZapStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PAUSED', 'ERROR');

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "isActive",
ADD COLUMN     "status" "ZapStatus" NOT NULL DEFAULT 'DRAFT';
