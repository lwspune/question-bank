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
 * Params come from the generated chapter index and a page loads only its own chapter's
 * `_data` (loadNotesChapter): importing lib/notes/chapters.ts here would pull every chapter
 * into every notes route. Guard: tests/notes-routes-lean-graph.test.ts.
 *
 * Route segment config (`revalidate`) stays a literal in each page file: Next reads it
 * statically, so it cannot be re-exported from here.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadNotesChapter, notesChapterMetasForSubject } from "@/lib/notes/chapterIndex";
import { notesPrerenderParams } from "@/lib/notes/prerender";
import NotesChapterLanding, { buildChapterMetadata } from "./NotesChapterLanding";
import NotesSubtopicPage, { buildSubtopicMetadata } from "./NotesSubtopicPage";

type ChapterParams = { chapterSlug: string };
type SubtopicParams = { chapterSlug: string; subtopicSlug: string };

export function makeChapterRoute(subjectRoute: string) {
  return {
    generateStaticParams(): ChapterParams[] {
      return notesChapterMetasForSubject(subjectRoute).map((c) => ({ chapterSlug: c.chapterSlug }));
    },
    async generateMetadata({ params: paramsPromise }: { params: Promise<ChapterParams> }): Promise<Metadata> {
      const params = await paramsPromise;
      const chapter = await loadNotesChapter(subjectRoute, params.chapterSlug);
      return chapter ? buildChapterMetadata(chapter) : {};
    },
    async Page({ params: paramsPromise }: { params: Promise<ChapterParams> }) {
      const params = await paramsPromise;
      const chapter = await loadNotesChapter(subjectRoute, params.chapterSlug);
      if (!chapter) notFound();
      return <NotesChapterLanding chapter={chapter} />;
    },
  };
}

export function makeSubtopicRoute(subjectRoute: string) {
  return {
    /** One subtopic per chapter locally; on Vercel that one plus the pages people read (lib/notes/prerender.ts). */
    generateStaticParams(): SubtopicParams[] {
      return notesChapterMetasForSubject(subjectRoute).flatMap((c) =>
        notesPrerenderParams(`${subjectRoute}/${c.chapterSlug}`, c.slugs).map((p) => ({ chapterSlug: c.chapterSlug, ...p }))
      );
    },
    async generateMetadata({ params: paramsPromise }: { params: Promise<SubtopicParams> }): Promise<Metadata> {
      const params = await paramsPromise;
      const chapter = await loadNotesChapter(subjectRoute, params.chapterSlug);
      return chapter ? buildSubtopicMetadata(chapter, params.subtopicSlug) : {};
    },
    async Page({ params: paramsPromise }: { params: Promise<SubtopicParams> }) {
      const params = await paramsPromise;
      const chapter = await loadNotesChapter(subjectRoute, params.chapterSlug);
      if (!chapter) notFound();
      return <NotesSubtopicPage chapter={chapter} subtopicSlug={params.subtopicSlug} />;
    },
  };
}
