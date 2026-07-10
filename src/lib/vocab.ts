import { supabase } from "@/integration/supabase/client";
import { normalizeWord } from "@/lib/lookup";

export interface UserWord {
  id: string;
  word: string;
  translation: string;
  status: "known" | "learning";
  source_story_id: string | null;
  times_seen: number;
  times_correct: number;
  last_reviewed_at: string;
}

export async function getVocabStats(): Promise<{ known: number; learning: number }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { known: 0, learning: 0 };

  const { data, error } = await supabase
    .from("user_words")
    .select("status")
    .eq("user_id", user.id);

  if (error || !data) return { known: 0, learning: 0 };

  const known = data.filter((w) => w.status === "known").length;
  const learning = data.filter((w) => w.status === "learning").length;
  return { known, learning };
}

export async function getLearningWords(limit = 50): Promise<UserWord[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_words")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "learning")
    .order("last_reviewed_at", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  return data as UserWord[];
}

export async function markWordStatus(word: string, status: "known" | "learning") {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("user_words")
    .update({ status, last_reviewed_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("word", normalizeWord(word));
}

export async function recordQuizAnswer(word: string, correct: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const key = normalizeWord(word);

  const { data } = await supabase
    .from("user_words")
    .select("times_seen, times_correct")
    .eq("user_id", user.id)
    .eq("word", key)
    .single();

  const timesSeen = (data?.times_seen ?? 0) + 1;
  const timesCorrect = (data?.times_correct ?? 0) + (correct ? 1 : 0);
  const newStatus = timesCorrect >= 3 ? "known" : "learning";

  await supabase
    .from("user_words")
    .update({
      times_seen: timesSeen,
      times_correct: timesCorrect,
      status: newStatus,
      last_reviewed_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .eq("word", key);
}
