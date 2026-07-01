import dictionary from "@/data/dictionary.json";
import { lookupWordAI } from "@/lib/api/lookup.functions";
import type { VocabEntry } from "@/lib/types";

export interface WordLookup {
  word: string;
  en: string;
  ar: string;
  example?: string;
  source: "cache" | "story" | "dictionary" | "ai" | "none";
  timestamp: number;
}

const CACHE_KEY = "booklish.wordCache";
const MAX_CACHE_ENTRIES = 500;

type CacheShape = Record<string, { en: string; ar: string; example?: string; timestamp: number }>;

const dict = dictionary as Record<string, { en: string; ar: string }>;

function readCache(): CacheShape {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCache(cache: CacheShape) {
  if (typeof window === "undefined") return;
  try {
    const entries = Object.entries(cache);
    if (entries.length > MAX_CACHE_ENTRIES) {
      const pruned = entries
        .sort((a, b) => (b[1].timestamp ?? 0) - (a[1].timestamp ?? 0))
        .slice(0, MAX_CACHE_ENTRIES);
      cache = Object.fromEntries(pruned);
    }
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* quota or serialization issue — ignore */
  }
}

function setCache(word: string, entry: { en: string; ar: string; example?: string }) {
  // Only cache if both en and ar are non-empty
  if (!entry.en?.trim() || !entry.ar?.trim()) return;
  const cache = readCache();
  cache[word] = { ...entry, timestamp: Date.now() };
  writeCache(cache);
}

/** Returns true only if the cache entry is valid (has both en and ar) */
function isValidEntry(entry: { en?: string; ar?: string } | undefined): boolean {
  return Boolean(entry?.en?.trim() && entry?.ar?.trim());
}

export function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z']/g, "");
}

/** Synchronous lookup against cache + story vocab + built-in dictionary. */
export function lookupLocal(
  word: string,
  storyVocab?: Record<string, VocabEntry>,
): WordLookup | null {
  const key = normalizeWord(word);
  if (!key) return null;

  const cache = readCache();

  // Only use cache if entry is valid (non-empty ar and en)
  if (cache[key] && isValidEntry(cache[key])) {
    return { word: key, ...cache[key], source: "cache" };
  }

  if (storyVocab && storyVocab[key]) {
    const v = storyVocab[key];
    if (v.ar?.trim() && v.def?.trim()) {
      const entry = { en: v.def, ar: v.ar, example: v.example };
      setCache(key, entry);
      return { word: key, ...entry, timestamp: Date.now(), source: "story" };
    }
  }

  if (dict[key] && isValidEntry(dict[key])) {
    const entry = { en: dict[key].en, ar: dict[key].ar };
    setCache(key, entry);
    return { word: key, ...entry, timestamp: Date.now(), source: "dictionary" };
  }

  return null;
}

// ── Rate-limit queue: max 1 concurrent AI request, 400ms gap between calls ──
let _aiQueue = Promise.resolve();
function enqueueAI<T>(fn: () => Promise<T>): Promise<T> {
  const next = _aiQueue.then(() => fn()).then(
    (v) => { _aiQueue = Promise.resolve(); return v; },
    (e) => { _aiQueue = Promise.resolve(); throw e; },
  );
  _aiQueue = next.then(() => new Promise((r) => setTimeout(r, 400)));
  return next;
}

/** Async AI fallback. Caches result only if valid. */
export async function lookupAI(word: string, context?: string): Promise<WordLookup> {
  const key = normalizeWord(word);
  return enqueueAI(async () => {
    try {
      const res = await lookupWordAI({ data: { word: key, context } });
      if (res.source === "ai" && res.en?.trim() && res.ar?.trim()) {
        const entry = { en: res.en, ar: res.ar };
        setCache(key, entry);
        return { word: key, ...entry, timestamp: Date.now(), source: "ai" as const };
      }
      return {
        word: key,
        en: res.en || "",
        ar: res.ar || "",
        timestamp: Date.now(),
        source: "none" as const,
      };
    } catch {
      return {
        word: key,
        en: "",
        ar: "",
        timestamp: Date.now(),
        source: "none" as const,
      };
    }
  });
}

/** Pre-warm cache with all dictionary/story entries that appear in the given text. */
export function preWarmCache(text: string, storyVocab?: Record<string, VocabEntry>) {
  if (typeof window === "undefined") return;
  const cache = readCache();
  const words = new Set(text.toLowerCase().match(/[a-z']+/g) || []);
  let changed = false;
  words.forEach((w) => {
    if (cache[w] && isValidEntry(cache[w])) return;
    if (storyVocab && storyVocab[w] && storyVocab[w].ar?.trim()) {
      const v = storyVocab[w];
      cache[w] = { en: v.def, ar: v.ar, example: v.example, timestamp: Date.now() };
      changed = true;
    } else if (dict[w] && isValidEntry(dict[w])) {
      cache[w] = { en: dict[w].en, ar: dict[w].ar, timestamp: Date.now() };
      changed = true;
    }
  });
  if (changed) writeCache(cache);
}
