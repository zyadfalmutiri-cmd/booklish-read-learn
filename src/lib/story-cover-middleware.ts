/**
 * Middleware to auto-generate covers for stories on server startup
 */

import { generateStoryCover, extractGradientColors } from "@/lib/cover-generator";
import type { Story } from "@/lib/types";

export async function initializeStoryCovers(stories: Story[]): Promise<void> {
  console.log("🎨 Initializing story covers...");

  const coversToGenerate = stories.filter((s) => !s.coverImage);

  if (coversToGenerate.length === 0) {
    console.log("✅ All stories already have covers");
    return;
  }

  console.log(`⏳ Generating covers for ${coversToGenerate.length} stories...`);

  const generationPromises = coversToGenerate.map(async (story) => {
    try {
      const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);
      const coverImage = await generateStoryCover({
        emoji: story.cover,
        title: story.title,
        gradientFrom,
        gradientTo,
        width: 1200,
        height: 800,
      });

      // Update story object
      (story as any).coverImage = coverImage;

      return { slug: story.slug, success: true };
    } catch (error) {
      console.error(`❌ Failed to generate cover for ${story.slug}:`, error);
      return { slug: story.slug, success: false };
    }
  });

  const results = await Promise.all(generationPromises);
  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;

  console.log(`\n✅ Initialization complete:`);
  console.log(`   Generated: ${successCount}`);
  console.log(`   Failed: ${failureCount}`);
}

/**
 * Cache covers in memory for faster loading
 */
export class StoryCoverCache {
  private static cache: Map<string, string> = new Map();
  private static isInitialized = false;

  static async initialize(stories: Story[]): Promise<void> {
    if (this.isInitialized) return;

    console.log("📦 Pre-caching story covers...");

    for (const story of stories) {
      if (story.coverImage) {
        this.cache.set(story.slug, story.coverImage);
      }
    }

    this.isInitialized = true;
    console.log(`✅ Cached ${this.cache.size} covers`);
  }

  static get(slug: string): string | null {
    return this.cache.get(slug) || null;
  }

  static set(slug: string, imageData: string): void {
    this.cache.set(slug, imageData);
  }

  static clear(): void {
    this.cache.clear();
    this.isInitialized = false;
  }

  static getSize(): number {
    return this.cache.size;
  }
}
