import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, RotateCcw, BookmarkPlus } from "lucide-react";
import { getStory } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";

interface ScoreMap { [slug: string]: { score: number; total: number; at: number } }
interface SavedWord { word: string; ar: string; def: string; example: string; slug: string; at: number }

export const Route = createFileRoute("/quiz/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Quiz: ${loaderData.story.title} — Booklish` }] : [],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { story } = Route.useLoaderData() as { story: import("@/lib/types").Story };
  const [answers, setAnswers] = useState<(number | null)[]>(() => story.quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [, setScores] = useLocalStore<ScoreMap>(storeKeys.quizScores, {});
  const [, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);

  const submit = () => {
    const score = answers.reduce((acc, a, i) => acc + (a === story.quiz[i].answer ? 1 : 0), 0);
    setScores((prev) => ({ ...prev, [story.slug]: { score, total: story.quiz.length, at: Date.now() } }));
    setSubmitted(true);
  };

  const score = answers.reduce<number>((acc, a, i) => acc + (a === story.quiz[i].answer ? 1 : 0), 0);
  const allAnswered = answers.every((a) => a !== null);

  const saveMissedVocab = () => {
    const missedVocab = story.quiz
      .map((q, i) => ({ q, i }))
      .filter(({ q, i }) => q.kind === "vocab" && answers[i] !== q.answer);
    const entries = Object.entries(story.vocab);
    setVocab((prev) => {
      const next = [...prev];
      for (const { q } of missedVocab) {
        // Match a vocab word that appears in the question text
        const found = entries.find(([w]) => q.q.toLowerCase().includes(w));
        if (found && !next.some((v) => v.word === found[0] && v.slug === story.slug)) {
          next.push({ word: found[0], ...found[1], slug: story.slug, at: Date.now() });
        }
      }
      return next;
    });
  };

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Comprehension</p>
      <h1 className="mb-6 font-serif text-3xl">{story.title}</h1>

      <ol className="space-y-6">
        {story.quiz.map((q, i) => (
          <li key={i} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <p className="font-serif text-lg">{i + 1}. {q.q}</p>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {q.kind === "main-idea" ? "Main idea" : q.kind === "event" ? "Event" : "Vocabulary"}
              </span>
            </div>
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
                    onClick={() => setAnswers((prev) => prev.map((p, idx) => (idx === i ? ci : p)))}
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
          onClick={submit}
          disabled={!allAnswered}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
        >
          Submit answers
        </button>
      ) : (
        <div className="mt-8 rounded-xl border border-border bg-card p-6 text-center">
          <p className="font-serif text-2xl">You scored {score} / {story.quiz.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {score === story.quiz.length ? "Perfect — masterful reading." : score >= story.quiz.length / 2 ? "Nice work. Try the missed ones again later." : "Re-read the story and try again."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={saveMissedVocab}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              <BookmarkPlus className="h-4 w-4" /> Save missed words to vocab
            </button>
            <button
              onClick={() => { setAnswers(story.quiz.map(() => null)); setSubmitted(false); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> Try again
            </button>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Back to library
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
