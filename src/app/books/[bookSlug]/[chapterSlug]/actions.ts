"use server";

/**
 * Curation actions for a book chapter.
 *
 * `requireSuperadmin()` in every one of these IS the authorization boundary.
 * `books`/`book_questions` have RLS enabled and NO policies, so there is no
 * policy to fall back on — a missing gate here would be the whole gate missing.
 * That is why the check is repeated per action rather than assumed from the
 * page that rendered the button: a server action is its own entry point and is
 * callable without ever loading that page.
 *
 * Each action revalidates its own path. `/books` is `force-dynamic`, so the
 * refresh genuinely re-reads — unlike a cached route, where `router.refresh()`
 * would re-serve the same copy and the move would appear to do nothing.
 */
import { revalidatePath } from "next/cache";
import { requireSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getBookBySlug, getBookChapter } from "@/lib/books/registry";
import { moveSet, moveSetToSection, setQuestionExcluded } from "@/lib/books/service";

export type ActionResult = { ok: boolean; message?: string };

/** Resolve the registry pair, refusing anything the registry does not declare. */
function resolve(bookSlug: string, chapterSlug: string) {
  const book = getBookBySlug(bookSlug);
  if (!book) throw new Error(`unknown book "${bookSlug}"`);
  const chapter = getBookChapter(book, chapterSlug);
  if (!chapter) throw new Error(`unknown chapter "${chapterSlug}"`);
  return { book, chapter };
}

function refresh(bookSlug: string, chapterSlug: string) {
  revalidatePath(`/books/${bookSlug}/${chapterSlug}`);
  revalidatePath(`/books/${bookSlug}`);
}

export async function setExcludedAction(
  bookSlug: string,
  chapterSlug: string,
  questionId: string,
  excluded: boolean
): Promise<ActionResult> {
  await requireSuperadmin();
  const { book } = resolve(bookSlug, chapterSlug);
  try {
    await setQuestionExcluded(createSupabaseAdminClient(), book, questionId, excluded);
    refresh(bookSlug, chapterSlug);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "failed" };
  }
}

export async function moveSetAction(
  bookSlug: string,
  chapterSlug: string,
  sectionKey: string,
  setKey: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  await requireSuperadmin();
  const { book, chapter } = resolve(bookSlug, chapterSlug);
  try {
    const moved = await moveSet(
      createSupabaseAdminClient(),
      book,
      chapter,
      sectionKey,
      setKey,
      direction
    );
    if (!moved) {
      // Not an error: the set is already at that end, or the page is stale and
      // its key no longer resolves. Saying so beats a silent no-op.
      return { ok: false, message: "Nothing to move — reload if the page is stale." };
    }
    refresh(bookSlug, chapterSlug);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "failed" };
  }
}

export async function moveSetToSectionAction(
  bookSlug: string,
  chapterSlug: string,
  fromSection: string,
  setKey: string,
  toSection: string
): Promise<ActionResult> {
  await requireSuperadmin();
  const { book, chapter } = resolve(bookSlug, chapterSlug);
  try {
    const moved = await moveSetToSection(
      createSupabaseAdminClient(),
      book,
      chapter,
      fromSection,
      setKey,
      toSection
    );
    if (!moved) return { ok: false, message: "Nothing to move — reload if the page is stale." };
    refresh(bookSlug, chapterSlug);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "failed" };
  }
}
