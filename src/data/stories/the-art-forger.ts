import type { Story } from "@/lib/types";

export const theArtForger: Story = {
  slug: "the-art-forger",
  title: "The Art Forger",
  genre: "mystery",
  level: "intermediate",
  cefr: "B2",
  blurb: "A talented but struggling painter is tempted into forging masterpieces, blurring the line between skill and deception.",
  cover: "🎨",
  coverHue: "from-purple-200 to-fuchsia-300",
  minutes: 6,
  paragraphs: [
  "Karim was an exceptionally gifted painter, capable of replicating the brushstrokes of the old masters with astonishing precision, yet he had never managed to sell his own original work.",
  "Desperate for money, he accepted an offer from a wealthy collector to recreate a lost painting by a famous seventeenth-century artist.",
  "What began as a private commission gradually evolved into something far more troubling, as the collector began selling Karim's forgeries as genuine masterpieces.",
  "Karim told himself he bore no responsibility for how the paintings were used, though a persistent unease gnawed at his conscience.",
  "When an art historian grew suspicious of one painting's unusual brush technique, an investigation began that threatened to expose the entire scheme.",
  "Karim ultimately confessed everything, forfeiting his reputation but freeing himself from years of guilt, insisting that authenticity, even in ruin, was worth more than fraudulent success."
  ],
  vocab: {
  "replicating": {
    "ar": "يكرر / يقلد",
    "def": "Making an exact copy of something.",
    "example": "He was replicating a famous sculpture."
  },
  "commission": {
    "ar": "تكليف / طلب عمل فني",
    "def": "A request to create a specific piece of work.",
    "example": "She accepted a commission to paint a portrait."
  },
  "forgeries": {
    "ar": "تزييفات / أعمال مزورة",
    "def": "Fake copies made to deceive people.",
    "example": "The museum discovered several forgeries."
  },
  "unease": {
    "ar": "قلق / عدم ارتياح",
    "def": "A feeling of anxiety or discomfort.",
    "example": "A sense of unease grew inside him."
  },
  "authenticity": {
    "ar": "أصالة",
    "def": "The quality of being genuine or real.",
    "example": "Experts questioned the painting's authenticity."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central conflict in this story?",
    "choices": [
      "A painter competing in a contest",
      "A talented painter drawn into forgery and deception",
      "A museum theft",
      "A disagreement between artists"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Karim originally agree to do?",
    "choices": [
      "Sell his own paintings",
      "Recreate a lost painting privately",
      "Teach painting classes",
      "Restore an old museum"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did the scheme eventually unravel?",
    "choices": [
      "Karim confessed immediately",
      "An art historian noticed unusual brush technique",
      "The collector confessed",
      "The paintings were destroyed"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Authenticity\" refers to the quality of being…",
    "choices": [
      "expensive",
      "genuine or real",
      "beautiful",
      "famous"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Unease\" describes a feeling of…",
    "choices": [
      "comfort",
      "anxiety or discomfort",
      "excitement",
      "pride"
    ],
    "answer": 1
  }
],
};
