import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Search, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocalStore, storeKeys } from "@/lib/store";
import { stories } from "@/data/stories";

interface SavedWord { word: string; ar: string; def: string; example: string; slug: string; at: number }

export const Route = createFileRoute("/vocab")({
  head: () => ({ meta: [{ title: "Saved Words — Booklish" }] }),
  component: Vocab,
});

function Vocab() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...vocab].sort((a, b) => b.at - a.at);
    if (!q) return list;
    return list.filter(
      (v) => v.word.toLowerCase().includes(q) || v.ar.includes(q) || v.def.toLowerCase().includes(q),
    );
  }, [vocab, query]);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="mb-2 font-serif text-3xl">Saved words</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Bookmarked while reading. {vocab.length} {vocab.length === 1 ? "word" : "words"}.
      </p>

      {vocab.length > 0 && (
        <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by word, meaning or definition"
            className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      {vocab.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          <p className="mb-2">Your list is empty.</p>
          <p className="text-sm">
            While reading, tap any word and choose <span className="text-foreground">Save to vocab</span>.
          </p>
          <Link
            to="/library"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" /> Browse library
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((v) => {
            const story = stories.find((s) => s.slug === v.slug);
            return (
              <li key={`${v.slug}:${v.word}`} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-xl">{v.word}</span>
                  <span dir="rtl" lang="ar" className="text-base text-foreground/85">{v.ar}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.def}</p>
                {v.example && <p className="mt-2 text-sm italic text-foreground/75">"{v.example}"</p>}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">From: {story?.title ?? v.slug}</span>
                  <button
                    onClick={() => setVocab((prev) => prev.filter((x) => !(x.word === v.word && x.slug === v.slug)))}
                    className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 hover:bg-muted hover:text-destructive"
                    aria-label={`Remove ${v.word}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No words match "{query}".
            </li>
          )}
        </ul>
      )}
    </main>
  );
}
