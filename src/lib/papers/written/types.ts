/**
 * Types for WRITTEN (board-format) papers — the second Papers sub-tab.
 *
 * THE ONE IDEA: a written paper is an ordinary `papers` row whose sections are
 * SLOTS ("Q.1 (A)") instead of SUBJECTS ("English"). The `paper_questions`
 * junction already stores (question_id, section_key, position), so slot
 * membership, concurrent adds, drag-reorder and the finalize snapshot all work
 * unchanged — only the meaning of `section_key` and the rendering differ.
 *
 * MARKS LIVE ON TWO SEPARATE AXES — do not merge them:
 *   - SLOT marks (`marksEach` here) are AUTHORITATIVE. They are printed on the
 *     paper and must sum to `maxMarks`.
 *   - QUESTION marks (`questions.nominal_marks`) are an INDICATIVE SOURCING
 *     HINT — "this is about a 3-mark amount of work" — used to pick candidates
 *     for a slot and to soft-warn on a mismatch. They are NEVER printed.
 * The same question is legitimately worth 3 marks in one paper and 4 in another,
 * which is exactly why the printed value cannot come from the question row.
 */
import type { Board, Std } from "@/lib/exam/examContext";

/** Which exam in the school calendar this paper is for. */
export type PaperVariant = "unit" | "midyear" | "annual";

/** Display order for the variant picker — school-calendar order, not alphabetical. */
export const PAPER_VARIANTS: readonly PaperVariant[] = ["unit", "midyear", "annual"];

export const VARIANT_LABELS: Record<PaperVariant, string> = {
  unit: "Unit Test",
  midyear: "Mid-Year",
  annual: "Annual",
};

/**
 * One numbered block of a written paper.
 *
 * `print` vs `attempt` is what expresses INTERNAL CHOICE — the paper prints 5
 * questions and the student answers any 4 ("attempt any four of the following").
 * Marks for the slot are attempt x marksEach, because the student is only ever
 * marked on what they attempt.
 */
export type WrittenSlot = {
  /** Stable key stored as `paper_questions.section_key`. Never renamed. */
  key: string;
  /** Printed heading, e.g. "Q.1 (A)". */
  code: string;
  /** Printed instruction, e.g. "Choose the correct alternative". */
  label: string;
  /** Extra printed line for choice slots, e.g. "Attempt any TWO of the following". */
  instruction?: string;
  /** How many questions are PRINTED in this slot. */
  print: number;
  /** How many the student ANSWERS (<= print). Equal to `print` when there's no choice. */
  attempt: number;
  /** Marks per answered question. */
  marksEach: number;
  /** Restricts sourcing to one question format. Omit to allow any. */
  format?: "mcq" | "subjective";
};

/**
 * A reusable paper pattern. Keyed by (board, std, subject, variant) — which is
 * exactly the sequence of dropdowns the builder presents.
 *
 * `subjects` is a LIST because one printed pattern usually serves several
 * subjects: Maharashtra's SSC Algebra and Geometry papers are the same 40-mark
 * shape, as are Science I and II. Sharing one blueprint keeps them from drifting
 * apart, and mirrors `MockSectionBlueprint.subjects`.
 */
export type WrittenBlueprint = {
  /** Stable id, e.g. "mh-ssc-10-maths-annual". Stored on the paper. */
  id: string;
  board: Board;
  std: Std;
  /** DB subject names this pattern serves. */
  subjects: string[];
  variant: PaperVariant;
  /** Shown in the template dropdown. */
  label: string;
  durationMins: number;
  maxMarks: number;
  /** Printed under the header as a numbered list. */
  instructions: string[];
  slots: WrittenSlot[];
};

/**
 * Paper-level header data, persisted as `papers.paper_meta` (jsonb).
 *
 * `kind` is an EXPLICIT discriminator rather than something inferred from
 * whether the sections happen to carry marks — inference breaks on a
 * half-filled template and leaves the renderer's branch ambiguous. A paper with
 * no `paper_meta` at all reads as "mcq", so every pre-existing paper keeps
 * working untouched.
 */
export type PaperMeta = {
  kind: "mcq" | "written";
  board?: Board;
  std?: Std;
  subject?: string;
  variant?: PaperVariant;
  /** The blueprint this paper started from; null once freely edited. */
  blueprintId?: string | null;
  durationMins?: number;
  maxMarks?: number;
  instructions?: string[];
  /** Printed at the top of the paper. Defaults to the org name. */
  schoolName?: string;
};
