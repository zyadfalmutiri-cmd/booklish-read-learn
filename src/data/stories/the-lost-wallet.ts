import type { Story } from "@/lib/types";

export const theLostWallet: Story = {
  slug: "the-lost-wallet",
  title: "The Lost Wallet",
  genre: "mystery",
  level: "beginner",
  cefr: "A2",
  blurb: "Basil finds a wallet on the street and must decide what to do.",
  cover: "👛",
  coverHue: "from-yellow-200 to-orange-300",
  minutes: 4,
  paragraphs: [
  "Walking home from work, Basil noticed a brown wallet lying on the sidewalk.",
  "He picked it up and opened it. Inside were some money, a photo, and an identity card.",
  "Basil thought about keeping the money, but he quickly felt guilty about the idea.",
  "He looked at the address on the identity card and decided to walk there instead of going home.",
  "An elderly woman opened the door. When she saw her wallet, her eyes filled with tears of relief.",
  "\"Thank you so much, young man. This means more to me than you know,\" she said, offering him a reward, which Basil politely refused."
  ],
  vocab: {
  "sidewalk": {
    "ar": "رصيف",
    "def": "The path beside a road for walking.",
    "example": "He walked along the sidewalk."
  },
  "identity card": {
    "ar": "بطاقة هوية",
    "def": "An official card showing who a person is.",
    "example": "She showed her identity card at the airport."
  },
  "guilty": {
    "ar": "مذنب",
    "def": "Feeling bad about doing something wrong.",
    "example": "He felt guilty for lying."
  },
  "elderly": {
    "ar": "مسنّ",
    "def": "Old, especially referring to a person.",
    "example": "An elderly man was sitting on the bench."
  },
  "relief": {
    "ar": "ارتياح",
    "def": "A feeling of comfort after worry ends.",
    "example": "She sighed with relief."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A stolen wallet",
      "Returning a lost wallet",
      "Losing money",
      "A police investigation"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Basil find inside the wallet?",
    "choices": [
      "Only money",
      "Money, a photo, and an ID card",
      "Keys",
      "Nothing"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Basil do with the reward?",
    "choices": [
      "He kept it",
      "He politely refused it",
      "He asked for more",
      "He gave it to a stranger"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Guilty\" means feeling bad about…",
    "choices": [
      "something good you did",
      "doing something wrong",
      "being tired",
      "being hungry"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Relief\" is the feeling of…",
    "choices": [
      "fear",
      "comfort after worry ends",
      "anger",
      "excitement"
    ],
    "answer": 1
  }
],
};
