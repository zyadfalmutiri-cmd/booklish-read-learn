import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  Moon,
  Sun,
  Star,
  Share2,
  HelpCircle,
  Phone,
  Info,
  FileText,
  Shield,
  LogOut,
  LogIn,
  Trash2,
  Loader2,
} from "lucide-react";
import { useSettings } from "@/components/booklish/theme";
import { useT } from "@/lib/i18n";
import { useAuth, signOut } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

// 🔗 لما ينزل التطبيق فعليًا بالمتجرين حط الرابط هنا وبيشتغل زر "قيّم التطبيق" تلقائيًا
const APP_STORE_URL = "";
const PLAY_STORE_URL = "";

function SettingsPage() {
  const [settings, setSettings] = useSettings();
  const { lang } = useT();
  const { user } = useAuth();
  const navigate = useNavigate();
  const ar = lang === "ar";

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const BackChevron = ar ? ChevronRight : ChevronLeft;

  const toggleTheme = () =>
    setSettings({ ...settings, theme: settings.theme === "dark" ? "light" : "dark" });
  const toggleLang = () =>
    setSettings({ ...settings, uiLanguage: settings.uiLanguage === "ar" ? "en" : "ar" });

  const handleSignOut = async () => {
    await signOut();
    toast.success(ar ? "تم تسجيل الخروج" : "Signed out");
    navigate({ to: "/" });
  };

  const handleRateUs = () => {
    const url = APP_STORE_URL || PLAY_STORE_URL;
    if (!url) {
      toast(ar ? "التطبيق لسا ما نزل بالمتجر، ترقّب!" : "Not on the store yet, stay tuned!");
      return;
    }
    window.open(url, "_blank");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Booklish",
      text: ar
        ? "تعلّم الإنجليزية بقراءة قصص قصيرة — جرب Booklish"
        : "Learn English by reading short stories — try Booklish",
      url: typeof window !== "undefined" ? window.location.origin : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        toast.success(ar ? "تم نسخ الرابط" : "Link copied");
      }
    } catch {
      // المستخدم لغى المشاركة — ما نسوي شي
    }
  };

  const confirmWord = ar ? "حذف" : "DELETE";

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== confirmWord) return;
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("delete-account");
      if (error) throw error;
      await signOut();
      toast.success(ar ? "تم حذف حسابك بنجاح" : "Your account was deleted");
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      toast.error(ar ? "تعذر حذف الحساب، حاول لاحقًا" : "Couldn't delete account, try again");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
      setDeleteConfirmText("");
    }
  };

  return (
    <main className="mx-auto max-w-lg px-4 pb-24 pt-6" dir={ar ? "rtl" : "ltr"}>
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/dashboard"
          aria-label={ar ? "رجوع" : "Back"}
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <BackChevron className="h-4 w-4" />
        </Link>
        <h1 className="font-serif text-2xl">{ar ? "الإعدادات" : "Settings"}</h1>
      </div>

      {/* عام */}
      <SettingsSection title={ar ? "عام" : "General"}>
        <SettingsRow
          icon={<Languages className="h-4 w-4" />}
          label={ar ? "اللغة" : "Language"}
          onClick={toggleLang}
          trailing={
            <span className="text-sm text-muted-foreground">{ar ? "العربية" : "English"}</span>
          }
        />
        <SettingsRow
          icon={settings.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          label={ar ? "المظهر" : "Theme"}
          onClick={toggleTheme}
          trailing={
            <span className="text-sm text-muted-foreground">
              {settings.theme === "dark" ? (ar ? "داكن" : "Dark") : ar ? "فاتح" : "Light"}
            </span>
          }
        />
      </SettingsSection>

      {/* التطبيق */}
      <SettingsSection title={ar ? "التطبيق" : "App"}>
        <SettingsRow
          icon={<Star className="h-4 w-4" />}
          label={ar ? "قيّم التطبيق" : "Rate us"}
          onClick={handleRateUs}
        />
        <SettingsRow
          icon={<Share2 className="h-4 w-4" />}
          label={ar ? "شارك التطبيق" : "Share the app"}
          onClick={handleShare}
        />
      </SettingsSection>

      {/* الدعم والمعلومات */}
      <SettingsSection title={ar ? "الدعم والمعلومات" : "Support & About"}>
        <SettingsLinkRow to="/faq" icon={<HelpCircle className="h-4 w-4" />} label={ar ? "الأسئلة الشائعة" : "FAQ"} ar={ar} />
        <SettingsLinkRow to="/contact" icon={<Phone className="h-4 w-4" />} label={ar ? "الدعم" : "Support"} ar={ar} />
        <SettingsLinkRow to="/about" icon={<Info className="h-4 w-4" />} label={ar ? "من نحن" : "About"} ar={ar} />
        <SettingsLinkRow to="/terms" icon={<FileText className="h-4 w-4" />} label={ar ? "الشروط والأحكام" : "Terms of Use"} ar={ar} />
        <SettingsLinkRow to="/privacy" icon={<Shield className="h-4 w-4" />} label={ar ? "سياسة الخصوصية" : "Privacy Policy"} ar={ar} />
      </SettingsSection>

      {/* الحساب */}
      <SettingsSection title={ar ? "الحساب" : "Account"}>
        {user ? (
          <>
            <SettingsRow
              icon={<LogOut className="h-4 w-4" />}
              label={ar ? "تسجيل الخروج" : "Sign out"}
              onClick={handleSignOut}
            />
            <SettingsRow
              icon={<Trash2 className="h-4 w-4" />}
              label={ar ? "حذف الحساب" : "Delete account"}
              onClick={() => setDeleteOpen(true)}
              destructive
              hideChevron
            />
          </>
        ) : (
          <SettingsLinkRow to="/auth" icon={<LogIn className="h-4 w-4" />} label={ar ? "تسجيل الدخول" : "Sign in"} ar={ar} />
        )}
      </SettingsSection>

      {/* حذف الحساب — تأكيد */}
      {deleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => !deleting && setDeleteOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-background p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            dir={ar ? "rtl" : "ltr"}
          >
            <h3 className="text-lg font-semibold text-foreground">
              {ar ? "حذف الحساب نهائيًا؟" : "Delete account permanently?"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {ar
                ? "سيتم حذف حسابك وكل بياناتك (كلماتك، تقدمك، اشتراكك) بشكل نهائي ولا يمكن التراجع."
                : "Your account and all data (words, progress, subscription) will be permanently deleted. This can't be undone."}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {ar ? `اكتب "${confirmWord}" للتأكيد` : `Type "${confirmWord}" to confirm`}
            </p>
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              placeholder={confirmWord}
              dir={ar ? "rtl" : "ltr"}
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeleteOpen(false)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {ar ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirmText !== confirmWord}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground disabled:opacity-50"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                {ar ? "حذف نهائي" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="paper-card overflow-hidden divide-y divide-border">
        {children}
      </div>
    </section>
  );
}

function SettingsRow({
  icon,
  label,
  onClick,
  trailing,
  destructive,
  hideChevron,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
  hideChevron?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3.5 text-start transition-colors hover:bg-muted ${
        destructive ? "text-destructive" : "text-foreground"
      }`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          destructive ? "bg-destructive/10" : "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      {trailing}
      {!hideChevron && <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground rtl:rotate-180" />}
    </button>
  );
}

function SettingsLinkRow({
  to,
  icon,
  label,
  ar,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  ar: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-start text-foreground transition-colors hover:bg-muted"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <ChevronLeft className={`h-4 w-4 shrink-0 text-muted-foreground ${ar ? "rotate-180" : ""}`} />
    </Link>
  );
}
