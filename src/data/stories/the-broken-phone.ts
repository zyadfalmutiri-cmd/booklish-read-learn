import type { Story } from "@/lib/types";

export const theBrokenPhone: Story = {
  slug: "the-broken-phone",
  title: "The Broken Phone",
  genre: "drama",
  level: "beginner",
  cefr: "A2",
  blurb: "When his phone breaks, Sami discovers there is more to life than screens.",
  cover: "📱",
  coverHue: "from-slate-200 to-gray-300",
  minutes: 4,
  paragraphs: [
  "Sami's phone fell and the screen cracked completely. He could not use it anymore.",
  "At first, he felt lost. He always checked messages and games during free time.",
  "The repair shop said it would take a week to fix. Sami had to find other things to do.",
  "He started reading a book his sister gave him last year. He also went for walks in the evening.",
  "He noticed things he had never seen before: the colors of the sunset, the sounds of birds, his neighbor's garden.",
  "When his phone was finally fixed, Sami decided to use it less. He wanted to keep noticing the world around him."
  ],
  vocab: {
  "cracked": {
    "ar": "تشقق",
    "def": "Broke with lines but not completely apart.",
    "example": "The glass cracked when it fell."
  },
  "lost": {
    "ar": "تائه/ضائع",
    "def": "Confused, not knowing what to do.",
    "example": "He felt lost without his notes."
  },
  "repair": {
    "ar": "إصلاح",
    "def": "To fix something broken.",
    "example": "The shop can repair your phone."
  },
  "noticed": {
    "ar": "لاحظ",
    "def": "Became aware of something.",
    "example": "She noticed a new flower in the garden."
  },
  "sunset": {
    "ar": "غروب الشمس",
    "def": "The time when the sun goes down.",
    "example": "The sunset was beautiful today."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "Buying a new phone",
      "Life without a phone",
      "A repair shop",
      "A trip abroad"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How long did the repair take?",
    "choices": [
      "One day",
      "A week",
      "A month",
      "It was never fixed"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Sami start doing instead?",
    "choices": [
      "Watching TV",
      "Reading and walking",
      "Sleeping more",
      "Playing games"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Noticed\" means…",
    "choices": [
      "ignored",
      "became aware of",
      "forgot",
      "broke"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Cracked\" describes something that is…",
    "choices": [
      "completely new",
      "broken with lines",
      "very clean",
      "very expensive"
    ],
    "answer": 1
  }
],
};
