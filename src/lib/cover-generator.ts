import type { Story } from "@/lib/types";

/**
 * توليد صورة غلاف عبر Pollinations.ai
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
  // ✅ أبعاد بورتريت (2:3) تطابق شكل غلاف كتاب حقيقي، بدل اللاندسكيب القديم،
  // عشان العنوان النصي والرسمة ما ينقصّون لما الصورة تتقصّ داخل بطاقة القصة
  const { prompt, width = 800, height = 1200 } = options;

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
 * الأسلوب الفني الثابت لكل الأغلفة — غلاف كتاب فلات فيكتور (Flat Vector
 * Book Cover) بعنوان نصي بارز أعلى الغلاف، بنفس روح أغلفة "Died Standing"
 * و"Great Glory Across 300 Years" و"The Da Vinci Code":
 * توضيح مسطّح (Flat Illustration) بألوان محدودة هادئة، شخصية أو رمز واحد
 * واضح بمنتصف/أسفل الغلاف، وعنوان القصة مكتوب بخط بارز وواضح بالأعلى.
 * هذا الأسلوب ثابت لكل القصص بغض النظر عن نوعها، عشان هوية بصرية موحدة.
 */
const BASE_FLAT_COVER_STYLE =
  "professional flat vector illustration book cover design, 2D flat illustration style, NOT a photograph, not photorealistic, not 3D rendered, simple clean geometric shapes with minimal shading, limited muted flat color palette, soft solid or gently gradiented background in one dominant color, a single clear symbolic focal subject in flat vector illustration style placed in the lower two-thirds of the composition representing the story's main theme (this could be a person, an animal, an object, or an iconic symbol depending on what best fits the story), the focal subject is the clear center of the composition, clean modern minimalist book cover composition, bold impactful book-title typography prominently displayed across the upper portion of the cover in a clean bold sans-serif or serif font, well-kerned and legible, the title text is the same color as or contrasts cleanly against the background";

/**
 * تلميحات لوحة ألوان/مزاج هادئة (Pastel/Muted) حسب نوع القصة (Genre)،
 * تطابق روح الأمثلة (أزرق سماوي فاتح، رملي دافئ، وردي فاتح...)
 */
const GENRE_MOOD_MAP: Record<string, string> = {
  "non-fiction": "warm sandy pastel palette, desert tan and soft amber tones with a pale blue sky gradient background",
  mystery: "muted deep teal or navy pastel palette, soft flat shadows, subdued moody tone",
  romance: "soft pastel pink and cream palette, gentle warm glow",
  "sci-fi": "pastel lavender and soft powder-blue palette, minimal futuristic flat shapes",
  adventure: "sky-blue pastel gradient background, sunlit sandy or grassy flat ground tones",
  drama: "muted dusty-rose or soft amber pastel palette, gentle contrast",
};

/**
 * تلميحات إضافية حسب التصنيف (Tags) لو موجودة
 */
const TAG_HINT_MAP: Record<string, string> = {
  sports: "flat vector illustrated athlete figure in a team jersey with a visible number, standing on a pitch, curved stadium silhouette in the background, subtle dynamic pose",
};

/**
 * يبني برومبت تلقائي معبّر عن القصة إذا ما كان فيه coverPrompt مخصص
 * الأسلوب الفني ثابت دائمًا (flat vector + عنوان نصي)، والمزاج فقط يختلف حسب النوع
 */
export function buildCoverPrompt(story: Story): string {
  const titleText = story.title.toUpperCase();
  const titleInstruction = `the title text at the top of the cover must read exactly: "${titleText}"`;

  if (story.coverPrompt && story.coverPrompt.trim().length > 0) {
    // حتى لو فيه coverPrompt مخصص، نضيف الأسلوب الفني الثابت له
    // عشان يبقى متسق مع باقي المكتبة
    return `${BASE_FLAT_COVER_STYLE}, ${titleInstruction}, ${story.coverPrompt.trim()}, no watermark, no logo, no signature, no extra text besides the title`;
  }

  const mood =
    GENRE_MOOD_MAP[story.genre] || "warm muted pastel palette";

  const tagHint = story.tags
    ?.map((tag) => TAG_HINT_MAP[tag])
    .filter(Boolean)
    .join(", ");

  const parts = [
    BASE_FLAT_COVER_STYLE,
    titleInstruction,
    mood,
    tagHint,
    `depicting the theme of "${story.title}"`,
    story.blurb,
    "no watermark, no logo, no signature, no extra text besides the title",
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
