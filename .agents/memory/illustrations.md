---
name: Story illustrations system
description: How inline educational images work in the reader
---

# Story Illustrations

## Data: `src/data/illustrations.ts`
- `storyScenes: Record<slug, StoryScene[]>` — keyed by story slug
- Each `StoryScene`: `{ afterParagraph: number, src: string, alt: string, caption?: string }`
- Images from Unsplash CDN: `https://images.unsplash.com/photo-{id}?w=680&q=75&auto=format&fit=crop`
- Caption format: `"word · عربي — definition"` — educational value embedded in caption

## Component: `StoryImage` in `src/components/booklish/reader.tsx`
- `loading="lazy"` + `decoding="async"` for performance
- `onError={() => setFailed(true)}` — hides image gracefully if URL fails
- Rounded corners, subtle border, light shadow — book-like aesthetic

## Reader integration:
- Scene map built via `useMemo` (slug → paragraph index → SceneImage)
- Rendered inside a `<Fragment>` after each `<Paragraph>` that has a matching scene

**Why:** Educational illustrations help Arabic learners understand English vocabulary visually.
**How to apply:** To add illustrations to a story, add an entry to storyScenes in illustrations.ts.
