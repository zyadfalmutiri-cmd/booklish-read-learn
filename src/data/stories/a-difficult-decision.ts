import type { Story } from "@/lib/types";

export const aDifficultDecision: Story = {
  slug: "a-difficult-decision",
  title: "A Difficult Decision",
  genre: "drama",
  level: "intermediate",
  cefr: "B1",
  blurb: "Waleed must choose between a stable job and a risky opportunity that could change his life.",
  cover: "⚖️",
  coverHue: "from-slate-200 to-zinc-300",
  minutes: 5,
  paragraphs: [
  "Waleed had worked at the same company for eight years. The job was stable, but he no longer felt challenged or excited about it.",
  "One day, a former colleague offered him a position at a small startup, with less security but far more creative freedom.",
  "His wife supported whatever he decided, but his parents worried about the risk of leaving a secure job.",
  "Waleed spent weeks weighing the pros and cons, unable to sleep properly, torn between comfort and ambition.",
  "Eventually, he asked himself a simple question: \"In ten years, which decision would I regret more?\"",
  "The answer became clear. Waleed accepted the startup position, choosing growth over comfort, even though the outcome was uncertain."
  ],
  vocab: {
  "stable": {
    "ar": "مستقر",
    "def": "Not likely to change suddenly; secure.",
    "example": "He has a stable job with a good salary."
  },
  "challenged": {
    "ar": "يشعر بالتحدي",
    "def": "Feeling that your abilities are being tested in a positive way.",
    "example": "She felt challenged by the new project."
  },
  "colleague": {
    "ar": "زميل عمل",
    "def": "A person you work with.",
    "example": "My colleague helped me finish the report."
  },
  "weighing": {
    "ar": "يوازن بين",
    "def": "Carefully considering different options.",
    "example": "He was weighing his options carefully."
  },
  "regret": {
    "ar": "يندم",
    "def": "To feel sorry about a past decision.",
    "example": "She did not want to regret her choice."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "Starting a business",
      "Choosing between security and growth",
      "Losing a job",
      "Moving to a new city"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What offer did Waleed receive?",
    "choices": [
      "A promotion at his current job",
      "A position at a startup",
      "A job abroad",
      "A scholarship"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What question helped Waleed decide?",
    "choices": [
      "What would his parents want?",
      "Which decision would he regret more?",
      "How much money could he earn?",
      "What did his friends think?"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Stable\" describes something that is…",
    "choices": [
      "changing constantly",
      "secure and unlikely to change",
      "exciting",
      "temporary"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Regret\" means to feel sorry about…",
    "choices": [
      "a future plan",
      "a past decision",
      "someone else's mistake",
      "a gift"
    ],
    "answer": 1
  }
],
};
