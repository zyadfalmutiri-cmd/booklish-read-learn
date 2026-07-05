import type { Story } from "@/lib/types";

export const theHikingAccident: Story = {
  slug: "the-hiking-accident",
  title: "The Hiking Accident",
  genre: "adventure",
  level: "intermediate",
  cefr: "B1",
  blurb: "A group of friends face an unexpected emergency during a mountain hike, testing their teamwork under pressure.",
  cover: "⛰️",
  coverHue: "from-green-200 to-teal-300",
  minutes: 5,
  paragraphs: [
  "Four friends set out early in the morning to hike a well-known mountain trail, expecting an easy day of walking and photography.",
  "Midway through the hike, Layth slipped on loose rocks and twisted his ankle badly. He could not stand up without help.",
  "There was no phone signal on the mountain, and the nearest village was over two hours away by foot.",
  "The group had to think quickly. Two friends stayed with Layth while the other two hurried down to find help.",
  "They found a small ranger station near the base of the trail and explained the emergency. A rescue team arrived within the hour.",
  "Layth's ankle was badly sprained but not broken. The friends later agreed that the experience had taught them the true value of staying calm under pressure."
  ],
  vocab: {
  "trail": {
    "ar": "مسار / درب",
    "def": "A path used for walking or hiking.",
    "example": "They followed the mountain trail."
  },
  "slipped": {
    "ar": "انزلق",
    "def": "Lost balance suddenly and fell or almost fell.",
    "example": "She slipped on the ice."
  },
  "twisted": {
    "ar": "لوى / التوى",
    "def": "Injured a joint by turning it sharply.",
    "example": "He twisted his ankle playing football."
  },
  "ranger station": {
    "ar": "مركز حراسة الغابة",
    "def": "A small office where park staff work.",
    "example": "They reported the accident to the ranger station."
  },
  "sprained": {
    "ar": "ملتوٍ / مصاب بالتواء",
    "def": "Injured a joint without breaking a bone.",
    "example": "Her wrist was sprained, not broken."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is this story mainly about?",
    "choices": [
      "A relaxing vacation",
      "Handling an emergency during a hike",
      "Learning to hike",
      "A mountain competition"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What happened to Layth?",
    "choices": [
      "He got lost",
      "He twisted his ankle",
      "He fell off a cliff",
      "He ran out of water"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "How did the group get help?",
    "choices": [
      "They called for help on their phones",
      "Two friends went to find a ranger station",
      "They waited for another hiker",
      "They carried Layth all the way down"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Slipped\" means…",
    "choices": [
      "walked slowly",
      "lost balance suddenly",
      "stopped moving",
      "jumped high"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Sprained\" describes an injury to a joint that is…",
    "choices": [
      "broken",
      "injured without breaking a bone",
      "completely healed",
      "invisible"
    ],
    "answer": 1
  }
],
};
