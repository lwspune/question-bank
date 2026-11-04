/**
 * The answer axis of a mock: what the key IS, what the student ENTERED, and
 * whether the two agree.
 *
 * Until JEE Mains this axis was a single letter — `"A" | "B" | "C" | "D"` — all
 * the way from `attempt_answers.selected_label` through grading, the palette and
 * the review page. JEE's Section B is a NUMERIC-answer (NAT) question: no
 * options at all, the key living in `questions.numeric_answer`. So the key and
 * the response are both DISCRIMINATED UNIONS, not widened strings — a union
 * makes the typechecker enumerate every call site, where an optional extra field
 * would let a consumer keep reading `.label` and silently mis-grade every NAT
 * row.
 *
 * Pure — no I/O. Unit-tested in tests/mock-answers.test.ts.
 */

/**
 * Every letter a mock answer can carry. E since IMAT (five options per
 * question, migration 0179); a four-option paper simply never offers it.
 */
export const MOCK_OPTION_LABELS = ["A", "B", "C", "D", "E"] as const;
export type OptionLabel = (typeof MOCK_OPTION_LABELS)[number];

/** The correct answer for one question, as stored in the bank. */
export type MockAnswerKey =
  | { kind: "mcq"; label: OptionLabel }
  /** `max`: the top of a range key (UCEED 2023 Q2: 132.8 to 133.1); absent = `value` is exact (0214). */
  | { kind: "numeric"; value: number; max?: number }
  /** Multiple-select (0214): the full set of correct options. */
  | { kind: "msq"; labels: OptionLabel[] };

/**
 * How a multiple-select question is marked. "exact" (UCEED 2019-2021): full marks only for exactly
 * the correct set, the penalty for anything else. "partial" (UCEED 2022 on, IIT Bombay's printed
 * rule from 2023): full marks for the exact set, and when some correct options are missing but no
 * wrong one is ticked, one mark per correct tick (+3 / +2 / +1); the penalty otherwise.
 */
export type MsqScheme = "exact" | "partial";

/**
 * One student's saved response, mirroring the two `attempt_answers` columns
 * (migration 0087). At most one is non-null — a DB CHECK enforces it — and both
 * null means unanswered, which is the meaning the column had before NAT existed.
 */
export type SavedResponse = {
  selectedLabel: OptionLabel | null;
  numericResponse: number | null;
  /** The ticks on a multiple-select question (migration 0215); absent or empty = none. */
  selectedLabels?: OptionLabel[] | null;
};

/**
 * How far a numeric response may sit from the key: half of the last place at
 * two decimals, which is what "agrees to 2dp" means.
 *
 * NTA's own instruction is that a Section-B answer agreeing with the key at two
 * decimal places is correct. THIS RULE IS INERT ON THE SHIPPED CORPUS: all 546
 * NAT answers across JEE 2025+2026 are non-negative integers at scale 0 (0
 * decimals, measured), so no real 2025+ question can exercise it and its tests
 * are necessarily synthetic. It is implemented properly anyway because the
 * 2021-2024 papers — a later tier — DO carry decimal and negative answers.
 */
export const NUMERIC_TOLERANCE = 0.005;

/** Binary floating point makes 0.1 + 0.2 land 4e-17 away from 0.3; without this
 *  slack a response the student typed correctly can miss by a rounding artefact. */
const FLOAT_EPSILON = 1e-9;

/**
 * Whether a numeric response counts as the key. The comparison is a distance,
 * not a round-then-compare: `Math.round(4.005 * 100)` is 400, because 4.005 is
 * held as 4.00499…, so rounding disagrees with itself at exactly the boundary.
 *
 * The boundary is resolved INCLUSIVELY — in the student's favour — because
 * rounding a true half is ambiguous (4.005 → 4.00 or 4.01 depending on the rule)
 * and a mock should not mark someone wrong on a tie we cannot adjudicate.
 */
export function matchesNumericAnswer(response: number, key: number): boolean {
  if (!Number.isFinite(response) || !Number.isFinite(key)) return false;
  return Math.abs(response - key) <= NUMERIC_TOLERANCE + FLOAT_EPSILON;
}

/**
 * Whether the student answered at all — the palette's "answered" vs
 * "not_answered", and the grader's "skipped".
 *
 * Checks BOTH columns explicitly against null. A truthiness test would read a
 * numeric response of **0** as unanswered, and 0 is a legitimate NAT answer
 * (650 of the corpus's answers have a minimum of 0).
 */
export function isAnswered(r: SavedResponse | undefined | null): boolean {
  if (!r) return false;
  return r.selectedLabel !== null || r.numericResponse !== null || (r.selectedLabels?.length ?? 0) > 0;
}

/**
 * Whether a response agrees with the key. A kind mismatch — a letter offered for
 * a NAT question or a number for an MCQ — is never a match: it is a defect
 * somewhere upstream, and guessing which the student meant would invent an
 * answer they did not give.
 */
export function responseMatchesKey(
  key: MockAnswerKey | null,
  r: SavedResponse | undefined | null
): boolean {
  if (!key || !r) return false;
  if (key.kind === "msq") return msqOutcome(key.labels, r) === "exact";
  if (key.kind === "mcq") {
    if (r.selectedLabel === null) return false;
    return String(r.selectedLabel).trim().toUpperCase() === key.label;
  }
  if (r.numericResponse === null) return false;
  if (key.max !== undefined) {
    return r.numericResponse >= key.value - FLOAT_EPSILON && r.numericResponse <= key.max + FLOAT_EPSILON;
  }
  return matchesNumericAnswer(r.numericResponse, key.value);
}

/**
 * The verdict for one question: 1 right, −1 wrong, 0 blank.
 *
 * THE SINGLE SOURCE OF THIS JUDGEMENT. gradeMock (the score) and
 * getAttemptReview (the per-question review list) both call it, because they
 * used to compute it separately and a disagreement between them would show a
 * student a score that says "wrong" beside a review row that says "right" —
 * exactly the two-renderers drift this repo has already paid for twice.
 *
 * A missing key yields 0, never −1: it cannot happen (validatePaperRows refuses
 * to build such a paper) but if it ever did, the student must not be penalised
 * for our defect.
 */
export function verdictFor(
  key: MockAnswerKey | null,
  r: SavedResponse | undefined | null,
  grace: boolean
): 1 | -1 | 0 {
  if (grace) return 1;
  if (!isAnswered(r)) return 0;
  if (!key) return 0;
  return responseMatchesKey(key, r) ? 1 : -1;
}

/** A tick set against a multiple-select key: the exact set, some correct and none wrong, a wrong tick, or nothing. */
export function msqOutcome(
  correct: readonly string[],
  r: SavedResponse | undefined | null
): "exact" | "partial" | "wrong" | "blank" {
  const key = new Set(correct.map((l) => String(l).toUpperCase()));
  const picks = [...new Set((r?.selectedLabels ?? []).map((l) => String(l).trim().toUpperCase()))];
  if (picks.length === 0) return "blank";
  if (picks.some((l) => !key.has(l))) return "wrong";
  return picks.length === key.size ? "exact" : "partial";
}

/** The marks a tick set earns under a scheme (see MsqScheme). Grace is decided by the caller. */
export function msqMarks(
  scheme: MsqScheme,
  correct: readonly string[],
  r: SavedResponse | undefined | null,
  marks: number,
  negMarks: number
): number {
  const outcome = msqOutcome(correct, r);
  if (outcome === "blank") return 0;
  if (outcome === "exact") return marks;
  if (outcome === "partial" && scheme === "partial") return new Set(r?.selectedLabels ?? []).size;
  return negMarks;
}

/** The columns a question's key is read from (questions + its options). */
export type AnswerKeyRow = {
  question_format?: string | null;
  numeric_answer?: number | string | null;
  numeric_answer_max?: number | string | null;
  options?: readonly { label: string; is_correct: boolean }[] | null;
};

/**
 * A question's key, read the ONE way the mock build and the grader both use (build.ts
 * readAnswerKey and query.ts loadAnswerKey were two copies until migration 0214 added
 * two shapes). The SHAPE comes from the question's own `question_format`, never from
 * whether options exist: a failed options read must not turn a question numeric.
 * Null when no key is stored; validatePaperRows refuses such a paper unless it is grace.
 */
export function answerKeyFromRow(row: AnswerKeyRow): MockAnswerKey | null {
  const num = (v: unknown) => (v === null || v === undefined || v === "" || !Number.isFinite(Number(v)) ? null : Number(v));
  if (row.question_format === "numeric") {
    const value = num(row.numeric_answer);
    if (value === null) return null;
    const max = num(row.numeric_answer_max);
    return max !== null && max !== value ? { kind: "numeric", value, max } : { kind: "numeric", value };
  }
  const correct = (row.options ?? []).filter((o) => o.is_correct).map((o) => o.label as OptionLabel);
  if (correct.length === 0) return null;
  if (row.question_format === "msq") return { kind: "msq", labels: [...correct].sort() };
  return { kind: "mcq", label: correct[0] };
}
