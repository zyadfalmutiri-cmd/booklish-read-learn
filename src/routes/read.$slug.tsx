import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Languages } from "lucide-react";
import { getStory } from "@/data/stories";
import { Reader } from "@/components/booklish/reader";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useSettings } from "@/components/booklish/theme";
import { useStreak } from "@/lib/streak";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/read/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Reading: ${loaderData.story.title} — Booklish` }] : [],
  }),
  component: ReadPage,
});

function ReadPage() {
  const { story } = Route.useLoaderData() as { story: import("@/lib/types").Story };
  const [progress, setProgress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [settings, setSettings] = useSettings();
  const { markActivity } = useStreak();
  const [pct, setPct] = useState(progress[story.slug]?.pct ?? 0);

  useEffect(() => {
    markActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      [story.slug]: {
        pct: Math.max(pct, prev[story.slug]?.pct ?? 0),
        lastAt: Date.now(),
        finished: (prev[story.slug]?.finished ?? false) || pct >= 95,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  const adjustFont = (delta: number) => {
    const next = Math.min(1.3, Math.max(0.85, +(settings.fontScale + delta).toFixed(2)));
    setSettings({ ...settings, fontScale: next });
  };

  const cycleTranslate = () => {
    const order: typeof settings.translateMode[] = ["off", "words", "sentences"];
    const idx = order.indexOf(settings.translateMode);
    setSettings({ ...settings, translateMode: order[(idx + 1) % order.length] });
  };

  return (
    <div className="min-h-screen">
      {/* Reader toolbar */}
      <div className="sticky top-14 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
          <Link
            to="/story/$slug"
            params={{ slug: story.slug }}
            className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="ml-1 flex-1 truncate text-sm text-muted-foreground">{story.title}</div>
          <button onClick={() => adjustFont(-0.05)} className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted" aria-label="Smaller text">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => adjustFont(0.05)} className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted" aria-label="Larger text">
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={cycleTranslate}
            className={`inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs transition-colors ${
              settings.translateMode === "off"
                ? "border-border hover:bg-muted"
                : "border-primary bg-primary text-primary-foreground"
            }`}
            aria-label="Translation mode"
          >
            <Languages className="h-3.5 w-3.5" />
            {settings.translateMode === "off" ? "Off" : settings.translateMode === "words" ? "Words" : "Sent."}
          </button>
        </div>
        <div className="h-0.5 w-full bg-border/60">
          <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <Reader story={story} onScrollPct={setPct} />

      <div className="reading-column px-4 pb-16">
        <div className="mt-8 rounded-xl border border-border bg-card p-5 text-center font-sans">
          <p className="text-sm text-muted-foreground">Finished the story?</p>
          <Link
            to="/quiz/$slug"
            params={{ slug: story.slug }}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Take the comprehension quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
