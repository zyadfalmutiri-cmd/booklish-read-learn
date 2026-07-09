import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Clock, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { getStory } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useT } from "@/lib/i18n";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/story/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.story.title} — Booklish` },
          { name: "description", content: loaderData.story.blurb },
        ]
      : [],
  }),
  component: StoryDetail,
});

function chapterKey(slug: string, index: number) {
  return `${slug}::ch${index}`;
}

function StoryDetail() {
  const { story } = Route.useLoaderData() as { story: import("@/lib/types").Story };
  const [bookmarks, setBookmarks] = useLocalStore<string[]>(storeKeys.bookmarks, []);
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const { t, dir } = useT();
  const saved = bookmarks.includes(story.slug);
  const pct = progress[story.slug]?.pct ?? 0;
  const arrowClass = dir === "rtl" ? "h-4 w-4 rotate-180" : "h-4 w-4";

  const toggle = () =>
    setBookmarks((prev) => (prev.includes(story.slug) ? prev.filter((s) => s !== story.slug) : [...prev, story.slug]));

  const vocabSample = Object.entries(story.vocab).slice(0, 6);
  const hasChapters = story.chapters && story.chapters.length > 0;

  const levelStyles: Record<string, string> = {
    beginner: "bg-emerald-500 text-white",
    intermediate: "bg-yellow-500 text-white",
    advanced: "bg-red-500 text-white",
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <div className={`mb-8 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${story.coverHue} text-7xl`}>
  {story.coverImage ? (
    <img src={story.coverImage} alt={story.title} className="h-full w-full object-cover" />
  ) : (
    story.cover
  )}
</div>


      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>{t(`genre.${story.genre}`)}</span>
        <span aria-hidden>·</span>
        <span>{t(`level.${story.level}`)}</span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {story.minutes} {t("common.minutes")}</span>
      </div>

      <h1 className="mb-4 font-serif text-3xl leading-tight sm:text-4xl" dir="ltr">{story.title}</h1>
      <p className="mb-8 text-base text-muted-foreground" dir="ltr">{story.blurb}</p>

      {!hasChapters && (
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Link
            to="/read/$slug"
            params={{ slug: story.slug }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {pct > 0 ? `${t("story.continue")} (${pct}%)` : t("story.start")} <ArrowRight className={arrowClass} />
          </Link>
          {pct >= 80 && (
            <Link
              to="/quiz/$slug"
              params={{ slug: story.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
            >
              {t("story.takeQuiz")}
            </Link>
          )}
        </div>
      )}

      {hasChapters && (
        <section className="mb-10">
          <h2 className="mb-3 font-serif text-lg">{dir === "rtl" ? "الفصول" : "Chapters"}</h2>
          <div className="space-y-3">
            {story.chapters!.map((chapter, index) => {
              const isFirst = index === 0;
              const prevDone = isFirst || (progress[chapterKey(story.slug, index - 1)]?.finished ?? false);
              const thisProgress = progress[chapterKey(story.slug, index)];
              const isDone = thisProgress?.finished ?? false;
              const locked = !prevDone;

              const content = (
                <div
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                    locked
                      ? "border-border bg-muted/40 opacity-60"
                      : "border-border bg-card hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-base">{chapter.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {locked
                        ? (dir === "rtl" ? "أكمل الفصل السابق أولاً" : "Finish the previous chapter first")
                        : isDone
                        ? (dir === "rtl" ? "مكتمل" : "Completed")
                        : (dir === "rtl" ? "متاح للقراءة" : "Ready to read")}
                    </div>
                  </div>
                  {locked ? (
                    <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : isDone ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <ArrowRight className={`${arrowClass} shrink-0 text-muted-foreground`} />
                  )}
                </div>
              );

              return locked ? (
                <div key={index}>{content}</div>
              ) : (
                <Link
                  key={index}
                  to="/read/$slug"
                  params={{ slug: story.slug }}
                  search={{ chapter: index }}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
        >
          {saved ? <><BookmarkCheck className="h-4 w-4 text-primary" /> {t("story.bookmarked")}</> : <><Bookmark className="h-4 w-4" /> {t("story.bookmark")}</>}
        </button>
      </div>

      <section>
        <h2 className="mb-3 font-serif text-lg">{t("story.keyVocab")}</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {vocabSample.map(([word, v]) => (
            <li key={word} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-base font-medium">{word}</span>
                <span dir="rtl" lang="ar" className="text-sm text-foreground/80">{v.ar}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{v.def}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
