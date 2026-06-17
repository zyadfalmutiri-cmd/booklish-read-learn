import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";
import { FREE_STORY_SLUGS } from "@/lib/plan-limits";
import { useSubscription } from "@/hooks/use-subscription";
import { ProBadge, LockIcon, PaywallDialog } from "./paywall";

export function StoryCard({ story }: { story: Story }) {
  const { t, lang } = useT();
  const { isPro } = useSubscription();
  const ar = lang === "ar";
  const isFree = FREE_STORY_SLUGS.includes(story.slug);
  const isLocked = !isFree && !isPro;
  const [showPaywall, setShowPaywall] = useState(false);

  const cardContent = (
    <div className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${story.coverHue} text-5xl`}>
        <span className="drop-shadow-sm">{story.cover}</span>
        {isLocked && <LockIcon />}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{t(`genre.${story.genre}`)}</span>
          <span aria-hidden>·</span>
          <span>{t(`level.${story.level}`)}</span>
          <span aria-hidden>·</span>
          <span>{story.minutes} {t("common.minutes")}</span>
          {isLocked && (
            <>
              <span aria-hidden>·</span>
              <ProBadge ar={ar} />
            </>
          )}
        </div>
        <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary">
          {story.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{story.blurb}</p>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <>
        <button type="button" onClick={() => setShowPaywall(true)} className="w-full text-left">
          {cardContent}
        </button>
        <PaywallDialog
          open={showPaywall}
          onClose={() => setShowPaywall(false)}
          reason="story"
        />
      </>
    );
  }

  return (
    <Link to="/story/$slug" params={{ slug: story.slug }}>
      {cardContent}
    </Link>
  );
}

export const genreLabel: Record<Story["genre"], string> = {
  mystery: "Mystery", romance: "Romance", "sci-fi": "Sci-Fi",
  adventure: "Adventure", drama: "Drama", "non-fiction": "Non-Fiction",
};
export const levelLabel: Record<Story["level"], string> = {
  beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
};
