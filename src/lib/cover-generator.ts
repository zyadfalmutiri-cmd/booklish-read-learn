import type { Story } from "@/lib/types";

/**
 * توليد صورة غلاف عبر Pollinations.ai
 * خدمة مجانية طرف ثالث، بدون حاجة لـ API key.
 * ملاحظة: هذي خدمة مجانية غير رسمية، الاستقرار والجودة غير مضمونة 100%،
 * وقت الاستجابة ممكن يختلف. للمشاريع التجارية الجادة يفضل لاحقًا
 * الانتقال لخدمة مدفوعة أكثر ثباتًا.
 *
 * ⚠️ مهم: ما نطلب من الذكاء الاصطناعي يرسم عنوان القصة كنص داخل الصورة —
 * جربنا هذا وطلعت النتيجة صور مجردة بدون أي نص واضح (نماذج التوليد المجانية
 * زي Flux ضعيفة جدًا في رسم نص مقروء، خصوصًا مع برومبت طويل). العنوان الآن
 * يُضاف بخط حقيقي عبر Canvas بعد التوليد — شوف cover-compose.ts.
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
  // ✅ أبعاد بورتريت (2:3) تطابق شكل غلاف كتاب حقيقي
  const { prompt, width = 800, height = 1200 } = options;

  const encodedPrompt = encodeURIComponent(prompt);
  const maxRetries = 4;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // seed عشوائي عشان كل توليد يطلع مختلف شوي حتى لو نفس البرومبت
      const seed = Math.floor(Math.random() * 1_000_000);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&seed=${seed}`;

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
 * الأسلوب الفني الثابت — رسمة فلات فيكتور بسيطة (بدون أي نص داخلها).
 * نطلب صراحة إن الثلث العلوي يبقى فاتح/بسيط (سماء أو خلفية صافية) عشان
 * لما نضيف العنوان بعدين عبر Canvas يكون فوق خلفية واضحة ومقروءة.
 */
const BASE_FLAT_COVER_STYLE =
  "flat 2D vector illustration, children's book illustration style, simple clean shapes, minimal flat shading, no gradients on characters, not photorealistic, not 3D rendered, not glass, not glossy, absolutely no text, no words, no letters, no numbers, no watermark, no logo, a single clear symbolic focal subject (a person, an animal, or an object representing the story's theme) placed in the lower two-thirds of the image, the upper third of the image is a simple plain sky or plain background area with no objects in it, kept clear and open for a text overlay to be added later";

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
