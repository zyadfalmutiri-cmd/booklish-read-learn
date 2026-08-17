import type { Story } from "@/lib/types";
// ⚠️ عدّل هذا الاستيراد ليطابق اسم الملف الفعلي عندك داخل src/lib/api
// (نفس الملف اللي فيه getSpeakingPartnerReply و generateCoverImage)
import { generateCoverImage } from "@/lib/api/cover-image.functions";

/**
 * توليد صورة غلاف عبر Gemini (Nano Banana / gemini-2.5-flash-image) —
 * الاستدعاء يمر عبر دالة سيرفر (generateCoverImage) عشان مفتاح GEMINI_API_KEY
 * يبقى بالسيرفر فقط وما ينكشف بالمتصفح.
 *
 * ⚠️ مهم: ما نطلب من الذكاء الاصطناعي يرسم عنوان القصة كنص داخل الصورة —
 * العنوان يُضاف بخط حقيقي عبر Canvas بعد التوليد — شوف cover-compose.ts.
 */

export interface GenerateAICoverOptions {
  prompt: string;
  width?: number;
  height?: number;
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export async function generateAIStoryCover(
  options: GenerateAICoverOptions
): Promise<Blob> {
  const { prompt } = options;

  const result = await generateCoverImage({ data: { prompt } });

  if (!result.base64 || !result.mimeType) {
    throw new Error(result.error || "Gemini ما رجّعت صورة صالحة");
  }

  const blob = base64ToBlob(result.base64, result.mimeType);

  if (!blob || blob.size < 2000) {
    throw new Error(
      `Generated AI cover looks empty or invalid (size: ${blob?.size ?? 0} bytes)`
    );
  }

  return blob;
}
/**
 * الأسلوب الفني الثابت — Flat Vector Travel-Poster Style
 * (يطابق ستايل "Paris Awaits" / "London Calling")
 */
const BASE_FLAT_COVER_STYLE =
  "flat vector illustration book cover, poster style, portrait orientation, NOT a photograph, not photorealistic, not 3D rendered, not glossy, minimal geometric shapes, bold flat design, warm golden-hour lighting with a deep navy or teal sky, limited color palette of 2-3 colors, no gradients, high contrast, travel-poster aesthetic, professional book cover design, absolutely no text, no words, no letters, no numbers, no watermark, no logo, always include one clear symbolic focal subject prominently in the lower two-thirds of the image, the upper third of the image is a simple plain sky or background area with no objects, kept clear and open for a text overlay to be added later";

/**
 * لوحة ألوان حسب نوع القصة — معدّلة لتناسب navy/amber/teal الثابتة
 */
const GENRE_MOOD_MAP: Record<string, string> = {
  "non-fiction": "warm amber and copper tones, deep teal sky",
  mystery: "deep navy and muted indigo palette, subdued moody tone",
  romance: "warm terracotta and soft rose accents on navy",
  "sci-fi": "deep navy with electric teal accents",
  adventure: "navy sky with sunlit amber ground tones",
  drama: "deep navy with dusty amber accents",
};


/**
 * تلميحات إضافية حسب التصنيف (Tags) لو موجودة
 */
const TAG_HINT_MAP: Record<string, string> = {
  sports: "an athlete figure in a team jersey with a visible number, standing on a pitch, curved stadium silhouette in the background",
};

/**
 * يبني برومبت مختصر ومركّز — بدون أي طلب لرسم نص، فقط الرسمة والمزاج واللون
 */
export function buildCoverPrompt(story: Story): string {
  const mood = GENRE_MOOD_MAP[story.genre] || "warm muted pastel palette";

  const tagHint = story.tags
    ?.map((tag) => TAG_HINT_MAP[tag])
    .filter(Boolean)
    .join(", ");

  if (story.coverPrompt && story.coverPrompt.trim().length > 0) {
    return `${BASE_FLAT_COVER_STYLE}, ${mood}, ${story.coverPrompt.trim()}`;
  }

  const parts = [
    BASE_FLAT_COVER_STYLE,
    mood,
    tagHint,
    story.blurb,
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
