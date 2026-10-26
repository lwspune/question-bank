/**
 * The stored animated solution (questions.solution_visual, migration 0184):
 * validate it, tie its steps to the solution's own sentences, and run its
 * self-check. Pure, safe in client code. Spec: tests/visuals-core.test.ts.
 *
 * The solution text is never changed (owner, 2026-10-25). A step names the
 * sentence it starts at; the step's text is a slice of the solution as stored.
 * The visual carries a fingerprint of that solution, so if the solution is
 * edited later the steps are dropped (stepTexts returns null) rather than
 * pointing at the wrong sentences, and the picture still plays on its own.
 */
import { parseTableBlocks, tableLineRanges } from "@/components/math/parseTableBlocks";
import { plainLabel } from "./params";
import { getScene } from "./registry";
import type { SolutionVisual, VisualStep } from "./types";

const MAX_STEPS = 12;

/** FNV-1a 32-bit of the exact text, as 8 hex digits. A change detector, not security. */
export function solutionFingerprint(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function isMathOpen(text: string, i: number): boolean {
  return text[i] === "\\" && (text[i + 1] === "(" || text[i + 1] === "[");
}

/**
 * The character ranges [start, end) of the tables in a text, or null when the
 * table scan and the text disagree on the lines (a math zone across a line
 * break), so a caller can refuse rather than guess.
 */
function tableSpans(text: string): [number, number][] | null {
  const { ranges, lines } = tableLineRanges(text);
  if (!ranges.length) return [];
  const own = text.split("\n");
  if (own.length !== lines) return null;
  const at: number[] = [];
  let pos = 0;
  for (const l of own) {
    at.push(pos);
    pos += l.length + 1;
  }
  return ranges.map(([a, b]) => [at[a], at[b] + own[b].length]);
}

/**
 * Where each sentence starts, as offsets into the text. The same boundary rule
 * as the /board reader's breakSentences (lib/board/formatSolution): a . ? or !
 * followed by space and then a capital, "(" or a math zone, never inside math.
 * A line break is a boundary too, except inside a table, which is one sentence.
 */
export function sentenceStarts(text: string): number[] {
  // A table is one sentence, header row to last row: a step may start at a table, never inside one.
  const spans = tableSpans(text) ?? [];
  return rawSentenceStarts(text).filter((s) => !spans.some(([a, b]) => s > a && s < b));
}

function rawSentenceStarts(text: string): number[] {
  const starts = [0];
  const n = text.length;
  let i = 0;
  const push = (j: number) => {
    if (j < n && j > starts[starts.length - 1]) starts.push(j);
  };
  while (i < n) {
    if (isMathOpen(text, i)) {
      const close = text[i + 1] === "(" ? "\\)" : "\\]";
      const end = text.indexOf(close, i + 2);
      i = end === -1 ? n : end + 2;
      continue;
    }
    const ch = text[i];
    if (ch === "\n") {
      let j = i + 1;
      while (j < n && /\s/.test(text[j])) j++;
      push(j);
      i = j;
      continue;
    }
    if (ch === "." || ch === "?" || ch === "!") {
      let j = i + 1;
      while (j < n && /[ \t]/.test(text[j])) j++;
      if (j > i + 1 && j < n && (/[A-Z(]/.test(text[j]) || isMathOpen(text, j))) {
        push(j);
        i = j;
        continue;
      }
    }
    i++;
  }
  return starts;
}

export type ParsedVisual = { ok: true; visual: SolutionVisual } | { ok: false; error: string };

export function parseSolutionVisual(raw: unknown): ParsedVisual {
  const fail = (error: string): ParsedVisual => ({ ok: false, error });
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fail("not an object");
  const o = raw as Record<string, unknown>;
  if (o.v !== 1) return fail("unknown version");
  const scene = typeof o.scene === "string" ? getScene(o.scene) : undefined;
  if (!scene) return fail(`unknown scene ${String(o.scene)}`);
  const params = scene.parse(o.params);
  if (params && typeof params === "object" && "error" in params) return fail(`params: ${(params as { error: string }).error}`);

  if (!Array.isArray(o.steps) || o.steps.length === 0 || o.steps.length > MAX_STEPS) return fail(`steps must be 1 to ${MAX_STEPS}`);
  const steps: VisualStep[] = [];
  const seen = new Set<string>();
  for (const [k, s] of (o.steps as unknown[]).entries()) {
    if (!s || typeof s !== "object") return fail(`step ${k + 1} is not an object`);
    const { from, beats } = s as { from?: unknown; beats?: unknown };
    if (typeof from !== "number" || !Number.isInteger(from) || from < 0) return fail(`step ${k + 1}: from must be a sentence index`);
    if (k === 0 && from !== 0) return fail("the first step must start at sentence 0");
    if (k > 0 && from <= steps[k - 1].from) return fail(`step ${k + 1} must start after step ${k}`);
    if (!Array.isArray(beats) || beats.length === 0) return fail(`step ${k + 1} has no beats`);
    for (const b of beats) {
      if (typeof b !== "string" || !scene.beats.includes(b)) return fail(`step ${k + 1}: unknown beat ${String(b)}`);
      if (seen.has(b)) return fail(`beat ${b} is used twice`);
      seen.add(b);
    }
    steps.push({ from, beats: [...(beats as string[])] });
  }

  if (typeof o.fingerprint !== "string" || !/^[0-9a-f]{8}$/.test(o.fingerprint)) return fail("fingerprint must be 8 hex digits");

  const a = o.answer as { value?: unknown; label?: unknown; tolerance?: unknown } | undefined;
  if (!a || typeof a !== "object") return fail("answer is missing");
  if (typeof a.value !== "number" || !Number.isFinite(a.value)) return fail("answer.value must be a number");
  let label: string;
  try {
    label = plainLabel(a.label, "answer.label", 32);
  } catch (e) {
    return fail((e as Error).message);
  }
  const answer: SolutionVisual["answer"] = { value: a.value, label };
  if (a.tolerance !== undefined) {
    if (typeof a.tolerance !== "number" || !(a.tolerance >= 0)) return fail("answer.tolerance must be a number ≥ 0");
    if (a.tolerance > 0.05 * Math.max(1, Math.abs(a.value))) return fail("answer.tolerance is wider than 5% of the answer");
    answer.tolerance = a.tolerance;
  }

  return { ok: true, visual: { v: 1, scene: scene.id, params, steps, fingerprint: o.fingerprint, answer } };
}

/**
 * Each step's slice of the solution, or null when the steps cannot be trusted
 * against this text: no solution, a different solution than they were mapped
 * against, a table (a cut could split it), or a step past the last sentence.
 */
export function stepTexts(visual: SolutionVisual, solution: string | null | undefined): string[] | null {
  if (!solution) return null;
  if (solutionFingerprint(solution) !== visual.fingerprint) return null;
  // A table is kept whole by sentenceStarts; refuse only when it cannot tell where a table runs.
  if (parseTableBlocks(solution).some((b) => b.kind === "table") && tableSpans(solution) === null) return null;
  const starts = sentenceStarts(solution);
  if (visual.steps.some((s) => s.from >= starts.length)) return null;
  return visual.steps.map((s, k) => {
    const end = k + 1 < visual.steps.length ? starts[visual.steps[k + 1].from] : solution.length;
    return solution.slice(starts[s.from], end).trim();
  });
}

/**
 * The stored visual as it should reach a page, or null. The query layer runs
 * this on the server, so a visual that no longer parses or whose self-check
 * disagrees with its answer never reaches a student, and the client only loads
 * the scene code for a question that really has one. Returns the RAW value:
 * the client parses it again inside the (lazily loaded) player.
 */
export function usableVisual(raw: unknown): unknown | null {
  if (raw === null || raw === undefined) return null;
  const r = parseSolutionVisual(raw);
  return r.ok && checkVisual(r.visual).ok ? raw : null;
}

/** Run the scene's own working and compare it with the stored answer. */
export function checkVisual(visual: SolutionVisual): { ok: boolean; value: number } {
  const scene = getScene(visual.scene);
  if (!scene) return { ok: false, value: NaN };
  const value = scene.check(visual.params);
  const tol = visual.answer.tolerance ?? 1e-6 * Math.max(1, Math.abs(visual.answer.value));
  return { ok: Number.isFinite(value) && Math.abs(value - visual.answer.value) <= tol, value };
}
