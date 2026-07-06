import { supabase } from '@/lib/supabase';

export async function checkAchievements(userId: string) {
  await supabase.rpc('update_user_streak', { p_user_id: userId });
  const { data: unlocked, error } = await supabase.rpc('check_and_award_achievements', { p_user_id: userId });

  if (error) {
    console.error('achievement check error:', error);
    return [];
  }
  return unlocked ?? [];
}
