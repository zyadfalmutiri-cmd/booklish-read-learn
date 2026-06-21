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
import { theLostDog } from "@/data/stories/the-lost-dog";
import { aNewFriend } from "@/data/stories/a-new-friend";
import { theRainyAfternoon } from "@/data/stories/the-rainy-afternoon";
import { theBlueBicycle } from "@/data/stories/the-blue-bicycle";
import { grandmothersRecipe } from "@/data/stories/grandmothers-recipe";
import { firstDay } from "@/data/stories/first-day";
import { theKindStranger } from "@/data/stories/the-kind-stranger";
import { theBrokenWindow } from "@/data/stories/the-broken-window";
import { theLittleBird } from "@/data/stories/the-little-bird";
import { aBirthdaySurprise } from "@/data/stories/a-birthday-surprise";
import { theEmptyHouse } from "@/data/stories/the-empty-house";
import { aLetterFromParis } from "@/data/stories/a-letter-from-paris";
import { lostInTheCity } from "@/data/stories/lost-in-the-city";
import { theMarathon } from "@/data/stories/the-marathon";
import { theOldPhotograph } from "@/data/stories/the-old-photograph";
import { aStrangeDiscovery } from "@/data/stories/a-strange-discovery";
import { theMusician } from "@/data/stories/the-musician";
import { theLastLibrary } from "@/data/stories/the-last-library";
import { theInheritance } from "@/data/stories/the-inheritance";
import { betweenTwoWorlds } from "@/data/stories/between-two-worlds";
import { theClockTower } from "@/data/stories/the-clock-tower";

function withDefaults(story: Story): Story {
  const tags: Category[] = story.tags ?? [];
  const merged = new Set<Category>(tags);
  if (story.genre !== "non-fiction") merged.add("fiction");
  if (story.minutes <= 5) merged.add("short");
  return { ...story, tags: Array.from(merged) };
}

export const stories: Story[] = [
  // Original 9
  theMissingKey,
  theNightBus,
  theRiversEdge,
  lightersFromTheLighthouse,
  theCoffeeBeanJourney,
  echoesOfMars,
  thePainterUpstairs,
  theLastTrainHome,
  whyWeDream,
  // New beginner (10)
  theLostDog,
  aNewFriend,
  theRainyAfternoon,
  theBlueBicycle,
  grandmothersRecipe,
  firstDay,
  theKindStranger,
  theBrokenWindow,
  theLittleBird,
  aBirthdaySurprise,
  // New intermediate (7)
  theEmptyHouse,
  aLetterFromParis,
  lostInTheCity,
  theMarathon,
  theOldPhotograph,
  aStrangeDiscovery,
  theMusician,
  // New advanced (4)
  theLastLibrary,
  theInheritance,
  betweenTwoWorlds,
  theClockTower,
].map(withDefaults);

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
