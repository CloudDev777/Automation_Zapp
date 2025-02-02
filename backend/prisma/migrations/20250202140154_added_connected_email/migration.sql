/*
  Warnings:

  - Added the required column `connectedEmail` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "connectedEmail" TEXT NOT NULL;
