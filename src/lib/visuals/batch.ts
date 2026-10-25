/**
 * Checks a batch of animated solutions against the stored questions before
 * anything is written (scripts/visuals/run.ts). Pure; spec
 * tests/visuals-batch.test.ts.
 *
 * A batch file (scripts/visuals/data/<name>.json) also records the questions
 * looked at and deliberately given NO animated solution, with why: "still" (a
 * still figure is the right picture), "none" (a picture adds nothing) or
 * "noFit" (no scene fits YET; the noFit pile decides the next scene to build).
 * That record is what lets the coverage report tell "reviewed" from "never
 * looked at". Nothing here can change a solution: the only field ever written
 * is solution_visual.
 */
import { checkVisual, parseSolutionVisual, solutionFingerprint, stepTexts } from "./visual";

export type Verdict = "still" | "none" | "noFit";
export const VERDICTS: readonly Verdict[] = ["still", "none", "noFit"];

export interface VisualBatch {
  visuals: { id: string; option?: string; visual: unknown }[];
  decided?: { id: string; verdict: Verdict; reason: string }[];
}

export interface BatchRow {
  id: string;
  solution: string | null;
  solution_visual: unknown;
  question_format: "mcq" | "subjective" | "numeric";
  numeric_answer: number | null;
  /** Labels of the options marked correct. */
  correct: string[];
}

export interface BatchPlan {
  write: { id: string; visual: unknown }[];
  /** Already carry exactly this visual. */
  already: string[];
  problems: string[];
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Key-order-independent equality for JSON values. */
function sameJson(a: unknown, b: unknown): boolean {
  const norm = (v: unknown): unknown =>
    Array.isArray(v)
      ? v.map(norm)
      : v && typeof v === "object"
        ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, norm((v as Record<string, unknown>)[k])]))
        : v;
  return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}

export function planVisualBatch(batch: VisualBatch, rows: Map<string, BatchRow>, opts: { replace?: boolean }): BatchPlan {
  const plan: BatchPlan = { write: [], already: [], problems: [] };
  const seen = new Set<string>();
  const once = (id: string) => {
    if (!UUID.test(id)) plan.problems.push(`${id}: not a question id`);
    else if (seen.has(id)) plan.problems.push(`${id}: listed twice`);
    seen.add(id);
  };

  for (const d of batch.decided ?? []) {
    once(d.id);
    if (!VERDICTS.includes(d.verdict)) plan.problems.push(`${d.id}: verdict must be one of ${VERDICTS.join(", ")}`);
    if (typeof d.reason !== "string" || !d.reason.trim() || d.reason.length > 200) plan.problems.push(`${d.id}: give a reason (at most 200 characters)`);
    if (!rows.has(d.id)) plan.problems.push(`${d.id}: no such question`);
  }

  for (const entry of batch.visuals) {
    const { id } = entry;
    once(id);
    const row = rows.get(id);
    if (!row) {
      plan.problems.push(`${id}: no such question`);
      continue;
    }
    const parsed = parseSolutionVisual(entry.visual);
    if (!parsed.ok) {
      plan.problems.push(`${id}: ${parsed.error}`);
      continue;
    }
    const visual = parsed.visual;
    if (!row.solution || solutionFingerprint(row.solution) !== visual.fingerprint) {
      plan.problems.push(`${id}: the steps were mapped against a different solution than the one stored`);
      continue;
    }
    if (!stepTexts(visual, row.solution)) {
      plan.problems.push(`${id}: the steps do not fit the solution's sentences`);
      continue;
    }
    const check = checkVisual(visual);
    if (!check.ok) {
      plan.problems.push(`${id}: the scene's own check gives ${check.value}, not the answer ${visual.answer.value}`);
      continue;
    }
    if (row.question_format === "mcq") {
      if (!entry.option) {
        plan.problems.push(`${id}: name the correct option so it can be compared with the key`);
        continue;
      }
      if (row.correct.length !== 1 || row.correct[0] !== entry.option) {
        plan.problems.push(`${id}: option ${entry.option} is not the key (${row.correct.join(", ") || "none marked"})`);
        continue;
      }
    } else if (row.question_format === "numeric") {
      const tol = visual.answer.tolerance ?? 1e-6 * Math.max(1, Math.abs(visual.answer.value));
      if (row.numeric_answer === null || Math.abs(row.numeric_answer - visual.answer.value) > tol) {
        plan.problems.push(`${id}: answer ${visual.answer.value} is not the stored numeric answer ${row.numeric_answer}`);
        continue;
      }
    }
    if (row.solution_visual !== null && row.solution_visual !== undefined) {
      if (sameJson(row.solution_visual, entry.visual)) {
        plan.already.push(id);
        continue;
      }
      if (!opts.replace) {
        plan.problems.push(`${id}: already has a different visual (re-run with --replace to swap it)`);
        continue;
      }
    }
    plan.write.push({ id, visual: entry.visual });
  }
  return plan;
}
