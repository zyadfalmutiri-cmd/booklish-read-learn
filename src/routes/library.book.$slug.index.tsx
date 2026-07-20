import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, LockOpen, CheckCircle2, ChevronLeft } from "lucide-react";
import {
  getLibraryBookMeta,
  getLibraryChapterList,
  getReadingProgress,
  type LibraryChapterMeta,
} from "@/lib/library.service";
import type { LibraryBook } from "@/types/library";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/library/book/$slug")({
  component: BookDetailPage,
});

const WORDS_PER_MINUTE = 200;

function formatDuration(wordCount: number): string {
  const totalSeconds = Math.max(30, Math.round((wordCount / WORDS_PER_MINUTE) * 60));
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function BookDetailPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const [meta, setMeta] = useState<LibraryBook | null>(null);
  const [chapters, setChapters] = useState<LibraryChapterMeta[]>([]);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [m, ch] = await Promise.all([
        getLibraryBookMeta(slug),
        getLibraryChapterList(slug),
      ]);
      setMeta(m);
      setChapters(ch);
      if (user) {
        const saved = await getReadingProgress(user.id, slug);
        setUnlockedCount(Math.max(1, Math.min(saved, ch.length)));
      }
      setLoading(false);
    })();
  }, [slug, user]);

  if (loading || !meta) {
    return <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>;
  }

  const completedCount = unlockedCount - 1;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <Link
        to="/library"
        className="mb-4 inline-grid h-9 w-9 place-items-center rounded-full bg-muted"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">{meta.title}</h1>
        <p className="text-muted-foreground mt-1">By {meta.author}</p>

        {meta.cover_url && (
          <img
            src={meta.cover_url}
            alt={meta.title}
            className="w-40 mx-auto mt-4 rounded-lg shadow-lg"
          />
        )}

        <div className="flex justify-center gap-2 mt-4">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted">
            {meta.level}
          </span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted">
            {completedCount}/{chapters.length} فصل
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => {
          const isCompleted = index < completedCount;
          const isCurrent = index === completedCount;

          return (
            <div
              key={chapter.chapter_index}
              className={`rounded-xl border p-4 transition-colors ${
                isCurrent
                  ? "border-[oklch(0.48_0.14_35)] bg-[oklch(0.48_0.14_35_/_0.05)]"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : isCurrent
                        ? "bg-[oklch(0.48_0.14_35)] text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isCurrent ? (
                    <LockOpen className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">الفصل {index + 1}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {chapter.heading}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                {formatDuration(chapter.word_count)} دقيقة
              </p>

              {isCurrent && (
                <Link
                  to="/library/book/$slug/chapter/$chapterIndex"
                  params={{ slug, chapterIndex: String(index) }}
                  className="mt-3 block text-center py-2.5 rounded-lg bg-[oklch(0.48_0.14_35)] text-white font-medium"
                >
                  ابدأ القراءة
                </Link>
              )}

              {isCompleted && (
                <Link
                  to="/library/book/$slug/chapter/$chapterIndex"
                  params={{ slug, chapterIndex: String(index) }}
                  className="mt-3 block text-center py-2 rounded-lg border border-border text-sm"
                >
                  إعادة القراءة
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
