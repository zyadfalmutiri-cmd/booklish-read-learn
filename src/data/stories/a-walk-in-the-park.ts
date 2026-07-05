import type { Story } from "@/lib/types";

export const aWalkInThePark: Story = {
  slug: "a-walk-in-the-park",
  title: "A Walk in the Park",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "Yusuf takes a walk and notices small, beautiful things around him.",
  cover: "🌳",
  coverHue: "from-green-200 to-emerald-300",
  minutes: 3,
  paragraphs: [
  "Yusuf likes to walk in the park after work. The park is near his house.",
  "Today, the sky was blue. Birds were singing in the trees. Children were playing near the lake.",
  "Yusuf sat on a bench. He watched the ducks swim in the water. It was very peaceful.",
  "An old man sat next to him. \"Beautiful day, isn't it?\" the man said. Yusuf agreed.",
  "They talked for a while about the weather and the birds. Yusuf felt happy and relaxed."
  ],
  vocab: {
  "bench": {
    "ar": "مقعد حديقة",
    "def": "A long seat for two or more people.",
    "example": "They sat on a bench in the park."
  },
  "ducks": {
    "ar": "بط",
    "def": "Water birds that swim.",
    "example": "The ducks are swimming in the lake."
  },
  "peaceful": {
    "ar": "هادئ",
    "def": "Calm and quiet.",
    "example": "The village is very peaceful."
  },
  "agreed": {
    "ar": "وافق",
    "def": "Said yes to an idea.",
    "example": "She agreed with her friend."
  },
  "relaxed": {
    "ar": "مسترخي",
    "def": "Calm and free from stress.",
    "example": "He felt relaxed after the walk."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A busy work day",
      "A peaceful walk in the park",
      "A birthday party",
      "A rainy afternoon"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What was Yusuf watching?",
    "choices": [
      "Cars",
      "Ducks",
      "Airplanes",
      "Bicycles"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who sat next to Yusuf?",
    "choices": [
      "A child",
      "A teacher",
      "An old man",
      "A dog"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Peaceful\" means…",
    "choices": [
      "loud and busy",
      "calm and quiet",
      "fast",
      "cold"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Agreed\" means he…",
    "choices": [
      "said no",
      "said yes",
      "asked a question",
      "left quickly"
    ],
    "answer": 1
  }
],
};
