import type { Story } from "@/lib/types";

export const theJobInterview: Story = {
  slug: "the-job-interview",
  title: "The Job Interview",
  genre: "drama",
  level: "intermediate",
  cefr: "B1",
  blurb: "Noor prepares for the most important interview of her career, and learns that authenticity matters more than perfection.",
  cover: "🤵",
  coverHue: "from-blue-200 to-indigo-300",
  minutes: 5,
  paragraphs: [
  "Noor had applied for over thirty jobs in six months. Finally, a marketing agency invited her for an interview.",
  "She spent days preparing, memorizing answers, and researching the company's history and values.",
  "On the day of the interview, her mind suddenly went blank when the interviewer asked an unexpected question about a past failure.",
  "Instead of giving a rehearsed answer, Noor decided to be completely honest about a project that had gone wrong, and what she had learned from it.",
  "The interviewer smiled and leaned forward. \"That's the most genuine answer I've heard all week,\" she said.",
  "A week later, Noor got the job. She realized that honesty had impressed them more than any perfect, memorized answer ever could have."
  ],
  vocab: {
  "applied": {
    "ar": "تقدّم بطلب",
    "def": "Formally asked for a job or position.",
    "example": "She applied for the manager position."
  },
  "memorizing": {
    "ar": "يحفظ",
    "def": "Learning something by heart.",
    "example": "He spent hours memorizing his speech."
  },
  "unexpected": {
    "ar": "غير متوقع",
    "def": "Surprising; not predicted.",
    "example": "The question was completely unexpected."
  },
  "rehearsed": {
    "ar": "محفوظ / متدرب عليه",
    "def": "Practiced in advance, often sounding unnatural.",
    "example": "His answer sounded rehearsed."
  },
  "genuine": {
    "ar": "صادق / حقيقي",
    "def": "Real and sincere, not fake.",
    "example": "Her apology felt genuine."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "The importance of memorizing answers",
      "Honesty can be more impressive than perfection",
      "Job interviews are always unfair",
      "Marketing agencies are hard to join"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What question caught Noor off guard?",
    "choices": [
      "A question about her salary",
      "A question about a past failure",
      "A question about her hobbies",
      "A question about her age"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Noor respond to the difficult question?",
    "choices": [
      "She refused to answer",
      "She gave a rehearsed answer",
      "She answered honestly",
      "She left the interview"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Genuine\" describes something that is…",
    "choices": [
      "fake",
      "real and sincere",
      "expensive",
      "complicated"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "A \"rehearsed\" answer is one that is…",
    "choices": [
      "spontaneous",
      "practiced in advance",
      "dishonest",
      "confusing"
    ],
    "answer": 1
  }
],
};
