/**
 * tts.ts — Web Speech API wrapper
 *
 * Supports:
 * - British (en-GB) and American (en-US) accents
 * - Male and female voices (picks best available on device)
 * - Toggle play/stop per utterance ID
 * - Persisted user preference via localStorage
 */

import { useEffect, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────

export type TTSAccent = "en-US" | "en-GB";
export type TTSGender = "female" | "male";

export interface TTSPrefs {
  accent: TTSAccent;
  gender: TTSGender;
}

const PREFS_KEY = "booklish.ttsPrefs";

export function getTTSPrefs(): TTSPrefs {
  if (typeof window === "undefined") return { accent: "en-US", gender: "female" };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { accent: "en-US", gender: "female", ...JSON.parse(raw) };
  } catch {}
  return { accent: "en-US", gender: "female" };
}

export function saveTTSPrefs(prefs: TTSPrefs) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
}

// ─── Voice selection ──────────────────────────────────────────────────────

function pickVoice(accent: TTSAccent, gender: TTSGender): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();

  // Priority keywords per gender
  const femaleKeywords = ["female", "woman", "girl", "samantha", "karen", "victoria", "serena", "fiona", "moira", "tessa", "ava", "allison", "susan", "zira"];
  const maleKeywords   = ["male", "man", "daniel", "james", "david", "tom", "fred", "alex", "lee", "george", "rishi"];

  const langFilter = voices.filter(v => v.lang.startsWith(accent.split("-")[0]) && v.lang.includes(accent.split("-")[1]));
  const pool = langFilter.length > 0 ? langFilter : voices.filter(v => v.lang.startsWith("en"));

  const keywords = gender === "female" ? femaleKeywords : maleKeywords;
  const match = pool.find(v => keywords.some(k => v.name.toLowerCase().includes(k)));
  if (match) return match;

  // Fallback: first voice matching locale
  return pool[0] ?? voices.find(v => v.lang.startsWith("en")) ?? null;
}

// ─── Global speaking state ────────────────────────────────────────────────

let currentId: string | null = null;
const listeners = new Set<() => void>();
function notify() { for (const l of listeners) l(); }
function isSupported() { return typeof window !== "undefined" && "speechSynthesis" in window; }

// ─── Core speak / stop ────────────────────────────────────────────────────

export function speak(id: string, text: string, prefs?: Partial<TTSPrefs>) {
  if (!isSupported()) return;

  // Toggle: clicking active speaker stops it
  if (currentId === id) {
    window.speechSynthesis.cancel();
    currentId = null;
    notify();
    return;
  }

  window.speechSynthesis.cancel();

  const resolved: TTSPrefs = { ...getTTSPrefs(), ...prefs };
  const u = new SpeechSynthesisUtterance(text);
  u.lang = resolved.accent;
  u.rate = 0.92;
  u.pitch = resolved.gender === "female" ? 1.1 : 0.85;

  // Voices may not be loaded yet — handle async loading
  const assignVoice = () => {
    const voice = pickVoice(resolved.accent, resolved.gender);
    if (voice) u.voice = voice;
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    assignVoice();
    finishSpeak(id, u);
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      assignVoice();
      finishSpeak(id, u);
    };
  }
}

function finishSpeak(id: string, u: SpeechSynthesisUtterance) {
  u.onend = () => { if (currentId === id) { currentId = null; notify(); } };
  u.onerror = () => { if (currentId === id) { currentId = null; notify(); } };
  currentId = id;
  notify();
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (!isSupported()) return;
  window.speechSynthesis.cancel();
  currentId = null;
  notify();
}

// ─── React hook ───────────────────────────────────────────────────────────

export function useSpeaking(id: string) {
  const [speaking, setSpeaking] = useState(false);
  const [prefs, setPrefsState] = useState<TTSPrefs>(getTTSPrefs);

  useEffect(() => {
    const update = () => setSpeaking(currentId === id);
    update();
    listeners.add(update);
    return () => { listeners.delete(update); };
  }, [id]);

  const toggle = useCallback(
    (text: string, overrides?: Partial<TTSPrefs>) => speak(id, text, { ...prefs, ...overrides }),
    [id, prefs]
  );

  const updatePrefs = useCallback((p: Partial<TTSPrefs>) => {
    setPrefsState(prev => {
      const next = { ...prev, ...p };
      saveTTSPrefs(next);
      return next;
    });
  }, []);

  return { speaking, toggle, prefs, updatePrefs, supported: isSupported() };
}

// ─── Available voices list (for UI) ──────────────────────────────────────

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSupported()) return [];
  return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
}