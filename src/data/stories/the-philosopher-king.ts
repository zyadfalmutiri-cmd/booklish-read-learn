import type { Story } from "@/lib/types";

export const thePhilosopherKing: Story = {
  slug: "the-philosopher-king",
  title: "The Philosopher King",
  genre: "non-fiction",
  level: "advanced",
  cefr: "C1",
  blurb: "An examination of an ancient ruler whose commitment to philosophical reflection sat uneasily alongside the demands of absolute power.",
  cover: "👑",
  coverHue: "from-yellow-200 to-amber-300",
  minutes: 7,
  paragraphs: [
  "Historians have long been fascinated by rulers who attempted to reconcile the contemplative life of a philosopher with the ruthless pragmatism often required to govern effectively.",
  "Marcus, as later chroniclers would call him, spent his evenings recording private reflections on mortality, duty, and the fleeting nature of power, even as he issued military orders by day.",
  "His writings reveal a persistent tension: a man who genuinely believed in restraint and virtue, yet who nonetheless presided over campaigns that brought considerable suffering to those beyond his borders.",
  "Some scholars argue that his philosophical temperament made him a notably humane ruler by the standards of his era, tempering cruelty where a lesser man might not have hesitated.",
  "Others contend that his private musings on virtue changed little in practice, serving primarily as a form of psychological consolation for choices he could not otherwise justify to himself.",
  "Perhaps the more instructive lesson lies not in resolving this contradiction, but in recognizing how imperfectly even our most reflective ideals translate into the compromises demanded by real authority."
  ],
  vocab: {
  "reconcile": {
    "ar": "يوفّق بين / يوائم",
    "def": "To make two seemingly incompatible things compatible.",
    "example": "He tried to reconcile his ideals with reality."
  },
  "pragmatism": {
    "ar": "براغماتية / واقعية",
    "def": "A practical approach focused on results rather than theory.",
    "example": "Political pragmatism often overrides idealism."
  },
  "chroniclers": {
    "ar": "مؤرخون / كتّاب سجلات",
    "def": "People who record historical events in order.",
    "example": "Ancient chroniclers documented the king's reign."
  },
  "temperament": {
    "ar": "مزاج / طبع",
    "def": "A person's characteristic nature or disposition.",
    "example": "Her calm temperament suited the role."
  },
  "consolation": {
    "ar": "عزاء / سلوى",
    "def": "Comfort received after a disappointment or loss.",
    "example": "His writing offered a kind of consolation."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What tension does this passage primarily explore?",
    "choices": [
      "The cost of building monuments",
      "The conflict between philosophical ideals and the demands of power",
      "A dispute among historians about dates",
      "The military strategy of ancient armies"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Marcus record in his private writings?",
    "choices": [
      "Military strategies only",
      "Reflections on mortality, duty, and power",
      "Financial records",
      "Letters to other rulers"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What do some scholars argue about his philosophy's practical effect?",
    "choices": [
      "It made him crueler",
      "It served mainly as psychological consolation",
      "It ended all wars",
      "It had no effect on history"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Reconcile\" means to make two things…",
    "choices": [
      "completely opposite",
      "compatible with each other",
      "forgotten",
      "publicly known"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Pragmatism\" refers to an approach focused on…",
    "choices": [
      "abstract theory",
      "practical results",
      "emotional appeal",
      "historical tradition"
    ],
    "answer": 1
  }
],
};
