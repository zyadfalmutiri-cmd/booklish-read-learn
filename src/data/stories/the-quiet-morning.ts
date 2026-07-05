import type { Story } from "@/lib/types";

export const theQuietMorning: Story = {
  slug: "the-quiet-morning",
  title: "The Quiet Morning",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "Nadia enjoys a peaceful morning before her busy day begins.",
  cover: "🌅",
  coverHue: "from-rose-200 to-pink-300",
  minutes: 3,
  paragraphs: [
  "Nadia wakes up early, before the sun rises. The house is quiet and calm.",
  "She opens the window. The air is cool and fresh. Birds are just starting to sing.",
  "She makes a cup of tea and sits by the window. She watches the sky slowly change color.",
  "For a few minutes, Nadia thinks about nothing. She just enjoys the silence and the tea.",
  "Then her phone rings, and the busy day begins. But Nadia smiles, feeling calm and ready."
  ],
  vocab: {
  "rises": {
    "ar": "يشرق / يرتفع",
    "def": "Goes up.",
    "example": "The sun rises in the east."
  },
  "calm": {
    "ar": "هادئ",
    "def": "Peaceful, not worried.",
    "example": "The lake was calm."
  },
  "cool": {
    "ar": "بارد قليلاً",
    "def": "Slightly cold.",
    "example": "The morning air is cool."
  },
  "silence": {
    "ar": "صمت",
    "def": "Complete quiet.",
    "example": "She enjoyed the silence of the forest."
  },
  "ready": {
    "ar": "جاهز",
    "def": "Prepared for something.",
    "example": "Are you ready to go?"
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A busy office",
      "A peaceful morning",
      "A rainy day",
      "A school exam"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What does Nadia drink?",
    "choices": [
      "Coffee",
      "Tea",
      "Juice",
      "Water"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What happens at the end?",
    "choices": [
      "She goes back to sleep",
      "Her phone rings",
      "It starts raining",
      "She leaves the house"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Silence\" means…",
    "choices": [
      "loud noise",
      "complete quiet",
      "music",
      "talking"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Calm\" means…",
    "choices": [
      "angry",
      "peaceful",
      "tired",
      "hungry"
    ],
    "answer": 1
  }
],
};
