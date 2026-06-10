import { useEffect, useState, useCallback } from "react";

const PREFIX = "booklish.";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("booklish:store", { detail: { key } }));
  } catch {
    /* ignore */
  }
}

export function useLocalStore<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(read<T>(key, fallback));
    setHydrated(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { key: string } | undefined;
      if (detail?.key === key) setValue(read<T>(key, fallback));
    };
    window.addEventListener("booklish:store", onChange);
    return () => window.removeEventListener("booklish:store", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        write(key, next);
        return next;
      });
    },
    [key],
  );

  return [value, set, hydrated] as const;
}

export const storeKeys = {
  progress: "progress", // Record<slug, { pct: number; lastAt: number; finished: boolean }>
  vocab: "vocab", // Array<{ word: string; ar: string; def: string; example: string; slug: string; at: number }>
  bookmarks: "bookmarks", // string[] slugs
  settings: "settings", // { theme: 'light'|'dark'; fontScale: number; translateMode: 'off'|'words'|'sentences' }
  quizScores: "quizScores", // Record<slug, { score: number; total: number; at: number }>
  streak: "streak", // { lastDay: string; current: number; longest: number; days: string[] }
} as const;
