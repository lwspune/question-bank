/**
 * /books/[bookSlug]/[chapterSlug]/print — the chapter as printed pages.
 *
 * WHY THIS EXISTS: the reader one level up is an EDITOR (accordions, curation
 * controls) and shows nothing about pages. This shows the chapter in the Word
 * exporter's own geometry — Letter, two columns, Cambria 10pt — so the layout
 * can be judged without a download-open-discard loop on every edit.
 *
 * Viewing one page at a time is the BROWSER's job, not ours: Ctrl+P (or the
 * button) opens a real paginated preview with page navigation, and saves a PDF.
 * Building a pagination engine here would mean re-implementing layout that the
 * print pipeline already does, and doing it slightly differently.
 *
 * Superadmin-gated and noindexed like the rest of /books.
 */
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getBookBySlug, getBookChapter } from "@/lib/books/registry";
import { loadBookChapter } from "@/lib/books/query";
import BookChapterPrint from "@/app/books/_print/BookChapterPrint";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BookChapterPrintPage({
  params,
}: {
  params: { bookSlug: string; chapterSlug: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const book = getBookBySlug(params.bookSlug);
  if (!book) notFound();
  const chapter = getBookChapter(book, params.chapterSlug);
  if (!chapter) notFound();

  // Service-role: the book tables are RLS-locked and the gate above has run.
  const view = await loadBookChapter(createSupabaseAdminClient(), book, chapter);
  return <BookChapterPrint view={view} />;
}
