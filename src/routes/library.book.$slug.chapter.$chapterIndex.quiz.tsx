import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import {
  getLibraryBookMeta,
  getLibraryChapterList,
  getLibraryChapterContent,
  getChapterQuiz,
  unlockChapter,
  type QuizQuestion,
} from "@/lib/library.service";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/library/book/$slug/chapter/$chapterIndex/quiz")({
  component: ChapterQuizPage,
});

function ChapterQuizPage() {
  const { slug, chapterIndex } = Route.useParams();
  const index = Number(chapterIndex);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookTitle, setBookTitle] = useState("");
  const [chapterCount, setChapterCount] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [meta, chapterList, chapter] = await Promise.all([
          getLibraryBookMeta(slug),
          getLibraryChapterList(slug),
          getLibraryChapterContent(slug, index),
        ]);
        setBookTitle(meta.title);
        setChapterCount(chapterList.length);
        const q = await getChapterQuiz(slug, index, chapter.content, chapter.heading);
        setQuestions(q);
        setAnswers(q.map(() => null));
      } catch (err: any) {
        console.error("[library quiz] failed to load", err);
        setError(err?.message ?? String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, index]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 text-sm" dir="ltr">
        library quiz error: {error}
      </div>
    );
  }

  if (loading || !questions) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        جاري تجهيز أسئلة الفصل...
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a === questions[i].answer ? 1 : 0),
    0
  );
  const isLast = index === chapterCount - 1;

  const handleContinue = async () => {
    if (user) {
      try {
        await unlockChapter(slug, index + 2);
      } catch (err) {
        console.error("[library] failed to unlock next chapter", err);
      }
    }
    if (isLast) {
      navigate({ to: "/library/book/$slug", params: { slug } });
    } else {
      navigate({
        to: "/library/book/$slug/chapter/$chapterIndex",
        params: { slug, chapterIndex: String(index + 1) },
      });
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
        أسئلة استيعاب
      </p>
      <h1 className="mb-6 font-serif text-2xl">
        {bookTitle} — الفصل {index + 1}
      </h1>

      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={i} className="paper-card p-5">
            <p className="mb-3 font-serif text-lg">
              {i + 1}. {q.q}
            </p>
            <div className="grid gap-2">
              {q.choices.map((choice, ci) => {
                const selected = answers[i] === ci;
                const correct = submitted && ci === q.answer;
                const wrong = submitted && selected && ci !== q.answer;
                return (
                  <button
                    key={ci}
                    type="button"
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((prev) => prev.map((p, idx) => (idx === i ? ci : p)))
                    }
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                      correct
                        ? "border-emerald-500 bg-emerald-500/10"
                        : wrong
                          ? "border-destructive bg-destructive/10"
                          : selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px]">
                      {String.fromCharCode(65 + ci)}
                    </span>
                    <span className="flex-1">{choice}</span>
                    {correct && <Check className="h-4 w-4 text-emerald-600" />}
                    {wrong && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="mt-8 w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          تأكيد الإجابات
        </button>
      ) : (
        <div className="mt-8 paper-card p-6 text-center">
          <p className="font-serif text-2xl">
            نتيجتك: {score} / {questions.length}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setAnswers(questions.map(() => null));
                setSubmitted(false);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> إعادة المحاولة
            </button>
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              {isLast ? "إنهاء الكتاب" : "الفصل التالي"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
