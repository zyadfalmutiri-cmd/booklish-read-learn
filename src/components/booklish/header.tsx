import { Link } from "@tanstack/react-router";
import { Moon, Sun, BookOpen, Languages } from "lucide-react";
import { useSettings } from "./theme";
import { useT } from "@/lib/i18n";

export function Header() {
  const [settings, setSettings, hydrated] = useSettings();
  const { t, lang } = useT();
  const toggleTheme = () =>
    setSettings({ ...settings, theme: settings.theme === "dark" ? "light" : "dark" });
  const toggleLang = () =>
    setSettings({ ...settings, uiLanguage: settings.uiLanguage === "ar" ? "en" : "ar" });

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>{t("brand.name")}</span>
        </Link>
        <nav className="ms-2 flex flex-1 items-center gap-1 text-sm sm:gap-4 sm:text-[15px]">
          <NavItem to="/library">{t("nav.library")}</NavItem>
          <NavItem to="/dashboard">{t("nav.dashboard")}</NavItem>
          <NavItem to="/vocab">{t("nav.vocab")}</NavItem>
          <NavItem to="/review">{t("nav.review")}</NavItem>
        </nav>
        <button
          aria-label={t("common.toggleLang")}
          onClick={toggleLang}
          className="inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          title={t("common.toggleLang")}
        >
          <Languages className="h-3.5 w-3.5" />
          <span className="uppercase">{hydrated ? lang : "ar"}</span>
        </button>
        <button
          aria-label={t("common.toggleTheme")}
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          {hydrated && settings.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      activeProps={{ className: "rounded-md px-2 py-1.5 text-foreground bg-muted" }}
    >
      {children}
    </Link>
  );
}
