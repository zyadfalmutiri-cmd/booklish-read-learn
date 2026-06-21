import type { Story } from "@/lib/types";

export const theKindStranger: Story = {
  slug: "the-kind-stranger",
  title: "The Kind Stranger",
  genre: "drama",
  level: "beginner",
  blurb: "Hana misses her bus stop and is lost in an unfamiliar neighborhood. A stranger's small kindness shows her the way.",
  cover: "🗺️",
  coverHue: "from-teal-200 to-green-300",
  minutes: 3,
  paragraphs: [
    "Hana was reading on the bus when she looked up and realized she did not recognise the street outside. She had missed her stop.",
    "She got off at the next stop. The neighborhood was quiet. The street names were unfamiliar. Her phone battery was at two percent.",
    "She walked slowly, looking for someone to ask. Most people were inside their homes. Then she saw an old man watering the flowers in front of his house.",
    "\"Excuse me,\" she said. \"I am lost. I am trying to get to Maple Street.\" The man looked at her kindly. \"Maple Street? That is far for walking. But the number 7 bus from the corner will take you there in ten minutes.\"",
    "He pointed to the corner. Then he went inside and came back with a small card. \"This is my number. If you cannot find the bus, call me. My granddaughter works near Maple Street.\"",
    "Hana found the bus. When she finally got home, she thought about the old man. He did not know her. But he had treated her like a neighbour.",
  ],
  vocab: {
    recognised: { ar: "تعرّف على", def: "Identified someone or something from before.", example: "I recognised his voice on the phone." },
    unfamiliar: { ar: "غير مألوف", def: "Not known; strange.", example: "She was in an unfamiliar city." },
    neighbourhood: { ar: "حي / جيرة", def: "An area in a town or city where people live.", example: "It is a quiet neighbourhood." },
    watering: { ar: "يسقي", def: "Giving water to plants.", example: "He is watering the garden every morning." },
    treated: { ar: "تعامل مع", def: "Behaved towards someone in a certain way.", example: "She treated everyone with respect." },
    battery: { ar: "بطارية", def: "The part of a device that stores power.", example: "My phone battery is almost dead." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main theme of this story?", choices: ["Technology and phones", "The danger of buses", "A stranger's kindness", "City life"], answer: 2 },
    { kind: "event", q: "Why did Hana get off the bus?", choices: ["The bus broke down", "She missed her stop", "A stranger told her to", "The bus was too crowded"], answer: 1 },
    { kind: "event", q: "What did the old man give Hana?", choices: ["Money", "A map", "His phone number", "A flower"], answer: 2 },
    { kind: "vocab", q: "\"Unfamiliar\" means…", choices: ["very clean", "not known or strange", "very old", "near your home"], answer: 1 },
    { kind: "vocab", q: "\"Recognised\" means you…", choices: ["forgot something", "identified something you knew before", "walked somewhere", "asked a question"], answer: 1 },
  ],
};
