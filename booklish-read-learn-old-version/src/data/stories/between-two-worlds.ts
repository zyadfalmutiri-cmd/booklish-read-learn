import type { Story } from "@/lib/types";

export const betweenTwoWorlds: Story = {
  slug: "between-two-worlds",
  title: "Between Two Worlds",
  genre: "romance",
  level: "advanced",
  blurb: "Nadia speaks Arabic at home and English at work — two languages, two selves. When she meets Daniel, she wonders which version of herself he is falling in love with.",
  cover: "🌍",
  coverHue: "from-amber-200 to-orange-400",
  minutes: 7,
  paragraphs: [
    "Nadia had long understood that she became a different person depending on the language she was speaking. In Arabic, she was warmer — denser with affection, prone to extravagance in expression, the way her mother talked. In English, she was precise and contained. She had once told a friend this and the friend had not understood. \"You are who you are,\" the friend said. Nadia had not tried to explain.",
    "Daniel was an architect. They met at a book launch — both reaching for the last free glass of warm white wine. He was the kind of man who listened as if listening itself were something he had studied.",
    "They spoke in English, of course. She told him about her work — translation, primarily contracts and legal documents. She told him about Jordan, where she had spent summers until she was eighteen. She edited herself carefully; not dishonestly, but the way you edit a first draft.",
    "After two months, she began to notice the gap. He knew the English Nadia — the precise one, the contained one. He did not know how she was with her mother, half-laughing, half-arguing, switching between languages mid-sentence without thinking. He did not know the jokes she made that only worked in Arabic. He was falling for a translation.",
    "She tried to tell him this on a Sunday walk along the canal. \"There's a version of me you haven't met,\" she said. He looked at her seriously. \"Then introduce me to her,\" he said.",
    "She laughed — and the laugh was the real one, the one her mother had given her. It was too big for the canal towpath on a Sunday. It startled a passing cyclist. Daniel looked delighted. \"That,\" he said, \"is a start.\"",
  ],
  vocab: {
    extravagance: { ar: "إفراط / مبالغة", def: "The quality of going beyond what is necessary.", example: "His descriptions had a wonderful extravagance." },
    prone: { ar: "مائل إلى / يميل", def: "Likely to do or experience something.", example: "She is prone to forgetting names." },
    contained: { ar: "متحفظ / ضابط لنفسه", def: "Controlled; not showing strong emotions.", example: "His manner was calm and contained." },
    precisely: { ar: "بدقة", def: "In an exact and accurate way.", example: "She described the route precisely." },
    draft: { ar: "مسودة", def: "A first version of a text, before it is finished.", example: "He submitted a rough draft of the report." },
    startled: { ar: "فزع / اندهش فجأة", def: "Was suddenly surprised or frightened.", example: "She was startled by the noise behind her." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the central question Nadia faces?", choices: ["Which language she should learn next", "Whether Daniel knows the real her or only her 'English self'", "Whether to leave her job as a translator", "Whether to move back to Jordan"], answer: 1 },
    { kind: "event", q: "Where did Nadia and Daniel first meet?", choices: ["At a language school", "At a book launch", "At work", "In Jordan"], answer: 1 },
    { kind: "event", q: "What does Daniel say when Nadia tells him there's a version of her he hasn't met?", choices: ["He says it doesn't matter", "He says he already knows everything", "He says to introduce him to her", "He says he is confused"], answer: 2 },
    { kind: "vocab", q: "\"Prone\" means…", choices: ["unable to", "likely to do something", "afraid of something", "very good at something"], answer: 1 },
    { kind: "vocab", q: "\"Startled\" means…", choices: ["very happy", "suddenly surprised or frightened", "confused", "angry"], answer: 1 },
  ],
};
