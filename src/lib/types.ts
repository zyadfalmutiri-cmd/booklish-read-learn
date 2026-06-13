export type Level = "beginner" | "intermediate" | "advanced";
export type Genre = "mystery" | "romance" | "sci-fi" | "adventure" | "drama" | "non-fiction";
export type Category = "short" | "fiction" | "non-fiction";

export interface VocabEntry {
  ar: string;
  def: string;
  example: string;
}

export interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
  kind: "main-idea" | "event" | "vocab";
}

export interface Story {
  slug: string;
  title: string;
  genre: Genre;
  level: Level;
  blurb: string;
  cover: string;
  coverHue: string;
  minutes: number;
  paragraphs: string[];
  vocab: Record<string, VocabEntry>;
  sentenceTranslations?: Record<string, string>;
  tags?: Category[];
  quiz: QuizQuestion[];
}
