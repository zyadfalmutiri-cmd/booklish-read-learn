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
 * الأسلوب الفني الثابت لكل الأغلفة — رسم رقمي غني بالتفاصيل والإضاءة
 * (Rich Digital Illustration) بألوان دافئة وعمق وظلال ناعمة، بنفس أسلوب
 * باقي أغلفة المكتبة (زي أغلفة هاري بوتر وأجاثا كريستي وقصص السفر
 * "London Calling" و"Paris Awaits"). هذا الأسلوب ثابت لكل القصص بغض
 * النظر عن نوعها، عشان هوية بصرية موحدة بالمكتبة كاملة.
 */
const BASE_ILLUSTRATION_STYLE =
  "rich digital illustration book cover art, detailed painterly digital painting style, atmospheric warm lighting, soft glowing light sources, cinematic composition, deep vibrant saturated colors, subtle gradients and soft shading for depth, storybook illustration aesthetic, polished professional book cover art, high detail, evocative mood lighting";

/**
 * تلميحات لوحة ألوان/مزاج حسب نوع القصة (Genre) — تعديل بسيط على لوحة
 * الألوان فقط، مع الحفاظ على نفس الأسلوب الغني الثابت أعلاه
 */
const GENRE_MOOD_MAP: Record<string, string> = {
  "non-fiction": "warm inviting color palette, golden hour tones with deep greens and ambers",
  mystery: "dark moody color palette, deep purples and navy blues with dramatic shadows",
  romance: "soft warm color palette, pinks and warm oranges with gentle glow",
  "sci-fi": "cool futuristic color palette, blues and purples with glowing bright accents",
  adventure: "vibrant energetic color palette, bright blues and oranges with sunlit atmosphere",
  drama: "bold contrast color palette, deep reds and dark tones with dramatic lighting",
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
