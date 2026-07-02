import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Volume2, Check, X, RotateCcw, ArrowLeft, Zap, Square } from "lucide-react";
import { getStory } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useXp, XP_REWARDS } from "@/lib/xp";
import { syncNow } from "@/lib/sync";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/shadow/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Shadowing: ${loaderData.story.title} — Booklish` }] : [],
  }),
  component: ShadowPage,
});

// ---------- helpers ----------

function extractSentences(paragraphs: string[]): string[] {
  const joined = paragraphs.join(" ");
  const matches = joined.match(/[^.!?]+[.!?]+/g) ?? [];
  return matches
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 4)
    .slice(0, 8);
}

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .split(/\s+/)
    .filter(Boolean);
}

interface WordCheck {
  word: string;
  matched: boolean;
}

function compareSentences(target: string, spoken: string): { words: WordCheck[]; score: number } {
  const targetWords = normalizeWords(target);
  const spokenPool = normalizeWords(spoken);

  const words: WordCheck[] = targetWords.map((w) => {
    const idx = spokenPool.indexOf(w);
    if (idx !== -1) {
      spokenPool.splice(idx, 1); // consume so duplicates match correctly
      return { word: w, matched: true };
    }
    return { word: w, matched: false };
  });

  const correctCount = words.filter((w) => w.matched).length;
  const score = targetWords.length > 0 ? Math.round((correctCount / targetWords.length) * 100) : 0;
  return { words, score };
}

function getSpeechRecognitionCtor(): any {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

// ---------- component ----------

type AttemptState = "idle" | "listening" | "result" | "error";

interface Attempt {
  spokenText: string;
  words: WordCheck[];
  score: number;
}

function ShadowPage() {
  const { story } = Route.useLoaderData() as { story: import("@/lib/types").Story };
  const { t, lang } = useT();
  const { addXp } = useXp();
  const { user } = useAuth();
  const [, setScores] = useLocalStore<Record<string, { avgScore: number; total: number; at: number }>>(
    storeKeys.shadowingScores,
    {}
  );

  const sentences = useRef(extractSentences(story.paragraphs)).current;
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<AttemptState>("idle");
  const [attempts, setAttempts] = useState<(Attempt | null)[]>(() => sentences.map(() => null));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const recognitionRef = useRef<any>(null);
  const supported = !!getSpeechRecognitionCtor();

  const current = sentences[index];
  const currentAttempt = attempts[index];

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = useCallback(() => {
    if (!current || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(current);
    utter.lang = "en-US";
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }, [current]);

  const startRecording = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor || !current) return;

    setErrorMsg(null);
    setState("listening");

    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string;
      const { words, score } = compareSentences(current, transcript);
      const attempt: Attempt = { spokenText: transcript, words, score };
      setAttempts((prev) => prev.map((a, i) => (i === index ? attempt : a)));
      setState("result");
    };

    recognition.onerror = (event: any) => {
      setState("error");
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setErrorMsg(
          lang === "ar" ? "الرجاء السماح بالوصول للميكروفون من إعدادات المتصفح" : "Please allow microphone access"
        );
      } else {
        setErrorMsg(lang === "ar" ? "تعذر التعرف على الصوت، حاول مرة أخرى" : "Couldn't hear you, try again");
      }
    };

    recognition.onend = () => {
      setState((s) => (s === "listening" ? "idle" : s));
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [current, index, lang]);

  const stopRecording = () => {
    recognitionRef.current?.stop?.();
  };

  const goNext = () => {
    if (index < sentences.length - 1) {
      setIndex((i) => i + 1);
      setState("idle");
      setErrorMsg(null);
    } else {
      finish();
    }
  };

  const finish = () => {
    const attempted = attempts.filter((a): a is Attempt => a !== null);
    const avgScore =
      attempted.length > 0 ? Math.round(attempted.reduce((sum, a) => sum + a.score, 0) / attempted.length) : 0;

    setScores((prev) => ({
      ...prev,
      [story.slug]: { avgScore, total: sentences.length, at: Date.now() },
    }));

    const earned = attempted.filter((a) => a.score >= 70).length * XP_REWARDS.quizCorrect;
    if (earned > 0) {
      addXp(earned, `shadow:${story.slug}`);
      setXpEarned(earned);
    }
    if (user) syncNow(user.id);
    setFinished(true);
  };

  const restart = () => {
    setIndex(0);
    setAttempts(sentences.map(() => null));
    setState("idle");
    setFinished(false);
    setXpEarned(0);
    setErrorMsg(null);
  };

  // ---------- no sentences fallback ----------
  if (sentences.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {lang === "ar" ? "لا توجد جمل مناسبة لهذا التمرين بهذه القصة" : "No suitable sentences for this story"}
        </p>
        <Link to="/library" className="mt-4 inline-block text-sm text-primary underline">
          {t("quiz.backLibrary")}
        </Link>
      </main>
    );
  }

  // ---------- finished screen ----------
  if (finished) {
    const attempted = attempts.filter((a): a is Attempt => a !== null);
    const avgScore =
      attempted.length > 0 ? Math.round(attempted.reduce((sum, a) => sum + a.score, 0) / attempted.length) : 0;

    return (
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
        <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          {lang === "ar" ? "الشادونق" : "Shadowing"}
        </p>
        <h1 className="mb-6 font-serif text-3xl">{story.title}</h1>

        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="font-serif text-2xl">
            {lang === "ar" ? "متوسط دقة النطق" : "Average pronunciation score"}: {avgScore}%
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {avgScore >= 90
              ? lang === "ar"
                ? "نطق ممتاز! 🎉"
                : "Excellent pronunciation!"
              : avgScore >= 70
              ? lang === "ar"
                ? "أداء جيد جدًا"
                : "Great job"
              : lang === "ar"
              ? "استمر بالتدريب، بتتحسن أكثر"
              : "Keep practicing, you'll improve"}
          </p>

          {xpEarned > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-700 dark:text-yellow-400">
              <Zap className="h-4 w-4" />
              +{xpEarned} XP
            </div>
          )}

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> {t("quiz.tryAgain")}
            </button>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {t("quiz.backLibrary")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---------- main practice screen ----------
  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {lang === "ar" ? "الشادونق" : "Shadowing"} · {index + 1}/{sentences.length}
        </p>
      </div>
      <h1 className="mb-6 font-serif text-2xl">{story.title}</h1>

      {!supported ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-center text-sm text-muted-foreground">
          {lang === "ar"
            ? "متصفحك لا يدعم التعرف على الصوت. جرب Chrome أو Safari على الجوال."
            : "Your browser doesn't support speech recognition. Try Chrome or mobile Safari."}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="mb-5 text-center font-serif text-xl leading-relaxed" dir="ltr">
            {current}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={speak}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm hover:bg-muted"
            >
              <Volume2 className="h-4 w-4" />
              {lang === "ar" ? "استمع" : "Listen"}
            </button>

            {state === "listening" ? (
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground"
              >
                <Square className="h-4 w-4" />
                {lang === "ar" ? "إيقاف" : "Stop"}
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Mic className="h-4 w-4" />
                {lang === "ar" ? "سجّل صوتك" : "Record"}
              </button>
            )}
          </div>

          {state === "listening" && (
            <p className="mt-4 animate-pulse text-center text-sm text-muted-foreground">
              {lang === "ar" ? "🎙️ جاري الاستماع..." : "🎙️ Listening..."}
            </p>
          )}

          {errorMsg && <p className="mt-4 text-center text-sm text-destructive">{errorMsg}</p>}

          {currentAttempt && state === "result" && (
            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-3 text-center text-sm text-muted-foreground" dir="ltr">
                {currentAttempt.words.map((w, i) => (
                  <span
                    key={i}
                    className={
                      w.matched
                        ? "mx-0.5 text-emerald-600 dark:text-emerald-400"
                        : "mx-0.5 text-destructive line-through"
                    }
                  >
                    {w.word}
                  </span>
                ))}
              </p>
              <p className="text-center font-serif text-lg">
                {currentAttempt.score}%{" "}
                {currentAttempt.score >= 90 ? "🎉" : currentAttempt.score >= 70 ? "👍" : "🔁"}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={startRecording}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
                >
                  <RotateCcw className="h-4 w-4" />
                  {lang === "ar" ? "أعد المحاولة" : "Try again"}
                </button>
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {index < sentences.length - 1 ? (lang === "ar" ? "التالي" : "Next") : lang === "ar" ? "إنهاء" : "Finish"}
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
