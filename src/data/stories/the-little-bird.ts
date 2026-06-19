import type { Story } from "@/lib/types";

export const theLittleBird: Story = {
  slug: "the-little-bird",
  title: "The Little Bird",
  genre: "drama",
  level: "beginner",
  blurb: "A small bird falls from its nest. A young girl must decide whether to help or let nature take its course.",
  cover: "🐦",
  coverHue: "from-sky-200 to-blue-300",
  minutes: 3,
  paragraphs: [
    "Rima found the bird on a Tuesday morning. It was lying on the grass under the tall oak tree, very small and very still. She thought it was dead.",
    "But when she bent down, she could see its tiny chest moving. It was breathing. One of its wings was spread at an odd angle.",
    "She ran inside to find her father. \"There is a bird! It fell from the nest!\" Her father followed her outside and knelt down beside it.",
    "\"Should we pick it up?\" Rima asked. Her father shook his head gently. \"Sometimes it is better not to touch. The mother may still come. Let's watch for an hour.\"",
    "They watched from the window. After forty minutes, a larger bird appeared. It sat on the branch above, then flew down and stood beside the small bird. It did not leave.",
    "By evening, the little bird was gone from the grass. Rima's father smiled. \"The mother knew what to do,\" he said. Rima felt relieved — and also amazed at the quiet way nature works.",
  ],
  vocab: {
    nest: { ar: "عشّ", def: "A place where birds lay eggs and raise young.", example: "I can see a bird's nest in the tree." },
    breathing: { ar: "يتنفس", def: "Taking air in and out of the body.", example: "She was breathing heavily after running." },
    spread: { ar: "منتشر / مفرود", def: "Extended outward; opened wide.", example: "The bird spread its wings and flew." },
    knelt: { ar: "ركع / جثا", def: "Past tense of 'kneel' — to go down on one's knees.", example: "He knelt beside the injured cat." },
    relieved: { ar: "مرتاح / ارتاح له بال", def: "Feeling free from worry or fear.", example: "She felt relieved when she heard the good news." },
    amazed: { ar: "مندهش", def: "Very surprised and impressed.", example: "He was amazed by the view from the mountain." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main message of this story?", choices: ["Birds should live in cages", "Sometimes not acting is the right action", "Fathers know everything", "Birds are dangerous"], answer: 1 },
    { kind: "event", q: "What did Rima's father suggest they do first?", choices: ["Pick up the bird immediately", "Call a vet", "Watch and wait", "Put the bird back in the nest"], answer: 2 },
    { kind: "event", q: "What happened to the bird by evening?", choices: ["It was still on the grass", "It had died", "It was gone", "It flew to another tree"], answer: 2 },
    { kind: "vocab", q: "\"Relieved\" means feeling…", choices: ["angry", "free from worry", "confused", "tired"], answer: 1 },
    { kind: "vocab", q: "\"Knelt\" means…", choices: ["ran quickly", "went down on one's knees", "stood on one foot", "sat on a chair"], answer: 1 },
  ],
};
