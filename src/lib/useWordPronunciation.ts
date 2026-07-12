import { useState, useEffect, useCallback, useRef } from "react";

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

function getPreferredVoice(
  voices: SpeechSynthesisVoice[],
  accent: Accent,
  gender: Gender
): SpeechSynthesisVoice | null {
  const targetLang = LANG_MAP[accent];
  const nameCandidates = VOICE_NAME_MAP[accent][gender];

  for (const name of nameCandidates) {
    const match = voices.find(
      (v) => v.lang === targetLang && v.name.includes(name)
    );
    if (match) return match;
  }
  return voices.find((v) => v.lang === targetLang) ?? null;
}

export function useWordPronunciation() {
  const [accent, setAccent] = useState<Accent>("US");
  const [gender, setGender] = useState<Gender>("female");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  // نادِ هالدالة مرة وحدة جوا أول ضغطة زر بالصفحة (أي زر) عشان تفتح الصوت بـ iOS
  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return;
    const silent = new SpeechSynthesisUtterance("");
    silent.volume = 0;
    window.speechSynthesis.speak(silent);
    unlockedRef.current = true;
  }, []);

  const pronounce = useCallback(
    (word: string) => {
      window.speechSynthesis.cancel(); // يوقف أي نطق سابق
      const utterance = new SpeechSynthesisUtterance(word);
      const voice = getPreferredVoice(voices, accent, gender);
      if (voice) utterance.voice = voice;
      utterance.lang = LANG_MAP[accent];
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 150);
    },
    [voices, accent, gender]
  );

  return { pronounce, unlockAudio, accent, setAccent, gender, setGender };
}
