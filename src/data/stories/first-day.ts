import type { Story } from "@/lib/types";

export const firstDay: Story = {
  slug: "first-day",
  title: "First Day",
  genre: "drama",
  level: "beginner",
  blurb: "Yusuf starts his first job at a bakery and discovers that making mistakes is part of learning.",
  cover: "🥐",
  coverHue: "from-orange-100 to-amber-300",
  minutes: 4,
  paragraphs: [
    "Yusuf arrived at the bakery at six o'clock in the morning. The sun had not yet risen. Through the window he could see the baker already working, covered in flour.",
    "\"You must be Yusuf,\" the baker said without looking up. \"Put on the apron. We start immediately.\" The apron was too big, but Yusuf tied it as best he could.",
    "His first task was to shape bread rolls. The baker showed him once — a smooth, round motion with both hands. When Yusuf tried, the roll came out flat and lopsided. He tried again. Then again.",
    "\"Don't worry,\" the baker said, noticing his frustration. \"My first week, every single loaf was wrong. The bread doesn't care about perfect hands. It cares about patient hands.\"",
    "By the afternoon, Yusuf's rolls were still not round, but they were better. The baker put one in the oven anyway and gave Yusuf the first slice when it came out.",
    "It was warm, soft, and a little uneven — but it was real bread that Yusuf had made. He felt something he hadn't felt before: a quiet, serious kind of pride.",
  ],
  vocab: {
    apron: { ar: "مريلة", def: "A piece of clothing worn over the front to protect clothes.", example: "She put on her apron before cooking." },
    immediately: { ar: "فوراً", def: "At once; without any delay.", example: "Please call me immediately if there is a problem." },
    lopsided: { ar: "مائل / غير متناسق", def: "With one side lower or smaller than the other.", example: "The picture was hanging lopsided on the wall." },
    frustration: { ar: "إحباط", def: "The feeling of being upset because you cannot do something.", example: "He felt frustration after failing the test again." },
    patient: { ar: "صبور", def: "Able to wait without getting angry or upset.", example: "A good teacher must be patient." },
    pride: { ar: "فخر", def: "A feeling of pleasure from your own achievements.", example: "She felt pride when she graduated." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main message of this story?", choices: ["Never work in a bakery", "Making mistakes is part of learning", "Always wake up early", "Bread is the best food"], answer: 1 },
    { kind: "event", q: "What was Yusuf's first task at the bakery?", choices: ["Cleaning the floor", "Making coffee", "Shaping bread rolls", "Decorating cakes"], answer: 2 },
    { kind: "event", q: "What did the baker give Yusuf at the end?", choices: ["Money", "The first slice of his bread", "A new apron", "A recipe book"], answer: 1 },
    { kind: "vocab", q: "\"Immediately\" means…", choices: ["slowly", "later", "at once", "carefully"], answer: 2 },
    { kind: "vocab", q: "\"Patient\" means…", choices: ["fast", "able to wait calmly", "angry", "confused"], answer: 1 },
  ],
};
