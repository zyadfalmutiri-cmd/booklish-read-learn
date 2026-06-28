import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUserLevel } from "@/lib/reading-level";
import { PlacementTest } from "@/components/booklish/placement-test";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { CefrLevel } from "@/lib/reading-level";

const PUBLIC_PATHS = ["/auth", "/reset-password", "/privacy", "/terms", "/cookies"];

/**
 * Auth gate + placement test gate.
 *
 * Flow:
 * 1. Not logged in → redirect /auth
 * 2. Public path → render freely
 * 3. Logged in → check Supabase for saved level
 *    a. Found in DB → apply it locally, skip test
 *    b. Not found, local placementDone → push to DB, skip test
 *    c. Neither → show PlacementTest
 * 4. After PlacementTest → save to DB + local
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { data, hydrated: levelHydrated, completePlacement } = useUserLevel();

  // Track whether we've finished the Supabase lookup
  const [dbChecked, setDbChecked] = useState(false);

  // Pull level from Supabase on sign-in
  useEffect(() => {
    if (!user) return;

    async function syncLevel() {
      try {
        const { data: row } = await supabase
          .from("user_levels")
          .select("cefr_level, stories_finished, promoted_at")
          .eq("user_id", user!.id)
          .maybeSingle();

        if (row?.cefr_level) {
          // DB has a level → apply locally if different
          const dbLevel = row.cefr_level as CefrLevel;
          if (!data.placementDone || data.cefrLevel !== dbLevel) {
            completePlacement(dbLevel);
          }
        } else if (data.placementDone) {
          // Local has a level but DB doesn't → push to DB
          await supabase.from("user_levels").upsert({
            user_id: user!.id,
            cefr_level: data.cefrLevel,
            stories_finished: data.storiesFinishedAtLevel,
            promoted_at: data.promotedAt,
            updated_at: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error("Level sync error:", e);
      } finally {
        setDbChecked(true);
      }
    }

    syncLevel();
    // Only run once per user session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Public paths — no auth needed
  if (PUBLIC_PATHS.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Waiting for auth
  if (authLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate to="/auth" search={{ redirect: location.pathname }} replace />
    );
  }

  // Waiting for local store to hydrate
  if (!levelHydrated || !dbChecked) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Placement test needed
  if (!data.placementDone) {
    return (
      <PlacementTest
        onComplete={async (level) => {
          // Save to local first (instant)
          completePlacement(level);
          // Then push to Supabase
          try {
            await supabase.from("user_levels").upsert({
              user_id: user.id,
              cefr_level: level,
              stories_finished: 0,
              promoted_at: [],
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.error("Failed to save level to DB:", e);
          }
        }}
      />
    );
  }

  return <>{children}</>;
}
