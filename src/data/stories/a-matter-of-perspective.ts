import type { Story } from "@/lib/types";

export const aMatterOfPerspective: Story = {
  slug: "a-matter-of-perspective",
  title: "A Matter of Perspective",
  genre: "drama",
  level: "advanced",
  cefr: "C1",
  blurb: "Two colleagues recount the same failed project so differently that a mediator begins to question whether objective truth is attainable in workplace disputes.",
  cover: "🔀",
  coverHue: "from-blue-200 to-slate-300",
  minutes: 7,
  paragraphs: [
  "When the quarterly project collapsed spectacularly, management commissioned an internal review to determine what had gone wrong and, implicitly, who bore responsibility.",
  "Nasser's account emphasized a chronic lack of resources and unrealistic deadlines imposed from above, framing himself as a diligent employee undone by systemic failures beyond his control.",
  "Huda, his direct collaborator, described an almost identical timeline of events, yet attributed the failure primarily to Nasser's disorganization and reluctance to delegate tasks appropriately.",
  "The mediator assigned to the case found herself increasingly unsettled, not by any evident dishonesty, but by the sincere conviction with which each party defended a fundamentally incompatible narrative.",
  "Neither account was demonstrably false; rather, each had selectively emphasized details that cohered with their own sense of professional identity and self-preservation.",
  "The mediator ultimately concluded that reconciling the two versions was less important than acknowledging a more uncomfortable truth: that institutional failures rarely have a single author, however desperately organizations crave one."
  ],
  vocab: {
  "commissioned": {
    "ar": "كلّف / أمر بإجراء",
    "def": "Officially requested that something be done.",
    "example": "The company commissioned an investigation."
  },
  "chronic": {
    "ar": "مزمن",
    "def": "Persisting for a long time; constantly recurring.",
    "example": "They faced chronic funding shortages."
  },
  "delegate": {
    "ar": "يفوّض",
    "def": "To assign responsibility or tasks to another person.",
    "example": "A good manager knows how to delegate."
  },
  "cohered": {
    "ar": "تماسك / انسجم",
    "def": "Formed a united, logically consistent whole.",
    "example": "Her argument cohered well with the evidence."
  },
  "self-preservation": {
    "ar": "حفظ الذات",
    "def": "The protection of oneself, especially one's reputation or wellbeing.",
    "example": "His account was shaped by self-preservation."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What does this passage primarily illustrate?",
    "choices": [
      "A clear case of workplace dishonesty",
      "How subjective perspective shapes conflicting but sincere accounts",
      "The importance of deadlines",
      "A successful team project"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What did Nasser's account emphasize?",
    "choices": [
      "His own disorganization",
      "Systemic failures and unrealistic deadlines",
      "Huda's incompetence",
      "A lack of interest in the project"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What conclusion did the mediator ultimately reach?",
    "choices": [
      "Nasser was entirely at fault",
      "Institutional failures rarely have a single author",
      "Huda had lied",
      "No conclusion was possible"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Chronic\" describes something that…",
    "choices": [
      "happens once",
      "persists for a long time",
      "is completely resolved",
      "is very rare"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Delegate\" means to…",
    "choices": [
      "complete a task alone",
      "assign responsibility to another person",
      "refuse a task",
      "criticize a colleague"
    ],
    "answer": 1
  }
],
};
