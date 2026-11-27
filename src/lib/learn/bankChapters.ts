/**
 * Learn course chapters ↔ question-bank chapters, for "From your mistakes" (migration 0194): a
 * student's misses are counted by BANK chapter, and the Learn page shows them by its own chapters.
 * Each course chapter's bank chapter (its exam, subject and name) comes from bankLinks.generated.ts,
 * which `npm run learn:links` writes from the bundle and the live taxonomy (2026-11-27; the aliases
 * for the few names that differ live in bankLinksBuild.ts). A chapter the file does not name falls
 * back to its title and its course's subject.
 */
import { slugify } from "@/lib/board/query";
import { isBoardExam } from "@/lib/exam/examContext";
import { slugifyName } from "@/lib/questions/slugs";
import { BANK_SUBJECTS } from "./bankLinksBuild";
import { LEARN_BANK_CHAPTERS } from "./bankLinks.generated";
import { isLearnSubject } from "./subjects";

const bankChapter = (course: string, slug: string) => LEARN_BANK_CHAPTERS[`${course}/${slug}`];

export function bankChapterName(course: string, chapter: { slug: string; title: string }): string {
  return bankChapter(course, chapter.slug)?.chapter ?? chapter.title;
}

/** The bank subject a course chapter sits in: the generated file's, else its course subject's usual name. */
function bankSubjectName(course: string, slug: string): string {
  const known = bankChapter(course, slug)?.subject;
  if (known) return known;
  const subject = course.slice(course.lastIndexOf("-") + 1);
  return isLearnSubject(subject) ? BANK_SUBJECTS[subject][0] : "Mathematics";
}

/** A learn_my_misses row. `subject` since 0293; a row without one (before it) matches by chapter name alone. */
export type BankMiss = { subject?: string; chapter: string; misses: number; last_missed_at: string };

/** The course's chapters the student has open mistakes in, most first. Chapters Learn does not teach are dropped. */
export function missesByCourseChapter(
  course: string,
  chapters: { slug: string; title: string }[],
  misses: BankMiss[],
): { slug: string; title: string; misses: number }[] {
  // Two subjects of one exam can share a chapter name (CBSE 11's Physics and Chemistry "Thermodynamics").
  const missesFor = (ch: { slug: string; title: string }) => {
    const name = bankChapterName(course, ch);
    const subject = bankSubjectName(course, ch.slug);
    return misses.filter((m) => m.chapter === name && (m.subject === undefined || m.subject === subject)).reduce((n, m) => n + m.misses, 0);
  };
  return chapters
    .map((ch) => ({ slug: ch.slug, title: ch.title, misses: missesFor(ch) }))
    .filter((c) => c.misses > 0)
    .sort((a, b) => b.misses - a.misses);
}

/**
 * Where a Learn chapter's practice lives in PYQ Vault: its textbook chapter in the board reader and
 * its past-questions page, both addressed by the bank subject and chapter names (each route's own
 * slug rule). An exam with no board reader (NDA, JEE) has no textbook link.
 */
export function bankChapterLinks(exam: string, course: string, chapter: { slug: string; title: string }): { board: string | null; questions: string } {
  const name = bankChapterName(course, chapter);
  const subject = bankSubjectName(course, chapter.slug);
  return {
    board: isBoardExam(exam) ? `/board/${exam}/${slugify(subject)}/${slugify(name)}` : null,
    questions: `/questions/${exam}/${slugifyName(subject)}/${slugifyName(name)}`,
  };
}

/** The Learn chapter teaching bank chapter `bankName` in this course, or null: the board reader's link back to Learn. */
export function learnChapterFor<C extends { slug: string; title: string }>(course: string, chapters: C[], bankName: string): C | null {
  return chapters.find((ch) => bankChapterName(course, ch) === bankName) ?? null;
}
