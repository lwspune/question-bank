/**
 * The mentor path's "chapter done" rule (MENTOR_SPEC.md §2, 2026-11-07).
 *
 * A chapter is DONE when all three are true:
 *   1. its revision sheet was opened (`surface_viewed`, surface
 *      `board_revision`, path = the chapter's /board URL);
 *   2. every slot of its Top 10 PYQs was worked, by the HOMEWORK rule
 *      (lib/homework/progress markOf + summarizeDay), so the Top 10 tab, the
 *      Homework pages and the path can never disagree about a question;
 *   3. its chapter test was finished with at least one answer in it.
 *
 * Done is measured by work, never by a tick: a blank submitted test is not a
 * finished one. Pure: no DB, no clock. Spec: tests/path-done.test.ts.
 */
import { slugify } from "@/lib/slug";
import { marksFor, summarizeDay, type ProgressEvent, type QuestionFormat } from "@/lib/homework/progress";

/** One Top 10 slot: a question, or a case study's parts. */
export type TopSlot = readonly { id: string; format: QuestionFormat }[];

/** The /board chapter URL, as the Revision tab's view event records it. */
export function revisionPath(examSlug: string, subjectName: string, chapterName: string): string {
  return `/board/${examSlug}/${slugify(subjectName)}/${slugify(chapterName)}`;
}

/** A chapter-test sitting counts once it ended with answers in it. */
export function isFinishedTest(a: { status: string; answered: number }): boolean {
  return (a.status === "submitted" || a.status === "expired") && a.answered > 0;
}

/** How many Top 10 slots are worked, and whether all are. */
export function topWorked(
  slots: readonly TopSlot[],
  events: readonly ProgressEvent[]
): { worked: number; of: number; complete: boolean } {
  const items = slots.flatMap((parts, i) =>
    parts.map((p) => ({ day: 1, position: i + 1, questionId: p.id, format: p.format }))
  );
  const { marks, due } = marksFor(items, events);
  const s = summarizeDay(slots, marks, due);
  return { worked: s.done, of: s.total, complete: s.complete };
}

export type ChapterParts = { sheet: boolean; top: boolean; test: boolean; partsDone: number; done: boolean };

export function chapterParts(p: { sheet: boolean; top: boolean; test: boolean }): ChapterParts {
  const partsDone = Number(p.sheet) + Number(p.top) + Number(p.test);
  return { ...p, partsDone, done: partsDone === 3 };
}
