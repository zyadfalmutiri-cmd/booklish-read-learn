import { useSettings } from "@/components/booklish/theme";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const DICT: Dict = {
  // Brand & nav
  "brand.name": { ar: "Booklish", en: "Booklish" },
  "nav.library": { ar: "المكتبة", en: "Library" },
  "nav.dashboard": { ar: "الإحصائيات", en: "Dashboard" },
  "nav.vocab": { ar: "كلماتي", en: "Vocabulary" },
  "nav.review": { ar: "المراجعة", en: "Review" },

  // Common
  "common.minutes": { ar: "دقيقة", en: "min" },
  "common.minLeft": { ar: "دقيقة متبقية", en: "min left" },
  "common.day": { ar: "يوم", en: "day" },
  "common.days": { ar: "أيام", en: "days" },
  "common.searchPlaceholder": { ar: "ابحث عن قصة...", en: "Search a story…" },
  "common.allCategories": { ar: "كل التصنيفات", en: "All genres" },
  "common.allLevels": { ar: "كل المستويات", en: "All levels" },
  "common.allTypes": { ar: "كل الأنواع", en: "All types" },
  "common.noMatch": { ar: "لا توجد قصص تطابق هذه الفلاتر حالياً.", en: "No stories match these filters." },
  "common.back": { ar: "رجوع", en: "Back" },
  "common.toggleTheme": { ar: "تبديل السمة", en: "Toggle theme" },
  "common.toggleLang": { ar: "اللغة: عربي", en: "Language: English" },

  // Home
  "home.kicker": { ar: "اقرأ. انقر. تعلّم.", en: "Read. Tap. Learn." },
  "home.title": {
    ar: "تعلّم الإنجليزية كما يفعل القراء — قصة واحدة في كل مرة.",
    en: "Learn English the way readers do — one story at a time.",
  },
  "home.sub": {
    ar: "يحوّل Booklish القصص القصيرة إلى دروس لغوية. انقر على أي كلمة للحصول على معناها بالعربية وتعريفها بالإنجليزية.",
    en: "Booklish turns short stories into language lessons. Tap any word for an Arabic meaning and an English definition.",
  },
  "home.browse": { ar: "تصفح المكتبة", en: "Browse the library" },
  "home.streakLabel": { ar: "متتالية", en: "streak" },
  "home.continue": { ar: "تابع القراءة", en: "Continue reading" },
  "home.featured": { ar: "قصص مختارة", en: "Featured stories" },
  "home.viewAll": { ar: "عرض الكل", en: "View all" },
  "home.readPct": { ar: "تمت قراءة", en: "Read" },

  // XP & Levels
  "xp.level": { ar: "المستوى", en: "Level" },
  "xp.xpToNext": { ar: "XP للمستوى التالي", en: "XP to next level" },
  "xp.level.beginner": { ar: "مبتدئ", en: "Beginner" },
  "xp.level.intermediate": { ar: "متوسط", en: "Intermediate" },
  "xp.level.advanced": { ar: "متقدم", en: "Advanced" },
  "xp.goal.daily": { ar: "هدف اليوم", en: "Daily goal" },
  "xp.goal.words": { ar: "احفظ كلمات اليوم", en: "Save today's words" },
  "xp.goal.read": { ar: "اقرأ اليوم", en: "Read today" },

  // Library
  "library.title": { ar: "المكتبة", en: "Library" },
  "library.subtitle": { ar: "قصة بمختلف التصنيفات والمستويات.", en: "stories across genres and levels." },

  // Genres
  "genre.mystery": { ar: "غموض", en: "Mystery" },
  "genre.romance": { ar: "رومانسية", en: "Romance" },
  "genre.sci-fi": { ar: "خيال علمي", en: "Sci-Fi" },
  "genre.adventure": { ar: "مغامرة", en: "Adventure" },
  "genre.drama": { ar: "دراما", en: "Drama" },
  "genre.non-fiction": { ar: "واقعي", en: "Non-Fiction" },

  // Levels
  "level.beginner": { ar: "مبتدئ", en: "Beginner" },
  "level.intermediate": { ar: "متوسط", en: "Intermediate" },
  "level.advanced": { ar: "متقدم", en: "Advanced" },

  // Categories
  "category.short": { ar: "قصيرة", en: "Short" },
  "category.fiction": { ar: "خيال", en: "Fiction" },
  "category.non-fiction": { ar: "واقعية", en: "Non-Fiction" },

  // Story page
  "story.start": { ar: "ابدأ القراءة", en: "Start reading" },
  "story.continue": { ar: "متابعة القراءة", en: "Continue reading" },
  "story.bookmark": { ar: "حفظ القصة", en: "Bookmark" },
  "story.bookmarked": { ar: "تم الحفظ", en: "Bookmarked" },
  "story.takeQuiz": { ar: "أداء الاختبار", en: "Take the quiz" },
  "story.keyVocab": { ar: "أهم المفردات في هذه القصة", en: "Key vocabulary in this story" },

  // Read
  "read.finishedQ": { ar: "هل أنهيت القصة؟", en: "Finished the story?" },
  "read.takeQuiz": { ar: "خذ اختبار الاستيعاب", en: "Take the comprehension quiz" },
  "read.smaller": { ar: "نص أصغر", en: "Smaller text" },
  "read.larger": { ar: "نص أكبر", en: "Larger text" },
  "read.translateMode": { ar: "وضع الترجمة", en: "Translation mode" },
  "read.tm.off": { ar: "إيقاف", en: "Off" },
  "read.tm.words": { ar: "كلمات", en: "Words" },
  "read.tm.sentences": { ar: "جمل", en: "Sent." },
  "read.focusOn": { ar: "وضع التركيز", en: "Focus mode" },
  "read.focusOff": { ar: "إنهاء وضع التركيز", en: "Exit focus mode" },

  // Word popover
  "word.meaning": { ar: "المعنى", en: "Meaning" },
  "word.definition": { ar: "التعريف", en: "Definition" },
  "word.example": { ar: "مثال", en: "Example" },
  "word.saveVocab": { ar: "حفظ في القاموس", en: "Save to vocab" },
  "word.saved": { ar: "محفوظة ✓", en: "Saved ✓" },
  "word.type.noun": { ar: "اسم", en: "noun" },
  "word.type.verb": { ar: "فعل", en: "verb" },
  "word.type.adjective": { ar: "صفة", en: "adj." },
  "word.type.adverb": { ar: "ظرف", en: "adv." },
  "word.type.phrase": { ar: "عبارة", en: "phrase" },

  // Dashboard
  "dash.title": { ar: "سجل القراءة", en: "Reading log" },
  "dash.subtitle": { ar: "سجل هادئ لما قرأته وتعلمته.", en: "A quiet record of what you've read and learned." },
  "dash.streakDays": { ar: "أيام متتالية", en: "Day streak" },
  "dash.longest": { ar: "الأطول", en: "Longest" },
  "dash.finished": { ar: "قصص مكتملة", en: "Stories finished" },
  "dash.remaining": { ar: "قصص متبقية", en: "stories remaining" },
  "dash.uniqueWords": { ar: "كلمات فريدة", en: "Unique words" },
  "dash.saved": { ar: "محفوظة", en: "saved" },
  "dash.readingTime": { ar: "وقت القراءة", en: "Reading time" },
  "dash.activeOnly": { ar: "الوقت النشط فقط", en: "Active time only" },
  "dash.totalTaps": { ar: "إجمالي النقرات", en: "Total taps" },
  "dash.tapsHint": { ar: "كلمات بحثت عنها", en: "words looked up" },
  "dash.quizAvg": { ar: "متوسط الاختبار", en: "Avg quiz score" },
  "dash.tookN": { ar: "أديت", en: "Took" },
  "dash.attempts": { ar: "اختباراً", en: "attempts" },
  "dash.inProgress": { ar: "قيد القراءة", en: "In progress" },
  "dash.continueBelow": { ar: "تابع إحداها بالأسفل", en: "Continue one below" },
  "dash.savedWords": { ar: "كلمات محفوظة", en: "Saved words" },
  "dash.openList": { ar: "افتح القائمة", en: "Open list" },
  "dash.tapToSave": { ar: "انقر لحفظ كلمة", en: "Tap to save a word" },
  "dash.last14": { ar: "آخر 14 يوماً", en: "Last 14 days" },
  "dash.quizHistory": { ar: "سجل الاختبارات", en: "Quiz history" },

  // Vocab
  "vocab.title": { ar: "كلماتي المحفوظة", en: "My saved words" },
  "vocab.subPrefix": { ar: "الكلمات التي قمت بحفظها أثناء القراءة.", en: "Words you saved while reading." },
  "vocab.wordCount": { ar: "كلمة", en: "word" },
  "vocab.wordCountPlural": { ar: "كلمات", en: "words" },
  "vocab.searchPh": { ar: "ابحث عن كلمة، معنى أو تعريف...", en: "Search a word, meaning, or definition…" },
  "vocab.empty": { ar: "قائمة كلماتك فارغة.", en: "Your word list is empty." },
  "vocab.emptyHint": { ar: "أثناء القراءة، اضغط على أي كلمة واختر «حفظ الكلمة».", en: "While reading, tap a word and choose Save to vocab." },
  "vocab.browse": { ar: "تصفح المكتبة", en: "Browse library" },
  "vocab.fromStory": { ar: "من قصة", en: "From" },
  "vocab.delete": { ar: "حذف", en: "Delete" },
  "vocab.noMatch": { ar: "لا توجد كلمات تطابق البحث.", en: "No words match your search." },
  "vocab.startReview": { ar: "ابدأ المراجعة", en: "Start review" },
  "vocab.dueNow": { ar: "مستحقة الآن", en: "due now" },
  "vocab.speak": { ar: "استمع للنطق", en: "Hear pronunciation" },
  "vocab.stopSpeak": { ar: "إيقاف النطق", en: "Stop speaking" },

  // Quiz
  "quiz.kicker": { ar: "استيعاب", en: "Comprehension" },
  "quiz.k.main-idea": { ar: "فكرة رئيسية", en: "Main idea" },
  "quiz.k.event": { ar: "حدث", en: "Event" },
  "quiz.k.vocab": { ar: "مفردات", en: "Vocabulary" },
  "quiz.submit": { ar: "إرسال الإجابات", en: "Submit answers" },
  "quiz.youScored": { ar: "حصلت على", en: "You scored" },
  "quiz.perfect": { ar: "ممتاز — قراءة محترفة.", en: "Perfect — masterful reading." },
  "quiz.nice": { ar: "أحسنت. حاول الإجابات الخاطئة لاحقاً.", en: "Nice work. Try the missed ones again later." },
  "quiz.reread": { ar: "أعد قراءة القصة وحاول مجدداً.", en: "Re-read the story and try again." },
  "quiz.saveMissed": { ar: "احفظ الكلمات الخاطئة", en: "Save missed words to vocab" },
  "quiz.tryAgain": { ar: "حاول مجدداً", en: "Try again" },
  "quiz.backLibrary": { ar: "العودة للمكتبة", en: "Back to library" },
  "quiz.xpEarned": { ar: "نقاط XP مكتسبة", en: "XP earned" },

  // Review (SRS)
  "review.title": { ar: "مراجعة الكلمات", en: "Word review" },
  "review.subtitle": { ar: "راجع كلماتك بنظام التكرار المتباعد لتثبيتها في الذاكرة.", en: "Review your words with spaced repetition to lock them in." },
  "review.nothingDue": { ar: "لا توجد كلمات مستحقة الآن. عُد لاحقاً!", en: "Nothing due right now. Come back later!" },
  "review.showAnswer": { ar: "أظهر المعنى", en: "Show meaning" },
  "review.again": { ar: "لم أتذكر", en: "Again" },
  "review.hard": { ar: "صعبة", en: "Hard" },
  "review.good": { ar: "سهلة", en: "Good" },
  "review.progress": { ar: "التقدم", en: "Progress" },
  "review.done": { ar: "انتهت الجلسة! أحسنت.", en: "Session complete. Well done!" },
  "review.reviewed": { ar: "تمت مراجعتها", en: "reviewed" },
  "review.correct": { ar: "صحيحة", en: "correct" },
  "review.nextDue": { ar: "التالي بعد", en: "Next due in" },
  "review.minutesShort": { ar: "د", en: "m" },
  "review.hoursShort": { ar: "س", en: "h" },
  "review.daysShort": { ar: "ي", en: "d" },
};

export function t(lang: Lang, key: keyof typeof DICT | string): string {
  const entry = DICT[key as keyof typeof DICT];
  if (!entry) return key;
  return entry[lang];
}

export function useT(): { t: (key: string) => string; lang: Lang; dir: "rtl" | "ltr" } {
  const [settings] = useSettings();
  const lang: Lang = (settings.uiLanguage ?? "ar") as Lang;
  return {
    t: (k: string) => t(lang, k),
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
  };
}
