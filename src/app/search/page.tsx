import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { GamesGrid } from "@/components/games/games-grid";
import { sql } from "drizzle-orm";

export const runtime = "edge";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = searchParams;
  
  const searchResults = query
    ? await db
      .select()
      .from(games)
      .where(
        sql`(
            title LIKE '%' || ${query} || '%' OR 
            description LIKE '%' || ${query} || '%'
          )`
      )
      .orderBy(sql`created_at DESC`)
      .all()
    : [];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">搜索结果</h1>
        {query ? (
          <p className="text-muted-foreground">
            找到 {searchResults.length} 个结果：&ldquo;{query}&rdquo;
          </p>
        ) : (
          <p className="text-muted-foreground">
            请输入搜索关键词
          </p>
        )}
      </div>

      {searchResults.length > 0 ? (
        <GamesGrid games={searchResults} />
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            未找到与 &ldquo;{query}&rdquo; 相关的游戏
          </p>
        </div>
      ) : null}
    </div>
  );
}
