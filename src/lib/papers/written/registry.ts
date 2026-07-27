/**
 * The written-paper pattern registry — pure data, no I/O.
 *
 * SCOPE, AND WHY IT IS DELIBERATELY NARROW: only patterns that could be VERIFIED
 * against real papers are registered. The Maharashtra SSC shapes below were
 * reconstructed from the `question_number` slots of 10 years of ingested board
 * papers (Q.1(A) ~4/yr, Q.2(B) ~5/yr, ...) and they reproduce the official
 * 40-mark totals exactly.
 *
 * CBSE is NOT registered yet: only NCERT *textbook* content is ingested, no CBSE
 * board papers, so its pattern cannot be verified the same way — and inventing
 * one would ship a "standard format" that isn't standard. Teachers reach those
 * via the custom-template path instead.
 *
 * TO ADD A PATTERN: append a blueprint. `WRITTEN_BLUEPRINTS` is asserted against
 * validateBlueprint() in tests, so a marks typo fails the gate. Nothing else
 * needs to change — the pickers derive their options from this array.
 */
import type { PaperVariant, WrittenBlueprint, WrittenSlot } from "./types";
import { PAPER_VARIANTS } from "./types";

const MATHS_SUBJECTS = ["Algebra", "Geometry"];
const SCIENCE_SUBJECTS = ["Science and Technology I", "Science and Technology II"];

const MATHS_INSTRUCTIONS = [
  "All questions are compulsory.",
  "Use of a calculator is not allowed.",
  "Figures to the right of questions indicate full marks.",
  "For every multiple-choice question, only the first attempt will be evaluated.",
  "Draw proper figures wherever necessary.",
];

const SCIENCE_INSTRUCTIONS = [
  "All questions are compulsory.",
  "Figures to the right of questions indicate full marks.",
  "For every multiple-choice question, only the first attempt will be evaluated.",
  "Draw neat labelled diagrams wherever necessary.",
];

/**
 * Maharashtra SSC Mathematics (Algebra / Geometry) — 40 marks.
 * 4 + 4 + 4 + 8 + 3 + 6 + 8 + 3 = 40.
 */
const SSC_MATHS_40: WrittenSlot[] = [
  {
    key: "q1a",
    code: "Q.1 (A)",
    label: "Choose the correct alternative and write its alphabet",
    print: 4,
    attempt: 4,
    marksEach: 1,
    format: "mcq",
  },
  {
    key: "q1b",
    code: "Q.1 (B)",
    label: "Solve the following subquestions",
    print: 4,
    attempt: 4,
    marksEach: 1,
    format: "subjective",
  },
  {
    key: "q2a",
    code: "Q.2 (A)",
    label: "Complete the following activities",
    instruction: "Attempt any TWO of the following",
    print: 3,
    attempt: 2,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q2b",
    code: "Q.2 (B)",
    label: "Solve the following subquestions",
    instruction: "Attempt any FOUR of the following",
    print: 5,
    attempt: 4,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q3a",
    code: "Q.3 (A)",
    label: "Complete the following activity",
    instruction: "Attempt any ONE of the following",
    print: 2,
    attempt: 1,
    marksEach: 3,
    format: "subjective",
  },
  {
    key: "q3b",
    code: "Q.3 (B)",
    label: "Solve the following subquestions",
    instruction: "Attempt any TWO of the following",
    print: 4,
    attempt: 2,
    marksEach: 3,
    format: "subjective",
  },
  {
    key: "q4",
    code: "Q.4",
    label: "Solve the following subquestions",
    instruction: "Attempt any TWO of the following",
    print: 3,
    attempt: 2,
    marksEach: 4,
    format: "subjective",
  },
  {
    key: "q5",
    code: "Q.5",
    label: "Solve the following subquestions",
    instruction: "Attempt any ONE of the following",
    print: 2,
    attempt: 1,
    marksEach: 3,
    format: "subjective",
  },
];

/**
 * Maharashtra SSC Science and Technology I / II — 40 marks.
 * 5 + 5 + 4 + 6 + 15 + 5 = 40.
 *
 * SIX slots, not five: the modern paper splits Q.2 into (A) and (B). Verified
 * from the 2020 + 2022-2026 sittings, counting TOP-LEVEL items only — the bank
 * stores a sub-parted question like Q.3(ii)(a)/(b)/(c) as three rows, which
 * inflates a naive per-slot row count (Q.3 looks like ~10/yr but is 8 items).
 */
const SSC_SCIENCE_40: WrittenSlot[] = [
  {
    key: "q1a",
    code: "Q.1 (A)",
    label: "Choose and write the correct option",
    print: 5,
    attempt: 5,
    marksEach: 1,
    format: "mcq",
  },
  {
    key: "q1b",
    code: "Q.1 (B)",
    label: "Solve the following subquestions",
    print: 5,
    attempt: 5,
    marksEach: 1,
    format: "subjective",
  },
  {
    key: "q2a",
    code: "Q.2 (A)",
    label: "Give scientific reasons / complete the activities",
    instruction: "Attempt any TWO of the following",
    print: 3,
    attempt: 2,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q2b",
    code: "Q.2 (B)",
    label: "Answer the following subquestions",
    instruction: "Attempt any THREE of the following",
    print: 5,
    attempt: 3,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q3",
    code: "Q.3",
    label: "Answer the following subquestions",
    instruction: "Attempt any FIVE of the following",
    print: 8,
    attempt: 5,
    marksEach: 3,
    format: "subjective",
  },
  {
    key: "q4",
    code: "Q.4",
    label: "Answer the following subquestion",
    instruction: "Attempt any ONE of the following",
    print: 2,
    attempt: 1,
    marksEach: 5,
    format: "subjective",
  },
];

/**
 * 25-mark unit test — an LWS house pattern, not a board format (the board sets
 * no unit-test paper). Keeps the board's slot GRAMMAR so the shorter test still
 * rehearses the real thing. 5 + 6 + 9 + 5 = 25.
 */
const UNIT_MATHS_25: WrittenSlot[] = [
  {
    key: "q1",
    code: "Q.1",
    label: "Choose the correct alternative and write its alphabet",
    print: 5,
    attempt: 5,
    marksEach: 1,
    format: "mcq",
  },
  {
    key: "q2",
    code: "Q.2",
    label: "Solve the following subquestions",
    instruction: "Attempt any THREE of the following",
    print: 4,
    attempt: 3,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q3",
    code: "Q.3",
    label: "Solve the following subquestions",
    instruction: "Attempt any THREE of the following",
    print: 4,
    attempt: 3,
    marksEach: 3,
    format: "subjective",
  },
  {
    key: "q4",
    code: "Q.4",
    label: "Solve the following subquestion",
    instruction: "Attempt any ONE of the following",
    print: 2,
    attempt: 1,
    marksEach: 5,
    format: "subjective",
  },
];

/** 25-mark Science unit test. 5 + 8 + 12 = 25. */
const UNIT_SCIENCE_25: WrittenSlot[] = [
  {
    key: "q1",
    code: "Q.1",
    label: "Choose and write the correct option",
    print: 5,
    attempt: 5,
    marksEach: 1,
    format: "mcq",
  },
  {
    key: "q2",
    code: "Q.2",
    label: "Answer the following subquestions",
    instruction: "Attempt any FOUR of the following",
    print: 5,
    attempt: 4,
    marksEach: 2,
    format: "subjective",
  },
  {
    key: "q3",
    code: "Q.3",
    label: "Answer the following subquestions",
    instruction: "Attempt any FOUR of the following",
    print: 6,
    attempt: 4,
    marksEach: 3,
    format: "subjective",
  },
];

export const WRITTEN_BLUEPRINTS: readonly WrittenBlueprint[] = [
  // --- Maharashtra SSC Class 10 · Mathematics -------------------------------
  {
    id: "mh-ssc-10-maths-unit-25",
    board: "Maharashtra State Board",
    std: 10,
    subjects: MATHS_SUBJECTS,
    variant: "unit",
    label: "Unit Test — 25 marks",
    durationMins: 60,
    maxMarks: 25,
    instructions: MATHS_INSTRUCTIONS,
    slots: UNIT_MATHS_25,
  },
  {
    // Same printed shape as the annual paper — the board reduces the SYLLABUS
    // for the mid-year, not the pattern. Chapter scope is chosen per paper.
    id: "mh-ssc-10-maths-midyear-40",
    board: "Maharashtra State Board",
    std: 10,
    subjects: MATHS_SUBJECTS,
    variant: "midyear",
    label: "Mid-Year — 40 marks (board pattern)",
    durationMins: 120,
    maxMarks: 40,
    instructions: MATHS_INSTRUCTIONS,
    slots: SSC_MATHS_40,
  },
  {
    id: "mh-ssc-10-maths-annual-40",
    board: "Maharashtra State Board",
    std: 10,
    subjects: MATHS_SUBJECTS,
    variant: "annual",
    label: "Annual — 40 marks (board pattern)",
    durationMins: 120,
    maxMarks: 40,
    instructions: MATHS_INSTRUCTIONS,
    slots: SSC_MATHS_40,
  },

  // --- Maharashtra SSC Class 10 · Science and Technology --------------------
  {
    id: "mh-ssc-10-science-unit-25",
    board: "Maharashtra State Board",
    std: 10,
    subjects: SCIENCE_SUBJECTS,
    variant: "unit",
    label: "Unit Test — 25 marks",
    durationMins: 60,
    maxMarks: 25,
    instructions: SCIENCE_INSTRUCTIONS,
    slots: UNIT_SCIENCE_25,
  },
  {
    id: "mh-ssc-10-science-midyear-40",
    board: "Maharashtra State Board",
    std: 10,
    subjects: SCIENCE_SUBJECTS,
    variant: "midyear",
    label: "Mid-Year — 40 marks (board pattern)",
    durationMins: 120,
    maxMarks: 40,
    instructions: SCIENCE_INSTRUCTIONS,
    slots: SSC_SCIENCE_40,
  },
  {
    id: "mh-ssc-10-science-annual-40",
    board: "Maharashtra State Board",
    std: 10,
    subjects: SCIENCE_SUBJECTS,
    variant: "annual",
    label: "Annual — 40 marks (board pattern)",
    durationMins: 120,
    maxMarks: 40,
    instructions: SCIENCE_INSTRUCTIONS,
    slots: SSC_SCIENCE_40,
  },
];

export type BlueprintQuery = {
  board: string | null | undefined;
  std: number | null | undefined;
  subject: string | null | undefined;
  variant?: PaperVariant | null;
  maxMarks?: number | null;
};

/**
 * Patterns matching the picker's current selection, in registry order. The
 * `maxMarks` leg is what makes the marks control a FILTER over templates rather
 * than a free-text field — a teacher can't ask for 80 marks from a 40-mark
 * pattern, so the invalid combination is simply never offered.
 */
export function blueprintsFor(q: BlueprintQuery): WrittenBlueprint[] {
  if (!q.board || !q.std || !q.subject) return [];
  return WRITTEN_BLUEPRINTS.filter(
    (b) =>
      b.board === q.board &&
      b.std === q.std &&
      b.subjects.includes(q.subject!) &&
      (!q.variant || b.variant === q.variant) &&
      (q.maxMarks == null || b.maxMarks === q.maxMarks)
  );
}

/** Exam types available for a subject, in school-calendar order. */
export function variantsFor(q: Omit<BlueprintQuery, "variant">): PaperVariant[] {
  const available = new Set(blueprintsFor(q).map((b) => b.variant));
  return PAPER_VARIANTS.filter((v) => available.has(v));
}

/** Distinct mark totals available for a subject, ascending — feeds the marks picker. */
export function maxMarksFor(q: Omit<BlueprintQuery, "maxMarks">): number[] {
  return Array.from(new Set(blueprintsFor(q).map((b) => b.maxMarks))).sort(
    (a, b) => a - b
  );
}

export function getBlueprintById(id: string | null | undefined): WrittenBlueprint | null {
  if (!id) return null;
  return WRITTEN_BLUEPRINTS.find((b) => b.id === id) ?? null;
}
