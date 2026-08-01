import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Lock, CheckCircle2, GraduationCap, BookOpen } from "lucide-react";
import { stories } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useUserLevel, CEFR_TO_STORY_LEVEL, STORIES_TO_ADVANCE } from "@/lib/reading-level";
import { useT } from "@/lib/i18n";

interface ScoreMap { [slug: string]: { score: number; total: number; at: number } }
type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "Journey — Booklish" }] }),
  component: Journey,
});

function Journey() {
  const { data, hydrated, storiesLeft, isMaxLevel, info } = useUserLevel();
  const [scores] = useLocalStore<ScoreMap>(storeKeys.quizScores, {});
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const { lang } = useT();
  const ar = lang === "ar";

  const allowedLevels = CEFR_TO_STORY_LEVEL[data.cefrLevel] ?? [];
  const pathStories = useMemo(
    () => stories.filter((s) => allowedLevels.includes(s.level)),
    [allowedLevels]
  );

  const firstIncompleteIndex = pathStories.findIndex((s) => !scores[s.slug]);
  const allDone = pathStories.length > 0 && firstIncompleteIndex === -1;
  const progressPct = hydrated ? Math.round((data.storiesFinishedAtLevel / STORIES_TO_ADVANCE) * 100) : 0;

  if (!hydrated) return null;

  if (!data.placementDone) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-8 text-center">
        <div className="rounded-xl border border-dashed border-border bg-card p-8">
          <GraduationCap className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h1 className="mb-2 font-serif text-xl">{ar ? "حدد مستواك أولاً" : "Find your level first"}</h1>
          <p className="mb-4 text-sm text-muted-foreground">
            {ar
              ? "خذ اختبار قصير عشان نبني لك مسار قراءة مناسب لمستواك."
              : "Take a short test so we can build your reading path."}
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {ar ? "ابدأ الاختبار" : "Start test"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8">
      <h1 className="mb-4 font-serif text-2xl">{ar ? "رحلتك" : "Journey"}</h1>

      {/* Level + progress card */}
      <section className={`mb-6 rounded-xl bg-gradient-to-br ${info.color} p-4`}>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl font-bold">{data.cefrLevel}</span>
          <span className="text-sm font-medium">{ar ? info.nameAr : info.nameEn}</span>
        </div>
        {!isMaxLevel ? (
          <>
            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-black/25 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs opacity-80">
              {ar
                ? `أكمل ${storiesLeft} قصة كمان مع اختباراتها عشان تنتقل للمستوى التالي`
                : `Finish ${storiesLeft} more stories (with their quiz) to unlock the next level`}
            </p>
          </>
        ) : (
          <p className="text-xs font-medium opacity-80">
            {ar ? "وصلت لأعلى مستوى!" : "You reached the top level!"}
          </p>
        )}
      </section>

      {allDone && !isMaxLevel && (
        <div className="mb-6 rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          {ar
            ? "أنهيت كل القصص المتوفرة في مستواك الحالي. تقدر تعيد قراءتها لين نضيف قصص جديدة."
            : "You've finished every available story at your level. Re-read them until new ones are added."}
        </div>
      )}

      {pathStories.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {ar ? "ما فيه قصص متاحة لمستواك حاليًا." : "No stories available for your level yet."}
        </p>
      ) : (
        <ol className="space-y-4">
          {pathStories.map((s, i) => {
            const done = !!scores[s.slug];
            const isCurrent = i === firstIncompleteIndex;
            const locked = !done && !isCurrent;
            const p = progress[s.slug];
            const readingDone = p?.finished;

            return (
              <li key={s.slug}>
                <div
                  className={`flex items-start gap-4 rounded-xl border p-4 ${
                    locked ? "border-border bg-muted/40 opacity-60" : "border-border bg-card"
                  }`}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : locked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <span className="text-sm font-medium">{i + 1}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        done
                          ? "bg-primary/10 text-primary"
                          : locked
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {done ? (ar ? "مكتملة" : "Done") : locked ? (ar ? "مقفلة" : "Locked") : ar ? "الحالية" : "Current"}
                    </span>

                    <div
                      className={`mb-3 grid h-24 w-full place-items-center overflow-hidden rounded-lg bg-gradient-to-br ${s.coverHue}`}
                    >
                      {s.coverImage ? (
                        <img src={s.coverImage} alt={s.title} className="h-full w-full object-cover" />
                      ) : (
                        <BookOpen className="h-8 w-8 text-foreground/30" aria-hidden="true" />
                      )}
                    </div>

                    <div className="mb-1 font-serif text-base">{s.title}</div>
                    <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">{s.blurb}</p>

                    {!locked && (
                      <div className="flex flex-wrap gap-2">
                        {!readingDone ? (
                          <Link
                            to="/read/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                          >
                            {p?.pct ? (ar ? "أكمل القراءة" : "Continue reading") : ar ? "ابدأ القراءة" : "Start reading"}
                          </Link>
                        ) : !done ? (
                          <Link
                            to="/quiz/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                          >
                            {ar ? "ابدأ الاختبار" : "Take the quiz"}
                          </Link>
                        ) : (
                          <Link
                            to="/read/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
                          >
                            {ar ? "إعادة القراءة" : "Re-read"}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}

          {!isMaxLevel && (
            <li>
              <div className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 opacity-70">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="mb-1 font-serif text-sm">{ar ? "المستوى التالي" : "Next level"}</div>
                  <p className="text-xs text-muted-foreground">
                    {ar ? `أكمل ${storiesLeft} قصة كمان لفتحه` : `Finish ${storiesLeft} more stories to unlock`}
                  </p>
                </div>
              </div>
            </li>
          )}
        </ol>
      )}
    </main>
  );
}
