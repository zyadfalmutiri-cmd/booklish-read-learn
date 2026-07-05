import type { Story } from "@/lib/types";

export const learningToSwim: Story = {
  slug: "learning-to-swim",
  title: "Learning to Swim",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "Zainab overcomes her fear of water with patience and a good teacher.",
  cover: "🏊",
  coverHue: "from-blue-200 to-sky-300",
  minutes: 4,
  paragraphs: [
  "Zainab was afraid of water since she was a child. She never learned how to swim.",
  "At twenty-five, she finally decided it was time to face her fear and take lessons.",
  "On the first day, she could not even put her face in the water without feeling scared.",
  "Her instructor, Coach Amal, was very patient. \"We will go slowly, one small step at a time,\" she said.",
  "Week by week, Zainab became more comfortable. She learned to float, then to kick, then to swim a few meters.",
  "After two months, Zainab swam across the whole pool by herself. She felt proud, strong, and finally free of her old fear."
  ],
  vocab: {
  "afraid": {
    "ar": "خائف",
    "def": "Feeling fear.",
    "example": "She was afraid of the dark."
  },
  "face": {
    "ar": "يواجه",
    "def": "To deal with something difficult directly.",
    "example": "He decided to face his fear."
  },
  "instructor": {
    "ar": "مدرّب",
    "def": "A person who teaches a skill.",
    "example": "The swimming instructor was kind."
  },
  "float": {
    "ar": "يطفو",
    "def": "To stay on the surface of water.",
    "example": "She learned to float on her back."
  },
  "free": {
    "ar": "متحرر",
    "def": "Not limited or controlled by something.",
    "example": "He felt free after finishing the exam."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A swimming competition",
      "Overcoming fear of water",
      "A vacation at the beach",
      "Buying a pool"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How old was Zainab when she started lessons?",
    "choices": [
      "Ten",
      "Fifteen",
      "Twenty-five",
      "Forty"
    ],
    "answer": 2
  },
  {
    "kind": "event",
    "q": "What happened after two months?",
    "choices": [
      "She gave up",
      "She swam across the pool",
      "She got hurt",
      "She stopped taking lessons"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Float\" means to…",
    "choices": [
      "sink to the bottom",
      "stay on the surface of water",
      "swim very fast",
      "dive deep"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Face\" your fear means to…",
    "choices": [
      "avoid it",
      "deal with it directly",
      "forget about it",
      "hide from it"
    ],
    "answer": 1
  }
],
};
