import type { Story } from "@/lib/types";

export const aLetterToMom: Story = {
  slug: "a-letter-to-mom",
  title: "A Letter to Mom",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "While studying abroad, Rania writes a letter expressing feelings she never said out loud.",
  cover: "✉️",
  coverHue: "from-pink-200 to-fuchsia-300",
  minutes: 4,
  paragraphs: [
  "Rania had been studying in another country for three months. She missed her mother very much.",
  "One evening, instead of calling, she decided to write a letter. She wanted to say things she found hard to say on the phone.",
  "She wrote about her new friends, her difficult classes, and how the food was different from home.",
  "Then she wrote something she had never said before: \"Thank you for always believing in me, even when I doubted myself.\"",
  "She sent the letter and waited nervously for a reply.",
  "A week later, a letter arrived from her mother. It simply said, \"I am so proud of you. Come home safe.\" Rania cried happy tears."
  ],
  vocab: {
  "missed": {
    "ar": "اشتاق",
    "def": "Felt sad because someone was not there.",
    "example": "He missed his family a lot."
  },
  "instead": {
    "ar": "بدلاً من ذلك",
    "def": "In place of something else.",
    "example": "She walked instead of driving."
  },
  "doubted": {
    "ar": "شكّ",
    "def": "Was not sure or confident about something.",
    "example": "He doubted his own decision."
  },
  "nervously": {
    "ar": "بتوتر",
    "def": "In a worried, anxious way.",
    "example": "She waited nervously for the results."
  },
  "reply": {
    "ar": "رد",
    "def": "An answer to a message.",
    "example": "I am waiting for your reply."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A vacation",
      "A letter expressing gratitude",
      "A lost letter",
      "A school exam"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why did Rania write a letter instead of calling?",
    "choices": [
      "Her phone was broken",
      "She wanted to say hard things",
      "Her mother asked her to",
      "It was cheaper"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Rania's mother respond?",
    "choices": [
      "She did not reply",
      "She called immediately",
      "She sent a warm letter back",
      "She visited her"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Doubted\" means…",
    "choices": [
      "was very sure",
      "was not confident about something",
      "was happy",
      "was angry"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Nervously\" describes feeling…",
    "choices": [
      "calm",
      "worried",
      "excited",
      "tired"
    ],
    "answer": 1
  }
],
};
