import { Link, useNavigate } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import type { Story } from "@/lib/types";
import { useT } from "@/lib/i18n";

const COVER_IMAGES: Record<string, string> = {
  "ronaldo-from-poverty-to-glory": "/covers/glory-of-ronaldo.PNG",
};

const GENRE_TINTS: Record<string, string> = {
  mystery: "cover-tint-ink",
  drama: "cover-tint-ink",
  romance: "cover-tint-rose",
  "sci-fi": "cover-tint-sage",
  adventure: "cover-tint-gold",
  "non-fiction": "cover-tint-paper",
};


const COVERS: Record<string, string> = {
  "a-birthday-surprise": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="gaabirthdaysurprise" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfa091"/><stop offset="100%" stop-color="#b17264"/></linearGradient><linearGradient id="gb[...]
<rect width="200" height="280" fill="url(#bgabirthdaysurprise)"/>
<ellipse cx="100" cy="130" rx="95" ry="80" fill="#fbf0ee" opacity="0.5"/>
<circle cx="26" cy="36" r="3" fill="#D88C7A" opacity="0.28"/>
<circle cx="172" cy="44" r="2" fill="#A14A3D" opacity="0.25"/>
<circle cx="182" cy="90" r="1.6" fill="#D88C7A" opacity="0.22"/>
<circle cx="18" cy="100" r="1.6" fill="#A14A3D" opacity="0.2"/>
<circle cx="150" cy="24" r="1.4" fill="#4A241C" opacity="0.18"/>
<circle cx="45" cy="20" r="1.2" fill="#4A241C" opacity="0.16"/>
<ellipse cx="100" cy="215" rx="58" ry="12" fill="#4A241C" opacity="0.14"/>
<g filter="url(#shabirthdaysurprise)">
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 75 160 75 190" fill="url(#gaabirthdaysurprise)"/>
<path d="M75 110 C55 90 25 105 25 130 C25 160 75 190 75 190 C75 190 125 160 125 130 C125 105 95 90 75 110Z" fill="url(#gaabirthdaysurprise)"/>
<path d="M130 130 C112 112 85 125 85 148 C85 174 130 200 130 200 C130 200 175 174 175 148 C175 125 148 112 130 130Z" fill="url(#gbabirthdaysurprise)"/>
</g>
<rect width="200" height="150" fill="url(#snabirthdaysurprise)"/>
</svg>`,
};

export function StoryCard({ story }: { story: Story }) {
  const { t } = useT();
  const navigate = useNavigate();
  const svg = COVERS[story.slug];
  const image = COVER_IMAGES[story.slug] || story.coverImage;

const levelStyles: Record<string, string> = {
    beginner: "bg-emerald-500 text-white",
    intermediate: "bg-yellow-500 text-white",
    advanced: "bg-red-500 text-white",
  };

  return (

    <Link to="/story/$slug" params={{ slug: story.slug }}>
      <div className="paper-card group relative block overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className={`relative flex h-40 items-center justify-center overflow-hidden ${!image && !svg ? GENRE_TINTS[story.genre] ?? "cover-tint-ink" : ""}`}>
          <span
            className={`absolute right-2 top-2 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${levelStyles[story.level] ?? "bg-muted text-muted-foreground"}`}
          >
            {t(`level.${story.level}`)}
          </span>
          {image ? (
  <img
    src={image}
    alt={story.title}
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
) : svg ? (

            <div
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{ lineHeight: 0 }}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="cover-rule" />
              <p className="font-serif text-base font-semibold leading-snug line-clamp-3">{story.title}</p>
              <span className="text-[10px] uppercase tracking-widest opacity-70">{t(`genre.${story.genre}`)}</span>
            </div>
          )}
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

          {story.audio && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate({ to: "/listen/$slug", params: { slug: story.slug } });
              }}
              className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <Headphones className="h-3.5 w-3.5" />
              الاستماع للقصة
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
