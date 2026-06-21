import type { Story } from "@/lib/types";

export const theBlueBicycle: Story = {
  slug: "the-blue-bicycle",
  title: "The Blue Bicycle",
  genre: "adventure",
  level: "beginner",
  blurb: "Nadia saves her money for months to buy a bicycle. But when she finally gets it, something unexpected happens.",
  cover: "🚲",
  coverHue: "from-blue-200 to-cyan-300",
  minutes: 4,
  paragraphs: [
    "Nadia had wanted a bicycle for a long time. Every Saturday, she walked past the shop on the main street and looked at the blue one in the window.",
    "She started saving her pocket money. She put every coin in a small tin box under her bed. Every Sunday, she counted the coins. Slowly, the amount grew.",
    "After four months, she had enough. She went to the shop with her mother. The blue bicycle was still there, shining in the window. She paid for it and rode it home.",
    "On the first day, she went too fast and fell off. Her knee hurt, but she got back on. On the second day, she could ride without holding the handlebars.",
    "On the third day, she rode to the park. A little girl with a broken leg watched her from a bench. The girl looked sad. Nadia stopped.",
    "\"Would you like a ride?\" Nadia asked. She held the bicycle steady, and the little girl sat on the back. They went around the park once, slowly. The little girl laughed the whole time. Nadia decided that was the best ride yet.",
  ],
  vocab: {
    saving: { ar: "ادخار", def: "Keeping money to use later.", example: "She is saving money to buy a laptop." },
    coin: { ar: "عملة معدنية", def: "A small flat piece of metal used as money.", example: "He found an old coin in the garden." },
    shining: { ar: "لامع", def: "Giving off bright light; gleaming.", example: "The stars were shining brightly." },
    handlebars: { ar: "مقود الدراجة", def: "The bars on a bicycle that you hold to steer.", example: "He lost control of the handlebars." },
    steady: { ar: "ثابت", def: "Not moving or shaking; stable.", example: "Hold the ladder steady while I climb." },
    bench: { ar: "مقعد (في الحديقة)", def: "A long seat, usually in a public place.", example: "We sat on a bench in the park." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the story mainly about?", choices: ["A girl who works in a shop", "A girl who saves money for a bicycle and shares her joy", "A bicycle race", "A girl who loses her money"], answer: 1 },
    { kind: "event", q: "How long did Nadia save her money?", choices: ["Two weeks", "Two months", "Four months", "A whole year"], answer: 2 },
    { kind: "event", q: "What happened when Nadia gave the little girl a ride?", choices: ["The girl fell off", "The girl cried", "The girl laughed", "The girl rode alone"], answer: 2 },
    { kind: "vocab", q: "\"Steady\" means…", choices: ["fast", "not moving or shaking", "colorful", "broken"], answer: 1 },
    { kind: "vocab", q: "A \"coin\" is…", choices: ["a paper note", "a small metal piece of money", "a type of bicycle", "a tin box"], answer: 1 },
  ],
};
