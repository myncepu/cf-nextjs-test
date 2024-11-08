import { sql } from "drizzle-orm";
import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { GamesGrid } from "@/components/games/games-grid";

export const runtime = "edge";

export default async function Page() {
  const gamesList = await db
    .select()
    .from(games)
    .orderBy(sql`created_at DESC`)
    .limit(12);
  
  return (
    <div className="py-8 md:py-10">
      <div className="space-y-2 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Popular Games</h1>
        <p className="text-muted-foreground">
          精选热门游戏推荐
        </p>
      </div>
      <GamesGrid games={gamesList} />
    </div>
  );
}
