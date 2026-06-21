import type { Story } from "@/lib/types";

export const theRiversEdge: Story = {
  slug: "the-rivers-edge",
  title: "The River's Edge",
  genre: "adventure",
  level: "beginner",
  blurb: "Two friends follow a small path into the forest and discover where the river really begins.",
  cover: "🏞️",
  coverHue: "from-emerald-200 to-emerald-400",
  minutes: 4,
  paragraphs: [
    "Sam and Leo lived in a small village near a wide, slow river. Every summer, they asked the same question. \"Where does the river begin?\" Nobody in the village knew the answer.",
    "One morning, the two friends took bread, water, and a small map. They walked along the river into the forest. The trees were tall and the air was cool. Birds sang above them.",
    "After two hours, the river became narrow. The water moved faster now, jumping over smooth stones. Sam laughed. \"It sounds like the river is talking to us!\" Leo nodded, breathing hard.",
    "The path climbed a steep hill. Their legs were tired, but they continued. At the top, they stopped and stared. A clear pool of water sat between two grey rocks. A tiny stream poured out of the ground.",
    "\"This is it,\" Leo whispered. \"This is where everything starts.\" They sat by the pool and ate their bread in silence. The sun was warm on their faces.",
    "When they returned to the village that evening, the people asked them many questions. Sam smiled. \"The river,\" he said, \"begins with a single drop.\"",
  ],
  vocab: {
    village: { ar: "قرية", def: "A very small town.", example: "He grew up in a quiet village." },
    forest: { ar: "غابة", def: "A large area with many trees.", example: "The forest was full of birds." },
    narrow: { ar: "ضيق", def: "Not wide.", example: "The road became narrow." },
    smooth: { ar: "أملس", def: "Flat and even; not rough.", example: "The stones felt smooth in her hand." },
    steep: { ar: "شديد الانحدار", def: "Rising sharply; not gentle.", example: "We climbed a steep hill." },
    stream: { ar: "جدول", def: "A small river.", example: "A clear stream ran past the house." },
    poured: { ar: "تدفّق", def: "Flowed quickly.", example: "Water poured from the broken pipe." },
    silence: { ar: "صمت", def: "Complete quiet; no sound.", example: "They ate dinner in silence." },
    drop: { ar: "قطرة", def: "A very small amount of liquid.", example: "A drop of rain fell on my hand." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main idea of the story?", choices: ["Two friends discover the source of their river.", "A river floods a village.", "Two boys are lost in a forest.", "A village builds a bridge."], answer: 0 },
    { kind: "event", q: "What did Sam and Leo take with them?", choices: ["A boat and fishing rods", "Bread, water, and a map", "Only a compass", "Nothing"], answer: 1 },
    { kind: "event", q: "Where does the river begin?", choices: ["In the sea", "From a pool between two rocks", "In the village", "Inside a cave"], answer: 1 },
    { kind: "vocab", q: "Something \"steep\" is…", choices: ["very flat", "rising sharply", "very wide", "underwater"], answer: 1 },
    { kind: "vocab", q: "A \"stream\" is best described as…", choices: ["a small river", "a big lake", "a tall tree", "a rain cloud"], answer: 0 },
  ],
};
