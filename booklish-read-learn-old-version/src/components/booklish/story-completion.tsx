import { Link } from "@tanstack/react-router";
import { CheckCircle2, BookOpen, Zap, Clock, BookMarked, ArrowRight } from "lucide-react";
import { stories } from "@/data/stories";
import { useT } from "@/lib/i18n";

interface StoryCompletionProps {
  storySlug: string;
  storyTitle: string;
  readingSeconds: number;
  newWords: number;
  xpEarned: number;
  onDismiss: () => void;
}

function getNextStory(currentSlug: string) {
  const idx = stories.findIndex((s) => s.slug === currentSlug);
  return idx >= 0 && idx < stories.length - 1 ? stories[idx + 1] : null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m}m ${s}s`;
}

export function StoryCompletion({
  storySlug,
  storyTitle,
  readingSeconds,
  newWords,
  xpEarned,
  onDismiss,
}: StoryCompletionProps) {
  const { lang } = useT();
  const ar = lang === "ar";
  const next = getNextStory(storySlug);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 pt-2 animate-slide-up"
      dir={ar ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              {ar ? "أنهيت القصة" : "Story complete"}
            </p>
            <p className="truncate font-serif text-base font-medium">{storyTitle}</p>
          </div>
          <button
            onClick={onDismiss}
            className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label={ar ? "إغلاق" : "Dismiss"}
          >
            {ar ? "إغلاق" : "Close"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border" dir="ltr">
          <StatItem
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            value={formatTime(readingSeconds)}
            label={ar ? "وقت القراءة" : "Read time"}
          />
          <StatItem
            icon={<BookMarked className="h-4 w-4 text-muted-foreground" />}
            value={String(newWords)}
            label={ar ? "كلمات جديدة" : "New words"}
          />
          <StatItem
            icon={<Zap className="h-4 w-4 text-yellow-500" />}
            value={`+${xpEarned}`}
            label="XP"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 p-4 sm:flex-row">
          <Link
            to="/quiz/$slug"
            params={{ slug: storySlug }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            {ar ? "ابدأ اختبار المفردات" : "Start vocab quiz"}
          </Link>
          {next ? (
            <Link
              to="/story/$slug"
              params={{ slug: next.slug }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {ar ? "القصة التالية" : "Next story"}
              <ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} />
            </Link>
          ) : (
            <Link
              to="/library"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {ar ? "المكتبة" : "Back to library"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-4 px-3 text-center">
      {icon}
      <span className="font-serif text-xl font-medium">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
