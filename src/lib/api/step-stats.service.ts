import { supabase } from "@/integrations/supabase/client";
import type { StepStats } from "@/types/step";

export async function getOrCreateStepStats(userId: string): Promise<StepStats> {
  const { data, error } = await supabase
    .from("step_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (data) return data as StepStats;

  const { data: created, error: insertError } = await supabase
    .from("step_stats")
    .insert({ user_id: userId })
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created as StepStats;
}
