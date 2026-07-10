import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { generateStoryCover, extractGradientColors, dataUrlToBlob } from "@/lib/cover-generator";
import { stories } from "@/data/stories";
import { supabase } from "@/lib/supabase"; // ⚠️ عدّل هذا المسار حسب مكان ملف supabase client عندك

export const Route = createFileRoute("/admin/generate-covers")({
  component: GenerateCoversPage,
});

interface ResultRow {
  slug: string;
  status: "pending" | "success" | "error";
  url?: string;
  message?: string;
}

function GenerateCoversPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [running, setRunning] = useState(false);

  async function handleGenerate() {
    setRunning(true);
    setResults(stories.map((s) => ({ slug: s.slug, status: "pending" })));

    for (const story of stories) {
      try {
        const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);

        // 1) توليد الصورة داخل المتصفح
        const dataUrl = await generateStoryCover({
          emoji: story.cover,
          title: story.title,
          gradientFrom,
          gradientTo,
          width: 1200,
          height: 800,
        });

        // 2) تحويلها إلى Blob
        const blob = await dataUrlToBlob(dataUrl);

        // 3) رفعها إلى Supabase Storage
        const filePath = `${story.slug}.png`;
        const { error: uploadError } = await supabase.storage
          .from("story-covers")
          .upload(filePath, blob, {
            contentType: "image/png",
            upsert: true, // يسمح بإعادة الرفع لو الصورة موجودة
          });

        if (uploadError) throw uploadError;

        // 4) جلب الرابط العام
        const { data: publicUrlData } = supabase.storage
          .from("story-covers")
          .getPublicUrl(filePath);

        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? { ...r, status: "success", url: publicUrlData.publicUrl }
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
      <h1>توليد أغلفة القصص</h1>
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
        }}
      >
        {running ? "جاري التوليد..." : "ولّد كل الأغلفة"}
      </button>

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
                <img src={r.url} alt={r.slug} style={{ width: 150, borderRadius: 8 }} />
                <div style={{ fontSize: 12, wordBreak: "break-all", marginTop: 4 }}>
                  {r.url}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
