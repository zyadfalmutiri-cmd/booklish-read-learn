import type { Story } from "@/lib/types";

export const theOldRadio: Story = {
  slug: "the-old-radio",
  title: "The Old Radio",
  genre: "drama",
  level: "beginner",
  cefr: "A1",
  blurb: "Karim finds an old radio in the attic and discovers music he loves.",
  cover: "📻",
  coverHue: "from-stone-200 to-neutral-300",
  minutes: 3,
  paragraphs: [
  "Karim was cleaning the attic. He found an old, dusty radio behind some boxes.",
  "He cleaned it carefully. It still had wires and buttons. He wondered if it worked.",
  "Karim pressed the button. The radio made a strange sound, then music started to play!",
  "The music was old, but Karim liked it very much. It was different from his phone songs.",
  "He carried the radio to his room. Every evening, he now listens to old music and smiles."
  ],
  vocab: {
  "attic": {
    "ar": "العلية",
    "def": "A room under the roof of a house.",
    "example": "We found old photos in the attic."
  },
  "dusty": {
    "ar": "مغبر",
    "def": "Covered with dust.",
    "example": "The books were dusty."
  },
  "wires": {
    "ar": "أسلاك",
    "def": "Thin metal used for electricity.",
    "example": "The wires connect the machine."
  },
  "wondered": {
    "ar": "تساءل",
    "def": "Thought about something with curiosity.",
    "example": "She wondered what was inside."
  },
  "strange": {
    "ar": "غريب",
    "def": "Unusual or surprising.",
    "example": "He heard a strange noise."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story about?",
    "choices": [
      "A broken phone",
      "An old radio that still works",
      "A new house",
      "A music teacher"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Where did Karim find the radio?",
    "choices": [
      "In the kitchen",
      "In the attic",
      "At school",
      "In the car"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Karim do after finding the radio?",
    "choices": [
      "He threw it away",
      "He cleaned it",
      "He sold it",
      "He broke it"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Dusty\" means…",
    "choices": [
      "clean",
      "covered with dust",
      "wet",
      "new"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Wondered\" means he…",
    "choices": [
      "knew everything",
      "thought with curiosity",
      "was angry",
      "fell asleep"
    ],
    "answer": 1
  }
],
};
