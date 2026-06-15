import { useState, useMemo, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BookmarkPlus, Languages, Sparkles, Loader2, Check } from "lucide-react";
import { tokenize, splitSentences } from "@/lib/tokenize";
import type { Story, VocabEntry } from "@/lib/types";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useSettings } from "./theme";
import { lookupLocal, lookupAI, preWarmCache, normalizeWord, type WordLookup } from "@/lib/lookup";
import { recordWordTap } from "@/lib/stats";

interface SavedWord {
  word: string;
  ar: string;
  def: string;
  example: string;
  slug: string;
  at: number;
  level?: number;
  nextReview?: number;
}

export function Reader({ story, onScrollPct }: { story: Story; onScrollPct: (pct: number) => void }) {
  const [settings] = useSettings();
  const [vocabList, setVocabList] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [tappedWords] = useLocalStore<string[]>(storeKeys.tapped, []);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const tappedSet = useMemo(() => new Set(tappedWords), [tappedWords]);
  const savedSet = useMemo(
    () => new Set(vocabList.map((w) => normalizeWord(w.word))),
    [vocabList],
  );

  const fontSize = `${settings.fontScale}rem`;
  const showWordsAlways = settings.translateMode === "words";

  const saveWord = (word: string, entry: { ar: string; def: string; example: string }) => {
    setVocabList((prev) => {
      if (prev.some((w) => normalizeWord(w.word) === normalizeWord(word) && w.slug === story.slug)) {
        return prev;
      }
      // Initialize SRS fields so the word becomes immediately due for review.
      return [...prev, { word, ...entry, slug: story.slug, at: Date.now(), level: 0, nextReview: Date.now() }];
    });
  };

  return (
    <div ref={containerRef} className="reading-column px-4 pb-24 pt-6 sm:px-0" style={{ fontSize }}>
      <h1 className="mb-2 text-balance text-3xl font-semibold leading-tight sm:text-4xl">{story.title}</h1>
      <p className="mb-8 text-sm font-sans text-muted-foreground">
        {story.minutes} min read · {story.genre} · {story.level}
      </p>

      {story.paragraphs.map((para, pi) => (
        <Paragraph
          key={pi}
          paragraph={para}
          vocab={story.vocab}
          translations={story.sentenceTranslations}
          translateMode={settings.translateMode}
          showWordsAlways={showWordsAlways}
          tappedSet={tappedSet}
          savedSet={savedSet}
          onSave={saveWord}
        />
      ))}
    </div>
  );
}

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
  return (
    <p className="mb-6">
      {sentences.map((s, i) => (
        <Sentence key={i} sentence={s} {...props} />
      ))}
    </p>
  );
}

function Sentence({
  sentence,
  vocab,
  translations,
  translateMode,
  showWordsAlways,
  tappedSet,
  savedSet,
  onSave,
}: ParagraphProps & { sentence: string }) {
  const tokens = useMemo(() => tokenize(sentence), [sentence]);
  const [revealed, setRevealed] = useState(translateMode === "sentences");

  useEffect(() => {
    setRevealed(translateMode === "sentences");
  }, [translateMode]);

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
      <button
        type="button"
        aria-label="Translate sentence"
        onClick={() => setRevealed((r) => !r)}
        className="ml-1 inline-flex h-4 w-4 translate-y-[2px] items-center justify-center rounded text-muted-foreground/50 opacity-0 transition-opacity hover:text-primary focus:opacity-100 group-hover/sentence:opacity-100"
      >
        <Languages className="h-3.5 w-3.5" />
      </button>
      {revealed && (
        <span dir="rtl" lang="ar" className="my-2 block rounded-md bg-muted/60 px-3 py-2 font-sans text-[0.92em] leading-relaxed text-foreground/85 animate-fade-in">
          {translation ?? <span className="italic opacity-70">No translation available yet for this sentence.</span>}
        </span>
      )}
    </span>
  );
}

function WordToken({
  word,
  normalized,
  storyVocab,
  sentence,
  highlight,
  tapped,
  saved,
  onSave,
}: {
  word: string;
  normalized: string;
  storyVocab: Record<string, VocabEntry>;
  sentence: string;
  highlight: boolean;
  tapped: boolean;
  saved: boolean;
  onSave: (word: string, entry: { ar: string; def: string; example: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<WordLookup | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (normalized) recordWordTap(normalized);
    const local = lookupLocal(word, storyVocab);
    if (local) {
      setResult(local);
      return;
    }
    setLoading(true);
    setResult(null);
    let cancelled = false;
    lookupAI(word, sentence).then((r) => {
      if (!cancelled) {
        setResult(r);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, word, normalized, sentence, storyVocab]);

  const handleSave = () => {
    if (!result) return;
    onSave(result.word, {
      ar: result.ar,
      def: result.en,
      example: result.example ?? sentence,
    });
    setOpen(false);
  };

  const sourceLabel =
    result?.source === "ai"
      ? "AI"
      : result?.source === "story"
        ? "Story"
        : result?.source === "dictionary"
          ? "Dict"
          : result?.source === "cache"
            ? "Cached"
            : null;

  const tokenClass = [
    "word-token",
    highlight ? "underline decoration-primary/40 decoration-dotted underline-offset-4" : "",
    saved
      ? "bg-primary/12 text-primary"
      : tapped
        ? "bg-accent/25"
        : "hover:bg-accent/30",
    open ? "bg-accent/50" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={tokenClass}>
          {word}
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-72 p-0 shadow-lg data-[state=open]:animate-scale-in">
        <div className="space-y-2 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-lg font-semibold text-foreground">{word}</span>
            {sourceLabel && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {result?.source === "ai" && <Sparkles className="h-3 w-3" />}
                {sourceLabel}
              </span>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading explanation…
            </div>
          )}

          {!loading && result && (
            <>
              <div dir="rtl" lang="ar" className="text-base text-foreground">{result.ar || "—"}</div>
              <div className="text-sm text-muted-foreground">{result.en || "No explanation available yet."}</div>
              {result.example && (
                <div className="border-t border-border pt-2 text-sm italic text-foreground/80">
                  "{result.example}"
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex border-t border-border">
          <button
            type="button"
            disabled={!result || loading || saved}
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 px-3 py-2 text-sm text-primary transition-colors hover:bg-muted disabled:opacity-40"
          >
            {saved ? <Check className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
            {saved ? "Saved" : "Save to vocab"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
