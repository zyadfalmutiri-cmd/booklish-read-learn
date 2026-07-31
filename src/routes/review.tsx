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
  Star,
  ChevronDown,
  ChevronUp,
  ArrowDownAZ,
  History as HistoryIcon,
  Layers,
  Swords,
  Plus,
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
  head: () => ({ meta: [{ title: "My Vocabulary — Booklish" }] }),
  component: ReviewPage,
});

// كلمة تعتبر "متقنة" إذا وصل مستواها لهذا الحد أو أعلى
const KNOWN_LEVEL_THRESHOLD = 5;

type MainTab = "learning" | "know";
type SortMode = "az" | "recent";
type Mode = "browse" | "flashcards" | "quiz";

function wordId(v: SavedWord) {
  return `${v.slug}:${v.word}`;
}

function isKnown(v: SavedWord) {
  return (v.level ?? 0) >= KNOWN_LEVEL_THRESHOLD;
}

function ReviewPage() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const { t, lang, dir } = useT();
  const isAr = lang === "ar";
  const isRtl = dir === "rtl";

  const [mode, setMode] = useState<Mode>("browse");
  const [mainTab, setMainTab] = useState<MainTab>("learning");
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const knowCount = vocab.filter(isKnown).length;
  const learnCount = vocab.length - knowCount;
  const total = vocab.length;
  const knowPct = total > 0 ? Math.round((knowCount / total) * 100) : 0;

  const toggleFavorite = (v: SavedWord) => {
    setVocab((prev) =>
      prev.map((x) =>
        x.word === v.word && x.slug === v.slug ? { ...x, favorite: !x.favorite } : x,
      ),
    );
  };

  const deleteWord = (v: SavedWord) => {
    setVocab((prev) => prev.filter((x) => !(x.word === v.word && x.slug === v.slug)));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = vocab.filter((v) => (mainTab === "know" ? isKnown(v) : !isKnown(v)));
    if (onlyFavorites) list = list.filter((v) => v.favorite);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.ar.includes(q) ||
          v.def.toLowerCase().includes(q),
      );
    }
    list = [...list].sort((a, b) =>
      sortMode === "az" ? a.word.localeCompare(b.word) : b.at - a.at,
    );
    return list;
  }, [vocab, mainTab, onlyFavorites, query, sortMode]);

  const allExpanded = filtered.length > 0 && filtered.every((v) => expandedIds.has(wordId(v)));

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filtered.map(wordId)));
    }
  };

  // ---------------- وضع البطاقات التعليمية (Flash Cards) ----------------
  if (mode === "flashcards") {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
        <button
          onClick={() => setMode("browse")}
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
          {isAr ? "رجوع" : "Back"}
        </button>
        <FlashCardsTab vocab={filtered.length > 0 ? filtered : vocab} setVocab={setVocab} />
      </main>
    );
  }

  // ---------------- وضع الاختبار (Multiple choice) ----------------
  if (mode === "quiz") {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
        <button
          onClick={() => setMode("browse")}
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
          {isAr ? "رجوع" : "Back"}
        </button>
        <QuizTab vocab={vocab} />
      </main>
    );
  }

  // ---------------- الوضع الرئيسي: My Vocabulary ----------------
  return (
    <main className="mx-auto max-w-3xl px-4 pb-44 pt-8 sm:pb-28">
      <SyncBanner />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl">{isAr ? "مفرداتي" : "My Vocabulary"}</h1>
        <button
          onClick={() => setSearchOpen((s) => !s)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-muted"
          aria-label="search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {searchOpen && (
        <div className={`mb-5 flex items-center gap-2 rounded-full border border-border bg-card ${isRtl ? "pr-3 pl-2" : "pl-3 pr-2"}`}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("vocab.searchPh")}
            className={`h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* بطاقة الإحصائيات */}
      <div className="mb-6 paper-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
              {knowCount} {isAr ? "أعرفها" : "Know"}
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              {learnCount} {isAr ? "تعلّم" : "Learn"}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {total} {isAr ? "كلمة" : "Words"}
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-accent" style={{ width: `${100 - knowPct}%` }} />
          <div className="h-full bg-primary" style={{ width: `${knowPct}%` }} />
        </div>
      </div>

      {/* تبويبات Learning / I know */}
      <div className="mb-4 flex gap-2 rounded-full border border-border bg-card p-1">
        <TabButton active={mainTab === "learning"} onClick={() => setMainTab("learning")}>
          {isAr ? "أتعلمها" : "Learning"}
        </TabButton>
        <TabButton active={mainTab === "know"} onClick={() => setMainTab("know")}>
          {isAr ? "أعرفها" : "I know"}
        </TabButton>
      </div>

      {/* فلاتر: ترتيب / حديث / مفضلة / توسيع الكل */}
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortMode("az")}
            className={`grid h-9 w-9 place-items-center rounded-full border ${sortMode === "az" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
            aria-label="sort a-z"
            title={isAr ? "ترتيب أبجدي" : "Sort A-Z"}
          >
            <ArrowDownAZ className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSortMode("recent")}
            className={`grid h-9 w-9 place-items-center rounded-full border ${sortMode === "recent" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
            aria-label="sort recent"
            title={isAr ? "الأحدث" : "Recent"}
          >
            <HistoryIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOnlyFavorites((v) => !v)}
            className={`grid h-9 w-9 place-items-center rounded-full border ${onlyFavorites ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
            aria-label="favorites only"
            title={isAr ? "المفضلة فقط" : "Favorites only"}
          >
            <Star className={`h-4 w-4 ${onlyFavorites ? "fill-current" : ""}`} />
          </button>
        </div>
        <button onClick={toggleExpandAll} className="text-sm font-medium text-primary hover:underline">
          {allExpanded ? (isAr ? "طي الكل" : "Collapse All") : (isAr ? "توسيع الكل" : "Expand All")}
        </button>
      </div>

      {/* زر إضافة كلمات جديدة */}
      <Link
        to="/library"
        className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-medium hover:bg-muted"
      >
        <Plus className="h-4 w-4 text-primary" />
        {isAr ? "أضف كلمات جديدة" : "Add new words"}
      </Link>

      {/* قائمة الكلمات */}
      {vocab.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          <p className="mb-2">{t("vocab.empty")}</p>
          <p className="text-sm">{t("vocab.emptyHint")}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {t("vocab.noMatch")}
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((v) => {
            const id = wordId(v);
            const expanded = expandedIds.has(id);
            const story = stories.find((s) => s.slug === v.slug);
            return (
              <li key={id} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 p-4">
                  <SpeakIconButton word={v.word} idPrefix="vocab" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="truncate font-serif text-lg" dir="ltr">{v.word}</span>
                      {v.pos && <span className="text-xs text-muted-foreground">{v.pos}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(v)}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${v.favorite ? "text-accent" : "text-muted-foreground hover:bg-muted"}`}
                    aria-label="favorite"
                  >
                    <Star className={`h-4 w-4 ${v.favorite ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => toggleExpand(id)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                    aria-label="expand"
                  >
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {expanded && (
                  <div className="space-y-2 border-t border-border bg-muted/40 px-4 py-3">
                    <div dir="rtl" lang="ar" className="text-lg text-foreground">{v.ar || "—"}</div>
                    <div className="text-sm text-muted-foreground" dir="ltr">{v.def}</div>
                    {v.example && (
                      <div className="text-sm italic text-foreground/75" dir="ltr">"{v.example}"</div>
                    )}
                    <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                      <span className="truncate">{t("vocab.fromStory")}: {story?.title ?? v.slug}</span>
                      <button
                        onClick={() => deleteWord(v)}
                        className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> {t("vocab.delete")}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* زر Practice ثابت بالأسفل — فوق شريط التبويبات الرئيسي (الرحلة/مفردات/المكتبة/البروفايل) في الجوال */}
      <div
        className="fixed inset-x-0 z-40 border-t border-border bg-background/95 px-4 pb-3 pt-3 backdrop-blur sm:hidden"
        style={{ bottom: "calc(4rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isAr ? "تدرّب" : "Practice"}
          </button>
        </div>
      </div>

      {/* نفس الزر لكن ملاصق للأسفل في الديسكتوب (ما فيه شريط تبويبات ثابت هناك) */}
      <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-border bg-background/95 px-4 pb-6 pt-3 backdrop-blur sm:block">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isAr ? "تدرّب" : "Practice"}
          </button>
        </div>
      </div>

      {/* شيت خيارات التدريب */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setSheetOpen(false)}>
          <div
            className="w-full max-w-3xl rounded-t-3xl bg-card p-6 pb-8 sm:mb-0"
            style={{ marginBottom: "calc(4rem + env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-muted" />
            <div className="grid grid-cols-3 gap-3 text-center">
              <PracticeOption
                icon={<Layers className="h-6 w-6" />}
                label={isAr ? "بطاقات" : "Flash Cards"}
                onClick={() => {
                  setSheetOpen(false);
                  setMode("flashcards");
                }}
              />
              <PracticeOption
                icon={<ListChecks className="h-6 w-6" />}
                label={isAr ? "اختيار من متعدد" : "Multiple choice"}
                onClick={() => {
                  setSheetOpen(false);
                  setMode("quiz");
                }}
              />
              <PracticeOption
                icon={<Swords className="h-6 w-6" />}
                label={isAr ? "تحدي" : "Challenge"}
                onClick={() => setSheetOpen(false)}
                comingSoon
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function PracticeOption({
  icon,
  label,
  onClick,
  comingSoon,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  comingSoon?: boolean;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      {comingSoon && <span className="text-[10px] text-muted-foreground">قريبًا</span>}
    </button>
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

/* ----------------------------- وضع البطاقات التعليمية (Flash Cards) ----------------------------- */

function FlashCardsTab({
  vocab,
  setVocab,
}: {
  vocab: SavedWord[];
  setVocab: (v: SavedWord[] | ((prev: SavedWord[]) => SavedWord[])) => void;
}) {
  const { t, lang } = useT();
  const isAr = lang === "ar";
  const { addXp } = useXp();

  const [order] = useState<string[]>(() => vocab.map(wordId));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const currentId = order[idx];
  const current = useMemo(() => vocab.find((v) => wordId(v) === currentId), [vocab, currentId]);

  const total = order.length;
  const done = idx >= total;

  const grade = (g: Grade) => {
    if (!current) return;
    const next = schedule(current, g);
    setVocab((prev) =>
      prev.map((v) =>
        v.word === current.word && v.slug === current.slug ? { ...v, ...next } : v,
      ),
    );
    if (g !== "again") {
      addXp(XP_REWARDS.reviewGood, `flashcard:${current.word}`);
      setXpEarned((n) => n + XP_REWARDS.reviewGood);
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  if (total === 0) {
    return (
      <div className="pt-6 text-center text-muted-foreground">
        {isAr ? "ما فيه كلمات هنا حالياً" : "No words here right now"}
      </div>
    );
  }

  if (done) {
    return (
      <div className="pt-6 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mb-2 font-serif text-2xl">{isAr ? "خلصت البطاقات!" : "Done!"}</h2>
        {xpEarned > 0 && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground">
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

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{idx} / {total}</span>
          {xpEarned > 0 && (
            <span className="inline-flex items-center gap-1 font-medium text-yellow-600 dark:text-yellow-400">
              <Zap className="h-3.5 w-3.5" />+{xpEarned}
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full paper-card p-10 text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="font-serif text-4xl" dir="ltr">{current.word}</span>
          <SpeakIconButton word={current.word} idPrefix="flash" />
        </div>
        {current.pos && <p className="text-xs text-muted-foreground">{current.pos}</p>}

        {flipped ? (
          <div className="mt-6 space-y-3 animate-fade-in">
            <div dir="rtl" lang="ar" className="text-2xl text-foreground">{current.ar || "—"}</div>
            <div className="text-sm text-muted-foreground" dir="ltr">{current.def}</div>
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            {isAr ? "اضغط لعرض المعنى" : "Tap to reveal meaning"}
          </p>
        )}
      </button>

      {flipped && (
        <div className="mt-5 grid grid-cols-3 gap-2 animate-fade-in">
          <GradeButton onClick={() => grade("again")} tone="destructive" icon={<RotateCcw className="h-4 w-4" />}>
            {isAr ? "أعيد" : "Again"}
          </GradeButton>
          <GradeButton onClick={() => grade("hard")} tone="muted">
            {isAr ? "صعبة" : "Hard"}
          </GradeButton>
          <GradeButton onClick={() => grade("good")} tone="primary" icon={<Check className="h-4 w-4" />}>
            {isAr ? "أعرفها" : "Good"}
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

/* ----------------------------- تبويب الاختبار (Multiple choice) ----------------------------- */

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

      <div className="paper-card p-8 text-center">
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
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${speaking ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-primary"}`}
      aria-label={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
      title={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
