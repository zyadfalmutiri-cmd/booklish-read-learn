export type Level = "beginner" | "intermediate" | "advanced";
export type Genre = "mystery" | "romance" | "sci-fi" | "adventure" | "drama" | "non-fiction";
export type Category = "short" | "fiction" | "non-fiction" | "sports";
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export interface VocabEntry {
  ar: string;
  def: string;
  example: string;
  pos?: string; // نوع الكلمة: Noun, Verb, Adjective, Adverb, Preposition... (اختياري)
}

export interface SavedWord {
  word: string;
  ar: string;
  def: string;
  example: string;
  slug: string;
  at: number;
  level?: number;
  nextReview?: number;
  pos?: string; // نوع الكلمة (اختياري، يُعبّى وقت الحفظ من VocabEntry.pos إذا متوفر)
  favorite?: boolean; // هل المستخدم علّمها كمفضلة (نجمة)
}

export interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
  kind: "main-idea" | "event" | "vocab";
}

export interface StoryScene {
  afterParagraph: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface StoryAudio {
  url: string;
  duration: number; // بالثواني
  source: "penguin" | "tts";
}

export interface StoryChapter {
  title: string;
  paragraphs: string[];
}

export interface Story {
  slug: string;
  title: string;
  genre: Genre;
  level: Level;
  cefr?: CEFRLevel;
  blurb: string;
  cover: string;
  coverImage?: string;
  coverPrompt?: string; // ← وصف مخصص لتوليد صورة AI فوتوغرافية (اختياري)
  coverHue: string;
  minutes: number;
  paragraphs: string[];
  chapters?: StoryChapter[];
  vocab: Record<string, VocabEntry>;
  sentenceTranslations?: Record<string, string>;
  tags?: Category[];
  quiz: QuizQuestion[];
  audio?: StoryAudio;
}
