import { useEffect, useState, useCallback } from "react";
import { activeAdapter } from "./storage/adapter";

/**
 * React hook backed by the active storage adapter. Components never talk to
 * localStorage directly — they go through this hook so a future cloud
 * adapter can plug in without changing UI code.
 */
export function useLocalStore<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(activeAdapter.get<T>(key, fallback));
    setHydrated(true);
    const unsub = activeAdapter.subscribe(key, () => {
      setValue(activeAdapter.get<T>(key, fallback));
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        activeAdapter.set(key, next);
        return next;
      });
    },
    [key],
  );

  return [value, set, hydrated] as const;
}

export const storeKeys = {
  progress: "progress",     // Record<slug, { pct; lastAt; finished; readingSeconds }>
  vocab: "vocab",           // SavedWord[]
  bookmarks: "bookmarks",   // string[] slugs
  settings: "settings",     // { theme; fontScale; translateMode }
  quizScores: "quizScores", // Record<slug, { score; total; at }>
  streak: "streak",         // { lastDay; current; longest; days }
  stats: "stats",           // { totalTaps; uniqueWords[]; readingSeconds; lastSessionAt }
  tapped: "tappedWords",    // string[] (normalized word keys)
} as const;
