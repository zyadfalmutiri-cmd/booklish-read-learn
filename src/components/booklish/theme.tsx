import { useEffect } from "react";
import { useLocalStore, storeKeys } from "@/lib/store";

export interface Settings {
  theme: "light" | "dark";
  fontScale: number; // 0.875 .. 1.25
  translateMode: "off" | "words" | "sentences";
  /** UI language. "ar" = Arabic translated UI labels, "en" = full English UI. */
  uiLanguage: "ar" | "en";
  /** Persisted Focus Mode preference for the reader. */
  focusMode: boolean;
}

const DEFAULTS: Settings = {
  theme: "light",
  fontScale: 1,
  translateMode: "off",
  uiLanguage: "ar",
  focusMode: false,
};

export function useSettings() {
  const [stored, set, hydrated] = useLocalStore<Settings>(storeKeys.settings, DEFAULTS);
  // Merge defaults so newly added keys exist when reading older saved blobs.
  const value: Settings = { ...DEFAULTS, ...stored };
  return [value, set, hydrated] as const;
}

export function ThemeSync() {
  const [settings] = useSettings();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (settings.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.lang = settings.uiLanguage;
    root.dir = settings.uiLanguage === "ar" ? "rtl" : "ltr";
  }, [settings.theme, settings.uiLanguage]);
  return null;
}
