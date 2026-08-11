/**
 * Unit Test 1 selection — MH State Board Class 9, Mathematics Part II (Geometry),
 * Chapter 1 Basic Concepts in Geometry.
 *
 * PATTERN. Mirrors the school's own Class-9 Maths I paper (Dr. APJ Innovation
 * School, 2026-27), which has the same shape as its Class-10 Algebra paper:
 * 4x1 + [any 3 of 4]x2 + [any 2 of 3]x3 + [any 1 of 2]x4 = 20 marks in 60 minutes.
 * The school titles Part I "Mathematics I", so this is "Mathematics II".
 *
 * NO PYQs EXIST FOR THIS EXAM. Class 9 is not a board year, so `mh-sb-9` is
 * practice-only — every question here is a Balbharati textbook question by
 * necessity, unlike the Class-10 Geometry paper which mixes board PYQs in.
 *
 * ── THE STRUCTURAL POINT: THIS CHAPTER IS STORED AT SUB-ITEM GRANULARITY ─────
 * 73 of the chapter's 86 rows are sub-item siblings averaging ~45 characters
 * ("Ex 1.1 Q1(i)"). Only 12 figure-free STANDALONE rows exist, and they collapse
 * to about six distinct skills — three are all "find the co-ordinates at a given
 * distance from a point", two are "which point lies between the other two". A
 * standalone-only paper would test the same handful of things repeatedly.
 *
 * So the bigger slots are filled with whole GROUPS, which is what the book does
 * and what the school's own paper does — its Q.3(1) reads "Find the values
 * (i) |-3|+3 (ii) |-3|+|3| (iii) -3+|3|". A 3-part group IS a 3-mark question.
 *
 * ── HOW THIS PRINTS (user's call: FLAT) ─────────────────────────────────────
 * The .docx renders ONE NUMBERED ITEM PER ROW, so a 3-part group prints as three
 * consecutive numbered questions sharing a "Common context" line. The `group`
 * field below drives the _Slots.md plan, which says which printed numbers to
 * merge into one question with (i)/(ii)/(iii) labels. The shared context becomes
 * that merged question's stem, so nothing is lost — it is a formatting step, not
 * a reconstruction.
 *
 * SELECTION RULES APPLIED
 *  - FIGURE-FREE (user's call). Every pick has image_url IS NULL. Note `Ex 1.1
 *    Q6` says "Sketch proper figure and write the answers" — that asks the
 *    STUDENT to draw, so nothing needs printing and it stays figure-free. Three
 *    genuinely figure-bearing groups (Ex 1.1 Q1, Ex 1.2 Q5, Ex 1.2 Q6 — 18 rows)
 *    are excluded.
 *  - ALL SIX of the chapter's subtopics are represented.
 *  - `Prob Q1(ii)` is DELIBERATELY EXCLUDED from the MCQ block even though it is
 *    the fifth available option. "How many points are there in the intersection
 *    of two distinct lines?" is keyed "one", but two distinct PARALLEL lines
 *    intersect in no point and option (D) is "not a single" — and the chapter
 *    states no axiom settling it. The blind verifier flagged the same tension
 *    unprompted. An ambiguous MCQ has no place on a test; the other four are
 *    clean and four is all the slot needs. The row itself is left untouched in
 *    the bank with the book's key intact.
 *  - Difficulty rises across slots: EASY/MODERATE in Q.1-Q.2, MODERATE in Q.3,
 *    the chapter's two PROOFS in Q.4.
 *  - Q.4's pair is the best internal choice available in this chapter: a DIRECT
 *    proof (vertically opposite angles) against an INDIRECT one (a prime > 2 is
 *    odd). Comparable weight, genuinely different in kind.
 */

export type UnitTestItem = {
  slot: "q1" | "q2" | "q3" | "q4";
  /** Which QUESTION within the slot, 1-based. Rows sharing (slot, ord) merge. */
  ord: number;
  /** Roman label within the merged question; null when the question is a single row. */
  part: string | null;
  /** questions.id — the key. Refs are not unique across this bank. */
  id: string;
  /** Asserted: questions.question_number. */
  ref: string;
  /** Asserted: the subtopic. */
  subtopic: string;
  /** Why this is here (per QUESTION; repeated on each part). */
  note: string;
};

export const UNIT_TEST_TITLE =
  "Std IX · Mathematics Part II (Geometry) · Unit Test 1 — Basic Concepts in Geometry";

export const UNIT_TEST_SLOTS = [
  { key: "q1", code: "Q.1", label: "Choose the correct alternative and write its alphabet", instruction: undefined, questions: 4, attempt: 4, marksEach: 1 },
  { key: "q2", code: "Q.2", label: "Solve the following subquestions", instruction: "Attempt any THREE of the following", questions: 4, attempt: 3, marksEach: 2 },
  { key: "q3", code: "Q.3", label: "Solve the following subquestions", instruction: "Attempt any TWO of the following", questions: 3, attempt: 2, marksEach: 3 },
  { key: "q4", code: "Q.4", label: "Solve the following subquestion", instruction: "Attempt any ONE of the following", questions: 2, attempt: 1, marksEach: 4 },
] as const;

/** From MATHS_INSTRUCTIONS in src/lib/papers/written/registry.ts. The school's
 *  Class-9 paper carries none of these. */
export const UNIT_TEST_INSTRUCTIONS = [
  "All questions are compulsory.",
  "Use of a calculator is not allowed.",
  "Figures to the right of questions indicate full marks.",
  "For every multiple-choice question, only the first attempt will be evaluated.",
  "Draw proper figures wherever necessary.",
];

/** Context strings that merely restate a slot heading and should not print.
 *  Narrow ON PURPOSE — every other context here carries real shared information
 *  (a table, a "write the converse of" instruction) and MUST survive, or the
 *  question becomes unanswerable. */
export const BOILERPLATE_CONTEXT = [
  "Select the correct alternative from the answers of the questions given below.",
];

const POINT = "Point, Line and Plane";
const COORD = "Co-ordinates of Points and Distance";
const BETWEEN = "Betweenness";
const SEG = "Line Segment, Ray and Congruence";
const COND = "Conditional Statements and Converse";
const PROOF = "Proof";

export const UNIT_TEST: UnitTestItem[] = [
  // ── Q.1 — 4 x 1 mark. Four of the five parts of Problem set 1 Q.1; (ii) is
  //    excluded as ambiguous (see the header). Four different subtopics.
  { slot: "q1", ord: 1, part: null, id: "b6277129-0011-41c3-9767-25617e43d127", ref: "Prob Q1(i)", subtopic: SEG, note: "how many midpoints a segment has" },
  { slot: "q1", ord: 2, part: null, id: "6b2048ea-bed4-42a2-9739-4f5f4a5002bc", ref: "Prob Q1(iii)", subtopic: POINT, note: "lines through three points — the option is 'one or three', so the collinear case is the point" },
  { slot: "q1", ord: 3, part: null, id: "0ed547af-7cbd-4855-8d3a-6f35283098bc", ref: "Prob Q1(iv)", subtopic: COORD, note: "d(A,B) from co-ordinates -2 and 5" },
  { slot: "q1", ord: 4, part: null, id: "f9d1d200-459c-44f7-a874-d61338fbadac", ref: "Prob Q1(v)", subtopic: BETWEEN, note: "P-Q-R betweenness, one subtraction" },

  // ── Q.2 — 4 questions, any 3 x 2 marks. Three standalone + one 2-part group.
  { slot: "q2", ord: 1, part: null, id: "e27a1ba5-c408-4dbf-af73-fd8e0782820a", ref: "Ex 1.1 Q4", subtopic: BETWEEN, note: "d(A,B) considering ALL possibilities — the two-case answer" },
  { slot: "q2", ord: 2, part: null, id: "d35b5459-21ab-452e-855c-11286d54d5d3", ref: "Prob Q4", subtopic: COORD, note: "points 8 units from co-ordinate -7 — two answers" },
  { slot: "q2", ord: 3, part: null, id: "e966e8a5-4bb5-4aef-bca6-4df84ae24ac1", ref: "Ex 1.2 Q4", subtopic: SEG, note: "compare three segments from given lengths" },
  { slot: "q2", ord: 4, part: "i", id: "e2c0e29f-a211-42a8-902c-8b2d540752b2", ref: "Prob Q9(i)", subtopic: COND, note: "antecedent and consequent of a conditional statement" },
  { slot: "q2", ord: 4, part: "ii", id: "72fa20d7-339d-4b44-bd4e-aab77fb81c75", ref: "Prob Q9(ii)", subtopic: COND, note: "antecedent and consequent of a conditional statement" },

  // ── Q.3 — 3 questions, any 2 x 3 marks. Each is a 3-part group.
  { slot: "q3", ord: 1, part: "i", id: "8aa3b2d7-5d17-4957-85b4-56b06dc9f8f7", ref: "Ex 1.1 Q6(i)", subtopic: BETWEEN, note: "sketch the figure, then compute the third length" },
  { slot: "q3", ord: 1, part: "ii", id: "fc536a70-a1d2-4985-9286-bdf4cd5338c3", ref: "Ex 1.1 Q6(ii)", subtopic: BETWEEN, note: "sketch the figure, then compute the third length" },
  { slot: "q3", ord: 1, part: "iii", id: "d9371c00-e46e-4795-a92b-e955a55cbd60", ref: "Ex 1.1 Q6(iii)", subtopic: BETWEEN, note: "sketch the figure, then compute the third length (surds)" },

  { slot: "q3", ord: 2, part: "i", id: "de852113-e546-488a-961b-de201973af93", ref: "Ex 1.2 Q1(i)", subtopic: SEG, note: "congruence of segments read off a co-ordinate TABLE" },
  { slot: "q3", ord: 2, part: "ii", id: "644d5b3a-075a-459f-8d31-4855f1b93566", ref: "Ex 1.2 Q1(ii)", subtopic: SEG, note: "congruence of segments read off a co-ordinate TABLE" },
  { slot: "q3", ord: 2, part: "iii", id: "da6b714e-fd4e-463d-89d0-33a8aa7a0372", ref: "Ex 1.2 Q1(iii)", subtopic: SEG, note: "congruence of segments read off a co-ordinate TABLE" },

  { slot: "q3", ord: 3, part: "i", id: "9fbee466-485f-4472-a823-ce4ac0d2cb4b", ref: "Ex 1.3 Q2(i)", subtopic: COND, note: "write the converse of a statement" },
  { slot: "q3", ord: 3, part: "ii", id: "65664d2f-995d-46ae-96d4-3f5d19b7866f", ref: "Ex 1.3 Q2(ii)", subtopic: COND, note: "write the converse of a statement" },
  { slot: "q3", ord: 3, part: "iii", id: "d5dc8a5a-6907-44bf-8d90-964155a277ce", ref: "Ex 1.3 Q2(iii)", subtopic: COND, note: "write the converse of a statement" },

  // ── Q.4 — 2 questions, any 1 x 4 marks. Direct proof vs indirect proof.
  { slot: "q4", ord: 1, part: null, id: "72cb4031-1733-4eff-91f3-db07d932d6fd", ref: "1.3 SolvedEx.1", subtopic: PROOF, note: "vertically opposite angles are equal — a DIRECT proof with Given/To prove" },
  { slot: "q4", ord: 2, part: null, id: "67ff1476-233c-4a87-bd9b-e6691874c16e", ref: "1.3 SolvedEx.2", subtopic: PROOF, note: "a prime greater than 2 is odd — conditional form plus an INDIRECT proof" },
];
