/**
 * تركيب العنوان فوق الغلاف عبر Canvas بدل الاعتماد على الذكاء الاصطناعي
 * لرسم النص.
 *
 * ليش؟ لاحظنا إن نماذج التوليد (Flux عبر Pollinations) تفشل غالبًا في رسم
 * نص واضح ومقروء بالكامل — أحيانًا ما يطلع أي نص إطلاقًا، أو يطلع مشوّه.
 * فبدل ما نعتمد على الذكاء الاصطناعي لرسم الحروف، نخلي الذكاء الاصطناعي
 * يرسم بس الرسمة (بدون أي نص)، ونحن نضيف عنوان القصة فوقها بخط حقيقي
 * عبر Canvas — نتيجته مضمونة 100% وواضحة دائمًا.
 */

export interface ComposeCoverOptions {
  imageBlob: Blob;
  title: string;
  width?: number;
  height?: number;
}

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

// يرسم الصورة بحيث تغطي الكانفاس بالكامل (زي object-fit: cover)
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = drawHeight * imgRatio;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
  }

  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// يحسب متوسط سطوع منطقة معيّنة من الكانفاس، عشان نقرر لون النص
// (أسود على خلفية فاتحة، أبيض على خلفية غامقة)
function getAverageBrightness(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): number {
  const { data } = ctx.getImageData(x, y, w, h);
  let total = 0;
  const step = 16; // نتخطى بكسلات عشان نحسب أسرع
  let count = 0;
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    total += 0.299 * r + 0.587 * g + 0.114 * b;
    count++;
  }
  return count > 0 ? total / count : 128;
}

// يلف النص لأسطر متعددة بحيث يناسب العرض المتاح
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
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * يركّب صورة الغلاف المولّدة بالذكاء الاصطناعي (بدون نص) مع عنوان القصة
 * كنص حقيقي واضح عبر Canvas، ويرجع Blob جاهز للرفع لـ Supabase Storage.
 */
export async function composeCoverWithTitle(
  options: ComposeCoverOptions
): Promise<Blob> {
  const { imageBlob, title, width = 800, height = 1200 } = options;

  const img = await loadImage(imageBlob);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  // 1) ارسم صورة الذكاء الاصطناعي كخلفية كاملة
  drawImageCover(ctx, img, width, height);

  // 2) حدد منطقة العنوان (الثلث العلوي تقريبًا) واحسب سطوعها
  const titleZoneHeight = Math.round(height * 0.28);
  const brightness = getAverageBrightness(ctx, 0, 0, width, titleZoneHeight);
  const isLight = brightness > 150;
  const textColor = isLight ? "#1a1a1a" : "#ffffff";
  const strokeColor = isLight ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  // 3) جهّز نص العنوان (كابيتال، ملفوف على أسطر)
  const titleText = title.toUpperCase();
  const paddingX = width * 0.09;
  const maxTextWidth = width - paddingX * 2;

  let fontSize = Math.round(width * 0.11);
  const minFontSize = Math.round(width * 0.055);
  let lines: string[] = [];

  while (fontSize >= minFontSize) {
    ctx.font = `800 ${fontSize}px Georgia, "Times New Roman", serif`;
    lines = wrapText(ctx, titleText, maxTextWidth);
    const totalTextHeight = lines.length * fontSize * 1.15;
    if (lines.length <= 3 && totalTextHeight <= titleZoneHeight * 0.85) {
      break;
    }
    fontSize -= 4;
  }

  ctx.font = `800 ${fontSize}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";

  const lineHeight = fontSize * 1.15;
  const blockHeight = lines.length * lineHeight;
  const startY = titleZoneHeight / 2 - blockHeight / 2 + lineHeight / 2;

  lines.forEach((line, i) => {
    const y = startY + i * lineHeight;
    // حدّ خارجي (Stroke) يضمن وضوح القراءة فوق أي خلفية
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(2, fontSize * 0.06);
    ctx.strokeText(line, width / 2, y);
    ctx.fillStyle = textColor;
    ctx.fillText(line, width / 2, y);
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export composed cover as PNG"));
      },
      "image/png"
    );
  });
}
