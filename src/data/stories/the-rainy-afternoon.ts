import type { Story } from "@/lib/types";

export const theRainyAfternoon: Story = {
  slug: "the-rainy-afternoon",
  title: "The Rainy Afternoon",
  genre: "drama",
  level: "beginner",
  blurb: "When the rain comes suddenly, a young boy finds an unexpected way to spend the afternoon with his grandmother.",
  cover: "🌧️",
  coverHue: "from-slate-200 to-blue-300",
  minutes: 3,
  paragraphs: [
    "Karim looked out of the window. The sky was dark grey. Big drops of rain hit the glass. He had planned to play football with his friends, but now that was impossible.",
    "\"Karim!\" his grandmother called from the kitchen. \"Come here, I need your help.\" He walked into the kitchen slowly. He was not in a good mood.",
    "His grandmother was standing at the table with flour, eggs, and butter. \"Today we are going to bake a cake,\" she said. \"Your grandfather's favourite — lemon cake.\"",
    "Karim had never baked anything before. He watched his grandmother carefully. She showed him how to mix the flour and butter. He tried, and white flour flew everywhere.",
    "\"Like this,\" she laughed, and guided his hands. Soon, the kitchen smelled of butter and lemon. The rain was still falling outside, but Karim did not mind any more.",
    "When the cake came out of the oven, it was golden and warm. They sat together and ate the first slice. \"Not bad for your first time,\" said his grandmother. Karim grinned.",
  ],
  vocab: {
    flour: { ar: "دقيق", def: "A white powder made from wheat, used for baking.", example: "You need flour to make bread." },
    bake: { ar: "يخبز", def: "To cook food in an oven.", example: "She likes to bake biscuits on weekends." },
    mood: { ar: "مزاج", def: "The way you feel at a particular time.", example: "He was in a good mood after his exam." },
    guided: { ar: "وجّه", def: "Helped someone by showing them what to do.", example: "The teacher guided the student through the problem." },
    golden: { ar: "ذهبي", def: "A warm yellow colour, like gold.", example: "The bread was golden and crispy." },
    grinned: { ar: "ابتسم ابتسامة عريضة", def: "Smiled widely.", example: "He grinned when he heard the good news." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the story mainly about?", choices: ["A boy who plays football in the rain", "A boy who bakes a cake with his grandmother", "A grandmother who teaches at school", "A boy who gets lost"], answer: 1 },
    { kind: "event", q: "Why couldn't Karim play football?", choices: ["He was sick", "His friends cancelled", "It was raining", "He had homework"], answer: 2 },
    { kind: "event", q: "What did they bake?", choices: ["Chocolate cake", "Lemon cake", "Apple pie", "Biscuits"], answer: 1 },
    { kind: "vocab", q: "\"Guided\" means…", choices: ["pushed away", "helped by showing what to do", "laughed at", "ignored"], answer: 1 },
    { kind: "vocab", q: "\"Bake\" means to cook…", choices: ["on a fire", "in water", "in an oven", "in a pan"], answer: 2 },
  ],
};
