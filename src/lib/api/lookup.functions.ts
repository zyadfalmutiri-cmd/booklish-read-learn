import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface LookupResult {
  en: string;
  ar: string;
  source: "ai" | "none";
}

export const lookupWordAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      word: z.string().min(1).max(60),
      context: z.string().max(400).optional(),
    })
  )
  .handler(async ({ data }): Promise<LookupResult> => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return { en: "No explanation available yet.", ar: "—", source: "none" };
    }

    const word = data.word.trim().toLowerCase();
    const sys =
      "You are a concise English-to-Arabic dictionary for Arabic-speaking English learners. " +
      "Given a single English word (and optionally a sentence for context), return ONLY a JSON object with exactly two fields: " +
      "'en' (a short English definition, max 12 words) and 'ar' (the most common Modern Standard Arabic translation, 1-4 words). " +
      "No markdown, no extra text, no explanation — only the JSON object.";

    const user = data.context
      ? `Word: "${word}"\nContext sentence: "${data.context}"`
      : `Word: "${word}"`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://booklish.app",
          "X-Title": "Booklish",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: sys },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
          max_tokens: 80,
        }),
      });

      if (!res.ok) {
        console.error("OpenRouter error:", res.status, await res.text());
        return { en: "No explanation available yet.", ar: "—", source: "none" };
      }

      const json = await res.json();
      const content: string = json?.choices?.[0]?.message?.content ?? "{}";

      // Strip any accidental markdown fences
      const clean = content.replace(/```json|```/gi, "").trim();
      const parsed = JSON.parse(clean);

      const en = typeof parsed.en === "string" && parsed.en.trim() ? parsed.en.trim() : "";
      const ar = typeof parsed.ar === "string" && parsed.ar.trim() ? parsed.ar.trim() : "";

      if (!en && !ar) {
        return { en: "No explanation available yet.", ar: "—", source: "none" };
      }

      return { en: en || "—", ar: ar || "—", source: "ai" };
    } catch (err) {
      console.error("lookupWordAI error:", err);
      return { en: "No explanation available yet.", ar: "—", source: "none" };
    }
  });

// ─── Sentence / paragraph translation ────────────────────────────────────

export const translateTextAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      text: z.string().min(1).max(1200),
    })
  )
  .handler(async ({ data }): Promise<{ ar: string; source: "ai" | "none" }> => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return { ar: "—", source: "none" };

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://booklish.app",
          "X-Title": "Booklish",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a professional English-to-Arabic translator. Translate the given English text into natural, clear Modern Standard Arabic. Return ONLY the Arabic translation, no explanations.",
            },
            { role: "user", content: data.text },
          ],
          temperature: 0.2,
          max_tokens: 400,
        }),
      });

      if (!res.ok) return { ar: "—", source: "none" };

      const json = await res.json();
      const ar = json?.choices?.[0]?.message?.content?.trim() ?? "";
      return ar ? { ar, source: "ai" } : { ar: "—", source: "none" };
    } catch {
      return { ar: "—", source: "none" };
    }
  });
