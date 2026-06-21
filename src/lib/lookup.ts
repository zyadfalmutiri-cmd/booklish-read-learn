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
    // Prune oldest entries if over the size limit
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
  const cache = readCache();
  cache[word] = { ...entry, timestamp: Date.now() };
  writeCache(cache);
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
  if (cache[key]) {
    return { word: key, ...cache[key], source: "cache" };
  }

  if (storyVocab && storyVocab[key]) {
    const v = storyVocab[key];
    const entry = { en: v.def, ar: v.ar, example: v.example };
    setCache(key, entry);
    return { word: key, ...entry, timestamp: Date.now(), source: "story" };
  }

  if (dict[key]) {
    const entry = { en: dict[key].en, ar: dict[key].ar };
    setCache(key, entry);
    return { word: key, ...entry, timestamp: Date.now(), source: "dictionary" };
  }

  return null;
}

/** Async AI fallback. Caches result. */
export async function lookupAI(word: string, context?: string): Promise<WordLookup> {
  const key = normalizeWord(word);
  try {
    const res = await lookupWordAI({ data: { word: key, context } });
    if (res.source === "ai") {
      const entry = { en: res.en, ar: res.ar };
      setCache(key, entry);
      return { word: key, ...entry, timestamp: Date.now(), source: "ai" };
    }
    return { word: key, en: res.en, ar: res.ar, timestamp: Date.now(), source: "none" };
  } catch {
    return {
      word: key,
      en: "No explanation available yet.",
      ar: "—",
      timestamp: Date.now(),
      source: "none",
    };
  }
}

/** Pre-warm cache with all dictionary/story entries that appear in the given text. */
export function preWarmCache(text: string, storyVocab?: Record<string, VocabEntry>) {
  if (typeof window === "undefined") return;
  const cache = readCache();
  const words = new Set(text.toLowerCase().match(/[a-z']+/g) || []);
  let changed = false;
  words.forEach((w) => {
    if (cache[w]) return;
    if (storyVocab && storyVocab[w]) {
      const v = storyVocab[w];
      cache[w] = { en: v.def, ar: v.ar, example: v.example, timestamp: Date.now() };
      changed = true;
    } else if (dict[w]) {
      cache[w] = { en: dict[w].en, ar: dict[w].ar, timestamp: Date.now() };
      changed = true;
    }
  });
  if (changed) writeCache(cache);
}
