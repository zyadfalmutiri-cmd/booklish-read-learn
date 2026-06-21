import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/booklish/legal-page";
import { getTermsContent } from "@/lib/legal-content";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service — Booklish" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useT();
  const content = getTermsContent(lang);

  return (
    <LegalPage
      title={content.title}
      lastUpdated={content.lastUpdated}
      sections={content.sections}
    />
  );
}
