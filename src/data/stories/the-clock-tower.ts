import type { Story } from "@/lib/types";

export const theClockTower: Story = {
  slug: "the-clock-tower",
  title: "The Clock Tower",
  genre: "mystery",
  level: "advanced",
  blurb: "The town clock has not moved in twenty years. When Inspector Riis is sent to investigate, she finds that the stopped clock is the only honest thing left in the town.",
  cover: "🕰️",
  coverHue: "from-gray-400 to-zinc-600",
  minutes: 7,
  paragraphs: [
    "The clock had stopped at 11:47 on the fourteenth of March, twenty years ago. The townsfolk had grown used to it — it was practically a landmark now, a frozen monument to the night everyone in Kleinhaven preferred not to discuss.",
    "Inspector Riis arrived on a Tuesday, summoned by the regional authority. The official reason was a maintenance report. Riis had been doing this long enough to understand that official reasons were rarely the real ones.",
    "She spoke to the mayor, who was helpful in the way that people are helpful when they are trying to control the conversation. She spoke to the clock mechanic, a man in his sixties named Brenner, who fixed small things competently and claimed to know nothing about the large ones.",
    "The town archive showed a gap. Records for the nights of March 11th to 15th of that year had been removed — not lost, she noted; the binding showed the pages had been physically cut. Someone had considered this necessary.",
    "On the third evening, Riis found Brenner in the square, standing beneath the frozen clock face. He was looking up at it with the expression of a man who has been carrying something very heavy for a long time.",
    "\"You could fix it, couldn't you?\" she said. He did not turn to face her. After a long pause, he said: \"Yes. But whoever stops a clock usually doesn't want it started again.\" Riis stood beside him and looked up at 11:47. The night was quiet. She understood now that the stopped clock was not the mystery. It was the answer to one.",
  ],
  vocab: {
    monument: { ar: "نصب / معلم", def: "A structure built to remember a person or event.", example: "A monument was built in the centre of the square." },
    archive: { ar: "أرشيف", def: "A collection of historical records.", example: "The archive contained letters from the 1800s." },
    competently: { ar: "بكفاءة", def: "In a skillful, capable way.", example: "She handled the situation competently." },
    summoned: { ar: "استُدعي", def: "Officially called to appear or come.", example: "He was summoned to the manager's office." },
    binding: { ar: "تجليد الكتاب", def: "The cover or sewn spine of a book.", example: "The old book had a cracked leather binding." },
    monument2: { ar: "شاهد", def: "Evidence or proof of something.", example: "The frozen clock was a monument to that night." },
  },
  quiz: [
    { kind: "main-idea", q: "What does the stopped clock represent in the story?", choices: ["A broken piece of infrastructure", "A secret the town wants to keep hidden", "A tourist attraction", "A punishment from the government"], answer: 1 },
    { kind: "event", q: "What did Riis find in the town archive?", choices: ["A confession letter", "A full record of the events", "Pages that had been cut out", "An old photograph"], answer: 2 },
    { kind: "event", q: "What does Brenner's comment suggest about the clock?", choices: ["That it cannot be repaired", "That it was stopped by someone who wanted to hide something", "That the parts are missing", "That he was afraid of heights"], answer: 1 },
    { kind: "vocab", q: "\"Summoned\" means…", choices: ["ignored", "officially called to appear", "promoted", "arrested"], answer: 1 },
    { kind: "vocab", q: "An \"archive\" is…", choices: ["a clocktower", "a town hall", "a collection of historical records", "a type of monument"], answer: 2 },
  ],
};
