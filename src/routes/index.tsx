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
import { Flame, BookOpen, ArrowRight, Target, Zap, Mic, MicOff, Volume2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";

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

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = ar ? "ar-SA" : "en-US";
    window.speechSynthesis.speak(utter);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(ar ? "المتصفح لا يدعم التعرف على الصوت" : "Browser doesn't support voice recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = ar ? "ar-SA" : "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = async (e: any) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      setListening(false);
      setThinking(true);

      try {
        const storyList = stories.map(s => `- ${s.title} (${s.level})`).join("\n");
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash:free",
            messages: [
              {
                role: "system",
                content: `You are a helpful English learning assistant for Arabic speakers. 
Here are the available stories:\n${storyList}\n
When the user asks for story recommendations, suggest 1-3 stories by their exact titles.
Reply in ${ar ? "Arabic" : "English"} in 2-3 sentences. End with the story titles you recommend wrapped in [SUGGEST: title1, title2].`
              },
              { role: "user", content: text }
            ]
          })
        });

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content || "";

        const match = message.match(/\[SUGGEST:\s*([^\]]+)\]/);
        if (match) {
          const titles = match[1].split(",").map((t: string) => t.trim());
          const found = stories.filter(s => titles.some(t => s.title.toLowerCase().includes(t.toLowerCase())));
          setSuggestedStories(found);
        }

        const cleanReply = message.replace(/\[SUGGEST:[^\]]+\]/, "").trim();
        setReply(cleanReply);
        speak(cleanReply);
      } catch {
        setReply(ar ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong, try again");
      } finally {
        setThinking(false);
      }
    };

    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
    setReply("");
    setSuggestedStories([]);
    setTranscript("");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <section className="mb-8 rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-primary" />
        <h2 className="font-serif text-lg">{ar ? "مساعد القراءة الصوتي" : "Voice Reading Assistant"}</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {ar ? "تحدث معي واقترح لك قصة تناسبك" : "Talk to me and I'll suggest a story for you"}
      </p>

      <button
        onClick={listening ? stopListening : startListening}
        disabled={thinking}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
          listening
            ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        } disabled:opacity-50`}
      >
        {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {thinking
          ? (ar ? "جاري التفكير..." : "Thinking...")
          : listening
          ? (ar ? "اضغط للإيقاف" : "Tap to stop")
          : (ar ? "ابدأ التحدث" : "Start talking")}
      </button>

      {transcript && (
        <p className="mt-3 text-sm text-muted-foreground">
          🎤 {transcript}
        </p>
      )}

      {reply && (
        <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
          {reply}
        </div>
      )}

      {suggestedStories.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-primary uppercase tracking-wide">
            {ar ? "القصص المقترحة" : "Suggested Stories"}
          </p>
          <div className="grid gap-3">
            {suggestedStories.map(s => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      )}
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
        <p className="mb-7 max-w-xl text-base text-muted-foreground">
          {t("home.sub")}
        </p>
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

      {/* Pricing Banner */}
      {!subLoading && !isPro && (
        <section className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="mb-1 text-xs uppercase tracking-widest text-primary">
            {ar ? "ترقية" : "Upgrade"}
          </div>
          <h2 className="mb-1 font-serif text-xl">
            {ar ? "افتح كل القصص 📚" : "Unlock all stories 📚"}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {ar
              ? "اشترك للوصول لجميع القصص والمستويات بدون حدود"
              : "Subscribe to access all stories and levels without limits"}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openCheckout(import.meta.env.VITE_PADDLE_MONTHLY_PRICE_ID)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {ar ? "شهري — $5" : "Monthly — $5"}
            </button>
            <button
              onClick={() => openCheckout(import.meta.env.VITE_PADDLE_YEARLY_PRICE_ID)}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {ar ? "سنوي — $30" : "Yearly — $30"}
            </button>
          </div>
        </section>
      )}

      {/* XP Progress */}
      <section className="mb-8 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">{level.icon} {ar ? level.nameAr : level.nameEn}</span>
          {xpToNext > 0 && (
            <span className="text-xs text-muted-foreground">
              {ar ? `${xpToNext} XP للمستوى التالي` : `${xpToNext} XP to next level`}
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${lvlProgress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          {LEVELS.map((l) => (
            <span key={l.name} className={xp >= l.minXp ? "text-primary font-medium" : ""}>
              {l.icon} {ar ? l.nameAr : l.nameEn}
            </span>
          ))}
        </div>
      </section>

      {/* Daily Goal */}
      <section className="mb-8 rounded-xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-medium">{ar ? "هدف اليوم" : "Daily goal"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
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

      {/* Continue Reading */}
      {continueStory && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl">{t("home.continue")}</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${continueStory.coverHue} text-2xl`}>
              {continueStory.cover}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 truncate font-serif text-base">{continueStory.title}</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${continueEntry![1].pct}%` }} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{continueEntry![1].pct}% {t("home.readPct")}</div>
            </div>
            <ArrowRight className={`${arrowClass} shrink-0 text-muted-foreground`} />
          </Link>
        </section>
      )}

      {/* Featured Stories */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">{t("home.featured")}</h2>
          <Link to="/library" className="text-sm text-primary hover:underline">{t("home.viewAll")}</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">{icon} {label}</div>
      <div className="font-serif text-2xl font-medium">{value}</div>
    </div>
  );
}

function GoalBar({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{current}/{max}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
