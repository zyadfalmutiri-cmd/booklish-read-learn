import type { Story } from "@/lib/types";

export const theLastLibrary: Story = {
  slug: "the-last-library",
  title: "The Last Library",
  genre: "sci-fi",
  level: "advanced",
  blurb: "In a city where all knowledge is streamed and stored in cloud networks, one woman maintains the last physical library — and discovers that some things cannot be uploaded.",
  cover: "📚",
  coverHue: "from-violet-300 to-purple-600",
  minutes: 7,
  paragraphs: [
    "The city had not banned books. That would have been too obvious, too historical, too easy to resist. Instead, it had made them irrelevant. Why read a physical book when you could stream the text directly to your neural interface, annotated, cross-referenced, searchable? The last public library had been quietly defunded in 2041. Only this one remained, because nobody had thought to close it.",
    "Arjun maintained it. She was thirty-four, a former literature professor, and she received a small municipal stipend that had not been updated since 2039. She spent it on repairs: a new window seal, a replacement humidifier, acid-free boxes for the most fragile volumes.",
    "Most days, nobody came. On Tuesdays, a small group of elderly visitors arrived — people who remembered reading before the interface era. They sat in the reading chairs and turned pages. Some fell asleep. Arjun made tea.",
    "Then, in November, a fifteen-year-old boy began appearing. His name was Seth. He had, he said, tried to find an uploaded version of a poem by a poet who had been declared non-compliant by the network's content governance system. The poem had been removed.",
    "\"I know it exists,\" he said. \"My grandmother used to recite it. She said it was about the city — the old city, before.\" Arjun went to the shelves and found the book in seventeen minutes. It was exactly the poem he described.",
    "Seth sat in the reading chair for two hours. He did not use his interface. He read with his eyes, one line at a time. When he left, he asked if he could come back. Arjun said yes. She said it carefully — not as a librarian, but as someone who understood, finally, why she had stayed.",
  ],
  vocab: {
    irrelevant: { ar: "غير ذي صلة / لا أهمية له", def: "Not connected or important to the current situation.", example: "His comment was irrelevant to the discussion." },
    stipend: { ar: "مخصصات / راتب بسيط", def: "A fixed, regular payment, often small.", example: "She received a monthly stipend for her research." },
    fragile: { ar: "هش / قابل للكسر", def: "Easily broken or damaged.", example: "Handle the fragile glass carefully." },
    compliant: { ar: "ممتثل / متوافق", def: "Meeting the required rules or standards.", example: "The system was not compliant with safety regulations." },
    municipal: { ar: "بلدي / خاص بالمدينة", def: "Related to a city or its local government.", example: "The municipal library is open every day." },
    annotated: { ar: "مشروح / معلّق عليه", def: "With added notes or comments explaining the content.", example: "She used an annotated edition of the play." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the central theme of this story?", choices: ["A protest against technology", "The value of physical books and uncensored knowledge", "A romance between a librarian and a student", "A city that banned reading"], answer: 1 },
    { kind: "event", q: "Why had the boy Seth come to the library?", choices: ["He wanted a quiet place to study", "He had been assigned a project", "He was looking for a poem that had been removed from the network", "He had lost his neural interface"], answer: 2 },
    { kind: "event", q: "How long did Seth sit and read in the library?", choices: ["Twenty minutes", "Forty-five minutes", "One hour", "Two hours"], answer: 3 },
    { kind: "vocab", q: "\"Irrelevant\" means…", choices: ["important", "not connected or important to the situation", "very old", "interesting"], answer: 1 },
    { kind: "vocab", q: "\"Fragile\" means…", choices: ["very large", "easily broken or damaged", "very old", "waterproof"], answer: 1 },
  ],
};
