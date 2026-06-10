import { useState, useMemo, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BookmarkPlus, Languages, Sparkles } from "lucide-react";
import { tokenize, splitSentences } from "@/lib/tokenize";
import type { Story, VocabEntry } from "@/lib/types";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useSettings } from "./theme";

interface SavedWord {
  word: string;
  ar: string;
  def: string;
  example: string;
  slug: string;
  at: number;
}

export function Reader({ story, onScrollPct }: { story: Story; onScrollPct: (pct: number) => void }) {
  const [settings] = useSettings();
  const [vocabList, setVocabList] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const fontSize = `${settings.fontScale}rem`;
  const showWordsAlways = settings.translateMode === "words";

  const saveWord = (word: string, entry: VocabEntry) => {
    setVocabList((prev) => {
      if (prev.some((w) => w.word === word && w.slug === story.slug)) return prev;
      return [...prev, { word, ...entry, slug: story.slug, at: Date.now() }];
    });
  };

  return (
    <div ref={containerRef} className="reading-column px-4 pb-24 pt-6 sm:px-0" style={{ fontSize }}>
      <h1 className="mb-2 text-balance text-3xl font-semibold leading-tight sm:text-4xl">{story.title}</h1>
      <p className="mb-8 text-sm font-sans text-muted-foreground">
        {story.minutes} min · {story.genre} · {story.level}
      </p>

      {story.paragraphs.map((para, pi) => (
        <Paragraph
          key={pi}
          paragraph={para}
          vocab={story.vocab}
          translations={story.sentenceTranslations}
          translateMode={settings.translateMode}
          showWordsAlways={showWordsAlways}
          onSave={saveWord}
        />
      ))}
    </div>
  );
}

function Paragraph({
  paragraph,
  vocab,
  translations,
  translateMode,
  showWordsAlways,
  onSave,
}: {
  paragraph: string;
  vocab: Record<string, VocabEntry>;
  translations?: Record<string, string>;
  translateMode: "off" | "words" | "sentences";
  showWordsAlways: boolean;
  onSave: (word: string, entry: VocabEntry) => void;
}) {
  const sentences = useMemo(() => splitSentences(paragraph), [paragraph]);
  return (
    <p className="mb-6">
      {sentences.map((s, i) => (
        <Sentence
          key={i}
          sentence={s}
          vocab={vocab}
          translation={translations?.[s]}
          translateMode={translateMode}
          showWordsAlways={showWordsAlways}
          onSave={onSave}
        />
      ))}
    </p>
  );
}

function Sentence({
  sentence,
  vocab,
  translation,
  translateMode,
  showWordsAlways,
  onSave,
}: {
  sentence: string;
  vocab: Record<string, VocabEntry>;
  translation?: string;
  translateMode: "off" | "words" | "sentences";
  showWordsAlways: boolean;
  onSave: (word: string, entry: VocabEntry) => void;
}) {
  const tokens = useMemo(() => tokenize(sentence), [sentence]);
  const [revealed, setRevealed] = useState(translateMode === "sentences");

  useEffect(() => {
    setRevealed(translateMode === "sentences");
  }, [translateMode]);

  return (
    <span className="group/sentence relative">
      {tokens.map((t, i) => {
        if (t.kind !== "word") return <span key={i}>{t.text}</span>;
        const entry = t.key ? vocab[t.key] : undefined;
        return (
          <WordToken
            key={i}
            word={t.text}
            entry={entry}
            highlight={showWordsAlways && Boolean(entry)}
            onSave={onSave}
          />
        );
      })}
      <button
        type="button"
        aria-label="Translate sentence"
        onClick={() => setRevealed((r) => !r)}
        className="ml-1 inline-flex h-4 w-4 translate-y-[2px] items-center justify-center rounded text-muted-foreground/50 opacity-0 transition-opacity hover:text-primary group-hover/sentence:opacity-100"
      >
        <Languages className="h-3.5 w-3.5" />
      </button>
      {revealed && (
        <span dir="rtl" lang="ar" className="my-2 block rounded-md bg-muted/60 px-3 py-2 font-sans text-[0.92em] leading-relaxed text-foreground/85 animate-fade-in">
          {translation ?? <span className="italic opacity-70">Arabic translation will appear here when AI is connected. (Placeholder)</span>}
        </span>
      )}
    </span>
  );
}

function WordToken({
  word,
  entry,
  highlight,
  onSave,
}: {
  word: string;
  entry?: VocabEntry;
  highlight: boolean;
  onSave: (word: string, entry: VocabEntry) => void;
}) {
  const [open, setOpen] = useState(false);
  const data = entry ?? {
    ar: "—",
    def: "AI explanation will appear here in a future version. For now, this word isn't in the story's curated vocabulary list.",
    example: word,
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`word-token ${highlight ? "underline decoration-primary/40 decoration-dotted underline-offset-4" : ""} ${open ? "bg-accent/40" : "hover:bg-accent/30"}`}
        >
          {word}
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-72 animate-scale-in p-0">
        <div className="space-y-2 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-lg font-semibold text-foreground">{word}</span>
            {!entry && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            )}
          </div>
          <div dir="rtl" lang="ar" className="text-base text-foreground">{data.ar}</div>
          <div className="text-sm text-muted-foreground">{data.def}</div>
          {entry && (
            <div className="border-t border-border pt-2 text-sm italic text-foreground/80">
              "{data.example}"
            </div>
          )}
        </div>
        <div className="flex border-t border-border">
          <button
            type="button"
            onClick={() => {
              onSave(word, data);
              setOpen(false);
            }}
            className="flex flex-1 items-center justify-center gap-2 px-3 py-2 text-sm text-primary transition-colors hover:bg-muted"
          >
            <BookmarkPlus className="h-4 w-4" />
            Save to vocab
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
