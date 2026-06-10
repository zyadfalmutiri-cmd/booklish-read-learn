# Booklish — v1 Plan

A frontend-first prototype: a warm, paper-feeling English reading app where Arabic-speaking learners read short stories and tap any word for an Arabic + English explanation. No accounts/backend yet — progress persists in `localStorage` so it survives refresh. Auth + cloud sync are deferred to v2.

## Visual direction

- **Palette (warm paper):** bg `#FBF7F0`, ink `#2B2622`, accent `#8B5A2B`, soft `#C8A97E`. Dark mode = deep ink bg with cream text.
- **Type:** serif for body/reading (Lora), clean sans for UI (Inter). Generous line-height, narrow measure (~620px) in the reader.
- **Feel:** Kindle-like. Soft shadows, rounded-lg, restrained motion, subtle page-turn fades. No gradients, no neon.

## Pages & routes

```
/                 Home — hero, "Continue reading", streak, featured stories
/library          Browse all stories, filter by genre + level, search
/story/$slug      Story detail (cover, blurb, length, vocab preview, Start)
/read/$slug       Reader (tap-to-translate, sentence translate, progress bar)
/quiz/$slug       Post-story comprehension quiz (main idea, events, vocab)
/dashboard        Progress: stories read, words learned, quiz scores, streak
/vocab            Saved words list (auto-collected from taps + per-story lists)
/settings         Theme (light/dark/sepia), font size, translation defaults
```

Header has a single nav: Library · Dashboard · Vocab · theme toggle.

## Core interactions

**Reader (the centerpiece).**
- Story rendered paragraph-by-paragraph, serif, max-width column.
- Tap a word → bottom sheet (mobile) / popover (desktop) with: Arabic meaning, English definition, example sentence, "Save to vocab" button. Smooth scale-in animation.
- Tap a sentence's translate icon (appears at hover/long-press) → inline Arabic translation slides in beneath it.
- Top bar: progress %, font-size A−/A+, translation toggle (off / words / sentences), bookmark.
- Auto-saves scroll position per story.

**Hybrid word lookups.**
- Each seed story ships a curated vocab JSON (key words with Arabic + definition + example).
- Tap on a curated word = instant lookup from the JSON.
- Tap on a non-curated word = a stubbed "AI lookup" that returns a placeholder card explaining the AI integration will plug in later. The UI is fully built; only the data source is mocked. (Easy to swap to Lovable AI in v2.)

**Quiz.**
- 4–6 multiple-choice questions per story: 1 main-idea, 2 events/characters, 2 vocabulary-in-context.
- Result screen with score, missed questions, and "Add missed words to vocab".

**Progress & streak.**
- `localStorage` keys: `booklish.progress`, `booklish.vocab`, `booklish.streak`, `booklish.bookmarks`, `booklish.settings`.
- Streak: increments on any reading activity per calendar day; visual flame on dashboard.
- Dashboard cards: Stories read, Words learned, Avg quiz score, Current streak, 7-day mini chart.

## Seed content

I'll write 6 original short stories (public-domain-safe, written for the app) across genres × levels:

| Title | Genre | Level | ~Words |
|---|---|---|---|
| The Missing Key | Mystery | Beginner | 350 |
| Letters from the Lighthouse | Romance | Intermediate | 600 |
| Echoes of Mars | Sci-fi | Intermediate | 650 |
| The River's Edge | Adventure | Beginner | 400 |
| The Painter Upstairs | Drama | Advanced | 900 |
| The Last Train Home | Mystery | Advanced | 850 |

Each story file (`src/data/stories/<slug>.ts`) exports: metadata, paragraphs (array of sentences with word tokens), `vocab` map (word → {ar, def, example}), and `quiz` array.

## Technical notes

- **Stack:** existing TanStack Start template, Tailwind v4, shadcn. No backend.
- **Data layer:** typed seed modules + a tiny `useLocalStore` hook (zustand-style or plain React) for progress/vocab/settings; SSR-safe with hydration guard.
- **Theme:** add `--paper`, `--ink`, `--accent`, `--soft` tokens to `src/styles.css` `:root` and `.dark`; map in `@theme inline`. Add `class="dark"` toggle on `<html>`.
- **Fonts:** load Lora + Inter via `<link>` in `__root.tsx` head, register as `--font-serif` / `--font-sans` in `@theme`.
- **Tokenizer:** simple `splitIntoTokens(text)` producing word/punctuation spans; each word becomes a `<button>` for accessibility (keyboard-tappable).
- **Routing:** flat file-based routes as listed. `/read/$slug` and `/quiz/$slug` use dynamic params; `head()` per route for titles.
- **Animations:** Tailwind keyframes (`fade-in`, `scale-in`) — no heavy motion lib.
- **No `useEffect+fetch`** for data: stories imported directly.
- **Accessibility:** focus rings on word buttons, ARIA for the lookup sheet, reduced-motion respected.

## Out of scope for v1 (clearly deferred)

- Real auth / cloud sync (currently `localStorage`).
- Real AI word lookups and sentence translation (UI ready, calls stubbed).
- Admin/upload flow for new stories.
- Audio narration, social features.

## Build order

1. Theme tokens, fonts, dark mode, base layout + header.
2. Seed data structure + 2 starter stories to validate the shape.
3. Library + filters + story detail.
4. Reader with tokenizer, tap popover, translation toggles, progress save.
5. Quiz flow + results.
6. Dashboard + vocab page + streak.
7. Settings, polish, remaining 4 stories.

Ready to build when you approve.