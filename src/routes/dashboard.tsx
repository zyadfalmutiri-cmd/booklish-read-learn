import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, BookOpen, GraduationCap, Sparkles, Clock, Hand } from "lucide-react";
import { stories } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useStats, formatDuration } from "@/lib/stats";
import { useT } from "@/lib/i18n";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean; readingSeconds?: number }>;
interface ScoreMap { [slug: string]: { score: number; total: number; at: number } }
interface SavedWord { word: string; slug: string; at: number }

import { RequireAuth } from "@/components/booklish/require-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Booklish" }] }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

function Dashboard() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [scores] = useLocalStore<ScoreMap>(storeKeys.quizScores, {});
  const [vocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [stats] = useStats();
  const { streak } = useStreak();
  const { t } = useT();

  const finished = Object.values(progress).filter((p) => p.finished).length;
  const inProgress = Object.entries(progress).filter(([, p]) => !p.finished && p.pct > 0);
  const scoreEntries = Object.values(scores);
  const avgScorePct = scoreEntries.length
    ? Math.round((scoreEntries.reduce((acc, s) => acc + s.score / s.total, 0) / scoreEntries.length) * 100)
    : 0;

  const today = new Date();
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (13 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { key, label: d.getDate(), active: streak.days.includes(key) };
  });

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <h1 className="mb-2 font-serif text-3xl">{t("dash.title")}</h1>
      <p className="mb-8 text-sm text-muted-foreground">{t("dash.subtitle")}</p>

      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Flame className="h-4 w-4" />} label={t("dash.streakDays")} value={`${streak.current} ${streak.current === 1 ? t("common.day") : t("common.days")}`} hint={`${t("dash.longest")}: ${streak.longest}`} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label={t("dash.finished")} value={String(finished)} hint={`${stories.length - finished} ${t("dash.remaining")}`} />
        <Stat icon={<Sparkles className="h-4 w-4" />} label={t("dash.uniqueWords")} value={String(stats.uniqueWords.length)} hint={`${vocab.length} ${t("dash.saved")}`} />
        <Stat icon={<Clock className="h-4 w-4" />} label={t("dash.readingTime")} value={formatDuration(stats.readingSeconds)} hint={t("dash.activeOnly")} />
      </section>

      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Hand className="h-4 w-4" />} label={t("dash.totalTaps")} value={String(stats.totalTaps)} hint={t("dash.tapsHint")} />
        <Stat icon={<GraduationCap className="h-4 w-4" />} label={t("dash.quizAvg")} value={scoreEntries.length ? `${avgScorePct}%` : "—"} hint={`${t("dash.tookN")} ${scoreEntries.length} ${t("dash.attempts")}`} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label={t("dash.inProgress")} value={String(inProgress.length)} hint={t("dash.continueBelow")} />
        <Stat icon={<Sparkles className="h-4 w-4" />} label={t("dash.savedWords")} value={String(vocab.length)} hint={vocab.length ? t("dash.openList") : t("dash.tapToSave")} />
      </section>

      <section className="mb-10 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-lg">{t("dash.last14")}</h2>
        <div className="flex items-end gap-1.5">
          {days.map((d) => (
            <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-sm transition-colors ${d.active ? "bg-primary" : "bg-muted"}`} style={{ height: d.active ? 36 : 8 }} />
              <span className="text-[10px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
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
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gradient-to-br ${s.coverHue} text-xl`}>{s.cover}</div>
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
