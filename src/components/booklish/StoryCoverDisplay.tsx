import React from "react";
import { StoryCover } from "@/hooks/useStoryCover";
import type { Story } from "@/lib/types";

interface StoryDisplayProps {
  story: Story;
}

/**
 * Story cover display component for story pages
 */
export function StoryCoverDisplay({ story }: StoryDisplayProps) {
  return (
    <div className="w-full mb-8">
      <StoryCover
        story={story}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
      />
    </div>
  );
}

/**
 * Story card with cover
 */
export function StoryCardWithCover({ story }: StoryDisplayProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
      <StoryCover story={story} className="w-full h-48 sm:h-56" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
        <p className="text-white text-center font-bold text-lg">
          {story.title}
        </p>
        <p className="text-white/80 text-sm mt-2">{story.minutes} min read</p>
      </div>
    </div>
  );
}

/**
 * Story library grid with covers
 */
interface StoryLibraryGridProps {
  stories: Story[];
  columns?: number;
}

export function StoryLibraryGrid({
  stories,
  columns = 3,
}: StoryLibraryGridProps) {
  return (
    <div
      className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {stories.map((story) => (
        <div key={story.slug} className="cursor-pointer">
          <StoryCardWithCover story={story} />
        </div>
      ))}
    </div>
  );
}
