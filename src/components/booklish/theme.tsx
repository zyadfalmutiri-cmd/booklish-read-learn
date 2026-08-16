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

// 🎨 ألوان شاشة القراءة نفسها — أهم شاشة بالتطبيق (فيها يقضي المستخدم أغلب وقته)
// كانت تستخدم "light" = أبيض ناصع #ffffff كافتراضي، منفصل تمامًا عن هوية
// "المكتبة القديمة" المطبّقة بباقي الموقع. الآن الأربع خيارات كلها من نفس
// عائلة الورق/الحبر الدافئة، والافتراضي صار "cream" (يطابق --card بالضبط)
// بدل الأبيض الجامد. باقي الخيارات (فاتح جدًا/داكن/بني) محفوظة كتفضيلات
// قراءة مشروعة، فقط أُعيد توليفها على نفس العائلة اللونية.
export const READER_THEME_STYLES: Record<ReaderTheme, { background: string; color: string; label: string; labelEn: string }> = {
  light: { background: "#FBF8F2", color: "#2B2119", label: "فاتح", labelEn: "Light" },
  dark: { background: "#17110B", color: "#EDE6D6", label: "داكن", labelEn: "Dark" },
  sepia: { background: "#F0E2C8", color: "#43301D", label: "بني", labelEn: "Sepia" },
  cream: { background: "#FAF6EC", color: "#2B2620", label: "كريمي", labelEn: "Cream" },
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
  readerTheme: "cream",
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
