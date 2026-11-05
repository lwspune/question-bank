/**
 * One /notes chapter route and one subtopic route per SUBJECT, instead of a page file
 * per chapter (TECH_DEBT_SPEC.md 2.1-2.2).
 *
 * WHY. On 2026-11-05 the 522 chapter page files and 522 subtopic page files were
 * byte-identical apart from the chapter slug (hashed with the slug masked: 522 + 522).
 * Each was its own build entry, and the deploy build went from about 18 to 30 minutes
 * in three weeks and ran out of memory on 2026-11-04. A subject's route file now passes
 * its subject to these factories; the chapter comes from the URL.
 *
 * Route segment config (`revalidate`) stays a literal in each page file: Next reads it
 * statically, so it cannot be re-exported from here.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNotesChapterBySlug, getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { notesPrerenderParams } from "@/lib/notes/prerender";
import NotesChapterLanding, { buildChapterMetadata } from "./NotesChapterLanding";
import NotesSubtopicPage, { buildSubtopicMetadata } from "./NotesSubtopicPage";

type ChapterParams = { chapterSlug: string };
type SubtopicParams = { chapterSlug: string; subtopicSlug: string };

export function makeChapterRoute(subjectRoute: string) {
  return {
    generateStaticParams(): ChapterParams[] {
      return getNotesChaptersForSubject(subjectRoute).map((c) => ({ chapterSlug: c.chapterSlug }));
    },
    generateMetadata({ params }: { params: ChapterParams }): Metadata {
      const chapter = getNotesChapterBySlug(subjectRoute, params.chapterSlug);
      return chapter ? buildChapterMetadata(chapter) : {};
    },
    Page({ params }: { params: ChapterParams }) {
      const chapter = getNotesChapterBySlug(subjectRoute, params.chapterSlug);
      if (!chapter) notFound();
      return <NotesChapterLanding chapter={chapter} />;
    },
  };
}

export function makeSubtopicRoute(subjectRoute: string) {
  return {
    /** Same prerender rule as before: one subtopic per chapter locally, all on Vercel. */
    generateStaticParams(): SubtopicParams[] {
      return getNotesChaptersForSubject(subjectRoute).flatMap((c) =>
        notesPrerenderParams(c.slugs).map((p) => ({ chapterSlug: c.chapterSlug, ...p }))
      );
    },
    generateMetadata({ params }: { params: SubtopicParams }): Metadata {
      const chapter = getNotesChapterBySlug(subjectRoute, params.chapterSlug);
      return chapter ? buildSubtopicMetadata(chapter, params.subtopicSlug) : {};
    },
    Page({ params }: { params: SubtopicParams }) {
      const chapter = getNotesChapterBySlug(subjectRoute, params.chapterSlug);
      if (!chapter) notFound();
      return <NotesSubtopicPage chapter={chapter} subtopicSlug={params.subtopicSlug} />;
    },
  };
}
