import type { Story } from "@/lib/types";

export const shadowsOfEmpire: Story = {
  slug: "shadows-of-empire",
  title: "Shadows of Empire",
  genre: "non-fiction",
  level: "advanced",
  cefr: "C1",
  blurb: "A historical essay examines how the economic legacies of colonialism continue to shape contemporary global inequality in ways often obscured by contemporary political discourse.",
  cover: "🏛️",
  coverHue: "from-amber-200 to-orange-300",
  minutes: 7,
  paragraphs: [
  "Contemporary discussions of global economic inequality frequently treat national poverty as though it emerged in a historical vacuum, disconnected from centuries of colonial extraction that structured the modern global economy.",
  "Infrastructure built during colonial rule, for instance, was rarely designed to serve local development, but rather to facilitate the efficient export of raw materials toward colonial metropoles.",
  "This legacy persists in subtle ways: transportation networks in many formerly colonized nations still connect resource-rich regions to ports rather than to each other, hindering internal economic integration.",
  "Critics of this historical framing argue that emphasizing colonial legacy risks absolving contemporary governments of responsibility for present-day mismanagement, corruption, or policy failures.",
  "Proponents counter that acknowledging structural historical disadvantages is not incompatible with holding current institutions accountable; the two explanations, they argue, operate on entirely different timescales and need not be mutually exclusive.",
  "A more nuanced historical analysis, then, resists both extremes: neither excusing contemporary governance failures through appeals to distant history, nor ignoring how thoroughly colonial economic architecture continues to shape the constraints within which those governments must operate."
  ],
  vocab: {
  "extraction": {
    "ar": "استخراج / استغلال",
    "def": "The process of removing resources, often for external benefit.",
    "example": "Colonial extraction shaped many economies."
  },
  "metropoles": {
    "ar": "الحواضر الاستعمارية",
    "def": "The central, colonizing countries in a colonial relationship.",
    "example": "Raw materials were shipped to European metropoles."
  },
  "hindering": {
    "ar": "يعيق",
    "def": "Creating difficulty for something to happen or progress.",
    "example": "Poor roads were hindering trade."
  },
  "absolving": {
    "ar": "يعفي من المسؤولية",
    "def": "Freeing someone from blame or responsibility.",
    "example": "The excuse was absolving him of responsibility."
  },
  "nuanced": {
    "ar": "دقيق / متعدد الأوجه",
    "def": "Characterized by subtle distinctions rather than simple views.",
    "example": "The essay offered a nuanced analysis."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central argument of this passage?",
    "choices": [
      "Colonial history has no relevance today",
      "Colonial economic structures still shape present-day inequality alongside current governance",
      "Modern governments bear no responsibility for poverty",
      "Infrastructure is unrelated to economic development"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How was colonial-era infrastructure typically designed?",
    "choices": [
      "To serve local development",
      "To facilitate export of raw materials to colonial powers",
      "To connect regions internally",
      "To improve local governance"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What do critics of the colonial-legacy framing argue?",
    "choices": [
      "It ignores modern governance failures",
      "It is entirely accurate",
      "It is irrelevant to economics",
      "It proves colonialism was beneficial"
    ],
    "answer": 0
  },
  {
    "kind": "vocab",
    "q": "\"Absolving\" means freeing someone from…",
    "choices": [
      "opportunity",
      "blame or responsibility",
      "wealth",
      "knowledge"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Nuanced\" describes an analysis with…",
    "choices": [
      "oversimplified views",
      "subtle distinctions",
      "no clear argument",
      "only one perspective"
    ],
    "answer": 1
  }
],
};
