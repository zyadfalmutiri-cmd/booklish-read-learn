import type { Story } from "@/lib/types";

export const myFavoriteFood: Story = {
  slug: "my-favorite-food",
  title: "My Favorite Food",
  genre: "non-fiction",
  level: "beginner",
  cefr: "A1",
  blurb: "A simple description of a family meal and why it matters to Layla.",
  cover: "🍲",
  coverHue: "from-orange-200 to-red-300",
  minutes: 3,
  paragraphs: [
  "My favorite food is my grandmother's soup. She makes it every Friday.",
  "The soup has vegetables, chicken, and rice. It smells wonderful in the whole house.",
  "My grandmother says the secret is patience. She cooks it slowly for two hours.",
  "All my family sits together to eat. We talk and laugh at the table.",
  "After we finish, my grandmother always smiles and asks, \"Do you want more?\" We always say yes."
  ],
  vocab: {
  "favorite": {
    "ar": "مفضل",
    "def": "The one you like the most.",
    "example": "Pizza is my favorite food."
  },
  "vegetables": {
    "ar": "خضروات",
    "def": "Plants that people eat, like carrots.",
    "example": "I eat vegetables every day."
  },
  "smells": {
    "ar": "رائحته",
    "def": "Gives off a smell.",
    "example": "The bread smells fresh."
  },
  "patience": {
    "ar": "صبر",
    "def": "The ability to wait calmly.",
    "example": "Cooking well needs patience."
  },
  "slowly": {
    "ar": "ببطء",
    "def": "Not fast; taking time.",
    "example": "He walked slowly to school."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the text about?",
    "choices": [
      "A restaurant",
      "A grandmother's soup",
      "A cooking school",
      "A birthday cake"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "When does the grandmother make the soup?",
    "choices": [
      "Every Monday",
      "Every Friday",
      "Once a year",
      "On birthdays"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How long does she cook it?",
    "choices": [
      "Ten minutes",
      "One hour",
      "Two hours",
      "All day"
    ],
    "answer": 2
  },
  {
    "kind": "vocab",
    "q": "\"Patience\" means the ability to…",
    "choices": [
      "cook fast",
      "wait calmly",
      "eat a lot",
      "clean quickly"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Slowly\" is the opposite of…",
    "choices": [
      "quietly",
      "quickly",
      "happily",
      "loudly"
    ],
    "answer": 1
  }
],
};
