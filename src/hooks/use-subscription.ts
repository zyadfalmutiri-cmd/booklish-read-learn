import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  const [state, setState] = useState<SubscriptionState>({
    plan: "free",
    isPro: false,
    expiresAt: null,
    limits: PLAN_LIMITS["free"],
    loading: true,
    refresh: async () => {},
  });

  const fetchSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setState(s => ({ ...s, loading: false }));
      return;
    }

    const { data } = await supabase
      .from("subscriptions")
      .select("plan, expires_at, status")
      .eq("user_id", user.id)
      .single();

    const isActive =
      data?.status === "active" &&
      (!data.expires_at || new Date(data.expires_at) > new Date());

    setState({
      plan: isActive ? "premium" : "free",
      isPro: isActive,
      expiresAt: data?.expires_at ? new Date(data.expires_at) : null,
      limits: PLAN_LIMITS[isActive ? "premium" : "free"],
      loading: false,
      refresh: fetchSubscription,
    });
  };

  useEffect(() => { fetchSubscription(); }, []);

  return state;
}
