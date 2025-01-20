/*
  Warnings:

  - Made the column `zapName` on table `Zap` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Zap" ALTER COLUMN "zapName" SET NOT NULL;
