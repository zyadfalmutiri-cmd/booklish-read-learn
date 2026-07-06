import { useAchievements } from '@/hooks/use-achievements';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function AchievementsPage({ userId }: { userId: string }) {
  const { all, unlocked, streak } = useAchievements(userId);
  const progress = all.filter((a) => a.category === 'progress');
  const streaks = all.filter((a) => a.category === 'streak');

  return (
    <div className="space-y-6 p-4" dir="rtl">
      <Card className="bg-gradient-to-br from-orange-100 to-amber-50">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">الاستمرارية الحالية</p>
            <p className="text-2xl font-bold">🔥 {streak.current} يوم</p>
          </div>
          <p className="text-sm text-muted-foreground">أطول سلسلة: {streak.longest} يوم</p>
        </CardContent>
      </Card>

      <Section title="إنجازات التقدم" items={progress} unlocked={unlocked} />
      <Section title="إنجازات الاستمرارية" items={streaks} unlocked={unlocked} />
    </div>
  );
}

function Section({ title, items, unlocked }: { title: string; items: any[]; unlocked: Set<string> }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <Card key={a.id} className={cn('transition-opacity', !isUnlocked && 'opacity-40 grayscale')}>
              <CardContent className="p-3 text-center">
                <div className="text-3xl mb-1">{a.icon}</div>
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
