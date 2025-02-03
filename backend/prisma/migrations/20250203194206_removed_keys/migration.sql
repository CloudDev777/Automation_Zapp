/*
  Warnings:

  - You are about to drop the column `actionKey` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `triggerKey` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "actionKey";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "triggerKey";
