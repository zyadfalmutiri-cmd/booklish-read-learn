import type { Story } from "@/lib/types";

export const theCoffeeBeanJourney: Story = {
  slug: "the-coffee-bean-journey",
  title: "The Journey of a Coffee Bean",
  genre: "non-fiction",
  level: "intermediate",
  blurb: "From a small red cherry on a mountain farm to the cup in your hand — the surprisingly long life of coffee.",
  cover: "☕",
  coverHue: "from-amber-300 to-amber-600",
  minutes: 5,
  tags: ["non-fiction", "short"],
  paragraphs: [
    "Every morning, millions of people drink coffee without thinking about where it comes from. But each cup is the result of a long and careful journey that begins on a small farm, often high in the mountains of Ethiopia, Colombia, or Vietnam.",
    "Coffee grows on a tree that produces small red fruits called cherries. Inside each cherry there are usually two green seeds. These seeds are what we call coffee beans. A skilled farmer picks the cherries by hand, choosing only the ripe ones, because a single unripe cherry can ruin the flavor of an entire batch.",
    "After harvesting, the beans must be separated from the fruit. Some farms use water to wash them, while others let the cherries dry in the sun. Both methods affect the final taste in different ways. The beans are then packed and shipped across the ocean to factories around the world.",
    "At the factory, the green beans are roasted. Roasting is where the magic happens. Heat transforms the beans, changing their color, smell, and flavor. A light roast tastes bright and fruity, while a dark roast tastes bold and slightly bitter.",
    "Finally, the roasted beans reach a café or a kitchen. They are ground into powder, mixed with hot water, and poured into a cup. From a tiny seed on a distant hillside to your morning ritual, the journey of a coffee bean connects farmers, traders, roasters, and you.",
  ],
  vocab: {
    cherries: { ar: "كرز", def: "Small round fruits; here, the fruit of the coffee tree.", example: "The coffee cherries turn red when ripe." },
    ripe: { ar: "ناضج", def: "Fully grown and ready to be picked or eaten.", example: "These mangoes are perfectly ripe." },
    harvesting: { ar: "حصاد", def: "Picking crops when they are ready.", example: "Harvesting begins in autumn." },
    roasted: { ar: "محمص", def: "Cooked with dry heat.", example: "She roasted the nuts in the oven." },
    transforms: { ar: "يحوّل", def: "Completely changes the form of something.", example: "Education transforms lives." },
    bitter: { ar: "مر", def: "Having a sharp, often unpleasant taste.", example: "Dark chocolate can taste bitter." },
    journey: { ar: "رحلة", def: "A long trip from one place to another.", example: "Her journey took three months." },
    ritual: { ar: "طقس", def: "A regular action done in the same way each time.", example: "Morning tea is part of his ritual." },
  },
  quiz: [
    { kind: "main-idea", q: "What is this article mainly about?", choices: ["How to grow tea", "The long journey from coffee farm to cup", "The history of cafés", "Why coffee is unhealthy"], answer: 1 },
    { kind: "event", q: "What is inside a coffee cherry?", choices: ["A single brown bean", "Usually two green seeds", "A flower", "Sugar"], answer: 1 },
    { kind: "event", q: "What does roasting change about the beans?", choices: ["Only their size", "Their color, smell, and flavor", "Only their price", "Nothing important"], answer: 1 },
    { kind: "vocab", q: "\"Ripe\" means…", choices: ["dry and old", "ready to be picked", "very small", "bitter"], answer: 1 },
    { kind: "vocab", q: "A \"ritual\" is…", choices: ["a one-time event", "a regular repeated action", "a kind of food", "a type of farm"], answer: 1 },
  ],
};
