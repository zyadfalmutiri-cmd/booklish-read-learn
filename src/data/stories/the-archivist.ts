import type { Story } from "@/lib/types";

export const theArchivist: Story = {
  slug: "the-archivist",
  title: "The Archivist",
  genre: "mystery",
  level: "advanced",
  cefr: "C1",
  blurb: "An archivist cataloguing forgotten government records stumbles upon evidence of a decades-old cover-up, forcing a reckoning with institutional loyalty.",
  cover: "🗄️",
  coverHue: "from-neutral-200 to-stone-300",
  minutes: 7,
  paragraphs: [
  "Mariam had spent three uneventful years cataloguing declassified government records, a position she had once considered tediously bureaucratic rather than remotely consequential.",
  "While digitizing a routine batch of correspondence from several decades earlier, she noticed inconsistencies between the official public account of an industrial accident and the internal memos describing it.",
  "The internal documents revealed that officials had knowingly concealed evidence of negligence that had contributed directly to the disaster, protecting the reputations of individuals long since retired or deceased.",
  "Mariam faced a quiet but consequential decision: flag the discrepancy through proper institutional channels, where it might simply be buried again, or leak the documents to a journalist she trusted.",
  "She spent several anxious weeks considering the potential professional consequences, aware that whistleblowing, however justified, rarely goes unpunished within rigid institutional hierarchies.",
  "Ultimately, she chose to work within official channels first, reasoning that exhausting legitimate avenues, however imperfect, preserved both her integrity and a faint hope that institutions could still occasionally correct their own historical failures."
  ],
  vocab: {
  "declassified": {
    "ar": "مرفوع عنه السرية",
    "def": "Officially made available to the public after being secret.",
    "example": "The documents were declassified last year."
  },
  "tediously": {
    "ar": "بملل / برتابة",
    "def": "In a long, boring, and repetitive manner.",
    "example": "He worked tediously through the files."
  },
  "negligence": {
    "ar": "إهمال",
    "def": "Failure to take proper care, resulting in harm.",
    "example": "The accident was caused by negligence."
  },
  "discrepancy": {
    "ar": "تضارب / تباين",
    "def": "A difference between things that should match.",
    "example": "She noticed a discrepancy in the records."
  },
  "hierarchies": {
    "ar": "هرميات / تسلسلات إدارية",
    "def": "Systems in which people or things are ranked according to authority.",
    "example": "Rigid hierarchies slowed the decision."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central dilemma facing Mariam?",
    "choices": [
      "Whether to keep her job",
      "Whether to expose a decades-old cover-up through proper or unofficial channels",
      "How to organize archives",
      "Whether to trust a journalist"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did the internal memos reveal?",
    "choices": [
      "A different, unrelated accident",
      "Officials knowingly concealed evidence of negligence",
      "A financial scandal",
      "Nothing significant"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Mariam ultimately decide?",
    "choices": [
      "To leak the documents immediately",
      "To work within official channels first",
      "To destroy the documents",
      "To ignore the discovery"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Negligence\" refers to failure to take proper…",
    "choices": [
      "profit",
      "care, resulting in harm",
      "credit",
      "documentation"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Declassified\" describes documents that are…",
    "choices": [
      "still secret",
      "officially made public after being secret",
      "destroyed",
      "incomplete"
    ],
    "answer": 1
  }
],
};
