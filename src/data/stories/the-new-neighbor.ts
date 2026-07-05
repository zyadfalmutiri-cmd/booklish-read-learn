import type { Story } from "@/lib/types";

export const theNewNeighbor: Story = {
  slug: "the-new-neighbor",
  title: "The New Neighbor",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "A short story about meeting someone new next door.",
  cover: "🏠",
  coverHue: "from-sky-200 to-blue-300",
  minutes: 3,
  paragraphs: [
  "A new family moved into the house next to Fatima's. She saw boxes everywhere.",
  "Fatima's mother made some food. \"Let's welcome them,\" she said. They walked to the new house.",
  "A girl opened the door. \"Hello, I'm Noor,\" she said shyly. Fatima smiled at her.",
  "\"I'm Fatima. Do you want to play outside?\" Noor's face became happy. \"Yes, please!\"",
  "They played together all afternoon. By evening, they were already good friends."
  ],
  vocab: {
  "moved": {
    "ar": "انتقل",
    "def": "Changed the place where you live.",
    "example": "They moved to a new city."
  },
  "boxes": {
    "ar": "صناديق",
    "def": "Containers used to carry things.",
    "example": "There are many boxes in the truck."
  },
  "welcome": {
    "ar": "يرحب",
    "def": "To greet someone kindly.",
    "example": "They welcomed the new student."
  },
  "shyly": {
    "ar": "بخجل",
    "def": "In a nervous or quiet way.",
    "example": "He answered shyly."
  },
  "afternoon": {
    "ar": "بعد الظهر",
    "def": "The time between noon and evening.",
    "example": "We played in the afternoon."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the story about?",
    "choices": [
      "Moving furniture",
      "Meeting a new neighbor",
      "A school trip",
      "Losing a toy"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who moved next door?",
    "choices": [
      "Fatima's family",
      "A new family",
      "A teacher",
      "No one"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Fatima's mother make?",
    "choices": [
      "A cake",
      "Some food",
      "A box",
      "A gift"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Shyly\" describes someone who is…",
    "choices": [
      "loud",
      "nervous or quiet",
      "angry",
      "tired"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Welcome\" means to…",
    "choices": [
      "ignore someone",
      "greet someone kindly",
      "leave someone",
      "scold someone"
    ],
    "answer": 1
  }
],
};
