import type { Story } from "@/lib/types";

export const aSecondChance: Story = {
  slug: "a-second-chance",
  title: "A Second Chance",
  genre: "romance",
  level: "intermediate",
  cefr: "B1",
  blurb: "Years after a painful breakup, Amir and Lubna meet again and must decide whether the past deserves a second chance.",
  cover: "💞",
  coverHue: "from-rose-200 to-red-300",
  minutes: 5,
  paragraphs: [
  "Amir and Lubna had dated for three years in university before a misunderstanding ended their relationship painfully.",
  "Five years later, they unexpectedly ran into each other at a mutual friend's wedding, both older and, in some ways, wiser.",
  "At first, the conversation was awkward, full of careful small talk about jobs and mutual friends.",
  "As the evening continued, they found themselves talking honestly about what had actually gone wrong between them years earlier.",
  "Amir admitted he had never fully explained his side of the story, and Lubna confessed she had always wondered what might have been.",
  "They exchanged phone numbers that night, both nervous but hopeful, unsure of what would happen next, yet willing to find out together."
  ],
  vocab: {
  "mutual": {
    "ar": "مشترك",
    "def": "Shared by two or more people.",
    "example": "They have a mutual friend."
  },
  "awkward": {
    "ar": "محرج / غير مريح",
    "def": "Causing embarrassment or discomfort.",
    "example": "The silence felt awkward."
  },
  "confessed": {
    "ar": "اعترف",
    "def": "Admitted something, often something personal.",
    "example": "She confessed she had made a mistake."
  },
  "exchanged": {
    "ar": "تبادلا",
    "def": "Gave and received something with someone else.",
    "example": "They exchanged gifts."
  },
  "hopeful": {
    "ar": "متفائل",
    "def": "Feeling positive about the future.",
    "example": "He felt hopeful about the interview."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "Planning a wedding",
      "Rekindling a past relationship",
      "Meeting a new friend",
      "Starting university"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Where did Amir and Lubna meet again?",
    "choices": [
      "At work",
      "At a mutual friend's wedding",
      "At university",
      "By accident on the street"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did they do by the end of the night?",
    "choices": [
      "They avoided each other",
      "They exchanged phone numbers",
      "They argued again",
      "They left without speaking"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Confessed\" means…",
    "choices": [
      "denied something",
      "admitted something personal",
      "forgot something",
      "hid something"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Mutual\" describes something…",
    "choices": [
      "shared by two or more people",
      "owned by one person",
      "very old",
      "very expensive"
    ],
    "answer": 0
  }
],
};
