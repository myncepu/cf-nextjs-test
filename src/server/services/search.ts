import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import type { Game } from "@/types";

export async function searchGames(query: string): Promise<Game[]> {
  if (!query) return [];
  
  return db
    .select()
    .from(games)
    .where(
      sql`(
        title LIKE '%' || ${query} || '%' OR 
        description LIKE '%' || ${query} || '%'
      )`
    )
    .orderBy(sql`created_at DESC`)
    .all();
}
