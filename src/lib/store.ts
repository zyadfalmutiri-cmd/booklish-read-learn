import { useEffect, useState, useCallback } from "react";
import { activeAdapter } from "./storage/adapter";

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
  progress: "progress",
  vocab: "vocab",
  bookmarks: "bookmarks",
  settings: "settings",
  quizScores: "quizScores",
  streak: "streak",
  stats: "stats",
  tapped: "tappedWords",
    xp: "xp",
  userLevel: "booklish.userLevel",
} as const;
