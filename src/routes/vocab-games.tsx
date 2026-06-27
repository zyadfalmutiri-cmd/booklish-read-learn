/**
 * src/routes/vocab-games.tsx
 *
 * صفحة ألعاب المفردات — 6 ألعاب:
 * 1. اسحب الكلمة إلى معناها (Drag & Match)
 * 2. رتب الحروف (Anagram)
 * 3. أكمل الكلمة (Fill in the blank)
 * 4. صح أو خطأ (True / False)
 * 5. Memory Game
 * 6. اختر الصحيح (Multiple Choice — replaces "اختر الصورة")
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useUserLevel } from "@/lib/reading-level";
import { VOCAB_DATA, type VocabWord } from "@/data/vocab-data";
import {
  Shuffle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Trophy,
  Brain,
  Layers,
  AlignLeft,
  ToggleLeft,
  Move,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/vocab-games")({
  component: VocabGamesPage,
});

// ─── helpers ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type GameId =
  | "menu"
  | "drag"
  | "anagram"
  | "fill"
  | "truefalse"
  | "memory"
  | "choice";

// ─── Root page ───────────────────────────────────────────────────────────────

function VocabGamesPage() {
  const { data } = useUserLevel();
  const [game, setGame] = useState<GameId>("menu");

  const words = VOCAB_DATA[data.cefrLevel] ?? VOCAB_DATA["A1"];

  if (game === "menu") return <GameMenu level={data.cefrLevel} wordCount={words.length} onSelect={setGame} />;
  if (game === "drag") return <DragGame words={words} onBack={() => setGame("menu")} />;
  if (game === "anagram") return <AnagramGame words={words} onBack={() => setGame("menu")} />;
  if (game === "fill") return <FillGame words={words} onBack={() => setGame("menu")} />;
  if (game === "truefalse") return <TrueFalseGame words={words} onBack={() => setGame("menu")} />;
  if (game === "memory") return <MemoryGame words={words} onBack={() => setGame("menu")} />;
  if (game === "choice") return <ChoiceGame words={words} onBack={() => setGame("menu")} />;
  return null;
}

// ─── Menu ────────────────────────────────────────────────────────────────────

const GAMES = [
  { id: "drag" as GameId, icon: Move, nameAr: "اسحب إلى المعنى", descAr: "طابق الكلمة مع ترجمتها" },
  { id: "anagram" as GameId, icon: Shuffle, nameAr: "رتب الحروف", descAr: "أعد ترتيب الحروف لتكوين الكلمة" },
  { id: "fill" as GameId, icon: AlignLeft, nameAr: "أكمل الكلمة", descAr: "أكمل الكلمة من المثال" },
  { id: "choice" as GameId, icon: Layers, nameAr: "اختر الصحيح", descAr: "اختر المعنى الصحيح للكلمة" },
  { id: "memory" as GameId, icon: Brain, nameAr: "Memory Game", descAr: "اعثر على الأزواج المتطابقة" },
  { id: "truefalse" as GameId, icon: ToggleLeft, nameAr: "صح أو خطأ", descAr: "هل المعنى صحيح؟" },
];

function GameMenu({ level, wordCount, onSelect }: { level: string; wordCount: number; onSelect: (g: GameId) => void }) {
  return (
    <main className="mx-auto max-w-lg px-4 pb-24 pt-8">
      <div className="mb-6 text-center">
        <h1 className="font-serif text-2xl font-semibold">ألعاب المفردات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          مستوى {level} — {wordCount} كلمة
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 text-right transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
          >
            <g.icon className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium text-sm">{g.nameAr}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{g.descAr}</p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

// ─── Shared components ────────────────────────────────────────────────────────

function GameHeader({ title, score, total, onBack }: { title: string; score: number; total: number; onBack: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">← رجوع</button>
      <span className="font-medium text-sm">{title}</span>
      <span className="text-sm text-primary font-bold">{score}/{total}</span>
    </div>
  );
}

function ScoreScreen({ score, total, onRestart, onBack }: { score: number; total: number; onRestart: () => void; onBack: () => void }) {
  const pct = Math.round((score / total) * 100);
  const msg = pct >= 80 ? "ممتاز! 🎉" : pct >= 60 ? "جيد جداً 👍" : "حاول مرة أخرى 💪";
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
      <Trophy className="h-12 w-12 text-yellow-500" />
      <h2 className="font-serif text-2xl font-semibold">{msg}</h2>
      <p className="text-4xl font-bold text-primary">{score}<span className="text-lg text-muted-foreground">/{total}</span></p>
      <p className="text-sm text-muted-foreground">{pct}% إجابات صحيحة</p>
      <div className="flex gap-3 mt-2">
        <button onClick={onRestart} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          <RotateCcw className="h-4 w-4" /> مرة أخرى
        </button>
        <button onClick={onBack} className="rounded-xl border border-border px-5 py-2.5 text-sm">
          القائمة
        </button>
      </div>
    </div>
  );
}

// ─── 1. Drag & Match ─────────────────────────────────────────────────────────

function DragGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const PAIRS = 6;
  const [batch, setBatch] = useState(() => pick(words, PAIRS));
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const leftWords = batch.map(w => w.word);
  const rightMeanings = shuffle(batch.map(w => w.ar));

  function handleLeft(word: string) {
    if (matched.has(word)) return;
    setSelected(word);
  }

  function handleRight(ar: string) {
    if (!selected) return;
    const correct = batch.find(w => w.word === selected)?.ar === ar;
    if (correct) {
      const newMatched = new Set(matched).add(selected);
      setMatched(newMatched);
      setScore(s => s + 1);
      setSelected(null);
      if (newMatched.size === PAIRS) {
        setRounds(r => r + 1);
        setTimeout(() => {
          setBatch(pick(words, PAIRS));
          setMatched(new Set());
          setSelected(null);
          if (rounds + 1 >= 3) setDone(true);
        }, 600);
      }
    } else {
      setWrong(ar);
      setTimeout(() => { setWrong(null); setSelected(null); }, 700);
    }
  }

  const total = 3 * PAIRS;

  if (done) return <ScoreScreen score={score} total={total} onRestart={() => { setScore(0); setRounds(0); setMatched(new Set()); setBatch(pick(words, PAIRS)); setDone(false); }} onBack={onBack} />;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <GameHeader title="اسحب إلى المعنى" score={score} total={total} onBack={onBack} />
      <p className="mb-4 text-center text-xs text-muted-foreground">اختر كلمة ثم اختر معناها</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {leftWords.map(word => (
            <button key={word} onClick={() => handleLeft(word)}
              className={cn("rounded-lg border px-3 py-3 text-sm font-medium transition-all",
                matched.has(word) ? "border-emerald-400 bg-emerald-50 text-emerald-700 line-through opacity-50 dark:bg-emerald-950 dark:text-emerald-300" :
                selected === word ? "border-primary bg-primary text-primary-foreground" :
                "border-border bg-card hover:border-primary"
              )}>
              {word}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rightMeanings.map(ar => {
            const isMatched = [...matched].some(w => batch.find(b => b.word === w)?.ar === ar);
            return (
              <button key={ar} onClick={() => handleRight(ar)}
                className={cn("rounded-lg border px-3 py-3 text-sm transition-all text-right",
                  isMatched ? "border-emerald-400 bg-emerald-50 text-emerald-700 line-through opacity-50 dark:bg-emerald-950 dark:text-emerald-300" :
                  wrong === ar ? "border-red-400 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300" :
                  "border-border bg-card hover:border-primary"
                )}>
                {ar}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(matched.size / PAIRS) * 100}%` }} />
      </div>
    </div>
  );
}

// ─── 2. Anagram ──────────────────────────────────────────────────────────────

function AnagramGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const TOTAL = 10;
  const [queue] = useState(() => pick(words.filter(w => w.word.length >= 4), TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [done, setDone] = useState(false);

  const current = queue[idx];

  useEffect(() => {
    if (current) {
      setLetters(shuffle(current.word.split("")));
      setAnswer([]);
      setStatus("playing");
    }
  }, [idx, current]);

  function tapLetter(i: number) {
    if (status !== "playing") return;
    const newLetters = [...letters];
    const [ch] = newLetters.splice(i, 1);
    setLetters(newLetters);
    setAnswer(a => [...a, ch]);
  }

  function tapAnswer(i: number) {
    if (status !== "playing") return;
    const newAnswer = [...answer];
    const [ch] = newAnswer.splice(i, 1);
    setAnswer(newAnswer);
    setLetters(l => [...l, ch]);
  }

  function checkAnswer() {
    const word = answer.join("");
    if (word === current.word) {
      setStatus("correct");
      setScore(s => s + 1);
    } else {
      setStatus("wrong");
    }
    setTimeout(() => {
      if (idx + 1 >= TOTAL) setDone(true);
      else setIdx(i => i + 1);
    }, 900);
  }

  function restart() { setIdx(0); setScore(0); setDone(false); }

  if (done) return <ScoreScreen score={score} total={TOTAL} onRestart={restart} onBack={onBack} />;
  if (!current) return null;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <GameHeader title="رتب الحروف" score={score} total={TOTAL} onBack={onBack} />
      <div className="mb-6 rounded-xl border border-border bg-card p-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">المعنى:</p>
        <p className="text-lg font-semibold">{current.ar}</p>
        {current.example && <p className="mt-2 text-xs text-muted-foreground italic">{current.example.replace(current.word, '_____')}</p>}
      </div>

      {/* Answer slots */}
      <div className="mb-4 flex min-h-12 flex-wrap justify-center gap-2">
        {answer.map((ch, i) => (
          <button key={i} onClick={() => tapAnswer(i)}
            className={cn("flex h-11 w-11 items-center justify-center rounded-lg border-2 text-base font-bold transition-all",
              status === "correct" ? "border-emerald-500 bg-emerald-50 text-emerald-700" :
              status === "wrong" ? "border-red-400 bg-red-50 text-red-600" :
              "border-primary bg-primary/10 text-primary"
            )}>
            {ch}
          </button>
        ))}
        {answer.length === 0 && <p className="text-sm text-muted-foreground self-center">اضغط على الحروف أدناه</p>}
      </div>

      {/* Letter pool */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {letters.map((ch, i) => (
          <button key={i} onClick={() => tapLetter(i)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-base font-bold transition-all hover:border-primary hover:bg-primary/5">
            {ch}
          </button>
        ))}
      </div>

      <button onClick={checkAnswer} disabled={answer.length !== current.word.length || status !== "playing"}
        className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-40">
        تحقق
      </button>

      {status === "wrong" && (
        <p className="mt-2 text-center text-sm text-red-500">الكلمة الصحيحة: <strong>{current.word}</strong></p>
      )}
    </div>
  );
}

// ─── 3. Fill in the blank ────────────────────────────────────────────────────

function FillGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const TOTAL = 10;
  const validWords = words.filter(w => w.example && w.example.toLowerCase().includes(w.word.toLowerCase()));
  const [queue] = useState(() => pick(validWords.length >= TOTAL ? validWords : words, TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [done, setDone] = useState(false);

  const current = queue[idx];

  function getPrompt(entry: VocabWord) {
    const regex = new RegExp(`\\b${entry.word}\\b`, "i");
    return entry.example?.replace(regex, "_____") ?? "_____";
  }

  function check() {
    const correct = input.trim().toLowerCase() === current.word.toLowerCase();
    setStatus(correct ? "correct" : "wrong");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= TOTAL) setDone(true);
      else { setIdx(i => i + 1); setInput(""); setStatus("playing"); }
    }, 1000);
  }

  function restart() { setIdx(0); setScore(0); setInput(""); setStatus("playing"); setDone(false); }

  if (done) return <ScoreScreen score={score} total={TOTAL} onRestart={restart} onBack={onBack} />;
  if (!current) return null;

  const hint = current.word[0] + current.word.slice(1).replace(/./g, "_");

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <GameHeader title="أكمل الكلمة" score={score} total={TOTAL} onBack={onBack} />
      <div className="mb-4 rounded-xl border border-border bg-card p-5">
        <p className="text-xs text-muted-foreground mb-2">المعنى: <span className="font-medium text-foreground">{current.ar}</span></p>
        <p className="font-serif text-lg leading-relaxed">{getPrompt(current)}</p>
      </div>
      <p className="mb-3 text-xs text-muted-foreground text-center">
        <Lightbulb className="inline h-3 w-3 mr-1" />
        تلميح: <span className="font-medium">{hint}</span> ({current.word.length} حروف)
      </p>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && check()}
        disabled={status !== "playing"}
        placeholder="اكتب الكلمة..."
        className={cn("w-full rounded-xl border px-4 py-3 text-sm outline-none mb-3 transition-all",
          status === "correct" ? "border-emerald-500 bg-emerald-50" :
          status === "wrong" ? "border-red-400 bg-red-50" :
          "border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
        )}
      />
      {status !== "playing" && (
        <p className={cn("mb-3 text-center text-sm font-medium",
          status === "correct" ? "text-emerald-600" : "text-red-500"
        )}>
          {status === "correct" ? "✓ صحيح!" : `✗ الإجابة: ${current.word}`}
        </p>
      )}
      <button onClick={check} disabled={!input.trim() || status !== "playing"}
        className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-40">
        تحقق
      </button>
    </div>
  );
}

// ─── 4. True / False ─────────────────────────────────────────────────────────

function TrueFalseGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const TOTAL = 12;
  const [queue, setQueue] = useState(() => buildTFQueue(words, TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [done, setDone] = useState(false);

  function buildTFQueue(ws: VocabWord[], n: number) {
    const pool = pick(ws, n);
    return pool.map((w, i) => {
      const isTrue = Math.random() > 0.5;
      if (isTrue) return { word: w.word, shown: w.ar, correct: true };
      const wrong = ws.filter(x => x.word !== w.word)[Math.floor(Math.random() * (ws.length - 1))];
      return { word: w.word, shown: wrong?.ar ?? w.ar, correct: false };
    });
  }

  const current = queue[idx];

  function answer(val: boolean) {
    if (status !== "playing") return;
    const correct = val === current.correct;
    setStatus(correct ? "correct" : "wrong");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= TOTAL) setDone(true);
      else { setIdx(i => i + 1); setStatus("playing"); }
    }, 800);
  }

  function restart() {
    setQueue(buildTFQueue(words, TOTAL));
    setIdx(0); setScore(0); setStatus("playing"); setDone(false);
  }

  if (done) return <ScoreScreen score={score} total={TOTAL} onRestart={restart} onBack={onBack} />;
  if (!current) return null;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <GameHeader title="صح أو خطأ" score={score} total={TOTAL} onBack={onBack} />
      <div className="mb-8 rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-xs text-muted-foreground mb-2">هل هذا المعنى صحيح؟</p>
        <p className="font-serif text-2xl font-semibold mb-3">{current.word}</p>
        <div className="inline-block rounded-lg bg-muted px-4 py-2">
          <p className="text-base">{current.shown}</p>
        </div>
        {status !== "playing" && (
          <p className={cn("mt-3 text-sm font-medium",
            status === "correct" ? "text-emerald-600" : "text-red-500"
          )}>
            {status === "correct" ? "✓ صحيح!" : `✗ المعنى الصحيح: ${words.find(w => w.word === current.word)?.ar}`}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => answer(true)} disabled={status !== "playing"}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-base font-bold text-white transition-all hover:bg-emerald-600 disabled:opacity-50">
          <CheckCircle2 className="h-5 w-5" /> صح
        </button>
        <button onClick={() => answer(false)} disabled={status !== "playing"}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-400 py-4 text-base font-bold text-white transition-all hover:bg-red-500 disabled:opacity-50">
          <XCircle className="h-5 w-5" /> خطأ
        </button>
      </div>
    </div>
  );
}

// ─── 5. Memory Game ──────────────────────────────────────────────────────────

interface MemoryCard {
  id: string;
  content: string;
  type: "word" | "ar";
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

function MemoryGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const PAIRS = 6;

  function buildDeck(ws: VocabWord[]) {
    const selected = pick(ws, PAIRS);
    const cards: MemoryCard[] = [];
    selected.forEach((w, i) => {
      cards.push({ id: `w-${i}`, content: w.word, type: "word", pairId: String(i), flipped: false, matched: false });
      cards.push({ id: `a-${i}`, content: w.ar, type: "ar", pairId: String(i), flipped: false, matched: false });
    });
    return shuffle(cards);
  }

  const [deck, setDeck] = useState<MemoryCard[]>(() => buildDeck(words));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const flip = useCallback((id: string) => {
    const card = deck.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flipped.length >= 2) return;

    const newFlipped = [...flipped, id];
    setDeck(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => deck.find(c => c.id === fid)!);
      if (a.pairId === b.pairId && a.type !== b.type) {
        setScore(s => s + 1);
        setDeck(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
        setFlipped([]);
        if (deck.filter(c => !c.matched).length - 2 === 0) setDone(true);
      } else {
        setTimeout(() => {
          setDeck(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 900);
      }
    }
  }, [deck, flipped]);

  function restart() {
    setDeck(buildDeck(words));
    setFlipped([]);
    setMoves(0);
    setScore(0);
    setDone(false);
  }

  if (done) return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
      <Trophy className="h-12 w-12 text-yellow-500" />
      <h2 className="font-serif text-2xl">أحسنت! 🎉</h2>
      <p className="text-muted-foreground text-sm">وجدت كل الأزواج في <strong>{moves}</strong> محاولة</p>
      <div className="flex gap-3">
        <button onClick={restart} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          <RotateCcw className="h-4 w-4" /> مرة أخرى
        </button>
        <button onClick={onBack} className="rounded-xl border border-border px-5 py-2.5 text-sm">القائمة</button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-muted-foreground">← رجوع</button>
        <span className="font-medium text-sm">Memory Game</span>
        <span className="text-sm text-muted-foreground">{moves} محاولة</span>
      </div>
      <p className="mb-4 text-center text-xs text-muted-foreground">اعثر على كل زوج كلمة + معنى</p>
      <div className="grid grid-cols-3 gap-2">
        {deck.map(card => (
          <button key={card.id} onClick={() => flip(card.id)}
            className={cn(
              "h-16 rounded-xl border text-xs font-medium transition-all duration-200",
              card.matched ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950" :
              card.flipped ? "border-primary bg-primary text-primary-foreground" :
              "border-border bg-card hover:border-primary"
            )}>
            {(card.flipped || card.matched) ? (
              <span className="px-1 leading-tight">{card.content}</span>
            ) : (
              <span className="text-xl">?</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 6. Multiple Choice ──────────────────────────────────────────────────────

function ChoiceGame({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const TOTAL = 10;
  const [queue] = useState(() => pick(words, TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const current = queue[idx];

  const choices = shuffle([
    current.ar,
    ...pick(words.filter(w => w.word !== current.word), 3).map(w => w.ar),
  ]);

  function choose(ar: string) {
    if (selected) return;
    setSelected(ar);
    if (ar === current.ar) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= TOTAL) setDone(true);
      else { setIdx(i => i + 1); setSelected(null); }
    }, 900);
  }

  function restart() { setIdx(0); setScore(0); setSelected(null); setDone(false); }

  if (done) return <ScoreScreen score={score} total={TOTAL} onRestart={restart} onBack={onBack} />;
  if (!current) return null;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-24">
      <GameHeader title="اختر الصحيح" score={score} total={TOTAL} onBack={onBack} />
      <div className="mb-6 rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-xs text-muted-foreground mb-2">ما معنى هذه الكلمة؟</p>
        <p className="font-serif text-3xl font-semibold">{current.word}</p>
        {current.example && (
          <p className="mt-3 text-xs text-muted-foreground italic">{current.example}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {choices.map(ar => {
          let cls = "rounded-xl border px-3 py-4 text-sm text-right transition-all ";
          if (selected) {
            if (ar === current.ar) cls += "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
            else if (ar === selected) cls += "border-red-400 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300";
            else cls += "border-border bg-card opacity-50";
          } else {
            cls += "border-border bg-card hover:border-primary hover:bg-primary/5";
          }
          return (
            <button key={ar} onClick={() => choose(ar)} className={cls}>{ar}</button>
          );
        })}
      </div>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((idx) / TOTAL) * 100}%` }} />
      </div>
    </div>
  );
}
