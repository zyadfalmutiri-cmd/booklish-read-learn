import { useRef } from "react";
import { toPng } from "html-to-image";
import { Share2 } from "lucide-react";
import { ResultShareCard } from "./result-share-card";


export function ShareQuizResult({
  storyTitle, score, total,
}: { storyTitle: string; score: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "result.png", { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: storyTitle, files: [file] });
    } else {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "result.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="absolute -left-[9999px]">
        <ResultShareCard ref={cardRef} storyTitle={storyTitle} score={score} total={total} />
      </div>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
      >
        <Share2 className="h-4 w-4" /> مشاركة النتيجة
      </button>
    </div>
  );
}
