import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface LookupResult {
  en: string;
  ar: string;
  source: "ai" | "none";
}

// ─── Google Translate (free, no API key) ─────────────────────────────────

async function googleTranslate(text: string, from = "en", to = "ar"): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`Google Translate error: ${res.status}`);
  const json = await res.json();
  // Response shape: [[[translated, original, ...], ...], ...]
  const translated = json?.[0]?.map((x: unknown[]) => x?.[0]).filter(Boolean).join("") ?? "";
  return translated.trim();
}

// ─── Simple English definition from Free Dictionary API ──────────────────

async function getDefinition(word: string): Promise<string> {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!res.ok) return "";
    const json = await res.json();
    const def = json?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? "";
    // Trim to max 12 words
    const words = def.split(" ");
    return words.slice(0, 12).join(" ") + (words.length > 12 ? "." : "");
  } catch {
    return "";
  }
}

// ─── Server Functions ─────────────────────────────────────────────────────

export const lookupWordAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      word: z.string().min(1).max(60),
      context: z.string().max(400).optional(),
    })
  )
  .handler(async ({ data }): Promise<LookupResult> => {
    const word = data.word.trim().toLowerCase();

    try {
      // Run translation and definition in parallel
      const [ar, en] = await Promise.all([
        googleTranslate(word, "en", "ar"),
        getDefinition(word),
      ]);

      if (!ar) {
        return { en: en || "", ar: "—", source: "none" };
      }

      return { en: en || "", ar, source: "ai" };
    } catch (err) {
      console.error("lookupWordAI error:", err);
      return { en: "", ar: "—", source: "none" };
    }
  });

export const translateTextAI = createServerFn({ method: "POST" })
  .inputValidator(z.object({ text: z.string().min(1).max(1200) }))
  .handler(async ({ data }): Promise<{ ar: string; source: "ai" | "none" }> => {
    try {
      const ar = await googleTranslate(data.text, "en", "ar");
      return ar ? { ar, source: "ai" } : { ar: "—", source: "none" };
    } catch {
      return { ar: "—", source: "none" };
    }
  });
