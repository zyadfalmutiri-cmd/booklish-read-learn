import { useEffect } from "react";
import { useLocalStore, storeKeys } from "@/lib/store";

export interface Settings {
  theme: "light" | "dark";
  fontScale: number; // 0.875 .. 1.25
  translateMode: "off" | "words" | "sentences";
}

const DEFAULTS: Settings = { theme: "light", fontScale: 1, translateMode: "off" };

export function useSettings() {
  return useLocalStore<Settings>(storeKeys.settings, DEFAULTS);
}

export function ThemeSync() {
  const [settings] = useSettings();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (settings.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [settings.theme]);
  return null;
}
