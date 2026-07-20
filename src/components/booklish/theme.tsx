import { useEffect } from "react";
import { useLocalStore, storeKeys } from "@/lib/store";

export type ReaderTheme = "light" | "dark" | "sepia" | "cream";
export type ReaderFontFamily = "serif" | "sans" | "mono" | "system";

export interface Settings {
  theme: "light" | "dark";
  fontScale: number; // 0.875 .. 1.3
  translateMode: "off" | "words" | "sentences";
  /** UI language. "ar" = Arabic translated UI labels, "en" = full English UI. */
  uiLanguage: "ar" | "en";
  /** Persisted Focus Mode preference for the reader. */
  focusMode: boolean;
  /** Reading-page-only visual theme (paper color), independent from app-wide light/dark theme. */
  readerTheme: ReaderTheme;
  /** Reading-page font family. */
  readerFontFamily: ReaderFontFamily;
  /** Reading-page line height / spacing between lines. */
  readerLineHeight: number; // 1.3 .. 2.2
}

export const READER_THEME_STYLES: Record<ReaderTheme, { background: string; color: string; label: string; labelEn: string }> = {
  light: { background: "#ffffff", color: "#1a1a1a", label: "فاتح", labelEn: "Light" },
  dark: { background: "#000000", color: "#e8e8e8", label: "داكن", labelEn: "Dark" },
  sepia: { background: "#f2e8d5", color: "#3f2f1e", label: "بني", labelEn: "Sepia" },
  cream: { background: "#faf6ec", color: "#2b2620", label: "كريمي", labelEn: "Cream" },
};

export const READER_FONT_FAMILY_MAP: Record<ReaderFontFamily, { css: string; label: string }> = {
  serif: { css: "Georgia, 'Times New Roman', serif", label: "Serif" },
  sans: { css: "Inter, system-ui, -apple-system, sans-serif", label: "Sans" },
  mono: { css: "'JetBrains Mono', 'Courier New', monospace", label: "Mono" },
  system: { css: "-apple-system, system-ui, sans-serif", label: "System" },
};

const DEFAULTS: Settings = {
  theme: "light",
  fontScale: 1,
  translateMode: "off",
  uiLanguage: "ar",
  focusMode: false,
  readerTheme: "light",
  readerFontFamily: "serif",
  readerLineHeight: 1.7,
};

export function useSettings() {
  const [stored, set, hydrated] = useLocalStore<Settings>(storeKeys.settings, DEFAULTS);
  // Merge defaults so newly added keys exist when reading older saved blobs.
  const value: Settings = { ...DEFAULTS, ...stored };
  return [value, set, hydrated] as const;
}

export function ThemeSync() {
  const [settings, , hydrated] = useSettings();
  useEffect(() => {
    if (typeof document === "undefined") return;
    // قبل ما تكتمل القراءة من التخزين، لا تلمس الـ DOM أبدًا —
    // خلي الـ anti-FOUC script (اللي اشتغل قبل React) هو المتحكم مؤقتًا
    if (!hydrated) return;
    const root = document.documentElement;
    if (settings.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.lang = settings.uiLanguage;
    root.dir = settings.uiLanguage === "ar" ? "rtl" : "ltr";
  }, [settings.theme, settings.uiLanguage, hydrated]);
  return null;
}
