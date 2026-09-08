/**
 * /books/vocab/[chapterSlug]/print — the chapter as printed pages.
 *
 * Same reasoning as the `/books` print route: the reader one level up says
 * nothing about pages, and this shows the chapter in the Word exporter's own
 * geometry — Letter, two columns, Cambria 10pt — so the layout can be judged
 * without a download-open-discard loop.
 *
 * Viewing one page at a time is the BROWSER's job. Ctrl+P (or the button) opens
 * a real paginated preview and saves a PDF; building a pagination engine here
 * would re-implement the print pipeline slightly differently.
 *
 * Superadmin-gated and noindexed like the rest of /books.
 */
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CADET_VOCAB } from "@/lib/vocab/registry";
import { loadVocabChapter } from "@/lib/vocab/query";
import VocabChapterPrint from "@/app/books/vocab/_print/VocabChapterPrint";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function VocabChapterPrintPage({
  params,
}: {
  params: { chapterSlug: string };
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const view = await loadVocabChapter(
    createSupabaseAdminClient(),
    CADET_VOCAB.slug,
    params.chapterSlug
  );
  if (!view) notFound();

  return <VocabChapterPrint view={view} />;
}
