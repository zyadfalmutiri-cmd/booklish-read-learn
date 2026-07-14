import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, MessageSquareText, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import type { StepVocabItem } from "@/types/step-vocab";

export const Route = createFileRoute("/step/daily-phrases")({
  component: DailyPhrasesPage,
});

function DailyPhrasesPage() {
  const { lang } = useT();
  const isAr = lang === "ar";
  const [items, setItems] = useState<StepVocabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    supabase
      .from("step_vocabulary")
      .select("*")
      .eq("source", "daily800")
      .order("word", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setItems(data as StepVocabItem[]);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        i.word.toLowerCase().includes(q) ||
        (i.meaning_ar ?? "").includes(query.trim())
    );
  }, [items, query]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
      <Link
        to="/step"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        {isAr ? "رجوع لـ STEP" : "Back to STEP"}
      </Link>

      <div className="mb-4 flex items-center gap-2">
        <MessageSquareText className="h-6 w-6 text-primary" />
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          {isAr ? "عبارات يومية" : "Daily Phrases"}
        </h1>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {isAr
          ? `${items.length} كلمة وعبارة أساسية لحياتك اليومية`
          : `${items.length} essential everyday words and phrases`}
      </p>

      <div className="relative mb-4">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isAr ? "ابحث عن كلمة..." : "Search a word..."}
          className="w-full rounded-full border border-border bg-background py-2.5 ps-9 pe-4 text-sm text-foreground"
        />
      </div>

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">
          {isAr ? "جارٍ التحميل..." : "Loading..."}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          {isAr ? "لا توجد نتائج" : "No results"}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-background p-3.5"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="font-serif text-base font-semibold text-foreground" dir="ltr">
                  {item.word}
                </span>
                <span className="text-sm font-medium text-primary">
                  {item.meaning_ar}
                </span>
              </div>
              {item.example_en && (
                <p className="text-xs italic text-muted-foreground" dir="ltr">
                  {item.example_en}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
