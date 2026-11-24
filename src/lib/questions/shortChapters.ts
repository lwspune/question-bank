/**
 * Chapters too small for a landing page (2026-11-24), for V's chapter search.
 *
 * A landing page needs MIN_QUESTIONS_FOR_LANDING (15) questions, and V's
 * search read only the landing list, so V told a student Maharashtra HSC
 * Molecular Basis of Inheritance (13 PYQs) was not in the bank. About 2,000
 * chapters sat below the line, among them every ISC Class 12 and IISER IAT
 * chapter. These rows fill the gap; each one is linked /go/chapter/... (the
 * route opens it on /browse), since it has no /questions page.
 *
 * The landing pages, the sitemap and their cache are untouched: this is a
 * separate list, read by shortChaptersServer.ts and V alone.
 *
 * Pure. Spec: tests/short-chapters.test.ts.
 */
import { dedupeBySlug, slugifyName } from "@/lib/questions/slugs";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";
import { MIN_QUESTIONS_FOR_LANDING } from "@/lib/questions/landingMin";

/** A chapter V can find that has no landing page: the ids are for its /browse link. */
export type ShortChapterRow = ChapterSearchRow & { chapterId: string; examId: string; subjectId: string; hasLanding: false };

/** One subject's chapters with 1 to 14 questions of the exam's corpus (PYQ, or practice on a practice-only exam). */
export function shortChapterRows(input: {
  exam: { slug: string; examName: string; examId: string; practiceOnly: boolean };
  subject: { id: string; name: string };
  chapters: readonly { id: string; name: string }[];
  counts: ReadonlyMap<string, number>;
}): ShortChapterRow[] {
  const out: ShortChapterRow[] = [];
  for (const c of dedupeBySlug(input.chapters)) {
    const questionCount = input.counts.get(c.id) ?? 0;
    if (questionCount < 1 || questionCount >= MIN_QUESTIONS_FOR_LANDING) continue;
    out.push({
      examSlug: input.exam.slug,
      examName: input.exam.examName,
      subjectSlug: slugifyName(input.subject.name),
      subjectName: input.subject.name,
      chapterSlug: slugifyName(c.name),
      chapterName: c.name,
      chapterId: c.id,
      examId: input.exam.examId,
      subjectId: input.subject.id,
      questionCount,
      practiceOnly: input.exam.practiceOnly,
      hasLanding: false,
    });
  }
  return out;
}

/**
 * Where /go/chapter/<exam>/<subject>/<chapter> sends the student: the chapter on
 * /browse with the filters a landing page's own link uses (landing.ts
 * landingFilterParams). An address it does not know opens /browse, never a dead page.
 */
export function goChapterTarget(rows: readonly ShortChapterRow[], exam: string, subject: string, chapter: string): string {
  const [e, s, c] = [exam, subject, chapter].map((x) => x.toLowerCase());
  const row = rows.find((r) => r.examSlug === e && r.subjectSlug === s && r.chapterSlug === c);
  if (!row) return "/browse";
  const params = new URLSearchParams({
    examId: row.examId,
    subjectId: row.subjectId,
    chapterIds: row.chapterId,
    kind: row.practiceOnly ? "practice" : "pyq",
  });
  return `/browse?${params.toString()}`;
}
