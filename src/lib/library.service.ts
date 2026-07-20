import { supabase } from "@/integrations/supabase/client";
import { getOrGenerateChapterQuiz } from "@/lib/api/library-quiz.functions";
import type { LibraryBook } from "@/types/library";

export interface QuizQuestion {
  kind: "comprehension";
  q: string;
  choices: string[];
  answer: number;
}

export interface LibraryChapterMeta {
  chapter_index: number;
  heading: string;
  word_count: number;
}

export interface LibraryChapterContent {
  chapter_index: number;
  heading: string;
  content: string;
}

export async function getLibraryBooks(): Promise<LibraryBook[]> {
  const { data, error } = await supabase
    .from("library_books")
    .select("*")
    .order("title", { ascending: true });

  if (error) throw error;
  return data as LibraryBook[];
}

export async function getLibraryBookMeta(slug: string): Promise<LibraryBook> {
  const { data, error } = await supabase
    .from("library_books")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as LibraryBook;
}

// خفيف — يجيب عناوين الفصول وعدد كلماتها بس، بدون النص الكامل
// يستخدم بصفحة قائمة الفصول
export async function getLibraryChapterList(
  bookSlug: string
): Promise<LibraryChapterMeta[]> {
  const { data, error } = await supabase
    .from("library_chapters")
    .select("chapter_index, heading, word_count")
    .eq("book_slug", bookSlug)
    .order("chapter_index", { ascending: true });

  if (error) throw error;
  return data as LibraryChapterMeta[];
}

// يجيب نص فصل واحد بس — يستخدم بصفحة القراءة
export async function getLibraryChapterContent(
  bookSlug: string,
  chapterIndex: number
): Promise<LibraryChapterContent> {
  const { data, error } = await supabase
    .from("library_chapters")
    .select("chapter_index, heading, content")
    .eq("book_slug", bookSlug)
    .eq("chapter_index", chapterIndex)
    .single();

  if (error) throw error;
  return data as LibraryChapterContent;
}

export async function getReadingProgress(
  userId: string,
  bookSlug: string
): Promise<number> {
  const { data, error } = await supabase
    .from("library_progress")
    .select("unlocked_count")
    .eq("user_id", userId)
    .eq("book_slug", bookSlug)
    .maybeSingle();

  if (error) throw error;
  return data?.unlocked_count ?? 1;
}

// يستدعي دالة قاعدة البيانات bump_library_progress بدل upsert مباشر —
// هذي الدالة تضمن رياضيًا إن عدد الفصول المفتوحة ما يرجع يقل أبد
// (تحل مشاكل التزامن نهائيًا، عكس القراءة-ثم-الكتابة العادية)
export async function unlockChapter(
  bookSlug: string,
  newUnlockedCount: number
): Promise<number> {
  const { data, error } = await supabase.rpc("bump_library_progress", {
    p_book_slug: bookSlug,
    p_unlocked_count: newUnlockedCount,
  });

  if (error) throw error;
  return data as number;
}

// يجيب أسئلة الفصل من الكاش، أو يولّدها أول مرة عبر السيرفر فنكشن (AI) ويخزّنها
export async function getChapterQuiz(
  bookSlug: string,
  chapterIndex: number,
  chapterText: string,
  chapterHeading?: string
): Promise<QuizQuestion[]> {
  const result = await getOrGenerateChapterQuiz({
    data: { bookSlug, chapterIndex, chapterText, chapterHeading },
  });
  return result.questions;
}
