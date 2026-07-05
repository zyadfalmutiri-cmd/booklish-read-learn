import type { Story } from "@/lib/types";

export const aMisunderstanding: Story = {
  slug: "a-misunderstanding",
  title: "A Misunderstanding",
  genre: "drama",
  level: "intermediate",
  cefr: "B1",
  blurb: "A text message sent to the wrong person almost ends a friendship, until an honest conversation clears the air.",
  cover: "💬",
  coverHue: "from-red-200 to-rose-300",
  minutes: 5,
  paragraphs: [
  "Lina was frustrated with her friend Huda after a group project went badly. She wrote an angry message about it to complain to another friend.",
  "By mistake, she sent the message directly to Huda instead of the friend she intended to complain to.",
  "Huda read the harsh words and felt deeply hurt. She stopped replying to Lina's messages for several days.",
  "Lina realized her mistake almost immediately, but she was too embarrassed to admit what had happened, so she said nothing at first.",
  "After a week of silence, Lina finally gathered the courage to call Huda and explain honestly what had occurred, apologizing sincerely.",
  "Huda was still hurt, but she appreciated Lina's honesty. Slowly, through patient conversation, their friendship began to recover."
  ],
  vocab: {
  "frustrated": {
    "ar": "محبط / منزعج",
    "def": "Feeling annoyed because of difficulty or failure.",
    "example": "She was frustrated with the slow internet."
  },
  "intended": {
    "ar": "قصد / نوى",
    "def": "Planned or meant to do something.",
    "example": "He intended to call her later."
  },
  "harsh": {
    "ar": "قاسٍ",
    "def": "Unpleasantly severe or critical.",
    "example": "His words were harsh and unkind."
  },
  "embarrassed": {
    "ar": "محرج",
    "def": "Feeling ashamed or awkward.",
    "example": "She felt embarrassed about her mistake."
  },
  "sincerely": {
    "ar": "بصدق",
    "def": "In a genuine, honest way.",
    "example": "He apologized sincerely."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A group project failure",
      "Repairing a friendship after a mistake",
      "Learning to use technology",
      "A disagreement about school"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What mistake did Lina make?",
    "choices": [
      "She lost Huda's phone",
      "She sent an angry message to the wrong person",
      "She forgot Huda's birthday",
      "She missed a meeting"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did Lina finally fix the situation?",
    "choices": [
      "She ignored it",
      "She called and apologized honestly",
      "She sent a gift",
      "She avoided Huda"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Embarrassed\" means feeling…",
    "choices": [
      "proud",
      "ashamed or awkward",
      "excited",
      "angry"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Sincerely\" means in a…",
    "choices": [
      "fake way",
      "genuine, honest way",
      "careless way",
      "funny way"
    ],
    "answer": 1
  }
],
};
