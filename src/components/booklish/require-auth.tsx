import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUserLevel } from "@/lib/reading-level";
import { PlacementTest } from "@/components/booklish/placement-test";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { data, completePlacement } = useUserLevel();

  // لا نزال ننتظر تحميل الـ auth
  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // غير مسجل → صفحة الدخول
  if (!user) {
    return <Navigate to="/auth" search={{ redirect: location.pathname }} replace />;
  }

  // صفحة /auth نفسها لا تحتاج اختبار
  if (location.pathname === "/auth") {
    return <>{children}</>;
  }

  // ننتظر تحميل localStorage (data ستكون undefined أول لحظة)
  if (!data) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // أول مرة → اختبار التحديد
  if (!data.placementDone) {
    return <PlacementTest onComplete={completePlacement} />;
  }

  return <>{children}</>;
}

