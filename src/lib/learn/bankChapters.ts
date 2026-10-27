/**
 * Learn course chapters ↔ question-bank chapters, for "From your mistakes" (migration 0194): a
 * student's misses are counted by BANK chapter, and the Learn page shows them by its own chapters.
 * Concept Ladder named its chapters after PYQ Vault's, so the title is the name; the rare exception
 * is listed here, and tests/learn-bank-chapters.test.ts fails on any Learn chapter that maps to no
 * bank chapter.
 */
import { slugify } from "@/lib/board/query";
import { slugifyName } from "@/lib/questions/slugs";

/** `<course>/<course chapter slug>` → the bank chapter's name, where it differs from the Learn title. */
const ALIASES: Record<string, string> = {
  "mh-hsc-12-maths/line-and-plane": "Line and Planes",
};

export function bankChapterName(course: string, chapter: { slug: string; title: string }): string {
  return ALIASES[`${course}/${chapter.slug}`] ?? chapter.title;
}

export type BankMiss = { chapter: string; misses: number; last_missed_at: string };

/** The course's chapters the student has open mistakes in, most first. Chapters Learn does not teach are dropped. */
export function missesByCourseChapter(
  course: string,
  chapters: { slug: string; title: string }[],
  misses: BankMiss[],
): { slug: string; title: string; misses: number }[] {
  const byBank = new Map(misses.map((m) => [m.chapter, m.misses]));
  return chapters
    .map((ch) => ({ slug: ch.slug, title: ch.title, misses: byBank.get(bankChapterName(course, ch)) ?? 0 }))
    .filter((c) => c.misses > 0)
    .sort((a, b) => b.misses - a.misses);
}

/** The bank's subject every Learn course so far teaches (learn_courses.subject 'maths'). */
const BANK_SUBJECT = "Mathematics";

/**
 * Where a Learn chapter's practice lives in PYQ Vault: its textbook chapter in the board reader and
 * its past-questions page, both addressed by the bank chapter's name (each route's own slug rule).
 */
export function bankChapterLinks(exam: string, course: string, chapter: { slug: string; title: string }): { board: string; questions: string } {
  const name = bankChapterName(course, chapter);
  return {
    board: `/board/${exam}/${slugify(BANK_SUBJECT)}/${slugify(name)}`,
    questions: `/questions/${exam}/${slugifyName(BANK_SUBJECT)}/${slugifyName(name)}`,
  };
}

/** The Learn chapter teaching bank chapter `bankName` in this course, or null: the board reader's link back to Learn. */
export function learnChapterFor<C extends { slug: string; title: string }>(course: string, chapters: C[], bankName: string): C | null {
  return chapters.find((ch) => bankChapterName(course, ch) === bankName) ?? null;
}
