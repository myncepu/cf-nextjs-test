import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  gamesCount: number;
}

export function CategoryCard({ category, gamesCount }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {gamesCount} {gamesCount === 1 ? 'game' : 'games'}
          </p>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {category.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
