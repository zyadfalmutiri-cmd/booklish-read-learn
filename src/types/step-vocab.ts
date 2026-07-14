export interface StepVocabItem {
  id: string;
  word: string;
  example_en: string | null;
  meaning_ar: string | null;
  source: "daily800" | "oxford3000";
  cefr_level: string | null;
  status: "pending" | "done" | "error";
}

export interface ParsedVocabPair {
  word: string;
  example: string;
}
