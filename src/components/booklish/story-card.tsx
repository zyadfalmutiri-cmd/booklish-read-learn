import { Link } from "@tanstack/react-router";
import type { Story } from "@/lib/types";

const levelLabel: Record<Story["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const genreLabel: Record<Story["genre"], string> = {
  mystery: "Mystery",
  romance: "Romance",
  "sci-fi": "Sci-Fi",
  adventure: "Adventure",
  drama: "Drama",
  "non-fiction": "Non-Fiction",
};

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to="/story/$slug"
      params={{ slug: story.slug }}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${story.coverHue} text-5xl`}>
        <span className="drop-shadow-sm">{story.cover}</span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{genreLabel[story.genre]}</span>
          <span aria-hidden>·</span>
          <span>{levelLabel[story.level]}</span>
          <span aria-hidden>·</span>
          <span>{story.minutes} min</span>
        </div>
        <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary">{story.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{story.blurb}</p>
      </div>
    </Link>
  );
}

export { genreLabel, levelLabel };
