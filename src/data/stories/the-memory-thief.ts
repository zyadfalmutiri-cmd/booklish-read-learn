import type { Story } from "@/lib/types";

export const theMemoryThief: Story = {
  slug: "the-memory-thief",
  title: "The Memory Thief",
  genre: "sci-fi",
  level: "intermediate",
  cefr: "B2",
  blurb: "In a near-future world where memories can be extracted and sold, a technician confronts the ethics of her profession.",
  cover: "🧠",
  coverHue: "from-violet-200 to-purple-300",
  minutes: 6,
  paragraphs: [
  "In the city of Neovara, memory extraction technology had become common, allowing people to relive treasured moments or, more controversially, sell unwanted memories for profit.",
  "Zahra worked as a technician at a memory clinic, extracting painful memories from clients desperate to forget trauma, grief, or heartbreak.",
  "She had always believed her work was purely beneficial, until a client named Farid arrived wanting to erase memories of his deceased daughter, insisting the grief had become unbearable.",
  "Something about the request unsettled Zahra deeply, though she could not immediately articulate why erasing pain should feel wrong.",
  "She hesitated, then gently suggested that perhaps grief, however painful, was inseparable from love, and that erasing one might quietly diminish the other.",
  "Farid ultimately chose to keep his memories intact, and Zahra found herself questioning, for the first time, whether some technologies solve problems by creating quieter, more insidious ones."
  ],
  vocab: {
  "extraction": {
    "ar": "استخلاص",
    "def": "The process of removing something.",
    "example": "The extraction process took several hours."
  },
  "controversially": {
    "ar": "بشكل مثير للجدل",
    "def": "In a way that causes public disagreement.",
    "example": "The policy was controversially introduced."
  },
  "trauma": {
    "ar": "صدمة نفسية",
    "def": "Deep emotional pain caused by a distressing event.",
    "example": "She struggled with childhood trauma."
  },
  "unsettled": {
    "ar": "أقلق / أزعج",
    "def": "Made someone feel uneasy or disturbed.",
    "example": "The strange news unsettled her."
  },
  "insidious": {
    "ar": "خبيث / خفي الضرر",
    "def": "Harmful in a gradual, hidden way.",
    "example": "The problem was insidious and hard to detect."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What ethical question does this story explore?",
    "choices": [
      "Whether technology should exist at all",
      "Whether erasing painful memories is truly beneficial",
      "How to build memory clinics",
      "The cost of new technology"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Farid want to erase?",
    "choices": [
      "A happy memory",
      "Memories of his deceased daughter",
      "His entire childhood",
      "A work failure"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Farid ultimately decide?",
    "choices": [
      "To erase the memories",
      "To keep the memories intact",
      "To sell the memories",
      "To extract more memories"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Insidious\" describes harm that is…",
    "choices": [
      "obvious and immediate",
      "gradual and hidden",
      "completely harmless",
      "publicly announced"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Trauma\" refers to deep…",
    "choices": [
      "happiness",
      "emotional pain from a distressing event",
      "physical strength",
      "financial loss"
    ],
    "answer": 1
  }
],
};
