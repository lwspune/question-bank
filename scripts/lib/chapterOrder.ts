/**
 * A subject's chapters put in textbook order (2026-10-26). PURE.
 * Spec: tests/chapter-order.test.ts. Used by scripts/taxonomy/fix-chapter-order.ts.
 *
 * Every chapter is placed exactly once: the book's chapters in `target` order,
 * then any retired "[Outdated]" chapter in its current order. The subject keeps
 * its own numbering base (some subjects count from 0, others from 1). A target
 * that misses a chapter, names one the subject lacks, or names one twice is
 * refused, so a typo can never drop a chapter to the end of the list unseen.
 */
export type ChapterRow = { id: string; name: string; order_index: number };
export type ChapterMove = { id: string; name: string; from: number; to: number };

const RETIRED = /\[Outdated\]\s*$/;

export function planChapterOrder(current: readonly ChapterRow[], target: readonly string[]): ChapterMove[] {
  const byName = new Map(current.map((c) => [c.name, c]));
  const seen = new Set<string>();
  for (const name of target) {
    if (seen.has(name)) throw new Error(`"${name}" is named twice`);
    seen.add(name);
    if (!byName.has(name)) throw new Error(`the subject has no chapter "${name}"`);
  }
  const missing = current.filter((c) => !RETIRED.test(c.name) && !seen.has(c.name)).map((c) => c.name);
  if (missing.length) throw new Error(`the order misses: ${missing.join(", ")}`);

  const retired = current.filter((c) => RETIRED.test(c.name) && !seen.has(c.name)).sort((a, b) => a.order_index - b.order_index);
  const base = Math.min(...current.map((c) => c.order_index));
  return [...target.map((n) => byName.get(n)!), ...retired].map((c, i) => ({ id: c.id, name: c.name, from: c.order_index, to: base + i }));
}
