export interface StepStats {
  user_id: string;
  xp: number;
  streak_days: number;
  last_activity_date: string | null;
  lessons_completed: number;
  predicted_score: number;
  updated_at: string;
}
