export type Plan = "free" | "premium";

export const FREE_STORY_SLUGS: string[] = [
  "the-missing-key",
  "the-night-bus",
  "the-rivers-edge",
];

export interface PlanLimits {
  canReadStory: (slug: string) => boolean;
  maxSavedWords: number;
  hasSrsReview: boolean;
  hasAiLookup: boolean;
  hasSentenceTranslation: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    canReadStory: (slug) => FREE_STORY_SLUGS.includes(slug),
    maxSavedWords: 20,
    hasSrsReview: false,
    hasAiLookup: false,
    hasSentenceTranslation: false,
  },
  premium: {
    canReadStory: () => true,
    maxSavedWords: Infinity,
    hasSrsReview: true,
    hasAiLookup: true,
    hasSentenceTranslation: true,
  },
};

export const PADDLE_PRICES = {
  monthly: {
    priceId: "pri_01kv81ssg7zcd77mdsjqhbqxh9",
    amount: 4.99,
    interval: "month" as const,
    labelAr: "شهرياً",
    labelEn: "Monthly",
  },
  annual: {
    priceId: "pri_01kv81w9m1eh8sbg8e368437tw",
    amount: 29.99,
    interval: "year" as const,
    labelAr: "سنوياً",
    labelEn: "Annually",
    savingsPct: 50,
  },
} as const;

export const PRO_FEATURES = [
  { icon: "📚", ar: "كل القصص بلا حدود — 45+ قصة", en: "All stories — 45+ across all levels" },
  { icon: "🤖", ar: "ترجمة AI لأي كلمة فوراً", en: "AI lookup for any word instantly" },
  { icon: "🔄", ar: "مراجعة ذكية للمفردات بنظام SRS", en: "Smart vocabulary review with SRS" },
  { icon: "🌐", ar: "ترجمة الجمل كاملة إلى العربية", en: "Full sentence translation" },
  { icon: "💾", ar: "مزامنة تقدمك عبر جميع أجهزتك", en: "Sync across all your devices" },
] as const;
