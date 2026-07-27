import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, Link } from "@tanstack/react-router";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useXp, LEVELS } from "@/lib/xp";
import { useStats } from "@/lib/stats";
import type { SavedWord } from "@/lib/types";
import { getPreferredVoice, useVoicePrefs } from "@/lib/voices";
import { Flame, BookOpen, ArrowRight, Target, Zap, Mic, MicOff, MessageCircle, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useState, useRef } from "react";
import { getSpeakingPartnerReply } from "@/lib/api/speaking-ai.functions";

// 🔓 تحميل مبكر لقائمة الأصوات (بعض المتصفحات تحتاجها قبل أول استخدام)
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
}

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

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1";

const LEVEL_LABELS_AR: Record<LevelCode, string> = {
  A1: "مبتدئ",
  A2: "مبتدئ متوسط",
  B1: "متوسط",
  B2: "متوسط متقدم",
  C1: "متقدم",
};

function PublicLanding({ ar }: { ar: boolean }) {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:pt-14" dir={ar ? "rtl" : "ltr"}>
      <section className="mb-10 sm:mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">
          {ar ? "تعلم الإنجليزية بطريقة طبيعية" : "Learn English Naturally"}
        </p>
        <h1 className="mb-5 mx-auto max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl">
          Booklish
        </h1>
        <p className="mb-7 mx-auto max-w-xl text-base text-muted-foreground">
          {ar
            ? "اقرأ قصصًا قصيرة، اضغط على أي كلمة لمعناها، ومارس النطق والمحادثة بالذكاء الاصطناعي."
            : "Read short stories, tap any word for its meaning, and practice speaking with AI."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {ar ? "ابدأ الآن مجانًا" : "Get started free"}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3 mb-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-serif text-base mb-1">{ar ? "قصص تفاعلية" : "Interactive Stories"}</h3>
          <p className="text-sm text-muted-foreground">
            {ar ? "اضغط على أي كلمة لمعناها فورًا" : "Tap any word for instant meaning"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <div className="text-2xl mb-2">🎙️</div>
          <h3 className="font-serif text-base mb-1">{ar ? "شريك محادثة ذكي" : "AI Conversation Partner"}</h3>
          <p className="text-sm text-muted-foreground">
            {ar ? "تحدث بالإنجليزي واحصل على تصحيح فوري" : "Speak English and get instant feedback"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <div className="text-2xl mb-2">🔥</div>
          <h3 className="font-serif text-base mb-1">{ar ? "تتبع تقدمك" : "Track Your Progress"}</h3>
          <p className="text-sm text-muted-foreground">
            {ar ? "نقاط خبرة، مستويات، وسلسلة أيام" : "XP, levels, and daily streaks"}
          </p>
        </div>
      </section>
    </main>
  );
}

function SpeakingPartner({ ar }: { ar: boolean }) {
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [feedback, setFeedback] = useState("");
  const [level, setLevel] = useState<LevelCode | null>(null);
  const historyRef = useRef<ChatTurn[]>([]);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const [voicePrefs, setVoicePrefs] = useVoicePrefs();
const { accent, gender } = voicePrefs;
const setAccent = (a: "US" | "GB") => setVoicePrefs((p) => ({ ...p, accent: a }));
const setGender = (g: "male" | "female") => setVoicePrefs((p) => ({ ...p, gender: g }));


  const speak = (text: string) => {
    // نتأكد إن المايك متوقف كليًا عشان ما يصير تعارض بجلسة الصوت على آيفون
    try {
      recognitionRef.current?.abort();
    } catch {}

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = accent === "US" ? "en-US" : "en-GB";
    utter.volume = 1;
    utter.rate = 1;
    utter.pitch = 1;

    // نحاول نلقط الصوت المفضل حسب اللكنة والجنس المختارين
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = getPreferredVoice(voices, accent, gender);
    if (preferredVoice) utter.voice = preferredVoice;

    utter.onerror = (e: any) => {
      console.warn("TTS error:", e?.error || e);
    };

    // تأخير بسيط جدًا يساعد آيفون يحرر جلسة المايك قبل التشغيل
    setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, 150);
  };

  const processText = async (text: string) => {
    setTranscript(text);
    setListening(false);
    setThinking(true);
    setReply("");
    setFeedback("");

    try {
      const systemPrompt = `You are a friendly, patient English speaking partner for an Arabic-speaking English learner using the Booklish app.
Your job every turn:
1. Continue a natural, simple spoken conversation in English. Keep your reply short (1-3 sentences), warm, and ask a small follow-up question to keep the user talking.
2. Silently evaluate the user's LAST message for grammar mistakes, wrong word choices, or awkward sentence structure.
3. Estimate the user's overall spoken English level using CEFR: A1, A2, B1, B2, or C1.

Respond in EXACTLY this format, nothing else:
REPLY: <your English conversational reply>
FEEDBACK: <feedback in Arabic about mistakes in the user's last sentence, be specific and give the corrected sentence. If there were no mistakes, write "ممتاز! ما فيه أخطاء بهذي الجملة.">
LEVEL: <A1|A2|B1|B2|C1>`;

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
        ...historyRef.current,
        { role: "user", content: text },
      ];

      let message = "";
      try {
        const result = await getSpeakingPartnerReply({ data: { messages } });
        message = result.raw;
      } catch (err: any) {
        setReply(`${ar ? "خطأ" : "Error"}: ${err?.message || String(err)}`);
        return;
      }

      const replyMatch = message.match(/REPLY:\s*([\s\S]*?)(?=FEEDBACK:|$)/i);
      const feedbackMatch = message.match(/FEEDBACK:\s*([\s\S]*?)(?=LEVEL:|$)/i);
      const levelMatch = message.match(/LEVEL:\s*(A1|A2|B1|B2|C1)/i);

      const replyText = replyMatch ? replyMatch[1].trim() : message.trim();
      const feedbackText = feedbackMatch ? feedbackMatch[1].trim() : "";
      const levelCode = levelMatch ? (levelMatch[1].toUpperCase() as LevelCode) : null;

      setReply(replyText);
      setFeedback(feedbackText);
      if (levelCode) setLevel(levelCode);

      historyRef.current = [
        ...historyRef.current,
        { role: "user", content: text },
        { role: "assistant", content: replyText },
      ].slice(-12);

      speak(replyText);
    } catch (err: any) {
      setReply(`${ar ? "خطأ" : "Error"}: ${err?.message || String(err)}`);
    } finally {
      setThinking(false);
    }
  };

  const startListening = () => {
    // 🔓 تحضير/فتح إذن الصوت داخل حدث الضغطة مباشرة (يحل مشكلة سفاري/آيفون
    // اللي يرفض speechSynthesis.speak() إذا انتظرنا await الشبكة أول)
    const unlock = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(unlock);
    window.speechSynthesis.cancel();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setReply(ar ? "المتصفح لا يدعم التعرف على الصوت" : "Browser doesn't support voice recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
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
    setFeedback("");
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
    setFeedback("");
    historyRef.current = [];
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
          <MessageCircle className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-base font-medium">
            {ar ? "شريك المحادثة" : "Speaking Partner"}
          </h2>
          <p className="text-xs text-muted-foreground truncate">
            {ar ? "تحدث بالإنجليزي وسأصحح أخطاءك وأقيّم مستواك" : "Speak English, get corrected, get rated"}
          </p>
        </div>
        {level && (
          <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {level} · {ar ? LEVEL_LABELS_AR[level] : level}
          </div>
        )}
      </div>


      <div className="px-5 pt-3 flex items-center gap-2">
        <select
          value={accent}
          onChange={(e) => setAccent(e.target.value as "US" | "GB")}
          className="text-xs rounded-full border border-border bg-muted/30 px-3 py-1.5 text-foreground"
        >
          <option value="US">{ar ? "أمريكي 🇺🇸" : "American 🇺🇸"}</option>
          <option value="GB">{ar ? "بريطاني 🇬🇧" : "British 🇬🇧"}</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "male" | "female")}
          className="text-xs rounded-full border border-border bg-muted/30 px-3 py-1.5 text-foreground"
        >
          <option value="female">{ar ? "صوت بنت" : "Female voice"}</option>
          <option value="male">{ar ? "صوت ولد" : "Male voice"}</option>
        </select>
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
                : (ar ? "اضغط وتحدث بالإنجليزي" : "Tap & speak English")}
            </span>
          </button>

          {(transcript || reply) && (
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {ar ? "محادثة جديدة" : "New chat"}
            </button>
          )}
        </div>

        {transcript && (
          <div className="flex gap-2 items-start">
            <span className="mt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wide shrink-0 w-10 text-center">
              {ar ? "أنت" : "You"}
            </span>
            <p className="text-sm bg-muted/50 rounded-xl px-3 py-2 flex-1 leading-relaxed" dir="ltr">
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
            <p className="text-sm bg-primary/5 border border-primary/15 rounded-xl px-3 py-2.5 flex-1 leading-relaxed" dir="ltr">
              {reply}
            </p>
          </div>
        )}

        {feedback && !thinking && (
          <div className="flex gap-2 items-start">
            <span className="mt-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wide shrink-0 w-10 text-center">
              {ar ? "تصحيح" : "Fix"}
            </span>
            <p className="text-sm bg-emerald-500/5 border border-emerald-500/15 rounded-xl px-3 py-2.5 flex-1 leading-relaxed">
              {feedback}
            </p>
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
const isPro = true;
const subLoading = false;
const { user, loading: authLoading } = useAuth();
  const ar = lang === "ar";

    // لسا نتحقق من الجلسة — لا نعرض شي لين نتأكد
  if (authLoading) {
    return null;
  }

  // Public landing page for visitors who aren't logged in
  if (!user) {
    return <PublicLanding ar={ar} />;
  }


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

      {/* Speaking Partner */}
      <SpeakingPartner ar={ar} />

      {/* Continue Reading */}
      {continueStory && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl">{t("home.continue")}</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
<div className={`grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${continueStory.coverHue} text-2xl shadow-sm`}>
  {continueStory.coverImage ? (
    <img src={continueStory.coverImage} alt={continueStory.title} className="h-full w-full object-cover" />
  ) : (
    continueStory.cover
  )}
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
