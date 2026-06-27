import { Moon, Sun, BookOpen, Languages, LogOut, LogIn, Menu, X, Library, LayoutDashboard, BookMarked, RotateCcw, Brain } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Moon, Sun, BookOpen, Languages, LogOut, LogIn, Menu, X, Library, LayoutDashboard, BookMarked, RotateCcw } from "lucide-react";
import { useSettings } from "./theme";
import { useT } from "@/lib/i18n";
import { useAuth, signOut } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useState } from "react";

export function Header() {
  const [settings, setSettings, hydrated] = useSettings();
  const { t, lang } = useT();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () =>
    setSettings({ ...settings, theme: settings.theme === "dark" ? "light" : "dark" });
  const toggleLang = () =>
    setSettings({ ...settings, uiLanguage: settings.uiLanguage === "ar" ? "en" : "ar" });

  const handleSignOut = async () => {
    await signOut();
    toast.success(lang === "ar" ? "تم تسجيل الخروج" : "Signed out");
    navigate({ to: "/" });
    setMobileOpen(false);
  };

  const navLinks = [
    { to: "/library", label: t("nav.library"), icon: Library },
    { to: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { to: "/vocab", label: t("nav.vocab"), icon: BookMarked },
    { to: "/review", label: t("nav.review"), icon: RotateCcw },
    { to: "/vocab-games", label: lang === "ar" ? "ألعاب" : "Games", icon: Brain },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <span>{t("brand.name")}</span>
          </Link>

          <nav className="ms-2 hidden flex-1 items-center gap-1 text-sm sm:flex sm:gap-3 sm:text-[15px]">
            {navLinks.map(({ to, label }) => (
              <NavItem key={to} to={to}>{label}</NavItem>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
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

            {user ? (
              <button
                onClick={handleSignOut}
                aria-label={lang === "ar" ? "تسجيل الخروج" : "Sign out"}
                title={user.email ?? ""}
                className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/auth"
                aria-label={lang === "ar" ? "تسجيل الدخول" : "Sign in"}
                className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <LogIn className="h-4 w-4" />
              </Link>
            )}

            <button
              aria-label="القائمة"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted sm:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-20 bg-background/95 backdrop-blur-sm sm:hidden" onClick={() => setMobileOpen(false)}>
          <nav className="mx-auto max-w-5xl px-4 pt-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-foreground bg-muted" }}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}

              <div className="my-3 border-t border-border" />

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  {lang === "ar" ? "تسجيل الخروج" : "Sign out"}
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogIn className="h-5 w-5" />
                  {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
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
