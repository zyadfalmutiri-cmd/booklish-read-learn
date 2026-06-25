import { useSubscription } from "@/hooks/use-subscription";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, Link } from "@tanstack/react-router";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useXp, LEVELS } from "@/lib/xp";
import { useStats } from "@/lib/stats";
import type { SavedWord } from "@/lib/types";
import { Flame, BookOpen, ArrowRight, Target, Zap, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useState, useRef } from "react";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/")({
  component: Home,
});

const DAILY_WORD_GOAL = 5;
const DAILY_READ_GOAL_MIN = 5;

function todayString() {
  const d = new Date();
  return d.toDateString();
}

function VoiceAssistant({ ar }: { ar: boolean }) {
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [suggestedStories, setSuggestedStories] = useState<typeof stories>([]);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    window.speechSynthesis.speak(utter);
  };

  const processText = async (text: string) => {
    setTranscript(text);
    setListening(false);
    setThinking(true);
    setReply("");
    setSuggestedStories([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setReply("خطأ: مفتاح API غير موجود - VITE_GEMINI_API_KEY");
        return;
      }

      const storyList = stories
        .map((s) => `- ${s.title} (${s.level}, ${s.genre})`)
        .join("\n");

      const systemPrompt = `You are a helpful English learning assistant for Arabic speakers in Booklish app.
Available stories:
${storyList}

Suggest 1-3 stories based on user interest or level.
Reply in Arabic in 2-3 friendly sentences.
If suggesting stories, end with: [SUGGEST: Title1, Title2]
Use exact English titles from the list.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemPrompt + "\n\nUser: " + text }
                ]
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        setReply(`خطأ HTTP ${response.status}: ${errText.slice(0, 200)}`);
        return;
      }

      const data = await response.json();
      const message = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const match = message.match(/\[SUGGEST:\s*([^\]]+)\]/);
      if (match) {
        const titles = match[1].split(",").map((t: string) => t.trim());
        const found = stories.filter((s) =>
          titles.some((t) => s.title.toLowerCase().includes(t.toLowerCase()))
        );
        setSuggestedStories(found);
      }

      const cleanReply = message.replace(/\[SUGGEST:[^\]]+\]/, "").trim();
      setReply(cleanReply);
      speak(cleanReply);
    } catch (err: any) {
      setReply(`خطأ: ${err?.message || String(err)}`);
    } finally {
      setThinking(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setReply(ar ? "المتصفح لا يدعم التعرف على الصوت" : "Browser doesn't support voice recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    let finalTranscript = "";

    recognition.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript || interim);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        recognition.stop();
        const text = finalTranscript.trim() || interim.trim();
        if (text) processText(text);
      }, 3000);
    };

    recognition.onerror = (e: any) => {
      if (e.error === "no-speech") {
        setReply(ar ? "لم أسمع شيئاً، حاول مرة أخرى" : "No speech detected, try again");
      } else {
        setReply(`${ar ? "خطأ" : "Error"}: ${e.error}`);
      }
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };

    recognition.start();
    setListening(true);
    setReply("");
    setSuggestedStories([]);
    setTranscript("");
    finalTranscript = "";
  };

  const stopListening = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    recognitionRef.current?.stop();
    setListening(false);
  };

  const clearAll = () => {
    setTranscript("");
    setReply("");
    setSuggestedStories([]);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
          <Volume2 className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-base font-medium">
            {ar ? "مساعد القراءة" : "Reading Assistant"}
          </h2>
          <p className="text-xs text-muted-foreground truncate">
            {ar ? "تحدث واقترح لك قصة مناسبة" : "Speak to get story suggestions"}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={listening ? stopListening : startListening}
            disabled={thinking}
            className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              listening
                ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                : "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
            } disabled:opacity-50`}
          >
            {listening && (
              <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20 pointer-events-none" />
            )}
            {listening ? (
              <MicOff className="h-4 w-4 relative z-10" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            <span className="relative z-10">
              {thinking
                ? (ar ? "جاري التفكير..." : "Thinking...")
                : listening
                ? (ar ? "يستمع... (3 ث صمت)" : "Listening... (3s silence)")
                : (ar ? "اضغط وتحدث" : "Tap & speak")}
            </span>
          </button>

          {(transcript || reply) && (
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {ar ? "مسح" : "Clear"}
            </button>
          )}
        </div>

        {transcript && (
          <div className="flex gap-2 items-start">
            <span className="mt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wide shrink-0 w-10 text-center">
              {ar ? "أنت" : "You"}
            </span>
            <p className="text-sm bg-muted/50 rounded-xl px-3 py-2 flex-1 leading-relaxed">
              {transcript}
            </p>
          </div>
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary shrink-0" />
            <span>{ar ? "يفكر..." : "Thinking..."}</span>
          </div>
        )}

        {reply && !thinking && (
          <div className="flex gap-2 items-start">
            <span className="mt-1 text-[10px] font-bold text-primary uppercase tracking-wide shrink-0 w-10 text-center">
              AI
            </span>
            <p className="text-sm bg-primary/5 border border-primary/15 rounded-xl px-3 py-2.5 flex-1 leading-relaxed">
              {reply}
            </p>
          </div>
        )}

        {suggestedStories.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {ar ? "مقترح لك" : "Suggested for you"}
            </p>
            <div className="grid gap-2">
              {suggestedStories.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Home() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [vocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [stats] = useStats();
  const { streak } = useStreak();
  const { xp, level, progress: lvlProgress, xpToNext } = useXp();
  const { t, lang, dir } = useT();
  const { isPro, loading: subLoading } = useSubscription();
  const { user } = useAuth();
  const ar = lang === "ar";

  const continueEntry = Object.entries(progress)
    .filter(([, v]) => !v.finished && v.pct > 0)
    .sort((a, b) => b[1].lastAt - a[1].lastAt)[0];

  const continueStory = continueEntry ? stories.find((s) => s.slug === continueEntry[0]) : undefined;
  const finishedCount = Object.values(progress).filter((p) => p.finished).length;
  const todayStr = todayString();
  const todayWords = vocab.filter((v) => new Date(v.at).toDateString() === todayStr).length;
  const readMinutesToday = Math.floor((stats.dailyMinutes ?? {})[todayStr] ?? 0);
  const featured = stories.filter((s) => s.level === "beginner").slice(0, 3);
  const arrowClass = dir === "rtl" ? "h-4 w-4 rotate-180" : "h-4 w-4";

  const openCheckout = (priceId: string) => {
    if (typeof window !== "undefined" && (window as any).Paddle && user) {
      (window as any).Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email: user.email },
        customData: { user_id: user.id },
      });
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:pt-14">

      {/* Hero */}
      <section className="mb-10 sm:mb-14">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">{t("home.kicker")}</p>
        <h1 className="mb-5 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mb-7 max-w-xl text-base text-muted-foreground">{t("home.sub")}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            {t("home.browse")}
            <ArrowRight className={arrowClass} />
          </Link>
          <Link
            to="/review"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {ar ? "راجع كلماتك" : "Review words"}
          </Link>
        </div>
      </section>

      {/* Stats Row */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={<Flame className="h-4 w-4 text-orange-500" />}
          value={String(streak.current)}
          label={ar ? "أيام متتالية" : "Day streak"}
        />
        <StatCard
          icon={<BookOpen className="h-4 w-4 text-primary" />}
          value={String(finishedCount)}
          label={ar ? "قصص مكتملة" : "Stories done"}
        />
        <StatCard
          icon={<Zap className="h-4 w-4 text-yellow-500" />}
          value={`${xp} XP`}
          label={`${level.icon} ${ar ? level.nameAr : level.nameEn}`}
        />
        <StatCard
          icon={<Target className="h-4 w-4 text-emerald-500" />}
          value={`${todayWords}/${DAILY_WORD_GOAL}`}
          label={ar ? "كلمات اليوم" : "Words today"}
        />
      </section>

      {/* Voice Assistant */}
      <VoiceAssistant ar={ar} />

      {/* Continue Reading */}
      {continueStory && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl">{t("home.continue")}</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${continueStory.coverHue} text-2xl shadow-sm`}>
              {continueStory.cover}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 truncate font-serif text-base">{continueStory.title}</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${continueEntry![1].pct}%` }} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {continueEntry![1].pct}% {t("home.readPct")}
              </div>
            </div>
            <ArrowRight className={`${arrowClass} shrink-0 text-muted-foreground`} />
          </Link>
        </section>
      )}

      {/* Daily Goal */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-medium">{ar ? "هدف اليوم" : "Daily goal"}</h2>
        </div>
        <div className="p-4 grid gap-4 sm:grid-cols-2">
          <GoalBar
            label={ar ? `اقرأ ${DAILY_READ_GOAL_MIN} دقائق` : `Read ${DAILY_READ_GOAL_MIN} minutes`}
            current={readMinutesToday}
            max={DAILY_READ_GOAL_MIN}
            color="bg-primary"
          />
          <GoalBar
            label={ar ? `احفظ ${DAILY_WORD_GOAL} كلمات` : `Save ${DAILY_WORD_GOAL} words`}
            current={Math.min(todayWords, DAILY_WORD_GOAL)}
            max={DAILY_WORD_GOAL}
            color="bg-emerald-500"
          />
        </div>
      </section>

      {/* XP Progress */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{level.icon} {ar ? level.nameAr : level.nameEn}</span>
            {xpToNext > 0 && (
              <span className="text-xs text-muted-foreground">
                {ar ? `${xpToNext} XP للمستوى التالي` : `${xpToNext} XP to next level`}
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
              style={{ width: `${lvlProgress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
            {LEVELS.map((l) => (
              <span key={l.name} className={xp >= l.minXp ? "text-primary font-medium" : ""}>
                {l.icon}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">{t("home.featured")}</h2>
          <Link to="/library" className="text-sm text-primary hover:underline">
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

      {/* Pricing Banner */}
      {!subLoading && !isPro && (
        <section className="mb-8 overflow-hidden rounded-2xl border border-primary/30 shadow-sm">
          <div className="bg-gradient-to-br from-primary/15 via-primary/8 to-transparent p-5">
            <div className="mb-1 text-xs uppercase tracking-widest text-primary font-medium">
              {ar ? "ترقية" : "Upgrade"}
            </div>
            <h2 className="mb-2 font-serif text-xl font-medium">
              {ar ? "افتح كل القصص" : "Unlock all stories"}
            </h2>
            <ul className="mb-4 space-y-1 text-sm text-muted-foreground list-none">
              <li>{ar ? "- جميع القصص والمستويات" : "- All stories and levels"}</li>
              <li>{ar ? "- حفظ كلمات بلا حدود" : "- Unlimited word saving"}</li>
              <li>{ar ? "- بدون إعلانات" : "- Ad-free experience"}</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openCheckout(import.meta.env.VITE_PADDLE_MONTHLY_PRICE_ID)}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                {ar ? "شهري - $5" : "Monthly - $5"}
              </button>
              <div className="relative">
                <button
                  onClick={() => openCheckout(import.meta.env.VITE_PADDLE_YEARLY_PRICE_ID)}
                  className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  {ar ? "سنوي - $30" : "Yearly - $30"}
                </button>
                <span className="absolute -top-2 -right-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {ar ? "50%" : "50% off"}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon} {label}
      </div>
      <div className="font-serif text-2xl font-medium">{value}</div>
    </div>
  );
}

function GoalBar({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{current}/{max}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
