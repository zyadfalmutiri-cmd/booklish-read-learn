import type { Story } from "@/lib/types";

export const echoesOfThePast: Story = {
  slug: "echoes-of-the-past",
  title: "Echoes of the Past",
  genre: "mystery",
  level: "advanced",
  cefr: "C1",
  blurb: "A historian investigating an old manuscript uncovers evidence suggesting a celebrated historical figure's legacy was built upon a carefully concealed deception.",
  cover: "📜",
  coverHue: "from-stone-200 to-amber-300",
  minutes: 7,
  paragraphs: [
  "Professor Idris had spent years researching the celebrated diplomat credited with negotiating a pivotal peace treaty two centuries earlier, a figure revered in national history as an unambiguous hero.",
  "While cataloguing a newly discovered collection of private correspondence, Idris encountered letters suggesting that the diplomat had, in fact, secretly undermined a rival negotiator's efforts to claim sole credit for the eventual settlement.",
  "The implications were unsettling: an entire national narrative, taught in schools for generations, appeared to rest upon a substantially incomplete, if not deliberately distorted, account of events.",
  "Idris grappled with the professional and ethical weight of the discovery, aware that publishing his findings would inevitably provoke fierce resistance from those invested in preserving the traditional narrative.",
  "Colleagues warned him that certain historical myths serve important social functions regardless of their factual accuracy, and that unraveling them carelessly could do more harm than good.",
  "Ultimately, Idris chose to publish his findings, reasoning that a nation's relationship with its own history should be built upon rigorous evidence rather than comforting fictions, however cherished those fictions had become."
  ],
  vocab: {
  "revered": {
    "ar": "يُبجَّل / يُحترم بشدة",
    "def": "Regarded with great respect and admiration.",
    "example": "The scholar was revered by his students."
  },
  "correspondence": {
    "ar": "مراسلات",
    "def": "Letters exchanged between people.",
    "example": "Historians studied the diplomat's correspondence."
  },
  "distorted": {
    "ar": "محرَّف / مشوَّه",
    "def": "Presented in a way that changes the true meaning.",
    "example": "The report gave a distorted account of events."
  },
  "grappled": {
    "ar": "صارع / تعامل بصعوبة مع",
    "def": "Struggled to deal with a difficult issue.",
    "example": "She grappled with the ethical implications."
  },
  "unraveling": {
    "ar": "تفكيك / كشف",
    "def": "Investigating and revealing the truth about something complex.",
    "example": "Unraveling the mystery took years."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central ethical question raised in this passage?",
    "choices": [
      "Whether to publish historical findings that contradict a cherished national narrative",
      "Whether diplomats should negotiate treaties",
      "How to catalogue old letters",
      "Whether peace treaties are effective"
    ],
    "answer": 0
  },
  {
    "kind": "event",
    "q": "What did Idris discover in the private correspondence?",
    "choices": [
      "Evidence of a forgotten treaty",
      "Evidence the diplomat undermined a rival to claim credit",
      "A previously unknown war",
      "A hidden fortune"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Idris ultimately decide to do?",
    "choices": [
      "Suppress his findings",
      "Publish his findings despite objections",
      "Destroy the letters",
      "Ignore the discovery"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Revered\" means regarded with great…",
    "choices": [
      "suspicion",
      "respect and admiration",
      "fear",
      "indifference"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Distorted\" describes an account that has been…",
    "choices": [
      "accurately reported",
      "presented in a way that changes the truth",
      "completely destroyed",
      "widely praised"
    ],
    "answer": 1
  }
],
};
