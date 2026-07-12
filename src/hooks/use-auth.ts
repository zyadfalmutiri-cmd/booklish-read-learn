import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * يقرأ الجلسة المحفوظة من localStorage بشكل متزامن (sync) عشان
 * أول render يبدأ بالحالة الصحيحة مباشرة بدون أي وميض أو فراغ.
 */
function readCachedSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const key = Object.keys(localStorage).find(
      (k) => k.startsWith("sb-") && k.endsWith("-auth-token")
    );
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.access_token && parsed?.user) return parsed as Session;
    if (parsed?.currentSession?.access_token) return parsed.currentSession as Session;
    return null;
  } catch {
    return null;
  }
}

/**
 * Single auth-state hook. Subscribes to Supabase auth changes and
 * persists the session via the supabase client's built-in localStorage
 * persistence — no extra storage code needed.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>(() => {
    const cached = readCachedSession();
    return cached
      ? { user: cached.user, session: cached, loading: false }
      : { user: null, session: null, loading: true };
  });

  useEffect(() => {
    let mounted = true;

    // Subscribe FIRST to avoid race with getSession.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState({ user: session?.user ?? null, session, loading: false });
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setState({ user: data.session?.user ?? null, session: data.session, loading: false });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export async function signOut() {
  await supabase.auth.signOut();
}
