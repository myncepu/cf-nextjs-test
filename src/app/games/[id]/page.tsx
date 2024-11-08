import { notFound } from "next/navigation";
import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export const runtime = "edge";

interface GamePageProps {
  params: {
    id: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await db
    .select()
    .from(games)
    .where(eq(games.id, params.id))
    .get();

  if (!game) {
    notFound();
  }

  console.log({game});

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        {game.thumbnailUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={game.thumbnailUrl}
              alt={game.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
        {game.description && (
          <p className="text-lg text-muted-foreground mb-6">
            {game.description}
          </p>
        )}
        <iframe
          src={game.gameUrl}
          className="w-full aspect-[4/3] rounded-lg"
          allow="fullscreen"
          title={`${game.title} 游戏界面`}
        />
      </div>
    </div>
  );
}
