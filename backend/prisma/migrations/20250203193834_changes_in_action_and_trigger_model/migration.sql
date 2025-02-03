/*
  Warnings:

  - Added the required column `actionKey` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `config` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `config` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerKey` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "actionKey" TEXT NOT NULL,
ADD COLUMN     "config" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "config" JSONB NOT NULL,
ADD COLUMN     "triggerKey" TEXT NOT NULL;
