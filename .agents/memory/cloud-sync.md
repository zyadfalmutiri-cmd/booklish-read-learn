---
name: Cloud sync architecture
description: How Supabase cloud sync is implemented in Booklish
---

# Cloud Sync

## Tables used (all pre-existing in Supabase schema):
- `saved_words` — vocab with SRS data, upsert on `user_id,word`
- `progress` — reading progress per story, upsert on `user_id,story_slug`
- `streaks` — current/longest streak, upsert on `user_id`
- `quiz_results` — quiz scores (pull only, no push upsert to avoid constraint issues)

## Sync service: `src/lib/sync.ts`
- `useCloudSync()` — mounted once in `__root.tsx` via `RootComponent`
- On `SIGNED_IN`: pull from cloud (merge with local, local wins on existing keys), start 2-min push interval
- On `SIGNED_OUT`: flush push, clear interval
- On unmount: flush push

## Merge strategy:
- vocab: union by `slug|word` key, remote adds missing words to local
- progress: take max pct per slug (keeps furthest read)
- streak: remote wins if `current_streak` > local
- quizScores: remote adds missing entries to local

**Why:** localAdapter is always source of truth for reads; cloud is backup/restore for new devices.
**How to apply:** Any new data keys added to storeKeys should also be synced in pullFromCloud/pushToCloud.
