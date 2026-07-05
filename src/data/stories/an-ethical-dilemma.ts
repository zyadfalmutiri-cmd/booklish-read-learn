import type { Story } from "@/lib/types";

export const anEthicalDilemma: Story = {
  slug: "an-ethical-dilemma",
  title: "An Ethical Dilemma",
  genre: "drama",
  level: "advanced",
  cefr: "C1",
  blurb: "A hospital ethics committee must decide how to allocate a single life-saving organ between two equally deserving patients.",
  cover: "⚕️",
  coverHue: "from-red-200 to-pink-300",
  minutes: 7,
  paragraphs: [
  "The hospital's ethics committee convened under considerable pressure, tasked with an agonizing decision: a single available donor liver, and two patients whose medical circumstances made the choice excruciatingly difficult.",
  "The first patient, a young mother of three, had a slightly better statistical prognosis for long-term survival, based purely on clinical metrics.",
  "The second patient, an elderly researcher on the verge of completing work that colleagues believed could meaningfully advance treatment for the very disease afflicting him, had a marginally lower survival probability.",
  "Committee members found themselves uncomfortably weighing quantifiable medical criteria against qualitative considerations that medical ethics generally, and perhaps wisely, tries to exclude from such decisions.",
  "One committee member argued forcefully that introducing considerations of a patient's broader social contribution set a dangerous precedent, effectively assigning different values to different lives.",
  "After extensive deliberation, the committee adhered strictly to established clinical criteria, selecting the patient with the better prognosis, a decision that satisfied protocol yet left several members privately unconvinced that pure metrics could ever fully capture the moral weight of such choices."
  ],
  vocab: {
  "convened": {
    "ar": "انعقد / اجتمع",
    "def": "Came together for a formal meeting.",
    "example": "The committee convened to discuss the case."
  },
  "prognosis": {
    "ar": "تشخيص متوقع / تنبؤ طبي",
    "def": "A medical prediction about the likely course of a disease.",
    "example": "His prognosis improved after treatment."
  },
  "quantifiable": {
    "ar": "قابل للقياس",
    "def": "Able to be measured or expressed as a number.",
    "example": "They focused on quantifiable results."
  },
  "precedent": {
    "ar": "سابقة",
    "def": "An earlier decision used as an example for future cases.",
    "example": "The ruling set an important legal precedent."
  },
  "deliberation": {
    "ar": "مداولة / تدبّر",
    "def": "Careful discussion and consideration before a decision.",
    "example": "After long deliberation, they reached a verdict."
  }
},
  quiz: [
  {
    "kind": "main-idea",
    "q": "What is the central ethical question in this passage?",
    "choices": [
      "How to fund a hospital",
      "Whether social value should influence life-saving medical decisions",
      "How organs are transported",
      "A disagreement about hospital policy"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "Which patient had a slightly better clinical prognosis?",
    "choices": [
      "The elderly researcher",
      "The young mother",
      "Neither had a clear advantage",
      "Both had identical prognoses"
    ],
    "answer": 1
  },
  {
    "kind": "event",
    "q": "What decision did the committee ultimately make?",
    "choices": [
      "They chose based on social contribution",
      "They adhered strictly to clinical criteria",
      "They refused to decide",
      "They gave the organ to neither patient"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Precedent\" refers to an earlier decision used as…",
    "choices": [
      "a financial record",
      "an example for future cases",
      "a medical treatment",
      "a legal punishment"
    ],
    "answer": 1
  },
  {
    "kind": "vocab",
    "q": "\"Quantifiable\" describes something that can be…",
    "choices": [
      "measured or expressed as a number",
      "felt emotionally",
      "imagined freely",
      "legally enforced"
    ],
    "answer": 0
  }
],
};
