import { Volume2 } from "lucide-react";
import { useWordPronunciation } from "../lib/useWordPronunciation";

export function PronounceButton({ word }: { word: string }) {
  const { pronounce, unlockAudio } = useWordPronunciation();

  return (
    <button
      onClick={() => {
        unlockAudio();
        pronounce(word);
      }}
      className="p-1 text-gray-500 hover:text-terracotta-600"
      aria-label={`نطق ${word}`}
    >
      <Volume2 size={16} />
    </button>
  );
}
