export interface CoverGeneratorOptions {
  emoji: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
  width?: number;
  height?: number;
}

/**
 * تلف نص طويل على عدة أسطر داخل عرض معين (Canvas)
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Generate a story cover image with emoji, title, and gradient background
 * باستخدام Canvas API مباشرة (بدون html-to-image) — أكثر ثباتًا على متصفحات الموبايل
 */
export async function generateStoryCover(
  options: CoverGeneratorOptions
): Promise<string> {
  const {
    emoji,
    title,
    gradientFrom,
    gradientTo,
    width = 800,
    height = 600,
  } = options;

  const pixelRatio = 2;

  const canvas = document.createElement("canvas");
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D canvas context");
  }

  // نكبّر كل الرسم بمقدار pixelRatio عشان نطلع بجودة عالية (Retina)
  ctx.scale(pixelRatio, pixelRatio);

  // خلفية متدرجة (Gradient)
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, gradientFrom);
  gradient.addColorStop(1, gradientTo);
  ctx.fillStyle = gradient;

  // رسم الخلفية بزوايا دائرية بسيطة
  const radius = 12;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  // الدائرة الزخرفية بأسفل يمين الصورة
  ctx.save();
  ctx.beginPath();
  ctx.arc(width - 70, height - 70, 100, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.shadowColor = "rgba(255,255,255,0.2)";
  ctx.shadowBlur = 40;
  ctx.fill();
  ctx.restore();

  // الإيموجي الكبير بالمنتصف
  const emojiSize = 200;
  const emojiY = height / 2 - 60;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.font = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, width / 2, emojiY);
  ctx.restore();

  // العنوان أسفل الإيموجي (مع التفاف تلقائي للنص الطويل)
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = `bold 48px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  const maxTextWidth = width - 80;
  const lines = wrapText(ctx, title, maxTextWidth);
  const lineHeight = 48 * 1.3;
  const titleStartY = height / 2 + 100;

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, titleStartY + index * lineHeight);
  });
  ctx.restore();

  // تحويل الرسمة إلى صورة PNG (Data URL)
  const dataUrl = canvas.toDataURL("image/png");

  // تحقق بسيط: لو الصورة الناتجة صغيرة جدًا فهذا مؤشر لخلل
  if (!dataUrl || dataUrl.length < 1000) {
    throw new Error(
      `Generated image data looks empty or invalid (length: ${dataUrl?.length ?? 0})`
    );
  }

  return dataUrl;
}

/**
 * Generate covers for multiple stories
 */
export async function generateStoryCovers(
  stories: Array<{
    slug: string;
    title: string;
    cover: string;
    coverHue: string;
  }>
): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  for (const story of stories) {
    try {
      const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);

      const imageData = await generateStoryCover({
        emoji: story.cover,
        title: story.title,
        gradientFrom,
        gradientTo,
      });

      results.set(story.slug, imageData);
    } catch (error) {
      console.error(`Failed to generate cover for ${story.slug}:`, error);
    }
  }

  return results;
}

/**
 * Extract gradient colors from Tailwind gradient string
 * e.g., "from-amber-200 to-amber-400" => ["#fef08a", "#fcd34d"]
 */
export function extractGradientColors(coverHue: string): [string, string] {
  // Tailwind color map
  const colorMap: Record<string, Record<string, string>> = {
    amber: {
      "200": "#fef08a",
      "300": "#fcd34d",
      "400": "#fbbf24",
    },
    sky: {
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
    },
    blue: {
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
    },
    yellow: {
      "200": "#fef08a",
      "300": "#fcd34d",
      "400": "#fbbf24",
    },
    orange: {
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
    },
    red: {
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
    },
    teal: {
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
    },
    cyan: {
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
    },
    rose: {
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
    },
    pink: {
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
    },
    purple: {
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
    },
    indigo: {
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
    },
    emerald: {
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
    },
    green: {
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
    },
  };

  // Parse the coverHue string
  const fromMatch = coverHue.match(/from-(\w+)-(\d+)/);
  const toMatch = coverHue.match(/to-(\w+)-(\d+)/);

  let fromColor = "#fef08a";
  let toColor = "#fcd34d";

  if (fromMatch) {
    const [, colorName, shade] = fromMatch;
    fromColor = colorMap[colorName]?.[shade] || fromColor;
  }

  if (toMatch) {
    const [, colorName, shade] = toMatch;
    toColor = colorMap[colorName]?.[shade] || toColor;
  }

  return [fromColor, toColor];
}

/**
 * Convert data URL to blob for storage
 */
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return response.blob();
}

/**
 * Get optimal gradient colors based on story theme
 */
export function getGradientForTheme(
  genre: string,
  level: string
): [string, string] {
  const themeMap: Record<string, [string, string]> = {
    mystery: ["#bfdbfe", "#60a5fa"], // blue
    romance: ["#fbcfe8", "#f472b6"], // pink
    "sci-fi": ["#c7d2fe", "#818cf8"], // indigo
    adventure: ["#fef08a", "#fbbf24"], // amber
    drama: ["#fed7aa", "#fb923c"], // orange
    "non-fiction": ["#99f6e4", "#2dd4bf"], // teal
  };

  return themeMap[genre] || ["#fef08a", "#fcd34d"];
}
