import type { Story } from "@/lib/types";

export const anUnexpectedInheritance: Story = {
  slug: "an-unexpected-inheritance",
  title: "An Unexpected Inheritance",
  genre: "mystery",
  level: "intermediate",
  cefr: "B2",
  blurb: "A modest teacher inherits a mysterious estate from a relative she never knew, uncovering secrets about her family's past.",
  cover: "🏚️",
  coverHue: "from-amber-200 to-yellow-300",
  minutes: 6,
  paragraphs: [
  "Salma received a letter informing her that a distant great-uncle she had never met had left her his entire estate, including an old house in a remote village.",
  "Curious and slightly suspicious, she traveled to the village, expecting to find a small, unremarkable cottage.",
  "Instead, she discovered a house filled with old letters, photographs, and journals documenting decades of a family history she knew almost nothing about.",
  "Among the papers was a journal revealing that her great-uncle had secretly supported her grandmother financially for years after a family rift none of the living relatives fully understood.",
  "Piecing together fragments of old letters, Salma slowly reconstructed a story of estrangement, quiet regret, and a love for family that had never been openly expressed.",
  "She decided to preserve the house rather than sell it, feeling that she had inherited not just property, but a responsibility to remember a man who had loved his family from a painful distance."
  ],
  vocab: {
  "estate": {
    "ar": "تركة / ملكية",
    "def": "Property and money left by someone after death.",
    "example": "He inherited a large estate."
  },
  "remote": {
    "ar": "نائي",
    "def": "Far away from other places; isolated.",
    "example": "They lived in a remote village."
  },
  "rift": {
    "ar": "خلاف / شقاق",
    "def": "A serious disagreement that separates people.",
    "example": "A family rift kept them apart for years."
  },
  "estrangement": {
    "ar": "تباعد / قطيعة",
    "def": "A state of being separated or distant from someone, often emotionally.",
    "example": "Years of estrangement had passed between them."
  },
  "preserve": {
    "ar": "يحافظ على",
    "def": "To keep something safe or unchanged.",
    "example": "She wanted to preserve the old house."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central theme of this story?",
    "choices": [
      "Selling an old house",
      "Uncovering hidden family history through an inheritance",
      "A legal dispute over money",
      "Renovating a village home"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Salma discover in the house?",
    "choices": [
      "Hidden treasure",
      "Old letters, photographs, and journals",
      "Nothing of value",
      "A second will"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Salma decide to do with the house?",
    "choices": [
      "Sell it immediately",
      "Preserve it",
      "Demolish it",
      "Rent it out"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Estrangement\" describes a state of being…",
    "choices": [
      "close and connected",
      "separated, often emotionally",
      "wealthy",
      "famous"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Rift\" means a serious…",
    "choices": [
      "celebration",
      "disagreement that separates people",
      "achievement",
      "journey"
    ],
    "answer": 1
  }
],
};
