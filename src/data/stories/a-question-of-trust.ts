import type { Story } from "@/lib/types";

export const aQuestionOfTrust: Story = {
  slug: "a-question-of-trust",
  title: "A Question of Trust",
  genre: "mystery",
  level: "intermediate",
  cefr: "B2",
  blurb: "When money goes missing from a family business, suspicion threatens to tear siblings apart.",
  cover: "🔍",
  coverHue: "from-slate-200 to-gray-300",
  minutes: 6,
  paragraphs: [
  "The family's small import business had been passed down through three generations, and the three siblings now managed it together after their father's retirement.",
  "When a significant sum of money went missing from the company accounts, suspicion immediately fell upon each sibling, poisoning the trust they had shared their entire lives.",
  "Fadwa, the eldest, had access to the accounts but insisted she had noticed the discrepancy herself before anyone else raised concerns.",
  "Her brother Rashed grew increasingly defensive under questioning, which only deepened everyone's suspicion, despite his repeated denials.",
  "It was eventually revealed that a trusted employee, someone none of them had ever suspected, had been quietly embezzling funds for over a year.",
  "The siblings felt a mixture of relief and shame, realizing how quickly suspicion had corroded relationships that decades of family loyalty had built."
  ],
  vocab: {
  "discrepancy": {
    "ar": "تباين / تضارب",
    "def": "A difference between things that should be the same.",
    "example": "There was a discrepancy in the accounts."
  },
  "defensive": {
    "ar": "دفاعي",
    "def": "Behaving as if being attacked or criticized.",
    "example": "He became defensive when questioned."
  },
  "denials": {
    "ar": "إنكارات",
    "def": "Statements that something is not true.",
    "example": "Despite his denials, the evidence was clear."
  },
  "embezzling": {
    "ar": "يختلس",
    "def": "Stealing money that has been entrusted to one's care.",
    "example": "He was accused of embezzling company funds."
  },
  "corroded": {
    "ar": "تآكل / أفسد",
    "def": "Gradually destroyed or weakened.",
    "example": "Distrust corroded their friendship."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central theme of this story?",
    "choices": [
      "A family business succeeding",
      "How suspicion can damage trust",
      "Hiring a new employee",
      "Retirement planning"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who was actually responsible for the missing money?",
    "choices": [
      "Fadwa",
      "Rashed",
      "A trusted employee",
      "No one; it was a mistake"
    ],
    "answer": 2
  },
  {
    "kind": "event",
    "q": "How did Rashed react to being questioned?",
    "choices": [
      "He confessed immediately",
      "He became defensive",
      "He left the company",
      "He laughed it off"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Embezzling\" means stealing money that has been…",
    "choices": [
      "found on the street",
      "entrusted to one's care",
      "given as a gift",
      "borrowed legally"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Corroded\" means gradually…",
    "choices": [
      "strengthened",
      "destroyed or weakened",
      "forgotten",
      "celebrated"
    ],
    "answer": 1
  }
],
};
