import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { stories } from "@/data/stories";
import { StoryCard, genreLabel, levelLabel } from "@/components/booklish/story-card";
import type { Genre, Level } from "@/lib/types";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Booklish" },
      { name: "description", content: "Browse short stories and novels by genre and difficulty level." },
    ],
  }),
  component: Library,
});

const GENRES: Genre[] = ["mystery", "romance", "sci-fi", "adventure", "drama"];
const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

function Library() {
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories.filter((s) =>
      (genre === "all" || s.genre === genre) &&
      (level === "all" || s.level === level) &&
      (term === "" || s.title.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term))
    );
  }, [genre, level, q]);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="font-serif text-3xl">Library</h1>
          <p className="text-sm text-muted-foreground">{stories.length} stories across genres and reading levels.</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stories…"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={genre === "all"} onClick={() => setGenre("all")}>All genres</FilterChip>
          {GENRES.map((g) => (
            <FilterChip key={g} active={genre === g} onClick={() => setGenre(g)}>
              {genreLabel[g]}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={level === "all"} onClick={() => setLevel("all")}>All levels</FilterChip>
          {LEVELS.map((l) => (
            <FilterChip key={l} active={level === l} onClick={() => setLevel(l)}>
              {levelLabel[l]}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">No stories match those filters yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => <StoryCard key={s.slug} story={s} />)}
        </div>
      )}
    </main>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
