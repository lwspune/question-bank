/**
 * Exposure — which cohorts have already sat a question, and when.
 *
 * Not a statistic. It is a constraint on SELECTION: a teacher building a paper
 * needs to know their batch has seen this item, whatever its p-value. That is
 * why it is the one cohort-scoped thing on an otherwise global card, and it is
 * not a contradiction — analytics pool, exposure does not.
 *
 * The vault already soft-warns when a question was used for the same batch in
 * another VAULT paper (`src/lib/papers/usage.ts`, over `paper_questions`). This
 * is the other half: papers the institute actually CONDUCTED, which the vault
 * never knew about until the tracker export landed.
 *
 * `cohort_label` is the tracker's `exams.batch` verbatim — free text, and
 * routinely a comma-separated list, because one sitting is regularly run for
 * several batches at once. Measured 2026-09-11: every name in it matches a
 * `batches.name` in this database exactly. That match is NOT relied on here —
 * the names are displayed as they came, because a teacher recognises their own
 * batch and an exact-name join between two systems breaks silently on either
 * side's rename. Resolving them to batch ids is only needed by the paper-builder
 * integration, and belongs with it.
 */

/** One sitting's worth of names, split out of the tracker's free-text label. */
export function parseCohortLabel(label: string | null | undefined): string[] {
  if (!label) return [];
  return label
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export type Exposure = {
  /** Distinct cohort names, sorted, as the source spelled them. */
  cohorts: string[];
  /** The most recent sitting that names a cohort. */
  lastSatAt: string | null;
};
