import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUserLevel } from "@/lib/reading-level";
import { PlacementTest } from "@/components/booklish/placement-test";
import { Loader2 } from "lucide-react";
import type { CefrLevel } from "@/lib/reading-level";

const PUBLIC_PATHS = ["/auth", "/reset-password", "/privacy", "/terms", "/cookies"];

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
        const res = await fetch(`/api/user-level?uid=${user!.id}`);
        if (res.ok) {
          const row = await res.json();
          if (row?.cefr_level) {
            completePlacement(row.cefr_level as CefrLevel);
          }
        }
      } catch {
        // silently continue
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
    return <PlacementTest onComplete={completePlacement} />;
  }

  return <>{children}</>;
}
