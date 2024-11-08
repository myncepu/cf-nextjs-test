import * as React from "react";

const HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

interface SearchHistoryItem {
  term: string;
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = React.useState<SearchHistoryItem[]>([]);

  // 加载历史记录
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  }, []);

  // 添加搜索记录
  const addToHistory = React.useCallback((term: string) => {
    if (!term.trim()) return
  }, []);

  return { history, addToHistory };
} 