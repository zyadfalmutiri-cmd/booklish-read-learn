import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ✅ دالة سيرفر: توليد صورة غلاف عبر Gemini (Nano Banana / gemini-2.5-flash-image)
// المفتاح (GEMINI_API_KEY) يبقى بالسيرفر فقط وما ينكشف للمتصفح إطلاقاً
export const generateCoverImage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      prompt: z.string().min(1),
    })
  )
  .handler(async ({ data }): Promise<{ base64: string | null; mimeType: string | null; error?: string }> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { base64: null, mimeType: null, error: "مفتاح GEMINI_API_KEY غير موجود بإعدادات السيرفر" };
    }

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: data.prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        return {
          base64: null,
          mimeType: null,
          error: `Gemini HTTP ${response.status}: ${errText.slice(0, 300)}`,
        };
      }

      const json = await response.json();
      const parts = json?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p: any) => p?.inlineData?.data);

      if (!imagePart) {
        return { base64: null, mimeType: null, error: "ما رجعت Gemini أي صورة (parts فاضية)" };
      }

      return {
        base64: imagePart.inlineData.data as string,
        mimeType: (imagePart.inlineData.mimeType as string) || "image/png",
      };
    } catch (err) {
      return { base64: null, mimeType: null, error: String(err) };
    }
  });
