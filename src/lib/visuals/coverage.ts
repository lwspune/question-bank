/**
 * How far animated solutions have got: every PUBLIC question is in exactly one
 * state. Pure core of scripts/visuals/coverage.ts; spec
 * tests/visuals-coverage.test.ts.
 *
 *   animated     a visual that parses, checks, and fits the stored solution
 *   stale        a visual that no longer does (the solution was edited, or the
 *                scene changed): it is hidden from students and needs redoing
 *   still / none / noFit   reviewed and given no animated solution, with the
 *                verdict recorded in a batch file (lib/visuals/batch.ts)
 *   notReviewed  nobody has looked yet
 *
 * Mock answers weight the report, so a chapter students actually sit counts
 * for more than its question count says.
 */
import type { Verdict } from "./batch";
import { parseSolutionVisual, stepTexts, usableVisual } from "./visual";

export type CoverageStateName = "animated" | "stale" | Verdict | "notReviewed";
export const STATES: readonly CoverageStateName[] = ["animated", "stale", "still", "none", "noFit", "notReviewed"];

export interface CoverageQuestion {
  id: string;
  exam: string;
  subject: string;
  chapter: string;
  solution: string | null;
  visual: unknown;
  /** Mock answers recorded on this question. */
  answers: number;
}

export function coverageState(q: CoverageQuestion, verdict: Verdict | undefined): CoverageStateName {
  if (q.visual !== null && q.visual !== undefined) {
    const parsed = parseSolutionVisual(q.visual);
    const fresh = usableVisual(q.visual) !== null && parsed.ok && stepTexts(parsed.visual, q.solution) !== null;
    return fresh ? "animated" : "stale";
  }
  return verdict ?? "notReviewed";
}

export interface CoverageLine {
  exam: string;
  subject: string;
  chapter: string;
  total: number;
  counts: Record<CoverageStateName, number>;
  answers: number;
  answersCoveredShare: number;
  reviewedShare: number;
}

const zero = (): Record<CoverageStateName, number> => Object.fromEntries(STATES.map((s) => [s, 0])) as Record<CoverageStateName, number>;

function line(exam: string, subject: string, chapter: string, items: { state: CoverageStateName; answers: number }[]): CoverageLine {
  const counts = zero();
  let answers = 0;
  let covered = 0;
  for (const it of items) {
    counts[it.state]++;
    answers += it.answers;
    if (it.state === "animated") covered += it.answers;
  }
  const reviewed = items.length - counts.notReviewed - counts.stale;
  return {
    exam,
    subject,
    chapter,
    total: items.length,
    counts,
    answers,
    answersCoveredShare: answers ? covered / answers : 0,
    reviewedShare: items.length ? reviewed / items.length : 0,
  };
}

export function summarise(questions: CoverageQuestion[], verdicts: Map<string, Verdict>) {
  const groups = new Map<string, { exam: string; subject: string; chapter: string; items: { state: CoverageStateName; answers: number }[] }>();
  const all: { state: CoverageStateName; answers: number }[] = [];
  for (const q of questions) {
    const item = { state: coverageState(q, verdicts.get(q.id)), answers: q.answers };
    all.push(item);
    const key = `${q.exam}\u0000${q.subject}\u0000${q.chapter}`;
    const g = groups.get(key) ?? { exam: q.exam, subject: q.subject, chapter: q.chapter, items: [] };
    g.items.push(item);
    groups.set(key, g);
  }
  const rows = [...groups.values()].map((g) => line(g.exam, g.subject, g.chapter, g.items)).sort((a, b) => b.answers - a.answers || b.total - a.total);
  return { rows, total: line("all", "all", "all", all) };
}
