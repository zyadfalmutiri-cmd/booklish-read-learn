import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

/**
 * Client-side auth gate. Supabase persists the session in localStorage,
 * so we render a loading state while the session boots and redirect to
 * /auth?redirect=<current> when unauthenticated.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" search={{ redirect: location.pathname }} replace />;
  }
  return <>{children}</>;
}
