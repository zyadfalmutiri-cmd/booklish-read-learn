import type { Story } from "./types";
import { theMissingKey } from "@/data/stories/the-missing-key";
import { lightersFromTheLighthouse } from "@/data/stories/letters-from-the-lighthouse";
import { echoesOfMars } from "@/data/stories/echoes-of-mars";
import { theRiversEdge } from "@/data/stories/the-rivers-edge";
import { thePainterUpstairs } from "@/data/stories/the-painter-upstairs";
import { theLastTrainHome } from "@/data/stories/the-last-train-home";

export const stories: Story[] = [
  theMissingKey,
  theRiversEdge,
  lightersFromTheLighthouse,
  echoesOfMars,
  thePainterUpstairs,
  theLastTrainHome,
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
