import type { Story } from "@/lib/types";

export const theRefugeeStory: Story = {
  slug: "the-refugee-story",
  title: "The Refugee Story",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B2",
  blurb: "A young woman recounts the harrowing journey that led her family to safety, and the quiet resilience required to rebuild a life from nothing.",
  cover: "🌍",
  coverHue: "from-teal-200 to-emerald-300",
  minutes: 6,
  paragraphs: [
  "Widad was only sixteen when her family fled their home country in the middle of the night, carrying only what could fit into two small suitcases.",
  "The journey took nearly three months, crossing borders illegally, sleeping in overcrowded shelters, and enduring uncertainty that never seemed to end.",
  "Upon arriving in a new country, the family faced an entirely different set of challenges: an unfamiliar language, unrecognized qualifications, and the quiet grief of everything left behind.",
  "Widad's father, once a respected engineer, took a job as a delivery driver, swallowing his pride to provide for his children.",
  "Meanwhile, Widad threw herself into learning the new language, staying up late every night, determined not to let displacement define her future.",
  "Five years later, Widad was accepted into medical school, a milestone that felt less like personal achievement and more like a tribute to everything her family had endured together."
  ],
  vocab: {
  "fled": {
    "ar": "هرب / فرّ",
    "def": "Ran away from danger.",
    "example": "They fled the country during the war."
  },
  "enduring": {
    "ar": "يتحمل / يعاني",
    "def": "Suffering something difficult patiently over time.",
    "example": "They were enduring a difficult winter."
  },
  "qualifications": {
    "ar": "مؤهلات",
    "def": "Skills or achievements that make someone suitable for a job.",
    "example": "His qualifications were not recognized abroad."
  },
  "displacement": {
    "ar": "نزوح / تهجير",
    "def": "The state of being forced to leave one's home.",
    "example": "Displacement affected millions of families."
  },
  "tribute": {
    "ar": "تكريم / إشادة",
    "def": "Something done to show respect or gratitude.",
    "example": "The award was a tribute to her hard work."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central theme of this story?",
    "choices": [
      "A family vacation",
      "Resilience through the refugee experience",
      "Studying medicine abroad",
      "Learning a new language for fun"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What job did Widad's father take in the new country?",
    "choices": [
      "Engineer",
      "Delivery driver",
      "Teacher",
      "Doctor"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What milestone did Widad reach five years later?",
    "choices": [
      "She returned home",
      "She was accepted into medical school",
      "She became a citizen",
      "She opened a business"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Displacement\" refers to being forced to…",
    "choices": [
      "study abroad",
      "leave one's home",
      "change careers",
      "learn a new skill"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Tribute\" means something done to show…",
    "choices": [
      "anger",
      "respect or gratitude",
      "confusion",
      "competition"
    ],
    "answer": 1
  }
],
};
