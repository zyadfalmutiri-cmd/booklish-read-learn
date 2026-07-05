import type { Story } from "@/lib/types";

export const theFamilyReunion: Story = {
  slug: "the-family-reunion",
  title: "The Family Reunion",
  genre: "drama",
  level: "intermediate",
  cefr: "B1",
  blurb: "After years of a family conflict, cousins gather for a reunion that forces old wounds into the open.",
  cover: "👨‍👩‍👧‍👦",
  coverHue: "from-amber-200 to-orange-300",
  minutes: 5,
  paragraphs: [
  "The Al-Harbi family had not gathered together in five years, ever since an argument between two brothers over their father's inheritance.",
  "When their grandmother turned eighty, the whole extended family was invited, including the two brothers who had not spoken since the dispute.",
  "At first, the atmosphere was tense. The brothers avoided eye contact and sat as far apart as possible.",
  "During dinner, their grandmother stood up and said quietly, \"I would rather lose everything I own than lose my sons to silence.\"",
  "The room went quiet. One brother finally looked at the other and said, \"I'm tired of being angry. I miss you.\"",
  "By the end of the evening, the brothers were talking again, and the whole family agreed that the reunion had healed something that had been broken for far too long."
  ],
  vocab: {
  "reunion": {
    "ar": "لمّ شمل",
    "def": "A gathering of people who have been apart.",
    "example": "The family reunion was held every summer."
  },
  "inheritance": {
    "ar": "ميراث",
    "def": "Money or property received from someone who has died.",
    "example": "They argued over the inheritance."
  },
  "dispute": {
    "ar": "نزاع",
    "def": "A disagreement or argument.",
    "example": "The dispute lasted for years."
  },
  "tense": {
    "ar": "متوتر",
    "def": "Feeling or showing nervousness or stress.",
    "example": "The meeting was very tense."
  },
  "healed": {
    "ar": "شُفي / التأم",
    "def": "Made whole or well again after being damaged.",
    "example": "Time healed their friendship."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "Planning a birthday party",
      "Family conflict and reconciliation",
      "Inheriting money",
      "A wedding celebration"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why had the brothers stopped speaking?",
    "choices": [
      "A disagreement over inheritance",
      "A political argument",
      "A business failure",
      "A misunderstanding at work"
    ],
    "answer": 0
  },
  {
    "kind": "event",
    "q": "What changed the brothers' relationship?",
    "choices": [
      "A lawyer's advice",
      "Their grandmother's words",
      "A letter",
      "A mutual friend"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Tense\" describes an atmosphere that is…",
    "choices": [
      "relaxed",
      "stressful or nervous",
      "joyful",
      "boring"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Healed\" means made whole again after being…",
    "choices": [
      "improved",
      "damaged",
      "sold",
      "forgotten"
    ],
    "answer": 1
  }
],
};
