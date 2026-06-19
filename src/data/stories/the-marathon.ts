import type { Story } from "@/lib/types";

export const theMarathon: Story = {
  slug: "the-marathon",
  title: "The Marathon Runner",
  genre: "non-fiction",
  level: "intermediate",
  blurb: "What does it really take to run 42 kilometres? The science and psychology of the world's most famous race.",
  cover: "🏃",
  coverHue: "from-emerald-200 to-teal-400",
  minutes: 5,
  paragraphs: [
    "A marathon is exactly 42.195 kilometres long. The distance comes from an ancient Greek story, but the modern race began at the 1908 London Olympics — and the length has stayed the same ever since.",
    "Most runners hit what they call 'the wall' somewhere around the 32-kilometre mark. At this point, the body has used most of its stored glycogen — the quick energy from carbohydrates — and must start burning fat, which is slower. The brain also begins to send signals that feel like exhaustion, even when the body still has fuel.",
    "Training for a marathon takes months. Experienced runners follow a plan that gradually increases distance while building rest days into the week. The key principle is called 'progressive overload': doing slightly more than last week, consistently, over time.",
    "Psychology matters as much as fitness. Many marathon runners use a technique called 'chunking' — instead of thinking about the full distance, they break the race into smaller sections. \"Just reach the next kilometre marker\" replaces \"I have twenty kilometres left.\"",
    "Recovery after a marathon is just as important as the race itself. The immune system is temporarily weakened in the 72 hours after a marathon — a phenomenon sports scientists call the 'open window'. During this time, rest and nutrition are critical.",
    "Every year, tens of thousands of amateur runners cross marathon finish lines around the world. Most are not competing to win. They are competing against the version of themselves from six months ago.",
  ],
  vocab: {
    glycogen: { ar: "جليكوجين (سكر الطاقة)", def: "Energy stored in muscles, used during exercise.", example: "Long runs deplete your glycogen stores." },
    exhaustion: { ar: "إنهاك / استنزاف", def: "Extreme tiredness.", example: "After the climb, he collapsed from exhaustion." },
    principle: { ar: "مبدأ", def: "A basic rule or idea that guides behaviour.", example: "The principle of fairness is important in sport." },
    phenomenon: { ar: "ظاهرة", def: "Something remarkable or unusual that happens.", example: "The northern lights are a natural phenomenon." },
    immunity: { ar: "مناعة", def: "The body's ability to resist disease.", example: "Regular exercise can improve your immunity." },
    chunking: { ar: "تقسيم المهام", def: "Breaking a large task into smaller pieces.", example: "Chunking can make big projects feel manageable." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main idea of this text?", choices: ["How to win a marathon", "The history of the Olympics", "The science and psychology of running a marathon", "Why people should not run marathons"], answer: 2 },
    { kind: "event", q: "What is 'the wall' that runners experience?", choices: ["A physical barrier in the race", "The point where the body runs low on quick energy", "The last kilometre of the race", "A training technique"], answer: 1 },
    { kind: "event", q: "What does 'chunking' mean for marathon runners?", choices: ["Running faster", "Breaking the race into smaller sections mentally", "Eating during the race", "Increasing speed at the end"], answer: 1 },
    { kind: "vocab", q: "\"Exhaustion\" means…", choices: ["excitement", "extreme tiredness", "hunger", "anger"], answer: 1 },
    { kind: "vocab", q: "A \"phenomenon\" is…", choices: ["a race distance", "a training plan", "something remarkable that happens", "a sports drink"], answer: 2 },
  ],
};
