import { useAchievements } from '@/hooks/use-achievements';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Flame, Trophy } from 'lucide-react';

export function AchievementsPage({ userId }: { userId: string }) {
  const { all, unlocked, streak } = useAchievements(userId);
  const progress = all.filter((a) => a.category === 'progress');
  const streaks = all.filter((a) => a.category === 'streak');

  return (
    <div className="space-y-6 p-4" dir="rtl">
      <Card className="paper-card border-none bg-primary/10">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15">
              <Flame className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الاستمرارية الحالية</p>
              <p className="text-2xl font-serif font-semibold">{streak.current} يوم</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">أطول سلسلة: {streak.longest} يوم</p>
        </CardContent>
      </Card>

      <Section title="إنجازات التقدم" items={progress} unlocked={unlocked} icon={Trophy} />
      <Section title="إنجازات الاستمرارية" items={streaks} unlocked={unlocked} icon={Flame} />
    </div>
  );
}

function Section({
  title,
  items,
  unlocked,
  icon: CategoryIcon,
}: {
  title: string;
  items: any[];
  unlocked: Set<string>;
  icon: typeof Trophy;
}) {
  return (
    <div>
      <h3 className="font-serif font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <Card
              key={a.id}
              className={cn('paper-card border-none transition-opacity', !isUnlocked && 'opacity-40 grayscale')}
            >
              <CardContent className="p-3 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CategoryIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium">{a.title_ar}</p>
                <p className="text-xs text-muted-foreground">{a.description_ar}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
