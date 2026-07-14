import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { parseVocabChunk, seedVocabBatch } from "@/lib/api/step-vocab-admin";
import type { ParsedVocabPair } from "@/types/step-vocab";

// ⚠️ بدّل هذا بإيميلك الفعلي — حماية بسيطة عشان محد غيرك يفتح الصفحة
const ADMIN_EMAIL = "zyadf.almutiri@gmail.com";

export const Route = createFileRoute("/admin/step-seed")({
  component: StepSeedAdminPage,
});

function StepSeedAdminPage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState<ParsedVocabPair[]>([]);
  const [parsing, setParsing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, failed: 0 });
  const [log, setLog] = useState<string[]>([]);

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        هذه الصفحة مخصصة للمطور فقط.
      </div>
    );
  }

  const addLog = (msg: string) =>
    setLog((prev) => [...prev.slice(-30), msg]);

  const handleParse = async () => {
    setParsing(true);
    setParsed([]);
    setLog([]);
    try {
      // نقسم النص لمقاطع كل ~4000 حرف عشان ما نتجاوز حد الموديل
      const chunks: string[] = [];
      for (let i = 0; i < rawText.length; i += 4000) {
        chunks.push(rawText.slice(i, i + 4000));
      }

      let all: ParsedVocabPair[] = [];
      for (let i = 0; i < chunks.length; i++) {
        addLog(`تحليل الجزء ${i + 1}/${chunks.length}...`);
        const result = await parseVocabChunk({ data: { rawText: chunks[i] } });
        all = [...all, ...result];
      }

      setParsed(all);
      addLog(`تم! استخرجنا ${all.length} كلمة.`);
    } catch (err) {
      addLog(`خطأ: ${String(err)}`);
    } finally {
      setParsing(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setProgress({ done: 0, total: parsed.length, failed: 0 });

    const batchSize = 10;
    let done = 0;
    let failed = 0;

    for (let i = 0; i < parsed.length; i += batchSize) {
      const batch = parsed.slice(i, i + batchSize);
      addLog(`تخزين الدفعة ${i / batchSize + 1}...`);
      try {
        const results = await seedVocabBatch({
          data: { items: batch, source: "daily800" },
        });
        done += results.filter((r) => r.ok).length;
        failed += results.filter((r) => !r.ok).length;
        setProgress({ done, total: parsed.length, failed });
      } catch (err) {
        addLog(`فشلت الدفعة: ${String(err)}`);
      }
    }

    addLog(`انتهى! تم: ${done}, فشل: ${failed}`);
    setSeeding(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
      <h1 className="mb-4 font-serif text-xl font-semibold text-foreground">
        🌱 تعبئة مفردات STEP (أدمن)
      </h1>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-foreground">
          الصق النص الخام من ملف الـ 800 كلمة هنا
        </label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={10}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground"
          placeholder="الصق النص الكامل من الملف..."
        />
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={handleParse}
          disabled={parsing || !rawText.trim()}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {parsing ? "جارٍ التحليل..." : "1️⃣ حلّل النص"}
        </button>
        <button
          onClick={handleSeed}
          disabled={seeding || parsed.length === 0}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {seeding ? "جارٍ التخزين..." : `2️⃣ خزّن (${parsed.length})`}
        </button>
      </div>

      {progress.total > 0 && (
        <div className="mb-4 rounded-lg border border-border p-3 text-sm">
          <div className="mb-1 flex justify-between">
            <span>التقدم</span>
            <span>
              {progress.done + progress.failed} / {progress.total}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${
                  ((progress.done + progress.failed) / progress.total) * 100
                }%`,
              }}
            />
          </div>
          {progress.failed > 0 && (
            <p className="mt-1 text-xs text-destructive">
              فشل: {progress.failed}
            </p>
          )}
        </div>
      )}

      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          السجل:
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
