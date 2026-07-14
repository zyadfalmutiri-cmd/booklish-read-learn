import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { seedVocabBatch } from "@/lib/api/step-vocab-admin";
import type { ParsedVocabPair } from "@/types/step-vocab";

const ADMIN_EMAIL = "zyadf.almutiri@gmail.com";

export const Route = createFileRoute("/admin/step-seed")({
  component: StepSeedAdminPage,
});

// أي رقم من نطاقات الأحرف العربية (حروف + تشكيل + علامات)
const ARABIC_RUN_REGEX =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF][\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-–,()]*[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]*/g;

function extractPairsLocally(raw: string): ParsedVocabPair[] {
  // إزالة تكرار عنوان الملف بأسفل كل صفحة
  const cleaned = raw.replace(
    /"?أهم\s*800\s*كلمة إنجليزية في حياتك اليومية مع جمل توضيحية"?/g,
    " "
  );

  const englishSegments = cleaned
    .split(ARABIC_RUN_REGEX)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 0)
    .filter((s) => /[A-Za-z]/.test(s)); // يحذف الأرقام والرموز المنفردة

  const pairs: ParsedVocabPair[] = [];
  for (let i = 0; i + 1 < englishSegments.length; i += 2) {
    pairs.push({ word: englishSegments[i], example: englishSegments[i + 1] });
  }
  return pairs;
}

function StepSeedAdminPage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState<ParsedVocabPair[]>([]);
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

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-30), msg]);

  const handleExtract = () => {
    const result = extractPairsLocally(rawText);
    setParsed(result);
    setLog([`تم الاستخراج محليًا! وجدنا ${result.length} كلمة. راجعها قبل الحفظ.`]);
  };

  const updatePair = (index: number, field: "word" | "example", value: string) => {
    setParsed((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const removePair = (index: number) => {
    setParsed((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSeed = async () => {
    setSeeding(true);
    setProgress({ done: 0, total: parsed.length, failed: 0 });

    const batchSize = 15;
    let done = 0;
    let failed = 0;

    for (let i = 0; i < parsed.length; i += batchSize) {
      const batch = parsed.slice(i, i + batchSize);
      addLog(`تخزين الدفعة ${Math.floor(i / batchSize) + 1}...`);
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
          rows={8}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground"
          placeholder="الصق النص الكامل من الملف..."
        />
      </div>

      <button
        onClick={handleExtract}
        disabled={!rawText.trim()}
        className="mb-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        1️⃣ استخرج الكلمات (محليًا، بدون إنترنت)
      </button>

      {parsed.length > 0 && (
        <>
          <p className="mb-2 text-sm text-muted-foreground">
            راجع القائمة وعدّل أو احذف أي صف غلط قبل الحفظ ({parsed.length} كلمة)
          </p>
          <div className="mb-4 max-h-80 space-y-2 overflow-y-auto rounded-lg border border-border p-2">
            {parsed.map((p, i) => (
              <div key={i} className="flex gap-2 rounded-lg border border-border p-2">
                <div className="flex-1 space-y-1">
                  <input
                    value={p.word}
                    onChange={(e) => updatePair(i, "word", e.target.value)}
                    className="w-full rounded border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
                    dir="ltr"
                  />
                  <input
                    value={p.example}
                    onChange={(e) => updatePair(i, "example", e.target.value)}
                    className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                    dir="ltr"
                  />
                </div>
                <button
                  onClick={() => removePair(i)}
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSeed}
            disabled={seeding || parsed.length === 0}
            className="mb-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {seeding ? "جارٍ الترجمة والحفظ..." : `2️⃣ ترجم واحفظ (${parsed.length})`}
          </button>
        </>
      )}

      {progress.total > 0 && (
        <div className="mb-4 rounded-lg border border-border p-3 text-sm">
          <div className="mb-1 flex justify-between">
            <span>التقدم</span>
            <span>{progress.done + progress.failed} / {progress.total}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${((progress.done + progress.failed) / progress.total) * 100}%`,
              }}
            />
          </div>
          {progress.failed > 0 && (
            <p className="mt-1 text-xs text-destructive">فشل: {progress.failed}</p>
          )}
        </div>
      )}

      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">السجل:</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
