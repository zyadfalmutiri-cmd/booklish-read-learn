import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLibraryBooks } from "@/lib/library.service";
import type { LibraryBook } from "@/types/library";

export const Route = createFileRoute("/library/")({
  component: LibraryPage,
});

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-green-100 text-green-800",
  A2: "bg-green-100 text-green-800",
  B1: "bg-blue-100 text-blue-800",
  B2: "bg-blue-100 text-blue-800",
  C1: "bg-[oklch(0.48_0.14_35_/_0.15)] text-[oklch(0.48_0.14_35)]",
  C2: "bg-[oklch(0.48_0.14_35_/_0.15)] text-[oklch(0.48_0.14_35)]",
};

function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLibraryBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div className="p-4 pb-24 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">المكتبة</h1>
      <div className="grid grid-cols-2 gap-3">
        {books.map((book) => (
          <Link
            key={book.slug}
            to="/library/$slug"
            params={{ slug: book.slug }}
            className="rounded-xl border bg-card p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
          >
            <div className="aspect-[2/3] rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">📖</span>
              )}
            </div>
            <div>
              <p className="font-medium text-sm leading-tight line-clamp-2">
                {book.title}
              </p>
              <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${LEVEL_COLORS[book.level]}`}
              >
                {book.level}
              </span>
              <span className="text-[10px] text-muted-foreground capitalize">
                {book.genre.replace("-", " ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
