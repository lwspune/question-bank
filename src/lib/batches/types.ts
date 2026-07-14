/**
 * Types for cohort batches (migration 0054).
 *
 * A Batch is an org-scoped student COHORT (e.g. "NDA 2026 Morning"). `branch` is
 * a free-text label (e.g. "FC Road"), not its own entity. A paper optionally
 * targets one batch (papers.batch_id); the builder uses that to soft-warn when a
 * question was already used for the SAME batch (see src/lib/papers/usage.ts).
 */

export type Batch = {
  id: string;
  name: string;
  /** Free-text branch label, or null (unbranched / the org's default group). */
  branch: string | null;
  examId: string | null;
  archived: boolean;
  createdBy: string | null;
  updatedAt: string;
};

/** The user-supplied fields when creating / editing a batch. */
export type BatchInput = {
  name: string;
  branch?: string | null;
  examId?: string | null;
};

/** Normalized, validated batch fields ready for insert/update. */
export type BatchFields = {
  name: string;
  branch: string | null;
  examId: string | null;
};
