import type { Story } from "@/lib/types";

export const aBirthdaySurprise: Story = {
  slug: "a-birthday-surprise",
  title: "A Birthday Surprise",
  genre: "drama",
  level: "beginner",
  blurb: "Sami thinks everyone has forgotten his birthday. He is about to learn a very different lesson.",
  cover: "🎂",
  coverHue: "from-purple-200 to-pink-300",
  minutes: 3,
  paragraphs: [
    "Sami woke up on Saturday and smiled. It was his birthday. He was twelve years old. He went downstairs expecting balloons and cake.",
    "But the kitchen was empty. His mother was reading the newspaper. His father was on the phone. His sister was still asleep. Nobody said anything.",
    "At breakfast, his mother gave him plain toast and tea — not his usual birthday pancakes. He waited for someone to say something. Nobody did.",
    "He spent the morning in his room, feeling sorry for himself. \"They forgot,\" he told his football. \"They actually forgot.\"",
    "At noon his mother called him downstairs. He walked slowly. The living room was dark. Then the light came on — and fifteen of his friends and all his family shouted: \"SURPRISE!\"",
    "The table had his favourite chocolate cake with twelve candles. His sister handed him a card she had made herself. \"We have been planning this for two weeks,\" she said. Sami laughed so hard he nearly cried.",
  ],
  vocab: {
    expecting: { ar: "يتوقع", def: "Thinking that something will happen.", example: "She was expecting a call from her friend." },
    plain: { ar: "سادة / بسيط", def: "Without anything added; simple.", example: "He likes plain rice with no sauce." },
    downstairs: { ar: "الطابق الأسفل", def: "On a lower floor of a building.", example: "The kitchen is downstairs." },
    candles: { ar: "شموع", def: "Sticks of wax that are lit to give light.", example: "She blew out the candles on her cake." },
    planning: { ar: "يخطط", def: "Deciding in advance what you will do.", example: "We have been planning the trip for months." },
    surprise: { ar: "مفاجأة", def: "Something unexpected that happens.", example: "The party was a complete surprise." },
  },
  quiz: [
    { kind: "main-idea", q: "What is this story mainly about?", choices: ["A boy who does not like birthdays", "A boy who thinks his birthday is forgotten but it is not", "A family that celebrates two birthdays", "A surprise gift delivery"], answer: 1 },
    { kind: "event", q: "Why was Sami sad in the morning?", choices: ["His friends did not come to school", "He got sick", "Nobody said happy birthday", "He lost his football"], answer: 2 },
    { kind: "event", q: "How long had the family been planning the party?", choices: ["One week", "Two weeks", "A month", "Three days"], answer: 1 },
    { kind: "vocab", q: "\"Expecting\" means…", choices: ["forgetting", "thinking something will happen", "being angry", "running away"], answer: 1 },
    { kind: "vocab", q: "\"Plain\" means…", choices: ["colourful", "expensive", "simple, without extras", "sweet"], answer: 2 },
  ],
};
