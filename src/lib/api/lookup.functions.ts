import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface LookupResult {
  en: string;
  ar: string;
  source: "ai" | "none";
}

export const lookupWordAI = createServerFn({ method: "POST" })
  .inputValidator(z.object({ word: z.string().min(1).max(60), context: z.string().max(400).optional() }))
  .handler(async ({ data }): Promise<LookupResult> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { en: "No explanation available yet.", ar: "—", source: "none" };

    const word = data.word.trim().toLowerCase();
    const sys =
      "You are a concise English-to-Arabic dictionary for learners. Given a single English word (optionally with a sentence as context), return JSON with two short fields: 'en' (a short English definition, max 12 words) and 'ar' (the most common Modern Standard Arabic translation, 1-4 words). No extra text.";
    const user = data.context ? `Word: "${word}"\nContext: "${data.context}"` : `Word: "${word}"`;

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${sys}\n\n${user}` }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        },
      );
      if (!res.ok) {
        return { en: "No explanation available yet.", ar: "—", source: "none" };
      }
      const json = await res.json();
      const content = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      const parsed = JSON.parse(content);
      const en = typeof parsed.en === "string" && parsed.en.trim() ? parsed.en.trim() : "";
      const ar = typeof parsed.ar === "string" && parsed.ar.trim() ? parsed.ar.trim() : "";
      if (!en && !ar) return { en: "No explanation available yet.", ar: "—", source: "none" };
      return { en: en || "—", ar: ar || "—", source: "ai" };
    } catch {
      return { en: "No explanation available yet.", ar: "—", source: "none" };
    }
  });
