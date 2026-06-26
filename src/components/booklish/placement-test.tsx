import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, BookOpen } from "lucide-react";
import type { CefrLevel } from "@/lib/reading-level";
import { LEVEL_INFO, CEFR_LEVELS } from "@/lib/reading-level";

interface Question {
  id: number;
  targetLevel: CefrLevel;
  text: string;
  textEn: string;
  sentence: string;
  choices: string[];
  answer: number;
}

const QUESTIONS: Question[] = [
  { id: 1, targetLevel: "A1", text: "اختر الكلمة الصحيحة:", textEn: "Choose the correct word:", sentence: "I ___ a student.", choices: ["am", "is", "are", "be"], answer: 0 },
  { id: 2, targetLevel: "A1", text: "اختر الكلمة الصحيحة:", textEn: "Choose the correct word:", sentence: "She ___ to school every day.", choices: ["go", "goes", "going", "gone"], answer: 1 },
  { id: 3, targetLevel: "A2", text: "اختر الكلمة الصحيحة:", textEn: "Choose the correct word:", sentence: "Yesterday I ___ a good book.", choices: ["read", "reads", "reading", "to read"], answer: 0 },
  { id: 4, targetLevel: "A2", text: "اختر الجملة الصحيحة:", textEn: "Choose the correct sentence:", sentence: "He told me that he ___ tired.", choices: ["is", "was", "were", "be"], answer: 1 },
  { id: 5, targetLevel: "B1", text: "اختر الكلمة الصحيحة:", textEn: "Choose the correct word:", sentence: "If I ___ more time, I would travel.", choices: ["have", "had", "has", "having"], answer: 1 },
  { id: 6, targetLevel: "B1", text: "أي كلمة تناسب الفراغ؟", textEn: "Which word fits the blank?", sentence: "The report was ___ by the manager before it was sent.", choices: ["reviewing", "reviewed", "review", "to review"], answer: 1 },
  { id: 7, targetLevel: "B2", text: "أكمل الجملة بشكل صحيح:", textEn: "Complete the sentence correctly:", sentence: "Had she known about the meeting, she ___ attended.", choices: ["would", "would have", "will have", "had"], answer: 1 },
  { id: 8, targetLevel: "B2", text: "اختر المعنى الصحيح:", textEn: "What does this sentence imply?", sentence: '"The proposal was not without merit." This means the proposal was...', choices: ["completely useless", "somewhat good", "perfect", "rejected"], answer: 1 },
  { id: 9, targetLevel: "C1", text: "اختر الكلمة الأنسب:", textEn: "Choose the most appropriate word:", sentence: "The author's ___ use of irony challenges the reader's assumptions.", choices: ["simple", "subtle", "obvious", "heavy"], answer: 1 },
  { id: 10, targetLevel: "C2", text: "اختر الخيار الأدق معنىً:", textEn: "Choose the most precise option:", sentence: "The new policy is likely to ___ significant controversy among stakeholders.", choices: ["make", "provoke", "do", "build"], answer: 1 },
];

function calcLevel(answers: boolean[]): CefrLevel {
  const byLevel: Record<CefrLevel, boolean[]> = { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] };
  QUESTIONS.forEach((q, i) => byLevel[q.targetLevel].push(answers[i]));
  const passed = (lvl: CefrLevel) => { const g = byLevel[lvl]; return g.length > 0 && g.filter(Boolean).length >= Math.ceil(g.length / 2); };
  const passedLevels = CEFR_LEVELS.filter(passed);
  if (passedLevels.length === 0) return "A1";
  const lastPassed = passedLevels[passedLevels.length - 1];
  const idx = CEFR_LEVELS.indexOf(lastPassed);
  return CEFR_LEVELS[Math.min(idx + 1, CEFR_LEVELS.length - 1)] as CefrLevel;
}

interface Props { onComplete: (level: CefrLevel) => void; }
type Phase = "intro" | "test" | "result";

export function PlacementTest({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [resultLevel, setResultLevel] = useState<CefrLevel>("A1");

  const question = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);

  function handleNext() {
    if (selected === null) return;
    const correct = selected === question.answer;
    setConfirmed(true);
    setTimeout(() => {
      const newAnswers = [...answers, correct];
      if (current + 1 >= QUESTIONS.length) {
        const level = calcLevel(newAnswers);
        setResultLevel(level);
        setAnswers(newAnswers);
        setPhase("result");
      } else {
        setAnswers(newAnswers);
        setCurrent((c) => c + 1);
        setSelected(null);
        setConfirmed(false);
      }
    }, 700);
  }

  if (phase === "intro") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 font-serif text-2xl font-semibold">اكتشف مستواك القرائي</h1>
          <p className="mb-1 text-base text-muted-foreground">Discover your reading level</p>
          <p className="mb-8 text-sm text-muted-foreground">١٠ أسئلة قصيرة تحدد مستواك من A1 حتى C2</p>
          <div className="mb-8 grid grid-cols-3 gap-2">
            {CEFR_LEVELS.map((lvl) => (
              <div key={lvl} className={`rounded-xl bg-gradient-to-br ${LEVEL_INFO[lvl].color} p-3 text-center`}>
                <div className="text-lg font-bold">{lvl}</div>
                <div className="text-xs">{LEVEL_INFO[lvl].nameAr}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setPhase("test")} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            ابدأ الاختبار <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const info = LEVEL_INFO[resultLevel];
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className={`mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${info.color}`}>
            <span className="text-4xl font-bold">{resultLevel}</span>
          </div>
          <h1 className="mb-1 font-serif text-2xl font-semibold">مستواك هو {resultLevel}</h1>
          <p className="mb-1 text-base font-medium">{info.nameEn}</p>
          <p className="mb-2 text-sm text-muted-foreground">{info.nameAr}</p>
          <p className="mb-8 text-sm text-muted-foreground">{info.descAr}</p>
          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-right">
            <p className="mb-1 text-xs text-muted-foreground">نتيجة الاختبار</p>
            <p className="text-sm">أجبت بشكل صحيح على <span className="font-bold text-primary">{answers.filter(Boolean).length}</span> من {QUESTIONS.length} سؤال</p>
            <p className="mt-2 text-xs text-muted-foreground">بعد إكمال 7 قصص ستنتقل للمستوى التالي تلقائياً.</p>
          </div>
          <button onClick={() => onComplete(resultLevel)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            ابدأ القراءة <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>سؤال {current + 1} من {QUESTIONS.length}</span>
            <span className="font-medium text-primary">{question.targetLevel}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <p className="mb-1 text-sm text-muted-foreground">{question.text}</p>
          <p className="mb-4 font-serif text-lg leading-relaxed">{question.sentence}</p>
          <div className="space-y-2">
            {question.choices.map((choice, idx) => {
              let cls = "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ";
              if (confirmed) {
                if (idx === question.answer) cls += "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
                else if (idx === selected) cls += "border-red-400 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300";
                else cls += "border-border bg-background opacity-50";
              } else {
                cls += idx === selected ? "border-primary bg-primary/10 font-medium" : "border-border bg-background hover:border-primary hover:bg-primary/5";
              }
              return (
                <button key={idx} onClick={() => !confirmed && setSelected(idx)} disabled={confirmed} className={cls}>
                  <span className="flex-1">{choice}</span>
                  {confirmed && idx === question.answer && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                  {confirmed && idx === selected && idx !== question.answer && <XCircle className="h-4 w-4 shrink-0 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={handleNext} disabled={selected === null || confirmed} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-40">
          {current + 1 === QUESTIONS.length ? "إنهاء الاختبار" : "السؤال التالي"} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
