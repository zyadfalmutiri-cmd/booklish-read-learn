import { useEffect, useState, useCallback } from "react";

/**
 * Tiny wrapper around the Web Speech API that tracks the currently-speaking
 * utterance so a single button can toggle play/stop and reflect state.
 */
let currentId: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function isSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(id: string, text: string, lang = "en-US") {
  if (!isSupported()) return;
  // Toggle: clicking the active speaker again stops it.
  if (currentId === id) {
    window.speechSynthesis.cancel();
    currentId = null;
    notify();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  u.onend = () => {
    if (currentId === id) {
      currentId = null;
      notify();
    }
  };
  u.onerror = () => {
    if (currentId === id) {
      currentId = null;
      notify();
    }
  };
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

export function useSpeaking(id: string) {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    const update = () => setSpeaking(currentId === id);
    update();
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, [id]);
  const toggle = useCallback((text: string, lang = "en-US") => speak(id, text, lang), [id]);
  return { speaking, toggle, supported: isSupported() };
}
