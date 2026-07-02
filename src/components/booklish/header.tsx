import {
  Moon,
  Sun,
  BookOpen,
  Languages,
  LogOut,
  LogIn,
  Menu,
  X,
  Library,
  LayoutDashboard,
  BookMarked,
  RotateCcw,
  Brain,
  Home,
  Trash2,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSettings } from "./theme";
import { useT } from "@/lib/i18n";
import { useAuth, signOut } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

// The 4 items in the bottom tab bar (mobile)
const bottomTabs = [
  { to: "/vocab", labelAr: "كلماتي", labelEn: "My Words", icon: BookMarked },
  { to: "/", labelAr: "الرئيسية", labelEn: "Home", icon: Home },
  { to: "/library", labelAr: "المكتبة", labelEn: "Library", icon: Library },
  { to: "/vocab-games", labelAr: "مفردات", labelEn: "Vocabulary", icon: Brain },
] as const;

// Everything else lives in the ☰ menu
const menuLinks = [
  { to: "/dashboard", labelAr: "الإحصائيات", labelEn: "Stats", icon: LayoutDashboard },
  { to: "/review", labelAr: "المراجعة", labelEn: "Review", icon: RotateCcw },
] as const;

export function Header() {
  const [settings, setSettings, hydrated] = useSettings();
  const { t, lang } = useT();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  const confirmWord = lang === "ar" ? "حذف" : "DELETE";

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== confirmWord) return;
    setDeleting(true);
    try {
      // Requires a Supabase Edge Function named "delete-account"
      // (see setup instructions provided separately).
      const { error } = await supabase.functions.invoke("delete-account");
      if (error) throw error;
      await signOut();
      toast.success(lang === "ar" ? "تم حذف حسابك بنجاح" : "Your account was deleted");
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      toast.error(lang === "ar" ? "تعذر حذف الحساب، حاول لاحقًا" : "Couldn't delete account, try again");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
      setDeleteConfirmText("");
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
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

          {/* Desktop nav keeps everything visible */}
          <nav className="ms-2 hidden flex-1 items-center gap-1 text-sm sm:flex sm:gap-3 sm:text-[15px]">
            {[...bottomTabs.filter((l) => l.to !== "/"), ...menuLinks].map(({ to, labelAr, labelEn }) => (
              <NavItem key={to} to={to}>
                {lang === "ar" ? labelAr : labelEn}
              </NavItem>
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

      {/* ☰ menu — only the "extra" items now (bottom tabs removed from here) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <nav className="mx-auto max-w-5xl px-4 pt-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-1">
              {menuLinks.map(({ to, labelAr, labelEn, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{
                    className:
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-foreground bg-muted",
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {lang === "ar" ? labelAr : labelEn}
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

              {user && (
                <button
                  onClick={() => setDeleteOpen(true)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" />
                  {lang === "ar" ? "حذف الحساب" : "Delete account"}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Delete account confirmation */}
      {deleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => !deleting && setDeleteOpen(false)}
        >
          <div className="w-full max-w-sm rounded-2xl bg-background p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground">
              {lang === "ar" ? "حذف الحساب نهائيًا؟" : "Delete account permanently?"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ar"
                ? "سيتم حذف حسابك وكل بياناتك (كلماتك، تقدمك، اشتراكك) بشكل نهائي ولا يمكن التراجع."
                : "Your account and all data (words, progress, subscription) will be permanently deleted. This can't be undone."}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {lang === "ar" ? `اكتب "${confirmWord}" للتأكيد` : `Type "${confirmWord}" to confirm`}
            </p>
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              placeholder={confirmWord}
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeleteOpen(false)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirmText !== confirmWord}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground disabled:opacity-50"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                {lang === "ar" ? "حذف نهائي" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom tab bar — mobile only */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-around px-2">
          {bottomTabs.map(({ to, labelAr, labelEn, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground"
              activeProps={{
                className: "flex flex-1 flex-col items-center justify-center gap-1 text-primary",
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{lang === "ar" ? labelAr : labelEn}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Reliably pushes page content up above the fixed bottom bar on mobile,
          regardless of where <Header /> sits relative to <Outlet /> in the DOM. */}
      <style>{`
        @media (max-width: 639px) {
          body {
            padding-bottom: calc(4rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
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
