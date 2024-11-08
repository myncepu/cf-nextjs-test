import { notFound } from "next/navigation";
import { db } from "@/server/db";
import { categories, games } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { GamesGrid } from "@/components/games/games-grid";
import { sql } from "drizzle-orm";
import type { Game } from "@/types";

export const runtime = "edge";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // 获取分类信息
  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, params.slug))
    .get();

  if (!category) {
    notFound();
  }

  // 获取该分类下的所有游戏
  const categoryGames = await db
    .select({
      id: games.id,
      title: games.title,
      description: games.description,
      thumbnailUrl: games.thumbnailUrl,
      gameUrl: games.gameUrl,
      category: games.category,
      createdAt: games.createdAt,
    })
    .from(games)
    .where(eq(games.category, params.slug))
    .orderBy(sql`created_at DESC`)
    .all() as Game[];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>
      
      {categoryGames.length > 0 ? (
        <GamesGrid games={categoryGames} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">该分类下暂无游戏</p>
        </div>
      )}
    </div>
  );
}
