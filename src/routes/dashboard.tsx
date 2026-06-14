import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, BookOpen, GraduationCap, Sparkles, Clock, Hand } from "lucide-react";
import { stories } from "@/data/stories";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useStats, formatDuration } from "@/lib/stats";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean; readingSeconds?: number }>;
interface ScoreMap { [slug: string]: { score: number; total: number; at: number } }
interface SavedWord { word: string; slug: string; at: number }

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Booklish" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [scores] = useLocalStore<ScoreMap>(storeKeys.quizScores, {});
  const [vocab] = useLocalStore<SavedWord[]>(storeKeys.vocab, []);
  const [stats] = useStats();
  const { streak } = useStreak();

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
      <h1 className="mb-2 font-serif text-3xl text-right" dir="rtl">سجل القراءة</h1>
      <p className="mb-8 text-sm text-muted-foreground text-right" dir="rtl">سجل هادئ لما قرأته وتعلمته.</p>

      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Flame className="h-4 w-4" />} label="أيام متتالية" value={`${streak.current} ${streak.current === 1 ? "يوم" : "أيام"}`} hint={`الأطول: ${streak.longest}`} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label="قصص مكتملة" value={String(finished)} hint={`بقي ${stories.length - finished} قصص`} />
        <Stat icon={<Sparkles className="h-4 w-4" />} label="كلمات فريدة" value={String(stats.uniqueWords.length)} hint={`${vocab.length} محفوظة`} />
        <Stat icon={<Clock className="h-4 w-4" />} label="وقت القراءة" value={formatDuration(stats.readingSeconds)} hint="الوقت النشط فقط" />
      </section>

      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Hand className="h-4 w-4" />} label="إجمالي النقرات" value={String(stats.totalTaps)} hint="كلمات بحثت عنها" />
        <Stat icon={<GraduationCap className="h-4 w-4" />} label="متوسط الاختبار" value={scoreEntries.length ? `${avgScorePct}%` : "—"} hint={`أديت ${scoreEntries.length} اختباراً`} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label="قيد القراءة" value={String(inProgress.length)} hint="تابع إحداها بالأسفل" />
        <Stat icon={<Sparkles className="h-4 w-4" />} label="كلمات محفوظة" value={String(vocab.length)} hint={vocab.length ? "افتح القائمة" : "انقر لحفظ كلمة"} />
      </section>

      <section className="mb-10 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-lg text-right" dir="rtl">آخر 14 يوماً</h2>
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
          <h2 className="mb-3 font-serif text-lg text-right" dir="rtl">قيد القراءة</h2>
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
          <h2 className="mb-3 font-serif text-lg text-right" dir="rtl">سجل الاختبارات</h2>
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
