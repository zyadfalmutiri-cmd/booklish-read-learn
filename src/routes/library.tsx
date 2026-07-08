import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Search, TrendingUp, GraduationCap, X } from "lucide-react";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import type { Category, Genre } from "@/lib/types";
import { useT } from "@/lib/i18n";
import { useUserLevel, CEFR_TO_STORY_LEVEL, STORIES_TO_ADVANCE } from "@/lib/reading-level";
import { PlacementTest } from "@/components/booklish/placement-test";

export const Route = createFileRoute("/library")({
  component: Library,
});

const GENRES: Genre[] = ["mystery", "romance", "sci-fi", "adventure", "drama", "non-fiction"];
const CATEGORIES: Category[] = ["short", "fiction", "non-fiction", "sports"];


function Library() {
  const { t, dir } = useT();
  const { data, hydrated, storiesLeft, isMaxLevel, info, completePlacement } = useUserLevel();
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [showPlacementTest, setShowPlacementTest] = useState(false);

  // قبل اكتمال الـ hydration، أو قبل تحديد المستوى، نعرض كل القصص
  // بدل ما نحجب الصفحة بمربع تحميل فاضي أو اختبار إجباري.
const allowedStoryLevels = null;
  const progressPct = hydrated ? Math.round((data.storiesFinishedAtLevel / STORIES_TO_ADVANCE) * 100) : 0;
  const isRtl = dir === "rtl";

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories.filter((s) =>
      (allowedStoryLevels === null || allowedStoryLevels.includes(s.level)) &&
      (genre === "all" || s.genre === genre) &&
      (category === "all" || (s.tags ?? []).includes(category)) &&
      (term === "" || s.title.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term))
    );
  }, [genre, category, q, allowedStoryLevels]);

  // اختبار تحديد المستوى الحين اختياري: يظهر كنافذة منفصلة لو المستخدم طلبه،
  // وما يمنع عرض قائمة القصص أبداً.
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

      {filtered.length === 0
        ? <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">{t("common.noMatch")}</p>
        : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((s) => <StoryCard key={s.slug} story={s} />)}</div>
      }
    </main>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}>
      {children}
    </button>
  );
}
