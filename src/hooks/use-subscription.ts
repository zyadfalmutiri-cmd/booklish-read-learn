import type { PlanLimits } from "@/lib/plan-limits";
import { PLAN_LIMITS } from "@/lib/plan-limits";

export interface SubscriptionState {
  plan: "free" | "premium";
  isPro: boolean;
  expiresAt: Date | null;
  limits: PlanLimits;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useSubscription(): SubscriptionState {
  return {
    plan: "premium",
    isPro: true,
    expiresAt: null,
    limits: PLAN_LIMITS["premium"],
    loading: false,
    refresh: async () => {},
  };
}
