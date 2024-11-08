import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const games = sqliteTable("games", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  gameUrl: text("game_url").notNull(),
  category: text("category"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => sql`unixepoch('now') * 1000`),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => sql`unixepoch('now') * 1000`),
});