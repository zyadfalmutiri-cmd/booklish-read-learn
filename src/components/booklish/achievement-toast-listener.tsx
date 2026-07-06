import { useEffect, useState } from 'react';

type UnlockedAchievement = {
  newly_unlocked_code: string;
  newly_unlocked_title: string;
};

export function AchievementToastListener() {
  const [queue, setQueue] = useState<UnlockedAchievement[]>([]);

  useEffect(() => {
    function handleUnlock(e: Event) {
      const detail = (e as CustomEvent<UnlockedAchievement[]>).detail;
      if (detail && detail.length > 0) {
        setQueue((prev) => [...prev, ...detail]);
      }
    }

    window.addEventListener('booklish:achievement-unlocked', handleUnlock);
    return () => window.removeEventListener('booklish:achievement-unlocked', handleUnlock);
  }, []);

  useEffect(() => {
    if (queue.length === 0) return;
    const timer = setTimeout(() => {
      setQueue((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [queue]);

  if (queue.length === 0) return null;

  const current = queue[0];

  return (
    <div
      dir="rtl"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 fade-in"
    >
      <p className="font-bold text-sm">🎉 إنجاز جديد!</p>
      <p className="text-xs opacity-90">{current.newly_unlocked_title}</p>
    </div>
  );
}
