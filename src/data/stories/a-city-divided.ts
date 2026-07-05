import type { Story } from "@/lib/types";

export const aCityDivided: Story = {
  slug: "a-city-divided",
  title: "A City Divided",
  genre: "drama",
  level: "intermediate",
  cefr: "B2",
  blurb: "A proposed development project exposes deep class divisions within a rapidly changing city neighborhood.",
  cover: "🏙️",
  coverHue: "from-gray-200 to-slate-300",
  minutes: 6,
  paragraphs: [
  "When a large development company announced plans to build luxury apartments in place of an aging but beloved neighborhood market, the community fractured into fiercely opposing camps.",
  "Longtime residents argued that the market was the cultural heart of the neighborhood, providing affordable goods and a sense of shared identity that no shopping center could replace.",
  "Younger residents and some local shop owners countered that the development would bring much-needed investment, jobs, and modernized infrastructure to a neglected area.",
  "Public meetings grew increasingly tense, with accusations of greed on one side and accusations of stubborn nostalgia on the other.",
  "An elderly shopkeeper named Abu Nasser, who had run his stall for forty years, became an unlikely spokesperson for the resistance, his weathered voice carrying unexpected authority at city council meetings.",
  "After months of heated debate, a compromise was reached: a smaller development that preserved part of the market, satisfying no one entirely but allowing the divided community to begin, slowly, to heal."
  ],
  vocab: {
  "fractured": {
    "ar": "تصدّع / انقسم",
    "def": "Broke into separate parts, often due to conflict.",
    "example": "The community fractured over the decision."
  },
  "affordable": {
    "ar": "ميسور التكلفة",
    "def": "Reasonably priced; not too expensive.",
    "example": "They needed affordable housing."
  },
  "infrastructure": {
    "ar": "بنية تحتية",
    "def": "The basic physical systems of a place, like roads and utilities.",
    "example": "The city invested in new infrastructure."
  },
  "nostalgia": {
    "ar": "حنين",
    "def": "A sentimental longing for the past.",
    "example": "He felt nostalgia for his childhood home."
  },
  "compromise": {
    "ar": "حل وسط / تسوية",
    "def": "An agreement reached by each side giving up something.",
    "example": "They finally reached a compromise."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central conflict in this story?",
    "choices": [
      "A dispute between two families",
      "Development versus preserving community identity",
      "A political election",
      "A crime investigation"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who became an unexpected leader of the resistance?",
    "choices": [
      "A city council member",
      "Abu Nasser, an elderly shopkeeper",
      "A young activist",
      "A journalist"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How was the conflict ultimately resolved?",
    "choices": [
      "The development was completely canceled",
      "A full luxury development was built",
      "A compromise preserved part of the market",
      "The community never agreed"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Nostalgia\" is a sentimental longing for…",
    "choices": [
      "the future",
      "the past",
      "money",
      "fame"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Compromise\" means an agreement where…",
    "choices": [
      "one side wins completely",
      "each side gives up something",
      "nothing changes",
      "a lawsuit is filed"
    ],
    "answer": 1
  }
],
};
