import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { stories } from "@/data/stories";

export const Route = createFileRoute("/admin/export-story-meta")({
  component: ExportStoryMetaPage,
});

function ExportStoryMetaPage() {
  const [copied, setCopied] = useState(false);

  const meta = stories.map((s) => ({
    slug: s.slug,
    title: s.title,
    genre: s.genre,
    level: s.level,
    tags: s.tags ?? [],
    blurb: s.blurb,
  }));

  const json = JSON.stringify(meta, null, 2);

  async function handleCopy() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>تصدير بيانات القصص (slug / title / genre / tags / blurb)</h1>
      <p style={{ fontSize: 13, color: "#666" }}>
        العدد الكلي: {stories.length} قصة
      </p>
      <button
        onClick={handleCopy}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          background: copied ? "#16a34a" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        {copied ? "✅ انتسخ!" : "📋 نسخ الكل كـ JSON"}
      </button>
      <pre
        style={{
          marginTop: 20,
          padding: 12,
          background: "#f5f5f5",
          borderRadius: 8,
          fontSize: 11,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {json}
      </pre>
    </div>
  );
}
