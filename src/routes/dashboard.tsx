import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, BookOpen, GraduationCap, Sparkles, Clock, Hand, Zap } from "lucide-react";
import { stories } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useStats, formatDuration } from "@/lib/stats";
import { useT } from "@/lib/i18n";
import { useXp, LEVELS } from "@/lib/xp";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean; readingSeconds?: number }>;
interface ScoreMap { [slug: string]: { score: number; total: number; at: number } }
interface SavedWord { word: string; slug: string; at: number }

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Booklish" }] }),
  component: Dashboard,
});

function isSameDay(ts: number, ref: Date) {
  const d = new Date(ts);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
}

function Dashboard() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [scores] = useLocalStore<ScoreMap>(storeKeys.quizScores, {});
  const [vocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [stats] = useStats();
  const { streak } = useStreak();
  const { xp, level, progress: lvlProgress, xpToNext } = useXp();
  const { t, lang } = useT();
  const ar = lang === "ar";

  const finished = Object.values(progress).filter((p) => p.finished).length;
  const inProgress = Object.entries(progress).filter(([, p]) => !p.finished && p.pct > 0);
  const scoreEntries = Object.values(scores);
  const avgScorePct = scoreEntries.length
    ? Math.round((scoreEntries.reduce((acc, s) => acc + s.score / s.total, 0) / scoreEntries.length) * 100)
    : 0;

  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      key,
      active: streak.days.includes(key),
      isToday: i === 6,
      label: d.toLocaleDateString(ar ? "ar" : "en", { weekday: "short" }),
    };
  });

  const chaptersToday = Object.values(progress).filter((p) => isSameDay(p.lastAt, today)).length;
  const quizzesToday = scoreEntries.filter((s) => isSameDay(s.at, today)).length;
  const dailyGoalChapters = 1;
  const dailyGoalQuizzes = 4;
  const goalPct = Math.min(
    100,
    Math.round(((Math.min(chaptersToday, dailyGoalChapters) + Math.min(quizzesToday, dailyGoalQuizzes)) /
      (dailyGoalChapters + dailyGoalQuizzes)) * 100)
  );
  const levelIndex = LEVELS.findIndex((l) => l.name === level.name) + 1;

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-6">
      <h1 className="mb-6 font-serif text-2xl">{ar ? "الملف الشخصي" : "Profile"}</h1>

      {/* Avatar + level */}
      <div className="mb-6 flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">
          {level.icon}
        </div>
        <div>
          <div className="font-serif text-lg">{ar ? level.nameAr : level.nameEn}</div>
          <div className="text-sm tabular-nums text-muted-foreground">{xp} XP</div>
        </div>
      </div>

      {/* Daily goal card */}
      <section className="mb-4 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-base">{ar ? "هدفك اليومي" : "Daily Goal"}</h2>
        <div className="mb-4 flex items-center gap-4">
          <div
            className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full"
            style={{ background: `conic-gradient(var(--color-primary) ${goalPct * 3.6}deg, var(--color-muted) 0deg)` }}
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-card text-sm font-medium">{goalPct}%</div>
          </div>
          <div className="flex-1 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {ar ? "فصول" : "Chapters"}</span>
              <span className="tabular-nums text-muted-foreground">{chaptersToday}/{dailyGoalChapters}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {ar ? "اختبارات" : "Practice Tests"}</span>
              <span className="tabular-nums text-muted-foreground">{quizzesToday}/{dailyGoalQuizzes}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-1.5">
          {days.map((d) => (
            <div
              key={d.key}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 ${
                d.active ? "bg-primary/10" : d.isToday ? "bg-muted" : "bg-muted/40"
              }`}
            >
              <div className={`h-2.5 w-2.5 rounded-full ${d.active ? "bg-primary" : "bg-muted-foreground/30"}`} />
              <span className="text-[10px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* My Progress */}
      <section className="mb-4 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-base">{ar ? "تقدمي" : "My Progress"}</h2>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            {ar ? `المستوى ${levelIndex}` : `Level ${levelIndex}`}
          </span>
          <span className="text-sm text-muted-foreground">
            {stories.length - finished} {ar ? "قصة متبقية" : "stories remaining"}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${lvlProgress}%` }} />
        </div>
        {xpToNext > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">{xpToNext} {t("xp.xpToNext")}</div>
        )}
      </section>

      {/* Insights */}
      <section className="mb-6 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-base">{ar ? "إحصائياتي" : "Insights"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Flame className="h-8 w-8 text-primary" />
            <div>
              <div className="font-serif text-2xl">{streak.current}</div>
              <div className="text-xs text-muted-foreground">{ar ? "أيام متتالية" : "Streak Days"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <div className="font-serif text-2xl">{streak.longest}</div>
              <div className="text-xs text-muted-foreground">{ar ? "أعلى سلسلة" : "Highest Streak"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4 grid gap-3 sm:grid-cols-2">
        <Stat icon={<BookOpen className="h-4 w-4" />} label={t("dash.finished")} value={String(finished)} hint={`${stories.length - finished} ${t("dash.remaining")}`} />
        <Stat icon={<Sparkles className="h-4 w-4" />} label={t("dash.uniqueWords")} value={String(stats.uniqueWords.length)} hint={`${vocab.length} ${t("dash.saved")}`} />
        <Stat icon={<Clock className="h-4 w-4" />} label={t("dash.readingTime")} value={formatDuration(stats.readingSeconds)} hint={t("dash.activeOnly")} />
        <Stat icon={<GraduationCap className="h-4 w-4" />} label={t("dash.quizAvg")} value={scoreEntries.length ? `${avgScorePct}%` : "—"} hint={`${t("dash.tookN")} ${scoreEntries.length} ${t("dash.attempts")}`} />
        <Stat icon={<Hand className="h-4 w-4" />} label={t("dash.totalTaps")} value={String(stats.totalTaps)} hint={t("dash.tapsHint")} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label={t("dash.inProgress")} value={String(inProgress.length)} hint={t("dash.continueBelow")} />
      </section>

      {inProgress.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-serif text-lg">{t("dash.inProgress")}</h2>
          <ul className="space-y-2">
            {inProgress.map(([slug, p]) => {
              const s = stories.find((x) => x.slug === slug);
              if (!s) return null;
              return (
                <li key={slug}>
                  <Link
                    to="/read/$slug"
                    params={{ slug }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted"
                  >
                    <div className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md bg-gradient-to-br ${s.coverHue} text-xl`}>
                      {s.coverImage ? <img src={s.coverImage} alt={s.title} className="h-full w-full object-cover" /> : s.cover}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-serif">{s.title}</div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{p.pct}%</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {scoreEntries.length > 0 && (
        <section>
          <h2 className="mb-3 font-serif text-lg">{t("dash.quizHistory")}</h2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {Object.entries(scores)
              .sort((a, b) => b[1].at - a[1].at)
              .map(([slug, s]) => {
                const story = stories.find((x) => x.slug === slug);
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <li key={slug} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <span className="truncate font-serif">{story?.title ?? slug}</span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">{s.score}/{s.total} · {pct}%</span>
                  </li>
                );
              })}
          </ul>
        </section>
      )}
    </main>
  );
}

function Stat({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="font-serif text-2xl">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
