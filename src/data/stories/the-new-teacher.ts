import type { Story } from "@/lib/types";

export const theNewTeacher: Story = {
  slug: "the-new-teacher",
  title: "The New Teacher",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "A new teacher changes how Adam feels about school.",
  cover: "📚",
  coverHue: "from-purple-200 to-violet-300",
  minutes: 4,
  paragraphs: [
  "Adam did not like school very much, especially math class. He found it boring and difficult.",
  "At the start of the new term, a new teacher, Mr. Faisal, arrived to teach math.",
  "Instead of only writing on the board, Mr. Faisal used games and real-life examples to explain numbers.",
  "Adam started to understand ideas he had never understood before. Math started to make sense.",
  "He began raising his hand in class, something he had never done before that year.",
  "By the end of the term, math had become Adam's favorite subject, all because of one teacher who cared."
  ],
  vocab: {
  "boring": {
    "ar": "ممل",
    "def": "Not interesting.",
    "example": "The movie was boring."
  },
  "term": {
    "ar": "فصل دراسي",
    "def": "A period of study in a school year.",
    "example": "The new term starts in September."
  },
  "examples": {
    "ar": "أمثلة",
    "def": "Things used to show or explain an idea.",
    "example": "The teacher gave three examples."
  },
  "understand": {
    "ar": "يفهم",
    "def": "To know the meaning of something.",
    "example": "I understand the lesson now."
  },
  "subject": {
    "ar": "مادة دراسية",
    "def": "An area of study, like math or history.",
    "example": "History is my favorite subject."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A difficult exam",
      "A teacher who changes a student's view of math",
      "A school trip",
      "A new school building"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What method did the new teacher use?",
    "choices": [
      "Only writing on the board",
      "Games and real-life examples",
      "Giving more homework",
      "Longer exams"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Adam feel about math by the end of the term?",
    "choices": [
      "He hated it more",
      "It became his favorite subject",
      "He was confused",
      "He quit school"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Boring\" means…",
    "choices": [
      "very interesting",
      "not interesting",
      "difficult",
      "easy"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "A \"subject\" in school is…",
    "choices": [
      "a teacher",
      "an area of study",
      "a classroom",
      "an exam"
    ],
    "answer": 1
  }
],
};
