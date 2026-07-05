import type { Story } from "@/lib/types";

export const theRedUmbrella: Story = {
  slug: "the-red-umbrella",
  title: "The Red Umbrella",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "Mona finds a red umbrella on a rainy day. It changes her walk to school.",
  cover: "☂️",
  coverHue: "from-red-200 to-orange-300",
  minutes: 3,
  paragraphs: [
  "It was raining. Mona walked to school. She had no umbrella. Her hair was wet.",
  "Mona saw a red umbrella near a tree. No one was there. She looked left and right.",
  "\"Is this your umbrella?\" she said. No one answered. Mona took the umbrella.",
  "The umbrella was big and red. It kept her dry. She smiled and walked faster.",
  "At school, a boy said, \"That is my umbrella! I lost it here yesterday.\" Mona gave it back with a smile."
  ],
  vocab: {
  "umbrella": {
    "ar": "مظلة",
    "def": "A thing you use to stay dry in the rain.",
    "example": "She opened her umbrella in the rain."
  },
  "wet": {
    "ar": "مبلل",
    "def": "Covered with water.",
    "example": "My shoes are wet."
  },
  "lost": {
    "ar": "فقد / ضائع",
    "def": "Not able to find something.",
    "example": "He lost his keys."
  },
  "dry": {
    "ar": "جاف",
    "def": "Not wet.",
    "example": "The towel is dry now."
  },
  "smiled": {
    "ar": "ابتسم",
    "def": "Made a happy face.",
    "example": "She smiled at her friend."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A boy who loses his bag",
      "A girl who finds an umbrella",
      "A rainy school trip",
      "A red bicycle"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Where did Mona find the umbrella?",
    "choices": [
      "In her house",
      "Near a tree",
      "At school",
      "In a shop"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who owned the umbrella?",
    "choices": [
      "Mona",
      "A teacher",
      "A boy",
      "No one"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Wet\" means…",
    "choices": [
      "dry",
      "covered with water",
      "cold",
      "broken"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Smiled\" means she…",
    "choices": [
      "cried",
      "made a happy face",
      "ran fast",
      "fell down"
    ],
    "answer": 1
  }
],
};
