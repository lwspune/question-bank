/**
 * Unit Test 1 selection — MH SSC Class 10, Mathematics Part II (Geometry),
 * Chapter 2 Pythagoras Theorem only.
 *
 * Kept as DATA so the selection is reviewable and stable independently of how it
 * is rendered.
 *
 * PATTERN. Mirrors the school's own Algebra Unit Test 1 (Dr. APJ Innovation
 * School, 2026-27): 4x1 + [any 3 of 4]x2 + [any 2 of 3]x3 + [any 1 of 2]x4 = 20
 * marks in 60 minutes. That is deliberately NOT the repo's
 * `mh-ssc-10-maths-unit-25` blueprint, which is a 25-mark shape — the point is
 * that this paper feels identical to the Algebra one the same students just sat.
 *
 * KEYED BY QUESTION ID, NOT BY REF. The Class-10 board refs are not unique:
 * `Q1(A)(1)` names four different questions in this chapter alone (each from a
 * different year's paper), and `Q3(i)` and `Q2(B)(2)` are likewise reused. A
 * (chapter, ref) lookup — which the mh-sb-11 builder uses — would match several
 * rows here and either fail or silently pick one. So the id is the key, and
 * `ref`/`subtopic`/`kind` below are recorded as ASSERTIONS: the builder checks
 * the live row still matches them and refuses on drift.
 *
 * SELECTION RULES APPLIED
 *  - FIGURE-FREE by construction (user's call). Every pick has no image_url AND
 *    no "figure"/"fig." mention in stem or context — the second half matters
 *    because a stem can reference a diagram that was never attached. That rules
 *    out the whole Theorem-of-Geometric-Mean subtopic except its MCQ, since all
 *    its subjective questions are figure-based.
 *  - MIX of board PYQs and textbook questions (user's call): 6 PYQ + 7 textbook.
 *    The PYQs give board exposure in a board year; the textbook questions are
 *    ones the students have actually practised.
 *  - STANDALONE questions in Q.2-Q.4, so no shared instruction prints as orphaned
 *    context. Q.1 is the deliberate exception: the bank holds only FOUR
 *    standalone figure-free MCQs and THREE of them are near-identical "which is a
 *    Pythagorean triplet" items, so a standalone-only Q.1 would test triplet
 *    recognition three times out of four. Two Problem-set-2 siblings are used
 *    instead to reach four distinct subtopics; their shared context is pure
 *    boilerplate restating the slot heading and is dropped by the builder
 *    (`stripBoilerplateContext`), so nothing is orphaned on the page.
 *  - 5 of the chapter's 7 subtopics are represented; the two absent ones are
 *    absent for good reasons, not for want of looking:
 *      · Application of Pythagoras theorem — ALL FOUR of its questions carry a
 *        figure, so a figure-free paper cannot reach it at all.
 *      · Similarity and Right Angled Triangles — two of its three carry figures,
 *        and the one that does not (`Q5(1)`, rectangle + semicircle on AD) needs
 *        "the angle in a semicircle is a right angle", which is CHAPTER 3
 *        (Circle). Students sitting a Chapter-2 unit test have not met it. That
 *        rules it out on syllabus grounds regardless of the figure policy.
 *  - Difficulty rises across slots: EASY in Q.1-Q.2, MODERATE in Q.3, HARD in Q.4.
 *  - Q.4's two options are different IN KIND (an algebraic proof vs a geometric
 *    word problem) and comparable in length, so the internal choice is real. The
 *    school's Algebra paper failed exactly here — its option (b) was so much
 *    easier than (a) that no student would pick (a).
 */

export type UnitTestItem = {
  /** Blueprint slot key. */
  slot: "q1" | "q2" | "q3" | "q4";
  /** Position within the slot, 1-based. */
  ord: number;
  /** questions.id — the KEY. Refs are not unique in this corpus. */
  id: string;
  /** Asserted, not used for lookup: questions.question_number. */
  ref: string;
  /** Asserted: the subtopic the pick is meant to test. */
  subtopic: string;
  /** Asserted: 'pyq' (board paper) or 'practice' (Balbharati textbook). */
  kind: "pyq" | "practice";
  /** Why this question is in this slot. */
  note: string;
};

export const UNIT_TEST_TITLE =
  "Std X · Mathematics Part II (Geometry) · Unit Test 1 — Pythagoras Theorem";

/** Printed slot headings, mirroring the school's Algebra Unit Test 1. */
export const UNIT_TEST_SLOTS = [
  { key: "q1", code: "Q.1", label: "Choose the correct alternative and write its alphabet", instruction: undefined, print: 4, attempt: 4, marksEach: 1 },
  { key: "q2", code: "Q.2", label: "Solve the following subquestions", instruction: "Attempt any THREE of the following", print: 4, attempt: 3, marksEach: 2 },
  { key: "q3", code: "Q.3", label: "Solve the following subquestions", instruction: "Attempt any TWO of the following", print: 3, attempt: 2, marksEach: 3 },
  { key: "q4", code: "Q.4", label: "Solve the following subquestion", instruction: "Attempt any ONE of the following", print: 2, attempt: 1, marksEach: 4 },
] as const;

/** The five general instructions, from MATHS_INSTRUCTIONS in the written registry.
 *  The school's Algebra paper carries NONE of these; the board paper carries all. */
export const UNIT_TEST_INSTRUCTIONS = [
  "All questions are compulsory.",
  "Use of a calculator is not allowed.",
  "Figures to the right of questions indicate full marks.",
  "For every multiple-choice question, only the first attempt will be evaluated.",
  "Draw proper figures wherever necessary.",
];

const TRIPLET = "Pythagorean Triplet";
const PROP = "Property of 30-60-90 and 45-45-90 Triangles";
const GEOM = "Theorem of Geometric Mean";
const PYTH = "Pythagoras Theorem and its Converse";
const APOL = "Apollonius Theorem";

export const UNIT_TEST: UnitTestItem[] = [
  // Q.1 — 4 x 1 mark. One step each. Four different subtopics; EASY then MODERATE.
  { slot: "q1", ord: 1, id: "9e84bf7d-a18c-4b62-b2d0-e323f8dd1784", ref: "Q1(A)(1)", subtopic: TRIPLET, kind: "pyq", note: "dates as a triplet — recognition, and a real board favourite" },
  { slot: "q1", ord: 2, id: "cbc7c187-0276-4616-96de-e5d1b5206417", ref: "Q1(A)(1)", subtopic: PYTH, kind: "pyq", note: "a^2+b^2=c^2 names the triangle — the converse, stated" },
  { slot: "q1", ord: 3, id: "56214ea9-8ba7-4777-b1ad-81930b280c62", ref: "PS2 Q.1 (6)", subtopic: GEOM, kind: "practice", note: "altitude^2 = 4x9 — the only figure-free geometric-mean question" },
  { slot: "q1", ord: 4, id: "72fdd3b4-6d45-42f1-a9f2-c719430b0038", ref: "PS2 Q.1 (8)", subtopic: PROP, kind: "practice", note: "6sqrt3/12/6 — converse first, then the half-hypotenuse property" },

  // Q.2 — 4 printed, any 3 x 2 marks. Two clean steps each, four subtopics.
  { slot: "q2", ord: 1, id: "c5a19647-a4aa-46c6-8d4f-ac9fc7a0ecdc", ref: "Q2(B)(v)", subtopic: PYTH, kind: "pyq", note: "9/40/41 right angled? — verdict PLUS a stated reason" },
  { slot: "q2", ord: 2, id: "9c748974-9dce-4e6b-859b-6ed3c95d8532", ref: "Ex 2.1 Q.6", subtopic: PYTH, kind: "practice", note: "square from its diagonal — two answers (side and perimeter)" },
  { slot: "q2", ord: 3, id: "9c399e8d-e9ca-4039-8e05-cc0c54e9b7df", ref: "Q1(B)(2)", subtopic: PROP, kind: "pyq", note: "30-60-90 ratio applied directly" },
  { slot: "q2", ord: 4, id: "88856014-4290-4a96-b864-ba90633c320a", ref: "Ex 2.2 Q.1", subtopic: APOL, kind: "practice", note: "Apollonius with the median given — one substitution" },

  // Q.3 — 3 printed, any 2 x 3 marks. MODERATE; three different SKILLS even where
  // two share a subtopic (real-world modelling / median theorem / area-to-diagonal).
  { slot: "q3", ord: 1, id: "12cafba0-1b57-4dad-921b-a079e2cec51d", ref: "PS2 Q.10", subtopic: PYTH, kind: "practice", note: "East/North walkers — set up the right triangle from prose" },
  { slot: "q3", ord: 2, id: "0c4b4d7a-ae43-4be7-9a28-bb8e0057d211", ref: "Q3(i)", subtopic: APOL, kind: "pyq", note: "parallelogram diagonals — the Apollonius corollary" },
  { slot: "q3", ord: 3, id: "bc00017e-3f06-4ff3-9157-b99cecd1bdfa", ref: "PS2 Q.4", subtopic: PYTH, kind: "practice", note: "area to breadth to diagonal — two chained steps" },

  // Q.4 — 2 printed, any 1 x 4 marks. Comparable weight, different in kind.
  { slot: "q4", ord: 1, id: "2a418f9e-ed50-430e-86b4-5c1e8c1837c0", ref: "Q5(i)", subtopic: TRIPLET, kind: "pyq", note: "prove (a^2+b^2),(a^2-b^2),2ab is right angled, then generate two triplets — algebraic" },
  { slot: "q4", ord: 2, id: "e71f6aec-eabd-4542-b8d1-16db832dcd19", ref: "Ex 2.1 Q.10", subtopic: PYTH, kind: "practice", note: "ladder across a street — two Pythagoras applications, geometric" },
];
