import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Search, TrendingUp, GraduationCap, X, BookOpen } from "lucide-react";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import type { Category, Genre } from "@/lib/types";
import { useT } from "@/lib/i18n";
import { useUserLevel, CEFR_TO_STORY_LEVEL, STORIES_TO_ADVANCE } from "@/lib/reading-level";
import { PlacementTest } from "@/components/booklish/placement-test";
import { getLibraryBooks } from "@/lib/library.service";
import type { LibraryBook } from "@/types/library";

export const Route = createFileRoute("/library")({
  component: Library,
});

const GENRES: Genre[] = ["mystery", "romance", "sci-fi", "adventure", "drama", "non-fiction"];
const CATEGORIES: Category[] = ["short", "fiction", "non-fiction", "sports"];

const LEVEL_COLORS: Record<string, string> = {
  B2: "bg-blue-500/90 text-white",
  C1: "bg-[oklch(0.48_0.14_35)] text-white",
  C2: "bg-[oklch(0.48_0.14_35)] text-white",
};

function Library() {
  const { t, dir } = useT();
  const { data, hydrated, storiesLeft, isMaxLevel, info, completePlacement } = useUserLevel();
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [showPlacementTest, setShowPlacementTest] = useState(false);

  const [fullBooks, setFullBooks] = useState<LibraryBook[]>([]);
  const [fullBooksLoading, setFullBooksLoading] = useState(true);
  const [fullBooksError, setFullBooksError] = useState<string | null>(null);

  useEffect(() => {
    getLibraryBooks()
      .then(setFullBooks)
      .catch((err) => {
        console.error("[library] failed to load full books", err);
        setFullBooksError(err?.message ?? String(err));
      })
      .finally(() => setFullBooksLoading(false));
  }, []);

  const allowedStoryLevels = null;
  const progressPct = hydrated ? Math.round((data.storiesFinishedAtLevel / STORIES_TO_ADVANCE) * 100) : 0;
  const isRtl = dir === "rtl";

  const isBrowsing = genre === "all" && category === "all" && q.trim() === "";

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories.filter((s) =>
      (allowedStoryLevels === null || allowedStoryLevels.includes(s.level)) &&
      (genre === "all" || s.genre === genre) &&
      (category === "all" || (s.tags ?? []).includes(category)) &&
      (term === "" || s.title.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term))
    );
  }, [genre, category, q, allowedStoryLevels]);

  // تجميع القصص حسب النوع لعرض الصفوف الأفقية عند التصفح الحر
  const storiesByGenre = useMemo(() => {
    const map = new Map<Genre, typeof stories>();
    for (const g of GENRES) {
      const list = stories.filter((s) => s.genre === g);
      if (list.length > 0) map.set(g, list);
    }
    return map;
  }, []);

  const sportsStories = useMemo(() => stories.filter((s) => (s.tags ?? []).includes("sports")), []);
  const shortStories = useMemo(() => stories.filter((s) => (s.tags ?? []).includes("short")), []);

  if (showPlacementTest) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowPlacementTest(false)}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <PlacementTest
          onComplete={(result) => {
            completePlacement(result);
            setShowPlacementTest(false);
          }}
        />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      {hydrated && data.placementDone && (
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
      )}

      {hydrated && !data.placementDone && (
        <button
          onClick={() => setShowPlacementTest(true)}
          className="mb-6 flex w-full items-center gap-3 rounded-xl border border-dashed border-border bg-card p-4 text-left transition-colors hover:bg-muted"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">حدد مستواك في اللغة</div>
            <div className="text-xs text-muted-foreground">اختبار قصير يساعدنا نرشح لك القصص المناسبة</div>
          </div>
        </button>
      )}

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

      {isBrowsing ? (
        <div className="space-y-8">
          {shortStories.length > 0 && <GenreRow title="قصص قصيرة" stories={shortStories} />}
          {Array.from(storiesByGenre.entries()).map(([g, list]) => (
            <GenreRow key={g} title={t(`genre.${g}`)} stories={list} />
          ))}
          {sportsStories.length > 0 && <GenreRow title="رياضة" stories={sportsStories} />}
          {!fullBooksLoading && fullBooksError && (
            <p className="rounded-lg border border-red-400 bg-red-50 p-3 text-xs text-red-700 dir-ltr text-left">
              library_books error: {fullBooksError}
            </p>
          )}
          {!fullBooksLoading && !fullBooksError && fullBooks.length === 0 && (
            <p className="text-xs text-muted-foreground">لا توجد كتب كاملة حالياً (fullBooks = 0)</p>
          )}
          {!fullBooksLoading && fullBooks.length > 0 && <FullBooksRow title="روايات كاملة" books={fullBooks} />}
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">{t("common.noMatch")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((s) => <StoryCard key={s.slug} story={s} />)}</div>
      )}
    </main>
  );
}

function GenreRow({ title, stories: rowStories }: { title: string; stories: typeof stories }) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-xl">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rowStories.map((s) => (
          <div key={s.slug} className="w-40 shrink-0">
            <StoryCard story={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FullBooksRow({ title, books }: { title: string; books: LibraryBook[] }) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-xl">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {books.map((b) => (
          <Link
            key={b.slug}
            to="/library/book/$slug"
            params={{ slug: b.slug }}
            className="paper-card w-40 shrink-0 p-3 flex flex-col gap-2 hover:bg-muted transition-colors"
          >
            <div className="aspect-[2/3] rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {b.cover_url ? (
                <img src={b.cover_url} alt={b.title} className="w-full h-full object-cover" />
              ) : (
                <BookOpen className="h-8 w-8 text-foreground/30" aria-hidden="true" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm leading-tight line-clamp-2">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.author}</p>
            </div>
            <span className={`self-start text-[10px] font-semibold px-1.5 py-0.5 rounded ${LEVEL_COLORS[b.level] ?? "bg-muted text-foreground"}`}>
              {b.level}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}>
      {children}
    </button>
  );
}
