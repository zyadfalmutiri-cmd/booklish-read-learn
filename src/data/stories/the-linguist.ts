import type { Story } from "@/lib/types";

export const theLinguist: Story = {
  slug: "the-linguist",
  title: "The Linguist",
  genre: "non-fiction",
  level: "advanced",
  cefr: "C1",
  blurb: "A field linguist races against time to document a dying language, confronting the emotional weight of preserving what may soon vanish entirely.",
  cover: "🗣️",
  coverHue: "from-emerald-200 to-teal-300",
  minutes: 7,
  paragraphs: [
  "Dr. Salwa had devoted the last decade of her career to documenting an endangered language spoken fluently by fewer than a dozen remaining elders in a remote highland community.",
  "Each recording session felt increasingly urgent, as the community's oldest speakers, custodians of vocabulary and grammatical nuance found nowhere else, grew visibly frailer with each passing year.",
  "What troubled Salwa most was not merely the prospect of linguistic loss, but the realization that entire conceptual frameworks, ways of categorizing kinship, time, and the natural world, would vanish alongside the words themselves.",
  "Younger members of the community, eager for economic opportunities elsewhere, had largely abandoned the language in favor of the national tongue, a pragmatic choice Salwa found impossible to condemn despite her scholarly anguish.",
  "She began collaborating with a handful of younger relatives willing to learn, producing recordings, dictionaries, and grammatical sketches intended to outlast the generation that had carried the language thus far.",
  "Salwa harbored no illusions that her work would resurrect the language as a living tongue, yet she found meaning in ensuring that its intricate architecture would not simply dissolve into silence, unrecorded and unremembered."
  ],
  vocab: {
  "custodians": {
    "ar": "حراس / أمناء",
    "def": "People who preserve or are responsible for something valuable.",
    "example": "Elders were the custodians of the tribe's traditions."
  },
  "frailer": {
    "ar": "أضعف / أوهن",
    "def": "More physically weak or delicate.",
    "example": "He grew frailer with age."
  },
  "conceptual": {
    "ar": "مفاهيمي",
    "def": "Relating to ideas or general notions.",
    "example": "The theory required a conceptual shift."
  },
  "anguish": {
    "ar": "ألم شديد / كرب",
    "def": "Severe mental or emotional pain.",
    "example": "She felt anguish over the difficult decision."
  },
  "resurrect": {
    "ar": "يحيي / يبعث من جديد",
    "def": "To bring something back to life or use.",
    "example": "They tried to resurrect the old tradition."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central concern of this passage?",
    "choices": [
      "Learning a new language for travel",
      "The urgent effort to document a dying language and its worldview",
      "A dispute between linguists",
      "Teaching children a national language"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Why did younger community members abandon the language?",
    "choices": [
      "They disliked it",
      "They sought economic opportunities elsewhere",
      "They were forbidden to speak it",
      "No reason is given"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Salwa ultimately hope to achieve?",
    "choices": [
      "Making the language spoken again nationally",
      "Preserving a record of the language's structure",
      "Convincing elders to move to the city",
      "Publishing a bestselling book"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Custodians\" are people who…",
    "choices": [
      "destroy valuable things",
      "preserve or care for something valuable",
      "study economics",
      "travel frequently"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Anguish\" refers to severe…",
    "choices": [
      "happiness",
      "mental or emotional pain",
      "physical strength",
      "financial gain"
    ],
    "answer": 1
  }
],
};
