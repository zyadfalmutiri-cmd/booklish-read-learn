import type { Story } from "@/lib/types";

export const negotiatingPeace: Story = {
  slug: "negotiating-peace",
  title: "Negotiating Peace",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B2",
  blurb: "A diplomat reflects on the delicate, often invisible work required to bring two hostile parties to a lasting agreement.",
  cover: "🕊️",
  coverHue: "from-sky-200 to-blue-300",
  minutes: 6,
  paragraphs: [
  "For eighteen months, Ambassador Hana had shuttled between two delegations that refused to sit in the same room, communicating instead through carefully worded messages relayed by mediators.",
  "Each side viewed any concession as a sign of weakness, making even minor procedural agreements feel like monumental victories or humiliating defeats.",
  "Hana learned that successful negotiation depended less on grand speeches and more on patiently finding small, face-saving compromises that each side could present as a win.",
  "On one occasion, an entire month of progress nearly collapsed over a disagreement about the wording of a single sentence in the draft agreement.",
  "She spent sleepless nights drafting alternative phrases, searching for language precise enough to satisfy both parties without alienating either.",
  "When the final agreement was eventually signed, Hana felt no triumphant sense of victory, only quiet relief, understanding that peace, unlike war, rarely announces itself with fanfare."
  ],
  vocab: {
  "delegations": {
    "ar": "وفود",
    "def": "Groups of representatives sent to negotiate or discuss matters.",
    "example": "The two delegations met for talks."
  },
  "concession": {
    "ar": "تنازل",
    "def": "Something given up or agreed to, often reluctantly.",
    "example": "Neither side wanted to make a concession."
  },
  "procedural": {
    "ar": "إجرائي",
    "def": "Relating to the way something is done rather than its content.",
    "example": "They argued over procedural details."
  },
  "alienating": {
    "ar": "ينفّر / يبعد",
    "def": "Causing someone to feel isolated or unwelcome.",
    "example": "The comment risked alienating an ally."
  },
  "fanfare": {
    "ar": "ضجة احتفالية",
    "def": "Elaborate public celebration or attention.",
    "example": "The agreement was signed without fanfare."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central theme of this story?",
    "choices": [
      "The excitement of diplomacy",
      "The quiet, patient work behind peace negotiations",
      "A war between two nations",
      "A failed treaty"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why did progress nearly collapse at one point?",
    "choices": [
      "A leader resigned",
      "A disagreement over a single sentence's wording",
      "One delegation left the talks",
      "A public protest occurred"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Hana feel when the agreement was signed?",
    "choices": [
      "Triumphant and celebratory",
      "Quiet relief, without triumph",
      "Disappointed",
      "Indifferent"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Concession\" means something…",
    "choices": [
      "celebrated publicly",
      "given up or agreed to, often reluctantly",
      "completely rejected",
      "kept secret"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Alienating\" means causing someone to feel…",
    "choices": [
      "welcomed",
      "isolated or unwelcome",
      "excited",
      "proud"
    ],
    "answer": 1
  }
],
};
