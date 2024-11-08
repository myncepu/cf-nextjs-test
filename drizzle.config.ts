import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function findSQLiteFile(dir: string): string | null {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && file.endsWith('.sqlite')) {
      return fullPath;
    }
    
    if (stat.isDirectory()) {
      const found = findSQLiteFile(fullPath);
      if (found) return found;
    }
  }
  
  return null;
}

function getLocalD1DB() {
  try {
    const wranglerDir = path.resolve('.wrangler');
    const dbPath = findSQLiteFile(wranglerDir);

    if (!dbPath) {
      throw new Error('找不到 .sqlite 文件在 .wrangler 目录下');
    }

    console.log('找到 SQLite 文件:', dbPath);
    return dbPath;
  } catch (err) {
    console.error('查找 SQLite 文件时出错:', err);
  }
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  ...(process.env.NODE_ENV === "production"
    ? {
      driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
        databaseId: process.env.DATABASE_ID,
        token: process.env.CLOUDFLARE_D1_API_TOKEN,
      },
    }
    : {
      dbCredentials: {
        url: getLocalD1DB(),
      },
    }),
});