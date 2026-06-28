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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { data, hydrated: levelHydrated, completePlacement } = useUserLevel();
  const [dbChecked, setDbChecked] = useState(false);

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
          .single();

        if (row?.cefr_level) {
          completePlacement(row.cefr_level as CefrLevel);
        } else if (data.placementDone) {
          await db.from("user_levels").upsert({
            user_id: user!.id,
            cefr_level: data.cefrLevel,
            updated_at: new Date().toISOString(),
          });
        }
      } catch {
        // table may not exist yet — continue normally
      } finally {
        setDbChecked(true);
      }
    }

    syncLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (PUBLIC_PATHS.includes(location.pathname)) {
    return <>{children}</>;
  }

  if (authLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/auth" search={{ redirect: location.pathname }} replace />
    );
  }

  if (!levelHydrated || !dbChecked) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data.placementDone) {
    return (
      <PlacementTest
        onComplete={async (level) => {
          completePlacement(level);
          try {
            await db.from("user_levels").upsert({
              user_id: user.id,
              cefr_level: level,
              updated_at: new Date().toISOString(),
            });
          } catch {
            // silently fail
          }
        }}
      />
    );
  }

  return <>{children}</>;
}
