import type { Story } from "@/lib/types";

export const whyWeDream: Story = {
  slug: "why-we-dream",
  title: "Why Do We Dream?",
  genre: "non-fiction",
  level: "advanced",
  blurb: "Scientists still argue about the purpose of dreams. Here is what we currently know — and what remains mysterious.",
  cover: "🌙",
  coverHue: "from-indigo-300 to-purple-500",
  minutes: 7,
  tags: ["non-fiction"],
  paragraphs: [
    "Every night, the human brain produces a private film that no one else can see. Some of these films are vivid and emotional; others are vague and quickly forgotten. We call them dreams, and despite decades of research, scientists still do not fully agree on why we have them.",
    "Most dreaming occurs during a phase of sleep called REM, short for Rapid Eye Movement. During REM, the brain becomes almost as active as it is when we are awake. The body, however, is temporarily paralysed, which prevents us from physically acting out our dreams. This paralysis is one of the most curious safety mechanisms in human biology.",
    "One popular theory suggests that dreams help us process emotions. Difficult experiences — an argument, a fear, a loss — may be replayed in symbolic form, allowing the brain to make sense of them at a safe distance. People who are deprived of REM sleep often report feeling more anxious and less able to regulate their feelings.",
    "Another theory proposes that dreams strengthen memory. While we sleep, the brain appears to sort through the day's information, keeping what matters and discarding what does not. Dreams may be a byproduct of this nightly housekeeping, like sparks rising from a fire.",
    "Yet not every dream feels meaningful, and some researchers argue that many dreams are essentially random noise — the brain interpreting its own internal signals. Perhaps all of these explanations are partly true. The mystery of dreaming may turn out to be a mystery of consciousness itself, and that is a far larger puzzle.",
  ],
  vocab: {
    vivid: { ar: "حي / واضح", def: "Producing strong, clear images in the mind.", example: "I had a vivid dream about flying." },
    vague: { ar: "غامض", def: "Not clear or definite.", example: "Her memory of the night was vague." },
    paralysed: { ar: "مشلول", def: "Unable to move.", example: "He was paralysed by fear for a moment." },
    mechanisms: { ar: "آليات", def: "Systems or processes that produce a particular result.", example: "The body has many defence mechanisms." },
    symbolic: { ar: "رمزي", def: "Representing something else through a symbol.", example: "The ring is a symbolic gift." },
    deprived: { ar: "محروم", def: "Not allowed to have something needed.", example: "Children deprived of sleep struggle in school." },
    discarding: { ar: "التخلص من", def: "Throwing away as no longer useful.", example: "The editor was discarding old drafts." },
    consciousness: { ar: "الوعي", def: "The state of being aware of yourself and the world.", example: "She slowly regained consciousness." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the main point of this article?", choices: ["Dreams predict the future", "Science has several theories about why we dream but no final answer", "Only nightmares are important", "Everyone dreams the same thing"], answer: 1 },
    { kind: "event", q: "During REM sleep, the body is…", choices: ["very active", "temporarily paralysed", "completely cold", "in motion"], answer: 1 },
    { kind: "event", q: "One theory says dreams help us…", choices: ["lose weight", "process emotions and memory", "grow taller", "speak new languages"], answer: 1 },
    { kind: "vocab", q: "\"Vivid\" most nearly means…", choices: ["unclear", "clear and intense", "boring", "short"], answer: 1 },
    { kind: "vocab", q: "Someone \"deprived\" of sleep is…", choices: ["given extra sleep", "not allowed enough sleep", "afraid of sleep", "good at sleeping"], answer: 1 },
  ],
};
