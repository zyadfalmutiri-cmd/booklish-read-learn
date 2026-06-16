import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Search, BookOpen, Volume2, VolumeX, GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocalStore, storeKeys } from "@/lib/store";
import { stories } from "@/data/stories";
import { useT } from "@/lib/i18n";
import { useSpeaking } from "@/lib/tts";
import { isDue } from "@/lib/srs";

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

import { RequireAuth } from "@/components/booklish/require-auth";

export const Route = createFileRoute("/vocab")({
  head: () => ({ meta: [{ title: "Saved Words — Booklish" }] }),
  component: () => (
    <RequireAuth>
      <Vocab />
    </RequireAuth>
  ),
});

function Vocab() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [query, setQuery] = useState("");
  const { t, dir } = useT();
  const isRtl = dir === "rtl";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...vocab].sort((a, b) => b.at - a.at);
    if (!q) return list;
    return list.filter(
      (v) => v.word.toLowerCase().includes(q) || v.ar.includes(q) || v.def.toLowerCase().includes(q),
    );
  }, [vocab, query]);

  const dueCount = vocab.filter((v) => isDue(v)).length;
  const countWord = vocab.length === 1 ? t("vocab.wordCount") : t("vocab.wordCountPlural");

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="mb-2 font-serif text-3xl">{t("vocab.title")}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {t("vocab.subPrefix")} {vocab.length} {countWord}.
      </p>

      {vocab.length > 0 && (
        <>
          <Link
            to="/review"
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <GraduationCap className="h-4 w-4" /> {t("vocab.startReview")} · {dueCount} {t("vocab.dueNow")}
          </Link>
          <div className={`mb-6 flex items-center gap-2 rounded-full border border-border bg-card ${isRtl ? "pr-3 pl-2" : "pl-3 pr-2"}`}>
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("vocab.searchPh")}
              className={`h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>
        </>
      )}

      {vocab.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          <p className="mb-2">{t("vocab.empty")}</p>
          <p className="text-sm">{t("vocab.emptyHint")}</p>
          <Link
            to="/library"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" /> {t("vocab.browse")}
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((v) => {
            const story = stories.find((s) => s.slug === v.slug);
            return (
              <li key={`${v.slug}:${v.word}`} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl" dir="ltr">{v.word}</span>
                    <SpeakButton word={v.word} />
                  </div>
                  <span dir="rtl" lang="ar" className="text-base text-foreground/85">{v.ar}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.def}</p>
                {v.example && <p className="mt-2 text-sm italic text-foreground/75" dir="ltr">"{v.example}"</p>}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{t("vocab.fromStory")}: {story?.title ?? v.slug}</span>
                  <button
                    onClick={() => setVocab((prev) => prev.filter((x) => !(x.word === v.word && x.slug === v.slug)))}
                    className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 hover:bg-muted hover:text-destructive"
                    aria-label={`Remove ${v.word}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> {t("vocab.delete")}
                  </button>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              {t("vocab.noMatch")}
            </li>
          )}
        </ul>
      )}
    </main>
  );
}

function SpeakButton({ word }: { word: string }) {
  const { t } = useT();
  const { speaking, toggle, supported } = useSpeaking(`vocab:${word}`);
  if (!supported) return null;
  return (
    <button
      onClick={() => toggle(word, "en-US")}
      className={`rounded-full p-1 transition-colors ${speaking ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted hover:text-primary"}`}
      aria-label={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
      title={speaking ? t("vocab.stopSpeak") : t("vocab.speak")}
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
