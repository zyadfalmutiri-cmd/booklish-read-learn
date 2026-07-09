import { useEffect, useState } from "react";
import type { Story } from "@/lib/types";
import { useStoryCover } from "@/lib/story-cover-attach";

interface UseStoryWithCoverProps {
  story: Story;
}

/**
 * React hook to load story with generated cover image
 */
export function useStoryWithCover({ story }: UseStoryWithCoverProps) {
  const [coverImage, setCoverImage] = useState<string | null>(
    story.coverImage || null
  );
  const [isLoading, setIsLoading] = useState(!story.coverImage);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (story.coverImage) {
      setCoverImage(story.coverImage);
      setIsLoading(false);
      return;
    }

    const loadCover = async () => {
      try {
        setIsLoading(true);
        const image = await useStoryCover(story);
        setCoverImage(image);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    loadCover();
  }, [story]);

  return { coverImage, isLoading, error };
}

interface StoryCoverProps {
  story: Story;
  className?: string;
}

/**
 * React component to display story cover with auto-generation
 */
export function StoryCover({ story, className = "" }: StoryCoverProps) {
  const { coverImage, isLoading } = useStoryWithCover({ story });

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${story.coverHue} rounded-lg ${className}`}
      >
        <div className="text-6xl animate-pulse">{story.cover}</div>
      </div>
    );
  }

  if (coverImage) {
    return (
      <img
        src={coverImage}
        alt={story.title}
        className={`rounded-lg object-cover ${className}`}
      />
    );
  }

  // Fallback to gradient with emoji
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br ${story.coverHue} rounded-lg p-6 ${className}`}
    >
      <div className="text-6xl mb-4">{story.cover}</div>
      <p className="text-white text-center font-bold text-lg text-shadow">
        {story.title}
      </p>
    </div>
  );
}
