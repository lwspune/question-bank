// Copied from Concept Ladder (src/engine/optionOrder.ts, afca8bf).
/**
 * The order a learner sees a question's options in. Shuffled so the correct
 * answer's position carries no signal, and seeded (by learner and item) so the
 * order stays put across reloads. Each option keeps its stored key for grading
 * and gets a display label, A to D, by position.
 */

const LABELS = ["A", "B", "C", "D", "E", "F"];

/** FNV-1a: a 32-bit hash of the seed string. */
function hash(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32: a small seeded generator of numbers in [0, 1). */
function generator(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function displayOrder<T extends { key: string }>(options: readonly T[], seed: string): (T & { label: string })[] {
  const next = generator(hash(seed));
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map((o, i) => ({ ...o, label: LABELS[i] }));
}
