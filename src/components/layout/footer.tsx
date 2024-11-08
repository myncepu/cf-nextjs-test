import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Cloudflare Pages and D1
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/categories" className="transition-colors hover:text-foreground">
              分类
            </Link>
            <Link href="/search" className="transition-colors hover:text-foreground">
              搜索
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 