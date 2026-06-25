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
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        setReply("خطأ: مفتاح API غير موجود - VITE_OPENROUTER_API_KEY");
        return;
      }

      const storyList = stories
        .map((s) => `- ${s.title} (${s.level}, ${s.genre})`)
        .join("\n");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://booklish.vercel.app",
          "X-Title": "Booklish",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash:free",
          messages: [
            {
              role: "system",
              content: `You are a helpful English learning assistant for Arabic speakers in Booklish app.
Available stories:
${storyList}

Suggest 1-3 stories based on user interest or level.
Reply in Arabic in 2-3 friendly sentences.
If suggesting stories, end with: [SUGGEST: Title1, Title2]
Use exact English titles from the list.`,
            },
            { role: "user", content: text },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        setReply(`خطأ HTTP ${response.status}: ${errText.slice(0, 200)}`);
        return;
      }

      const data = await response.json();
      const message = data.choices?.[0]?.message?.content || "";

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
  const readMinutesToday = Math.floor((stats.dailyMin
