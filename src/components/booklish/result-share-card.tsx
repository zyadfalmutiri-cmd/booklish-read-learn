import { forwardRef } from "react";

interface ResultShareCardProps {
  storyTitle: string;
  score: number;
  total: number;
}

export const ResultShareCard = forwardRef<HTMLDivElement, ResultShareCardProps>(
  ({ storyTitle, score, total }, ref) => {
    const percentage = Math.round((score / total) * 100);
    return (
      <div
        ref={ref}
        className="w-[380px] rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-8 text-center text-primary-foreground"
      >
        <p className="text-xs uppercase tracking-wider opacity-80">Booklish</p>
        <h3 className="mt-2 font-serif text-lg">{storyTitle}</h3>
        <div className="mt-4 text-6xl font-extrabold">{percentage}%</div>
        <p className="mt-2 text-sm opacity-90">{score} / {total}</p>
      </div>
    );
  },
);
ResultShareCard.displayName = "ResultShareCard";
