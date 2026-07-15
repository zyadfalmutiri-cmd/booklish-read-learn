import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  BookOpenText,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  GraduationCap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import type { StepVocabItem } from "@/types/step-vocab";

export const Route = createFileRoute("/oxford3000")({
  component: Oxford3000Page,
});

type Level = "A1" | "A2" | "B1" | "B2";
const LEVELS: Level[] = ["A1", "A2", "B1", "B2"];
const QUIZ_LENGTH = 10;

type Mode = "browse" | "quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Oxford3000Page() {
  const { lang } = useT();
  const isAr = lang === "ar";

  const [items, setItems] = useState<StepVocabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [mode, setMode] = useState<Mode>("browse");

  useEffect(() => {
    supabase
      .from("step_vocabulary")
      .select("*")
      .eq("source", "oxford3000")
      .order("word", { ascending: true })
      .then(({ data, error }) => {
        // TEMPORARY DIAGNOSTIC — remove after we find the issue
        if (error) {
          console.error("SUPABASE ERROR:", error);
          alert("Supabase error: " + JSON.stringify(error));
        } else {
          console.log("SUPABASE DATA COUNT:", data?.length);
          alert("Fetched rows: " + (data?.length ?? 0));
        }
        if (!error && data) setItems(data as StepVocabItem[]);
        setLoading(false);
      });
  }, []);

  const countsByLevel = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      const lvl = item.cefr_level ?? "?";
      counts[lvl] = (counts[lvl] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  const levelFiltered = useMemo(() => {
    if (level === "all") return items;
    return items.filter((i) => i.cefr_level === level);
  }, [items, level]);

  const browseFiltered = useMemo(() => {
    if (!query.trim()) return levelFiltered;
    const q = query.trim().toLowerCase();
    return levelFiltered.filter(
      (i) =>
        i.word.toLowerCase().includes(q) ||
        (i.meaning_ar ?? "").includes(query.trim())
    );
  }, [levelFiltered, query]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
      <Link
        to="/step"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        {isAr ? "رجوع لـ STEP" : "Back to STEP"}
      </Link>

      <div className="mb-1 flex items-center gap-2">
        <BookOpenText className="h-6 w-6 text-primary" />
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          {isAr ? "أهم 3000 كلمة" : "Top 3000 Words"}
        </h1>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {isAr
          ? `${items.length} كلمة أساسية من A1 إلى B2، مع معناها ومثال واختبارات`
          : `${items.length} essential words from A1 to B2, with meanings, examples, and quizzes`}
      </p>

      {/* Mode toggle */}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
        <button
          onClick={() => setMode("browse")}
          className={`rounded-full py-2 text-sm font-medium transition-colors ${
            mode === "browse"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {isAr ? "تصفح" : "Browse"}
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
            mode === "quiz"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          {isAr ? "اختبار" : "Quiz"}
        </button>
      </div>

      {/* Level filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setLevel("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            level === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground"
          }`}
        >
          {isAr ? "الكل" : "All"} ({items.length})
        </button>
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              level === lvl
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            {lvl} ({countsByLevel[lvl] ?? 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">
          {isAr ? "جارٍ التحميل..." : "Loading..."}
        </div>
      ) : mode === "browse" ? (
        <BrowseView
          isAr={isAr}
          query={query}
          setQuery={setQuery}
          filtered={browseFiltered}
        />
      ) : (
        <QuizView isAr={isAr} pool={levelFiltered} level={level} />
      )}
    </div>
  );
}

function BrowseView({
  isAr,
  query,
  setQuery,
  filtered,
}: {
  isAr: boolean;
  query: string;
  setQuery: (v: string) => void;
  filtered: StepVocabItem[];
}) {
  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isAr ? "ابحث عن كلمة..." : "Search a word..."}
          className="w-full rounded-full border border-border bg-background py-2.5 ps-9 pe-4 text-sm text-foreground"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          {isAr ? "لا توجد نتائج" : "No results"}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-background p-3.5"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span
                  className="font-serif text-base font-semibold text-foreground"
                  dir="ltr"
                >
                  {item.word}
                </span>
                <div className="flex items-center gap-2">
                  {item.cefr_level && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.cefr_level}
                    </span>
                  )}
                  <span className="text-sm font-medium text-primary">
                    {item.meaning_ar}
                  </span>
                </div>
              </div>
              {item.example_en && (
                <p className="text-xs italic text-muted-foreground" dir="ltr">
                  {item.example_en}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

interface QuizQuestion {
  item: StepVocabItem;
  options: string[];
  correctIndex: number;
}

function buildQuiz(pool: StepVocabItem[]): QuizQuestion[] {
  const usable = pool.filter((i) => i.meaning_ar);
  const picked = shuffle(usable).slice(0, Math.min(QUIZ_LENGTH, usable.length));

  return picked.map((item) => {
    const distractorPool = usable.filter(
      (i) => i.word !== item.word && i.meaning_ar !== item.meaning_ar
    );
    const distractors = shuffle(distractorPool)
      .slice(0, 3)
      .map((i) => i.meaning_ar);

    const options = shuffle([item.meaning_ar, ...distractors]);
    const correctIndex = options.indexOf(item.meaning_ar);

    return { item, options, correctIndex };
  });
}

function QuizView({
  isAr,
  pool,
  level,
}: {
  isAr: boolean;
  pool: StepVocabItem[];
  level: Level | "all";
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    startQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, level]);

  function startQuiz() {
    setQuestions(buildQuiz(pool));
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (pool.filter((i) => i.meaning_ar).length < 4) {
    return (
      <div className="rounded-xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
        {isAr
          ? "تحتاج على الأقل 4 كلمات بهذا المستوى لبدء اختبار."
          : "You need at least 4 words at this level to start a quiz."}
      </div>
    );
  }

  if (questions.length === 0) return null;

  if (finished) {
    return (
      <div className="rounded-xl border border-border bg-background p-6 text-center">
        <p className="mb-1 text-sm text-muted-foreground">
          {isAr ? "نتيجتك" : "Your score"}
        </p>
        <p className="mb-4 font-serif text-3xl font-semibold text-foreground">
          {score} / {questions.length}
        </p>
        <button
          onClick={startQuiz}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          {isAr ? "اختبار جديد" : "New quiz"}
        </button>
      </div>
    );
  }

  const q = questions[qIndex];

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {isAr ? "سؤال" : "Question"} {qIndex + 1} / {questions.length}
        </span>
        <span>
          {isAr ? "النتيجة" : "Score"}: {score}
        </span>
      </div>

      <div className="mb-4 rounded-xl border border-border bg-background p-6 text-center">
        <p className="mb-2 text-xs text-muted-foreground">
          {isAr ? "وش معنى هذي الكلمة؟" : "What does this word mean?"}
        </p>
        <p className="font-serif text-2xl font-semibold text-foreground" dir="ltr">
          {q.item.word}
        </p>
        {q.item.cefr_level && (
          <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {q.item.cefr_level}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correctIndex;
          const isSelected = idx === selected;
          const showState = selected !== null;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-sm font-medium transition-colors ${
                showState && isCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : showState && isSelected && !isCorrect
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-border bg-background text-foreground"
              }`}
            >
              <span>{opt}</span>
              {showState && isCorrect && (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              )}
              {showState && isSelected && !isCorrect && (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {q.item.example_en && selected !== null && (
        <p className="mt-3 text-xs italic text-muted-foreground" dir="ltr">
          {q.item.example_en}
        </p>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground"
        >
          {qIndex + 1 >= questions.length
            ? isAr
              ? "عرض النتيجة"
              : "Show result"
            : isAr
              ? "التالي"
              : "Next"}
        </button>
      )}
    </div>
  );
}
