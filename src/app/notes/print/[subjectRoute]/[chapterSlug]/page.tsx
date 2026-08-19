import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNotesChapterBySlug, NOTES_CHAPTERS } from "@/lib/notes/chapters";
import NotesChapterPrint from "@/app/notes/_components/print/NotesChapterPrint";

/**
 * Printable per-chapter notes handout: /notes/print/<subjectRoute>/<chapterSlug>.
 *
 * ONE dynamic route rather than a wrapper per chapter (the pattern the
 * on-screen notes use) because there is no per-chapter content here — the
 * whole document is derived from the registry entry.
 *
 * NOINDEX is load-bearing, not hygiene: this page duplicates the canonical
 * subtopic pages almost verbatim, and this project has already taken a Search
 * Console "Duplicate without user-selected canonical" hit.
 */

export const revalidate = 86400;

type Params = { subjectRoute: string; chapterSlug: string };

export function generateStaticParams(): Params[] {
  return NOTES_CHAPTERS.map((c) => ({
    subjectRoute: c.subjectRoute,
    chapterSlug: c.chapterSlug,
  }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = getNotesChapterBySlug(params.subjectRoute, params.chapterSlug);
  if (!c) return { title: "Handout not found", robots: { index: false, follow: false } };
  return {
    title: `${c.subjectDisplay} ${c.chapter.chapterName} — printable notes handout`,
    robots: { index: false, follow: false },
  };
}

export default function Page({ params }: { params: Params }) {
  const chapter = getNotesChapterBySlug(params.subjectRoute, params.chapterSlug);
  if (!chapter) notFound();
  return <NotesChapterPrint chapter={chapter} />;
}
