import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Clock, ArrowRight } from "lucide-react";
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

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <div className={`mb-8 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br ${story.coverHue} text-7xl`}>
        {story.cover}
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

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <Link
          to="/read/$slug"
          params={{ slug: story.slug }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {pct > 0 ? `${t("story.continue")} (${pct}%)` : t("story.start")} <ArrowRight className={arrowClass} />
        </Link>
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
        >
          {saved ? <><BookmarkCheck className="h-4 w-4 text-primary" /> {t("story.bookmarked")}</> : <><Bookmark className="h-4 w-4" /> {t("story.bookmark")}</>}
        </button>
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
