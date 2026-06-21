import type { Story } from "@/lib/types";

export const theOldPhotograph: Story = {
  slug: "the-old-photograph",
  title: "The Old Photograph",
  genre: "drama",
  level: "intermediate",
  blurb: "While clearing his late father's house, Tariq finds a photograph of a woman he does not recognise — and a half-written letter that changes what he knows about his family.",
  cover: "📷",
  coverHue: "from-stone-200 to-amber-400",
  minutes: 6,
  paragraphs: [
    "Tariq had been in the house for three days, sorting through forty years of a life. Books donated. Clothes folded. Furniture tagged for collection. He moved through each room with the systematic calm he used at work — it was easier than feeling.",
    "The photograph was in the bottom drawer of the writing desk, beneath a stack of old utility bills. It showed a woman, perhaps thirty years old, standing in front of a building Tariq did not know. She was laughing, her face tilted toward the camera. On the back, in his father's handwriting: 'Nour. Marrakech. 1979.'",
    "His father had married his mother in 1985. Tariq sat with the photograph for a long time.",
    "In the same drawer, he found a letter — half written, never sent. It began: 'Dear Nour, I thought I had made peace with this, but today I heard a song you once sang in the kitchen and I wanted to tell you—' It stopped mid-sentence.",
    "Tariq put the photograph and the unfinished letter in his jacket pocket. He did not show them to his mother or his sister. There was nothing to show, he told himself. There was only a photograph and a sentence that never ended.",
    "On the plane home, he looked at Nour's face again. She looked happy. His father had kept this for forty years. That meant something — he was just not sure what, or whether it was his to know.",
  ],
  vocab: {
    systematic: { ar: "منهجي / منظم", def: "Done according to a fixed plan; organized.", example: "She took a systematic approach to the problem." },
    utility: { ar: "خدمة (كهرباء / ماء)", def: "A service such as electricity, water, or gas.", example: "He paid all his utility bills on time." },
    tilted: { ar: "مائل", def: "Leaning to one side at an angle.", example: "She tilted her head and smiled." },
    donated: { ar: "تبرّع به", def: "Given to charity or someone in need.", example: "He donated his old books to the school." },
    unfinished: { ar: "غير مكتمل", def: "Not completed.", example: "The unfinished painting was still on the easel." },
    made_peace: { ar: "تصالح مع", def: "Accepted something difficult and moved on.", example: "It took years, but she made peace with the decision." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the central theme of this story?", choices: ["A man looking for treasure", "A son discovering an unknown part of his father's past", "A woman searching for her family", "A mystery that gets solved"], answer: 1 },
    { kind: "event", q: "Where did Tariq find the photograph?", choices: ["In a book", "In the bottom drawer of the writing desk", "Under the bed", "In his father's coat pocket"], answer: 1 },
    { kind: "event", q: "What did Tariq do with the photograph?", choices: ["Showed it to his mother", "Threw it away", "Put it in his pocket and kept it to himself", "Posted it online"], answer: 2 },
    { kind: "vocab", q: "\"Systematic\" means…", choices: ["random", "organized and following a plan", "emotional", "fast"], answer: 1 },
    { kind: "vocab", q: "\"Unfinished\" means…", choices: ["very beautiful", "not completed", "very old", "written in pencil"], answer: 1 },
  ],
};
