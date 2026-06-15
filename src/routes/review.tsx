import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, RotateCcw, Volume2, VolumeX, BookOpen } from "lucide-react";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { isDue, schedule, formatInterval, SRS_INTERVALS_MS, type Grade } from "@/lib/srs";
import { useSpeaking } from "@/lib/tts";

interface SavedWord {
  word: string;
  ar: string;
  def: string;
  example: string;
  slug: string;
  at: number;
  level?: number;
  nextReview?: number;
}

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review — Booklish" }] }),
  component: Review,
});

function Review() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const { t } = useT();

  // Snapshot the due queue at session start so promoted cards don't reappear immediately.
  const [queue] = useState<string[]>(() =>
    vocab.filter((v) => isDue(v)).map((v) => `${v.slug}:${v.word}`),
  );
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);

  const currentId = queue[idx];
  const current = useMemo(
    () => vocab.find((v) => `${v.slug}:${v.word}` === currentId),
    [vocab, currentId],
  );

  const grade = (g: Grade) => {
    if (!current) return;
    const next = schedule(current, g);
    setVocab((prev) =>
      prev.map((v) =>
        v.word === current.word && v.slug === current.slug ? { ...v, ...next } : v,
      ),
    );
    setReviewed((n) => n + 1);
    if (g !== "again") setCorrect((n) => n + 1);
    setRevealed(false);
    setIdx((i) => i + 1);
  };

  const total = queue.length;
  const done = idx >= total;

  if (total === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-12 text-center">
        <h1 className="mb-3 font-serif text-3xl">{t("review.title")}</h1>
        <p className="mb-8 text-sm text-muted-foreground">{t("review.nothingDue")}</p>
        <Link to="/vocab" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
          <BookOpen className="h-4 w-4" /> {t("nav.vocab")}
        </Link>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-12 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mb-2 font-serif text-2xl">{t("review.done")}</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {reviewed} {t("review.reviewed")} · {correct} {t("review.correct")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/vocab" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
            {t("nav.vocab")}
          </Link>
          <Link to="/library" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
            <BookOpen className="h-4 w-4" /> {t("vocab.browse")}
          </Link>
        </div>
      </main>
    );
  }

  if (!current) {
    // Card removed mid-session — skip.
    setIdx((i) => i + 1);
    return null;
  }

  const pct = Math.round((idx / total) * 100);
  const units = { m: t("review.minutesShort"), h: t("review.hoursShort"), d: t("review.daysShort") };

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link to="/vocab" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted" aria-label={t("common.back")}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("review.progress")}</span>
            <span className="tabular-nums">{idx} / {total}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <h2 className="font-serif text-4xl" dir="ltr">{current.word}</h2>
          <CardSpeak word={current.word} />
        </div>
        <p className="text-xs text-muted-foreground">
          {t("review.nextDue")}: {formatInterval(SRS_INTERVALS_MS[Math.min(SRS_INTERVALS_MS.length - 1, (current.level ?? 0) + 1)], units)}
        </p>

        {revealed ? (
          <div className="mt-6 space-y-3 animate-fade-in">
            <div dir="rtl" lang="ar" className="text-2xl text-foreground">{current.ar || "—"}</div>
            <div className="text-sm text-muted-foreground" dir="ltr">{current.def}</div>
            {current.example && (
              <div className="border-t border-border pt-3 text-sm italic text-foreground/80" dir="ltr">
                "{current.example}"
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("review.showAnswer")}
          </button>
        )}
      </div>

      {revealed && (
        <div className="mt-5 grid grid-cols-3 gap-2 animate-fade-in">
          <GradeButton onClick={() => grade("again")} tone="destructive" icon={<RotateCcw className="h-4 w-4" />}>
            {t("review.again")}
          </GradeButton>
          <GradeButton onClick={() => grade("hard")} tone="muted">
            {t("review.hard")}
          </GradeButton>
          <GradeButton onClick={() => grade("good")} tone="primary" icon={<Check className="h-4 w-4" />}>
            {t("review.good")}
          </GradeButton>
        </div>
      )}
    </main>
  );
}

function GradeButton({
  onClick,
  tone,
  icon,
  children,
}: {
  onClick: () => void;
  tone: "destructive" | "muted" | "primary";
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const cls =
    tone === "destructive"
      ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15"
      : tone === "primary"
        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
        : "border-border bg-card text-foreground hover:bg-muted";
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${cls}`}>
      {icon}
      {children}
    </button>
  );
}

function CardSpeak({ word }: { word: string }) {
  const { t } = useT();
  const { speaking, toggle, supported } = useSpeaking(`review:${word}`);
  if (!supported) return null;
  return (
    <button
      onClick={() => toggle(word, "en-US")}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${speaking ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-primary"}`}
      aria-label={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
