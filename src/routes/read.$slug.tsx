import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Minus, Plus, Languages, Clock, Maximize2, Minimize2 } from "lucide-react";
import { getStory } from "@/data/stories";
import { Reader } from "@/components/booklish/reader";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useSettings } from "@/components/booklish/theme";
import { useStreak } from "@/lib/streak";
import { useReadingTimer } from "@/lib/stats";
import { useT } from "@/lib/i18n";
import { useXp, XP_REWARDS } from "@/lib/xp";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean; readingSeconds?: number }>;

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
  const [progress, setProgress, progressHydrated] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [settings, setSettings] = useSettings();
  const { markActivity } = useStreak();
  const [pct, setPct] = useState(0);
  const { t } = useT();
  const { addXp } = useXp();
  const isFocusMode = settings.focusMode;
  const setFocusMode = (v: boolean) => setSettings({ ...settings, focusMode: v });

  // Track whether we've already granted finish XP this session
  const finishXpGranted = useRef(false);

  // Reading-time XP: track active seconds, grant 2 XP per minute read
  const readStartRef = useRef<number>(Date.now());
  const xpMinutesGranted = useRef(0);

  useReadingTimer();

  useEffect(() => {
    markActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reading-time XP grants (mirrors the stats reading timer pattern)
  useEffect(() => {
    const grantXpForTime = () => {
      const elapsed = (Date.now() - readStartRef.current) / 1000;
      const minutesRead = Math.floor(elapsed / 60);
      const newMinutes = minutesRead - xpMinutesGranted.current;
      if (newMinutes > 0) {
        addXp(newMinutes * XP_REWARDS.readMinute, "reading");
        xpMinutesGranted.current = minutesRead;
      }
      readStartRef.current = Date.now();
    };

    const resume = () => { readStartRef.current = Date.now(); };
    const onVisibility = () => { if (document.hidden) grantXpForTime(); else resume(); };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", grantXpForTime);
    window.addEventListener("focus", resume);
    const interval = window.setInterval(grantXpForTime, 60_000);

    return () => {
      grantXpForTime(); // flush on unmount
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", grantXpForTime);
      window.removeEventListener("focus", resume);
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save scroll progress + grant finish XP once hydrated
  useEffect(() => {
    if (!progressHydrated) return;

    const alreadyFinished = progress[story.slug]?.finished ?? false;

    // Grant finish XP only the first time in this session
    if (pct >= 95 && !alreadyFinished && !finishXpGranted.current) {
      finishXpGranted.current = true;
      addXp(XP_REWARDS.finishStory, `finish:${story.slug}`);
    }

    setProgress((prev) => {
      const previous = prev[story.slug];
      return {
        ...prev,
        [story.slug]: {
          pct: Math.max(pct, previous?.pct ?? 0),
          lastAt: Date.now(),
          finished: (previous?.finished ?? false) || pct >= 95,
          readingSeconds: previous?.readingSeconds ?? 0,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct, progressHydrated]);

  const adjustFont = (delta: number) => {
    const next = Math.min(1.3, Math.max(0.85, +(settings.fontScale + delta).toFixed(2)));
    setSettings({ ...settings, fontScale: next });
  };

  const cycleTranslate = () => {
    const order: typeof settings.translateMode[] = ["off", "words", "sentences"];
    const idx = order.indexOf(settings.translateMode);
    setSettings({ ...settings, translateMode: order[(idx + 1) % order.length] });
  };

  const remaining = Math.max(0, Math.round(story.minutes * (1 - pct / 100)));

  return (
    <div className="min-h-screen">
      <div className="sticky top-14 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-1.5 px-3 py-2 sm:gap-2 sm:px-4">
          <Link
            to="/story/$slug"
            params={{ slug: story.slug }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{story.title}</div>
          <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
            <Clock className="h-3 w-3" /> {remaining} {t("common.minLeft")}
          </span>
          <button onClick={() => adjustFont(-0.05)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border hover:bg-muted" aria-label={t("read.smaller")}>
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => adjustFont(0.05)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border hover:bg-muted" aria-label={t("read.larger")}>
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={cycleTranslate}
            className={`inline-flex h-8 shrink-0 items-center gap-1 rounded-full border px-2.5 text-xs transition-colors sm:px-3 ${
              settings.translateMode === "off"
                ? "border-border hover:bg-muted"
                : "border-primary bg-primary text-primary-foreground"
            }`}
            aria-label={t("read.translateMode")}
          >
            <Languages className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {settings.translateMode === "off" ? t("read.tm.off") : settings.translateMode === "words" ? t("read.tm.words") : t("read.tm.sentences")}
            </span>
          </button>
          <button
            onClick={() => setFocusMode(!isFocusMode)}
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
              isFocusMode ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
            }`}
            aria-label={isFocusMode ? t("read.focusOff") : t("read.focusOn")}
            title={isFocusMode ? t("read.focusOff") : t("read.focusOn")}
          >
            {isFocusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="h-0.5 w-full bg-border/60">
          <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className={isFocusMode ? "focus-mode-active" : ""}>
        <Reader story={story} onScrollPct={setPct} />

        {!isFocusMode && (
          <div className="reading-column px-4 pb-16">
            <div className="mt-8 rounded-xl border border-border bg-card p-5 text-center font-sans">
              <p className="text-sm text-muted-foreground">{t("read.finishedQ")}</p>
              <Link
                to="/quiz/$slug"
                params={{ slug: story.slug }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("read.takeQuiz")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
