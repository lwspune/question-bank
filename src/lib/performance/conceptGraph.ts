/**
 * Concept prerequisite graph (NDA Mathematics) — a chapter-level DAG linking
 * each chapter to the chapters it depends on.
 *
 * THIS IS THE ONE THING GENUINELY IMPORTED FROM nda-tracker. Its weightage
 * tables are hand-transcribed copies of THIS bank (frozen at 2026-05-17) and we
 * derive those live instead; but the edges below are faculty-curated expert
 * knowledge and are NOT recoverable from any corpus. Ported from
 * nda-tracker/src/lib/conceptGraph.js.
 *
 * It powers ROOT-CAUSE advice ("you are weak in Definite Integration, but the
 * real gap is Indefinite Integration") and SEQUENCING advice ("ready to learn
 * next"), which is the question a chapter accuracy bar cannot answer.
 *
 * NODES must be the canonical NDA Mathematics chapter names, because that is
 * what the per-chapter accuracy is keyed on. A node typo silently drops a
 * chapter from the analysis rather than erroring, so
 * tests/performance-concept-graph.test.ts checks every node against the LIVE
 * taxonomy and fails on drift.
 *
 * NDA MATHS ONLY. No other subject has a graph, so `focusAreas` returns null
 * elsewhere and the page omits the card rather than inventing prerequisites.
 */

/** `X: [...]` reads "X depends on these prerequisites". A chapter absent here
 *  (or with []) is foundational. */
export const CHAPTER_PREREQS: Readonly<Record<string, readonly string[]>> = {
  // Algebra spine
  Functions: ["Sets & Relations"],
  "Binomial Theorem": ["Permutation & Combination"],

  // Trigonometry
  "Trigonometric Equations": ["Trigonometric Identities"],
  "Inverse Trigonometry": ["Trigonometric Identities"],
  "Height & Distance": ["Trigonometric Identities"],
  "Properties of Triangle": ["Trigonometric Identities"],

  // Calculus chain
  "Limits & Continuity": ["Functions"],
  Differentiation: ["Limits & Continuity"],
  "Application of Derivatives": ["Differentiation"],
  "Indefinite Integration": ["Differentiation"],
  "Definite Integration": ["Indefinite Integration"],
  "Applications of Integration": ["Definite Integration"],
  "Differential Equations": ["Indefinite Integration"],

  // Coordinate & vector geometry
  Circles: ["Lines"],
  Conics: ["Circles"],
  "3D Geometry": ["Vectors", "Lines"],

  // Probability & statistics
  Probability: ["Permutation & Combination", "Sets & Relations"],
  "Binomial Distribution": ["Probability", "Binomial Theorem"],

  // Foundational (no prerequisites): Logarithms, Linear Inequalities,
  // Binary Numbers, Matrices & Determinants, Quadratic Equations,
  // Complex Numbers, Sequence & Series, Permutation & Combination,
  // Sets & Relations, Trigonometric Identities, Vectors, Lines, Statistics.
};

export type ConceptGraph = Readonly<Record<string, readonly string[]>>;

/** Accuracy per chapter, 0..1. `null` means UNTESTED — never 0, which would
 *  read as "got everything wrong" and make an unseen chapter look like a
 *  weakness. */
export type AccuracyByChapter = Record<string, number | null>;

export function getPrerequisites(chapter: string, graph: ConceptGraph = CHAPTER_PREREQS) {
  return graph[chapter] ?? [];
}

/** Every chapter mentioned anywhere — as a node, as a prerequisite, or in the
 *  accuracy map. */
function allChapters(graph: ConceptGraph, acc: AccuracyByChapter): Set<string> {
  return new Set([
    ...Object.keys(graph),
    ...Object.values(graph).flat(),
    ...Object.keys(acc),
  ]);
}

/** Case-insensitive lookup: chapter names arrive from the DB, the graph is
 *  hand-written, and a case difference would silently drop the chapter. */
function accessor(acc: AccuracyByChapter) {
  const m = new Map<string, number | null>();
  for (const [k, v] of Object.entries(acc)) m.set(k.toLowerCase(), v);
  return (chapter: string) => m.get(chapter.toLowerCase());
}

const isWeak = (a: number | null | undefined, threshold: number) =>
  a !== null && a !== undefined && a < threshold;

export type ValidationResult = { unknownNodes: string[]; cycles: string[][] };

/**
 * Every node canonical, and the graph acyclic. Both failures are silent in
 * production — an unknown node drops a chapter, a cycle would hang the
 * root-cause walk — so this exists to be asserted in a test, not called at
 * render time.
 */
export function validateConceptGraph(
  graph: ConceptGraph = CHAPTER_PREREQS,
  canonicalChapters?: readonly string[]
): ValidationResult {
  const canonical = canonicalChapters ? new Set(canonicalChapters) : null;
  const unknown = new Set<string>();
  if (canonical) {
    for (const [node, prereqs] of Object.entries(graph)) {
      if (!canonical.has(node)) unknown.add(node);
      for (const p of prereqs) if (!canonical.has(p)) unknown.add(p);
    }
  }

  // DFS colouring: grey = on the current stack, black = finished.
  const cycles: string[][] = [];
  const state: Record<string, "grey" | "black"> = {};
  const stack: string[] = [];
  const visit = (node: string) => {
    state[node] = "grey";
    stack.push(node);
    for (const dep of graph[node] ?? []) {
      if (state[dep] === "grey") {
        cycles.push([...stack.slice(stack.indexOf(dep)), dep]);
      } else if (state[dep] !== "black") {
        visit(dep);
      }
    }
    stack.pop();
    state[node] = "black";
  };
  for (const node of Object.keys(graph)) if (!state[node]) visit(node);

  return { unknownNodes: [...unknown], cycles };
}

export type RootCause = {
  chapter: string;
  accuracy: number | null;
  root: string;
  rootAccuracy: number | null;
  isRoot: boolean;
};

/**
 * For every WEAK chapter, the deepest weak prerequisite reachable through the
 * graph — the place to actually start.
 *
 * An UNTESTED chapter is "unknown", never weak: it cannot be someone's root
 * cause on no evidence. Weakest root first, so the highest-leverage fix leads.
 */
export function getRootCauseChain(
  accuracyByChapter: AccuracyByChapter,
  { threshold = 0.5, graph = CHAPTER_PREREQS }: { threshold?: number; graph?: ConceptGraph } = {}
): RootCause[] {
  const accOf = accessor(accuracyByChapter);

  const findRoot = (chapter: string, seen = new Set<string>()): string => {
    if (seen.has(chapter)) return chapter; // cycle guard
    seen.add(chapter);
    const weakPrereqs = getPrerequisites(chapter, graph).filter((p) =>
      isWeak(accOf(p), threshold)
    );
    if (weakPrereqs.length === 0) return chapter;
    let best: string | null = null;
    for (const p of weakPrereqs) {
      const r = findRoot(p, seen);
      if (best === null || (accOf(r) ?? 1) < (accOf(best) ?? 1)) best = r;
    }
    return best as string;
  };

  const out: RootCause[] = [];
  for (const chapter of allChapters(graph, accuracyByChapter)) {
    const a = accOf(chapter);
    if (!isWeak(a, threshold)) continue;
    const root = findRoot(chapter);
    out.push({
      chapter,
      accuracy: a ?? null,
      root,
      rootAccuracy: accOf(root) ?? null,
      isRoot: root === chapter,
    });
  }
  return out.sort((x, y) => (x.rootAccuracy ?? 1) - (y.rootAccuracy ?? 1));
}

/**
 * The unlockable frontier: chapters not yet mastered whose every prerequisite
 * IS mastered.
 *
 * An UNTESTED prerequisite does NOT count as satisfied — "ready to learn" is a
 * claim that the groundwork is demonstrably in place, and we have not seen it.
 */
export function getReadyToLearn(
  accuracyByChapter: AccuracyByChapter,
  {
    masteredThreshold = 0.7,
    graph = CHAPTER_PREREQS,
  }: { masteredThreshold?: number; graph?: ConceptGraph } = {}
): { chapter: string; accuracy: number | null }[] {
  const accOf = accessor(accuracyByChapter);
  const isMastered = (ch: string) => {
    const a = accOf(ch);
    return a !== null && a !== undefined && a >= masteredThreshold;
  };

  const out: { chapter: string; accuracy: number | null }[] = [];
  for (const chapter of allChapters(graph, accuracyByChapter)) {
    if (isMastered(chapter)) continue;
    if (getPrerequisites(chapter, graph).every(isMastered)) {
      out.push({ chapter, accuracy: accOf(chapter) ?? null });
    }
  }
  return out;
}
