import { toPng } from "html-to-image";

export interface CoverGeneratorOptions {
  emoji: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
  width?: number;
  height?: number;
}

/**
 * Generate a story cover image with emoji, title, and gradient background
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

  // Create container element
  const container = document.createElement("div");
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.backgroundImage = `linear-gradient(135deg, var(--from), var(--to))`;
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.fontFamily = "system-ui, -apple-system, sans-serif";

  // Set CSS variables for gradient colors
  container.style.setProperty("--from", `var(--gradient-from, ${gradientFrom})`);
  container.style.setProperty("--to", `var(--gradient-to, ${gradientTo})`);

  // Create inline style with actual gradient values
  container.setAttribute(
  "style",
  `
  width: ${width}px;
  height: ${height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  z-index: -9999;
  font-family: system-ui, -apple-system, sans-serif;
  border-radius: 12px;
`
);


  // Add emoji
  const emojiElement = document.createElement("div");
  emojiElement.style.fontSize = "200px";
  emojiElement.style.marginBottom = "30px";
  emojiElement.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.2))";
  emojiElement.textContent = emoji;
  container.appendChild(emojiElement);

  // Add title
  const titleElement = document.createElement("div");
  titleElement.style.fontSize = "48px";
  titleElement.style.fontWeight = "bold";
  titleElement.style.color = "white";
  titleElement.style.textAlign = "center";
  titleElement.style.maxWidth = `${width - 80}px`;
  titleElement.style.textShadow = "0 4px 12px rgba(0,0,0,0.3)";
  titleElement.style.lineHeight = "1.3";
  titleElement.style.padding = "0 40px";
  titleElement.textContent = title;
  container.appendChild(titleElement);

  // Add decorative elements
  const decorative = document.createElement("div");
  decorative.style.position = "absolute";
  decorative.style.bottom = "20px";
  decorative.style.right = "20px";
  decorative.style.width = "100px";
  decorative.style.height = "100px";
  decorative.style.borderRadius = "50%";
  decorative.style.background = "rgba(255,255,255,0.1)";
  decorative.style.boxShadow = "0 0 40px rgba(255,255,255,0.2)";
  container.appendChild(decorative);

  // Append to body temporarily
document.body.appendChild(container);

// انتظر فريمين عشان نضمن اكتمال الرسم قبل الالتقاط
await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

try {
  // Convert to PNG
  const dataUrl = await toPng(container, {
    width,
    height,
    pixelRatio: 2,
    cacheBust: true,
  });

  return dataUrl;
} finally {
  // Clean up
  document.body.removeChild(container);
}

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
