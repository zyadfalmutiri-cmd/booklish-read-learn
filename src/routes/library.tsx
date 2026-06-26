import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import type { Category, Genre } from "@/lib/types";
import { useT } from "@/lib/i18n";
import { useUserLevel, CEFR_TO_STORY_LEVEL, STORIES_TO_ADVANCE } from "@/lib/reading-level";

export const Route = createFileRoute("/library")({
  component: Library,
});

const GENRES: Genre[] = ["mystery", "romance", "sci-fi", "adventure", "drama", "non-fiction"];
const CATEGORIES: Category[] = ["short", "fiction", "non-fiction"];

function Library() {
  const { t, dir } = useT();
  const { data, storiesLeft, isMaxLevel, info } = useUserLevel();
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const allowedStoryLevels = CEFR_TO_STORY_LEVEL[data.cefrLevel];
  const progressPct = Math.round((data.storiesFinishedAtLevel / STORIES_TO_ADVANCE) * 100);
  const isRtl = dir === "rtl";

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories.filter((s) =>
      allowedStoryLevels.includes(s.level) &&
      (genre === "all" || s.genre === genre) &&
      (category === "all" || (s.tags ?? []).includes(category)) &&
      (term === "" || s.title.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term))
    );
  }, [genre, category, q, allowedStoryLevels]);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <div className={`mb-6 rounded-xl bg-gradient-to-br ${info.color} p-4`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-0.5 flex items-center gap-2">
              <span className="text-2xl font-bold">{data.cefrLevel}</span>
              <span className="text-sm font-medium">{info.nameAr}</span>
            </div>
            <p className="text-xs opacity-80">{info.descAr}</p>
          </div>
          {!isMaxLevel && (
            <div className="text-right text-xs opacity-80">
              <TrendingUp className="mb-1 h-4 w-4 inline" /><br />
              {storiesLeft} قصة للمستوى التالي
            </div>
          )}
        </div>
        {!isMaxLevel && (
          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-black/20 transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}
        {isMaxLevel && <p className="mt-2 text-xs font-medium opacity-80">🎓 وصلت للمستوى الأعلى!</p>}
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <h1 className="font-serif text-3xl">{t("library.title")}</h1>
        <div className="relative">
          <Search className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRtl ? "right-3" : "left-3"}`} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.searchPlaceholder")}
            className={`w-full rounded-lg border border-border bg-card py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 ${isRtl ? "pr-9 pl-3 text-right" : "pl-9 pr-3"}`} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={genre === "all"} onClick={() => setGenre("all")}>{t("common.allCategories")}</Chip>
          {GENRES.map((g) => <Chip key={g} active={genre === g} onClick={() => setGenre(g)}>{t(`genre.${g}`)}</Chip>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>{t("common.allTypes")}</Chip>
          {CATEGORIES.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{t(`category.${c}`)}</Chip>)}
        </div>
      </div>

      {filtered.length === 0
        ? <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">{t("common.noMatch")}</p>
        : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((s) => <StoryCard key={s.slug} story={s} />)}</div>
      }
    </main>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}>
      {children}
    </button>
  );
}
