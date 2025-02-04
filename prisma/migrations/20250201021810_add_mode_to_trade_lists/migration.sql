-- AlterTable
ALTER TABLE "trade_lists" ADD COLUMN "mode" TEXT NOT NULL DEFAULT 'normal';
ALTER TABLE "trade_lists" ADD COLUMN "updatedAt" DATETIME;
UPDATE "trade_lists" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;