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
 * الأسلوب الفني الثابت — رسمة توضيحية ملوّنة بإضاءة دافئة (بدون أي نص داخلها).
 * نطلب صراحة إن الثلث العلوي يبقى فاتح/بسيط (سماء أو خلفية صافية) عشان
 * لما نضيف العنوان بعدين عبر Canvas يكون فوق خلفية واضحة ومقروءة.
 */
const BASE_FLAT_COVER_STYLE =
  "vibrant stylized digital illustration book cover art, illustrated poster art style, portrait orientation book cover, NOT a photograph, not photorealistic, not realistic, not 3D rendered, not glass, not glossy, simplified and stylized shapes and characters, bold saturated colors, warm atmospheric lighting with soft color gradients, clean modern illustration aesthetic similar to young-adult book cover art, richly colored illustrated scene, professional book cover design, high detail illustration, absolutely no text, no words, no letters, no numbers, no watermark, no logo, always include one clear symbolic focal subject (a person, an animal, or an object representing the story's theme) prominently in the foreground in the lower two-thirds of the image, the upper third of the image is a simple, relatively plain sky or background area with no objects in it, kept clear and open for a text overlay to be added later";

/**
 * تلميحات لوحة ألوان/مزاج هادئة (Pastel/Muted) حسب نوع القصة (Genre)
 */
const GENRE_MOOD_MAP: Record<string, string> = {
  "non-fiction": "warm sandy pastel palette, desert tan and soft amber tones, pale blue sky",
  mystery: "muted deep teal or navy pastel palette, subdued moody tone",
  romance: "soft pastel pink and cream palette",
  "sci-fi": "pastel lavender and soft powder-blue palette",
  adventure: "sky-blue pastel palette, sunlit sandy or grassy ground tones",
  drama: "muted dusty-rose or soft amber pastel palette",
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
