/**
 * Pure validation + presentation helpers for branches (migration 0055). No DB —
 * the data layer (admin.ts) calls validateBranchInput before insert/update.
 */
import type { BranchInput, BranchFields } from "./types";

export const MAX_NAME = 80;

export type ValidateResult =
  | { ok: true; value: BranchFields }
  | { ok: false; error: string };

/** Normalize + validate a branch: trim the name (required), enforce length.
 *  The DB still enforces name-not-blank + (org, name) uniqueness. */
export function validateBranchInput(input: BranchInput): ValidateResult {
  const name = (input.name ?? "").trim();
  if (!name) return { ok: false, error: "Give the branch a name." };
  if (name.length > MAX_NAME)
    return { ok: false, error: `Branch name is too long (max ${MAX_NAME}).` };
  return { ok: true, value: { name } };
}

/** Split branches into active vs archived, each name-sorted. */
export function splitBranches<T extends { archived: boolean; name: string }>(
  branches: T[]
): { active: T[]; archived: T[] } {
  const active: T[] = [];
  const archived: T[] = [];
  for (const b of branches) (b.archived ? archived : active).push(b);
  const byName = (a: T, b: T) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  active.sort(byName);
  archived.sort(byName);
  return { active, archived };
}
