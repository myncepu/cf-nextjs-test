export interface Game {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  gameUrl: string;
  category: string | null;
  createdAt: Date | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  gamesCount?: number;
}
