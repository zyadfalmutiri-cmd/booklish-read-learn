import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  BookOpen,
  Zap,
  Clock,
  BookMarked,
  ArrowRight,
  Mic,
  Square,
  Play,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { stories } from "@/data/stories";
import { splitSentences } from "@/lib/tokenize";
import { useT } from "@/lib/i18n";
import { getPronunciationTip as getPronunciationTipFn } from "@/lib/api/speaking-ai.functions";

interface StoryCompletionProps {
  storySlug: string;
  storyTitle: string;
  readingSeconds: number;
  newWords: number;
  xpEarned: number;
  onDismiss: () => void;
}

function getNextStory(currentSlug: string) {
  const idx = stories.findIndex((s) => s.slug === currentSlug);
  return idx >= 0 && idx < stories.length - 1 ? stories[idx + 1] : null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m}m ${s}s`;
}

function pickShadowingSentences(storySlug: string, max = 5): string[] {
  const story = stories.find((s) => s.slug === storySlug);
  if (!story) return [];

  const allSentences = story.paragraphs.flatMap((p) => splitSentences(p));
  const candidates = allSentences
    .map((s) => s.trim())
    .filter((s) => {
      const words = s.split(/\s+/).filter(Boolean).length;
      return words >= 4 && words <= 16;
    });

  if (candidates.length === 0) return allSentences.slice(0, max);
  if (candidates.length <= max) return candidates;

  const picked: string[] = [];
  const step = candidates.length / max;
  for (let i = 0; i < max; i++) {
    picked.push(candidates[Math.floor(i * step)]);
  }
  return picked;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
}

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreAttempt(target: string, spoken: string) {
  const targetWords = normalizeWords(target);
  const spokenSet = new Set(normalizeWords(spoken));
  let matched = 0;
  const results = targetWords.map((w) => {
    const ok = spokenSet.has(w);
    if (ok) matched++;
    return { word: w, ok };
  });
  const score = targetWords.length ? Math.round((matched / targetWords.length) * 100) : 0;
  return { score, results };
}

function ShadowingPractice({ storySlug, ar }: { storySlug: string; ar: boolean }) {
  const sentences = useMemo(() => pickShadowingSentences(storySlug, 5), [storySlug]);
  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [result, setResult] = useState<{ score: number; results: { word: string; ok: boolean }[] } | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [tipLoading, setTipLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const spokenTextRef = useRef<string>("");

  const current = sentences[index];

  useEffect(() => {
    setRecordedUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setMicError(null);
    setResult(null);
    setTip(null);
  }, [index]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sentences.length === 0) return null;

  const runEvaluation = async (spokenText: string) => {
    const scored = scoreAttempt(current, spokenText);
    setResult(scored);

    if (scored.score < 100) {
      setTipLoading(true);
      const { tip } = await getPronunciationTipFn({
        data: { target: current, spoken: spokenText },
      });
      setTip(tip);
      setTipLoading(false);
    } else {
      setTip(ar ? "نطق ممتاز!" : "Perfect pronunciation!");
    }
  };

  const startRecording = async () => {
    setMicError(null);
    setResult(null);
    setTip(null);
    spokenTextRef.current = "";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };

      mediaRecorderRef.current = mr;
      mr.start();

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = true;
        recognition.onresult = (e: any) => {
          let text = "";
          for (let i = 0; i < e.results.length; i++) {
            text += e.results[i][0].transcript + " ";
          }
          spokenTextRef.current = text.trim();
        };
        recognition.start();
        recognitionRef.current = recognition;
      }

      setIsRecording(true);
    } catch {
      setMicError(
        ar
          ? "ما قدرنا نوصل للمايكروفون، تأكد من إعطاء الإذن للمتصفح"
          : "Couldn't access the microphone, check browser permissions",
      );
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
    setIsRecording(false);
    setTimeout(() => {
      runEvaluation(spokenTextRef.current);
    }, 400);
  };

  const playRecording = () => {
    if (!recordedUrl) return;
    const audio = new Audio(recordedUrl);
    audio.play();
  };

  const goNext = () => setIndex((i) => Math.min(sentences.length - 1, i + 1));
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));

  // 🎨 نفس عائلة الهوية بدل الأخضر/الأصفر/الأحمر القياسي:
  // زيتوني = ممتاز، نحاسي = مقبول، طيني (destructive) = يحتاج تحسين
  const scoreColor =
    result == null
      ? ""
      : result.score >= 80
        ? "text-secondary bg-secondary/10"
        : result.score >= 50
          ? "text-primary bg-primary/10"
          : "text-destructive bg-destructive/10";

  return (
    <div className="border-t border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {ar ? "تدرب على النطق" : "Pronunciation practice"}
        </h3>
        <div className="flex gap-1">
          {sentences.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-muted/40 p-4">
        <p dir="ltr" className="mb-4 text-center font-serif text-base leading-relaxed">
          {result
            ? result.results.map((r, i) => (
                <span
                  key={i}
                  className={r.ok ? "text-secondary" : "text-destructive underline decoration-dotted"}
                >
                  {r.word}{" "}
                </span>
              ))
            : current}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
            aria-label={ar ? "الجملة السابقة" : "Previous sentence"}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => speak(current)}
            className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Volume2 className="h-4 w-4" />
            {ar ? "استمع" : "Listen"}
          </button>

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isRecording
                ? "bg-destructive text-primary-foreground shadow-lg shadow-destructive/20"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isRecording ? (ar ? "إيقاف" : "Stop") : ar ? "سجل" : "Record"}
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={index === sentences.length - 1}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
            aria-label={ar ? "الجملة التالية" : "Next sentence"}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {micError && <p className="mt-3 text-center text-xs text-destructive">{micError}</p>}

        {result && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center">
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${scoreColor}`}>
                {ar ? "نسبة الدقة" : "Accuracy"}: {result.score}%
              </span>
            </div>

            {tipLoading && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                {ar ? "جاري تحليل نطقك..." : "Analyzing your pronunciation..."}
              </div>
            )}

            {tip && !tipLoading && (
              <p className="rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 text-center text-sm leading-relaxed">
                {tip}
              </p>
            )}
          </div>
        )}

        {recordedUrl && !isRecording && (
          <div className="mt-3 flex items-center justify-center">
            <button
              type="button"
              onClick={playRecording}
              className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <Play className="h-3.5 w-3.5" />
              {ar ? "تشغيل تسجيلك" : "Play your recording"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        {index + 1} / {sentences.length}
      </p>
    </div>
  );
}

export function StoryCompletion({
  storySlug,
  storyTitle,
  readingSeconds,
  newWords,
  xpEarned,
  onDismiss,
}: StoryCompletionProps) {
  const { lang } = useT();
  const ar = lang === "ar";
  const next = getNextStory(storySlug);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 pt-2 animate-slide-up"
      dir={ar ? "rtl" : "ltr"}
    >
      <div className="paper-card mx-auto max-w-lg overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              {ar ? "أنهيت القصة" : "Story complete"}
            </p>
            <p className="truncate font-serif text-base font-medium">{storyTitle}</p>
          </div>
          <button
            onClick={onDismiss}
            className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label={ar ? "إغلاق" : "Dismiss"}
          >
            {ar ? "إغلاق" : "Close"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border" dir="ltr">
          <StatItem
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            value={formatTime(readingSeconds)}
            label={ar ? "وقت القراءة" : "Read time"}
          />
          <StatItem
            icon={<BookMarked className="h-4 w-4 text-muted-foreground" />}
            value={String(newWords)}
            label={ar ? "كلمات جديدة" : "New words"}
          />
          <StatItem
            icon={<Zap className="h-4 w-4 text-primary" />}
            value={`+${xpEarned}`}
            label="XP"
          />
        </div>

        {/* Shadowing pronunciation practice */}
        <ShadowingPractice storySlug={storySlug} ar={ar} />

        {/* Actions */}
        <div className="flex flex-col gap-2 p-4 sm:flex-row">
          <Link
            to="/quiz/$slug"
            params={{ slug: storySlug }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            {ar ? "ابدأ اختبار المفردات" : "Start vocab quiz"}
          </Link>
          {next ? (
            <Link
              to="/read/$slug"
              params={{ slug: next.slug }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {ar ? "القصة التالية" : "Next story"}
              <ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} />
            </Link>
          ) : (
            <Link
              to="/library"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {ar ? "المكتبة" : "Back to library"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-4 px-3 text-center">
      {icon}
      <span className="font-serif text-xl font-medium">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
