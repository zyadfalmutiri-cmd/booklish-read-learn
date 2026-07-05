import type { Story } from "@/lib/types";

export const theOnlineFriend: Story = {
  slug: "the-online-friend",
  title: "The Online Friend",
  genre: "drama",
  level: "intermediate",
  cefr: "B1",
  blurb: "Jood forms an unexpected friendship online and questions what it means for a connection to be real.",
  cover: "💻",
  coverHue: "from-cyan-200 to-blue-300",
  minutes: 5,
  paragraphs: [
  "Jood met Sara in an online forum for people who love painting. They messaged each other every day, discussing techniques and sharing their work.",
  "Jood's parents were slightly worried about a friendship that existed only through a screen, questioning whether it was truly meaningful.",
  "When Jood went through a difficult time after failing an important exam, it was Sara who stayed up late listening and offering comfort.",
  "Meanwhile, some of Jood's school friends barely noticed anything had happened at all.",
  "After a year of talking online, Jood and Sara finally met in person at an art exhibition in a nearby city.",
  "They recognized each other instantly and hugged like old friends, proving that a genuine connection does not always require physical closeness to begin with."
  ],
  vocab: {
  "forum": {
    "ar": "منتدى",
    "def": "An online space where people discuss topics.",
    "example": "She joined a forum for book lovers."
  },
  "meaningful": {
    "ar": "ذو معنى / مهم",
    "def": "Having real importance or value.",
    "example": "Their conversation felt meaningful."
  },
  "comfort": {
    "ar": "مواساة / راحة",
    "def": "A feeling of relief from worry or pain.",
    "example": "Her words gave him comfort."
  },
  "exhibition": {
    "ar": "معرض",
    "def": "A public display of art or objects.",
    "example": "They visited an art exhibition."
  },
  "closeness": {
    "ar": "قرب / تقارب",
    "def": "A feeling of being emotionally near someone.",
    "example": "They shared a deep closeness despite the distance."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "The danger of the internet",
      "Genuine friendship can form online",
      "Painting techniques",
      "Failing an exam"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why were Jood's parents worried?",
    "choices": [
      "Sara lived far away",
      "The friendship existed only online",
      "Jood was failing school",
      "Sara was older than Jood"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What happened after a year of talking online?",
    "choices": [
      "They stopped talking",
      "They met in person",
      "Jood forgot about Sara",
      "They had an argument"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Meaningful\" describes something with real…",
    "choices": [
      "price",
      "importance or value",
      "size",
      "color"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Comfort\" is a feeling of relief from…",
    "choices": [
      "excitement",
      "worry or pain",
      "boredom",
      "hunger"
    ],
    "answer": 1
  }
],
};
