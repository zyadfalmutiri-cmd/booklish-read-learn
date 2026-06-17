import { useState } from "react";
import { Sparkles, Check, X, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useT } from "@/lib/i18n";
import { PRO_FEATURES, PADDLE_PRICES } from "@/lib/plan-limits";
import { useNavigate } from "@tanstack/react-router";

declare const Paddle: {
  Checkout: {
    open: (options: {
      items: { priceId: string; quantity: number }[];
      customer?: { email: string };
      customData?: Record<string, string>;
    }) => void;
  };
};

interface PaywallProps {
  reason?: "story" | "ai" | "srs" | "vocab" | "sentence";
  onClose?: () => void;
}

export function Paywall({ reason = "story", onClose }: PaywallProps) {
  const { user } = useAuth();
  const { lang } = useT();
  const navigate = useNavigate();
  const ar = lang === "ar";
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");

  const price = PADDLE_PRICES[billing];

  const headlines = {
    story:    { ar: "هذه القصة حصرية لمشتركي Pro", en: "This story is for Pro subscribers" },
    ai:       { ar: "ترجمة AI متاحة لمشتركي Pro", en: "AI lookup is for Pro subscribers" },
    srs:      { ar: "المراجعة الذكية لمشتركي Pro", en: "Smart review is for Pro subscribers" },
    vocab:    { ar: "وصلت للحد المجاني (20 كلمة)", en: "You've reached the free limit (20 words)" },
    sentence: { ar: "ترجمة الجمل لمشتركي Pro", en: "Sentence translation is for Pro subscribers" },
  };

  const h = headlines[reason ?? "story"];

  const handleUpgrade = () => {
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    Paddle.Checkout.open({
      items: [{ priceId: price.priceId, quantity: 1 }],
      customer: { email: user.email ?? "" },
      customData: { user_id: user.id },
    });
  };

  return (
    <div className="relative mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full hover:bg-muted text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="mb-5 flex flex-col items-center text-center">
        <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-semibold leading-tight">
          {ar ? h.ar : h.en}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {ar ? "اشترك في Booklish Pro واحصل على وصول كامل." : "Subscribe to Booklish Pro for full access."}
        </p>
      </div>

      <div className="mb-5 flex items-center justify-center gap-1 rounded-full border border-border bg-muted p-1">
        {(["annual", "monthly"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              billing === b ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {b === "annual" ? (ar ? "سنوياً" : "Annual") : (ar ? "شهرياً" : "Monthly")}
            {b === "annual" && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                {ar ? "وفر 50%" : "Save 50%"}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mb-5 text-center">
        <span className="font-serif text-5xl font-bold">${price.amount}</span>
        <span className="ml-1 text-sm text-muted-foreground">
          / {ar ? (billing === "annual" ? "سنة" : "شهر") : price.interval}
        </span>
      </div>

      <ul className="mb-6 space-y-2.5">
        {PRO_FEATURES.map((f) => (
          <li key={f.icon} className="flex items-center gap-3 text-sm">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <span>{f.icon} {ar ? f.ar : f.en}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleUpgrade}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
      >
        <Sparkles className="h-4 w-4" />
        {ar ? "اشترك في Pro الآن" : "Subscribe to Pro now"}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {ar ? "تجربة مجانية 7 أيام · إلغاء في أي وقت" : "7-day free trial · Cancel anytime"}
      </p>
    </div>
  );
}

export function PaywallDialog({ open, onClose, reason }: {
  open: boolean;
  onClose: () => void;
  reason?: PaywallProps["reason"];
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md">
        <Paywall reason={reason} onClose={onClose} />
      </div>
    </div>
  );
}

export function ProBadge({ ar }: { ar?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
      <Sparkles className="h-2.5 w-2.5" />
      {ar ? "برو" : "PRO"}
    </span>
  );
}

export function LockIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
      <Lock className="h-8 w-8 text-white drop-shadow" />
    </div>
  );
}
