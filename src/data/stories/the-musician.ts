import type { Story } from "@/lib/types";

export const theMusician: Story = {
  slug: "the-musician",
  title: "The Musician",
  genre: "drama",
  level: "intermediate",
  blurb: "Hassan has been playing oud for twelve years but has never performed in public. Tonight, everything changes — whether he is ready or not.",
  cover: "🎵",
  coverHue: "from-yellow-200 to-amber-400",
  minutes: 5,
  paragraphs: [
    "Hassan had been playing the oud since he was nine. He had learned from his uncle in Alexandria, then from recordings, then from twelve years of practice that filled the apartment with sound every evening from seven to nine.",
    "He had never performed in public. Not once. His sister had asked him to play at her wedding four years ago, and he had declined. He had told her that the oud was a private instrument — a way of thinking, not a performance.",
    "But then the music school had contacted him. They needed a substitute for a player who had fallen ill. The concert was in three days. His name had been given by his old teacher.",
    "He almost said no. He typed the reply twice. Both times he deleted it and stared at the ceiling. On the third attempt, he said yes.",
    "The night of the concert, standing backstage, he felt something he recognised from years ago: the particular kind of fear that is very close to longing. The audience was small — perhaps sixty people — but to Hassan it sounded like thousands.",
    "He walked out. He sat. He placed his fingers on the strings and, for a moment, forgot what he was supposed to play. Then the muscle memory in his hands took over. When the first note sounded, it was exactly right. The room went quiet — not the quiet of emptiness, but the quiet of attention. Hassan played for thirty-five minutes. He did not make a single error. Walking off stage, he thought: I should have done this years ago.",
  ],
  vocab: {
    declined: { ar: "رفض / اعتذر", def: "Politely refused.", example: "She declined the invitation due to illness." },
    substitute: { ar: "بديل", def: "A person who takes the place of another.", example: "The substitute teacher arrived at nine." },
    longing: { ar: "شوق / تلهّف", def: "A strong feeling of wanting something.", example: "He felt a longing to return home." },
    backstage: { ar: "خلف الكواليس", def: "The area behind the stage, not seen by the audience.", example: "The musicians waited backstage before the show." },
    muscle_memory: { ar: "ذاكرة العضلات", def: "The ability to do something automatically after much practice.", example: "After years of training, it became muscle memory." },
    substitute2: { ar: "حلّ محل", def: "Took someone else's role or place.", example: "He substituted for the lead actor at the last minute." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main conflict in this story?", choices: ["Hassan cannot play well", "Hassan has to overcome his fear of public performance", "Hassan's oud is broken", "The concert is cancelled"], answer: 1 },
    { kind: "event", q: "Why had Hassan never performed in public before?", choices: ["He was not good enough", "He thought the oud was a private instrument", "He was afraid of making mistakes", "His teacher had forbidden it"], answer: 1 },
    { kind: "event", q: "What happened when Hassan forgot what to play?", choices: ["He left the stage", "His hands played automatically from muscle memory", "He asked the audience for help", "He played the wrong piece"], answer: 1 },
    { kind: "vocab", q: "\"Declined\" means…", choices: ["agreed", "forgot", "politely refused", "asked for help"], answer: 2 },
    { kind: "vocab", q: "\"Longing\" means…", choices: ["fear", "a strong feeling of wanting something", "happiness", "surprise"], answer: 1 },
  ],
};
