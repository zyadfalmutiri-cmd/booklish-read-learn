import type { Story } from "@/lib/types";

export const myMorningCoffee: Story = {
  slug: "my-morning-coffee",
  title: "My Morning Coffee",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "A simple story about Ahmed's morning routine and one small change.",
  cover: "☕",
  coverHue: "from-amber-200 to-yellow-300",
  minutes: 3,
  paragraphs: [
  "Every morning, Ahmed makes coffee. He wakes up at seven o'clock. He goes to the kitchen.",
  "He puts water in the kettle. He waits for the water to boil. He likes his coffee hot.",
  "Today, there was no coffee at home. Ahmed looked in every cupboard. There was nothing.",
  "He walked to the small shop near his house. The shop owner smiled and said, \"Good morning!\"",
  "Ahmed bought coffee and walked home. He made his coffee. It tasted very good that day."
  ],
  vocab: {
  "kettle": {
    "ar": "غلاية",
    "def": "A pot used to boil water.",
    "example": "The kettle is very hot."
  },
  "boil": {
    "ar": "يغلي",
    "def": "To heat water until it bubbles.",
    "example": "Water boils at 100 degrees."
  },
  "cupboard": {
    "ar": "خزانة",
    "def": "A small closet for food or dishes.",
    "example": "The cups are in the cupboard."
  },
  "owner": {
    "ar": "صاحب المحل",
    "def": "A person who owns a business.",
    "example": "The shop owner is very kind."
  },
  "tasted": {
    "ar": "تذوق طعمه",
    "def": "Had a certain flavor.",
    "example": "The soup tasted delicious."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A broken kettle",
      "Ahmed's coffee morning",
      "A trip to the market",
      "A new job"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Ahmed do first?",
    "choices": [
      "Walked to the shop",
      "Made coffee at home",
      "Woke up at seven",
      "Bought a kettle"
    ],
    "answer": 2
  },
  {
    "kind": "event",
    "q": "Why did Ahmed go to the shop?",
    "choices": [
      "To buy bread",
      "There was no coffee at home",
      "To meet a friend",
      "To buy a kettle"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Boil\" means…",
    "choices": [
      "to freeze",
      "to heat until bubbling",
      "to cut",
      "to clean"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "A \"cupboard\" is used to…",
    "choices": [
      "cook food",
      "store things",
      "wash dishes",
      "drink water"
    ],
    "answer": 1
  }
],
};
