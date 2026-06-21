import { useLocalStore, storeKeys } from "./store";

export interface XpData {
  total: number;
  log: { at: number; amount: number; reason: string }[];
}

const DEFAULT_XP: XpData = { total: 0, log: [] };

export const XP_REWARDS = {
  saveWord: 5,
  quizCorrect: 10,
  readMinute: 2,
  reviewGood: 3,
  finishStory: 25,
} as const;

export interface Level {
  name: "beginner" | "intermediate" | "advanced";
  nameAr: string;
  nameEn: string;
  minXp: number;
  maxXp: number;
  icon: string;
}

export const LEVELS: Level[] = [
  { name: "beginner",     nameAr: "مبتدئ",  nameEn: "Beginner",     minXp: 0,    maxXp: 299,  icon: "🌱" },
  { name: "intermediate", nameAr: "متوسط",  nameEn: "Intermediate", minXp: 300,  maxXp: 799,  icon: "📖" },
  { name: "advanced",     nameAr: "متقدم",  nameEn: "Advanced",     minXp: 800,  maxXp: Infinity, icon: "🎓" },
];

export function getLevel(xp: number): Level {
  return LEVELS.slice().reverse().find((l) => xp >= l.minXp) ?? LEVELS[0];
}

export function getLevelProgress(xp: number): number {
  const level = getLevel(xp);
  if (level.maxXp === Infinity) return 100;
  const range = level.maxXp - level.minXp + 1;
  return Math.min(100, Math.round(((xp - level.minXp) / range) * 100));
}

export function getXpToNextLevel(xp: number): number {
  const level = getLevel(xp);
  if (level.maxXp === Infinity) return 0;
  return level.maxXp + 1 - xp;
}

export function useXp() {
  const [xpData, setXpData] = useLocalStore<XpData>(storeKeys.xp, DEFAULT_XP);

  const addXp = (amount: number, reason: string) => {
    setXpData((prev) => ({
      total: prev.total + amount,
      log: [...prev.log.slice(-99), { at: Date.now(), amount, reason }],
    }));
  };

  const level = getLevel(xpData.total);
  const progress = getLevelProgress(xpData.total);
  const xpToNext = getXpToNextLevel(xpData.total);

  return { xp: xpData.total, level, progress, xpToNext, addXp };
}
