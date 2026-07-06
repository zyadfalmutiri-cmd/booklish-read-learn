import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAchievements(userId: string | undefined) {
  const [all, setAll] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data: achievements } = await supabase.from('achievements').select('*').order('requirement_value');
      const { data: userAch } = await supabase.from('user_achievements').select('achievement_id').eq('user_id', userId);
      const { data: streakData } = await supabase.from('streaks').select('*').eq('user_id', userId).single();

      setAll(achievements ?? []);
      setUnlocked(new Set((userAch ?? []).map((u) => u.achievement_id)));
      if (streakData) setStreak({ current: streakData.current_streak, longest: streakData.longest_streak });
    })();
  }, [userId]);

  return { all, unlocked, streak };
}
