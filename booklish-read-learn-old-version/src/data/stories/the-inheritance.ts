import type { Story } from "@/lib/types";

export const theInheritance: Story = {
  slug: "the-inheritance",
  title: "The Inheritance",
  genre: "drama",
  level: "advanced",
  blurb: "When the eldest sister reads their mother's will, she finds that the house has been left not to the family — but to a woman none of them know.",
  cover: "🏛️",
  coverHue: "from-stone-300 to-amber-500",
  minutes: 7,
  paragraphs: [
    "The will had been witnessed by two solicitors and notarised in October — three months before their mother died. It left the house in Houghton Street, worth approximately half a million pounds, to a woman named Constance Bell.",
    "There were four children: Yasmin the eldest, then Ahmad, then the twins Reza and Lena. They sat in the solicitor's office in various postures of barely-managed shock. Nobody spoke for a long time.",
    "\"Who is she?\" Yasmin asked eventually. The solicitor explained that Constance Bell had been a nurse at the private clinic their mother had attended during her illness. Beyond that, he had no information to offer.",
    "In the car on the way home, Ahmad said that it was obviously the result of undue influence — the nurse had manipulated their mother when she was vulnerable. Reza said nothing. Lena wept quietly in the back seat.",
    "Yasmin did not say what she was thinking, which was that their mother had been the most deliberate person she had ever known. She had not changed her will by accident. She had not been manipulated. She had chosen.",
    "That evening, Yasmin found a card in her mother's bedside drawer — a simple white card with a handwritten note: 'She sat with me every Tuesday evening for four months. She listened when I needed to speak. Some debts cannot be valued in money.' It was signed with their mother's name.",
  ],
  vocab: {
    notarised: { ar: "موثّق رسمياً", def: "Officially signed and certified by a notary.", example: "The contract was notarised before signing." },
    solicitor: { ar: "محامٍ (بريطاني)", def: "A type of lawyer in British law.", example: "She consulted a solicitor about the will." },
    deliberate: { ar: "متعمّد / مقصود", def: "Done on purpose; intentional and careful.", example: "His choice of words was deliberate." },
    vulnerable: { ar: "ضعيف / معرّض للإيذاء", def: "Open to harm; not in a strong position.", example: "Elderly people can be vulnerable to fraud." },
    undue: { ar: "مفرط / غير مبرر", def: "Excessive; more than is reasonable.", example: "The judge rejected the claim of undue influence." },
    posture: { ar: "هيئة / موقف / وضع الجسم", def: "The way a person holds their body, or their stance.", example: "His posture showed how uncomfortable he was." },
  },
  quiz: [
    { kind: "main-idea", q: "What does the card at the end reveal?", choices: ["That the nurse stole the house", "That the mother left the house as payment for emotional support", "That the will was forged", "That Constance is a relative"], answer: 1 },
    { kind: "event", q: "What did Ahmad assume about the will?", choices: ["That their mother had been confused", "That the will was a forgery", "That the nurse had manipulated their mother", "That there was a second will"], answer: 2 },
    { kind: "event", q: "What was Yasmin's private thought about her mother?", choices: ["That she had been very ill", "That she had made a mistake", "That she was a very deliberate person who had chosen this", "That she had never liked the house"], answer: 2 },
    { kind: "vocab", q: "\"Deliberate\" means…", choices: ["confused", "done on purpose and carefully", "angry", "sudden"], answer: 1 },
    { kind: "vocab", q: "\"Vulnerable\" means…", choices: ["very strong", "open to harm or not in a strong position", "very old", "intelligent"], answer: 1 },
  ],
};
