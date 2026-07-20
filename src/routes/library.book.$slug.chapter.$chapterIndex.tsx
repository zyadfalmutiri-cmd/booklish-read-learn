import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  getLibraryBookMeta,
  getLibraryChapterList,
  getLibraryChapterContent,
  getReadingProgress,
  unlockChapter,
} from "@/lib/library.service";
import { useAuth } from "@/hooks/use-auth";
import { Reader } from "@/components/booklish/reader"; // ⚠️ عدّل هذا المسار ليطابق مكان ملف الـ Reader الفعلي عندك
import type { Story } from "@/lib/types";

export const Route = createFileRoute("/library/book/$slug/chapter/$chapterIndex")({
  component: ChapterReaderPage,
});

function ChapterReaderPage() {
  const { slug, chapterIndex } = Route.useParams();
  const index = Number(chapterIndex);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookTitle, setBookTitle] = useState("");
  const [bookMeta, setBookMeta] = useState<{ level: string; genre: string } | null>(null);
  const [chapterCount, setChapterCount] = useState(0);
  const [chapter, setChapter] = useState<{ heading: string; content: string } | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
      setLoading(false);
    })();
  }, [slug, index, user]);

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

  const handleContinue = async () => {
    if (user) {
      try {
        // دالة قاعدة البيانات bump_library_progress تضمن رياضيًا إن العدد
        // لا يتراجع أبد، بغض النظر عن أي تأخير أو تزامن طلبات
        await unlockChapter(slug, index + 2);
      } catch (err) {
        console.error("[library] failed to unlock next chapter", err);
      }
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
    <div className="max-w-2xl mx-auto pb-28">
      <div className="px-4 pt-4">
        <Link
          to="/library/book/$slug"
          params={{ slug }}
          className="mb-2 inline-grid h-9 w-9 place-items-center rounded-full bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <p className="text-xs text-muted-foreground">
          {bookTitle} — الفصل {index + 1} من {chapterCount}
        </p>
      </div>

      <Reader story={fakeStory} onScrollPct={() => {}} />

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
