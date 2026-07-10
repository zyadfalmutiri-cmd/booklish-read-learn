import type { Story } from "@/lib/types";

/**
 * توليد صورة غلاف فوتوغرافية واقعية عبر Pollinations.ai
 * خدمة مجانية طرف ثالث، بدون حاجة لـ API key.
 * ملاحظة: هذي خدمة مجانية غير رسمية، الاستقرار والجودة غير مضمونة 100%،
 * وقت الاستجابة ممكن يختلف. للمشاريع التجارية الجادة يفضل لاحقًا
 * الانتقال لخدمة مدفوعة أكثر ثباتًا.
 */

export interface GenerateAICoverOptions {
  prompt: string;
  width?: number;
  height?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAIStoryCover(
  options: GenerateAICoverOptions
): Promise<Blob> {
  const { prompt, width = 1200, height = 800 } = options;

  const encodedPrompt = encodeURIComponent(prompt);
  const maxRetries = 4;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // seed عشوائي عشان كل توليد يطلع مختلف شوي حتى لو نفس البرومبت
      const seed = Math.floor(Math.random() * 1_000_000);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

      const response = await fetch(url);

      if (response.status === 429) {
        // Rate limited — ننتظر مدة متزايدة (Exponential backoff) ونعيد المحاولة
        const waitTime = 4000 * (attempt + 1); // 4s, 8s, 12s, 16s...
        lastError = new Error(
          `Rate limited (HTTP 429) on attempt ${attempt + 1}`
        );
        if (attempt < maxRetries) {
          await sleep(waitTime);
          continue;
        }
        throw lastError;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to generate AI cover image: HTTP ${response.status}`
        );
      }

      const blob = await response.blob();

      // تحقق بسيط: لو حجم الصورة صغير جدًا فهذا مؤشر خلل (صورة فاضية/خطأ)
      if (!blob || blob.size < 2000) {
        throw new Error(
          `Generated AI cover looks empty or invalid (size: ${blob?.size ?? 0} bytes)`
        );
      }

      return blob;
    } catch (err) {
      lastError = err;
      // لو الخطأ مو 429 (مثلًا مشكلة شبكة)، نعيد المحاولة بتأخير بسيط
      if (attempt < maxRetries) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
    }
  }

  throw lastError;
}

/**
 * الأسلوب الفني الثابت لكل الأغلفة — رسم توضيحي درامي بأسلوب أغلفة الكتب
 * (illustration)، مو صورة فوتوغرافية واقعية. هذا الأسلوب ثابت لكل القصص
 * بغض النظر عن نوعها، عشان يعطي هوية بصرية موحدة للمكتبة كاملة.
 */
const BASE_ILLUSTRATION_STYLE =
  "dramatic painted book cover illustration, semi-realistic digital painting art style, bold graphic composition, rich saturated colors, strong dynamic lighting, in the style of modern biography and non-fiction book covers, painterly brushwork, no photorealism";

/**
 * تلميحات مزاج/إضاءة حسب نوع القصة (Genre) — تعديل بسيط على المزاج
 * مع الحفاظ على نفس الأسلوب الفني الأساسي أعلاه
 */
const GENRE_MOOD_MAP: Record<string, string> = {
  "non-fiction": "inspiring and emotional mood, warm heroic lighting",
  mystery: "dark moody atmosphere, deep shadows, suspenseful tone",
  romance: "soft warm tones, golden hour glow, tender atmosphere",
  "sci-fi": "futuristic color palette, glowing highlights, epic scale",
  adventure: "energetic dynamic mood, vivid outdoor colors, sense of motion",
  drama: "emotional intense mood, contrast lighting, cinematic tension",
};

/**
 * تلميحات إضافية حسب التصنيف (Tags) لو موجودة
 */
const TAG_HINT_MAP: Record<string, string> = {
  sports: "athlete figure, sports stadium setting, dynamic action pose",
};

/**
 * يبني برومبت تلقائي معبّر عن القصة إذا ما كان فيه coverPrompt مخصص
 * الأسلوب الفني ثابت دائمًا (illustration)، والمزاج فقط يختلف حسب النوع
 */
export function buildCoverPrompt(story: Story): string {
  if (story.coverPrompt && story.coverPrompt.trim().length > 0) {
    // حتى لو فيه coverPrompt مخصص، نضيف الأسلوب الفني الثابت له
    // عشان يبقى متسق مع باقي المكتبة
    return `${BASE_ILLUSTRATION_STYLE}, ${story.coverPrompt.trim()}, no text, no watermark`;
  }

  const mood =
    GENRE_MOOD_MAP[story.genre] || "emotional cinematic mood";

  const tagHint = story.tags
    ?.map((tag) => TAG_HINT_MAP[tag])
    .filter(Boolean)
    .join(", ");

  const parts = [
    BASE_ILLUSTRATION_STYLE,
    mood,
    tagHint,
    `depicting the theme of "${story.title}"`,
    story.blurb,
    "no text, no watermark, no logo, high detail",
  ].filter(Boolean);

  return parts.join(", ");
}

/**
 * تحويل blob إلى data URL (لو احتجناها لأي عرض مؤقت بالواجهة)
 */
export async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
