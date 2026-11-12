/**
 * The stored solution cut into the steps "Teach me step by step" shows one at
 * a time (lib/chat/stepByStep.ts). Pure; pulls in the scene registry, so it
 * runs on the server (the steps route and the typed route), never in V's
 * prompt or the chat window's first load. Spec: tests/chat-solution-steps.test.ts.
 *
 * An animated solution (migration 0184) keeps its own steps: they were mapped
 * onto the solution's sentences when the animation was made, so each step's
 * words and picture belong together, and the visual is returned to play step
 * by step. Any other solution is cut at its sentences (the same boundary rule
 * as the animations and the /board reader), a short sentence joined to the
 * next, at most MAX_SENTENCE_STEPS steps. The text is never changed: a step is
 * a slice of the solution as stored.
 */
import { parseTableBlocks } from "@/components/math/parseTableBlocks";
import { parseSolutionVisual, sentenceStarts, stepTexts, usableVisual } from "@/lib/visuals/visual";

/** More steps than this and the student taps through fragments. Measured 2026-11-12: Ask V's median solution is 4 sentences. */
export const MAX_SENTENCE_STEPS = 6;
/** A sentence shorter than this ("Let x be the number.") is joined to the next. */
const SHORT_CHARS = 80;

export type SolutionSteps = {
  steps: string[];
  /** The animated solution, when the steps are its own: the chat plays it step by step. */
  visual: unknown | null;
};

export function solutionSteps(q: { solution: string | null | undefined; visual: unknown }): SolutionSteps | null {
  const solution = q.solution?.trim() ? q.solution : null;
  if (!solution) return null;

  const raw = usableVisual(q.visual);
  if (raw) {
    const parsed = parseSolutionVisual(raw);
    const texts = parsed.ok ? stepTexts(parsed.visual, solution) : null;
    if (texts && texts.length >= 2) return { steps: texts, visual: raw };
  }

  const steps = sentenceGroups(solution);
  return steps.length >= 2 ? { steps, visual: null } : null;
}

/** A table is one block, never "short", whatever its length. */
function isTable(text: string): boolean {
  return parseTableBlocks(text).some((b) => b.kind === "table");
}

function sentenceGroups(solution: string): string[] {
  const starts = sentenceStarts(solution);
  const slice = (from: number, to: number) => solution.slice(starts[from], to < starts.length ? starts[to] : solution.length).trim();

  // Groups as [first sentence, one past the last]. A short sentence takes the next one with it.
  const groups: [number, number][] = [];
  let i = 0;
  while (i < starts.length) {
    let j = i + 1;
    while (j < starts.length) {
      const text = slice(i, j);
      if (text.length >= SHORT_CHARS || isTable(text)) break;
      j += 1;
    }
    groups.push([i, j]);
    i = j;
  }

  // Too many: join the neighbouring pair that is shortest together, until it fits.
  while (groups.length > MAX_SENTENCE_STEPS) {
    let best = 0;
    let bestLen = Infinity;
    for (let k = 0; k + 1 < groups.length; k++) {
      const len = slice(groups[k][0], groups[k + 1][1]).length;
      if (len < bestLen) {
        bestLen = len;
        best = k;
      }
    }
    groups.splice(best, 2, [groups[best][0], groups[best + 1][1]]);
  }

  return groups.map(([a, b]) => slice(a, b)).filter((s) => s.length > 0);
}
