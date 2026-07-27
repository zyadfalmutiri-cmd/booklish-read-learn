import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// نفس النموذج المستخدم بميزتي التحدث الصوتي ونطق الجمل — المفتاح يبقى بالسيرفر فقط
const FREE_MODEL = "poolside/laguna-xs-2.1:free";

// دالة سيرفر: تقييم نطق جملة واحدة (Shadowing) وإعطاء نصيحة قصيرة بالعربي
export const getPronunciationTip = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      target: z.string().min(1),
      spoken: z.string(),
    })
  )
  .handler(async ({ data }): Promise<{ tip: string | null }> => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return { tip: null };

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: FREE_MODEL,
          messages: [
            {
              role: "system",
              content: `You are a pronunciation coach for Arabic-speaking English learners.
Compare the target sentence with what the speech recognizer heard the user say, and give ONE short, encouraging tip in Arabic (max 1-2 sentences) about a specific word or sound to improve. If the attempt was very close or perfect, just congratulate them briefly in Arabic. Do not repeat the full sentences back.`,
            },
            {
              role: "user",
              content: `Target sentence: "${data.target}"\nWhat the recognizer heard: "${data.spoken || "(nothing detected)"}"`,
            },
          ],
        }),
      });
      if (!response.ok) return { tip: null };
      const json = await response.json();
      const tip: string | null = json.choices?.[0]?.message?.content?.trim() || null;
      return { tip };
    } catch {
      return { tip: null };
    }
  });

// دالة سيرفر: رد "رفيق المحادثة" الصوتي بالصفحة الرئيسية (SpeakingPartner)
export const getSpeakingPartnerReply = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(
        z.object({
          role: z.enum(["system", "user", "assistant"]),
          content: z.string(),
        })
      ),
    })
  )
  .handler(async ({ data }): Promise<{ raw: string }> => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("مفتاح OPENROUTER_API_KEY غير موجود بإعدادات السيرفر");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: FREE_MODEL,
        messages: data.messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter HTTP ${response.status}: ${errText.slice(0, 200)}`);
    }

    const json = await response.json();
    const raw: string = json.choices?.[0]?.message?.content || "";
    return { raw };
  });
