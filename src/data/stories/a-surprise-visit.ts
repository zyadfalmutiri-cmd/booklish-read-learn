import type { Story } from "@/lib/types";

export const aSurpriseVisit: Story = {
  slug: "a-surprise-visit",
  title: "A Surprise Visit",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "Maha's brother returns from abroad without telling anyone.",
  cover: "🎉",
  coverHue: "from-fuchsia-200 to-pink-300",
  minutes: 4,
  paragraphs: [
  "Maha's older brother, Khalid, had been working abroad for two years. She missed him every day.",
  "One Friday evening, Maha was watching television alone at home while her parents were out.",
  "She heard a knock at the door. She was not expecting any visitors that evening.",
  "When she opened the door, she could not believe her eyes. It was Khalid, smiling with his suitcase.",
  "\"Surprise! I wanted to see your face when you opened the door,\" he said, laughing.",
  "Maha hugged him tightly and started crying happy tears. It was the best surprise of her life."
  ],
  vocab: {
  "abroad": {
    "ar": "في الخارج",
    "def": "In a foreign country.",
    "example": "She studied abroad for a year."
  },
  "knock": {
    "ar": "طرق الباب",
    "def": "The sound of hitting a door to get attention.",
    "example": "I heard a knock at the door."
  },
  "expecting": {
    "ar": "يتوقع",
    "def": "Thinking something will happen.",
    "example": "I was not expecting a call."
  },
  "suitcase": {
    "ar": "حقيبة سفر",
    "def": "A bag used for carrying clothes when traveling.",
    "example": "He packed his suitcase quickly."
  },
  "hugged": {
    "ar": "عانق",
    "def": "Put your arms around someone warmly.",
    "example": "She hugged her mother tightly."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A birthday party",
      "A surprise family reunion",
      "A trip abroad",
      "A phone call"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Where had Khalid been for two years?",
    "choices": [
      "At university",
      "Working abroad",
      "In the hospital",
      "On vacation"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Maha react when she saw Khalid?",
    "choices": [
      "She was angry",
      "She hugged him and cried happy tears",
      "She did not recognize him",
      "She fainted"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Abroad\" means…",
    "choices": [
      "at home",
      "in a foreign country",
      "at school",
      "in the city"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Expecting\" means…",
    "choices": [
      "forgetting something",
      "thinking something will happen",
      "refusing something",
      "hiding something"
    ],
    "answer": 1
  }
],
};
