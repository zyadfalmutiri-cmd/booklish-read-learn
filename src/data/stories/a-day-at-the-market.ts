import type { Story } from "@/lib/types";

export const aDayAtTheMarket: Story = {
  slug: "a-day-at-the-market",
  title: "A Day at the Market",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "Huda goes shopping with her father and learns about fruits and prices.",
  cover: "🍎",
  coverHue: "from-lime-200 to-green-300",
  minutes: 3,
  paragraphs: [
  "Every Saturday, Huda goes to the market with her father. She loves the colors and smells.",
  "They walked past stalls of fruit, vegetables, and fresh bread. Huda's favorite was the fruit stall.",
  "\"Can we buy some apples?\" Huda asked. Her father smiled and said, \"Of course, choose the best ones.\"",
  "Huda picked five red apples. The seller weighed them and told her father the price.",
  "On the way home, Huda ate an apple. \"This was a perfect day,\" she said happily."
  ],
  vocab: {
  "stalls": {
    "ar": "أكشاك",
    "def": "Small shops or tables selling goods.",
    "example": "There are many stalls at the market."
  },
  "fresh": {
    "ar": "طازج",
    "def": "New and not old.",
    "example": "The bread is fresh today."
  },
  "weighed": {
    "ar": "وزن",
    "def": "Measured how heavy something is.",
    "example": "The seller weighed the apples."
  },
  "price": {
    "ar": "سعر",
    "def": "The amount of money something costs.",
    "example": "What is the price of this shirt?"
  },
  "perfect": {
    "ar": "مثالي",
    "def": "Completely good; without problems.",
    "example": "It was a perfect day."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A school trip",
      "A day shopping at the market",
      "A cooking class",
      "A birthday party"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Huda buy?",
    "choices": [
      "Bread",
      "Apples",
      "Vegetables",
      "Flowers"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who weighed the apples?",
    "choices": [
      "Huda",
      "Her father",
      "The seller",
      "No one"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Fresh\" means…",
    "choices": [
      "old",
      "new, not old",
      "expensive",
      "heavy"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "A \"stall\" is a…",
    "choices": [
      "big building",
      "small shop or table",
      "car",
      "school"
    ],
    "answer": 1
  }
],
};
