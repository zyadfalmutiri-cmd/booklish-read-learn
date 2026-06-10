import { useLocalStore, storeKeys } from "./store";

export interface StreakData {
  current: number;
  longest: number;
  lastDay: string | null;
  days: string[]; // ISO date strings (YYYY-MM-DD)
}

const DEFAULT: StreakData = { current: 0, longest: 0, lastDay: null, days: [] };

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
  const [streak, setStreak, hydrated] = useLocalStore<StreakData>(storeKeys.streak, DEFAULT);

  const markActivity = () => {
    const today = todayKey();
    setStreak((prev) => {
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
