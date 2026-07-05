import type { Story } from "@/lib/types";

export const changingCareers: Story = {
  slug: "changing-careers",
  title: "Changing Careers",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B1",
  blurb: "At forty, Mansour decides to leave engineering behind to pursue a career in teaching.",
  cover: "🎓",
  coverHue: "from-indigo-200 to-blue-300",
  minutes: 5,
  paragraphs: [
  "Mansour had worked as an engineer for fifteen years. The salary was good, but he no longer felt any passion for his daily work.",
  "He had always enjoyed explaining difficult concepts to his younger cousins, and secretly wondered if teaching might suit him better.",
  "At forty years old, changing careers seemed like a frightening and impractical idea to most people around him.",
  "Despite the doubts of some friends, Mansour enrolled in a teaching certification program while still working part-time.",
  "The first year as a new teacher was exhausting, with long hours of lesson planning and a much smaller salary than before.",
  "Yet Mansour felt more energized than he had in years. He often said that trading comfort for purpose was the best decision of his life."
  ],
  vocab: {
  "passion": {
    "ar": "شغف",
    "def": "A strong feeling of enthusiasm for something.",
    "example": "She has a passion for music."
  },
  "suit": {
    "ar": "يناسب",
    "def": "To be appropriate or right for someone.",
    "example": "This job suits her skills well."
  },
  "impractical": {
    "ar": "غير عملي",
    "def": "Not sensible or realistic.",
    "example": "The plan seemed impractical at first."
  },
  "enrolled": {
    "ar": "سجّل / التحق",
    "def": "Officially joined a course or program.",
    "example": "He enrolled in a new course."
  },
  "purpose": {
    "ar": "هدف / غاية",
    "def": "A meaningful reason for doing something.",
    "example": "She found purpose in helping others."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "The stress of engineering",
      "Choosing purpose over comfort",
      "Learning a new language",
      "Retiring early"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Mansour enjoy before changing careers?",
    "choices": [
      "Explaining concepts to his cousins",
      "Traveling abroad",
      "Managing a team",
      "Writing books"
    ],
    "answer": 0
  },
  {
    "kind": "event",
    "q": "What was difficult about his first year of teaching?",
    "choices": [
      "He had too much free time",
      "Long hours and a smaller salary",
      "He disliked his students",
      "He had no support"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Passion\" means a strong feeling of…",
    "choices": [
      "boredom",
      "enthusiasm",
      "fear",
      "confusion"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Impractical\" describes an idea that is not…",
    "choices": [
      "expensive",
      "sensible or realistic",
      "popular",
      "new"
    ],
    "answer": 1
  }
],
};
