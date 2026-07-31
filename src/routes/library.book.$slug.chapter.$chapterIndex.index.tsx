import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Volume2, Square } from "lucide-react";
import {
  getLibraryBookMeta,
  getLibraryChapterList,
  getLibraryChapterContent,
  getReadingProgress,
} from "@/lib/library.service";
import { useAuth } from "@/hooks/use-auth";
import { Reader } from "@/components/booklish/reader";
import { useSettings, READER_THEME_STYLES } from "@/components/booklish/theme";
import { ReadingSettingsSheet } from "@/components/booklish/reading-settings-sheet";
import { useSpeaking } from "@/lib/tts";
import type { Story } from "@/lib/types";

export const Route = createFileRoute("/library/book/$slug/chapter/$chapterIndex/")({
  component: ChapterReaderPage,
});

function ChapterReaderPage() {
  const { slug, chapterIndex } = Route.useParams();
  const index = Number(chapterIndex);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { speaking, toggle } = useSpeaking(`library-${slug}-${chapterIndex}`);
  const [settings] = useSettings();
  const isArabicUi = settings.uiLanguage === "ar";
  const readerThemeStyle = READER_THEME_STYLES[settings.readerTheme];
  const [showReadingSettings, setShowReadingSettings] = useState(false);

  const [bookTitle, setBookTitle] = useState("");
  const [bookMeta, setBookMeta] = useState<{ level: string; genre: string } | null>(null);
  const [chapterCount, setChapterCount] = useState(0);
  const [chapter, setChapter] = useState<{ heading: string; content: string } | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [meta, chapterList, ch] = await Promise.all([
          getLibraryBookMeta(slug),
          getLibraryChapterList(slug),
          getLibraryChapterContent(slug, index),
        ]);
        setBookTitle(meta.title);
        setBookMeta({ level: meta.level, genre: meta.genre });
        setChapterCount(chapterList.length);
        setChapter({ heading: ch.heading, content: ch.content });
        if (user) {
          const saved = await getReadingProgress(user.id, slug);
          setUnlockedCount(Math.max(1, saved));
        }
      } catch (err: any) {
        console.error("[library chapter] failed to load", err);
        setError(err?.message ?? String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, index, user]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 text-sm" dir="ltr">
        library chapter error: {error}
      </div>
    );
  }

  if (loading || !chapter || !bookMeta) {
    return <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>;
  }

  if (index > unlockedCount - 1 && index !== 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        هذا الفصل مقفل — أكمل الفصول السابقة أولاً.
      </div>
    );
  }

  const isLast = index === chapterCount - 1;

  const fakeStory: Story = {
    slug: `${slug}-ch${index}`,
    title: chapter.heading,
    minutes: Math.max(1, Math.round(chapter.content.split(/\s+/).length / 200)),
    genre: bookMeta.genre as Story["genre"],
    level: bookMeta.level as Story["level"],
    paragraphs: chapter.content.split(/\n\n+/),
    vocab: {},
  } as unknown as Story;

  const handleContinue = () => {
    navigate({
      to: "/library/book/$slug/chapter/$chapterIndex/quiz",
      params: { slug, chapterIndex: String(index) },
    });
  };

  return (
    <div className="max-w-2xl mx-auto pb-28">
      <div className="px-4 pt-4">
        <Link
          to="/library/book/$slug"
          params={{ slug }}
          className="mb-2 inline-grid h-9 w-9 place-items-center rounded-full bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {bookTitle} — الفصل {index + 1} من {chapterCount}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowReadingSettings(true)}
              className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-xs font-semibold"
              aria-label={isArabicUi ? "إعدادات القراءة" : "Reading settings"}
              title={isArabicUi ? "إعدادات القراءة" : "Reading settings"}
            >
              Aa
            </button>
            <button
              type="button"
              onClick={() => toggle(chapter.content)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs"
            >
              {speaking ? (
                <><Square className="h-3 w-3" /> إيقاف</>
              ) : (
                <><Volume2 className="h-3 w-3" /> استماع للفصل</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: readerThemeStyle.background, color: readerThemeStyle.color }}>
        <Reader story={fakeStory} onScrollPct={() => {}} />
      </div>

      <ReadingSettingsSheet open={showReadingSettings} onClose={() => setShowReadingSettings(false)} />

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 z-40">
        <button
          onClick={handleContinue}
          className="w-full py-3 rounded-lg bg-[oklch(0.48_0.14_35)] text-white font-medium"
        >
          أكملت الفصل — أسئلة الاستيعاب
        </button>
      </div>
    </div>
  );
}
