import { generateStoryCover, extractGradientColors } from "@/lib/cover-generator";
import { stories } from "@/data/stories";
import fs from "fs";
import path from "path";

/**
 * Script to generate cover images for all stories
 * Run with: npm run generate:covers
 */

interface StoryWithCover {
  slug: string;
  title: string;
  cover: string;
  coverHue: string;
}

async function generateAllCovers() {
  console.log("🎨 Starting cover generation for all stories...\n");

  const coversData: Record<string, string> = {};
  let successCount = 0;
  let failureCount = 0;

  for (const story of stories) {
    try {
      const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);

      console.log(`⏳ Generating cover for: ${story.title}...`);

      const imageData = await generateStoryCover({
        emoji: story.cover,
        title: story.title,
        gradientFrom,
        gradientTo,
        width: 1200,
        height: 800,
      });

      coversData[story.slug] = imageData;
      successCount++;

      console.log(`✅ Generated: ${story.slug}\n`);
    } catch (error) {
      failureCount++;
      console.error(`❌ Failed to generate cover for ${story.slug}:`, error, "\n");
    }
  }

  // Save covers data to file
  const outputPath = path.join(process.cwd(), "src/data/story-covers.ts");

  const fileContent = `// Auto-generated file - do not edit manually
// Generated covers for all stories
// Run 'npm run generate:covers' to regenerate

export const storyCoverImages: Record<string, string> = {
${Object.entries(coversData)
  .map(
    ([slug, imageData]) => `
  "${slug}": "${imageData.substring(0, 100)}...", // Base64 image data
`
  )
  .join("")}
};

// For production, consider uploading these to a CDN like Supabase Storage
`;

  try {
    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n📁 Covers data saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to save covers data:", error);
  }

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📦 Total: ${stories.length}`);
}

// Run if executed directly
if (import.meta.main) {
  generateAllCovers().catch(console.error);
}
