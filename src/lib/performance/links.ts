/**
 * The links out of the student-performance page. Pure — no React, no I/O.
 *
 * There are exactly TWO of them, and conflating them under one button label is
 * the whole reason this module exists:
 *
 *   A — "your questions"  `/browse?extras=<ids>`
 *       The exact questions THIS student got wrong or skipped. Evidence-based,
 *       and empty by construction for a subtopic they never touched.
 *
 *   B — "this topic"      `/browse?examId=…&chapterIds=…&subtopicIds=…`
 *       Everything the bank holds on that topic. Always resolves; says nothing
 *       about the student.
 *
 * The audits and the chapter accordion take A: a row only appears there because
 * a wrong answer or a skip put it there. The PROJECTION takes B, because it is
 * a marks-at-stake ranking derived from the bank's own weightage and therefore
 * deliberately includes topics the student has never seen — measured on
 * production, 2,484 of its 4,939 subtopic rows have `judged === 0`. Half of an
 * "open their mistakes" column would open nothing.
 *
 * Spec: tests/performance-links.test.ts.
 */

/**
 * How many question ids one link may carry.
 *
 * `extras` lands in a PostgREST `.in()` filter, which rides in the URL — a long
 * enough list answers a bare `Bad Request` (measured at 833 ids elsewhere in
 * this repo). Nothing in production is close: across the 12 heaviest students
 * the worst subtopic holds 34 wrong and 33 skipped. The cap is the guard for
 * the day that stops being true, and `openLabel` DISCLOSES it rather than
 * quietly shortening the list under a label that promised the full count.
 */
export const OPEN_LIMIT = 50;

/**
 * Link A. Null for an empty list — `?extras=` with no value parses to zero ids,
 * which drops the filter and lands the reader on the unfiltered bank.
 */
export function browseExtrasHref(ids: readonly string[]): string | null {
  if (ids.length === 0) return null;
  const sp = new URLSearchParams();
  sp.set("extras", ids.slice(0, OPEN_LIMIT).join(","));
  return `/browse?${sp.toString()}`;
}

/** The button's text, which must describe what the href will actually open. */
export function openLabel(total: number): string {
  return total > OPEN_LIMIT ? `Open ${OPEN_LIMIT} of ${total}` : `Open ${total}`;
}

/**
 * Chapter + subtopic, keyed as a PAIR.
 *
 * `subtopics.name` is unique only within its chapter (`unique (chapter_id,
 * name)`), so a bare subtopic name is not an identity — "Foundations" appears
 * under several chapters across this bank.
 */
export function taxonomyKey(chapter: string, subtopic: string): string {
  return `${chapter}\u0000${subtopic}`;
}

/** Ids resolved from the live taxonomy for ONE (exam, subject) lane. */
export type TaxonomyLinks = {
  examId: string | null;
  subjectId: string | null;
  /** chapter name → chapter id */
  chapters: Record<string, string>;
  /** `taxonomyKey(chapter, subtopic)` → subtopic id */
  subtopics: Record<string, string>;
};

export const EMPTY_TAXONOMY_LINKS: TaxonomyLinks = {
  examId: null,
  subjectId: null,
  chapters: {},
  subtopics: {},
};

/**
 * Link B. Degrades one step at a time rather than all at once:
 *
 *   subtopic resolves      → chapter + subtopic
 *   subtopic does not      → the chapter alone (still lands somewhere true)
 *   chapter does not       → null
 *
 * The middle case is not hypothetical. `(unclassified)` is minted by the RPC's
 * `coalesce`, not by the taxonomy, so it has no id by construction; a chapter
 * renamed since the attempt was sat behaves the same way. What must NOT happen
 * is a link to the whole bank under a heading that names one topic.
 */
export function topicHref(
  links: TaxonomyLinks,
  chapter: string,
  subtopic?: string
): string | null {
  const chapterId = links.chapters[chapter];
  if (!chapterId) return null;

  const sp = new URLSearchParams();
  if (links.examId) sp.set("examId", links.examId);
  if (links.subjectId) sp.set("subjectId", links.subjectId);
  sp.set("chapterIds", chapterId);

  const subtopicId = subtopic ? links.subtopics[taxonomyKey(chapter, subtopic)] : undefined;
  if (subtopicId) sp.set("subtopicIds", subtopicId);

  return `/browse?${sp.toString()}`;
}

/**
 * The RPC's label for a bank row that carries no subtopic. Minted by
 * `get_student_performance`'s coalesce, never by the taxonomy — so it is a
 * name that can never resolve to a row, and every link builder has to drop it
 * rather than pass it on.
 */
export const UNCLASSIFIED = "(unclassified)";

/**
 * Link C — "practise this topic", resolved by NAME at click time.
 *
 * `/go/practice` takes canonical DB names and resolves them against the live
 * taxonomy when the link is FOLLOWED, so a caller pays nothing at render time.
 * That is what makes it the right shape for a page that names topics spanning
 * several (exam, subject) lanes: topicHref would need one taxonomy read per
 * lane before it could render a single href.
 *
 * The route's own fallback chain does the degrading from there — an unresolved
 * subtopic lands on the chapter, an unresolved chapter on the corpus — so this
 * never has to guess at whether a name is still live.
 */
export function goPracticeHref(
  exam: string,
  subject: string,
  chapter: string,
  subtopic?: string
): string {
  const sp = new URLSearchParams({ exam, subject, chapter });
  if (subtopic && subtopic !== UNCLASSIFIED) sp.set("subtopic", subtopic);
  return `/go/practice?${sp.toString()}`;
}
