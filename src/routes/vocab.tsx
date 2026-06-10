import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useLocalStore, storeKeys } from "@/lib/store";
import { stories } from "@/data/stories";

interface SavedWord { word: string; ar: string; def: string; example: string; slug: string; at: number }

export const Route = createFileRoute("/vocab")({
  head: () => ({ meta: [{ title: "Vocabulary — Booklish" }] }),
  component: Vocab,
});

function Vocab() {
  const [vocab, setVocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);

  const sorted = [...vocab].sort((a, b) => b.at - a.at);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="mb-2 font-serif text-3xl">Vocabulary</h1>
      <p className="mb-8 text-sm text-muted-foreground">Words you've saved while reading. {vocab.length} {vocab.length === 1 ? "word" : "words"}.</p>

      {vocab.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          <p className="mb-2">Your list is empty.</p>
          <p className="text-sm">While reading, tap any word and choose <span className="text-foreground">Save to vocab</span>.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {sorted.map((v) => {
            const story = stories.find((s) => s.slug === v.slug);
            return (
              <li key={`${v.slug}:${v.word}`} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-xl">{v.word}</span>
                  <span dir="rtl" lang="ar" className="text-base text-foreground/85">{v.ar}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.def}</p>
                {v.example && <p className="mt-2 text-sm italic text-foreground/75">"{v.example}"</p>}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>From: {story?.title ?? v.slug}</span>
                  <button
                    onClick={() => setVocab((prev) => prev.filter((x) => !(x.word === v.word && x.slug === v.slug)))}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-muted hover:text-destructive"
                    aria-label={`Remove ${v.word}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
