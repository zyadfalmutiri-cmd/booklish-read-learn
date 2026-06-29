import { useLocalStore } from "./store";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const STORIES_TO_ADVANCE = 7;

export const CEFR_TO_STORY_LEVEL: Record<CefrLevel, string[]> = {
  A1: ["beginner"],
  A2: ["beginner"],
  B1: ["intermediate"],
  B2: ["intermediate"],
  C1: ["advanced"],
  C2: ["advanced"],
};

export interface LevelInfo {
  label: CefrLevel;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  color: string;
}

export const LEVEL_INFO: Record<CefrLevel, LevelInfo> = {
  A1: {
    label: "A1",
    nameAr: "مبتدئ أساسي",
    nameEn: "Beginner",
    descAr: "أفهم الجمل البسيطة جداً والكلمات الشائعة.",
    descEn: "I understand very simple sentences and common words.",
    color: "from-emerald-200 to-emerald-400",
  },
  A2: {
    label: "A2",
    nameAr: "مبتدئ متقدم",
    nameEn: "Elementary",
    descAr: "أفهم التعبيرات الشائعة في مواضيع مألوفة.",
    descEn: "I understand common expressions on familiar topics.",
    color: "from-teal-200 to-teal-400",
  },
  B1: {
    label: "B1",
    nameAr: "متوسط",
    nameEn: "Intermediate",
    descAr: "أفهم النقاط الرئيسية في نصوص واضحة حول مواضيع مألوفة.",
    descEn: "I understand main points in clear texts on familiar topics.",
    color: "from-blue-200 to-blue-400",
  },
  B2: {
    label: "B2",
    nameAr: "فوق المتوسط",
    nameEn: "Upper-Intermediate",
    descAr: "أفهم النصوص المعقدة وأتعامل مع المواضيع المتخصصة.",
    descEn: "I understand complex texts and handle specialised topics.",
    color: "from-violet-200 to-violet-400",
  },
  C1: {
    label: "C1",
    nameAr: "متقدم",
    nameEn: "Advanced",
    descAr: "أفهم نصوصاً طويلة ومعقدة وأدرك المعاني الضمنية.",
    descEn: "I understand long, complex texts and implicit meanings.",
    color: "from-orange-200 to-orange-400",
  },
  C2: {
    label: "C2",
    nameAr: "إتقان",
    nameEn: "Mastery",
    descAr: "أفهم كل ما أقرأه بسهولة وبدقة عالية.",
    descEn: "I understand virtually everything I read with ease.",
    color: "from-rose-200 to-rose-400",
  },
};

export interface UserLevelData {
  cefrLevel: CefrLevel;
  placementDone: boolean;
  storiesFinishedAtLevel: number;
  promotedAt: number[];
}

const DEFAULT_LEVEL_DATA: UserLevelData = {
  cefrLevel: "A1",
  placementDone: false,
  storiesFinishedAtLevel: 0,
  promotedAt: [],
};

// ⚠️ مهم: لا تضع "booklish." في البداية لأن localAdapter يضيفها تلقائياً
export const LEVEL_STORE_KEY = "userLevel";

export function useUserLevel() {
  const [data, setData, hydrated] = useLocalStore<UserLevelData>(LEVEL_STORE_KEY, DEFAULT_LEVEL_DATA);

  function setLevel(level: CefrLevel) {
    setData((prev) => ({ ...prev, cefrLevel: level, storiesFinishedAtLevel: 0 }));
  }

  function completePlacement(level: CefrLevel) {
    setData((prev) => ({ ...prev, cefrLevel: level, placementDone: true, storiesFinishedAtLevel: 0 }));
  }

  function recordStoryFinished(): { promoted: boolean; newLevel: CefrLevel | null } {
    let promoted = false;
    let newLevel: CefrLevel | null = null;

    setData((prev) => {
      const next = prev.storiesFinishedAtLevel + 1;
      if (next >= STORIES_TO_ADVANCE) {
        const currentIdx = CEFR_LEVELS.indexOf(prev.cefrLevel);
        if (currentIdx < CEFR_LEVELS.length - 1) {
          newLevel = CEFR_LEVELS[currentIdx + 1];
          promoted = true;
          return {
            ...prev,
            cefrLevel: newLevel,
            storiesFinishedAtLevel: 0,
            promotedAt: [...prev.promotedAt, Date.now()],
          };
        }
      }
      return { ...prev, storiesFinishedAtLevel: next };
    });

    return { promoted, newLevel };
  }

  const storiesLeft = STORIES_TO_ADVANCE - data.storiesFinishedAtLevel;
  const isMaxLevel = data.cefrLevel === "C2";

  return {
    data,
    hydrated,
    setLevel,
    completePlacement,
    recordStoryFinished,
    storiesLeft,
    isMaxLevel,
    info: LEVEL_INFO[data.cefrLevel],
  };
}
