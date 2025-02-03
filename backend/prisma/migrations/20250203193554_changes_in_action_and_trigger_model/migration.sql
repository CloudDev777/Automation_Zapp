/*
  Warnings:

  - Added the required column `appId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "appId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "appId" TEXT NOT NULL;
