import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/booklish/legal-page";
import { getPrivacyContent } from "@/lib/legal-content";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Booklish" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useT();
  const content = getPrivacyContent(lang);

  return (
    <LegalPage
      title={content.title}
      lastUpdated={content.lastUpdated}
      sections={content.sections}
    />
  );
}
