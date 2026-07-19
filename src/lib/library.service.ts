import { supabase } from "@/integrations/supabase/client";
import type { LibraryBook, LibraryBookContent } from "@/types/library";

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

// Fetches the full chaptered text from Supabase Storage (bucket: library-content)
export async function getLibraryBookContent(
  storagePath: string
): Promise<LibraryBookContent> {
  const { data, error } = await supabase.storage
    .from("library-content")
    .download(storagePath.replace(/^library-content\//, ""));

  if (error) throw error;
  const text = await data.text();
  return JSON.parse(text) as LibraryBookContent;
}

export async function getReadingProgress(
  userId: string,
  bookSlug: string
): Promise<number> {
  const { data, error } = await supabase
    .from("library_progress")
    .select("current_chapter")
    .eq("user_id", userId)
    .eq("book_slug", bookSlug)
    .maybeSingle();

  if (error) throw error;
  return data?.current_chapter ?? 0;
}

export async function saveReadingProgress(
  userId: string,
  bookSlug: string,
  currentChapter: number
): Promise<void> {
  const { error } = await supabase.from("library_progress").upsert({
    user_id: userId,
    book_slug: bookSlug,
    current_chapter: currentChapter,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}
