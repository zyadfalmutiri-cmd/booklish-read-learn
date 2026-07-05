import type { Story } from "@/lib/types";

export const theNeighborhoodGarden: Story = {
  slug: "the-neighborhood-garden",
  title: "The Neighborhood Garden",
  genre: "non-fiction",
  level: "intermediate",
  cefr: "B1",
  blurb: "Residents of a rundown block transform an empty lot into a shared garden, and their community along with it.",
  cover: "🌻",
  coverHue: "from-lime-200 to-green-300",
  minutes: 5,
  paragraphs: [
  "For years, the empty lot at the end of the street had been full of trash and overgrown weeds, and most residents simply ignored it.",
  "One resident, Umm Faisal, suggested turning it into a community garden where neighbors could grow vegetables together.",
  "At first, only a few people showed interest, and some neighbors doubted the project would ever succeed.",
  "Slowly, more people began contributing, bringing tools, seeds, and their own time on weekends to clear and plant the space.",
  "Within a few months, the lot was full of tomatoes, herbs, and flowers, and neighbors who had never spoken before were now chatting while watering plants.",
  "The garden did more than grow vegetables; it grew a genuine sense of community that had been missing from the neighborhood for years."
  ],
  vocab: {
  "overgrown": {
    "ar": "مغطى بالأعشاب الضارة",
    "def": "Covered with plants that have grown wild and uncontrolled.",
    "example": "The old garden was overgrown with weeds."
  },
  "residents": {
    "ar": "سكان",
    "def": "People who live in a particular place.",
    "example": "The residents met to discuss the plan."
  },
  "doubted": {
    "ar": "شكّ في",
    "def": "Were not sure something would happen or succeed.",
    "example": "Many doubted the plan would work."
  },
  "contributing": {
    "ar": "يساهم",
    "def": "Giving time, money, or effort to help something.",
    "example": "Everyone was contributing to the project."
  },
  "genuine": {
    "ar": "حقيقي / صادق",
    "def": "Real and sincere.",
    "example": "There was a genuine sense of friendship."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the main theme of this story?",
    "choices": [
      "Growing vegetables for profit",
      "A garden bringing a community together",
      "Cleaning up trash",
      "A dispute between neighbors"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Who first suggested the garden idea?",
    "choices": [
      "A city official",
      "Umm Faisal",
      "A group of children",
      "No one; it happened naturally"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What grew in the garden besides vegetables?",
    "choices": [
      "Trees",
      "A sense of community",
      "A business",
      "Nothing else"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Overgrown\" describes a place covered with…",
    "choices": [
      "buildings",
      "wild, uncontrolled plants",
      "water",
      "sand"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Contributing\" means giving time or effort to…",
    "choices": [
      "compete with others",
      "help something succeed",
      "avoid work",
      "earn money"
    ],
    "answer": 1
  }
],
};
