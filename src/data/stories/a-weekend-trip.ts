import type { Story } from "@/lib/types";

export const aWeekendTrip: Story = {
  slug: "a-weekend-trip",
  title: "A Weekend Trip",
  genre: "adventure",
  level: "beginner",
  cefr: "A2",
  blurb: "Three friends plan a simple weekend trip that turns into a small adventure.",
  cover: "🚗",
  coverHue: "from-teal-200 to-cyan-300",
  minutes: 4,
  paragraphs: [
  "Hassan and his two friends planned a weekend trip to the mountains. They wanted a break from the city.",
  "They packed their bags, some food, and a map, and left early on Saturday morning.",
  "On the way, their car had a flat tire in the middle of nowhere. No one knew how to fix it.",
  "A farmer passing by stopped to help them. In twenty minutes, the tire was fixed, and they thanked him warmly.",
  "They finally reached the mountains and set up a small tent near a river. The view was worth every problem.",
  "That night, they sat around a fire, laughing about the flat tire. It became their favorite story from the trip."
  ],
  vocab: {
  "planned": {
    "ar": "خطط",
    "def": "Decided details in advance.",
    "example": "They planned a party for weeks."
  },
  "flat tire": {
    "ar": "إطار مثقوب",
    "def": "A tire with no air, usually from damage.",
    "example": "The car had a flat tire on the road."
  },
  "farmer": {
    "ar": "مزارع",
    "def": "A person who works on a farm.",
    "example": "The farmer grows wheat and corn."
  },
  "warmly": {
    "ar": "بحرارة/ودّ",
    "def": "In a friendly, sincere way.",
    "example": "They greeted him warmly."
  },
  "worth": {
    "ar": "يستحق",
    "def": "Deserving of something because of its value.",
    "example": "The trip was worth the effort."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A business trip",
      "A weekend adventure with friends",
      "A car accident",
      "A camping competition"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What problem did they have on the way?",
    "choices": [
      "They got lost",
      "A flat tire",
      "Bad weather",
      "They ran out of food"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who helped them fix the problem?",
    "choices": [
      "A police officer",
      "A farmer",
      "A mechanic",
      "No one"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Worth\" means deserving of something because of its…",
    "choices": [
      "price",
      "value",
      "color",
      "size"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Warmly\" describes a greeting that is…",
    "choices": [
      "cold and distant",
      "friendly and sincere",
      "angry",
      "silent"
    ],
    "answer": 1
  }
],
};
