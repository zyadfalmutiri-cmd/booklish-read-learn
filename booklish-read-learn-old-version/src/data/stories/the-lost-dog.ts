import type { Story } from "@/lib/types";

export const theLostDog: Story = {
  slug: "the-lost-dog",
  title: "The Lost Dog",
  genre: "adventure",
  level: "beginner",
  blurb: "Omar finds a small dog alone in the park. He wants to help the dog find its owner.",
  cover: "🐶",
  coverHue: "from-yellow-200 to-orange-300",
  minutes: 3,
  paragraphs: [
    "Omar was walking in the park when he saw a small brown dog sitting under a tree. The dog was alone. It looked sad and scared.",
    "Omar sat down on the grass near the dog. \"Hello, little dog,\" he said softly. The dog looked at him with big brown eyes. It did not run away.",
    "Omar looked at the dog's neck. There was a small red collar with a name on it. The name was \"Biscuit\". There was also a phone number.",
    "Omar took out his phone and called the number. A woman answered. She sounded very worried. \"Oh! That is my dog! Where are you?\" she asked.",
    "\"I am in the big park near the fountain,\" Omar said. Ten minutes later, a woman with short grey hair came running. Biscuit jumped up and wagged his tail.",
    "\"Thank you so much!\" the woman said. She was smiling and crying at the same time. \"I have been looking for him all morning.\" Omar smiled. It was a good day.",
  ],
  vocab: {
    collar: { ar: "طوق", def: "A band worn around an animal's neck.", example: "The cat has a blue collar." },
    fountain: { ar: "نافورة", def: "A structure that sends water into the air.", example: "We sat by the fountain in the square." },
    wagged: { ar: "هز (ذيله)", def: "Moved from side to side quickly.", example: "The dog wagged its tail when it saw its owner." },
    worried: { ar: "قلق", def: "Feeling anxious about something.", example: "She was worried about her son." },
    softly: { ar: "بهدوء", def: "In a quiet, gentle way.", example: "He spoke softly so as not to wake the baby." },
    scared: { ar: "خائف", def: "Feeling fear.", example: "The child was scared of the dark." },
  },
  quiz: [
    { kind: "main-idea", q: "What is the story mainly about?", choices: ["A boy who buys a dog", "A boy who helps a lost dog find its owner", "A dog that runs away", "A woman who loses her phone"], answer: 1 },
    { kind: "event", q: "How did Omar know the dog's name?", choices: ["The dog had a tag on its collar", "The owner told him", "He guessed the name", "There was a poster on the tree"], answer: 0 },
    { kind: "event", q: "How did the owner feel when she found Biscuit?", choices: ["Angry", "Tired", "Happy and emotional", "Confused"], answer: 2 },
    { kind: "vocab", q: "\"Wagged\" in the story means the dog…", choices: ["barked loudly", "moved its tail quickly", "ran away", "sat down"], answer: 1 },
    { kind: "vocab", q: "\"Worried\" means feeling…", choices: ["happy", "tired", "anxious", "surprised"], answer: 2 },
  ],
};
