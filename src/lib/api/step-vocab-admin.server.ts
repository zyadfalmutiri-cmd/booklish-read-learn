import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { ParsedVocabPair } from "@/types/step-vocab";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash:free";

async function callOpenRouter(prompt: string): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// يحلل نص خام (مقصوص من الـ PDF) ويستخرج فقط الكلمة + المثال الإنجليزي
export const parseVocabChunk = createServerFn({ method: "POST" })
  .validator((data: { rawText: string }) => data)
  .handler(async ({ data }): Promise<ParsedVocabPair[]> => {
    const prompt = `From the following messy extracted text (English word list with Arabic meanings and English example sentences mixed together), extract ONLY the English word/phrase and its English example sentence for each entry. Ignore the Arabic meaning column completely — it may be corrupted.

Return ONLY a valid JSON array, no markdown, no explanation, in this exact format:
[{"word":"example word","example":"Example sentence here."}]

Text:
${data.rawText}`;

    const raw = await callOpenRouter(prompt);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    try {
      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Parse error:", err, cleaned);
      return [];
    }
  });

// يولّد المعنى العربي لكل كلمة ويخزنها بالقاعدة
export const seedVocabBatch = createServerFn({ method: "POST" })
  .validator(
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
        const prompt = `أعطني المعنى العربي المختصر (كلمة أو كلمتين فقط، بدون أي شرح إضافي) للكلمة الإنجليزية التالية بناءً على السياق:

الكلمة: ${item.word}
المثال: ${item.example}

اكتب فقط المعنى العربي، بدون أي نص إضافي.`;

        const meaning = await callOpenRouter(prompt);

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
      await sleep(400); // نفس معدل التقييد المستخدم بالمشروع
    }

    return results;
  });
