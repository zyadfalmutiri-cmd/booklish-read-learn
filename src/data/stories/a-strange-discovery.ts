import type { Story } from "@/lib/types";

export const aStrangeDiscovery: Story = {
  slug: "a-strange-discovery",
  title: "A Strange Discovery",
  genre: "mystery",
  level: "intermediate",
  blurb: "A marine biologist finds something in the deep ocean that has no scientific explanation — yet.",
  cover: "🔬",
  coverHue: "from-cyan-200 to-blue-500",
  minutes: 5,
  paragraphs: [
    "Dr Amara had been studying deep-sea creatures for eleven years when her team pulled up the sample. The creature was translucent — completely see-through — and approximately forty centimetres long. No fins. No eyes. No features she could classify.",
    "The ROV camera had filmed it at 3,800 metres below the surface, in complete darkness. The team watched the footage three times. Nobody spoke.",
    "\"It's probably a new species of salp,\" said her colleague Marco, eventually. He said it with the slightly too-confident tone of someone who was not entirely sure. Amara photographed the specimen from every angle.",
    "Back in the lab, she ran every standard identification test. The creature's DNA was unlike anything in the database — not even a distant relative. Its tissue samples contained structures that resembled plant cells more than animal ones.",
    "She wrote her initial report carefully, using hedged language — 'consistent with', 'appears to suggest', 'requires further study'. The last thing she wanted was to make a large claim she couldn't support.",
    "But at night, when she reviewed the footage alone, she let herself think the thing she would not write: nothing about this creature fit anything she had ever studied. And she had been studying the ocean for eleven years.",
  ],
  vocab: {
    translucent: { ar: "شفاف", def: "Allowing light to pass through but not perfectly clear.", example: "The translucent fabric let in soft light." },
    specimen: { ar: "عينة / نموذج", def: "A sample of something, used for study.", example: "The biologist preserved the specimen in glass." },
    colleague: { ar: "زميل", def: "A person you work with.", example: "She discussed the results with her colleague." },
    hedged: { ar: "محتاط / مُتحفّظ", def: "Used careful language to avoid making strong claims.", example: "He hedged his opinion to avoid controversy." },
    classify: { ar: "يصنّف", def: "To put something into a category.", example: "Scientists classify animals by their characteristics." },
    footage: { ar: "لقطات فيديو", def: "Recorded video material.", example: "The security footage showed the whole event." },
  },
  quiz: [
    { kind: "main-idea", q: "What is Dr Amara's main reaction to the discovery?", choices: ["She immediately tells the media", "She is cautious but privately astounded", "She identifies it as a known species", "She hands it over to a colleague"], answer: 1 },
    { kind: "event", q: "What did the DNA tests show?", choices: ["It was a known species of salp", "It had no DNA at all", "It didn't match anything in the database", "It was plant DNA"], answer: 2 },
    { kind: "event", q: "Why did Amara use 'hedged language' in her report?", choices: ["She was not a good writer", "She wanted to be cautious and avoid unsupported claims", "Her colleague told her to", "The language was required by the journal"], answer: 1 },
    { kind: "vocab", q: "\"Translucent\" means…", choices: ["completely invisible", "allowing light through but not perfectly clear", "very dark", "extremely small"], answer: 1 },
    { kind: "vocab", q: "A \"specimen\" is…", choices: ["a type of sea creature", "a sample used for scientific study", "a camera", "a deep-sea location"], answer: 1 },
  ],
};
