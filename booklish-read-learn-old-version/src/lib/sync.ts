/**
 * Cloud sync — mirrors localStorage data to/from Supabase.
 * Runs only when the user is signed in.
 * Strategy: pull on sign-in (merge), push every 2 minutes + on unmount.
 */
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { activeAdapter } from "./storage/adapter";
import { storeKeys } from "./store";
import type { SavedWord } from "./types";

type ProgressMap = Record<string, { pct: number; lastAt: number; finished: boolean; readingSeconds?: number }>;
type StreakData = { current: number; lastActive: string | null; longest: number };
type ScoreMap = Record<string, { score: number; total: number; at: number }>;

async function pullFromCloud(userId: string): Promise<void> {
  try {
    // ── Saved words ────────────────────────────────────────────────────────
    const { data: words } = await supabase
      .from("saved_words")
      .select("*")
      .eq("user_id", userId);

    if (words && words.length > 0) {
      const local = activeAdapter.get<SavedWord[]>(storeKeys.vocab, []);
      const localKeys = new Set(local.map((w) => `${w.slug}|${w.word.toLowerCase()}`));
      const toAdd: SavedWord[] = [];

      for (const w of words) {
        const key = `${w.story_slug ?? ""}|${w.word.toLowerCase()}`;
        if (!localKeys.has(key)) {
          toAdd.push({
            word: w.word,
            ar: w.arabic_meaning ?? "",
            def: w.english_definition ?? "",
            example: w.example_sentence ?? "",
            slug: w.story_slug ?? "",
            at: new Date(w.created_at).getTime(),
            level: w.srs_level ?? 0,
            nextReview: new Date(w.next_review).getTime(),
          });
        }
      }

      if (toAdd.length > 0) {
        activeAdapter.set(storeKeys.vocab, [...local, ...toAdd]);
      }
    }

    // ── Reading progress ───────────────────────────────────────────────────
    const { data: progressRows } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId);

    if (progressRows && progressRows.length > 0) {
      const local = activeAdapter.get<ProgressMap>(storeKeys.progress, {});
      let changed = false;
      const merged = { ...local };

      for (const p of progressRows) {
        const existing = merged[p.story_slug];
        const remotePct = p.percent_complete;
        if (!existing || remotePct > (existing.pct ?? 0)) {
          merged[p.story_slug] = {
            pct: remotePct,
            lastAt: new Date(p.last_read_at).getTime(),
            finished: p.completed,
            readingSeconds: p.reading_seconds ?? 0,
          };
          changed = true;
        }
      }

      if (changed) activeAdapter.set(storeKeys.progress, merged);
    }

    // ── Streak ─────────────────────────────────────────────────────────────
    const { data: streakRow } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (streakRow) {
      const local = activeAdapter.get<StreakData>(storeKeys.streak, {
        current: 0,
        lastActive: null,
        longest: 0,
      });
      if (streakRow.current_streak > local.current) {
        activeAdapter.set(storeKeys.streak, {
          current: streakRow.current_streak,
          lastActive: streakRow.last_active,
          longest: Math.max(streakRow.longest_streak ?? 0, local.longest),
        });
      }
    }

    // ── Quiz scores ────────────────────────────────────────────────────────
    const { data: quizRows } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", userId);

    if (quizRows && quizRows.length > 0) {
      const local = activeAdapter.get<ScoreMap>(storeKeys.quizScores, {});
      let changed = false;
      const merged = { ...local };

      for (const q of quizRows) {
        if (!merged[q.story_slug]) {
          merged[q.story_slug] = {
            score: q.score,
            total: q.total,
            at: new Date(q.created_at).getTime(),
          };
          changed = true;
        }
      }

      if (changed) activeAdapter.set(storeKeys.quizScores, merged);
    }
  } catch (err) {
    console.warn("[Booklish sync] pull failed:", err);
  }
}

async function pushToCloud(userId: string): Promise<void> {
  try {
    // ── Saved words ────────────────────────────────────────────────────────
    const vocab = activeAdapter.get<SavedWord[]>(storeKeys.vocab, []);
    if (vocab.length > 0) {
      await supabase.from("saved_words").upsert(
        vocab.map((w) => ({
          user_id: userId,
          word: w.word,
          arabic_meaning: w.ar,
          english_definition: w.def,
          example_sentence: w.example,
          story_slug: w.slug || null,
          srs_level: w.level ?? 0,
          next_review: new Date(w.nextReview ?? Date.now()).toISOString(),
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "user_id,word" },
      );
    }

    // ── Reading progress ───────────────────────────────────────────────────
    const progress = activeAdapter.get<ProgressMap>(storeKeys.progress, {});
    const progressEntries = Object.entries(progress);
    if (progressEntries.length > 0) {
      await supabase.from("progress").upsert(
        progressEntries.map(([slug, p]) => ({
          user_id: userId,
          story_slug: slug,
          percent_complete: p.pct,
          completed: p.finished,
          last_read_at: new Date(p.lastAt).toISOString(),
          reading_seconds: p.readingSeconds ?? 0,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "user_id,story_slug" },
      );
    }

    // ── Streak ─────────────────────────────────────────────────────────────
    const streak = activeAdapter.get<StreakData>(storeKeys.streak, {
      current: 0,
      lastActive: null,
      longest: 0,
    });
    if (streak.current > 0 || streak.longest > 0) {
      await supabase.from("streaks").upsert(
        {
          user_id: userId,
          current_streak: streak.current,
          longest_streak: streak.longest,
          last_active: streak.lastActive,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    }
  } catch (err) {
    console.warn("[Booklish sync] push failed:", err);
  }
}

/**
 * Mount this once at the app root. Automatically pulls on sign-in and
 * pushes every 2 minutes while signed in.
 */
export function useCloudSync() {
  useEffect(() => {
    let pushInterval: ReturnType<typeof setInterval> | null = null;
    let currentUserId: string | null = null;

    const startSync = (userId: string) => {
      if (currentUserId === userId) return; // already syncing for this user
      currentUserId = userId;
      void pullFromCloud(userId);
      if (!pushInterval) {
        pushInterval = setInterval(() => {
          if (currentUserId) void pushToCloud(currentUserId);
        }, 120_000);
      }
    };

    const stopSync = () => {
      if (currentUserId) void pushToCloud(currentUserId);
      currentUserId = null;
      if (pushInterval) {
        clearInterval(pushInterval);
        pushInterval = null;
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
        startSync(session.user.id);
      }
      if (event === "SIGNED_OUT") {
        stopSync();
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) startSync(data.session.user.id);
    });

    return () => {
      stopSync();
      subscription.unsubscribe();
    };
  }, []);
}

/** Immediately push local data to cloud (call after saving a word, finishing a story, etc.) */
export function syncNow(userId: string) {
  void pushToCloud(userId);
}
