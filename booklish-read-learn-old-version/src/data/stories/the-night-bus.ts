import type { Story } from "@/lib/types";

export const theNightBus: Story = {
  slug: "the-night-bus",
  title: "The Night Bus",
  genre: "drama",
  level: "beginner",
  blurb: "A tired traveller boards the last bus of the night and meets a stranger who changes his evening.",
  cover: "🚌",
  coverHue: "from-slate-300 to-slate-500",
  minutes: 3,
  tags: ["fiction", "short"],
  paragraphs: [
    "It was almost midnight when Omar reached the bus stop. The streets were quiet and cold. He pulled his jacket tighter and waited.",
    "Soon, the last bus of the night arrived. It was nearly empty. Omar paid the driver and sat near the window. He was tired and hungry.",
    "At the next stop, an old woman climbed in slowly. She carried a small paper bag. She smiled at Omar and sat across from him.",
    "After a few minutes, she opened her bag and offered him a warm sandwich. \"I made too many,\" she said. \"Please, take one.\" Omar hesitated, then thanked her quietly.",
    "They did not talk much. The bus moved through dark streets. But when Omar reached his stop, he felt warmer than before — and not only because of the food.",
  ],
  vocab: {
    midnight: { ar: "منتصف الليل", def: "Twelve o'clock at night.", example: "We arrived at midnight." },
    quiet: { ar: "هادئ", def: "With little or no noise.", example: "The library is quiet." },
    empty: { ar: "فارغ", def: "With nothing inside.", example: "The glass is empty." },
    offered: { ar: "عرض", def: "Asked someone if they wanted something.", example: "She offered me a seat." },
    hesitated: { ar: "تردد", def: "Paused before doing something because of doubt.", example: "He hesitated before answering." },
    warmer: { ar: "أكثر دفئا", def: "More warm than before.", example: "The room feels warmer now." },
  },
  quiz: [
    { kind: "main-idea", q: "What is this story mostly about?", choices: ["A long journey across the country", "A small act of kindness on a late bus", "A lost wallet", "A school trip"], answer: 1 },
    { kind: "event", q: "What did the old woman give Omar?", choices: ["Money", "A warm sandwich", "Her phone number", "A book"], answer: 1 },
    { kind: "vocab", q: "\"Hesitated\" means…", choices: ["ran away", "paused before acting", "shouted", "laughed"], answer: 1 },
  ],
};
