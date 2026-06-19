import { createFileRoute, Link } from "@tanstack/react-router";
import { stories } from "@/data/stories";
import { StoryCard } from "@/components/booklish/story-card";
import { useLocalStore, storeKeys } from "@/lib/store";
import { useStreak } from "@/lib/streak";
import { useXp, LEVELS } from "@/lib/xp";
import { Flame, BookOpen, ArrowRight, Target, Zap } from "lucide-react";
import { useT } from "@/lib/i18n";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean }>;

export const Route = createFileRoute("/")({
  component: Home,
});

const DAILY_WORD_GOAL = 5;
const DAILY_READ_GOAL_MIN = 5;

function Home() {
  const [progress] = useLocalStore<ProgressMap>(storeKeys.progress, {});
  const [vocab] = useLocalStore<any[]>(storeKeys.vocab, []);
  const { streak } = useStreak();
  const { xp, level, progress: lvlProgress, xpToNext } = useXp();
  const { t, lang, dir } = useT();
  const ar = lang === "ar";

  const continueEntry = Object.entries(progress)
    .filter(([, v]) => !v.finished && v.pct > 0)
    .sort((a, b) => b[1].lastAt - a[1].lastAt)[0];

  const continueStory = continueEntry ? stories.find((s) => s.slug === continueEntry[0]) : undefined;

  const finishedCount = Object.values(progress).filter((p) => p.finished).length;
  const todayWords = vocab.filter((v) => {
    const today = new Date();
    const d = new Date(v.at);
    return d.toDateString() === today.toDateString();
  }).length;

  const featured = stories.filter((s) => s.level === "beginner").slice(0, 3);
  const arrowClass = dir === "rtl" ? "h-4 w-4 rotate-180" : "h-4 w-4";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:pt-14">

      {/* Hero */}
      <section className="mb-10 sm:mb-14">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">{t("home.kicker")}</p>
        <h1 className="mb-5 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mb-7 max-w-xl text-base text-muted-foreground">
          {t("home.sub")}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            {t("home.browse")}
            <ArrowRight className={arrowClass} />
          </Link>
          <Link
            to="/review"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {ar ? "راجع كلماتك" : "Review words"}
          </Link>
        </div>
      </section>

      {/* Stats Row */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={<Flame className="h-4 w-4 text-orange-500" />}
          value={String(streak.current)}
          label={ar ? "أيام متتالية" : "Day streak"}
        />
        <StatCard
          icon={<BookOpen className="h-4 w-4 text-primary" />}
          value={String(finishedCount)}
          label={ar ? "قصص مكتملة" : "Stories done"}
        />
        <StatCard
          icon={<Zap className="h-4 w-4 text-yellow-500" />}
          value={`${xp} XP`}
          label={`${level.icon} ${ar ? level.nameAr : level.nameEn}`}
        />
        <StatCard
          icon={<Target className="h-4 w-4 text-emerald-500" />}
          value={`${todayWords}/${DAILY_WORD_GOAL}`}
          label={ar ? "كلمات اليوم" : "Words today"}
        />
      </section>

      {/* XP Progress */}
      <section className="mb-8 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">{level.icon} {ar ? level.nameAr : level.nameEn}</span>
          {xpToNext > 0 && (
            <span className="text-xs text-muted-foreground">
              {ar ? `${xpToNext} XP للمستوى التالي` : `${xpToNext} XP to next level`}
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${lvlProgress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          {LEVELS.map((l) => (
            <span key={l.name} className={xp >= l.minXp ? "text-primary font-medium" : ""}>
              {l.icon} {ar ? l.nameAr : l.nameEn}
            </span>
          ))}
        </div>
      </section>

      {/* Daily Goal */}
      <section className="mb-8 rounded-xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-medium">{ar ? "هدف اليوم" : "Daily goal"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <GoalBar
            label={ar ? `اقرأ ${DAILY_READ_GOAL_MIN} دقائق` : `Read ${DAILY_READ_GOAL_MIN} minutes`}
            current={streak.days.includes(new Date().toISOString().slice(0, 10)) ? DAILY_READ_GOAL_MIN : 0}
            max={DAILY_READ_GOAL_MIN}
            color="bg-primary"
          />
          <GoalBar
            label={ar ? `احفظ ${DAILY_WORD_GOAL} كلمات` : `Save ${DAILY_WORD_GOAL} words`}
            current={Math.min(todayWords, DAILY_WORD_GOAL)}
            max={DAILY_WORD_GOAL}
            color="bg-emerald-500"
          />
        </div>
      </section>

      {/* Continue Reading */}
      {continueStory && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-xl">{t("home.continue")}</h2>
          <Link
            to="/read/$slug"
            params={{ slug: continueStory.slug }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${continueStory.coverHue} text-2xl`}>
              {continueStory.cover}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 truncate font-serif text-base">{continueStory.title}</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${continueEntry![1].pct}%` }} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{continueEntry![1].pct}% {t("home.readPct")}</div>
            </div>
            <ArrowRight className={`${arrowClass} shrink-0 text-muted-foreground`} />
          </Link>
        </section>
      )}

      {/* Featured Stories */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">{t("home.featured")}</h2>
          <Link to="/library" className="text-sm text-primary hover:underline">{t("home.viewAll")}</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">{icon} {label}</div>
      <div className="font-serif text-2xl font-medium">{value}</div>
    </div>
  );
}

function GoalBar({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{current}/{max}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
