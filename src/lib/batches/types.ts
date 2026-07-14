/**
 * Types for cohort batches (migration 0054; branch reworked to an entity in 0055).
 *
 * A Batch is an org-scoped student COHORT (e.g. "NDA 2026 Morning") that belongs
 * to a BRANCH (a first-class entity, migration 0055) instead of a free-text
 * label. A paper optionally targets one batch (papers.batch_id); the builder uses
 * that to soft-warn when a question was already used for the SAME batch (see
 * src/lib/papers/usage.ts).
 */

export type Batch = {
  id: string;
  name: string;
  /** The owning branch, or null (unbranched / the org's default group). */
  branchId: string | null;
  /** Denormalized branch name from the join, for display. Null when unbranched. */
  branchName: string | null;
  examId: string | null;
  archived: boolean;
  createdBy: string | null;
  updatedAt: string;
};

/** The user-supplied fields when creating / editing a batch. */
export type BatchInput = {
  name: string;
  branchId?: string | null;
  examId?: string | null;
};

/** Normalized, validated batch fields ready for insert/update. */
export type BatchFields = {
  name: string;
  branchId: string | null;
  examId: string | null;
};
