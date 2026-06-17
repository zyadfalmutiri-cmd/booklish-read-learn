import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { ArrowRight, Flame } from "lucide-react";
import { useT } from "@/lib/i18n";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Booklish — Learn English by Reading" },
      {
        name: "description",
        content:
          "Read short stories. Tap any word for an Arabic + English explanation. Track your progress as you go.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const { streak } = useStreak();
  const { t, dir } = useT();

  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  const continueEntry = Object.entries(progress)
    .filter(([, v]) => !v.finished && v.pct > 0)
    .sort((a, b) => b[1].lastAt - a[1].lastAt)[0];

  const continueStory = continueEntry
    ? stories.find((s) => s.slug === continueEntry[0])
    : undefined;

  const featured = stories.slice(0, 3);
  const arrowClass = dir === "rtl" ? "h-4 w-4 rotate-180" : "h-4 w-4";

  const openCheckout = () => {
    if (!window.Paddle) {
      alert("Paddle not loaded");
      return;
    }

    window.Paddle.Checkout.open({
      items: [
        {
          priceId:
            plan === "yearly"
              ? "pri_01kv81w9m1eh8sbg8e368437tw"
              : "pri_01kv81ssg7zcd77mdsjqhbqxh9",
          quantity: 1,
        },
      ],
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:pt-16">
      <section className="mb-12 sm:mb-20">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">
          {t("home.kicker")}
        </p>

        <h1 className="mb-5 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-6xl">
          {t("home.title")}
        </h1>

        <p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          {t("home.sub")}
        </p>

        {/* plan toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setPlan("monthly")}
            className={`px-3 py-1 rounded-full border ${
              plan === "monthly" ? "bg-black text-white" : ""
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setPlan("yearly")}
            className={`px-3 py-1 rounded-full border ${
              plan === "yearly" ? "bg-black text-white" : ""
            }`}
          >
            Yearly
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {t("home.browse")} <ArrowRight className={arrowClass} />
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm"
          >
            <Flame className="h-4 w-4 text-primary" /> {streak.current}{" "}
            {t("home.streakLabel")}
          </Link>

          {/* زر الاشتراك */}
          <button
            onClick={openCheckout}
            className="rounded-full bg-black px-5 py-2.5 text-sm text-white"
          >
            اشترك الآن
          </button>
        </div>
      </section>

      {continueStory && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl">{t("home.continue")}</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`grid h-14 w-14 place-items-center rounded-lg ${continueStory.coverHue}`}
              >
                {continueStory.cover}
              </div>
              <div>
                <div className="font-serif text-lg">
                  {continueStory.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("home.readPct")} {continueEntry![1].pct}%
                </div>
              </div>
            </div>
            <ArrowRight className={arrowClass} />
          </Link>
        </section>
      )}

      <section>
        <div className="mb-4 flex justify-between">
          <h2 className="font-serif text-xl">{t("home.featured")}</h2>
          <Link to="/library" className="text-sm text-primary">
            {t("home.viewAll")} →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>
    </main>
  );
}