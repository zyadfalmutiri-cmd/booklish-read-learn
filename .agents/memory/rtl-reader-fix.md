---
name: RTL reader fix
description: English story text rendered reversed in Arabic UI mode — needs explicit dir="ltr" on content containers.
---

When the UI language is Arabic, the html/body gets `dir="rtl"`. English story content inherits this and renders words in reverse order.

**Fix:** Add `dir="ltr"` to the reader container div in `src/components/booklish/reader.tsx`.

**Why:** The UI chrome (nav, labels) should be RTL, but story text is always English (LTR). These are separate concerns.

**How to apply:** Any component rendering English prose (story paragraphs, quiz questions, review cards) must set `dir="ltr"` on its outermost content wrapper. Arabic translations within those components should then explicitly set `dir="rtl"` on their own element.
