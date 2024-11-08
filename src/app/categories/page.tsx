import { db } from "@/server/db";
import { categories, games } from "@/server/db/schema";
import { CategoryCard } from "@/components/categories/category-card";
import { sql } from "drizzle-orm";

export const runtime = "edge";

export default async function CategoriesPage() {
  const categoriesWithCount = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      gamesCount: sql<number>`count(${games.id})`.as('gamesCount'),
    })
    .from(categories)
    .leftJoin(games, sql`${games.category} = ${categories.slug}`)
    .groupBy(categories.id)
    .all();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Game Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesWithCount.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            gamesCount={category.gamesCount}
          />
        ))}
      </div>
    </div>
  );
}
