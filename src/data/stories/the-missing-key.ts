import type { Story } from "@/lib/types";

export const theMissingKey: Story = {
  slug: "the-missing-key",
  title: "The Missing Key",
  genre: "mystery",
  level: "beginner",
  blurb: "Maya cannot find the key to her grandmother's old wooden box. Someone in the house knows where it is.",
  cover: "🔑",
  coverHue: "from-amber-200 to-amber-400",
  minutes: 4,
  paragraphs: [
    "Maya stood in the kitchen and looked at the small wooden box on the table. The box was old. It belonged to her grandmother. Inside, there was a secret. But the key was missing.",
    "She had put the key in the blue cup yesterday. Now the cup was empty. \"That is very strange,\" she said quietly. \"I am sure I left it here.\"",
    "Her little brother Adam walked into the room. He was eating an apple and smiling. \"Are you looking for something?\" he asked. His eyes were bright and a little guilty.",
    "\"Yes. The key for grandmother's box. Did you take it?\" Maya asked gently. Adam shook his head, but his face turned red. He looked at the floor.",
    "Maya followed his eyes. Under the table, half hidden by the rug, she saw a small piece of metal. She bent down and picked it up. It was the key.",
    "\"I only wanted to see inside,\" Adam whispered. Maya smiled at him. She opened the box together with her brother. Inside, there was an old photograph of their grandmother as a young girl, laughing in the rain.",
  ],
  vocab: {
    wooden: { ar: "خشبي", def: "Made of wood.", example: "The wooden chair is very heavy." },
    belonged: { ar: "كان يخص", def: "Was owned by someone.", example: "This book belonged to my father." },
    secret: { ar: "سر", def: "Something hidden or unknown.", example: "She told me a secret." },
    missing: { ar: "مفقود", def: "Lost; not where it should be.", example: "My keys are missing again." },
    strange: { ar: "غريب", def: "Unusual or surprising.", example: "I heard a strange sound at night." },
    guilty: { ar: "مذنب", def: "Feeling that you did something wrong.", example: "He looked guilty after eating the cake." },
    gently: { ar: "بلطف", def: "In a soft, kind way.", example: "She held the baby gently." },
    whispered: { ar: "همس", def: "Spoke very quietly.", example: "He whispered the answer in my ear." },
    photograph: { ar: "صورة فوتوغرافية", def: "A picture taken with a camera.", example: "I keep her photograph on my desk." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the story mainly about?", choices: ["A lost cat", "A missing key and a small family secret", "A trip to the market", "A broken window"], answer: 1 },
    { kind: "event", q: "Where did Maya find the key?", choices: ["In the blue cup", "Under the table", "In Adam's pocket", "Outside in the garden"], answer: 1 },
    { kind: "event", q: "What was inside the wooden box?", choices: ["Money", "An old photograph", "Another key", "A letter"], answer: 1 },
    { kind: "vocab", q: "In the story, \"whispered\" means…", choices: ["shouted loudly", "spoke very quietly", "ran quickly", "laughed softly"], answer: 1 },
    { kind: "vocab", q: "\"Guilty\" describes someone who…", choices: ["is very happy", "feels they did something wrong", "is very tired", "is hungry"], answer: 1 },
  ],
};
