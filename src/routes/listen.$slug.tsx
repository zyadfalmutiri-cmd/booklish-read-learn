import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Headphones } from "lucide-react";
import { getStory } from "@/data/stories";
import { AudioPlayer } from "@/components/booklish/AudioPlayer";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/listen/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Listening: ${loaderData.story.title} — Booklish` }] : [],
  }),
  component: ListenPage,
});

function ListenPage() {
  const { story } = Route.useLoaderData() as { story: import("@/lib/types").Story };
  const { t } = useT();

  return (
    <div className="min-h-screen">
      <div className="sticky top-14 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-1.5 px-3 py-2 sm:gap-2 sm:px-4">
          <Link
            to="/library"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{story.title}</div>
        </div>
      </div>

      <div className="reading-column px-4 py-8">
        {!story.audio ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center font-sans">
            <Headphones className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">الصوت غير متاح لهذه القصة حاليًا</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mb-2 text-5xl">{story.cover}</div>
              <h1 className="text-xl font-bold">{story.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{story.blurb}</p>
            </div>

            <AudioPlayer audioUrl={story.audio.url} duration={story.audio.duration} />

            <div className="mt-8 rounded-xl border border-border bg-card p-5 text-center font-sans">
              <p className="text-sm text-muted-foreground">{t("read.finishedQ")}</p>
              <Link
                to="/quiz/$slug"
                params={{ slug: story.slug }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("read.takeQuiz")}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
