import type { Story } from "@/lib/types";

export const theClimateScientist: Story = {
  slug: "the-climate-scientist",
  title: "The Climate Scientist",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B2",
  blurb: "A researcher grapples with how to communicate urgent scientific findings to a public increasingly resistant to unwelcome truths.",
  cover: "🌡️",
  coverHue: "from-cyan-200 to-teal-300",
  minutes: 6,
  paragraphs: [
  "Dr. Aziz had spent fifteen years studying rising sea temperatures, publishing dozens of papers that few people outside academia ever read.",
  "When his research began attracting media attention, he was surprised to discover that presenting data clearly was far less challenging than persuading people to actually act on it.",
  "During public talks, he often faced hostile questions from audience members who viewed his findings as exaggerated or politically motivated.",
  "Rather than growing defensive, Aziz learned to frame his message around tangible, local consequences that resonated more deeply than abstract global statistics.",
  "He began collaborating with local fishermen and farmers, whose firsthand observations of changing conditions lent his research an authenticity that charts alone could never achieve.",
  "Though skepticism never fully disappeared, Aziz found that patient, respectful dialogue gradually shifted more minds than any dramatic warning ever had."
  ],
  vocab: {
  "academia": {
    "ar": "الأوساط الأكاديمية",
    "def": "The community of scholars and researchers.",
    "example": "His work was well known within academia."
  },
  "hostile": {
    "ar": "عدائي",
    "def": "Unfriendly or aggressive.",
    "example": "He faced hostile questions from the crowd."
  },
  "exaggerated": {
    "ar": "مبالغ فيه",
    "def": "Described as larger or more extreme than reality.",
    "example": "Some thought the report was exaggerated."
  },
  "tangible": {
    "ar": "ملموس",
    "def": "Able to be clearly perceived or felt; concrete.",
    "example": "They wanted tangible evidence of change."
  },
  "skepticism": {
    "ar": "تشكك",
    "def": "A doubting attitude toward claims or ideas.",
    "example": "His theory was met with skepticism."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central theme of this story?",
    "choices": [
      "Discovering new species",
      "Communicating scientific findings effectively to the public",
      "Competing for research funding",
      "Writing academic papers"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What challenge did Dr. Aziz face during public talks?",
    "choices": [
      "Lack of data",
      "Hostile questions from skeptical audiences",
      "Financial problems",
      "Health issues"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Aziz make his message more effective?",
    "choices": [
      "Using more statistics",
      "Framing consequences around local, tangible effects",
      "Avoiding public talks entirely",
      "Ignoring critics completely"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Tangible\" describes something that is…",
    "choices": [
      "abstract and unclear",
      "able to be clearly perceived; concrete",
      "imaginary",
      "exaggerated"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Skepticism\" is an attitude of…",
    "choices": [
      "complete trust",
      "doubt toward claims or ideas",
      "excitement",
      "indifference"
    ],
    "answer": 1
  }
],
};
