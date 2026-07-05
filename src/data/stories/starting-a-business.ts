import type { Story } from "@/lib/types";

export const startingABusiness: Story = {
  slug: "starting-a-business",
  title: "Starting a Business",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B1",
  blurb: "Reem leaves her corporate job to open a small bakery, facing challenges she never expected.",
  cover: "🥐",
  coverHue: "from-yellow-200 to-amber-300",
  minutes: 5,
  paragraphs: [
  "After ten years working in an office, Reem decided to open a small bakery, something she had dreamed about since she was a teenager.",
  "She used most of her savings to rent a small shop and buy equipment. Her family thought she was taking a huge risk.",
  "The first few months were extremely difficult. Few customers came, and Reem worried constantly about whether she had made a mistake.",
  "Rather than giving up, she started posting photos of her pastries online, and slowly, more people began to notice her small shop.",
  "Word spread about her cardamom cake, and soon customers were traveling from other neighborhoods just to try it.",
  "Two years later, Reem's bakery had become a local favorite, proving that patience and quality could overcome a difficult beginning."
  ],
  vocab: {
  "savings": {
    "ar": "مدخرات",
    "def": "Money saved over time, not spent.",
    "example": "He used his savings to buy a car."
  },
  "equipment": {
    "ar": "معدات",
    "def": "Tools or machines needed for a task.",
    "example": "The kitchen equipment was expensive."
  },
  "constantly": {
    "ar": "باستمرار",
    "def": "Happening all the time.",
    "example": "She was constantly worried about money."
  },
  "notice": {
    "ar": "يلاحظ",
    "def": "To become aware of something.",
    "example": "People began to notice her work."
  },
  "overcome": {
    "ar": "يتغلب على",
    "def": "To successfully deal with a difficulty.",
    "example": "She overcame many obstacles."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "Working in an office",
      "Overcoming challenges to build a business",
      "Learning to bake",
      "Moving to a new neighborhood"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Reem attract more customers?",
    "choices": [
      "She lowered her prices",
      "She posted photos online",
      "She hired a marketing company",
      "She opened a second shop"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What became Reem's most popular item?",
    "choices": [
      "Bread",
      "Cardamom cake",
      "Cookies",
      "Croissants"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Savings\" refers to money that is…",
    "choices": [
      "borrowed",
      "saved over time",
      "spent quickly",
      "given away"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Overcome\" means to successfully deal with a…",
    "choices": [
      "opportunity",
      "difficulty",
      "celebration",
      "routine"
    ],
    "answer": 1
  }
],
};
