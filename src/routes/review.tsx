import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Zap,
  Search,
  Trash2,
  ListChecks,
  X,
} from "lucide-react";
import { useLocalStore, storeKeys } from "@/lib/store";
import { stories } from "@/data/stories";
import { useT } from "@/lib/i18n";
import { isDue, schedule, formatInterval, SRS_INTERVALS_MS, type Grade } from "@/lib/srs";
import { useSpeaking } from "@/lib/tts";
import { useXp, XP_REWARDS } from "@/lib/xp";

import type { SavedWord } from "@/lib/types";
import { SyncBanner } from "@/components/booklish/sync-banner";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review — Booklish" }] }),
  component: ReviewPage,
});

type Tab = "review" | "browse" | "quiz";

function ReviewPage() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const { t, lang } = useT();
  const isAr = lang === "ar";
  const [tab, setTab] = useState<Tab>("review");

  const dueCount = vocab.filter((v) => isDue(v)).length;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <SyncBanner />
      <h1 className="mb-2 font-serif text-3xl">{t("review.title")}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {vocab.length} {isAr ? "كلمة محفوظة" : "saved words"} · {dueCount} {isAr ? "بحاجة للمراجعة" : "due now"}
      </p>

      <div className="mb-6 flex gap-2 rounded-full border border-border bg-card p-1">
        <TabButton active={tab === "review"} onClick={() => setTab("review")}>
          {isAr ? "المراجعة" : "Review"}
        </TabButton>
        <TabButton active={tab === "browse"} onClick={() => setTab("browse")}>
          {isAr ? "كل كلماتي" : "All Words"}
        </TabButton>
        <TabButton active={tab === "quiz"} onClick={() => setTab("quiz")}>
          {isAr ? "اختبار" : "Quiz"}
        </TabButton>
      </div>

      {tab === "review" && <ReviewTab vocab={vocab} setVocab={setVocab} />}
      {tab === "browse" && <BrowseTab vocab={vocab} setVocab={setVocab} />}
      {tab === "quiz" && <QuizTab vocab={vocab} />}
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

/* ----------------------------- تبويب المراجعة (SRS) ----------------------------- */

function ReviewTab({
  vocab,
  setVocab,
}: {
  vocab: SavedWord[];
  setVocab: (v: SavedWord[] | ((prev: SavedWord[]) => SavedWord[])) => void;
}) {
  const { t } = useT();
  const { addXp } = useXp();

  const [queue] = useState<string[]>(() =>
    vocab.filter((v) => isDue(v)).map((v) => `${v.slug}:${v.word}`),
  );
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

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
    if (g !== "again") {
      setCorrect((n) => n + 1);
      addXp(XP_REWARDS.reviewGood, `review:${current.word}`);
      setXpEarned((n) => n + XP_REWARDS.reviewGood);
    }
    setRevealed(false);
    setIdx((i) => i + 1);
  };

  const total = queue.length;
  const done = idx >= total;

  if (total === 0) {
    return (
      <div className="pt-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">{t("review.nothingDue")}</p>
        <Link
          to="/library"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          <BookOpen className="h-4 w-4" /> {t("vocab.browse")}
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="pt-6 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mb-2 font-serif text-2xl">{t("review.done")}</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          {reviewed} {t("review.reviewed")} · {correct} {t("review.correct")}
        </p>
        {xpEarned > 0 && (
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-700 dark:text-yellow-400">
            <Zap className="h-4 w-4" />
            +{xpEarned} XP
          </div>
        )}
      </div>
    );
  }

  if (!current) {
    setIdx((i) => i + 1);
    return null;
  }

  const pct = Math.round((idx / total) * 100);
  const units = { m: t("review.minutesShort"), h: t("review.hoursShort"), d: t("review.daysShort") };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("review.progress")}</span>
            <span className="tabular-nums">{idx} / {total}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {xpEarned > 0 && (
          <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
            <Zap className="h-3.5 w-3.5" />+{xpEarned}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <h2 className="font-serif text-4xl" dir="ltr">{current.word}</h2>
          <SpeakIconButton word={current.word} idPrefix="review" />
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
    </div>
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

/* ----------------------------- تبويب كل كلماتي (نُقل من صفحة كلماتي) ----------------------------- */

function BrowseTab({
  vocab,
  setVocab,
}: {
  vocab: SavedWord[];
  setVocab: (v: SavedWord[] | ((prev: SavedWord[]) => SavedWord[])) => void;
}) {
  const { t, dir } = useT();
  const isRtl = dir === "rtl";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...vocab].sort((a, b) => b.at - a.at);
    if (!q) return list;
    return list.filter(
      (v) => v.word.toLowerCase().includes(q) || v.ar.includes(q) || v.def.toLowerCase().includes(q),
    );
  }, [vocab, query]);

  if (vocab.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
        <p className="mb-2">{t("vocab.empty")}</p>
        <p className="text-sm">{t("vocab.emptyHint")}</p>
        <Link
          to="/library"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <BookOpen className="h-4 w-4" /> {t("vocab.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className={`mb-6 flex items-center gap-2 rounded-full border border-border bg-card ${isRtl ? "pr-3 pl-2" : "pl-3 pr-2"}`}>
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("vocab.searchPh")}
          className={`h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}
        />
      </div>

      <ul className="space-y-2">
        {filtered.map((v) => {
          const story = stories.find((s) => s.slug === v.slug);
          return (
            <li key={`${v.slug}:${v.word}`} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl" dir="ltr">{v.word}</span>
                  <SpeakIconButton word={v.word} idPrefix="browse" />
                </div>
                <span dir="rtl" lang="ar" className="text-base text-foreground/85">{v.ar}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{v.def}</p>
              {v.example && <p className="mt-2 text-sm italic text-foreground/75" dir="ltr">"{v.example}"</p>}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">{t("vocab.fromStory")}: {story?.title ?? v.slug}</span>
                <button
                  onClick={() => setVocab((prev) => prev.filter((x) => !(x.word === v.word && x.slug === v.slug)))}
                  className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 hover:bg-muted hover:text-destructive"
                  aria-label={`Remove ${v.word}`}
                >
                  <Trash2 className="h-3.5 w-3.5" /> {t("vocab.delete")}
                </button>
              </div>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {t("vocab.noMatch")}
          </li>
        )}
      </ul>
    </div>
  );
}

/* ----------------------------- تبويب الاختبار (جديد) ----------------------------- */

interface QuizQuestion {
  key: string;
  word: string;
  answer: string;
  options: string[];
}

function buildQuiz(vocab: SavedWord[]): QuizQuestion[] {
  const pool = [...vocab];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.map((w) => {
    const distractors = pool
      .filter((v) => !(v.word === w.word && v.slug === w.slug) && v.ar !== w.ar)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.ar);
    const options = [...distractors, w.ar].sort(() => Math.random() - 0.5);
    return { key: `${w.slug}:${w.word}`, word: w.word, answer: w.ar, options };
  });
}

function QuizTab({ vocab }: { vocab: SavedWord[] }) {
  const { lang } = useT();
  const isAr = lang === "ar";
  const { addXp } = useXp();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const canStart = vocab.length >= 4;

  const start = () => {
    setQuestions(buildQuiz(vocab));
    setIdx(0);
    setScore(0);
    setSelected(null);
    setStarted(true);
  };

  const pick = (option: string) => {
    if (selected) return;
    setSelected(option);
    const q = questions[idx];
    if (option === q.answer) {
      setScore((s) => s + 1);
      addXp(5, `quiz:${q.key}`);
    }
  };

  const next = () => {
    setSelected(null);
    setIdx((i) => i + 1);
  };

  if (!canStart) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
        <p>{isAr ? "تحتاج ٤ كلمات محفوظة على الأقل عشان تبدأ اختبار" : "You need at least 4 saved words to start a quiz"}</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <ListChecks className="mx-auto mb-3 h-8 w-8 text-primary" />
        <p className="mb-5 text-sm text-muted-foreground">
          {isAr
            ? `اختبار اختيار من متعدد على ${vocab.length} كلمة محفوظة`
            : `Multiple-choice quiz on your ${vocab.length} saved words`}
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {isAr ? "ابدأ الاختبار" : "Start quiz"}
        </button>
      </div>
    );
  }

  const total = questions.length;
  const done = idx >= total;

  if (done) {
    return (
      <div className="pt-6 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mb-2 font-serif text-2xl">{isAr ? "خلصت الاختبار!" : "Quiz complete!"}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {isAr ? `نتيجتك: ${score} من ${total}` : `Score: ${score} / ${total}`}
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" /> {isAr ? "أعد الاختبار" : "Retry"}
        </button>
      </div>
    );
  }

  const q = questions[idx];
  const pct = Math.round((idx / total) * 100);

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{idx + 1} / {total}</span>
          <span>{isAr ? `النتيجة: ${score}` : `Score: ${score}`}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="mb-1 text-xs text-muted-foreground">
          {isAr ? "وش معنى هذي الكلمة؟" : "What does this word mean?"}
        </p>
        <h2 className="font-serif text-3xl" dir="ltr">{q.word}</h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2">
        {q.options.map((opt) => {
          const isCorrect = opt === q.answer;
          const isPicked = opt === selected;
          let cls = "border-border bg-card hover:bg-muted";
          if (selected) {
            if (isCorrect) cls = "border-primary bg-primary/10 text-primary";
            else if (isPicked) cls = "border-destructive/40 bg-destructive/10 text-destructive";
          }
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!selected}
              dir="rtl"
              lang="ar"
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-base transition-colors ${cls}`}
            >
              <span>{opt}</span>
              {selected && isCorrect && <Check className="h-4 w-4" />}
              {selected && isPicked && !isCorrect && <X className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {selected && (
        <button
          onClick={next}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {isAr ? "التالي" : "Next"}
        </button>
      )}
    </div>
  );
}

/* ----------------------------- زر الاستماع المشترك ----------------------------- */

function SpeakIconButton({ word, idPrefix }: { word: string; idPrefix: string }) {
  const { t } = useT();
  const { speaking, toggle, supported } = useSpeaking(`${idPrefix}:${word}`);
  if (!supported) return null;
  return (
    <button
      onClick={() => toggle(word, "en-US")}
      className={`rounded-full p-1 transition-colors ${speaking ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted hover:text-primary"}`}
      aria-label={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
      title={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
