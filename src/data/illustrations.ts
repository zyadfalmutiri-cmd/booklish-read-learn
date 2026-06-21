import type { StoryScene } from "@/lib/types";

function u(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=680&q=75&auto=format&fit=crop`;
}

export const storyScenes: Record<string, StoryScene[]> = {
  "the-missing-key": [
    {
      afterParagraph: 0,
      src: u("1481627834876-b7833e8f5570"),
      alt: "An old wooden box on a table",
      caption: "wooden · خشبي — made of wood",
    },
    {
      afterParagraph: 5,
      src: u("1502920514313-52581002a659"),
      alt: "An old black and white photograph",
      caption: "photograph · صورة — a picture taken with a camera",
    },
  ],

  "the-lost-dog": [
    {
      afterParagraph: 0,
      src: u("1587300003388-59208cc962cb"),
      alt: "A friendly dog looking up",
      caption: "lost · ضائع — not able to be found",
    },
    {
      afterParagraph: 3,
      src: u("1441974231531-c6227db76b6e"),
      alt: "A sunny park with green trees",
      caption: "park · حديقة — a public garden or open area",
    },
  ],

  "the-night-bus": [
    {
      afterParagraph: 0,
      src: u("1524758631624-e2822e304c36"),
      alt: "City lights at night through a window",
      caption: "traveller · مسافر — someone who is travelling",
    },
    {
      afterParagraph: 3,
      src: u("1449824913935-59a10b8d2000"),
      alt: "An empty city street at night",
      caption: "stranger · غريب — a person you do not know",
    },
  ],

  "the-rivers-edge": [
    {
      afterParagraph: 0,
      src: u("1441974231531-c6227db76b6e"),
      alt: "A river flowing through a forest",
      caption: "edge · حافة — the border or side of something",
    },
    {
      afterParagraph: 3,
      src: u("1506905925346-21bda4d32df4"),
      alt: "A forest path near water",
      caption: "discover · يكتشف — to find something for the first time",
    },
  ],

  "the-blue-bicycle": [
    {
      afterParagraph: 0,
      src: u("1485965120184-e220f721d03e"),
      alt: "A bicycle leaning against a wall",
      caption: "bicycle · دراجة — a vehicle with two wheels",
    },
    {
      afterParagraph: 2,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Two people talking and smiling",
      caption: "gift · هدية — something given to someone with kindness",
    },
  ],

  "the-broken-window": [
    {
      afterParagraph: 0,
      src: u("1558618666-fcd25c85cd64"),
      alt: "An old house with windows",
      caption: "broken · مكسور — not working; damaged",
    },
  ],

  "the-clock-tower": [
    {
      afterParagraph: 0,
      src: u("1508672019048-805c876b67e2"),
      alt: "An old clock tower in a town",
      caption: "tower · برج — a tall, narrow building",
    },
    {
      afterParagraph: 3,
      src: u("1449824913935-59a10b8d2000"),
      alt: "A quiet town square",
      caption: "mystery · لغز — something difficult to explain",
    },
  ],

  "the-coffee-bean-journey": [
    {
      afterParagraph: 0,
      src: u("1447933601403-0c6688de566e"),
      alt: "Coffee beans and a cup of coffee",
      caption: "bean · حبة — the seed of a plant",
    },
    {
      afterParagraph: 2,
      src: u("1556909114-f6e7ad7d3136"),
      alt: "A warm kitchen with cooking aromas",
      caption: "roast · يحمص — to cook with dry heat",
    },
  ],

  "the-empty-house": [
    {
      afterParagraph: 0,
      src: u("1558618666-fcd25c85cd64"),
      alt: "An empty house with dusty rooms",
      caption: "empty · فارغ — containing nothing",
    },
  ],

  "the-kind-stranger": [
    {
      afterParagraph: 0,
      src: u("1449824913935-59a10b8d2000"),
      alt: "A busy city street with many people",
      caption: "stranger · غريب — a person you do not know",
    },
    {
      afterParagraph: 2,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Two people helping each other",
      caption: "kind · لطيف — generous and caring about others",
    },
  ],

  "the-last-library": [
    {
      afterParagraph: 0,
      src: u("1507842217343-583bb7270b66"),
      alt: "A grand library with tall bookshelves",
      caption: "library · مكتبة — a place where books are kept",
    },
    {
      afterParagraph: 3,
      src: u("1462331940025-496dfbfc7564"),
      alt: "A futuristic cityscape at night",
      caption: "future · مستقبل — the time that is to come",
    },
  ],

  "the-last-train-home": [
    {
      afterParagraph: 0,
      src: u("1474487548417-781cb6d646df"),
      alt: "A train at a station at night",
      caption: "train · قطار — a vehicle that runs on railway tracks",
    },
    {
      afterParagraph: 2,
      src: u("1515694346937-94d85e41e695"),
      alt: "Rain falling on a window at night",
      caption: "journey · رحلة — an act of travelling from one place to another",
    },
  ],

  "the-little-bird": [
    {
      afterParagraph: 0,
      src: u("1444464833747-a2b1f3d3fc51"),
      alt: "A small colorful bird on a branch",
      caption: "bird · طائر — a feathered animal that can usually fly",
    },
    {
      afterParagraph: 3,
      src: u("1441974231531-c6227db76b6e"),
      alt: "Green trees in bright sunlight",
      caption: "free · حر — able to do what you want",
    },
  ],

  "the-marathon": [
    {
      afterParagraph: 0,
      src: u("1571008887538-b36bb32f4571"),
      alt: "Runners at the start of a marathon race",
      caption: "marathon · ماراثون — a long running race of 42 km",
    },
    {
      afterParagraph: 3,
      src: u("1532183028604-a5441e5db08b"),
      alt: "Running shoes on a road",
      caption: "finish · ينهي — to reach the end of something",
    },
  ],

  "the-musician": [
    {
      afterParagraph: 0,
      src: u("1511379938547-c1f69419868d"),
      alt: "A musician playing guitar on a stage",
      caption: "musician · موسيقي — a person who plays music",
    },
  ],

  "the-old-photograph": [
    {
      afterParagraph: 0,
      src: u("1502920514313-52581002a659"),
      alt: "An old black and white photograph in a frame",
      caption: "photograph · صورة فوتوغرافية — a picture taken with a camera",
    },
    {
      afterParagraph: 2,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Two people looking at a photograph together",
      caption: "memory · ذاكرة — something remembered from the past",
    },
  ],

  "the-painter-upstairs": [
    {
      afterParagraph: 0,
      src: u("1579783901586-d88db74b4fe4"),
      alt: "Colorful paintings in an art studio",
      caption: "painter · رسام — a person who paints pictures",
    },
  ],

  "the-rainy-afternoon": [
    {
      afterParagraph: 0,
      src: u("1515694346937-94d85e41e695"),
      alt: "Rain drops falling on a window",
      caption: "rain · مطر — water falling from clouds",
    },
    {
      afterParagraph: 2,
      src: u("1507842217343-583bb7270b66"),
      alt: "A book and tea on a table near a window",
      caption: "afternoon · بعد الظهر — the time between midday and evening",
    },
  ],

  "a-birthday-surprise": [
    {
      afterParagraph: 0,
      src: u("1464349153735-7db50ed83c84"),
      alt: "A birthday cake with lit candles",
      caption: "birthday · عيد ميلاد — the day you were born",
    },
    {
      afterParagraph: 2,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Friends gathered together celebrating",
      caption: "surprise · مفاجأة — something unexpected and pleasant",
    },
  ],

  "a-letter-from-paris": [
    {
      afterParagraph: 0,
      src: u("1502602898657-3e91760cbb34"),
      alt: "The Eiffel Tower in Paris on a clear day",
      caption: "Paris · باريس — the capital city of France",
    },
    {
      afterParagraph: 2,
      src: u("1502920514313-52581002a659"),
      alt: "A handwritten letter on a table",
      caption: "letter · رسالة — a written message sent to someone",
    },
  ],

  "a-new-friend": [
    {
      afterParagraph: 0,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Two people meeting for the first time and smiling",
      caption: "friend · صديق — a person you like and enjoy spending time with",
    },
  ],

  "a-strange-discovery": [
    {
      afterParagraph: 0,
      src: u("1462331940025-496dfbfc7564"),
      alt: "A mysterious glowing light in darkness",
      caption: "discover · يكتشف — to find or learn something for the first time",
    },
    {
      afterParagraph: 2,
      src: u("1518495973542-4542c06a5843"),
      alt: "A dreamy misty forest with light",
      caption: "strange · غريب — unusual or surprising",
    },
  ],

  "between-two-worlds": [
    {
      afterParagraph: 0,
      src: u("1449824913935-59a10b8d2000"),
      alt: "A city skyline at sunset",
      caption: "world · عالم — a place or way of life",
    },
  ],

  "echoes-of-mars": [
    {
      afterParagraph: 0,
      src: u("1614314107768-6018061b5b72"),
      alt: "A red rocky landscape like Mars",
      caption: "planet · كوكب — a large body that orbits a star",
    },
    {
      afterParagraph: 2,
      src: u("1462331940025-496dfbfc7564"),
      alt: "Stars in the night sky seen from another world",
      caption: "echo · صدى — a sound that is heard again after it reflects",
    },
  ],

  "first-day": [
    {
      afterParagraph: 0,
      src: u("1580582932707-520aed937b7b"),
      alt: "A school hallway on the first day",
      caption: "first · أول — coming before all others",
    },
    {
      afterParagraph: 2,
      src: u("1529156069898-49953e39b3ac"),
      alt: "Students talking to each other",
      caption: "nervous · متوتر — worried or anxious about something",
    },
  ],

  "grandmothers-recipe": [
    {
      afterParagraph: 0,
      src: u("1556909114-f6e7ad7d3136"),
      alt: "A warm family kitchen with herbs and spices",
      caption: "recipe · وصفة — a list of steps for making food",
    },
    {
      afterParagraph: 2,
      src: u("1447933601403-0c6688de566e"),
      alt: "Fresh herbs and ingredients on a wooden table",
      caption: "ingredient · مكوّن — one item used to make a dish",
    },
  ],

  "letters-from-the-lighthouse": [
    {
      afterParagraph: 0,
      src: u("1508193638397-1c4234db14d8"),
      alt: "A lighthouse standing by the sea",
      caption: "lighthouse · منارة — a tall tower with a bright light for ships",
    },
    {
      afterParagraph: 3,
      src: u("1515694346937-94d85e41e695"),
      alt: "Rain and waves on a stormy coast",
      caption: "storm · عاصفة — a period of very bad weather",
    },
  ],

  "lost-in-the-city": [
    {
      afterParagraph: 0,
      src: u("1449824913935-59a10b8d2000"),
      alt: "A busy city street with tall buildings",
      caption: "city · مدينة — a large and busy town",
    },
    {
      afterParagraph: 2,
      src: u("1524758631624-e2822e304c36"),
      alt: "City lights and street signs at night",
      caption: "lost · ضائع — not able to find the way",
    },
  ],

  "why-we-dream": [
    {
      afterParagraph: 0,
      src: u("1518495973542-4542c06a5843"),
      alt: "A dreamy misty landscape at night",
      caption: "dream · حلم — images or feelings experienced during sleep",
    },
    {
      afterParagraph: 2,
      src: u("1462331940025-496dfbfc7564"),
      alt: "Stars and the night sky",
      caption: "brain · دماغ — the organ inside your head that controls thought",
    },
  ],

  "the-inheritance": [
    {
      afterParagraph: 0,
      src: u("1568605114967-8130f3a36994"),
      alt: "An old family house with a large garden",
      caption: "inherit · يرث — to receive something from someone who has died",
    },
  ],
};
