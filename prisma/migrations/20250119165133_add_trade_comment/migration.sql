-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "points" INTEGER NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "listId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trades_listId_fkey" FOREIGN KEY ("listId") REFERENCES "trade_lists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_trades" ("createdAt", "id", "listId", "points") SELECT "createdAt", "id", "listId", "points" FROM "trades";
DROP TABLE "trades";
ALTER TABLE "new_trades" RENAME TO "trades";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
