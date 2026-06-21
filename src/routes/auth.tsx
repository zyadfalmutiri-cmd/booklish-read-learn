import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { Loader2, BookOpen } from "lucide-react";

const search = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  component: AuthPage,
});

type Mode = "login" | "signup" | "reset";

function AuthPage() {
  const { redirect } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { lang } = useT();
  const ar = lang === "ar";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: redirect || "/dashboard" });
    }
  }, [user, loading, navigate, redirect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success(ar ? "تم إنشاء حسابك. تحقق من بريدك الإلكتروني." : "Account created. Check your email.");
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(ar ? "تم تسجيل الدخول" : "Signed in");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success(ar ? "أرسلنا رابط الاستعادة إلى بريدك." : "Reset link sent.");
        setMode("login");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl font-semibold">
          {mode === "signup"
            ? ar ? "أنشئ حسابك" : "Create your account"
            : mode === "reset"
              ? ar ? "استعادة كلمة المرور" : "Reset your password"
              : ar ? "تسجيل الدخول" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ar ? "احفظ تقدمك وكلماتك عبر كل أجهزتك." : "Save your progress and vocabulary across devices."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-border bg-card p-5 shadow-sm">
        {mode === "signup" && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{ar ? "الاسم" : "Name"}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder={ar ? "اسمك" : "Your name"}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{ar ? "البريد الإلكتروني" : "Email"}</label>
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>

        {mode !== "reset" && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{ar ? "كلمة المرور" : "Password"}</label>
            <input
              type="password"
              required
              minLength={6}
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signup"
            ? ar ? "إنشاء الحساب" : "Create account"
            : mode === "reset"
              ? ar ? "إرسال رابط الاستعادة" : "Send reset link"
              : ar ? "تسجيل الدخول" : "Sign in"}
        </button>
      </form>

      <div className="mt-5 space-y-2 text-center text-sm text-muted-foreground">
        {mode === "login" && (
          <>
            <button onClick={() => setMode("signup")} className="text-primary hover:underline">
              {ar ? "ليس لديك حساب؟ سجّل الآن" : "No account? Sign up"}
            </button>
            <div>
              <button onClick={() => setMode("reset")} className="hover:underline">
                {ar ? "نسيت كلمة المرور؟" : "Forgot password?"}
              </button>
            </div>
          </>
        )}
        {mode === "signup" && (
          <button onClick={() => setMode("login")} className="text-primary hover:underline">
            {ar ? "لديك حساب بالفعل؟ سجّل دخول" : "Have an account? Sign in"}
          </button>
        )}
        {mode === "reset" && (
          <button onClick={() => setMode("login")} className="text-primary hover:underline">
            {ar ? "العودة لتسجيل الدخول" : "Back to sign in"}
          </button>
        )}
        <div className="pt-3">
          <Link to="/" className="text-xs hover:underline">
            {ar ? "العودة للرئيسية" : "Back to home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
