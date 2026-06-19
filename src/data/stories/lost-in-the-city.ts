import type { Story } from "@/lib/types";

export const lostInTheCity: Story = {
  slug: "lost-in-the-city",
  title: "Lost in the City",
  genre: "adventure",
  level: "intermediate",
  blurb: "Sixteen-year-old Faris arrives in London alone for the first time. A wrong turn leads him somewhere unexpected.",
  cover: "🌆",
  coverHue: "from-gray-300 to-slate-500",
  minutes: 5,
  paragraphs: [
    "Faris had memorised the route: Central Line to Bank, then the DLR to the hotel. He had checked it four times on the plane. He was sixteen, and this was his first trip abroad alone.",
    "At Bank station, the crowd pushed him left instead of right. He followed the signs for the wrong line. By the time he realised the error, he was somewhere called Shadwell, with a dead phone and no idea where his hotel was.",
    "He emerged from the station into a street market. The smells were extraordinary — frying spices, rain on hot concrete, bread from a bakery two stalls over. Despite everything, he was hungry.",
    "He used the last 4% of his battery to screenshot the hotel address. Then he approached a man selling phone chargers from a folding table. \"Excuse me, do you have a charger for this? I can pay.\" The man shook his head, then looked again at Faris's face. \"You look a bit lost, mate.\"",
    "\"Very lost,\" Faris admitted. The man plugged Faris's phone into his own charger, refused any money, and explained the route using landmarks, not street names. \"Turn left at the big green mosque, go over the bridge, and you'll see the hotel sign.\"",
    "Faris found it in twenty minutes. He sat in the hotel lobby and ate the bag of nuts the market man had given him as he left. It occurred to him that being lost had shown him more of London than any map ever could.",
  ],
  vocab: {
    memorised: { ar: "حفظ / استظهر", def: "Learned and remembered perfectly.", example: "He memorised the poem for the exam." },
    emerged: { ar: "خرج / ظهر", def: "Came out from a place.", example: "She emerged from the forest at sunset." },
    extraordinary: { ar: "استثنائي / رائع", def: "Very unusual or impressive.", example: "The view from the top was extraordinary." },
    concrete: { ar: "خرسانة / إسمنت", def: "The hard building material made of cement.", example: "The path was made of cracked concrete." },
    landmark: { ar: "معلم بارز", def: "A well-known building or feature used as a reference point.", example: "The tower is a famous landmark in the city." },
    admitted: { ar: "اعترف", def: "Said that something was true, often reluctantly.", example: "He admitted he had made a mistake." },
  },
  quiz: [
    { kind: "main-idea", q: "What lesson does Faris seem to learn?", choices: ["Always charge your phone", "Getting lost can show you unexpected things", "London is dangerous for tourists", "Market sellers are always helpful"], answer: 1 },
    { kind: "event", q: "How did Faris end up in Shadwell?", choices: ["He fell asleep on the train", "The crowd pushed him to the wrong line", "He followed the wrong person", "He misread the map"], answer: 1 },
    { kind: "event", q: "What did the charger seller give Faris when he left?", choices: ["Money", "A map", "A bag of nuts", "A free charger"], answer: 2 },
    { kind: "vocab", q: "\"Landmark\" means…", choices: ["a piece of land", "a well-known feature used as a reference point", "a road sign", "a tourist map"], answer: 1 },
    { kind: "vocab", q: "\"Admitted\" means…", choices: ["refused", "said something was true, often reluctantly", "asked a question", "walked away"], answer: 1 },
  ],
};
