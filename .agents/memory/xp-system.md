---
name: XP system
description: Points/levels system for Booklish — how XP is earned and stored.
---

XP is stored in localStorage via `storeKeys.xp` as `{ total: number, log: [...] }`.

**Levels:** Beginner (0–299 XP 🌱), Intermediate (300–799 📖), Advanced (800+ 🎓).

**Rewards (XP_REWARDS in xp.ts):**
- saveWord: 5
- quizCorrect: 10 per correct answer
- readMinute: 2 (per minute read)
- reviewGood: 3 (per SRS card graded good/hard)
- finishStory: 25

**Why:** Motivation loop — saving words, reviewing, and finishing stories all reward XP.

**Granted in:** reader.tsx (saveWord), review.tsx (reviewGood), quiz.$slug.tsx (quizCorrect × score), read.$slug.tsx (finishStory + readMinute).
