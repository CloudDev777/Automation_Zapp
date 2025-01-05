/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Connect` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Connect" DROP COLUMN "triggerId",
ADD COLUMN     "availableTriggerId" TEXT;

-- AddForeignKey
ALTER TABLE "Connect" ADD CONSTRAINT "Connect_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
