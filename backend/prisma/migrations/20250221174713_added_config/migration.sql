/*
  Warnings:

  - You are about to drop the column `config` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `config` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "config";

-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "config" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableTrigger" ADD COLUMN     "config" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "config";
