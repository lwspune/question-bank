/**
 * Types for the collaborative paper builder (migration 0039).
 *
 * A Paper is a persistent, org-scoped, section-partitioned collection of
 * questions that multiple teachers assemble together. Membership lives in the
 * `paper_questions` junction table (one row per question) so concurrent adds by
 * different teachers never clobber each other; the section layout lives in
 * `papers.section_template` (this `SectionTemplate`).
 */

/** One editable section of a paper (typically a subject). */
export type PaperSection = {
  /** Stable slug, unique within a template. Used as `paper_questions.section_key` — never renamed. */
  key: string;
  /** Display name, e.g. "English". Editable without touching membership. */
  label: string;
  /** Goal number of questions for this section (drives the progress bar). */
  targetCount: number;
  /** Soft hint: user ids of teachers working this section. Never enforced. */
  assignedTo?: string[];
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
