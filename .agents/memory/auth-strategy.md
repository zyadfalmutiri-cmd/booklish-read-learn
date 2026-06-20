---
name: Auth strategy — guest-first
description: How auth gating works in Booklish (guest-first design)
---

# Auth Strategy

## Decision: Guest-first (no mandatory auth)
All core features work without an account:
- Reading stories ✓
- Saving words (to localStorage) ✓
- SRS review ✓
- Dashboard/stats ✓

## Auth gate removed from:
- `src/routes/vocab.tsx` — removed RequireAuth, added SyncBanner
- `src/routes/review.tsx` — removed RequireAuth
- `src/routes/dashboard.tsx` — removed RequireAuth

## Instead: SyncBanner (`src/components/booklish/sync-banner.tsx`)
- Shows on vocab page for non-logged-in users
- "أنشئ حساباً لحفظ تقدمك على جميع أجهزتك" + link to /auth
- Dismissable with X button
- Disappears when user signs in

**Why:** Forcing login before users see value kills conversion. Show value first, then invite to sync.
**How to apply:** If new pages need auth-gated features, use the SyncBanner pattern instead of RequireAuth.
