/**
 * Pure core of the missing-solutions backfill (SOLUTIONS_BACKFILL_SPEC.md).
 * export.ts picks the rows, agents draft from the questions alone, and
 * apply.ts hands each draft to `judge` against the row re-read at write time.
 *
 * The key is the truth: a draft is written only when the solver's own answer
 * matches it. Anything else is a dispute or a skip for the owner to read,
 * never a write. Spec: tests/solutions-backfill.test.ts.
 */
import { solutionProblems } from "../lib/solutionText";
import { solutionCitesFigure } from "../lib/figureRefs";
import { matchesNumericAnswer } from "../../src/lib/mocks/answers";

export type Format = "mcq" | "numeric" | "subjective";

export type BankRow = {
  id: string;
  question_format: Format;
  visibility: string;
  publish_blocked: string | null;
  cancelled_note: string | null;
  solution: string | null;
  numeric_answer: number | null;
  image_url: string | null;
  text: string;
  context: string | null;
  set_id: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

/** One question's draft: a solution and the answer the solver reached, or a skip. */
export type Draft = { solution?: string; solvedAnswer?: string; skip?: string };

export type Verdict =
  | { kind: "write"; solution: string }
  | { kind: "dispute"; key: string; got: string }
  | { kind: "reject"; problems: string[] }
  | { kind: "skip"; reason: string };

/** The row's key: the one correct option's label, or the numeric answer. Null when there is none. */
export function keyOf(row: BankRow): string | null {
  if (row.question_format === "numeric") return row.numeric_answer === null ? null : String(row.numeric_answer);
  if (row.question_format !== "mcq") return null;
  const correct = row.options.filter((o) => o.is_correct);
  return correct.length === 1 ? correct[0].label.toUpperCase() : null;
}

/** Why a row is not this pipeline's to fill, or null when it is. */
export function skipReason(row: BankRow): string | null {
  if (row.visibility !== "PUBLIC") return `${row.visibility} row`;
  if (row.publish_blocked) return "publish blocked";
  if (row.cancelled_note) return "cancelled or withdrawn";
  if ((row.solution ?? "").trim()) return "already has a solution";
  if (row.question_format === "subjective") return "subjective (the solution is its answer)";
  if (keyOf(row) === null) return "no key";
  return null;
}

/** "(b)", " B. ", "b" -> "B". */
function letter(s: string): string {
  return s.trim().replace(/^\(?\s*([A-Za-z])\s*\)?\.?$/, "$1").toUpperCase();
}

/** "12.5", "-3", "25/2" -> a number; anything else -> NaN. */
function number(s: string): number {
  const t = s.trim();
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return /^-?\d+(?:\.\d+)?$/.test(t) ? Number(t) : NaN;
}

export function answersMatch(format: Format, solved: string, key: string): boolean {
  if (format === "numeric") return matchesNumericAnswer(number(solved), Number(key));
  return letter(solved) === letter(key);
}

export function judge(draft: Draft, row: BankRow): Verdict {
  const out = skipReason(row);
  if (out) return { kind: "skip", reason: out };
  if (draft.skip) return { kind: "skip", reason: `solver: ${draft.skip}` };
  const key = keyOf(row) as string;
  const solution = draft.solution ?? "";
  if (!draft.solvedAnswer?.trim()) return { kind: "reject", problems: ["no solvedAnswer"] };
  if (!answersMatch(row.question_format, draft.solvedAnswer, key)) {
    return { kind: "dispute", key, got: draft.solvedAnswer.trim() };
  }
  const problems = solutionProblems(solution);
  if (!row.image_url && solutionCitesFigure(solution)) problems.push("leans on a figure the row does not carry");
  if (row.question_format === "mcq") {
    const last = solution.trim().split("\n").pop() ?? "";
    if (!new RegExp(`\\(${key}\\)`, "i").test(last)) problems.push(`last line does not name option (${key})`);
  }
  return problems.length ? { kind: "reject", problems } : { kind: "write", solution };
}

/**
 * Cut a batch into slices of at most `size`, keeping every question of one
 * passage (same set_id, or same non-empty context) in one slice so one solver
 * reads them together. A passage group larger than `size` is a slice of its own.
 */
export function slices<T extends { id: string; set_id: string | null; context: string | null }>(
  rows: T[],
  size: number
): T[][] {
  const groups = new Map<string, T[]>();
  for (const r of rows) {
    const k = r.set_id ? `set:${r.set_id}` : r.context?.trim() ? `ctx:${r.context.trim()}` : `id:${r.id}`;
    const g = groups.get(k);
    if (g) g.push(r);
    else groups.set(k, [r]);
  }
  const out: T[][] = [];
  let cur: T[] = [];
  for (const g of groups.values()) {
    if (cur.length && cur.length + g.length > size) {
      out.push(cur);
      cur = [];
    }
    cur.push(...g);
  }
  if (cur.length) out.push(cur);
  return out;
}
