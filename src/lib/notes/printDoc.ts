import type { SubtopicNote } from "@/app/notes/_types";

/**
 * Pure core for the /notes printable chapter handout.
 *
 * Kept out of the component because the handout is a SHAREABLE artifact: once
 * a teacher sends the PDF, nobody re-checks it against the site. The
 * completeness invariants (every concept present, no featured PYQ silently
 * dropped) are therefore worth asserting in a test rather than trusting a
 * render, and a test can only reach them if they live in a pure function.
 */

/** Canonical URL of a chapter's printable handout. */
export function printHandoutHref(subjectRoute: string, chapterSlug: string): string {
  return `/notes/print/${subjectRoute}/${chapterSlug}`;
}

/**
 * Every featured-PYQ id across a chapter's subtopics — deduped, first-seen
 * order preserved so one DB round trip serves the whole handout (the on-screen
 * pages fetch per subtopic; a chapter handout would otherwise fan out).
 */
export function collectPyqIds(notes: readonly SubtopicNote[]): string[] {
  return Array.from(
    new Set(
      notes.flatMap((n) =>
        n.concepts.map((c) => c.pyqExampleId).filter((id): id is string => Boolean(id))
      )
    )
  );
}

export type PrintDocStats = {
  subtopics: number;
  concepts: number;
  /** Concepts carrying an inline visualization — printed as vector SVG. */
  figures: number;
  /** Total Level-1 practice reps across the chapter. */
  reps: number;
  /** Formula-variant concepts that actually carry a formula box. */
  formulas: number;
};

/** Cover-page counts. Zero-safe so an empty chapter renders rather than throws. */
export function printDocStats(notes: readonly SubtopicNote[]): PrintDocStats {
  const concepts = notes.flatMap((n) => n.concepts);
  return {
    subtopics: notes.length,
    concepts: concepts.length,
    figures: concepts.filter((c) => c.visualizationSlug).length,
    reps: concepts.reduce((a, c) => a + (c.practiceSet?.length ?? 0), 0),
    formulas: concepts.filter((c) => c.kind === "formula" && c.formula).length,
  };
}
