import type { Story } from "@/lib/types";

export const theEmptyHouse: Story = {
  slug: "the-empty-house",
  title: "The Empty House",
  genre: "mystery",
  level: "intermediate",
  blurb: "When Dina moves into her new apartment, she finds a notebook hidden behind the wall. It belongs to someone who disappeared two years ago.",
  cover: "🏠",
  coverHue: "from-indigo-200 to-violet-400",
  minutes: 5,
  paragraphs: [
    "Dina had lived in the apartment for only three days when she noticed the loose panel behind the wardrobe. When she pulled it away, a thin notebook fell to the floor.",
    "The notebook was filled with handwriting — small, careful, slanting to the right. The first page read: \"If you find this, my name is Elias. I have been living here since March. I need you to know what happened in room 4B.\"",
    "Dina sat down on the bare floor and read. Elias described strange noises from the flat below him — regular, coded-sounding taps at specific hours. He had drawn a pattern of the sounds. He believed the elderly man in 4B was in danger.",
    "She turned the pages quickly. The last entry was dated the 14th of November, two years ago. After that, nothing.",
    "She asked the building manager about Elias. He went quiet. \"He moved away,\" the man said — but his eyes moved to the side when he said it, and he changed the subject before she could ask more.",
    "Dina put the notebook in her bag and sat at her kitchen table for a long time. She thought about whether to go to the police, or to do what Elias had apparently not done — knock on the door of 4B.",
  ],
  vocab: {
    loose: { ar: "مفكوك / رخو", def: "Not firmly fixed in place.", example: "There is a loose screw in the door handle." },
    slanting: { ar: "مائل", def: "Going at an angle, not straight up or across.", example: "The handwriting was slanting to the left." },
    elderly: { ar: "مسنّ / كبير السن", def: "Old; used politely to describe older people.", example: "The elderly man walked slowly with a cane." },
    apparently: { ar: "على ما يبدو", def: "It seems; based on what is seen or known.", example: "She was apparently not aware of the rule." },
    entry: { ar: "قيد / مدخل / تسجيل", def: "Something written in a diary or notebook.", example: "I read the last entry in her diary." },
    wardrobe: { ar: "خزانة ملابس", def: "A tall cupboard used for storing clothes.", example: "He found an old coat at the back of the wardrobe." },
  },
  quiz: [
    { kind: "main-idea", q: "What starts the mystery in this story?", choices: ["A strange neighbour", "A notebook hidden in the apartment", "A coded phone message", "A missing key"], answer: 1 },
    { kind: "event", q: "What did Elias believe about the man in 4B?", choices: ["He was very loud", "He was a thief", "He was in danger", "He was Elias's friend"], answer: 2 },
    { kind: "event", q: "What did the building manager do when asked about Elias?", choices: ["He gave Dina Elias's number", "He said Elias left and changed the subject", "He showed her Elias's room", "He said he never knew Elias"], answer: 1 },
    { kind: "vocab", q: "\"Elderly\" means…", choices: ["very young", "very loud", "old (politely)", "very tall"], answer: 2 },
    { kind: "vocab", q: "An \"entry\" in a notebook is…", choices: ["a door", "something written in it", "a locked box", "the cover page"], answer: 1 },
  ],
};
