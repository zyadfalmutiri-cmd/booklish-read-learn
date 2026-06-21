import { useT } from "@/lib/i18n";

export type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  const { dir } = useT();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:pt-12" dir={dir}>
      <h1 className="mb-2 font-serif text-3xl tracking-tight">{title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">{lastUpdated}</p>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 font-serif text-xl text-foreground">{section.title}</h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
