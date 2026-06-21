import type { Story } from "@/lib/types";

export const theBrokenWindow: Story = {
  slug: "the-broken-window",
  title: "The Broken Window",
  genre: "mystery",
  level: "beginner",
  blurb: "Someone broke a window at the school. The teacher asks three students what happened — but only one is telling the truth.",
  cover: "🪟",
  coverHue: "from-gray-200 to-slate-400",
  minutes: 4,
  paragraphs: [
    "On Monday morning, the teacher walked into the classroom and saw a broken window. The cold air came in. On the floor, there was a football.",
    "\"Who did this?\" the teacher asked. The class was silent. Three students had stayed late on Friday: Ali, Zara, and Bilal.",
    "\"Ali, what happened?\" Ali stood up. \"I was in the library at four o'clock. I did not come near the classroom. You can ask the librarian.\"",
    "\"Zara?\" Zara bit her lip. \"I saw Bilal kicking the ball near the window. I told him to stop. Then I went home.\"",
    "\"Bilal?\" Bilal looked at the floor. \"I was kicking the ball in the corridor. Not near the classroom. I don't know who broke it.\"",
    "The teacher thought for a moment. She called the librarian. Ali's story was confirmed — he had been there. But the librarian also said she had seen Bilal near the classroom windows, not the corridor. Bilal's face turned red. \"I'm sorry,\" he said quietly. \"It was an accident.\"",
  ],
  vocab: {
    silence: { ar: "صمت", def: "Complete quiet; no sound.", example: "There was a moment of silence before he spoke." },
    confirm: { ar: "يؤكد", def: "To say or show that something is true.", example: "Can you confirm the time of the meeting?" },
    corridor: { ar: "ممر", def: "A long passage inside a building.", example: "The classrooms are at the end of the corridor." },
    librarian: { ar: "أمين مكتبة", def: "A person who works in a library.", example: "The librarian helped me find the book." },
    accident: { ar: "حادث / بالخطأ", def: "Something that happens by mistake, not on purpose.", example: "I broke the cup by accident." },
    confirmed: { ar: "أكّد", def: "Proved or stated that something was true.", example: "The doctor confirmed the diagnosis." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the story about?", choices: ["A fire at the school", "Finding out who broke a window", "A sports competition", "A missing football"], answer: 1 },
    { kind: "event", q: "Who was telling the truth about where they were?", choices: ["Bilal", "Zara and Bilal", "Ali", "No one"], answer: 2 },
    { kind: "event", q: "How did the teacher discover the truth?", choices: ["She watched a video", "She called the librarian", "She asked other students", "She found footprints"], answer: 1 },
    { kind: "vocab", q: "\"Confirmed\" means…", choices: ["denied", "proved to be true", "forgot", "changed"], answer: 1 },
    { kind: "vocab", q: "An \"accident\" is something that happens…", choices: ["on purpose", "by mistake", "every day", "at night"], answer: 1 },
  ],
};
