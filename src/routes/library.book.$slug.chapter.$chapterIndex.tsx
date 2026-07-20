import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  getLibraryBookMeta,
  getLibraryBookContent,
  getReadingProgress,
  saveReadingProgress,
} from "@/lib/library.service";
import type { LibraryBookContent } from "@/types/library";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/library/book/$slug/chapter/$chapterIndex")({
  component: ChapterReaderPage,
});

function ChapterReaderPage() {
  const { slug, chapterIndex } = Route.useParams();
  const index = Number(chapterIndex);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<LibraryBookContent | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const meta = await getLibraryBookMeta(slug);
      const full = await getLibraryBookContent(meta.storage_path);
      setContent(full);
      if (user) {
        const saved = await getReadingProgress(user.id, slug);
        setUnlockedCount(Math.max(1, saved + 1));
      }
      setLoading(false);
    })();
  }, [slug, user]);

  if (loading || !content) {
    return <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>;
  }

  // Guard: don't allow reading chapters ahead of what's unlocked
  if (index > unlockedCount - 1 && index !== 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        هذا الفصل مقفل — أكمل الفصول السابقة أولاً.
      </div>
    );
  }

  const chapter = content.chapters[index];
  const isLast = index === content.chapters.length - 1;

  const handleContinue = async () => {
    if (user && index >= unlockedCount - 1) {
      await saveReadingProgress(user.id, slug, index + 1);
    }
    if (isLast) {
      navigate({ to: "/library/book/$slug", params: { slug } });
    } else {
      navigate({
        to: "/library/book/$slug/chapter/$chapterIndex",
        params: { slug, chapterIndex: String(index + 1) },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-28">
      <Link
        to="/library/book/$slug"
        params={{ slug }}
        className="mb-4 inline-grid h-9 w-9 place-items-center rounded-full bg-muted"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground">
          {content.title} — الفصل {index + 1} من {content.chapters.length}
        </p>
        <h1 className="text-lg font-semibold mt-1">{chapter.heading}</h1>
      </div>

      <article className="prose prose-sm max-w-none whitespace-pre-line leading-relaxed">
        {chapter.text}
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 z-40">
        <button
          onClick={handleContinue}
          className="w-full py-3 rounded-lg bg-[oklch(0.48_0.14_35)] text-white font-medium"
        >
          {isLast ? "إنهاء الكتاب" : "أكملت الفصل — التالي"}
        </button>
      </div>
    </div>
  );
}