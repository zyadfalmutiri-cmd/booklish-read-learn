import type { Story } from "@/lib/types";

export const aNewFriend: Story = {
  slug: "a-new-friend",
  title: "A New Friend",
  genre: "drama",
  level: "beginner",
  blurb: "Leila is new at school and feels lonely. A simple act of kindness changes everything.",
  cover: "🤝",
  coverHue: "from-pink-200 to-rose-300",
  minutes: 3,
  paragraphs: [
    "Leila walked into the classroom slowly. It was her first day at the new school. All the other students were already talking and laughing with their friends.",
    "She sat down at an empty desk near the window. She opened her notebook and pretended to read, but she was not reading. She was watching the other children.",
    "At lunch, Leila sat alone at a small table. She ate her sandwich quietly. She missed her old school. She missed her old friends.",
    "Then a girl with long black hair sat down across from her. \"Hi! My name is Sara. You are new, right?\" she said with a big smile.",
    "Leila nodded. \"Yes, I moved here last week. My name is Leila.\" Sara slid her tray of food closer. \"Do you like this school?\" she asked.",
    "\"I don't know yet,\" Leila said honestly. Sara laughed. \"That is a very honest answer! I like that. Come, I will show you around after lunch.\" Leila smiled for the first time that day.",
  ],
  vocab: {
    lonely: { ar: "وحيد", def: "Feeling sad because you have no friends nearby.", example: "He felt lonely after moving to a new city." },
    pretended: { ar: "تظاهر", def: "Acted as if something were true when it was not.", example: "She pretended to be asleep." },
    honestly: { ar: "بصدق", def: "In a truthful way.", example: "Please answer honestly." },
    nodded: { ar: "أومأ برأسه", def: "Moved your head up and down to say yes.", example: "He nodded and said nothing." },
    slid: { ar: "أزاح", def: "Moved something smoothly across a surface.", example: "She slid the book across the table." },
    kindness: { ar: "لطف", def: "The quality of being friendly and generous.", example: "A small act of kindness can change someone's day." },
  },
  quiz: [
    { kind: "main-idea", q: "What is this story mainly about?", choices: ["A girl who forgets her lunch", "A new student who finds friendship", "Two girls who argue", "A teacher who helps a student"], answer: 1 },
    { kind: "event", q: "What was Leila doing at her desk?", choices: ["Reading carefully", "Talking to classmates", "Pretending to read", "Drawing pictures"], answer: 2 },
    { kind: "event", q: "Where did Sara and Leila meet?", choices: ["In the classroom", "In the library", "At the lunch table", "Outside the school"], answer: 2 },
    { kind: "vocab", q: "\"Pretended\" means she…", choices: ["actually read her book", "acted as if she was reading", "fell asleep", "left the room"], answer: 1 },
    { kind: "vocab", q: "\"Lonely\" means feeling sad because…", choices: ["you are hungry", "you have no friends nearby", "you are tired", "you are sick"], answer: 1 },
  ],
};
