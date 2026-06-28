import { useState, useMemo, useEffect, useRef, Fragment, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  BookmarkPlus, Languages, Sparkles, Loader2, Check,
  Volume2, VolumeX, Globe, User, Users,
} from "lucide-react";
import { tokenize, splitSentences } from "@/lib/tokenize";
import type { Story, VocabEntry, SavedWord } from "@/lib/types";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useSettings } from "./theme";
import { lookupLocal, lookupAI, preWarmCache, normalizeWord, type WordLookup } from "@/lib/lookup";
import { translateTextAI } from "@/lib/api/lookup.functions";
import { recordWordTap } from "@/lib/stats";
import { useXp, XP_REWARDS } from "@/lib/xp";
import { storyScenes } from "@/data/illustrations";
import { speak, stopSpeaking, useSpeaking, getTTSPrefs, saveTTSPrefs, type TTSAccent, type TTSGender } from "@/lib/tts";

// ─── TTS settings bar ────────────────────────────────────────────────────

function TTSSettingsBar() {
  const [prefs, setPrefs] = useState(getTTSPrefs);

  function update(patch: Partial<{ accent: TTSAccent; gender: TTSGender }>) {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    saveTTSPrefs(next);
    stopSpeaking();
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Accent */}
      <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
        <button
          onClick={() => update({ accent: "en-US" })}
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
            prefs.accent === "en-US"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <span>🇺🇸</span> US
        </button>
        <button
          onClick={() => update({ accent: "en-GB" })}
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors border-l border-border ${
            prefs.accent === "en-GB"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <span>🇬🇧</span> UK
        </button>
      </div>

      {/* Gender */}
      <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
        <button
          onClick={() => update({ gender: "female" })}
          title="Female voice"
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
            prefs.gender === "female"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <User className="h-3 w-3" /> أنثى
        </button>
        <button
          onClick={() => update({ gender: "male" })}
          title="Male voice"
          className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors border-l border-border ${
            prefs.gender === "male"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <Users className="h-3 w-3" /> ذكر
        </button>
      </div>
    </div>
  );
}

// ─── Main Reader ──────────────────────────────────────────────────────────

export function Reader({ story, onScrollPct }: { story: Story; onScrollPct: (pct: number) => void }) {
  const [settings] = useSettings();
  const [vocabList, setVocabList] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [tappedWords] = useLocalStore<string[]>(storeKeys.tapped, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addXp } = useXp();

  // Selected text for paragraph/sentence translation
  const [selectionAr, setSelectionAr] = useState<string | null>(null);
  const [selectionLoading, setSelectionLoading] = useState(false);
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null);
  const selectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    preWarmCache(story.paragraphs.join(" "), story.vocab);
  }, [story]);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(100, Math.round((window.scrollY / Math.max(1, total)) * 100)));
      onScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScrollPct]);

  // Handle text selection → show translate button
  useEffect(() => {
    function onMouseUp(e: MouseEvent) {
      if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
      selectionTimerRef.current = setTimeout(() => {
        const sel = window.getSelection();
        const text = sel?.toString().trim() ?? "";
        if (text.length > 3) {
          setSelectionPos({ x: e.clientX, y: e.clientY + window.scrollY });
          setSelectionAr(null);
        } else {
          setSelectionPos(null);
          setSelectionAr(null);
        }
      }, 200);
    }
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      if (selectionTimerRef.current) clearTimeout(selectionTimerRef.current);
    };
  }, []);

  async function handleTranslateSelection() {
    const text = window.getSelection()?.toString().trim() ?? "";
    if (!text) return;
    setSelectionLoading(true);
    setSelectionAr(null);
    try {
      const res = await translateTextAI({ data: { text } });
      setSelectionAr(res.ar);
    } catch {
      setSelectionAr("تعذّر الترجمة");
    } finally {
      setSelectionLoading(false);
    }
  }

  function dismissSelection() {
    setSelectionPos(null);
    setSelectionAr(null);
    window.getSelection()?.removeAllRanges();
  }

  const tappedSet = useMemo(() => new Set(tappedWords), [tappedWords]);
  const savedSet = useMemo(
    () => new Set(vocabList.map((w) => normalizeWord(w.word))),
    [vocabList],
  );

  const fontSize = `${settings.fontScale}rem`;
  const showWordsAlways = settings.translateMode === "words";

  const saveWord = (word: string, entry: { ar: string; def: string; example: string }) => {
    setVocabList((prev) => {
      if (prev.some((w) => normalizeWord(w.word) === normalizeWord(word) && w.slug === story.slug)) return prev;
      addXp(XP_REWARDS.saveWord, `saved:${word}`);
      return [...prev, { word, ...entry, slug: story.slug, at: Date.now(), level: 0, nextReview: Date.now() }];
    });
  };

  const scenes = storyScenes[story.slug] ?? [];
  const sceneMap = useMemo(() => new Map(scenes.map((s) => [s.afterParagraph, s])), [scenes]);

  return (
    <div ref={containerRef} dir="ltr" className="reading-column px-4 pb-24 pt-6 sm:px-0" style={{ fontSize }}>

      {/* Story header */}
      <h1 className="mb-2 text-balance text-3xl font-semibold leading-tight sm:text-4xl">{story.title}</h1>
      <p className="mb-4 text-sm font-sans text-muted-foreground">
        {story.minutes} min · {story.genre} · {story.level}
      </p>

      {/* TTS settings */}
      <div className="mb-8 rounded-xl border border-border bg-card/60 px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground font-sans">صوت القراءة / Reading voice</p>
        <TTSSettingsBar />
      </div>

      {/* Selection translate tooltip */}
      {selectionPos && (
        <div
          className="fixed z-50 flex flex-col gap-2 rounded-xl border border-border bg-card shadow-xl p-3 w-72 animate-scale-in"
          style={{ top: selectionPos.y - 10, left: Math.min(selectionPos.x, (typeof window !== "undefined" ? window.innerWidth : 800) - 300) }}
        >
          {!selectionAr && !selectionLoading && (
            <button
              onClick={handleTranslateSelection}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground w-full justify-center"
            >
              <Languages className="h-4 w-4" />
              ترجم النص المحدد
            </button>
          )}
          {selectionLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-1 justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري الترجمة...
            </div>
          )}
          {selectionAr && (
            <div dir="rtl" lang="ar" className="text-base leading-relaxed text-foreground">
              {selectionAr}
            </div>
          )}
          <button onClick={dismissSelection} className="text-xs text-muted-foreground hover:text-foreground text-center">
            إغلاق
          </button>
        </div>
      )}

      {/* Story content */}
      {story.paragraphs.map((para, pi) => (
        <Fragment key={pi}>
          <Paragraph
            paragraph={para}
            vocab={story.vocab}
            translations={story.sentenceTranslations}
            translateMode={settings.translateMode}
            showWordsAlways={showWordsAlways}
            tappedSet={tappedSet}
            savedSet={savedSet}
            onSave={saveWord}
          />
          {sceneMap.has(pi) && <StoryImage {...sceneMap.get(pi)!} />}
        </Fragment>
      ))}
    </div>
  );
}

// ─── StoryImage ───────────────────────────────────────────────────────────

function StoryImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border/50 bg-muted/30 shadow-sm">
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-44 w-full object-cover sm:h-56" />
      {caption && <figcaption className="px-4 py-2 text-center font-sans text-xs italic text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

// ─── Paragraph ────────────────────────────────────────────────────────────

interface ParagraphProps {
  paragraph: string;
  vocab: Record<string, VocabEntry>;
  translations?: Record<string, string>;
  translateMode: "off" | "words" | "sentences";
  showWordsAlways: boolean;
  tappedSet: Set<string>;
  savedSet: Set<string>;
  onSave: (word: string, entry: { ar: string; def: string; example: string }) => void;
}

function Paragraph(props: ParagraphProps) {
  const sentences = useMemo(() => splitSentences(props.paragraph), [props.paragraph]);
  const [paraAr, setParaAr] = useState<string | null>(null);
  const [paraLoading, setParaLoading] = useState(false);

  async function translateParagraph() {
    if (paraAr) { setParaAr(null); return; }
    setParaLoading(true);
    try {
      const res = await translateTextAI({ data: { text: props.paragraph } });
      setParaAr(res.ar);
    } catch {
      setParaAr("تعذّر الترجمة");
    } finally {
      setParaLoading(false);
    }
  }

  return (
    <div className="group/para mb-6 relative">
      <p>
        {sentences.map((s, i) => (
          <Sentence key={i} sentence={s} {...props} />
        ))}
      </p>

      {/* Paragraph translate button */}
      <button
        onClick={translateParagraph}
        disabled={paraLoading}
        className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-primary opacity-0 group-hover/para:opacity-100 transition-opacity"
        title="ترجم الفقرة كاملة"
      >
        {paraLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Globe className="h-3 w-3" />}
        {paraAr ? "أخفِ الترجمة" : "ترجم الفقرة"}
      </button>

      {paraAr && (
        <div dir="rtl" lang="ar" className="mt-2 rounded-xl bg-muted/60 px-4 py-3 font-sans text-sm leading-relaxed text-foreground/85 border-r-2 border-primary/40 animate-fade-in">
          {paraAr}
        </div>
      )}
    </div>
  );
}

// ─── Sentence ─────────────────────────────────────────────────────────────

function Sentence({ sentence, vocab, translations, translateMode, showWordsAlways, tappedSet, savedSet, onSave }: ParagraphProps & { sentence: string }) {
  const tokens = useMemo(() => tokenize(sentence), [sentence]);
  const [revealed, setRevealed] = useState(translateMode === "sentences");
  const speakId = `sent-${sentence.slice(0, 20)}`;
  const { speaking, toggle } = useSpeaking(speakId);

  useEffect(() => { setRevealed(translateMode === "sentences"); }, [translateMode]);

  const translation = translations?.[sentence];

  return (
    <span className="group/sentence relative">
      {tokens.map((t, i) => {
        if (t.kind !== "word") return <span key={i}>{t.text}</span>;
        const key = t.key ?? "";
        const hasStoryEntry = Boolean(key && vocab[key]);
        return (
          <WordToken
            key={i}
            word={t.text}
            normalized={key}
            storyVocab={vocab}
            sentence={sentence}
            highlight={showWordsAlways && hasStoryEntry}
            tapped={tappedSet.has(key)}
            saved={savedSet.has(key)}
            onSave={onSave}
          />
        );
      })}

      {/* Sentence actions: speak + translate */}
      <span className="ml-1 inline-flex items-center gap-0.5 opacity-0 group-hover/sentence:opacity-100 transition-opacity">
        <button
          type="button"
          aria-label="Speak sentence"
          onClick={() => toggle(sentence)}
          className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-primary transition-colors"
        >
          {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          aria-label="Translate sentence"
          onClick={() => setRevealed((r) => !r)}
          className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-primary transition-colors"
        >
          <Languages className="h-3.5 w-3.5" />
        </button>
      </span>

      {revealed && (
        <span dir="rtl" lang="ar" className="my-2 block rounded-lg bg-muted/60 px-3 py-2 font-sans text-[0.92em] leading-relaxed text-foreground/85 animate-fade-in border-r-2 border-primary/30">
          {translation ?? <TranslateSentenceOnDemand text={sentence} />}
        </span>
      )}
    </span>
  );
}

// Fetch sentence translation — fetches once safely
function TranslateSentenceOnDemand({ text }: { text: string }) {
  const [ar, setAr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    setLoading(true);
    translateTextAI({ data: { text } })
      .then(res => setAr(res.ar ?? null))
      .catch(() => setAr("تعذّر الترجمة"))
      .finally(() => setLoading(false));
  }, [text]);

  if (loading) return <span className="flex items-center gap-1 text-xs opacity-60"><Loader2 className="h-3 w-3 animate-spin" />جاري الترجمة...</span>;
  if (ar) return <>{ar}</>;
  return <span className="italic opacity-60">—</span>;
}

// ─── WordToken ────────────────────────────────────────────────────────────

function WordToken({ word, normalized, storyVocab, sentence, highlight, tapped, saved, onSave }: {
  word: string; normalized: string; storyVocab: Record<string, VocabEntry>;
  sentence: string; highlight: boolean; tapped: boolean; saved: boolean;
  onSave: (word: string, entry: { ar: string; def: string; example: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<WordLookup | null>(null);
  const [loading, setLoading] = useState(false);
  const speakId = `word-${word}`;
  const { speaking, toggle, prefs } = useSpeaking(speakId);

  useEffect(() => {
    if (!open) return;
    if (normalized) recordWordTap(normalized);
    const local = lookupLocal(word, storyVocab);
    if (local) { setResult(local); return; }
    setLoading(true);
    setResult(null);
    let cancelled = false;
    lookupAI(word, sentence).then((r) => {
      if (!cancelled) { setResult(r); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [open, word, normalized, sentence, storyVocab]);

  const handleSave = () => {
    if (!result) return;
    onSave(result.word, { ar: result.ar, def: result.en, example: result.example ?? sentence });
    setOpen(false);
  };

  const isAI = result?.source === "ai";

  const tokenClass = [
    "word-token",
    highlight ? "underline decoration-primary/40 decoration-dotted underline-offset-4" : "",
    saved ? "bg-primary/12 text-primary" : tapped ? "bg-accent/25" : "hover:bg-accent/30",
    open ? "bg-accent/50" : "",
  ].filter(Boolean).join(" ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={tokenClass}>{word}</button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-80 p-0 shadow-xl data-[state=open]:animate-scale-in">
        <div className="p-4 space-y-3">

          {/* Word + pronunciation buttons + AI badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <span className="font-serif text-xl font-semibold leading-none" dir="ltr">{word}</span>

              {/* Pronunciation: US + UK, male/female */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(["en-US", "en-GB"] as TTSAccent[]).map(accent => (
                  <button
                    key={accent}
                    type="button"
                    onClick={() => toggle(word, { accent, gender: prefs.gender })}
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                      speaking && prefs.accent === accent
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border bg-muted/50 text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Volume2 className="h-3 w-3" />
                    {accent === "en-US" ? "🇺🇸 US" : "🇬🇧 UK"}
                  </button>
                ))}
              </div>
            </div>
            {isAI && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary font-medium shrink-0">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {loading && (
            <div className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Looking up…</span>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-2.5">
              {/* Arabic meaning */}
              <div dir="rtl" lang="ar" className="text-2xl font-medium text-foreground leading-snug">
                {result.ar || "—"}
              </div>
              {/* English definition */}
              <div className="text-sm text-muted-foreground leading-relaxed">
                {result.en || "No definition available."}
              </div>
              {/* Example */}
              {result.example && (
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm italic text-foreground/75 leading-relaxed border-l-2 border-primary/30" dir="ltr">
                  "{result.example}"
                </div>
              )}
            </div>
          )}

          {!loading && !result && (
            <div className="text-sm text-muted-foreground py-1">اضغط مرة أخرى للبحث.</div>
          )}
        </div>

        {/* Footer: save */}
        <div className="flex border-t border-border">
          <button
            type="button"
            disabled={!result || loading || saved}
            onClick={handleSave}
            className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              saved ? "text-primary/60 cursor-default" : "text-primary hover:bg-muted disabled:opacity-40"
            }`}
          >
            {saved ? <><Check className="h-4 w-4" /> محفوظة</> : <><BookmarkPlus className="h-4 w-4" /> احفظ الكلمة</>}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
