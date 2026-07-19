import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  generateAIStoryCover,
  buildCoverPrompt,
} from "@/lib/cover-generator";
import { stories } from "@/data/stories";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/generate-covers")({
  component: GenerateCoversPage,
});

// ✅ حط هنا فقط الـ slugs للقصص الجديدة اللي تبي تولّد أغلفتها.
// فرّغ المصفوفة (اتركها []) عشان تشغّل الأداة على كل القصص زي القديم.
const NEW_STORY_SLUGS: string[] = [];

interface ResultRow {
  slug: string;
  status: "pending" | "success" | "error";
  url?: string;
  prompt?: string;
  message?: string;
}

function GenerateCoversPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ إذا القائمة معبّية، نفلتر بس عليها. إذا فاضية، نشتغل على كل القصص.
  const targetStories =
    NEW_STORY_SLUGS.length > 0
      ? stories.filter((s) => NEW_STORY_SLUGS.includes(s.slug))
      : stories;

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

    for (let i = 0; i < targetStories.length; i++) {
      const story = targetStories[i];
      const prompt = buildCoverPrompt(story);

      // تأخير بسيط بين كل قصة وقصة (عدا أول واحدة) عشان نتجنب
      // Rate Limiting من Pollinations.ai
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      try {
        // 1) توليد الصورة الفوتوغرافية عبر Pollinations.ai
        const blob = await generateAIStoryCover({
          prompt,
          width: 1200,
          height: 800,
        });

        // 2) رفعها إلى Supabase Storage
        const filePath = `${story.slug}.png`;
        const { error: uploadError } = await supabase.storage
          .from("story-covers")
          .upload(filePath, blob, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // 3) جلب الرابط العام
        const { data: publicUrlData } = supabase.storage
          .from("story-covers")
          .getPublicUrl(filePath);

        // ✅ نضيف رقم عشوائي لآخر الرابط (cache-busting) عشان نتجنب
        // عرض نسخة قديمة مخزنة (cached) من نفس المسار بعد كل توليد جديد
        const bustedUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;

        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? {
                  ...r,
                  status: "success",
                  url: bustedUrl,
                  prompt,
                }
              : r
          )
        );
      } catch (err) {
        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? { ...r, status: "error", message: String(err), prompt }
              : r
          )
        );
      }
    }

    setRunning(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>توليد أغلفة القصص (AI فوتوغرافي)</h1>
      <p style={{ fontSize: 13, color: "#666" }}>
        يستخدم Pollinations.ai (خدمة مجانية طرف ثالث) لتوليد صور فوتوغرافية
        واقعية بناءً على وصف كل قصة.
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

            {r.prompt && (
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                البرومبت: {r.prompt}
              </div>
            )}

            {r.url && (
              <div style={{ marginTop: 6 }}>
                <img
                  src={r.url}
                  alt={r.slug}
                  style={{ width: 200, borderRadius: 8 }}
                />
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
