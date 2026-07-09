import type { Story } from "@/lib/types";
import { generateStoryCover, extractGradientColors } from "@/lib/cover-generator";

/**
 * Attach generated cover image to story object
 */
export async function attachCoverImageToStory(
  story: Story
): Promise<Story> {
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

    return {
      ...story,
      coverImage,
    };
  } catch (error) {
    console.error(`Failed to generate cover for ${story.slug}:`, error);
    return story;
  }
}

/**
 * Attach cover images to multiple stories
 */
export async function attachCoverImagesToStories(
  stories: Story[]
): Promise<Story[]> {
  return Promise.all(stories.map(attachCoverImageToStory));
}

/**
 * Hook to generate cover on story load
 */
export async function useStoryCover(story: Story): Promise<string | null> {
  if (story.coverImage) {
    return story.coverImage;
  }

  try {
    const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);
    return await generateStoryCover({
      emoji: story.cover,
      title: story.title,
      gradientFrom,
      gradientTo,
      width: 1200,
      height: 800,
    });
  } catch (error) {
    console.error(`Failed to generate cover for ${story.slug}:`, error);
    return null;
  }
}
