/**
 * Pure helpers behind the mock runner's controls (2026-11-12): the question
 * grid by section, the counts on the Submit confirm, the keyboard keys, the
 * time warnings and which answers have not saved. No I/O; MockRunner.tsx only
 * draws what these return. Spec: tests/mock-runner.test.ts.
 */

import { paletteState, type PaletteState } from "./attempt";
import type { SavedResponse } from "./answers";

type Positioned = { questionId: string; position: number; sectionKey: string };
type Section = { key: string; label: string };
type Row = SavedResponse & { isFlagged: boolean };

export type SectionGroup = {
  key: string;
  label: string;
  /** Indices into the runner's question array. */
  indices: number[];
  /** First and last printed question numbers, for "Q1–50". */
  first: number;
  last: number;
};

/**
 * The paper's questions under their sections, in the paper's section order.
 * A question whose section is not listed keeps its own group (labelled with
 * its key) instead of vanishing from the grid, the one control that finds it.
 */
export function groupBySection(questions: readonly Positioned[], sections: readonly Section[]): SectionGroup[] {
  const order = new Map(sections.map((s, i) => [s.key, i]));
  const byKey = new Map<string, SectionGroup>();
  questions.forEach((q, i) => {
    let g = byKey.get(q.sectionKey);
    if (!g) {
      const label = sections.find((s) => s.key === q.sectionKey)?.label ?? q.sectionKey;
      g = { key: q.sectionKey, label, indices: [], first: q.position, last: q.position };
      byKey.set(q.sectionKey, g);
    }
    g.indices.push(i);
    g.first = Math.min(g.first, q.position);
    g.last = Math.max(g.last, q.position);
  });
  const rank = (k: string) => order.get(k) ?? Number.MAX_SAFE_INTEGER;
  // Unlisted sections keep their order of first appearance, after the listed ones.
  return [...byKey.values()].sort((a, b) => rank(a.key) - rank(b.key) || a.indices[0] - b.indices[0]);
}

export type SubmitSummary = {
  counts: Record<PaletteState, number>;
  /** What will be graded: answered, marked or not. */
  answeredTotal: number;
  bySection: { key: string; label: string; answered: number; total: number }[];
};

/** The counts on the Submit confirm and the grid legend. */
export function submitSummary(
  questions: readonly Positioned[],
  answers: Readonly<Record<string, Row | undefined>>,
  sections: readonly Section[]
): SubmitSummary {
  const counts: Record<PaletteState, number> = {
    answered: 0,
    answered_flagged: 0,
    flagged: 0,
    not_answered: 0,
    not_visited: 0,
  };
  const isGraded = (st: PaletteState) => st === "answered" || st === "answered_flagged";
  for (const q of questions) counts[paletteState(answers[q.questionId])]++;
  const bySection = groupBySection(questions, sections).map((g) => ({
    key: g.key,
    label: g.label,
    answered: g.indices.filter((i) => isGraded(paletteState(answers[questions[i].questionId]))).length,
    total: g.indices.length,
  }));
  return { counts, answeredTotal: counts.answered + counts.answered_flagged, bySection };
}

export type RunnerKeyAction = { type: "pick"; label: string } | { type: "prev" } | { type: "next" } | { type: "mark" };

/**
 * A key press on the runner, as an action: A–D picks that option, ← and →
 * move, M marks. Nothing while the student types in an answer box (a JEE
 * numeric answer needs its arrows and letters) or holds Ctrl/Cmd/Alt.
 */
export function runnerKeyAction(
  e: { key: string; hasModifier: boolean; inTextField: boolean },
  optionLabels: readonly string[]
): RunnerKeyAction | null {
  if (e.hasModifier || e.inTextField) return null;
  if (e.key === "ArrowLeft") return { type: "prev" };
  if (e.key === "ArrowRight") return { type: "next" };
  if (e.key.length !== 1) return null;
  const k = e.key.toUpperCase();
  if (k === "M") return { type: "mark" };
  return optionLabels.includes(k) ? { type: "pick", label: k } : null;
}

/** Seconds left at which the runner warns: 10, 5 and 1 minute. */
export const TIME_WARNINGS = [600, 300, 60] as const;

/**
 * The warning to give as the clock goes from `prev` to `now` seconds left, or
 * null. A tab that slept past several gives only the most urgent. A resumed
 * test that opens below a mark says nothing, and neither does zero: the test
 * is submitting.
 */
export function crossedTimeWarning(prev: number, now: number): number | null {
  if (now <= 0) return null;
  const crossed = TIME_WARNINGS.filter((t) => prev > t && now <= t);
  return crossed.length ? Math.min(...crossed) : null;
}

/**
 * Which answers have not saved. `latest` is each question's newest save;
 * `failed` holds the answer to send again, only while no newer save for that
 * question has started (a retry must never send an older answer after a
 * newer one).
 */
export type SaveTracker<R> = { latest: Record<string, number>; failed: Record<string, R> };

export function emptySaveTracker<R>(): SaveTracker<R> {
  return { latest: {}, failed: {} };
}

function without<R>(m: Record<string, R>, key: string): Record<string, R> {
  if (!(key in m)) return m;
  const next = { ...m };
  delete next[key];
  return next;
}

export function beginSave<R>(t: SaveTracker<R>, qid: string, seq: number): SaveTracker<R> {
  return { latest: { ...t.latest, [qid]: seq }, failed: without(t.failed, qid) };
}

export function failSave<R>(t: SaveTracker<R>, qid: string, seq: number, row: R): SaveTracker<R> {
  return t.latest[qid] === seq ? { ...t, failed: { ...t.failed, [qid]: row } } : t;
}

export function succeedSave<R>(t: SaveTracker<R>, qid: string, seq: number): SaveTracker<R> {
  return t.latest[qid] === seq ? { ...t, failed: without(t.failed, qid) } : t;
}
