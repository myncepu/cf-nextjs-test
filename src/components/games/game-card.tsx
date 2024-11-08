import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  // 生成随机但固定的图片URL
  const picsumId = Number.parseInt(game.id.replace(/\D/g, '').slice(0, 4)) || 
    Math.floor(Math.random() * 1000);
    
  const imageUrl = `https://picsum.photos/seed/${picsumId}/800/600`;

  return (
    <Link href={`/games/${game.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {game.title}
          </h3>
          {game.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {game.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {game.category && (
            <Badge variant="secondary" className="capitalize">
              {game.category}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
