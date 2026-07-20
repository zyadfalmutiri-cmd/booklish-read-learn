import { Minus, Plus } from "lucide-react";
import {
  useSettings,
  READER_THEME_STYLES,
  READER_FONT_FAMILY_MAP,
  type ReaderTheme,
  type ReaderFontFamily,
} from "./theme";

export function ReadingSettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [settings, setSettings] = useSettings();
  const isArabicUi = settings.uiLanguage === "ar";

  if (!open) return null;

  const setReaderTheme = (t: ReaderTheme) => setSettings({ ...settings, readerTheme: t });
  const setFontFamily = (f: ReaderFontFamily) => setSettings({ ...settings, readerFontFamily: f });

  const adjustFont = (delta: number) => {
    const next = Math.min(1.3, Math.max(0.85, +(settings.fontScale + delta).toFixed(2)));
    setSettings({ ...settings, fontScale: next });
  };

  const adjustLineHeight = (delta: number) => {
    const next = Math.min(2.2, Math.max(1.3, +(settings.readerLineHeight + delta).toFixed(1)));
    setSettings({ ...settings, readerLineHeight: next });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" dir={isArabicUi ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border-t border-border bg-card px-5 pb-8 pt-3 shadow-2xl animate-scale-in">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted-foreground/30" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold">
            {isArabicUi ? "إعدادات القراءة" : "Reading Settings"}
          </h2>
          <button type="button" onClick={onClose} className="text-sm font-medium text-primary">
            {isArabicUi ? "تم" : "Done"}
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {isArabicUi ? "المظهر" : "Theme"}
          </p>
          <div className="grid grid-cols-4 gap-2.5">
            {(Object.keys(READER_THEME_STYLES) as ReaderTheme[]).map((key) => {
              const t = READER_THEME_STYLES[key];
              const active = settings.readerTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setReaderTheme(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-1 transition-colors ${
                    active ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div
                    className="grid h-12 w-full place-items-center rounded-lg border border-border/40 text-sm font-bold shadow-sm"
                    style={{ background: t.background, color: t.color }}
                  >
                    Aa
                  </div>
                  <span className={`text-[11px] ${active ? "font-medium text-primary" : "text-muted-foreground"}`}>
                    {isArabicUi ? t.label : t.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {isArabicUi ? "حجم الخط" : "Font Size"}
          </p>
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2">
            <button
              type="button"
              onClick={() => adjustFont(-0.05)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              aria-label={isArabicUi ? "أصغر" : "Smaller"}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium tabular-nums">
              {Math.round(settings.fontScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => adjustFont(0.05)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              aria-label={isArabicUi ? "أكبر" : "Larger"}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Font family */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {isArabicUi ? "نوع الخط" : "Font"}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(READER_FONT_FAMILY_MAP) as ReaderFontFamily[]).map((key) => {
              const f = READER_FONT_FAMILY_MAP[key];
              const active = settings.readerFontFamily === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFontFamily(key)}
                  className={`flex flex-col items-center gap-1 rounded-xl border py-2.5 transition-colors ${
                    active ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="text-lg font-semibold" style={{ fontFamily: f.css }}>
                    Aa
                  </span>
                  <span className="text-[10px]">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Line spacing */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {isArabicUi ? "تباعد الأسطر" : "Line Spacing"}
          </p>
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2">
            <button
              type="button"
              onClick={() => adjustLineHeight(-0.1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              aria-label={isArabicUi ? "تقليل" : "Decrease"}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium tabular-nums">{settings.readerLineHeight.toFixed(1)}</span>
            <button
              type="button"
              onClick={() => adjustLineHeight(0.1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              aria-label={isArabicUi ? "زيادة" : "Increase"}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}