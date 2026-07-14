/**
 * Types for branches (migration 0055).
 *
 * A Branch is an org-scoped physical location/campus (e.g. "FC Road"). It's a
 * first-class entity because teachers get assigned to one or more branches
 * (branch_members, a later slice), and batches belong to a branch. Admins own
 * branch management for their org; superadmin manages any org's via the console.
 */

export type Branch = {
  id: string;
  name: string;
  archived: boolean;
  createdBy: string | null;
  updatedAt: string;
};

/** User-supplied fields when creating / editing a branch. */
export type BranchInput = { name: string };

/** Normalized, validated fields ready for insert/update. */
export type BranchFields = { name: string };
