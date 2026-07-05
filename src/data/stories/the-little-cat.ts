import type { Story } from "@/lib/types";

export const theLittleCat: Story = {
  slug: "the-little-cat",
  title: "The Little Cat",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "A small cat visits Salem's garden every day until something changes.",
  cover: "🐱",
  coverHue: "from-yellow-200 to-amber-300",
  minutes: 3,
  paragraphs: [
  "A small orange cat comes to Salem's garden every morning. Salem gives it milk.",
  "The cat is not scared of Salem anymore. It sits near his feet and looks at him.",
  "One day, the cat did not come. Salem waited and waited, but the garden was empty.",
  "He looked for the cat in the street. He found it stuck under a car, meowing loudly.",
  "Salem carefully helped the cat. From that day, the little cat lives happily with him."
  ],
  vocab: {
  "scared": {
    "ar": "خائف",
    "def": "Feeling afraid.",
    "example": "The dog was scared of the storm."
  },
  "empty": {
    "ar": "فارغ",
    "def": "With nothing inside.",
    "example": "The box was empty."
  },
  "stuck": {
    "ar": "عالق",
    "def": "Not able to move.",
    "example": "The car was stuck in the mud."
  },
  "meowing": {
    "ar": "يموء",
    "def": "The sound a cat makes.",
    "example": "The cat was meowing loudly."
  },
  "carefully": {
    "ar": "بحذر",
    "def": "In a careful, gentle way.",
    "example": "She carefully carried the glass."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A lost dog",
      "A cat that needs help",
      "A garden competition",
      "A new pet shop"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Salem give the cat every morning?",
    "choices": [
      "Bread",
      "Milk",
      "Water",
      "Fish"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Where did Salem find the cat?",
    "choices": [
      "In the garden",
      "Under a car",
      "At school",
      "In his house"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Stuck\" means…",
    "choices": [
      "moving fast",
      "not able to move",
      "very happy",
      "sleeping"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Empty\" means…",
    "choices": [
      "full",
      "with nothing inside",
      "broken",
      "expensive"
    ],
    "answer": 1
  }
],
};
