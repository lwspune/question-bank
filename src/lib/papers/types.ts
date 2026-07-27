/**
 * Types for the collaborative paper builder (migration 0039).
 *
 * A Paper is a persistent, org-scoped, section-partitioned collection of
 * questions that multiple teachers assemble together. Membership lives in the
 * `paper_questions` junction table (one row per question) so concurrent adds by
 * different teachers never clobber each other; the section layout lives in
 * `papers.section_template` (this `SectionTemplate`).
 */

/**
 * One editable section of a paper.
 *
 * TWO MODES, ONE SHAPE. In an MCQ paper a section is a SUBJECT ("English"); in
 * a written board paper it is a SLOT ("Q.1 (A)"). Both file membership through
 * `paper_questions.section_key`, so ordering, concurrent adds, drag-reorder and
 * the finalize snapshot are shared code — only the trailing fields and the
 * renderer differ. The written fields are all optional, so every paper that
 * existed before written mode keeps working unchanged.
 */
export type PaperSection = {
  /** Stable slug, unique within a template. Used as `paper_questions.section_key` — never renamed. */
  key: string;
  /** Display name, e.g. "English". Editable without touching membership. */
  label: string;
  /** Goal number of questions for this section (drives the progress bar).
   *  In written mode this is the number of questions PRINTED in the slot. */
  targetCount: number;
  /** Soft hint: user ids of teachers working this section. Never enforced. */
  assignedTo?: string[];

  // --- Written-paper slot fields (absent in MCQ mode) -----------------------
  /** Printed heading, e.g. "Q.1 (A)". */
  code?: string;
  /** Printed choice line, e.g. "Attempt any TWO of the following". */
  instruction?: string;
  /** How many questions the student ANSWERS (<= targetCount). Drives the marks. */
  attempt?: number;
  /** Marks per answered question. Slot marks = attempt x marksEach. */
  marksEach?: number;
  /** Restricts sourcing to one question format. */
  format?: "mcq" | "subjective";
};

export type SectionTemplate = PaperSection[];

export type PaperStatus = "draft" | "finalized";

/** A membership row, in the shape the pure helpers consume. */
export type MembershipRow = {
  questionId: string;
  sectionKey: string;
  position: number;
};

/** Frozen composition captured on finalize (papers.finalized_snapshot). */
export type PaperSnapshot = {
  sections: { key: string; label: string; questionIds: string[] }[];
  /** Flat, section-then-position order — feeds the existing /api/export questionIds path. */
  orderedQuestionIds: string[];
};
