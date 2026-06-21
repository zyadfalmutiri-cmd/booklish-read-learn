/**
 * Lightweight Leitner-style spaced repetition.
 * Levels: 0..6  |  Intervals (ms) chosen for casual learners.
 */

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const SRS_INTERVALS_MS = [
  10 * MIN, // level 0 → 10 minutes
  HOUR,     // level 1 → 1 hour
  DAY,      // level 2 → 1 day
  3 * DAY,  // level 3
  7 * DAY,  // level 4
  21 * DAY, // level 5
  60 * DAY, // level 6
];

export type Grade = "again" | "hard" | "good";

export interface SrsCard {
  level?: number;
  nextReview?: number;
}

export function isDue(card: SrsCard, now = Date.now()): boolean {
  if (card.nextReview == null) return true;
  return card.nextReview <= now;
}

/** Returns a new {level, nextReview} after grading. */
export function schedule(card: SrsCard, grade: Grade, now = Date.now()): { level: number; nextReview: number } {
  const cur = Math.max(0, card.level ?? 0);
  let next: number;
  if (grade === "again") next = 0;
  else if (grade === "hard") next = Math.max(0, cur); // stay
  else next = Math.min(SRS_INTERVALS_MS.length - 1, cur + 1);
  const interval = SRS_INTERVALS_MS[next];
  return { level: next, nextReview: now + interval };
}

export function formatInterval(ms: number, units: { m: string; h: string; d: string }): string {
  if (ms < HOUR) return `${Math.max(1, Math.round(ms / MIN))}${units.m}`;
  if (ms < DAY) return `${Math.round(ms / HOUR)}${units.h}`;
  return `${Math.round(ms / DAY)}${units.d}`;
}
