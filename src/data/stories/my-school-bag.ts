import type { Story } from "@/lib/types";

export const mySchoolBag: Story = {
  slug: "my-school-bag",
  title: "My School Bag",
  genre: "non-fiction",
  level: "beginner",
  cefr: "A1",
  blurb: "A short reflection about what a school bag holds and what it means.",
  cover: "🎒",
  coverHue: "from-indigo-200 to-purple-300",
  minutes: 3,
  paragraphs: [
  "Every morning, I pack my school bag. I check my books, my pens, and my lunch box.",
  "My bag is blue with a picture of a star. My mother bought it for my birthday.",
  "Inside, I keep my favorite pencil case. It has all my colored pencils and a small eraser.",
  "Sometimes I forget something at home, like my water bottle. Then I feel thirsty at school.",
  "Now, I always check my bag twice before leaving the house. I never forget anything anymore."
  ],
  vocab: {
  "pack": {
    "ar": "يحزم",
    "def": "To put things into a bag.",
    "example": "She packs her bag every night."
  },
  "check": {
    "ar": "يتأكد من",
    "def": "To look at something to be sure.",
    "example": "He checked his homework."
  },
  "pencil case": {
    "ar": "مقلمة",
    "def": "A small bag or box for pens and pencils.",
    "example": "My pencil case is full of colors."
  },
  "eraser": {
    "ar": "ممحاة",
    "def": "A small object used to remove pencil marks.",
    "example": "I need an eraser."
  },
  "thirsty": {
    "ar": "عطشان",
    "def": "Needing to drink water.",
    "example": "I am very thirsty."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this text about?",
    "choices": [
      "A school trip",
      "Packing a school bag",
      "A birthday gift",
      "A lost pencil"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who bought the school bag?",
    "choices": [
      "The writer's father",
      "The writer's mother",
      "A teacher",
      "A friend"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did the writer sometimes forget?",
    "choices": [
      "Books",
      "A water bottle",
      "Pens",
      "Shoes"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Thirsty\" means needing to…",
    "choices": [
      "eat",
      "sleep",
      "drink water",
      "run"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "An \"eraser\" is used to…",
    "choices": [
      "write words",
      "remove pencil marks",
      "cut paper",
      "draw lines"
    ],
    "answer": 1
  }
],
};
