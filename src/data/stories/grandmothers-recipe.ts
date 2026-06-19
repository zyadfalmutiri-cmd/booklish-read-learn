import type { Story } from "@/lib/types";

export const grandmothersRecipe: Story = {
  slug: "grandmothers-recipe",
  title: "Grandmother's Recipe",
  genre: "non-fiction",
  level: "beginner",
  blurb: "How does food connect families across generations? A true-to-life story about cooking and memory.",
  cover: "📖",
  coverHue: "from-amber-100 to-yellow-300",
  minutes: 3,
  paragraphs: [
    "Every family has a recipe that belongs to it. It might be a soup, a bread, or a sweet pastry. This recipe is more than food. It is a connection to the past.",
    "Recipes pass from grandmother to mother, from mother to daughter. Sometimes the recipe is written in a notebook with old ink. Sometimes it only lives in someone's memory.",
    "When you cook this food, you remember. You remember the smell of the kitchen. You remember the person who showed you how. You remember the table where everyone sat together.",
    "Food has a power that words do not always have. A bowl of soup can say 'I love you' or 'I am here with you'. A piece of cake can say 'Welcome home'.",
    "Scientists have studied this. They found that the smell of a food can bring back memories very strongly — stronger than a photograph or a song. This is because the part of the brain that processes smell is connected directly to memory.",
    "So the next time you cook a family recipe, remember: you are doing more than making food. You are keeping a memory alive.",
  ],
  vocab: {
    recipe: { ar: "وصفة طبخ", def: "A set of instructions for making a food.", example: "She found an old recipe in the drawer." },
    generation: { ar: "جيل", def: "All people born around the same time.", example: "This story is about three generations of one family." },
    pastry: { ar: "معجنات", def: "A baked food made with dough.", example: "She bought a pastry from the bakery." },
    connection: { ar: "رابط / صلة", def: "A relationship between people or things.", example: "There is a strong connection between them." },
    processes: { ar: "يعالج / يُشغّل", def: "Deals with or handles information.", example: "The brain processes information very quickly." },
    memory: { ar: "ذاكرة / ذكرى", def: "The ability to remember, or a thing remembered.", example: "She has a strong memory for names." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main idea of this text?", choices: ["How to cook family recipes", "Food connects families and keeps memories alive", "Why scientists study food", "The history of soup"], answer: 1 },
    { kind: "event", q: "According to the text, smell is connected to what part of the brain?", choices: ["The part that controls movement", "The part that processes language", "The part connected to memory", "The part that controls sleep"], answer: 2 },
    { kind: "vocab", q: "A \"recipe\" is…", choices: ["a type of food", "a set of cooking instructions", "a kitchen tool", "a family photo"], answer: 1 },
    { kind: "vocab", q: "\"Generation\" refers to…", choices: ["a type of cooking", "people born around the same time", "a food ingredient", "a kitchen"], answer: 1 },
    { kind: "main-idea", q: "The text says food can say 'I love you'. This means:", choices: ["Food can actually speak", "Food can express feelings and emotions", "Food is more important than words", "We should eat more food"], answer: 1 },
  ],
};
