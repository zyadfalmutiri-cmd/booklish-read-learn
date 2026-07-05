import type { Story } from "@/lib/types";

export const theDiplomat: Story = {
  slug: "the-diplomat",
  title: "The Diplomat",
  genre: "drama",
  level: "advanced",
  cefr: "C1",
  blurb: "A seasoned diplomat must navigate a crisis where strict adherence to protocol threatens to escalate a conflict that quiet, unofficial diplomacy might resolve.",
  cover: "🤝",
  coverHue: "from-indigo-200 to-blue-300",
  minutes: 7,
  paragraphs: [
  "Ambassador Rashid had built his reputation on meticulous adherence to diplomatic protocol, believing firmly that formal procedure, however cumbersome, ultimately safeguarded international relations from impulsive missteps.",
  "When a border skirmish threatened to escalate into open conflict, official channels proved frustratingly slow, bogged down by bureaucratic caution and mutual distrust between the two governments.",
  "Rashid faced an uncomfortable realization: the very protocols he had championed throughout his career now seemed to be exacerbating the crisis rather than containing it.",
  "Against considerable professional risk, he arranged an unofficial, off-the-record meeting with his counterpart, circumventing established procedures in the hope that informal candor might achieve what formal negotiation could not.",
  "The meeting proved unexpectedly productive; freed from the posturing that formal settings tend to demand, both diplomats spoke with unusual honesty about their governments' genuine concerns and red lines.",
  "Though Rashid was later reprimanded for bypassing official protocol, the informal understanding they reached quietly prevented further escalation, leaving him to privately question whether rules designed to prevent chaos sometimes become obstacles to the very peace they were meant to protect."
  ],
  vocab: {
  "meticulous": {
    "ar": "دقيق جداً / متأنٍ",
    "def": "Showing great attention to detail; very careful.",
    "example": "She was meticulous in her research."
  },
  "cumbersome": {
    "ar": "مرهق / معقّد",
    "def": "Slow and difficult because of complexity.",
    "example": "The process was cumbersome and slow."
  },
  "bureaucratic": {
    "ar": "بيروقراطي",
    "def": "Relating to excessive official rules and procedures.",
    "example": "Bureaucratic delays frustrated the negotiators."
  },
  "circumventing": {
    "ar": "يتحايل على / يتجاوز",
    "def": "Finding a way around a rule or obstacle.",
    "example": "He found a way of circumventing the regulations."
  },
  "reprimanded": {
    "ar": "وُبِّخ / عُوقب رسمياً",
    "def": "Formally criticized for a fault or mistake.",
    "example": "She was reprimanded for breaking protocol."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What tension does this passage explore?",
    "choices": [
      "The cost of war",
      "Formal protocol versus effective informal diplomacy",
      "A trade dispute",
      "A diplomat's retirement"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Rashid do to address the crisis?",
    "choices": [
      "He followed protocol strictly",
      "He arranged an unofficial meeting with his counterpart",
      "He resigned from his post",
      "He ignored the crisis entirely"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What was the outcome of the unofficial meeting?",
    "choices": [
      "It made things worse",
      "It quietly prevented further escalation",
      "It had no effect",
      "It ended in war"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Circumventing\" means finding a way to…",
    "choices": [
      "strictly follow a rule",
      "get around a rule or obstacle",
      "enforce a rule more strictly",
      "create a new rule"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Meticulous\" describes someone who is…",
    "choices": [
      "careless",
      "very careful and detail-oriented",
      "impatient",
      "dishonest"
    ],
    "answer": 1
  }
],
};
