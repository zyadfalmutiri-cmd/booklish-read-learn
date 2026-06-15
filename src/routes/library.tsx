import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import type { Category, Genre, Level } from "@/lib/types";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Booklish" },
      { name: "description", content: "Browse short stories and novels by genre and difficulty level." },
    ],
  }),
  component: Library,
});

const GENRES: Genre[] = ["mystery", "romance", "sci-fi", "adventure", "drama", "non-fiction"];
const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];
const CATEGORIES: Category[] = ["short", "fiction", "non-fiction"];

function Library() {
  const { t, dir } = useT();
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories.filter((s) =>
      (genre === "all" || s.genre === genre) &&
      (level === "all" || s.level === level) &&
      (category === "all" || (s.tags ?? []).includes(category)) &&
      (term === "" || s.title.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term))
    );
  }, [genre, level, category, q]);

  const isRtl = dir === "rtl";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="font-serif text-3xl">{t("library.title")}</h1>
          <p className="text-sm text-muted-foreground">{stories.length} {t("library.subtitle")}</p>
        </div>
        <div className="relative">
          <Search className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRtl ? "right-3" : "left-3"}`} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("common.searchPlaceholder")}
            className={`w-full rounded-lg border border-border bg-card py-2.5 text-sm outline-none ring-ring/50 focus:ring-2 ${isRtl ? "pr-9 pl-3 text-right" : "pl-9 pr-3 text-left"}`}
          />
        </div>
        <div className={`flex flex-wrap items-center gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
          <FilterChip active={genre === "all"} onClick={() => setGenre("all")}>{t("common.allCategories")}</FilterChip>
          {GENRES.map((g) => (
            <FilterChip key={g} active={genre === g} onClick={() => setGenre(g)}>
              {t(`genre.${g}`)}
            </FilterChip>
          ))}
        </div>
        <div className={`flex flex-wrap items-center gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
          <FilterChip active={level === "all"} onClick={() => setLevel("all")}>{t("common.allLevels")}</FilterChip>
          {LEVELS.map((l) => (
            <FilterChip key={l} active={level === l} onClick={() => setLevel(l)}>
              {t(`level.${l}`)}
            </FilterChip>
          ))}
        </div>
        <div className={`flex flex-wrap items-center gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>{t("common.allTypes")}</FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
              {t(`category.${c}`)}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">{t("common.noMatch")}</p>
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
