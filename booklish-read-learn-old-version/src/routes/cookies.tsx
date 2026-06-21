import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/booklish/legal-page";
import { getCookiesContent } from "@/lib/legal-content";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [{ title: "Cookie Policy — Booklish" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { lang } = useT();
  const content = getCookiesContent(lang);

  return (
    <LegalPage
      title={content.title}
      lastUpdated={content.lastUpdated}
      sections={content.sections}
    />
  );
}
