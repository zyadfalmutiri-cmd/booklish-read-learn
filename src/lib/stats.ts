import { useEffect, useRef } from "react";
import { useLocalStore, storeKeys } from "./store";
import { activeAdapter } from "./storage/adapter";

export interface Stats {
  totalTaps: number;
  uniqueWords: string[]; // normalized
  readingSeconds: number;
  lastSessionAt: number | null;
  dailyMinutes: Record<string, number>; // "Mon Jun 20 2026" → minutes
}

const DEFAULT_STATS: Stats = {
  totalTaps: 0,
  uniqueWords: [],
  readingSeconds: 0,
  lastSessionAt: null,
  dailyMinutes: {},
};

export function useStats() {
  return useLocalStore<Stats>(storeKeys.stats, DEFAULT_STATS);
}

/** Imperative recorders — safe to call from event handlers anywhere. */
export function recordWordTap(normalized: string) {
  if (!normalized) return;
  const current = activeAdapter.get<Stats>(storeKeys.stats, DEFAULT_STATS);
  const isNew = !current.uniqueWords.includes(normalized);
  activeAdapter.set<Stats>(storeKeys.stats, {
    ...current,
    totalTaps: current.totalTaps + 1,
    uniqueWords: isNew ? [...current.uniqueWords, normalized] : current.uniqueWords,
    lastSessionAt: Date.now(),
  });

  const tapped = activeAdapter.get<string[]>(storeKeys.tapped, []);
  if (!tapped.includes(normalized)) {
    activeAdapter.set<string[]>(storeKeys.tapped, [...tapped, normalized]);
  }
}

export function addReadingSeconds(seconds: number) {
  if (seconds <= 0) return;
  const current = activeAdapter.get<Stats>(storeKeys.stats, DEFAULT_STATS);
  const todayKey = new Date().toDateString();
  const existing = current.dailyMinutes ?? {};
  const addedMinutes = seconds / 60;
  activeAdapter.set<Stats>(storeKeys.stats, {
    ...current,
    readingSeconds: current.readingSeconds + Math.round(seconds),
    lastSessionAt: Date.now(),
    dailyMinutes: {
      ...existing,
      [todayKey]: (existing[todayKey] ?? 0) + addedMinutes,
    },
  });
}

/**
 * Tracks active reading time on the current page. Pauses when the tab is
 * hidden or the window loses focus. Flushes every 15s and on unmount.
 */
export function useReadingTimer() {
  const startedAt = useRef<number | null>(Date.now());

  useEffect(() => {
    const flush = () => {
      if (startedAt.current == null) return;
      const elapsed = (Date.now() - startedAt.current) / 1000;
      if (elapsed > 0) addReadingSeconds(elapsed);
      startedAt.current = null;
    };
    const resume = () => {
      if (startedAt.current == null) startedAt.current = Date.now();
    };
    const onVisibility = () => {
      if (document.hidden) flush();
      else resume();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", flush);
    window.addEventListener("focus", resume);
    const interval = window.setInterval(() => {
      flush();
      resume();
    }, 15000);

    return () => {
      flush();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", flush);
      window.removeEventListener("focus", resume);
      window.clearInterval(interval);
    };
  }, []);
}

export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${Math.round(totalSeconds)}s`;
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem ? `${hours}h ${rem}m` : `${hours}h`;
}
