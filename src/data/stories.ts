import type { Story, Category } from "@/lib/types";
import { theMissingKey } from "@/data/stories/the-missing-key";
import { lightersFromTheLighthouse } from "@/data/stories/letters-from-the-lighthouse";
import { echoesOfMars } from "@/data/stories/echoes-of-mars";
import { theRiversEdge } from "@/data/stories/the-rivers-edge";
import { thePainterUpstairs } from "@/data/stories/the-painter-upstairs";
import { theLastTrainHome } from "@/data/stories/the-last-train-home";
import { theCoffeeBeanJourney } from "@/data/stories/the-coffee-bean-journey";
import { theNightBus } from "@/data/stories/the-night-bus";
import { whyWeDream } from "@/data/stories/why-we-dream";

/**
 * Single source of truth for stories. To add a new story:
 *   1. Create a file in src/data/stories/ exporting a `Story`.
 *   2. Import it here and add it to the array.
 * Tags drive library categories — keep them in sync with the `Category` type.
 */

function withDefaults(story: Story): Story {
  const tags: Category[] = story.tags ?? [];
  // Auto-tag fiction for non-non-fiction genres, and short for ≤5 min reads.
  const merged = new Set<Category>(tags);
  if (story.genre !== "non-fiction") merged.add("fiction");
  if (story.minutes <= 5) merged.add("short");
  return { ...story, tags: Array.from(merged) };
}

export const stories: Story[] = [
  theMissingKey,
  theNightBus,
  theRiversEdge,
  lightersFromTheLighthouse,
  theCoffeeBeanJourney,
  echoesOfMars,
  thePainterUpstairs,
  theLastTrainHome,
  whyWeDream,
].map(withDefaults);

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
