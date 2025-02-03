-- AlterTable
ALTER TABLE "Zap" ALTER COLUMN "availableTriggerId" DROP NOT NULL,
ALTER COLUMN "zapName" DROP NOT NULL,
ALTER COLUMN "zapName" SET DEFAULT 'Untitled Zap';
