import { Link } from "@tanstack/react-router";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";

export function StoryCard({ story }: { story: Story }) {
  const { t } = useT();

  return (
    <Link to="/story/$slug" params={{ slug: story.slug }}>
      <div className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${story.coverHue} text-5xl`}>
          <span className="drop-shadow-sm">{story.cover}</span>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>{t(`genre.${story.genre}`)}</span>
            <span aria-hidden>·</span>
            <span>{t(`level.${story.level}`)}</span>
            <span aria-hidden>·</span>
            <span>{story.minutes} {t("common.minutes")}</span>
          </div>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
            {story.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{story.blurb}</p>
        </div>
      </div>
    </Link>
  );
}
