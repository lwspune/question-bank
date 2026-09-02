/**
 * Build an NDA Maths mock paper straight from NDA_MATHS_BLUEPRINT.md.
 *
 *   npx tsx scripts/mocks/build-blueprint-mock.ts "<paper title>"          # dry run
 *   npx tsx scripts/mocks/build-blueprint-mock.ts "<paper title>" --apply
 *
 * WHY THIS EXISTS RATHER THAN A HAND-PICKED PAPER. Mock 1 was assembled by hand
 * against the blueprint's 99 allocation rows. That does not survive repetition:
 * every rebuild re-reads 99 cells, and any slip is invisible in the finished
 * paper. Here the markdown IS the spec (see ./blueprintSpec.ts) and the parse is
 * asserted against the totals the document states about itself, so a paper that
 * builds is a paper that matches the blueprint.
 *
 * SELECTION IS DETERMINISTIC — stable id order, no randomness — so the dry run
 * prints exactly what --apply would write.
 *
 * FOUR EXCLUSIONS, each a silent-failure guard:
 *   1. Anything already in ANY paper in this org. A student may have seen it.
 *   2. Structural defects: not exactly one correct option, or duplicate option
 *      text. §5c of the blueprint.
 *   3. RULE 1 — anything carrying a `set_id` OR a `context`. The blueprint makes
 *      a shared context all-or-nothing, and a single-slot cell can never take a
 *      whole set, so a blueprint mock simply never picks a set member. This is
 *      stronger than the blueprint's own pre-print check, which groups on
 *      `set_id` alone: the LWS mock-paper sources contain rows that share a
 *      context with `set_id = NULL` (2 measured), which that check cannot see.
 *   4. Rows whose text carries a pandoc "simple table" — dashes with no pipe
 *      separator. Those render as a run of dashes in the Word export, and this
 *      is an OFFLINE paper, so the print surface is the one that matters.
 *
 * SOURCE PRIORITY (blueprint RULE 2, refined 2026-08-27). Within NDA Maths
 * practice the pool is not homogeneous:
 *   - the practice BOOKLET (`NDA_Maths_Practice__*`) is a question bank, and is
 *     the default;
 *   - the LWS MOCK PAPERS (`NDA_Maths_Mock_Test_*`, `NDA_Maths_Weekly_Mock_*`)
 *     are whole 120-question papers ingested as practice. They are used only
 *     where the booklet cannot fill a cell, so a mock is never a reprint of
 *     chunks of an existing paper.
 * Both are reported per question, and the summary states the split as BUILT.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createPaper, addQuestion } from "../../src/lib/papers/admin";
import {
  parseBlueprint,
  assertBlueprint,
  type AllocRow,
  type Difficulty,
} from "./blueprintSpec";
import { ORG_ID, EXAM_ID, CREATED_BY, SUBJECT_NAME } from "../practice/config";

require("dotenv").config({
  path: join(process.cwd(), ".env.local"),
  override: true,
});

/**
 * DECLARED CROSS-SOURCE FILLS (blueprint RULE 2 + §5b).
 *
 * Six blueprint cells have no eligible NDA-practice question at the required
 * difficulty. Every one is a cell the blueprint itself marks thin or empty, so
 * these are structural gaps rather than a depleted pool. Each fill is named by
 * id with the reason, exactly like `exclude` in scripts/bank-paper/build.ts:
 * a cross-source question in a printed mock should be visible in the spec, not
 * inferred from a count.
 *
 * Levels were judged by READING each one, per RULE 2a - a Worksheets label does
 * not carry across the bank boundary unexamined.
 */
type Fill = {
  chapter: string;
  subtopic: string;
  difficulty: Difficulty;
  ids: string[];
  source: string;
  why: string;
};

const FILL_SETS: Record<string, Fill[]> = {
  "NDA Mathematics — Blueprint Mock 2 (120 Q)": [
    {
      chapter: "Probability",
      subtopic: "Bounds on Probability",
      difficulty: "HARD",
      ids: ["b1969784-20e0-4652-9d57-ce2e85849e8d"],
      source: "Worksheets",
      why: 'No NDA-practice HARD exists in this subtopic. "What is the maximum value of P(A and B) given P(A)=3/4, P(B)=5/8" IS the bounds concept the cell asks for.',
    },
    {
      chapter: "Statistics",
      subtopic: "Regression and Correlation",
      difficulty: "HARD",
      ids: ["02cd6233-5b23-4d1f-bc81-2f1119de8666"],
      source: "Worksheets",
      why: "Blueprint §5b: practice has 2 rows here, both MODERATE. Worksheets 'Correlation and Regression' matches exactly - r from the two regression coefficients.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Distance, Section, and Collinearity in 3D",
      difficulty: "HARD",
      ids: ["00149470-ea98-4f37-8301-723ccc4442dc"],
      source: "Worksheets",
      why: "Blueprint §5b: practice has 2 rows here, both MODERATE. This is the SECTION formula (ratio in which a point divides a segment), the cell's own topic.",
    },
    {
      chapter: "Properties of Triangle",
      subtopic: "Sine and Cosine Rules — Solving Triangles",
      difficulty: "HARD",
      ids: [
        "4380bea2-7dd7-4934-b287-7e3d5329fd23",
        "9ae756e2-77e8-49f0-aff5-8ed2c9eabb17",
      ],
      source: "Worksheets",
      why: "The only unused NDA-practice HARD rows in this chapter are three members of a FOUR-question set, and a 3-slot chapter cannot absorb a 4-set (RULE 1), so the set is skipped. One Cosine-Rule and one Sine-Rule question, both genuinely hard.",
    },
    {
      chapter: "Binomial Theorem",
      subtopic: "Integer and Fractional Parts of Binomial Expressions",
      difficulty: "HARD",
      ids: [
        "796af396-8f3c-4be4-8437-1fecbacdb0f6",
        "0e393555-dcd7-4d07-9209-69fed4051651",
      ],
      source: "NDA PYQ (2024 Sep) — a 2-question SET, taken whole",
      why: "Blueprint §5b sanctions a PYQ substitution for this cell, and the subtopic is a live pattern (0 questions before 2022, 8 since) with no practice supply. The two rows share a context so RULE 1 makes them atomic; taking both fills this HARD slot and BORROWS the chapter's MODERATE slot, which keeps Binomial Theorem at exactly 3 = E1/M1/H1.",
    },
  ],

  // ── Mock 3 ────────────────────────────────────────────────────────────────
  // Eight cells short, all HARD but one. Five are the same structural gaps as
  // Mock 2 (the blueprint's own ⚠ cells); TWO are new because Mock 2 consumed
  // the last NDA-practice candidate — Height & Distance HARD and one of the two
  // Binary Numbers MODERATE rows. Every fill was chosen by READING it, per
  // RULE 2a.
  "NDA Mathematics — Blueprint Mock 3 (120 Q)": [
    {
      chapter: "Probability",
      subtopic: "Bounds on Probability",
      difficulty: "HARD",
      ids: ["f8d91813-ddec-46bd-9493-9251750ba554"],
      source: "Worksheets",
      why: "Still no NDA-practice HARD in this subtopic. \"What is the minimum value of P(A or B) given P(A)=3/4, P(B)=5/8\" IS the bounds concept — the complement of the max-intersection question Mock 2 used, so the two papers test the same idea from opposite ends without repeating.",
    },
    {
      chapter: "Statistics",
      subtopic: "Regression and Correlation",
      difficulty: "HARD",
      ids: ["be1e340a-e384-4de0-86ce-2230bef0ce4b"],
      source: "Worksheets",
      why: "Practice still has only 2 rows here, both MODERATE. Recovers r from a regression coefficient and the two standard deviations — the cell's own topic.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Distance, Section, and Collinearity in 3D",
      difficulty: "HARD",
      ids: ["404b2535-0772-49bc-8837-c4217e32a923"],
      source: "Worksheets",
      why: "Practice HARD is still empty here. Triangle area from three vertices via the distance formula — distance-based, matching the cell.",
    },
    {
      chapter: "Properties of Triangle",
      subtopic: "Sine and Cosine Rules — Solving Triangles",
      difficulty: "HARD",
      ids: [
        "3c284319-61b9-4909-837e-663616c50bd7",
        "d09d60af-f80c-44aa-b925-335b92e753e4",
      ],
      source: "Worksheets",
      why: "The chapter's only NDA-practice HARD rows remain locked inside a 4-question set that a 3-slot chapter cannot absorb (RULE 1). One Cosine-Rule question ((a+b+c)(a+b-c)=ab, find angle C) and one Sine-Rule question (angles in AP with a/b = 1/sqrt3), both genuinely hard.",
    },
    {
      chapter: "Height & Distance",
      subtopic: "Heights and Distances from Angles of Elevation",
      difficulty: "HARD",
      ids: ["10c62ee4-bb96-46dd-956f-253e3390a2ec"],
      source: "Worksheets",
      why: "NEW gap: the single NDA-practice HARD in this chapter went into Mock 2, and the chapter has no other. Elevation of a tower top observed from three ground points — pure angle-of-elevation, matching the cell exactly. NOTE the chapter is spelled 'Height and Distance' in Worksheets against NDA's 'Height & Distance', which is why a name-equality search finds nothing here.",
    },
    {
      chapter: "Binary Numbers",
      subtopic: "Binary Arithmetic — Addition, Division, and Algebraic Identities",
      difficulty: "MODERATE",
      ids: ["465d3fd1-3072-4315-ac01-362253e2d5b6"],
      source: "Worksheets",
      why: "NEW gap: NDA practice held exactly 2 Binary MODERATE rows and Mock 2 took one; the other is now used too. This is binary DIVISION, named explicitly in the cell's own subtopic.",
    },
    {
      chapter: "Binomial Theorem",
      subtopic: "Integer and Fractional Parts of Binomial Expressions",
      difficulty: "HARD",
      ids: ["7ae5e015-0c3f-4a9b-b03f-f8a02ac3dbb2"],
      source: "JEE Mains 2023 (labelled MODERATE there — see the note)",
      why:
        "NDA practice is exhausted for this cell (one MODERATE row, used; the 2-question PYQ set went into Mock 2) and Worksheets has nothing matching. CBSE cannot help either — Binomial Theorem is a Class 11 topic, CBSE Class 12 does not carry it, and CBSE Class 11 has ZERO MCQs. " +
        "'Fractional part of 4^2022/15' IS this subtopic's technique: 4^2022 = 16^1011 = (1+15)^1011, whose binomial expansion leaves only the k=0 term mod 15, so the fractional part is 1/15 (verified in exact integer arithmetic). " +
        "Clean on the syllabus-fit screen (no question_audience_exclusions row). " +
        "IT IS LABELLED MODERATE IN JEE, so the paper's recorded split is E30/M59/H31 rather than E30/M58/H32 — reported as BUILT, not as designed. RULE 2a says a JEE MODERATE sits nearer an NDA HARD, so the paper is not actually easier; only the label comes from another bank's scale. " +
        "The alternative was a within-chapter swap to a greatest-coefficient question, which would have held the label at H32 but dropped a subtopic the blueprint flags as a newly live NDA pattern (0 questions before 2022, 8 since).",
    },
  ],

  // ── Mock 4 ────────────────────────────────────────────────────────────────
  // Nine cells short, ten questions. THE SOURCE MIX CHANGES HERE, and the reason
  // is a measurement rather than a preference: for seven of the nine cells an
  // unused NDA PYQ exists at the EXACT subtopic AND the EXACT difficulty. Mocks
  // 2 and 3 filled those same cells from Worksheets — not because a PYQ was
  // absent, but because the builder's pool is `question_kind = 'practice'` and
  // nothing ever looked at the PYQ side. An NDA PYQ is the better fill twice
  // over: it is the same bank, so RULE 2a's difficulty translation does not
  // apply at all, and it is a real question from the exam being mocked.
  //
  // Only two cells still need a cross-bank fill, and both are genuinely empty on
  // the NDA side rather than merely depleted.
  // ── Mock 5 ────────────────────────────────────────────────────────────────
  // Eleven cells short, twelve questions — the deepest shortfall yet, and every
  // cell is one an earlier mock already drained. EIGHT come from NDA PYQs at the
  // exact subtopic and difficulty (the Mock 4 finding, applied from the start).
  //
  // THE OTHER THREE CELLS WERE SEARCHED ACROSS EVERY BANK, and the measurement is
  // worth keeping because it settles which board corpora can feed a printed mock
  // at all. Free 4-option Maths MCQs, and how many carry NO worked solution:
  //
  //     CBSE Class 12              756 MCQs    0% unsolved
  //     MH HSC Class 12            268 MCQs    0% unsolved
  //     MH State Board Class 11    203 MCQs   65% unsolved
  //     MH State Board Class 9      83 MCQs   71% unsolved
  //     CBSE Class 11                0 MCQs   (that book contains none)
  //
  // MH Class 11 really does carry ~10 MCQs per chapter, but two thirds have no
  // solution — including ALL THREE of its free HARD rows — and a printed mock
  // needs an answer key with working, so those are unusable as they stand. Its
  // two Trigonometry-II HARD rows are compound- and multiple-angle questions
  // besides, not the sine/cosine rule this paper is short of. CBSE 12 and MH HSC
  // 12 are fully solved and genuinely usable, but neither book teaches Binomial
  // Theorem, Binary Numbers or Properties of Triangle, which are exactly the
  // three cells still open. Hence Worksheets and JEE below.
  "NDA Mathematics — Blueprint Mock 5 (120 Q)": [
    {
      chapter: "Probability",
      subtopic: "Bounds on Probability",
      difficulty: "HARD",
      ids: ["0e9bc8db-5744-45aa-a450-a0cc6cb9c5b7"],
      source: "NDA PYQ (2018 I, Q118)",
      why:
        "The LAST unused NDA PYQ at HARD in this subtopic — practice has had none for four papers running. Three probability laws to judge: P(A-B) = P(A)-P(B) when B is contained in A (true), P(exactly one of A, B) = P(A)+P(B)-P(A n B) (FALSE, it needs 2P(A n B)), and additivity for mutually exclusive events (true). A different attack again from Mocks 2-4, which used max-bound, min-bound and inclusion-exclusion.",
    },
    {
      chapter: "Statistics",
      subtopic: "Regression and Correlation",
      difficulty: "HARD",
      ids: ["aec23a99-c901-4c50-a672-211c0d8da55d"],
      source: "NDA PYQ (2024 Sep, Q101)",
      why:
        "Practice still holds only 2 rows here, both MODERATE. This asks which of two given lines is the regression of y on x and which is x on y — a different skill from computing r, which Mocks 2 and 3 used, and from the acute angle, which Mock 4 used. The discriminator is that b_yx * b_xy = r^2 must not exceed 1: the naive pairing gives 7/6 and is impossible, the valid pairing gives 6/7, so b_xy + 7*b_yx = 3 + 2 = 5.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Sphere",
      difficulty: "MODERATE",
      ids: ["e2894b68-d7be-4e60-9f10-fd099f3ea067"],
      source: "NDA PYQ (2021 II, Q64)",
      why:
        "Practice is exhausted for Sphere MODERATE. How many spheres of radius r touch all three coordinate axes: the centre (a,b,c) must satisfy b^2+c^2 = a^2+c^2 = a^2+b^2 = r^2, forcing a^2 = b^2 = c^2 = r^2/2 and leaving the eight sign choices. Distinct from Mock 4's sphere-touching-a-plane.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Distance, Section, and Collinearity in 3D",
      difficulty: "HARD",
      ids: ["6df1a6a5-27a6-416e-83b8-b09b15d8b148"],
      source: "NDA PYQ (2025 Apr, Q62)",
      why:
        "Practice has 2 rows here and both are MODERATE — the same structural gap since Mock 2. Area of a rectangle from three vertices: AB = (1,3,-1) and BC = (2,-1,-1) have zero dot product, so they are adjacent sides and the area is sqrt(11)*sqrt(6) = sqrt(66). Purely distance-based, which is the subtopic's own topic, and distinct from Mock 4's collinearity count.",
    },
    {
      chapter: "Differentiation",
      subtopic:
        "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
      difficulty: "EASY",
      ids: ["6f6a1ee1-869e-4c41-b606-783a12efff57"],
      source: "NDA PYQ (2021 I, Q84)",
      why:
        "The LAST unused NDA PYQ at EASY in this subtopic. The practice pool holds 24 free rows here but not one labelled EASY, the same gap Mock 4 met. f(x) = e^|x| has left derivative -1 and right derivative +1 at 0, so f'(0) does not exist — exactly the cell's concept at its level.",
    },
    {
      chapter: "Applications of Integration",
      subtopic: "Area Bounded by a Curve, Lines, and Axes",
      difficulty: "EASY",
      ids: ["ac86c5c3-edae-4635-b108-df74b538fa3a"],
      source: "NDA PYQ (2017 II, Q77)",
      why:
        "NEW gap: the practice supply for this cell is used up across Mocks 1-4. The area enclosed by |x| + |y| = 1 is a square with diagonals of length 2 along the axes, so the area is 2. Chosen over the other four free PYQs here because the plain rectangle ones are trivial and this needs the student to recognise the locus first.",
    },
    {
      chapter: "Properties of Triangle",
      subtopic: "Sine and Cosine Rules — Solving Triangles",
      difficulty: "HARD",
      ids: [
        "2a48dd75-4322-4b5a-8f28-6390ceebc5ed",
        "9e5a7dc6-81ed-4844-99b4-7ad3a1e669c5",
      ],
      source: "Worksheets (its own 'Sine Rule' and 'Cosine Rule' subtopics)",
      why:
        "NOW EMPTY ON BOTH NDA AXES: Mock 2 took the last practice HARD rows and Mock 4 took the last two PYQs at HARD in this subtopic. Seven NDA PYQ HARD rows remain in the CHAPTER but all sit in Triangle Identities or In-circle Geometry, so using them would bend the subtopic rather than the source. Worksheets names the same two techniques as its own subtopics, and these are the computational ones rather than the definitional 'is this formula always true' rows that fill its Projection Rule subtopic. One of each: a = 4, Area = 4*sqrt(3), A = 60 deg gives sin B sin C = 3/4 (via bc = 16 and bc = 4R^2 sinB sinC); and A + B = 120 deg with a : c = 1 : sqrt(3) gives sin A = 1/2 hence A = 30 deg, the 150 deg root being excluded by the angle sum. Both verified by hand before selection.",
    },
    {
      chapter: "Height & Distance",
      subtopic: "Heights and Distances from Angles of Elevation",
      difficulty: "HARD",
      ids: ["a0d97a18-3dc5-4146-bb05-3836d6c47bed"],
      source: "NDA PYQ (2017 II, Q36)",
      why:
        "Practice HARD has been empty here since Mock 3. A tower seen from the top and the foot of a pole at 30 and 45 degrees, with three printed relations between the two heights to judge — a multi-statement question, which is a shape this paper is otherwise thin on. Chosen over the spherical-balloon PYQ because that one's stored solution is 108 characters and would have needed rewriting under RULE 5 anyway.",
    },
    {
      chapter: "Logarithms",
      subtopic: "Logarithm Identities, Change of Base, and Sums",
      difficulty: "MODERATE",
      ids: ["f67b35c5-eddb-4952-8a98-8f137a8a3e32"],
      source: "NDA PYQ (2018 I, Q2)",
      why:
        "NEW gap, and NO OTHER BANK CAN HELP: Logarithms is an NDA-only chapter — neither CBSE nor either State Board carries one, so the 14 free NDA rows in the chapter are the entire supply that exists. This is the change-of-base sum the subtopic is named for: 1/log_k(n) = log_n(k), so the sum telescopes to log_n(2*3*...*2017) = log_n(2017!) = log_n(n) = 1.",
    },
    {
      chapter: "Binary Numbers",
      subtopic: "Binary Arithmetic — Addition, Division, and Algebraic Identities",
      difficulty: "MODERATE",
      ids: ["5acebec6-b214-460b-8fc6-163d2b33927f"],
      source: "Worksheets",
      why:
        "Still genuinely empty on the NDA side — ZERO NDA PYQs in this subtopic at any difficulty, and no free practice row at MODERATE. Like Logarithms this is an NDA-only chapter, so no board bank can help either. Worksheets has a matching 'Binary Arithmetic' subtopic; this is MULTIPLICATION (1101 x 11 = 13 x 3 = 39 = 100111 in binary), where Mock 3 used addition-style and Mock 4 used division.",
    },
    {
      chapter: "Binomial Theorem",
      subtopic: "Integer and Fractional Parts of Binomial Expressions",
      difficulty: "HARD",
      ids: ["3bd0768f-7b46-417d-9151-a68655f494da"],
      source: "JEE Mains 2026 (labelled MODERATE there — see the note)",
      why:
        "Empty on the NDA side for the third paper running. The one remaining NDA row in this subtopic is MODERATE and is also defective — 'k < (sqrt2+1)^3 < k+2 for natural k' has value 5*sqrt2 + 7 = 14.07, which BOTH k = 13 and k = 14 satisfy, so it is not used. MH State Board Class 11 has a free HARD Binomial MCQ but it is a general-term question, not integral parts, and carries no solution. " +
        "The JEE row is the conjugate-surd argument that IS this subtopic's technique: (7+4*sqrt3)(7-4*sqrt3) = 1, so (7-4*sqrt3)^25 lies in (0,1) and the integral part of (7+4*sqrt3)^25 is one less than an even integer, hence odd. Its companion statement (25^13 + 20^13 + 8^13 + 3^13 divisible by 7) is true too, checked mod 7 as 4+6+1+3 = 14. " +
        "LABELLED MODERATE IN JEE, so the recorded split is E30/M59/H31 rather than E30/M58/H32 — reported as BUILT, not as designed, exactly as in Mocks 3 and 4. RULE 2a says a JEE MODERATE sits nearer an NDA HARD.",
    },
  ],

  "NDA Mathematics — Blueprint Mock 4 (120 Q)": [
    {
      chapter: "Probability",
      subtopic: "Bounds on Probability",
      difficulty: "HARD",
      ids: ["499c5d5e-492f-4f81-9888-eacec21bc2c0"],
      source: "NDA PYQ (2019 I, Q106)",
      why:
        "NDA practice still has no HARD row in this subtopic, but an unused NDA PYQ sits in it at HARD. 'Probability that at least two of A, B, C occur together' resolves to sum of the pairwise intersections minus 2P(A n B n C) — the inclusion-exclusion bound the cell is about, and a different attack from the max/min bound questions Mocks 2 and 3 used, so the three papers do not repeat the idea.",
    },
    {
      chapter: "Statistics",
      subtopic: "Regression and Correlation",
      difficulty: "HARD",
      ids: ["4557ccee-8cb8-44b9-b085-e6923a9b15b7"],
      source: "NDA PYQ (2024 Apr, Q104)",
      why:
        "Practice still holds only 2 rows here, both MODERATE — but five unused NDA PYQs sit at HARD. The ACUTE ANGLE between two regression lines, which is a different quantity from the correlation coefficient Mocks 2 and 3 each recovered, so the cell is not asked the same way a third time.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Sphere",
      difficulty: "MODERATE",
      ids: ["14d831de-041b-404b-b316-21002752e5ce"],
      source: "NDA PYQ (2020 I, Q61)",
      why:
        "NEW gap: the practice supply for Sphere MODERATE is used up across Mocks 1-3. Diameter of the sphere centred (1,-2,3) touching 6x-3y+2z-4=0 — the perpendicular distance is 14/7 = 2, so the diameter is 4. Squarely the cell's topic and squarely MODERATE.",
    },
    {
      chapter: "3D Geometry",
      subtopic: "Distance, Section, and Collinearity in 3D",
      difficulty: "HARD",
      ids: ["c1bcdbfe-a28b-4c8a-8108-24f1d2cb9ae8"],
      source: "NDA PYQ (2021 I, Q69)",
      why:
        "Practice has 2 rows here and both are MODERATE, the same structural gap Mocks 2 and 3 hit — but five unused NDA PYQs sit at HARD. 'How many values of k make (k,1,3), (1,-2,k+1) and (15,2,-4) collinear' is literally the COLLINEARITY the subtopic names, and it is hard because it needs a consistent solution of the ratio equations rather than a formula.",
    },
    {
      chapter: "Differentiation",
      subtopic:
        "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
      difficulty: "EASY",
      ids: ["f10d98eb-e52c-47a0-87e4-78b61ca192e0"],
      source: "NDA PYQ (2026 I, Q74)",
      why:
        "NEW gap: this is the paper's only unfilled EASY cell — the practice pool holds 24 free rows in the subtopic but none labelled EASY. 'Derivative of x/|x| for x < 0' is exactly the cell's concept at exactly its level: for x < 0 the function is the constant -1, so the derivative is 0.",
    },
    {
      chapter: "Properties of Triangle",
      subtopic: "Sine and Cosine Rules — Solving Triangles",
      difficulty: "HARD",
      ids: [
        "c7a17945-6454-4838-8685-e4020416aa31",
        "b9667d22-b6da-4750-a156-60efe1bf34e1",
      ],
      source: "NDA PYQ (2024 Sep Q25 and 2022 II Q50)",
      why:
        "Practice has exactly ONE unused HARD row in this chapter and the cell needs two, the same shortfall Mock 2 met — but these are the two unused NDA PYQs at HARD in this subtopic, and it needs both. 2a - b in a 75/45/60 triangle, and cos 3C for the 4-3-2 triangle (cos C = 7/8, so cos 3C = 7/128). " +
        "NOTE the first one was REPAIRED to get here: its stored stem said 'sqrt(2)a - b', which matches no option, against a printed '2a - b' that gives exactly the stored key. Source-verified against the scanned paper and fixed by scripts/reviews/apply-mock4-fixes.ts BEFORE this build — reading a fill per RULE 2a is what exposed it.",
    },
    {
      chapter: "Height & Distance",
      subtopic: "Heights and Distances from Angles of Elevation",
      difficulty: "HARD",
      ids: ["7e488e4a-e36c-443e-b523-25bfea2df3df"],
      source: "NDA PYQ (2019 I, Q100)",
      why:
        "Mock 3 took the last NDA-practice HARD in this chapter, but seven unused NDA PYQs sit at HARD. Tower of height h seen from A due South at elevation x and from B due East of A at elevation y, with AB = z: the foot, A and B form a right angle, so (h cot y)^2 = (h cot x)^2 + z^2. Genuinely hard and pleasingly free of a figure, which matters for a printed paper.",
    },
    {
      chapter: "Binary Numbers",
      subtopic: "Binary Arithmetic — Addition, Division, and Algebraic Identities",
      difficulty: "MODERATE",
      ids: ["c46ca38e-7b95-490f-8ecf-aeaaf068aa14"],
      source: "Worksheets",
      why:
        "Genuinely empty on the NDA side, not merely depleted: this subtopic has ZERO NDA PYQs at any difficulty and no unused practice row at MODERATE. Worksheets has a 'Binary Arithmetic' subtopic that matches concept-for-concept. (11000)_2 / (11)_2 = 24/3 = 8 = (1000)_2 — binary DIVISION, which the NDA cell's own subtopic name calls out.",
    },
    {
      chapter: "Binomial Theorem",
      subtopic: "Integer and Fractional Parts of Binomial Expressions",
      difficulty: "HARD",
      ids: ["af0f901a-4824-4453-9602-4214f329a2fa"],
      source: "JEE Mains 2023 (labelled MODERATE there — see the note)",
      why:
        "Still empty on the NDA side: zero unused NDA PYQs at HARD in this subtopic, and the practice supply went into Mocks 2 and 3. JEE carries a subtopic named 'Integral and Fractional Parts' — the same idea under the other bank's wording. " +
        "x = (8*sqrt(3)+13)^13 and y = (7*sqrt(2)+9)^9, asking about [x] and [y]: the conjugate-surd argument that IS this subtopic's technique. " +
        "Clean on the syllabus-fit screen (no question_audience_exclusions row). " +
        "LABELLED MODERATE IN JEE, so the recorded split is E30/M59/H31 rather than E30/M58/H32 — reported as BUILT, not as designed, exactly as in Mock 3. RULE 2a says a JEE MODERATE sits nearer an NDA HARD, so the paper is not easier than the target; only the label comes from another bank's scale. " +
        "The MH State Board Class 11 rows that also match this concept were REJECTED: they are subjective (zero options), which no MCQ paper can take.",
    },
  ],
};

/**
 * Blueprint cells deliberately NOT filled, because a FILL set borrowed the slot.
 * RULE 1 allows a set to borrow from another subtopic in the same chapter; this
 * records which subtopic gave the slot up so the chapter still totals correctly.
 */
type Lent = {
  chapter: string;
  subtopic: string;
  difficulty: Difficulty;
  to: string;
};
const SLOT_LENT_SETS: Record<string, Lent[]> = {
  "NDA Mathematics — Blueprint Mock 2 (120 Q)": [
    {
      chapter: "Binomial Theorem",
      subtopic: "Coefficients and Specific Terms in Expansion",
      difficulty: "MODERATE",
      to: "Integer and Fractional Parts of Binomial Expressions (2-question PYQ set)",
    },
  ],
};

const APPLY = process.argv.includes("--apply");
const TITLE = process.argv[2];

type Row = {
  id: string;
  difficulty: Difficulty;
  chapter: string;
  subtopic: string | null;
  source_file: string | null;
  set_id: string | null;
  context: string | null;
  text: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

/**
 * `difficulty` on AllocRow is the CELL's requirement; `actual` is what the
 * chosen question actually is. They agree for ordinary selection (the candidate
 * filter demands it) and can DIFFER for a declared fill - the Binomial Theorem
 * PYQ set supplies a HARD and a MODERATE against a single HARD cell. Reporting
 * and RULE 3 ordering must use `actual`, or the paper's stated difficulty
 * profile describes the blueprint rather than the paper.
 */
type Pick = AllocRow & {
  id: string;
  actual: Difficulty;
  family: Family;
  text: string;
  fill?: Fill;
};
type Family = "booklet" | "mock paper" | "declared fill";

/**
 * The `NDA_Maths_Practice__` prefix is NOT a reliable marker of the practice
 * booklet: three whole papers were ingested under it (`Vectors_Test_B`,
 * `APJ_Maths_Mock_5`, `Matrices_Test_6M_QP`). Classifying on the prefix alone
 * reported 3 APJ-mock questions as booklet in the first Mock 2 build. The
 * booklet's own files are named for a TOPIC, so a name carrying Mock/Test/Paper
 * is a paper whatever prefix it wears.
 */
const MOCK_SHAPED = /(mock|test|paper)/i;
const familyOf = (src: string | null): Family =>
  (src ?? "").startsWith("NDA_Maths_Practice__") && !MOCK_SHAPED.test(src ?? "")
    ? "booklet"
    : "mock paper";

/** Pandoc "simple table": a run of 4+ dashes with no GFM `|---|` anywhere. */
const dashedTable = (s: string) => /-{4,}/.test(s) && !/\|\s*-{3,}/.test(s);

function structurallyClean(r: Row): boolean {
  const correct = r.options.filter((o) => o.is_correct).length;
  const distinct = new Set(r.options.map((o) => o.text.trim())).size;
  return (
    correct === 1 && distinct === r.options.length && r.options.length === 4
  );
}

async function fetchPool(client: SupabaseClient): Promise<Row[]> {
  const out: Row[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, difficulty, source_file, set_id, context, text, " +
          "chapters!inner(name, subjects!inner(name, exams!inner(name))), " +
          "subtopics(name), options(label, text, is_correct)",
      )
      .eq("question_kind", "practice")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .eq("exam_id", EXAM_ID)
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchPool: ${error.message}`);
    for (const q of (data ?? []) as any[]) {
      if (q.chapters?.subjects?.name !== SUBJECT_NAME) continue;
      out.push({
        id: q.id,
        difficulty: q.difficulty,
        chapter: q.chapters.name,
        subtopic: q.subtopics?.name ?? null,
        source_file: q.source_file,
        set_id: q.set_id,
        context: q.context,
        text: q.text ?? "",
        options: q.options ?? [],
      });
    }
    if (!data || data.length < PAGE) break;
  }
  return out;
}

/** Fetch declared fill rows by id, ignoring exam/kind - they are named, not selected. */
async function fetchByIds(
  client: SupabaseClient,
  ids: string[],
): Promise<Map<string, Row>> {
  const out = new Map<string, Row>();
  if (!ids.length) return out;
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, difficulty, source_file, set_id, context, text, " +
          "chapters(name), subtopics(name), options(label, text, is_correct)",
      )
      .in("id", ids.slice(i, i + 100));
    if (error) throw new Error("fetchByIds: " + error.message);
    for (const q of (data ?? []) as any[]) {
      out.set(q.id, {
        id: q.id,
        difficulty: q.difficulty,
        chapter: q.chapters?.name ?? "",
        subtopic: q.subtopics?.name ?? null,
        source_file: q.source_file,
        set_id: q.set_id,
        context: q.context,
        text: q.text ?? "",
        options: q.options ?? [],
      });
    }
  }
  return out;
}

/**
 * Questions a review has judged UNANSWERABLE — excluded from the pool for good.
 *
 * WHY THIS EXISTS. Mock 3's review found two questions that could not be shipped
 * (one with two correct options, one whose keyed answer holds only under a
 * condition the stem never states) and swapped them OUT of that paper. Removing
 * a question from a paper makes it ELIGIBLE AGAIN, because the only durable
 * exclusion the builder had was "is it in some paper" — so Mock 4 promptly
 * selected one of them back. The rejection was recorded in a script comment,
 * which no query can see.
 *
 * `question_reviews.verdict = 'unverifiable'` is exactly the right record for
 * this and it is already written by the review pass, so the exclusion is now
 * derived from the audit trail rather than from a hand-kept list. A row is
 * excluded only while its LATEST verdict is unverifiable, so repairing a
 * question and recording a new verdict returns it to the pool by itself.
 */
async function fetchUnverifiable(client: SupabaseClient): Promise<Set<string>> {
  const latest = new Map<string, { at: string; verdict: string }>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("question_reviews")
      .select("question_id, verdict, reviewed_at")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchUnverifiable: ${error.message}`);
    for (const r of (data ?? []) as any[]) {
      const prev = latest.get(r.question_id);
      if (!prev || String(r.reviewed_at) >= prev.at)
        latest.set(r.question_id, { at: String(r.reviewed_at), verdict: String(r.verdict) });
    }
    if (!data || data.length < PAGE) break;
  }
  const out = new Set<string>();
  for (const [id, v] of latest) if (v.verdict === "unverifiable") out.add(id);
  return out;
}

async function fetchUsed(client: SupabaseClient): Promise<Set<string>> {
  const used = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("paper_questions")
      .select("question_id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchUsed: ${error.message}`);
    for (const r of data ?? []) used.add((r as any).question_id);
    if (!data || data.length < PAGE) break;
  }
  return used;
}

/**
 * RULE 3 ordering — interleave chapters AND spread difficulty evenly.
 *
 * Chapter-interleaving alone back-loads the EASY questions (measured 3/4/10/14
 * by quartile on Mock 1's first build), which on a timed paper costs a student
 * exactly the marks they were most likely to bank.
 */
function orderByRule3(picks: Pick[]): Pick[] {
  const byChapter = new Map<string, Pick[]>();
  for (const p of picks) {
    const list = byChapter.get(p.chapter) ?? [];
    list.push(p);
    byChapter.set(p.chapter, list);
  }
  const chapterFrac = new Map<string, number>();
  for (const [, list] of byChapter) {
    list.forEach((p, i) => chapterFrac.set(p.id, (i + 1) / list.length));
  }
  const byDiff = new Map<Difficulty, Pick[]>();
  for (const p of [...picks].sort(
    (a, b) => chapterFrac.get(a.id)! - chapterFrac.get(b.id)!,
  )) {
    const list = byDiff.get(p.actual) ?? [];
    list.push(p);
    byDiff.set(p.actual, list);
  }
  const diffFrac = new Map<string, number>();
  for (const [, list] of byDiff) {
    list.forEach((p, i) => diffFrac.set(p.id, (i + 1) / list.length));
  }
  return [...picks].sort(
    (a, b) =>
      diffFrac.get(a.id)! - diffFrac.get(b.id)! ||
      chapterFrac.get(a.id)! - chapterFrac.get(b.id)!,
  );
}

/**
 * Pull set siblings back together after the RULE 3 sweep.
 *
 * Each set is anchored at its EARLIEST-ordered member so the group keeps the
 * position RULE 3 gave it, and the remaining siblings follow immediately. A set
 * therefore occupies one contiguous run, which is what lets the printed paper
 * show its context once (RULE 1) instead of repeating it per fragment.
 */
function gatherSets(ordered: Pick[], byId: Map<string, Row>): Pick[] {
  const setOf = (p: Pick) => byId.get(p.id)?.set_id ?? null;
  const out: Pick[] = [];
  const placed = new Set<string>();
  for (const p of ordered) {
    if (placed.has(p.id)) continue;
    out.push(p);
    placed.add(p.id);
    const sid = setOf(p);
    if (!sid) continue;
    for (const sib of ordered) {
      if (placed.has(sib.id) || setOf(sib) !== sid) continue;
      out.push(sib);
      placed.add(sib.id);
    }
  }
  return out;
}

async function main() {
  if (!TITLE || TITLE.startsWith("--")) {
    console.error('usage: build-blueprint-mock.ts "<paper title>" [--apply]');
    process.exit(2);
  }

  const { rows: alloc, chapterTotals } = parseBlueprint();
  const problems = assertBlueprint(alloc, chapterTotals);
  if (problems.length) {
    console.error("BLUEPRINT PARSE FAILED — refusing to build:");
    problems.forEach((p) => console.error("  " + p));
    process.exit(1);
  }
  const demand = alloc.reduce((a, r) => a + r.n, 0);
  console.log(
    `blueprint: ${alloc.length} allocation rows across ${chapterTotals.length} chapters, ${demand} questions`,
  );

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const [pool, used, unverifiable] = await Promise.all([
    fetchPool(client),
    fetchUsed(client),
    fetchUnverifiable(client),
  ]);

  const dropped = { used: 0, unverifiable: 0, structural: 0, setBound: 0, dashedTable: 0 };
  const eligible = pool.filter((r) => {
    if (used.has(r.id)) {
      dropped.used++;
      return false;
    }
    if (unverifiable.has(r.id)) {
      dropped.unverifiable++;
      return false;
    }
    if (!structurallyClean(r)) {
      dropped.structural++;
      return false;
    }
    if (r.set_id !== null || r.context !== null) {
      dropped.setBound++;
      return false;
    }
    if (dashedTable((r.context ?? "") + " " + r.text)) {
      dropped.dashedTable++;
      return false;
    }
    return true;
  });
  console.log(
    `pool ${pool.length} -> eligible ${eligible.length}  ` +
      `(dropped: ${dropped.used} already in a paper, ${dropped.unverifiable} review-rejected, ${dropped.structural} structural, ` +
      `${dropped.setBound} set/context-bound, ${dropped.dashedTable} dashed table)\n`,
  );

  // Booklet first, then the LWS mock papers; stable id order inside each family.
  const ranked = [...eligible].sort((a, b) => {
    const fa = familyOf(a.source_file) === "booklet" ? 0 : 1;
    const fb = familyOf(b.source_file) === "booklet" ? 0 : 1;
    return fa - fb || a.id.localeCompare(b.id);
  });

  // A blueprint name that matches NO taxonomy row yields zero candidates and
  // reads in the report as a supply gap. Those are completely different
  // problems — one is a broken reference, the other is an empty shelf — so
  // resolve names against the live taxonomy FIRST and refuse on a miss.
  const liveNames = new Set(
    pool.map((r) => `${r.chapter}\u0000${r.subtopic ?? ""}`),
  );
  const unresolved = alloc.filter(
    (c) => !liveNames.has(`${c.chapter}\u0000${c.subtopic}`),
  );
  if (unresolved.length) {
    console.error(
      `BLUEPRINT NAMES THAT MATCH NO LIVE TAXONOMY ROW (${unresolved.length}) — refusing to build.
` +
        "These are broken references, not supply gaps. Fix the names in " +
        "NDA_MATHS_BLUEPRINT.md so its rows stay executable as /browse filters:",
    );
    for (const c of unresolved) {
      const near = [
        ...new Set(
          pool.filter((r) => r.chapter === c.chapter).map((r) => r.subtopic),
        ),
      ]
        .filter(Boolean)
        .filter((n) => {
          const a = (n as string).toLowerCase().replace(/[^a-z]/g, "");
          const b = c.subtopic.toLowerCase().replace(/[^a-z]/g, "");
          return a.includes(b.slice(0, 18)) || b.includes(a.slice(0, 18));
        });
      console.error(`  ${c.chapter} / "${c.subtopic}"`);
      if (near.length)
        console.error(
          `     did you mean: ${near.map((n) => `"${n}"`).join(" | ")}`,
        );
    }
    process.exit(1);
  }

  // Declared fills are named by id and live OUTSIDE the pool by construction -
  // the pool is NDA practice only, while the fills are Worksheets rows and one
  // NDA PYQ set. Fetch them explicitly rather than widening the pool, so a
  // cross-source question can only enter the paper by being named in FILLS.
  // Fills and lent slots are PER PAPER: each is an adjudicated pick for one
  // cell of one paper, and the questions it names are consumed once used. A
  // global list would make every later mock refuse (the ids are now in a
  // paper) or, worse, silently reuse them.
  const FILLS = FILL_SETS[TITLE] ?? [];
  const SLOT_LENT = SLOT_LENT_SETS[TITLE] ?? [];
  if (!FILL_SETS[TITLE])
    console.log(`no declared fills for this paper - every cell must come from the pool
`);

  const fillIds = FILLS.flatMap((f) => f.ids);
  const fillRows = await fetchByIds(client, fillIds);
  const missing = fillIds.filter((id) => !fillRows.has(id));
  if (missing.length) {
    console.error("DECLARED FILL IDS NOT FOUND: " + missing.join(", "));
    process.exit(1);
  }
  const unclean = [...fillRows.values()].filter((r) => !structurallyClean(r));
  if (unclean.length) {
    console.error(
      "DECLARED FILLS FAIL THE STRUCTURAL CHECK: " +
        unclean.map((r) => r.id).join(", "),
    );
    process.exit(1);
  }
  const alreadyUsed = [...fillRows.values()].filter((r) => used.has(r.id));
  if (alreadyUsed.length) {
    console.error(
      "DECLARED FILLS ALREADY IN A PAPER: " +
        alreadyUsed.map((r) => r.id).join(", "),
    );
    process.exit(1);
  }
  const byId = new Map([...pool.map((r) => [r.id, r] as const), ...fillRows]);

  const taken = new Set<string>();
  const picks: Pick[] = [];
  const shortfalls: (AllocRow & { got: number })[] = [];

  const cellKey = (c: {
    chapter: string;
    subtopic: string;
    difficulty: Difficulty;
  }) => `${c.chapter}\u0000${c.subtopic}\u0000${c.difficulty}`;
  const lent = new Set(SLOT_LENT.map(cellKey));
  const fillBy = new Map(FILLS.map((f) => [cellKey(f), f]));

  for (const cell of alloc) {
    // A slot lent to a set in the same chapter is intentionally left unfilled.
    if (lent.has(cellKey(cell))) continue;

    const fill = fillBy.get(cellKey(cell));
    if (fill) {
      for (const id of fill.ids) {
        const r = byId.get(id);
        if (!r) {
          shortfalls.push({ ...cell, got: 0 });
          break;
        }
        taken.add(id);
        picks.push({
          ...cell,
          id,
          actual: r.difficulty,
          family: "declared fill",
          text: r.text,
          fill,
        });
      }
      continue;
    }

    const cands = ranked.filter(
      (r) =>
        !taken.has(r.id) &&
        r.chapter === cell.chapter &&
        r.subtopic === cell.subtopic &&
        r.difficulty === cell.difficulty,
    );
    const got = cands.slice(0, cell.n);
    for (const r of got) {
      taken.add(r.id);
      picks.push({
        ...cell,
        id: r.id,
        actual: r.difficulty,
        family: familyOf(r.source_file),
        text: r.text,
      });
    }
    if (got.length < cell.n) shortfalls.push({ ...cell, got: got.length });
  }

  // ── report ────────────────────────────────────────────────────────────────
  const byFam = (f: Family) => picks.filter((p) => p.family === f).length;
  const byDiff = (d: Difficulty) => picks.filter((p) => p.actual === d).length;
  console.log(`SELECTED ${picks.length} of ${demand}`);
  console.log(
    `  difficulty  E${byDiff("EASY")} / M${byDiff("MODERATE")} / H${byDiff("HARD")}   (target E30 / M58 / H32)`,
  );
  console.log(
    `  source      booklet ${byFam("booklet")} · LWS mock papers ${byFam("mock paper")}` +
      ` · declared fills ${byFam("declared fill")}`,
  );
  // The three families must account for EVERY pick. A sum short of the total
  // means a question entered the paper through a path the report cannot name,
  // which is exactly the thing a printed paper must not do.
  const famTotal =
    byFam("booklet") + byFam("mock paper") + byFam("declared fill");
  if (famTotal !== picks.length)
    console.log(`  !! source counts sum to ${famTotal}, not ${picks.length}`);
  for (const f of FILLS)
    console.log(
      `    fill  ${f.chapter} / ${f.subtopic} / ${f.difficulty}  <- ${f.source} (${f.ids.length})`,
    );
  console.log("");

  const perChapter = new Map<string, number>();
  for (const p of picks)
    perChapter.set(p.chapter, (perChapter.get(p.chapter) ?? 0) + 1);
  const chapterProblems = chapterTotals
    .filter((t) => (perChapter.get(t.chapter) ?? 0) !== t.n)
    .map((t) => `  ${t.chapter}: ${perChapter.get(t.chapter) ?? 0} of ${t.n}`);
  if (chapterProblems.length) {
    console.log("CHAPTER SUBTOTALS OFF TARGET:");
    chapterProblems.forEach((l) => console.log(l));
    console.log("");
  }

  if (shortfalls.length) {
    console.log(
      `UNFILLED CELLS (${shortfalls.length}) — no eligible question exists:`,
    );
    for (const s of shortfalls)
      console.log(
        `  ${s.chapter} / ${s.subtopic} / ${s.difficulty}: got ${s.got} of ${s.n}`,
      );
    console.log("");
  }

  // RULE 1 printing exception: a set's members stay CONSECUTIVE, with their
  // shared context printed once above the group. The difficulty sweep is
  // exactly what would tear them apart, so re-gather siblings after ordering.
  const ordered = gatherSets(orderByRule3(picks), byId);

  // RULE 3 acceptance: difficulty spread by quartile + no adjacent same chapter.
  const q = (i: number) => Math.floor((i * 4) / ordered.length);
  const quart: Record<Difficulty, number[]> = {
    EASY: [0, 0, 0, 0],
    MODERATE: [0, 0, 0, 0],
    HARD: [0, 0, 0, 0],
  };
  ordered.forEach((p, i) => quart[p.actual][q(i)]++);
  let adjacent = 0;
  for (let i = 1; i < ordered.length; i++)
    if (ordered[i].chapter === ordered[i - 1].chapter) adjacent++;
  console.log("RULE 3 — printed order");
  for (const d of ["EASY", "MODERATE", "HARD"] as Difficulty[])
    console.log(`  ${d.padEnd(9)} by quartile: ${quart[d].join(" / ")}`);
  console.log(`  consecutive same-chapter pairs: ${adjacent}\n`);

  if (!APPLY) {
    console.log("DRY RUN — re-run with --apply to write the paper.");
    return;
  }
  if (picks.length !== demand) {
    console.error(
      `REFUSE: ${picks.length} of ${demand} selected — fill the gaps before writing.`,
    );
    process.exit(1);
  }

  const { data: existing } = await client
    .from("papers")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("title", TITLE)
    .limit(1)
    .maybeSingle();
  const paperId =
    (existing as any)?.id ??
    (await createPaper(client, {
      orgId: ORG_ID,
      createdBy: CREATED_BY,
      title: TITLE,
      examId: EXAM_ID,
      template: [
        {
          key: "mathematics",
          label: "Mathematics",
          targetCount: demand,
          assignedTo: [],
        },
      ],
    }));
  console.log(
    `paper ${paperId}${(existing as any)?.id ? " (existing)" : " (created)"}`,
  );

  let added = 0;
  for (const p of ordered) {
    await addQuestion(client, paperId, p.id, {
      sectionKey: "mathematics",
      addedBy: CREATED_BY,
    });
    added++;
    if (added % 20 === 0) console.log(`  added ${added}/${ordered.length}`);
  }
  console.log(`\ndone — ${added} questions in paper ${paperId}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
