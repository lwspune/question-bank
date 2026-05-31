/**
 * Pure preview-gate logic for /notes premium chapters. No DB, no cookies.
 *
 * A chapter is "gated" (the viewer sees the preview + paywall, not the full
 * content) only when it's `tier: "paid"` AND the viewer is neither staff (an
 * org member) nor an entitled student. Free chapters are never gated.
 */

export type NotesAccessInput = {
  tier: "free" | "paid" | undefined;
  /** True for ADMIN/TEACHER org members — staff always see full content. */
  isMember: boolean;
  /** True when userHasAccess() resolved an active entitlement for the scope. */
  hasAccess: boolean;
};

export function isNotesGated(input: NotesAccessInput): boolean {
  if (input.tier !== "paid") return false;
  if (input.isMember) return false;
  return !input.hasAccess;
}

/**
 * Splits an ordered list into the first `previewCount` (free, shown publicly +
 * indexable) and the remainder (locked behind the paywall). A non-positive
 * count locks everything; a count past the end leaves nothing locked.
 */
export function splitPreview<T>(
  items: readonly T[],
  previewCount: number
): { preview: T[]; locked: T[] } {
  const n = Math.max(0, previewCount);
  return { preview: items.slice(0, n), locked: items.slice(n) };
}
