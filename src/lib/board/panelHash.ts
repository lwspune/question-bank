/**
 * Which /board chapter tab a URL hash opens (MENTOR_SPEC.md Phase 1): the
 * board path links to `#top` and `#revision`. The hash, never a search param:
 * reading search params on these cached pages would make them dynamic.
 *
 * Pure. Spec: tests/board-panel-hash.test.ts.
 */
export type HashPanel = "top" | "revision";

export function panelFromHash(hash: string, has: { hasTop: boolean; hasRevision: boolean }): HashPanel | null {
  if (hash === "#top" && has.hasTop) return "top";
  if (hash === "#revision" && has.hasRevision) return "revision";
  return null;
}
