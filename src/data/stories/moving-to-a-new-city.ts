import type { Story } from "@/lib/types";

export const movingToANewCity: Story = {
  slug: "moving-to-a-new-city",
  title: "Moving to a New City",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "Dana's family moves for her father's job, and she must start over.",
  cover: "🚚",
  coverHue: "from-blue-200 to-cyan-300",
  minutes: 4,
  paragraphs: [
  "Dana's father got a new job in a city far from their home. The whole family had to move.",
  "Dana was sad to leave her friends and her old school. She did not want a new beginning.",
  "On the first day at her new school, Dana sat alone at lunch, feeling like an outsider.",
  "A boy named Omar sat next to her. \"You're new, right? I remember how hard that was for me,\" he said.",
  "They talked about music and games they both liked. Dana felt a little less alone.",
  "After a few weeks, Dana had new friends and a new favorite park. The new city started to feel like home."
  ],
  vocab: {
  "beginning": {
    "ar": "بداية",
    "def": "The start of something.",
    "example": "Every story has a beginning."
  },
  "outsider": {
    "ar": "غريب/دخيل",
    "def": "A person who does not belong to a group.",
    "example": "He felt like an outsider at first."
  },
  "remember": {
    "ar": "يتذكر",
    "def": "To keep something in your memory.",
    "example": "I remember my first day at school."
  },
  "alone": {
    "ar": "وحيد",
    "def": "Without other people.",
    "example": "She sat alone in the room."
  },
  "favorite": {
    "ar": "مفضل",
    "def": "Liked the most.",
    "example": "This is my favorite song."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A vacation",
      "Moving and starting over",
      "A school competition",
      "A lost pet"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why did Dana's family move?",
    "choices": [
      "For a vacation",
      "Her father's new job",
      "Bad weather",
      "To visit family"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who helped Dana feel less alone?",
    "choices": [
      "Her teacher",
      "Omar",
      "Her father",
      "A stranger"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "An \"outsider\" is someone who…",
    "choices": [
      "belongs to a group",
      "does not belong to a group",
      "is very popular",
      "is a teacher"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Remember\" means to…",
    "choices": [
      "forget something",
      "keep something in memory",
      "lose something",
      "break something"
    ],
    "answer": 1
  }
],
};
