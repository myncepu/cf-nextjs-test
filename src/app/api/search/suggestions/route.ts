import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await db
    .select()
    .from(games)
    .where(
      sql`(
        title LIKE '%' || ${query} || '%' OR 
        description LIKE '%' || ${query} || '%'
      )`
    )
    .orderBy(sql`created_at DESC`)
    .limit(5)
    .all();

  return NextResponse.json(results);
}
