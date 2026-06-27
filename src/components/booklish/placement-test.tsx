/**
 * PlacementTest — reading-based level placement.
 * Shows a real passage per CEFR level (A1→C2), asks 3 comprehension
 * questions, and advances the user if they score ≥ 2/3.
 * The final level is the highest one they pass.
 */

import { useState } from "react";
import { ChevronRight, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import type { CefrLevel } from "@/lib/reading-level";
import { LEVEL_INFO, CEFR_LEVELS } from "@/lib/reading-level";

// ─── Data ─────────────────────────────────────────────────────────────────

interface Question {
  text: string;
  choices: string[];
  answer: number; // index
}

interface Level {
  cefr: CefrLevel;
  passage: string;
  questions: Question[];
}

const LEVELS: Level[] = [
  {
    cefr: "A1",
    passage: `My Daily Routine

I wake up at 7:00 every morning. I wash my face and brush my teeth. Then I eat breakfast with my family. I usually have eggs and bread. After breakfast, I go to school. My classes start at 8:00. I like English because it is fun. After school, I do my homework. In the evening, I watch TV. I go to bed at 10:00.`,
    questions: [
      {
        text: "What time does the writer wake up?",
        choices: ["6:00", "7:00", "8:00", "10:00"],
        answer: 1,
      },
      {
        text: "What does the writer eat for breakfast?",
        choices: [
          "Rice and soup",
          "Cereal and milk",
          "Eggs and bread",
          "Fruit and yogurt",
        ],
        answer: 2,
      },
      {
        text: "Why does the writer like English?",
        choices: [
          "It is easy",
          "It is fun",
          "The teacher is nice",
          "It is important",
        ],
        answer: 1,
      },
    ],
  },
  {
    cefr: "A2",
    passage: `My Favorite Weekend

Every weekend, I like to spend time with my family. On Friday morning, we often go to the park. My younger brother plays football while I read a book. Sometimes we buy ice cream together. In the afternoon, we visit my grandparents. They always tell interesting stories. In the evening, we cook dinner at home. After dinner, we watch a movie. Weekends help me relax before school starts again. That is why weekends are my favorite time.`,
    questions: [
      {
        text: "What does the writer do while the brother plays football?",
        choices: [
          "Buys ice cream",
          "Reads a book",
          "Visits grandparents",
          "Watches TV",
        ],
        answer: 1,
      },
      {
        text: "Who tells interesting stories?",
        choices: ["The brother", "Friends", "Grandparents", "Teachers"],
        answer: 2,
      },
      {
        text: "Why does the writer love weekends?",
        choices: [
          "To play sports",
          "To study more",
          "To relax before school",
          "To meet new people",
        ],
        answer: 2,
      },
    ],
  },
  {
    cefr: "B1",
    passage: `Learning a New Skill

Last year, I decided to learn how to cook. At first, I made many mistakes because I had little experience. Sometimes the food was too salty or not cooked enough. Instead of giving up, I watched cooking videos and practiced every week. Slowly, I became more confident in the kitchen. Now I can prepare several meals for my family. Cooking has also taught me to be patient and organized. It is satisfying to create something with my own hands. I believe anyone can improve with regular practice. Learning new skills takes time, but it is always worthwhile.`,
    questions: [
      {
        text: "What was the writer's first problem when learning to cook?",
        choices: [
          "No kitchen equipment",
          "Little experience and many mistakes",
          "No time to practice",
          "Expensive ingredients",
        ],
        answer: 1,
      },
      {
        text: "How did the writer improve their cooking?",
        choices: [
          "Took a cooking class",
          "Asked family for help",
          "Watched videos and practiced weekly",
          "Read cookbooks",
        ],
        answer: 2,
      },
      {
        text: "What life lesson did cooking teach the writer?",
        choices: [
          "How to save money",
          "To be patient and organized",
          "To follow instructions exactly",
          "That mistakes should be avoided",
        ],
        answer: 1,
      },
    ],
  },
  {
    cefr: "B2",
    passage: `The Impact of Technology

Technology has changed the way people communicate and learn. Today, students can access information from almost anywhere. Online courses have made education more flexible than ever before. However, technology also creates new challenges. Many people spend too much time looking at screens instead of interacting face to face. In addition, false information can spread quickly on social media. For this reason, it is important to think critically before believing everything online. When used responsibly, technology can improve productivity and creativity. The key is to balance digital life with real-life experiences.`,
    questions: [
      {
        text: "According to the text, what is one challenge of technology?",
        choices: [
          "It is too expensive",
          "False information spreads quickly",
          "Courses are hard to find",
          "It slows down communication",
        ],
        answer: 1,
      },
      {
        text: "What does the writer say about online courses?",
        choices: [
          "They are not effective",
          "They are only for students",
          "They made education more flexible",
          "They replace traditional schools",
        ],
        answer: 2,
      },
      {
        text: "What is the writer's main suggestion?",
        choices: [
          "Stop using social media",
          "Balance digital and real-life experiences",
          "Only use technology for work",
          "Trust online information more",
        ],
        answer: 1,
      },
    ],
  },
  {
    cefr: "C1",
    passage: `The Value of Failure

Many people view failure as something to avoid at all costs. In reality, failure often provides lessons that success cannot. When individuals encounter setbacks, they are forced to evaluate their decisions and adjust their strategies. This process encourages resilience, adaptability, and deeper self-awareness. Some of the world's most successful entrepreneurs experienced repeated failures before achieving their goals. Rather than seeing mistakes as evidence of weakness, they treated them as opportunities for improvement. A growth mindset allows people to transform disappointment into motivation. Although failure can be emotionally difficult, its long-term benefits are frequently underestimated.`,
    questions: [
      {
        text: "What does the writer argue about failure?",
        choices: [
          "It should always be avoided",
          "It provides lessons success cannot",
          "It only affects weak people",
          "It is less common for entrepreneurs",
        ],
        answer: 1,
      },
      {
        text: "What is a 'growth mindset' according to the text?",
        choices: [
          "Believing you are always right",
          "Avoiding difficult challenges",
          "Transforming disappointment into motivation",
          "Focusing only on strengths",
        ],
        answer: 2,
      },
      {
        text: "What does the writer say about successful entrepreneurs?",
        choices: [
          "They rarely experienced failure",
          "They viewed mistakes as opportunities",
          "They succeeded on their first try",
          "They avoided taking risks",
        ],
        answer: 1,
      },
    ],
  },
  {
    cefr: "C2",
    passage: `The Complexity of Decision-Making

Decision-making is rarely as rational as people imagine it to be. Although individuals often believe they evaluate evidence objectively, subconscious biases frequently influence their conclusions. These biases are shaped by personal experiences, cultural expectations, and emotional responses that may go unnoticed. Consequently, two well-informed people can examine the same information and reach entirely different judgments. Recognizing this complexity requires intellectual humility rather than excessive confidence. It also highlights the importance of questioning one's assumptions and remaining open to alternative perspectives. In professional environments, effective decisions often emerge through careful collaboration rather than individual certainty.`,
    questions: [
      {
        text: "What is the writer's central argument?",
        choices: [
          "Experts always make better decisions",
          "Decision-making is more rational with data",
          "Subconscious biases affect even informed people",
          "Collaboration always leads to wrong decisions",
        ],
        answer: 2,
      },
      {
        text: "What does 'intellectual humility' mean in this context?",
        choices: [
          "Being unsure about everything",
          "Recognizing the limits of your own thinking",
          "Deferring all decisions to others",
          "Avoiding difficult topics",
        ],
        answer: 1,
      },
      {
        text: "According to the text, how do effective professional decisions usually emerge?",
        choices: [
          "Through individual certainty",
          "By ignoring emotions",
          "Through careful collaboration",
          "By collecting more data",
        ],
        answer: 2,
      },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────

/** Returns the highest level where user scored ≥ 2/3 questions correct.
 *  Falls back to A1 if none passed. */
function calcLevel(results: boolean[][]): CefrLevel {
  // results[i] = array of 3 booleans for LEVELS[i]
  const passedIdx = results
    .map((r, i) => ({ i, passed: r.filter(Boolean).length >= 2 }))
    .filter((x) => x.passed)
    .map((x) => x.i);

  if (passedIdx.length === 0) return "A1";

  const lastPassedIdx = passedIdx[passedIdx.length - 1];
  // Promote one level above the last passed (ready for that content)
  const nextIdx = Math.min(lastPassedIdx + 1, CEFR_LEVELS.length - 1);
  return CEFR_LEVELS[nextIdx] as CefrLevel;
}

// ─── Component ────────────────────────────────────────────────────────────

interface Props {
  onComplete: (level: CefrLevel) => void;
}

type Phase = "intro" | "reading" | "questions" | "result";

export function PlacementTest({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [levelIdx, setLevelIdx] = useState(0); // which passage we're on
  const [qIdx, setQIdx] = useState(0); // which question within passage
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  // results[levelIdx][qIdx] = correct?
  const [results, setResults] = useState<boolean[][]>(
    LEVELS.map(() => [])
  );
  const [resultLevel, setResultLevel] = useState<CefrLevel>("A1");

  const currentLevel = LEVELS[levelIdx];
  const currentQ = currentLevel.questions[qIdx];
  const totalLevels = LEVELS.length;
  const overallProgress = Math.round(
    ((levelIdx * 3 + qIdx) / (totalLevels * 3)) * 100
  );

  function handleSelect(idx: number) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleNext() {
    if (selected === null) return;
    const correct = selected === currentQ.answer;
    setConfirmed(true);

    setTimeout(() => {
      // Save result
      const newResults = results.map((r, i) =>
        i === levelIdx ? [...r, correct] : r
      );
      setResults(newResults);

      const isLastQ = qIdx + 1 >= currentLevel.questions.length;
      const isLastLevel = levelIdx + 1 >= LEVELS.length;

      if (isLastQ) {
        // Check if user passed this level (≥ 2/3 correct including current)
        const levelResults = [...(results[levelIdx] ?? []), correct];
        const passed = levelResults.filter(Boolean).length >= 2;

        if (!passed || isLastLevel) {
          // Stop here — compute final level
          const finalLevel = calcLevel(
            newResults.map((r, i) => (i === levelIdx ? [...r] : r))
          );
          setResultLevel(finalLevel);
          setPhase("result");
          return;
        }

        // Move to next level
        setLevelIdx((l) => l + 1);
        setQIdx(0);
        setSelected(null);
        setConfirmed(false);
        setPhase("reading");
      } else {
        setQIdx((q) => q + 1);
        setSelected(null);
        setConfirmed(false);
      }
    }, 700);
  }

  // ── Intro ──────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 font-serif text-2xl font-semibold">
            اكتشف مستواك القرائي
          </h1>
          <p className="mb-1 text-base text-muted-foreground">
            Discover your reading level
          </p>
          <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
            ستقرأ نصوصاً قصيرة بالإنجليزية من مستوى A1 حتى C2، ثم تجيب على
            3 أسئلة لكل نص. سيتوقف الاختبار تلقائياً عند تحديد مستواك.
          </p>

          <div className="mb-8 grid grid-cols-3 gap-2">
            {CEFR_LEVELS.map((lvl) => (
              <div
                key={lvl}
                className={`rounded-xl bg-gradient-to-br ${LEVEL_INFO[lvl].color} p-3 text-center`}
              >
                <div className="text-lg font-bold">{lvl}</div>
                <div className="text-xs">{LEVEL_INFO[lvl].nameAr}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("reading")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ابدأ الاختبار
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────
  if (phase === "result") {
    const info = LEVEL_INFO[resultLevel];
    const totalCorrect = results.flat().filter(Boolean).length;
    const totalAnswered = results.flat().length;

    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div
            className={`mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${info.color}`}
          >
            <span className="text-4xl font-bold">{resultLevel}</span>
          </div>
          <h1 className="mb-1 font-serif text-2xl font-semibold">
            مستواك هو {resultLevel}
          </h1>
          <p className="mb-1 text-base font-medium">{info.nameEn}</p>
          <p className="mb-2 text-sm text-muted-foreground">{info.nameAr}</p>
          <p className="mb-8 text-sm text-muted-foreground">{info.descAr}</p>

          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-right">
            <p className="mb-1 text-xs text-muted-foreground">نتيجة الاختبار</p>
            <p className="text-sm">
              أجبت بشكل صحيح على{" "}
              <span className="font-bold text-primary">{totalCorrect}</span> من{" "}
              {totalAnswered} سؤال
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              ستظهر لك القصص المناسبة لمستواك. بعد إكمال 7 قصص ستنتقل
              للمستوى التالي تلقائياً.
            </p>
          </div>

          <button
            onClick={() => onComplete(resultLevel)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ابدأ القراءة
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Reading phase ───────────────────────────────────────────────────────
  if (phase === "reading") {
    const info = LEVEL_INFO[currentLevel.cefr];
    return (
      <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
        {/* Progress */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>المستوى {currentLevel.cefr}</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Level badge */}
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br ${info.color} px-4 py-1.5`}
        >
          <span className="text-sm font-bold">{currentLevel.cefr}</span>
          <span className="text-xs">{info.nameAr}</span>
        </div>

        <p className="mb-3 text-xs text-muted-foreground">
          اقرأ النص التالي ثم أجب على الأسئلة:
        </p>

        {/* Passage */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          {currentLevel.passage.split("\n").map((line, i) =>
            line.trim() === "" ? (
              <br key={i} />
            ) : i === 0 ? (
              <p key={i} className="mb-3 font-serif text-lg font-semibold">
                {line}
              </p>
            ) : (
              <p key={i} className="text-sm leading-relaxed text-foreground">
                {line}
              </p>
            )
          )}
        </div>

        <button
          onClick={() => setPhase("questions")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          انتقل للأسئلة
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ── Questions phase ─────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      {/* Progress */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {currentLevel.cefr} — سؤال {qIdx + 1} من 3
          </span>
          <span>{overallProgress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <p className="mb-4 text-base font-medium leading-relaxed">
          {currentQ.text}
        </p>

        <div className="space-y-2">
          {currentQ.choices.map((choice, idx) => {
            let cls =
              "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ";
            if (confirmed) {
              if (idx === currentQ.answer)
                cls +=
                  "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
              else if (idx === selected)
                cls +=
                  "border-red-400 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300";
              else cls += "border-border bg-background opacity-50";
            } else {
              cls +=
                idx === selected
                  ? "border-primary bg-primary/10 font-medium"
                  : "border-border bg-background hover:border-primary hover:bg-primary/5";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={confirmed}
                className={cls}
              >
                <span className="flex-1">{choice}</span>
                {confirmed && idx === currentQ.answer && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                )}
                {confirmed && idx === selected && idx !== currentQ.answer && (
                  <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Back to passage */}
      <button
        onClick={() => setPhase("reading")}
        className="mb-3 w-full rounded-xl border border-border px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        ← أعد قراءة النص
      </button>

      <button
        onClick={handleNext}
        disabled={selected === null || confirmed}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-40"
      >
        {qIdx + 1 === 3 ? "التالي" : "السؤال التالي"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
