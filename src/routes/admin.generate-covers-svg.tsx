import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { buildCoverSVG, svgToBlob } from "@/lib/cover-svg-generator";
import { stories } from "@/data/stories";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/generate-covers-svg")({
  component: GenerateCoversSvgPage,
});

// ✅ حط هنا فقط الـ slugs للقصص الجديدة اللي تبي تولّد أغلفتها.
// فرّغ المصفوفة (اتركها []) عشان تشغّل الأداة على كل القصص.
const NEW_STORY_SLUGS: string[] = [];

interface ResultRow {
  slug: string;
  status: "pending" | "success" | "error";
  url?: string;
  message?: string;
}

function GenerateCoversSvgPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetStories = stories.filter((s) => {
    const matchesSlugFilter =
      NEW_STORY_SLUGS.length === 0 || NEW_STORY_SLUGS.includes(s.slug);
    const hasNoCoverYet = !s.coverImage || s.coverImage.trim().length === 0;
    return matchesSlugFilter && hasNoCoverYet;
  });

  const successCount = results.filter((r) => r.status === "success").length;

  async function handleCopyCode() {
    const successResults = results.filter(
      (r) => r.status === "success" && r.url
    );
    const entries = successResults
      .map((r) => `  "${r.slug}": "${r.url}",`)
      .join("\n");
    const code = `export const storyCoverUrls: Record<string, string> = {\n${entries}\n};\n`;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  async function handleGenerate() {
    setRunning(true);
    setResults(targetStories.map((s) => ({ slug: s.slug, status: "pending" })));

    for (const story of targetStories) {
      try {
        // 1) بناء الـ SVG محليًا (بدون أي شبكة)
        const svg = buildCoverSVG(story);
        const blob = svgToBlob(svg);

        // 2) رفعها إلى Supabase Storage
        const filePath = `${story.slug}.svg`;
        const { error: uploadError } = await supabase.storage
          .from("story-covers")
          .upload(filePath, blob, {
            contentType: "image/svg+xml",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // 3) جلب الرابط العام
        const { data: publicUrlData } = supabase.storage
          .from("story-covers")
          .getPublicUrl(filePath);

        const bustedUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;

        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? { ...r, status: "success", url: bustedUrl }
              : r
          )
        );
      } catch (err) {
        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? { ...r, status: "error", message: String(err) }
              : r
          )
        );
      }
    }

    setRunning(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>توليد أغلفة القصص (SVG محلي — بدون AI)</h1>
      <p style={{ fontSize: 13, color: "#666" }}>
        كل شي يتولّد برمجيًا بالمتصفح: خلفية متدرجة حسب النوع + أيقونة رمزية
        + عنوان نصي واضح. صفر استدعاءات شبكة، صفر Rate Limit.
      </p>
      <p style={{ fontSize: 13, color: "#999" }}>
        سيتم توليد الأغلفة لـ {targetStories.length} قصة فقط
        {NEW_STORY_SLUGS.length > 0 ? " (القصص الجديدة المحددة)" : " (كل القصص)"}.
      </p>

      <button
        onClick={handleGenerate}
        disabled={running}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          background: running ? "#999" : "#333",
          color: "white",
          border: "none",
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        {running ? "جاري التوليد..." : "ولّد كل الأغلفة"}
      </button>

      {successCount > 0 && (
        <button
          onClick={handleCopyCode}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            background: copied ? "#16a34a" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            marginTop: 10,
            marginRight: 10,
          }}
        >
          {copied
            ? "✅ انتسخ! الصقه بملف story-covers-map.ts"
            : `📋 نسخ الكود الجاهز (${successCount} قصة)`}
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        {results.map((r) => (
          <div
            key={r.slug}
            style={{
              padding: 10,
              marginBottom: 8,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <strong>{r.slug}</strong> —{" "}
            {r.status === "pending" && "⏳ جاري..."}
            {r.status === "success" && "✅ تم"}
            {r.status === "error" && `❌ فشل: ${r.message}`}

            {r.url && (
              <div style={{ marginTop: 6 }}>
                <img
                  src={r.url}
                  alt={r.slug}
                  style={{ width: 140, borderRadius: 8 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
