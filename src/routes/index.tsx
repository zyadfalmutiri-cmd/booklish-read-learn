import { createFileRoute, Link } from "@tanstack/react-router";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { ArrowRight, Flame } from "lucide-react";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Booklish — Learn English by Reading" },
      { name: "description", content: "Read short stories. Tap any word for an Arabic + English explanation. Track your progress as you go." },
    ],
  }),
  component: Home,
});

function Home() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const { streak } = useStreak();

  const continueEntry = Object.entries(progress)
    .filter(([, v]) => !v.finished && v.pct > 0)
    .sort((a, b) => b[1].lastAt - a[1].lastAt)[0];
  const continueStory = continueEntry ? stories.find((s) => s.slug === continueEntry[0]) : undefined;

  const featured = stories.slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:pt-16">
      <section className="mb-12 sm:mb-20">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Read. Tap. Learn.</p>
        <h1 className="mb-5 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-6xl">
          Learn English the way readers do — one story at a time.
        </h1>
        <p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          Booklish turns short stories and novels into language lessons. Tap any word for an Arabic meaning, an English definition, and an example — without ever leaving the page.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse the library <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Flame className="h-4 w-4 text-primary" /> {streak.current}-day streak
          </Link>
        </div>
      </section>

      {continueStory && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl">Continue reading</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${continueStory.coverHue} text-2xl`}>
                {continueStory.cover}
              </div>
              <div className="min-w-0">
                <div className="truncate font-serif text-lg">{continueStory.title}</div>
                <div className="text-xs text-muted-foreground">{continueEntry![1].pct}% read</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">Featured stories</h2>
          <Link to="/library" className="text-sm text-primary hover:underline">See all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => <StoryCard key={s.slug} story={s} />)}
        </div>
      </section>
    </main>
  );
}
