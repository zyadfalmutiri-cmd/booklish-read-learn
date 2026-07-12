type Accent = "US" | "GB";
type Gender = "male" | "female";

// هذي أسماء أصوات حقيقية تم التأكد منها فعليًا على جهاز المستخدم (Safari/iOS)
// ملاحظة: ما فيه صوت بنت بريطاني (en-GB) حقيقي على iOS، لذا نستخدم
// Moira (en-IE أيرلندي، أقرب لكنة) كبديل، وإذا ما وجد نرجع لـ Samantha الأمريكية.
const VOICE_NAME_MAP: Record<Accent, Record<Gender, string[]>> = {
  US: {
    male: ["Fred", "Junior", "Ralph"],
    female: ["Samantha", "Kathy"],
  },
  GB: {
    male: ["Daniel"],
    female: ["Moira", "Samantha"], // Moira = en-IE بديل مؤقت لعدم وجود بنت en-GB
  },
};

const LANG_MAP: Record<Accent, string> = {
  US: "en-US",
  GB: "en-GB",
};

// أسماء الأصوات الفكاهية اللي لازم نتجنبها بالفولباك العام (Boing, Bubbles...)
const NOVELTY_VOICES = [
  "Bad News",
  "Bahh",
  "Bells",
  "Boing",
  "Bubbles",
  "Cellos",
  "Good News",
  "Jester",
  "Organ",
  "Superstar",
  "Trinoids",
  "Whisper",
  "Zarvox",
  "Wobble",
];

export function getPreferredVoice(
  voices: SpeechSynthesisVoice[],
  accent: Accent,
  gender: Gender
): SpeechSynthesisVoice | null {
  const targetLang = LANG_MAP[accent];
  const nameCandidates = VOICE_NAME_MAP[accent][gender];

  // أول محاولة: مطابقة الاسم بالضبط بنفس اللكنة المطلوبة
  for (const name of nameCandidates) {
    const match = voices.find(
      (v) => v.lang === targetLang && v.name.includes(name)
    );
    if (match) return match;
  }

  // ثاني محاولة: لو الاسم البديل موجود بلكنة مختلفة (مثل Moira بـ en-IE)
  for (const name of nameCandidates) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  // فولباك أخير: أي صوت إنجليزي حقيقي (نتجنب الأصوات الفكاهية)
  const fallback = voices.find(
    (v) =>
      v.lang === targetLang &&
      !NOVELTY_VOICES.some((n) => v.name.includes(n))
  );
  if (fallback) return fallback;

  // فولباك عام: أي صوت en-*
  return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ?? null;
}
