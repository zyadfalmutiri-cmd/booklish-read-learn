import type { Story } from "@/lib/types";

export const aLetterFromParis: Story = {
  slug: "a-letter-from-paris",
  title: "A Letter from Paris",
  genre: "romance",
  level: "intermediate",
  blurb: "Ten years after their last meeting, Mia receives a handwritten letter from Paris. It changes everything she thought she had decided.",
  cover: "💌",
  coverHue: "from-rose-200 to-pink-400",
  minutes: 5,
  paragraphs: [
    "The letter arrived on a Wednesday, which Mia had always considered the most ordinary day of the week. She almost missed it among the bills and takeaway menus.",
    "She recognised the handwriting before she read the name. She sat down at the kitchen table and did not move for several minutes.",
    "His name was Julien, and they had met at a language school in Bristol nine years ago. He was French; she was English. They had spent one summer speaking only the other's language — him in careful English, her in laughably bad French. They had parted as friends, they told themselves.",
    "The letter was written on hotel stationery from Paris. In precise, slightly formal English, he described his life — the bookshop he now owned, the neighbourhood where he lived, how the Seine looked in January. At the end, he wrote: \"I think about that summer more than I should. I wonder if you do too.\"",
    "Mia set the letter down. She was engaged to someone else. She had a life here, in this flat, with these routines. She was practical and sensible, and she knew better than to let a letter rewrite her history.",
    "She told herself this for three days. On the fourth day, she sat down and wrote back.",
  ],
  vocab: {
    ordinary: { ar: "عادي", def: "Nothing special; normal.", example: "It was an ordinary Tuesday morning." },
    stationery: { ar: "قرطاسية / ورق مكتبة", def: "Materials for writing, especially paper and envelopes.", example: "She bought hotel stationery as a souvenir." },
    precise: { ar: "دقيق", def: "Exact and accurate.", example: "She gave precise instructions for the route." },
    parted: { ar: "افترق", def: "Said goodbye and went separate ways.", example: "They parted at the airport with a hug." },
    sensible: { ar: "عاقل / حكيم", def: "Showing good judgment; practical.", example: "It is sensible to check the weather before hiking." },
    engaged: { ar: "مخطوبة / مخطوب", def: "Having agreed to marry someone.", example: "They got engaged last spring." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the central conflict in this story?", choices: ["Mia doesn't like Paris", "Mia must choose between her past and her present", "Julien wants to marry Mia immediately", "Mia can't find Julien's address"], answer: 1 },
    { kind: "event", q: "How had Mia and Julien met originally?", choices: ["At a hotel in Paris", "At a language school in Bristol", "Through a mutual friend", "On a train"], answer: 1 },
    { kind: "event", q: "What did Mia do after three days of telling herself not to reply?", choices: ["She threw the letter away", "She called Julien", "She wrote back", "She moved to Paris"], answer: 2 },
    { kind: "vocab", q: "\"Sensible\" means…", choices: ["emotional", "showing good judgment", "romantic", "careless"], answer: 1 },
    { kind: "vocab", q: "\"Parted\" means…", choices: ["arrived together", "said goodbye and went separate ways", "fought", "got married"], answer: 1 },
  ],
};
