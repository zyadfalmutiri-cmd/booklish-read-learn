import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Plan, PlanLimits } from "@/lib/plan-limits";
import { PLAN_LIMITS } from "@/lib/plan-limits";

export interface SubscriptionState {
  plan: Plan;
  isPro: boolean;
  expiresAt: Date | null;
  limits: PlanLimits;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useSubscription(): SubscriptionState {
  const { user, loading: authLoading } = useAuth();
  const [plan, setPlan] = useState<Plan>("free");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    if (!user) {
      setPlan("free");
      setExpiresAt(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from("subscriptions")
        .select("plan, expires_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!data) {
        setPlan("free");
        setExpiresAt(null);
        setLoading(false);
        return;
      }

      const exp = data.expires_at ? new Date(data.expires_at) : null;
      const isExpired = exp ? exp < new Date() : false;
      const effectivePlan: Plan =
        data.plan === "premium" && !isExpired ? "premium" : "free";

      setPlan(effectivePlan);
      setExpiresAt(exp);
    } catch (err) {
      console.error("[useSubscription]", err);
      setPlan("free");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchSubscription();
  }, [user?.id, authLoading]);

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`sub:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "subscriptions",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchSubscription()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  return {
    plan,
    isPro: plan === "premium",
    expiresAt,
    limits: PLAN_LIMITS[plan],
    loading,
    refresh: fetchSubscription,
  };
}
