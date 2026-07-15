/**
 * Pure validation + presentation helpers for cohort batches (migration 0054;
 * branch reworked to an entity in 0055). No DB — the data layer (admin.ts) calls
 * validateBatchInput before insert/update.
 */
import type { BatchInput, BatchFields, Batch } from "./types";

export const MAX_NAME = 120;

export type ValidateResult =
  | { ok: true; value: BatchFields }
  | { ok: false; error: string };

/**
 * Normalize + validate user-supplied batch fields: trim the name (required),
 * coerce a blank branchId / examId to null. The DB still enforces name-not-blank
 * + the (org, branch, name) uniqueness — this is the friendly first line.
 */
export function validateBatchInput(input: BatchInput): ValidateResult {
  const name = (input.name ?? "").trim();
  if (!name) return { ok: false, error: "Give the batch a name." };
  if (name.length > MAX_NAME)
    return { ok: false, error: `Batch name is too long (max ${MAX_NAME}).` };

  const branchId = (input.branchId ?? "").trim() || null;
  const examId = (input.examId ?? "").trim() || null;

  return { ok: true, value: { name, branchId, examId } };
}

/** Sort key: unbranched (null → "") first, then branch, then name. */
function sortKey(a: { branchName: string | null; name: string }): string {
  return `${a.branchName ?? ""} ${a.name}`.toLowerCase();
}

/**
 * Split batches into active vs archived, each sorted by branch then name.
 * Selectors show `active`; the management screen shows both.
 */
export function splitBatches<T extends { archived: boolean; branchName: string | null; name: string }>(
  batches: T[]
): { active: T[]; archived: T[] } {
  const active: T[] = [];
  const archived: T[] = [];
  for (const b of batches) (b.archived ? archived : active).push(b);
  const bySort = (a: T, b: T) => sortKey(a).localeCompare(sortKey(b));
  active.sort(bySort);
  archived.sort(bySort);
  return { active, archived };
}

/** Human label for a selector chip, e.g. "FC Road · Morning" or just "Morning". */
export function formatBatchLabel(b: Pick<Batch, "name" | "branchName">): string {
  return b.branchName ? `${b.branchName} · ${b.name}` : b.name;
}

// ── branch filter for the paper builder (Option A: branch cascades → batch) ──

/** Minimal batch shape the branch filter needs. */
export type BatchPick = { id: string; name: string; branchId: string | null; branchName: string | null };

/** Stable filter key for a batch's branch ("" = unbranched bucket). */
export const branchKeyOf = (b: { branchId: string | null }): string => b.branchId ?? "";

/**
 * The distinct branches present in a batch list, for the branch-filter dropdown.
 * Unbranched batches collapse to a single "No branch" entry (key ""). Name-sorted.
 */
export function branchesInBatches(batches: BatchPick[]): { key: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const b of batches) {
    const key = branchKeyOf(b);
    if (!seen.has(key)) seen.set(key, b.branchName ?? "No branch");
  }
  return Array.from(seen, ([key, name]) => ({ key, name })).sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

/** The batches belonging to one branch (by filter key). */
export function batchesInBranch(batches: BatchPick[], branchKey: string): BatchPick[] {
  return batches.filter((b) => branchKeyOf(b) === branchKey);
}
