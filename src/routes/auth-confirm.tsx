import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { Loader2, BookOpen, XCircle } from "lucide-react";

const search = z.object({
  token_hash: z.string().optional(),
  type: z.string().optional(),
  redirect_to: z.string().optional(),
});

export const Route = createFileRoute("/auth-confirm")({
  validateSearch: search,
  component: ConfirmPage,
});

function ConfirmPage() {
  const { token_hash, type, redirect_to } = useSearch({ from: "/auth-confirm" });
  const navigate = useNavigate();
  const { lang } = useT();
  const ar = lang === "ar";

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const run = async () => {
      if (!token_hash || !type) {
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as "signup" | "recovery" | "invite" | "magiclink" | "email_change" | "email",
      });

      if (error) {
        console.error("verifyOtp error:", error);
        setStatus("error");
        return;
      }

      setStatus("success");

      // تحديد الوجهة الصحيحة حسب نوع العملية
      let destination = "/dashboard";

      if (type === "recovery") {
        destination = "/reset-password";
      } else if (redirect_to) {
        try {
          // استخراج المسار الداخلي فقط من الرابط الكامل
          const url = new URL(redirect_to);
          destination = url.pathname !== "/" ? url.pathname : "/dashboard";
        } catch {
          destination = "/dashboard";
        }
      }

      if (type !== "recovery") {
        toast.success(ar ? "تم تأكيد حسابك بنجاح" : "Account confirmed successfully");
      }

      setTimeout(() => {
        navigate({ to: destination });
      }, type === "recovery" ? 300 : 1500);
    };

    run();
  }, [token_hash, type, redirect_to, navigate, ar]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
        <BookOpen className="h-6 w-6" />
      </div>

      {status === "loading" && (
        <>
          <Loader2 className="mb-3 h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {ar ? "جاري تأكيد حسابك..." : "Confirming your account..."}
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="font-serif text-xl font-semibold">
            {ar ? "تم التأكيد بنجاح" : "Confirmed successfully"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ar ? "جاري تحويلك..." : "Redirecting you..."}
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="mb-3 h-8 w-8 text-destructive" />
          <h1 className="font-serif text-xl font-semibold">
            {ar ? "انتهت صلاحية الرابط" : "Link expired or invalid"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ar
              ? "الرابط غير صالح أو تم استخدامه من قبل. جرب تسجيل حساب جديد أو تسجيل الدخول."
              : "This link is invalid or was already used. Try signing up again or logging in."}
          </p>
        </>
      )}
    </div>
  );
}
