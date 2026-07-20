import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ⚠️ يحتاج متغيّر بيئة جديد بـ Vercel: SUPABASE_SERVICE_ROLE_KEY
// (لقيته بإعدادات مشروعك بـ Supabase: Settings → API → service_role key)
// هذا المفتاح يتجاوز الـ RLS عشان السيرفر يقدر يكتب بجدول library_chapter_quiz
// الجدول ما يعطي المستخدم العادي صلاحية insert مباشرة، فقط قراءة.
function getServiceSupabase() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

const QuizQuestionSchema = z.object({
  kind: z.literal("comprehension"),
  q: z.string(),
  choices: z.array(z.string()).length(4),
  answer: z.number().int().min(0).max(3),
});

const QuizResponseSchema = z.array(QuizQuestionSchema).length(4);

interface GenerateQuizResult {
  questions: z.infer<typeof QuizResponseSchema>;
  source: "cache" | "ai";
}

export const getOrGenerateChapterQuiz = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      bookSlug: z.string().min(1),
      chapterIndex: z.number().int().min(0),
      chapterText: z.string().min(1),
      chapterHeading: z.string().optional(),
    })
  )
  .handler(async ({ data }): Promise<GenerateQuizResult> => {
    const supabase = getServiceSupabase();

    // تحقق من وجود أسئلة محفوظة من قبل لنفس الفصل
    const { data: existing } = await supabase
      .from("library_chapter_quiz")
      .select("questions")
      .eq("book_slug", data.bookSlug)
      .eq("chapter_index", data.chapterIndex)
      .maybeSingle();

    if (existing?.questions) {
      return { questions: existing.questions, source: "cache" };
    }

    // نحدد طول النص المرسل للنموذج (تكلفة/سرعة) — أول ٦٠٠٠ حرف كافية لفهم الفصل
    const textForPrompt = data.chapterText.slice(0, 6000);

    const prompt = `You are creating a reading-comprehension quiz for an English-language learner (Arabic speaker) who just read the following chapter.

Chapter heading: ${data.chapterHeading ?? ""}

Chapter text:
"""
${textForPrompt}
"""

Write exactly 4 multiple-choice comprehension questions testing understanding of what happened in this chapter (plot, characters, key details) — NOT vocabulary or grammar questions.

Respond with ONLY a raw JSON array (no markdown, no code fences, no explanation), in exactly this shape:
[
  { "kind": "comprehension", "q": "question text in English", "choices": ["A", "B", "C", "D"], "answer": 0 }
]
"answer" is the zero-based index of the correct choice in "choices".`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter error: ${res.status}`);
    }

    const json = await res.json();
    const raw: string = json?.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse quiz JSON from model response");
    }

    const questions = QuizResponseSchema.parse(parsed);

    // خزّن الأسئلة عشان ما نعيد التوليد لنفس الفصل مرة ثانية
    await supabase.from("library_chapter_quiz").insert({
      book_slug: data.bookSlug,
      chapter_index: data.chapterIndex,
      questions,
    });

    return { questions, source: "ai" };
  });
