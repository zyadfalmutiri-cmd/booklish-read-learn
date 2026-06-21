import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cloud, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

/**
 * A subtle, dismissable banner shown to guests inviting them to sign in
 * and sync their data across devices. Disappears once signed in.
 */
export function SyncBanner() {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (loading || user || dismissed) return null;

  return (
    <div className="mx-auto mt-4 flex max-w-3xl items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm animate-fade-in">
      <Cloud className="h-4 w-4 shrink-0 text-primary" />
      <p className="flex-1 text-muted-foreground">
        أنشئ حساباً لحفظ تقدمك على جميع أجهزتك.{" "}
        <Link to="/auth" className="font-medium text-primary hover:underline">
          تسجيل مجاني
        </Link>
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="إغلاق"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
