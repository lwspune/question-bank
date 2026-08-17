/**
 * Unit Test 1 selection for MH State Board Class 11 Mathematics — the AUTHORED
 * content of the paper, kept as data so the selection is reviewable and stable
 * independently of how it is rendered.
 *
 * Pattern: the `mh-sb-11-maths-unit-25` blueprint (src/lib/papers/written/registry.ts)
 * — 5x1 + 3x2 + 3x3 + 1x5 = 25 marks in 60 minutes. Class 11 is NOT a board year,
 * so that shape mirrors no official paper; it reuses the Std-9/10 unit-test format
 * the school already sets, deliberately, so a Std-11 test feels continuous with it.
 *
 * SELECTION RULES APPLIED (recorded because `nominal_marks` is NULL for this corpus
 * BY DESIGN — see scripts/written-paper/backfill-nominal-marks.ts, which excludes
 * textbook corpora because a ref like "Ex 5.1 Q5" says nothing about question size.
 * Slot-suitability here is therefore an authored judgement, not a derived value):
 *   - STANDALONE questions only. ~59% of this corpus are set-siblings (one sub-item
 *     of a ten-part question); they are too small for a 3- or 5-mark slot and several
 *     are meaningless detached from their shared instruction.
 *   - Difficulty rises across the slots: EASY/MODERATE in Q.1-Q.2, MODERATE/HARD by
 *     Q.3-Q.4.
 *   - Q.4's two options are different in KIND (algebraic counting vs geometry) so the
 *     internal choice is real rather than cosmetic.
 *   - Chapter balance across the three ingested chapters: Angle 6 / Trig 4 / Sets 5.
 */

export type UnitTestItem = {
  /** Blueprint slot key. */
  slot: "q1" | "q2" | "q3" | "q4";
  /** Position within the slot, 1-based. */
  ord: number;
  /** DB chapter name. */
  chapter: string;
  /** `questions.question_number` — the book ref. */
  ref: string;
};

export const UNIT_TEST_1_TITLE =
  "Std XI · Mathematics · Unit Test 1 — Angle and its Measurement, Trigonometry I, Sets and Relations";

/** Printed slot headings, mirroring UNIT_MATHS_25. Marks are the blueprint's. */
export const UNIT_TEST_1_SLOTS = [
  { key: "q1", code: "Q.1", label: "Choose the correct alternative and write its alphabet", instruction: undefined, print: 5, attempt: 5, marksEach: 1 },
  { key: "q2", code: "Q.2", label: "Solve the following subquestions", instruction: "Attempt any THREE of the following", print: 4, attempt: 3, marksEach: 2 },
  { key: "q3", code: "Q.3", label: "Solve the following subquestions", instruction: "Attempt any THREE of the following", print: 4, attempt: 3, marksEach: 3 },
  { key: "q4", code: "Q.4", label: "Solve the following subquestion", instruction: "Attempt any ONE of the following", print: 2, attempt: 1, marksEach: 5 },
] as const;

const ANGLE = "Angle and its Measurement";
const TRIG = "Trigonometry - I";
const SETS = "Sets and Relations";

export const UNIT_TEST_1: UnitTestItem[] = [
  // Q.1 — 5 x 1 mark. One-step recall/derivation, spread over all three chapters.
  { slot: "q1", ord: 1, chapter: ANGLE, ref: "Misc I Q1" }, // radian -> degree
  { slot: "q1", ord: 2, chapter: TRIG, ref: "Misc I Q4" }, // evaluate at 60 degrees
  { slot: "q1", ord: 3, chapter: SETS, ref: "Misc I Q3" }, // n[P[P[P(A)]]] for empty A
  { slot: "q1", ord: 4, chapter: ANGLE, ref: "Misc I Q5" }, // clock hands at 9:45
  { slot: "q1", ord: 5, chapter: SETS, ref: "Misc I Q10" }, // number of relations on A

  // Q.2 — 4 printed, any 3 x 2 marks. Two clean steps each.
  { slot: "q2", ord: 1, chapter: ANGLE, ref: "Ex 1.1 Q8" }, // sum 5pi^c, difference 60 deg
  { slot: "q2", ord: 2, chapter: TRIG, ref: "Ex 2.2 Q6" }, // 2cos^2 - 11cos + 5 = 0
  { slot: "q2", ord: 3, chapter: SETS, ref: "Ex 5.2 Q2" }, // ordered-pair equality
  { slot: "q2", ord: 4, chapter: ANGLE, ref: "Misc II Q5" }, // 10 cm wire bent, r = 4

  // Q.3 — 4 printed, any 3 x 3 marks. Multi-step; one HARD to stretch the top end.
  { slot: "q3", ord: 1, chapter: ANGLE, ref: "Ex 1.2 Q9" }, // sector perimeter 20, circle area 25pi
  { slot: "q3", ord: 2, chapter: TRIG, ref: "Ex 2.2 Q8" }, // 5tan^2 + 3 = 9sec
  { slot: "q3", ord: 3, chapter: SETS, ref: "Misc II Q4" }, // 20 teachers, Maths or Physics
  { slot: "q3", ord: 4, chapter: TRIG, ref: "Misc II Q9" }, // sec = root2, fourth quadrant

  // Q.4 — 2 printed, any 1 x 5 marks. Deliberately different in KIND, so the
  // choice is a genuine one: three-set counting vs a circle/triangle construction.
  { slot: "q4", ord: 1, chapter: SETS, ref: "Ex 5.1 Q13" }, // college medals, inclusion-exclusion
  { slot: "q4", ord: 2, chapter: ANGLE, ref: "Misc II Q3" }, // equilateral triangle, circle on QR
];
