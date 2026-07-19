export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface LibraryBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  level: CEFRLevel;
  genre: string;
  tags: string[];
  publication_year: number | null;
  word_count: number;
  chapter_count: number;
  storage_path: string;
  cover_url: string | null;
}

export interface LibraryChapter {
  heading: string;
  text: string;
}

export interface LibraryBookContent {
  slug: string;
  title: string;
  author: string;
  level: CEFRLevel;
  genre: string;
  tags: string[];
  word_count: number;
  chapter_count: number;
  chapters: LibraryChapter[];
}
