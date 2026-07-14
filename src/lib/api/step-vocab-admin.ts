import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { ParsedVocabPair } from "@/types/step-vocab";

// ─── Google Translate (مجاني، بدون مفتاح) ───
async function googleTranslate(
  text: string,
  from = "en",
  to = "ar"
): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`Google Translate error: ${res.status}`);
  const json = await res.json();
  const translated =
    json?.[0]?.map((x: unknown[]) => x?.[0]).filter(Boolean).join("") ?? "";
  return translated.trim();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── تخزين الكلمات + ترجمتها (بدون أي AI) ───
export const seedVocabBatch = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      items: ParsedVocabPair[];
      source: "daily800" | "oxford3000";
      cefrLevel?: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const results: { word: string; ok: boolean }[] = [];

    for (const item of data.items) {
      try {
        const meaning = await googleTranslate(item.word);

        const { error } = await supabase.from("step_vocabulary").upsert(
          {
            word: item.word,
            example_en: item.example,
            meaning_ar: meaning,
            source: data.source,
            cefr_level: data.cefrLevel ?? null,
            status: "done",
          },
          { onConflict: "word" }
        );

        if (error) throw error;
        results.push({ word: item.word, ok: true });
      } catch (err) {
        console.error(`Failed for word "${item.word}":`, err);
        results.push({ word: item.word, ok: false });
      }
      await sleep(250);
    }

    return results;
  });
