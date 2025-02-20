/*
  Warnings:

  - You are about to drop the column `connectionId` on the `Zap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_connectionId_fkey";

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "connectionId";
