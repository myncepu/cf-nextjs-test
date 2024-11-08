"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search as SearchIcon } from "lucide-react";
import type { Game } from "@/types";

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [data, setData] = React.useState<Game[]>([]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (debouncedQuery.length === 0) {
      setData([]);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/search/suggestions?q=${debouncedQuery}`);
        const data = await res.json() as Game[];
        setData(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setData([]);
      }
    }

    fetchData();
  }, [debouncedQuery]);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="搜索游戏..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>
          未找到相关游戏：{searchQuery}
        </CommandEmpty>
        <CommandGroup heading="游戏">
          {data.map((game) => (
            <CommandItem
              key={game.id}
              onSelect={() => handleSelect(() => router.push(`/games/${game.id}`))}
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              {game.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
