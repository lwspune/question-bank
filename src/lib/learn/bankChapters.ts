/**
 * Learn course chapters ↔ question-bank chapters, for "From your mistakes" (migration 0192): a
 * student's misses are counted by BANK chapter, and the Learn page shows them by its own chapters.
 * Concept Ladder named its chapters after PYQ Vault's, so the title is the name; the rare exception
 * is listed here, and tests/learn-bank-chapters.test.ts fails on any Learn chapter that maps to no
 * bank chapter.
 */

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
