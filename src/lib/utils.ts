import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(url: string | null): string {
  if (!url) return "/images/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}
