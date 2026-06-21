export type Plan = "free" | "premium";

export interface PlanLimits {
  canReadStory: (slug: string) => boolean;
  maxSavedWords: number;
  hasSrsReview: boolean;
  hasAiLookup: boolean;
  hasSentenceTranslation: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    canReadStory: () => true,
    maxSavedWords: Infinity,
    hasSrsReview: true,
    hasAiLookup: true,
    hasSentenceTranslation: true,
  },
  premium: {
    canReadStory: () => true,
    maxSavedWords: Infinity,
    hasSrsReview: true,
    hasAiLookup: true,
    hasSentenceTranslation: true,
  },
};
