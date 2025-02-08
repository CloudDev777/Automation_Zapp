/*
  Warnings:

  - A unique constraint covering the columns `[zapId,actionId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Action_zapId_actionId_key" ON "Action"("zapId", "actionId");
