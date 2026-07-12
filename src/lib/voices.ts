type Accent = "US" | "GB";
type Gender = "male" | "female";

const VOICE_NAME_MAP: Record<Accent, Record<Gender, string[]>> = {
  US: {
    male: ["Fred", "Aaron"],
    female: ["Samantha"],
  },
  GB: {
    male: ["Daniel"],
    female: ["Kate", "Serena"],
  },
};

const LANG_MAP: Record<Accent, string> = {
  US: "en-US",
  GB: "en-GB",
};

export function getPreferredVoice(
  voices: SpeechSynthesisVoice[],
  accent: Accent,
  gender: Gender
): SpeechSynthesisVoice | null {
  const targetLang = LANG_MAP[accent];
  const nameCandidates = VOICE_NAME_MAP[accent][gender];

  // أول محاولة: مطابقة الاسم بالضبط
  for (const name of nameCandidates) {
    const match = voices.find(
      (v) => v.lang === targetLang && v.name.includes(name)
    );
    if (match) return match;
  }

  // فولباك: أي صوت بنفس اللهجة
  const fallback = voices.find((v) => v.lang === targetLang);
  return fallback ?? null;
}
