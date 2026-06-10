export interface Token {
  kind: "word" | "space" | "punct";
  text: string;
  // For "word" tokens, the normalized lookup key (lowercased, no punctuation)
  key?: string;
}

export function tokenize(sentence: string): Token[] {
  // Split keeping words, punctuation, and whitespace as separate tokens.
  // Words allow internal apostrophes (e.g., "don't").
  const re = /([A-Za-z]+(?:'[A-Za-z]+)?)|(\s+)|([^A-Za-z\s]+)/g;
  const out: Token[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(sentence)) !== null) {
    if (m[1]) out.push({ kind: "word", text: m[1], key: m[1].toLowerCase() });
    else if (m[2]) out.push({ kind: "space", text: m[2] });
    else if (m[3]) out.push({ kind: "punct", text: m[3] });
  }
  return out;
}

export function splitSentences(paragraph: string): string[] {
  // Split on sentence punctuation while keeping the punctuation attached.
  const parts = paragraph.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g);
  return parts ? parts.map((s) => s.trim()).filter(Boolean) : [paragraph];
}
