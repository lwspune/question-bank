/**
 * Re-tie an animated solution's steps after its solution text was edited.
 *
 * A visual ties each step to a sentence of the solution (`from`, an index into
 * sentenceStarts) and carries the text's fingerprint; any edit to the text cuts
 * the step text off (stepTexts returns null). On 2026-11-23 the HSC answer
 * clean-up (dashes, method notes) did that to 425 animations at once. This
 * aligns the old text's sentences with the new text's in order, moves every step
 * to its sentence, and takes the new fingerprint. A step whose sentences were all
 * deleted folds its beats into the step before. Anything it cannot place is
 * refused, never guessed.
 *
 * It re-ties the TEXT only. If an edit changed what the working says (a second
 * answer dropped, a value corrected), the picture still shows the old working:
 * a caller reports `rewritten` rows for a person to look at.
 */
import { sentenceStarts, solutionFingerprint, stepTexts } from "./visual";
import type { SolutionVisual } from "./types";

export type RetieResult =
  | { ok: true; visual: SolutionVisual; folded: number; kept: number }
  | { ok: false; reason: string };

function sentences(t: string): string[] {
  const s = sentenceStarts(t);
  return s.map((a, k) => t.slice(a, k + 1 < s.length ? s[k + 1] : t.length).trim());
}

function norm(s: string): string {
  return s
    .replace(/\s*[—–]\s*/g, " ")
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
}

/** 2 x longest common subsequence / total length, on normalised text. */
function similarity(a: string, b: string): number {
  const x = norm(a);
  const y = norm(b);
  if (x === y) return 1;
  if (!x.length || !y.length) return 0;
  const row = new Array<number>(y.length + 1).fill(0);
  for (let i = 1; i <= x.length; i++) {
    let diag = 0;
    for (let j = 1; j <= y.length; j++) {
      const up = row[j];
      row[j] = x[i - 1] === y[j - 1] ? diag + 1 : Math.max(row[j], row[j - 1]);
      diag = up;
    }
  }
  return (2 * row[y.length]) / (x.length + y.length);
}

const MATCH = 0.6;

/** In-order alignment of old to new sentences (max total similarity); -1 = deleted. */
function align(o: string[], n: string[]): number[] {
  const sim = o.map((a) => n.map((b) => similarity(a, b)));
  const best = Array.from({ length: o.length + 1 }, () => new Array<number>(n.length + 1).fill(0));
  for (let i = 1; i <= o.length; i++)
    for (let j = 1; j <= n.length; j++) {
      const s = sim[i - 1][j - 1];
      best[i][j] = Math.max(best[i - 1][j], best[i][j - 1], s >= MATCH ? best[i - 1][j - 1] + s : -Infinity);
    }
  const map = new Array<number>(o.length).fill(-1);
  for (let i = o.length, j = n.length; i > 0 && j > 0; ) {
    if (best[i][j] === best[i - 1][j]) i--;
    else if (best[i][j] === best[i][j - 1]) j--;
    else {
      map[i - 1] = j - 1;
      i--;
      j--;
    }
  }
  return map;
}

export function retieVisual(visual: SolutionVisual, oldText: string, newText: string): RetieResult {
  if (solutionFingerprint(oldText) !== visual.fingerprint) {
    return { ok: false, reason: "the visual was not drawn against this text" };
  }
  const o = sentences(oldText);
  const map = align(o, sentences(newText));
  const kept = map.filter((x) => x >= 0).length;

  type Placed = { from: number; beats: string[] } | null;
  const placed: Placed[] = visual.steps.map((s, i) => {
    if (s.from === 0) return { ...s, from: 0 };
    const stop = i + 1 < visual.steps.length ? visual.steps[i + 1].from : o.length;
    for (let f = s.from; f < stop; f++) if (map[f] >= 0) return { ...s, from: map[f] };
    return null;
  });
  const steps: Array<{ from: number; beats: string[] }> = [];
  let folded = 0;
  for (let i = 0; i < placed.length; i++) {
    const p = placed[i];
    if (p) {
      steps.push(p);
      continue;
    }
    const prev = steps[steps.length - 1];
    if (!prev) return { ok: false, reason: "the first step has nowhere to go" };
    folded++;
    steps[steps.length - 1] = { ...prev, beats: [...prev.beats, ...visual.steps[i].beats] };
  }
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].from <= steps[i - 1].from) return { ok: false, reason: `step ${i} would not follow the step before` };
  }
  const next = { ...visual, steps, fingerprint: solutionFingerprint(newText) } as SolutionVisual;
  if (!stepTexts(next, newText)) return { ok: false, reason: "the re-tied steps do not cut the new text" };
  return { ok: true, visual: next, folded, kept: kept / Math.max(1, o.length) };
}
