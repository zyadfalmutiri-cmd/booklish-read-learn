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

export async function generateAIStoryCover(
  options: GenerateAICoverOptions
): Promise<Blob> {
  const { prompt, width = 1200, height = 800 } = options;

  const encodedPrompt = encodeURIComponent(prompt);
  // seed عشوائي عشان كل توليد يطلع مختلف شوي حتى لو نفس البرومبت
  const seed = Math.floor(Math.random() * 1_000_000);

  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

  const response = await fetch(url);

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
}

/**
 * خرائط أسلوب التصوير حسب نوع القصة (Genre)
 */
const GENRE_STYLE_MAP: Record<string, string> = {
  "non-fiction": "photorealistic documentary-style photograph, natural lighting",
  mystery: "cinematic moody photograph, dramatic shadows, film noir style",
  romance: "warm cinematic photograph, soft golden hour light",
  "sci-fi": "photorealistic futuristic scene, dramatic cinematic lighting",
  adventure: "photorealistic action photograph, dynamic composition, outdoor setting",
  drama: "cinematic emotional photograph, natural soft lighting",
};

/**
 * تلميحات إضافية حسب التصنيف (Tags) لو موجودة
 */
const TAG_HINT_MAP: Record<string, string> = {
  sports: "athlete in action, sports stadium or field, dynamic motion",
};

/**
 * يبني برومبت تلقائي معبّر عن القصة إذا ما كان فيه coverPrompt مخصص
 */
export function buildCoverPrompt(story: Story): string {
  if (story.coverPrompt && story.coverPrompt.trim().length > 0) {
    return story.coverPrompt.trim();
  }

  const style =
    GENRE_STYLE_MAP[story.genre] ||
    "photorealistic cinematic photograph, high quality";

  const tagHint = story.tags
    ?.map((tag) => TAG_HINT_MAP[tag])
    .filter(Boolean)
    .join(", ");

  const parts = [
    style,
    tagHint,
    `depicting the theme of "${story.title}"`,
    story.blurb,
    "no text, no watermark, high detail, professional photography",
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
