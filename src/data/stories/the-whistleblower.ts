import type { Story } from "@/lib/types";

export const theWhistleblower: Story = {
  slug: "the-whistleblower",
  title: "The Whistleblower",
  genre: "drama",
  level: "intermediate",
  cefr: "B2",
  blurb: "An employee discovers financial fraud at her company and must weigh loyalty against integrity.",
  cover: "🚨",
  coverHue: "from-red-200 to-orange-300",
  minutes: 6,
  paragraphs: [
  "Samah had worked in the finance department of a large corporation for six years, steadily climbing the ranks through diligence and discretion.",
  "While auditing routine transactions, she stumbled upon a pattern of falsified reports that appeared to be concealing significant financial losses.",
  "She initially convinced herself it was an innocent accounting error, reluctant to accuse colleagues she had known for years.",
  "However, as she dug deeper, the evidence became impossible to ignore, implicating several senior executives in a deliberate scheme.",
  "Samah faced an agonizing decision: report the fraud and risk her career and relationships, or remain silent and become complicit in the deception.",
  "After weeks of sleepless nights, she reported her findings to regulators. The company faced serious consequences, and though she lost her job, Samah never regretted choosing integrity over convenience."
  ],
  vocab: {
  "diligence": {
    "ar": "اجتهاد / مثابرة",
    "def": "Careful and persistent effort in one's work.",
    "example": "Her diligence earned her a promotion."
  },
  "discretion": {
    "ar": "تكتم / حكمة",
    "def": "The quality of being careful about what one says or does.",
    "example": "He handled the matter with discretion."
  },
  "falsified": {
    "ar": "مزوّر",
    "def": "Altered to deceive; made false.",
    "example": "The falsified documents were discovered."
  },
  "implicating": {
    "ar": "يورّط",
    "def": "Showing that someone is involved in something wrong.",
    "example": "The evidence was implicating several executives."
  },
  "complicit": {
    "ar": "متواطئ",
    "def": "Involved with others in an illegal or wrong activity.",
    "example": "Staying silent made her feel complicit."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central dilemma in this story?",
    "choices": [
      "Choosing a new job",
      "Loyalty versus integrity when facing fraud",
      "A disagreement between colleagues",
      "A company merger"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Samah discover during her audit?",
    "choices": [
      "A minor accounting error",
      "A pattern of falsified reports concealing losses",
      "A new business opportunity",
      "A colleague's resignation"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What was the consequence of Samah's decision?",
    "choices": [
      "She was promoted",
      "She lost her job but kept her integrity",
      "Nothing changed",
      "She was arrested"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Complicit\" describes someone who is…",
    "choices": [
      "completely innocent",
      "involved in wrongdoing with others",
      "unaware of a situation",
      "in charge of a company"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Falsified\" means…",
    "choices": [
      "verified as true",
      "altered to deceive",
      "completely destroyed",
      "publicly announced"
    ],
    "answer": 1
  }
],
};
