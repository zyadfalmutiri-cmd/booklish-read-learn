import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { Paywall } from "@/components/booklish/paywall";
import { useSubscription } from "@/hooks/use-subscription";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { lang } = useT();
  const { isPro } = useSubscription();
  const ar = lang === "ar";

  if (isPro) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-serif text-3xl">
          {ar ? "أنت مشترك في Pro! 🎉" : "You're a Pro subscriber! 🎉"}
        </h1>
        <p className="text-muted-foreground">
          {ar ? "تمتع بالوصول الكامل لجميع القصص." : "Enjoy full access to all stories."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-primary">
          {ar ? "الأسعار" : "Pricing"}
        </p>
        <h1 className="font-serif text-4xl">
          {ar ? "ارق بتجربتك" : "Elevate your experience"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {ar ? "ابدأ مجاناً — تجربة 7 أيام بدون بطاقة." : "Start free — 7-day trial, no card needed."}
        </p>
      </div>
      <Paywall />
    </main>
  );
}
