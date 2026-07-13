import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Flame,
  BookCheck,
  TrendingUp,
  Clock,
  BookOpen,
  SpellCheck,
  ListChecks,
  AlertTriangle,
  CalendarCheck,
  Timer,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useT } from "@/lib/i18n";
import { getOrCreateStepStats } from "@/lib/api/step-stats.service";
import type { StepStats } from "@/types/step";

export const Route = createFileRoute("/step")({
  component: StepPrepPage,
});

const sections = [
  { icon: BookOpen, ar: "القراءة", en: "Reading" },
  { icon: SpellCheck, ar: "القواعد", en: "Grammar" },
  { icon: ListChecks, ar: "المفردات", en: "Vocabulary" },
  { icon: BookCheck, ar: "إكمال الجمل", en: "Sentence Completion" },
  { icon: AlertTriangle, ar: "اكتشاف الخطأ", en: "Error Detection" },
  { icon: CalendarCheck, ar: "التحدي اليومي", en: "Daily Challenge" },
  { icon: Timer, ar: "اختبار تجريبي", en: "Mock Exam" },
  { icon: BarChart3, ar: "الإحصائيات", en: "Statistics" },
] as const;

function StepPrepPage() {
  const { user } = useAuth();
  const { lang } = useT();
  const [stats, setStats] = useState<StepStats | null>(null);
  const [loading, setLoading] = useState(true);
  const isAr = lang === "ar";

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getOrCreateStepStats(user.id)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center text-muted-foreground">
        {isAr ? "جارٍ التحميل..." : "Loading..."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
      <div className="mb-6 flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          {isAr ? "التحضير لاختبار STEP" : "STEP Prep"}
        </h1>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label={isAr ? "التقدم" : "Progress"}
          value={`${stats ? Math.min(100, stats.lessons_completed) : 0}%`}
        />
        <StatCard
          icon={Flame}
          label={isAr ? "الأيام المتتالية" : "Streak"}
          value={`${stats?.streak_days ?? 0}`}
        />
        <StatCard
          icon={BookCheck}
          label={isAr ? "الدروس المكتملة" : "Lessons"}
          value={`${stats?.lessons_completed ?? 0}`}
        />
        <StatCard
          icon={GraduationCap}
          label={isAr ? "الدرجة المتوقعة" : "Predicted"}
          value={`${stats?.predicted_score ?? "—"}`}
        />
      </div>

      {stats?.updated_at && (
        <p className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {isAr ? "آخر نشاط: " : "Last activity: "}
          {new Date(stats.updated_at).toLocaleDateString(isAr ? "ar" : "en")}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {sections.map(({ icon: Icon, ar, en }) => (
          <div
            key={en}
            className="relative flex flex-col items-start gap-2 rounded-2xl border border-border bg-background p-4 opacity-60"
          >
            <span className="absolute end-3 top-3 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {isAr ? "قريبًا" : "Soon"}
            </span>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {isAr ? ar : en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-3 text-center">
      <Icon className="mx-auto mb-1.5 h-5 w-5 text-primary" />
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
