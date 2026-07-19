import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getLibraryBookMeta,
  getLibraryBookContent,
  getReadingProgress,
  saveReadingProgress,
} from "@/lib/library.service";
import type { LibraryBookContent } from "@/types/library";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/library/book/$slug")({
  component: LibraryReaderPage,
});

function LibraryReaderPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const [content, setContent] = useState<LibraryBookContent | null>(null);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const meta = await getLibraryBookMeta(slug);
      const full = await getLibraryBookContent(meta.storage_path);
      setContent(full);
      if (user) {
        const saved = await getReadingProgress(user.id, slug);
        setChapterIndex(Math.min(saved, full.chapters.length - 1));
      }
      setLoading(false);
    })();
  }, [slug, user]);

  useEffect(() => {
    if (user && content) {
      saveReadingProgress(user.id, slug, chapterIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIndex]);

  if (loading || !content) {
    return <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>;
  }

  const chapter = content.chapters[chapterIndex];
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === content.chapters.length - 1;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-28">
      <div className="mb-4">
        <h1 className="text-lg font-semibold">{content.title}</h1>
        <p className="text-sm text-muted-foreground">{content.author}</p>
        <p className="text-xs text-muted-foreground mt-1">
          الفصل {chapterIndex + 1} من {content.chapters.length}
        </p>
      </div>

      <article className="prose prose-sm max-w-none whitespace-pre-line leading-relaxed">
        <h2 className="text-base font-semibold mb-3">{chapter.heading}</h2>
        {chapter.text}
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 flex justify-between gap-3 z-40">
        <button
          disabled={isFirst}
          onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
          className="flex-1 py-2 rounded-lg border disabled:opacity-40"
        >
          السابق
        </button>
        <button
          disabled={isLast}
          onClick={() =>
            setChapterIndex((i) => Math.min(content.chapters.length - 1, i + 1))
          }
          className="flex-1 py-2 rounded-lg bg-[oklch(0.48_0.14_35)] text-white disabled:opacity-40"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
