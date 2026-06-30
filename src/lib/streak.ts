import { useLocalStore, storeKeys } from "./store";

export interface StreakData {
  current: number;
  longest: number;
  lastDay: string | null;
  days: string[]; // ISO date strings (YYYY-MM-DD)
}

const DEFAULT: StreakData = { current: 0, longest: 0, lastDay: null, days: [] };

/** Guards against old/incomplete stored data shapes. */
function normalizeStreak(raw: Partial<StreakData> | null | undefined): StreakData {
  return {
    current: typeof raw?.current === "number" ? raw.current : 0,
    longest: typeof raw?.longest === "number" ? raw.longest : 0,
    lastDay: raw?.lastDay ?? null,
    days: Array.isArray(raw?.days) ? raw!.days : [],
  };
}

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useStreak() {
  const [streakRaw, setStreak, hydrated] = useLocalStore<StreakData>(storeKeys.streak, DEFAULT);
  const streak = normalizeStreak(streakRaw);

  const markActivity = () => {
    const today = todayKey();
    setStreak((prevRaw) => {
      const prev = normalizeStreak(prevRaw);
      if (prev.lastDay === today) return prev;
      const wasYesterday = prev.lastDay === yesterdayKey();
      const current = wasYesterday ? prev.current + 1 : 1;
      const days = prev.days.includes(today) ? prev.days : [...prev.days, today];
      return {
        current,
        longest: Math.max(prev.longest, current),
        lastDay: today,
        days: days.slice(-60),
      };
    });
  };

  return { streak, markActivity, hydrated };
}
