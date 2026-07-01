import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUserLevel } from "@/lib/reading-level";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { CefrLevel } from "@/lib/reading-level";

const PUBLIC_PATHS = ["/auth", "/reset-password", "/privacy", "/terms", "/cookies"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { data, hydrated, completePlacement } = useUserLevel();
  const [dbChecked, setDbChecked] = useState(false);

  // Sync level from Supabase once user is known
  useEffect(() => {
    if (!user) {
      setDbChecked(true);
      return;
    }

    async function syncLevel() {
      try {
        const { data: row } = await db
          .from("user_levels")
          .select("cefr_level")
          .eq("user_id", user!.id)
          .maybeSingle();

        if (row?.cefr_level) {
          // DB has level → apply locally (overrides local if different)
          completePlacement(row.cefr_level as CefrLevel);
        } else if (data.placementDone) {
          // Local has level but DB doesn't → push to DB
          await db.from("user_levels").upsert({
            user_id: user!.id,
            cefr_level: data.cefrLevel,
            updated_at: new Date().toISOString(),
          });
        }
      } catch {
        // Table missing or network error — continue normally
      } finally {
        setDbChecked(true);
      }
    }

    syncLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Public paths — always render
  if (PUBLIC_PATHS.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Wait for Supabase to restore session from localStorage
  // authLoading = true means we don't know yet — never redirect during this
  if (authLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not logged in after session check completed
  if (!user) {
    return (
      <Navigate to="/auth" search={{ redirect: location.pathname }} replace />
    );
  }

  // Wait for local store + DB check
  if (!hydrated || !dbChecked) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
