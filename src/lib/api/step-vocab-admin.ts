import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { ParsedVocabPair } from "@/types/step-vocab";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(
    `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  const data = await res.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error("Gemini raw response:", JSON.stringify(data));
  }

  return text?.trim() ?? "";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const parseVocabChunk = createServerFn({ method: "POST" })
  .inputValidator((data: { rawText: string }) => data)
  .handler(async ({ data }): Promise<ParsedVocabPair[]> => {
    const prompt = `From the following messy extracted text (English word list with Arabic meanings and English example sentences mixed together), extract ONLY the English word/phrase and its English example sentence for each entry. Ignore the Arabic meaning column completely — it may be corrupted.

Return ONLY a valid JSON array, no markdown, no explanation, in this exact format:
[{"word":"example word","example":"Example sentence here."}]

Text:
${data.rawText}`;

    const raw = await callGemini(prompt);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    try {
      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Parse error:", err, cleaned);
      return [];
    }
  });

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
        const prompt = `أعطني المعنى العربي المختصر (كلمة أو كلمتين فقط، بدون أي شرح إضافي) للكلمة الإنجليزية التالية بناءً على السياق:

الكلمة: ${item.word}
المثال: ${item.example}

اكتب فقط المعنى العربي، بدون أي نص إضافي.`;

        const meaning = await callGemini(prompt);

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
      await sleep(400);
    }

    return results;
  });
