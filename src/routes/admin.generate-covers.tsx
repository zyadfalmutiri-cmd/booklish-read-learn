import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  generateAIStoryCover,
  buildCoverPrompt,
} from "@/lib/ai-cover-generator";
import { stories } from "@/data/stories";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/generate-covers")({
  component: GenerateCoversPage,
});

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

  async function handleGenerate() {
    setRunning(true);
    setResults(stories.map((s) => ({ slug: s.slug, status: "pending" })));

    for (const story of stories) {
      const prompt = buildCoverPrompt(story);

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

        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? {
                  ...r,
                  status: "success",
                  url: publicUrlData.publicUrl,
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

import { stories } from "@/data/stories";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/generate-covers")({
  component: GenerateCoversPage,
});

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

  async function handleGenerate() {
    setRunning(true);
    setResults(stories.map((s) => ({ slug: s.slug, status: "pending" })));

    for (const story of stories) {
      const prompt = buildCoverPrompt(story);

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

        setResults((prev) =>
          prev.map((r) =>
            r.slug === story.slug
              ? {
                  ...r,
                  status: "success",
                  url: publicUrlData.publicUrl,
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
