import type { Story } from "@/lib/types";

export const theSummerJob: Story = {
  slug: "the-summer-job",
  title: "The Summer Job",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "Tariq gets his first summer job and learns that work is not always easy.",
  cover: "💼",
  coverHue: "from-cyan-200 to-teal-300",
  minutes: 4,
  paragraphs: [
  "Tariq was excited about his first summer job at a small bookstore. He wanted to earn his own money.",
  "On his first day, the manager showed him how to organize the shelves and help customers find books.",
  "At first, Tariq made a few mistakes. He gave a customer the wrong change and put books in the wrong section.",
  "The manager was patient with him. \"Everyone makes mistakes when they start something new,\" she said kindly.",
  "By the end of the summer, Tariq knew every shelf in the store. He felt proud of how much he had learned.",
  "When school started again, Tariq missed the bookstore. He decided he would come back the next summer."
  ],
  vocab: {
  "excited": {
    "ar": "متحمس",
    "def": "Feeling very happy and eager about something.",
    "example": "She was excited about her trip."
  },
  "manager": {
    "ar": "مدير",
    "def": "A person who is in charge of a business.",
    "example": "The manager arrived early."
  },
  "customers": {
    "ar": "زبائن",
    "def": "People who buy things from a shop.",
    "example": "The shop was full of customers."
  },
  "mistakes": {
    "ar": "أخطاء",
    "def": "Things done wrong.",
    "example": "Everyone makes mistakes sometimes."
  },
  "proud": {
    "ar": "فخور",
    "def": "Feeling satisfied with an achievement.",
    "example": "He felt proud of his work."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A vacation trip",
      "Tariq's first summer job",
      "Buying a bookstore",
      "A school project"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What mistakes did Tariq make?",
    "choices": [
      "He was late every day",
      "Wrong change and wrong shelves",
      "He broke a book",
      "He argued with the manager"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Tariq feel by the end of summer?",
    "choices": [
      "Bored",
      "Proud",
      "Angry",
      "Confused"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Proud\" means feeling…",
    "choices": [
      "ashamed",
      "satisfied with an achievement",
      "tired",
      "afraid"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "A \"manager\" is someone who…",
    "choices": [
      "cleans the shop",
      "is in charge of a business",
      "buys books",
      "fixes shelves"
    ],
    "answer": 1
  }
],
};
