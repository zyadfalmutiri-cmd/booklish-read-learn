import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/contact";

export function Footer() {
  const { t, lang } = useT();
  const year = new Date().getFullYear();

  const legalLinks = [
    { to: "/privacy" as const, label: t("legal.privacy") },
    { to: "/terms" as const, label: t("legal.terms") },
    { to: "/cookies" as const, label: t("legal.cookies") },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            © {year} Booklish. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("legal.contact")}: {CONTACT_EMAIL}
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label={t("legal.navLabel")}>
          {legalLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
