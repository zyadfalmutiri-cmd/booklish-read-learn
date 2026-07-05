import type { Story } from "@/lib/types";

export const theCookingClass: Story = {
  slug: "the-cooking-class",
  title: "The Cooking Class",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "Yara joins a cooking class to meet new people and discovers a hidden talent.",
  cover: "👩‍🍳",
  coverHue: "from-orange-200 to-amber-300",
  minutes: 4,
  paragraphs: [
  "Yara signed up for a cooking class after work. She wanted to meet new people in her city.",
  "On the first day, everyone had to make a simple pasta dish. Yara had never cooked before.",
  "Her pasta was a little burnt, and everyone laughed kindly, including Yara herself.",
  "The teacher, Chef Malik, said, \"Everyone starts somewhere. Keep practicing and you will improve.\"",
  "Yara practiced at home every week. Her family noticed that her cooking was getting much better.",
  "After three months, Yara made a full dinner for her family. They said it was the best meal she had ever cooked."
  ],
  vocab: {
  "signed up": {
    "ar": "سجّل / اشترك",
    "def": "Agreed to join something officially.",
    "example": "She signed up for a dance class."
  },
  "burnt": {
    "ar": "محروق",
    "def": "Damaged by too much heat.",
    "example": "The toast was burnt."
  },
  "kindly": {
    "ar": "بلطف",
    "def": "In a friendly, gentle way.",
    "example": "He spoke kindly to the child."
  },
  "practicing": {
    "ar": "يتمرن",
    "def": "Doing something repeatedly to improve.",
    "example": "She is practicing the piano."
  },
  "improve": {
    "ar": "يتحسن",
    "def": "To become better.",
    "example": "His English improved a lot."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A restaurant opening",
      "Learning to cook",
      "A family dinner",
      "A cooking competition"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What happened to Yara's first pasta dish?",
    "choices": [
      "It was perfect",
      "It was a little burnt",
      "She did not finish it",
      "She threw it away"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Yara do after the first class?",
    "choices": [
      "She quit cooking",
      "She practiced at home",
      "She became a chef",
      "She stopped eating pasta"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Improve\" means to…",
    "choices": [
      "become worse",
      "become better",
      "stay the same",
      "stop completely"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Burnt\" describes food that is…",
    "choices": [
      "undercooked",
      "damaged by too much heat",
      "very cold",
      "too salty"
    ],
    "answer": 1
  }
],
};
