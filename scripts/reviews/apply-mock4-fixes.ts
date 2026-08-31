/**
 * Source-verified repairs found while building Blueprint Mock 4.
 *
 *   npx tsx scripts/reviews/apply-mock4-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-mock4-fixes.ts --apply
 *
 * FOUND BEFORE THE PAPER WAS BUILT, not after — which is the difference from
 * Mocks 1-3, where every corrupt stem surfaced in the blind pass at review time.
 * RULE 2a requires READING a fill rather than trusting its difficulty label, and
 * reading this one is what exposed it: the arithmetic simply did not close.
 *
 * Q25 (NDA Sep 2024, Properties of Triangle). Stored stem asks for
 * `sqrt(2)a - b` in a triangle with A = 75 deg and B = 45 deg. By the sine rule
 * that is 2R(sqrt(2) sin75 - sin45) = 0.658919R', while the four options are
 * c = 0.866, sqrt(2)c = 1.224745, 2c = 1.732 and 2sqrt(2)c = 2.449 (same scale).
 * NO OPTION MATCHES. Reading it as `2a - b` gives
 * 2 sin75 - sin45 = 1.224745 = sqrt(2) sin60, i.e. exactly option (b) — the
 * stored key. So the key was right and the stem had lost a digit.
 *
 * SOURCE-VERIFIED, per the standing rule that a PYQ is adjudicated against the
 * actual paper and never against the ingest spreadsheet. The Excel this row came
 * from (`NDA_Maths_Sep2024_QuestionBank.xlsx`) carries no authority here.
 * `C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs\Maths_2024_NDA2.pdf` (Sep = NDA 2 by the
 * project's paper convention) page index 5, right column, prints:
 *
 *     25. In a triangle ABC, angle A = 75 deg and angle B = 45 deg.
 *         What is 2a - b equal to?
 *         (a) c   (b) sqrt(2) c   (c) 2c   (d) 2 sqrt(2) c
 *
 * The paper has NO TEXT LAYER (0 chars across all 24 pages), so it was read as a
 * rendered image. Our four options match the printed ones exactly; only the stem
 * was wrong. Key (b) unchanged.
 *
 * The primitive is expect-then-set: the edit states the CURRENT value in full and
 * is REFUSED if the stored value differs, so it cannot clobber a row something
 * else has touched. content_hash is recomputed because the stem is in the dedup
 * preimage, and the row id is preserved so any paper reference survives.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Fix = {
  qnum: string;
  sourceFile: string;
  why: string;
  stem?: { expect: string; to: string };
  options?: { label: string; expect: string; to: string }[];
  /**
   * Move the correct option. Both letters are named so the edit asserts the state
   * it believes it is changing — a key flip that does not say what it is flipping
   * FROM cannot be re-read later to check it was applied to the right row.
   */
  key?: { expect: string; to: string };
  solution?: string;
};

/**
 * An ALREADY-APPLIED edit is a SKIP, not a refusal — but any other unexpected
 * state still refuses. Without this the script becomes single-use: the first
 * `--apply` makes every one of its own `expect` strings stale, so re-running it
 * (to add a fix found later in the same review) aborts the whole batch on the
 * fixes that already landed. That is the `fix-keys.ts` lesson, applied here.
 */
const state = (stored: string, expect: string, to: string): "todo" | "done" | "bad" =>
  stored === expect ? "todo" : stored === to ? "done" : "bad";

const FIXES: Fix[] = [
  {
    qnum: "25",
    sourceFile: "NDA_Maths_Sep2024_QuestionBank.xlsx",
    why:
      "Stem lost a digit: printed '2a - b', stored 'sqrt(2)a - b'. As stored NO option is reachable; as printed the answer is exactly sqrt(2)c = the stored key B. Source-verified against Maths_2024_NDA2.pdf page index 5.",
    stem: {
      expect:
        "In a triangle \\(ABC\\), \\(\\angle A=75°\\) and \\(\\angle B=45°\\). What is \\(\\sqrt{2}a-b\\) equal to?",
      to:
        "In a triangle \\(ABC\\), \\(\\angle A=75^\\circ\\) and \\(\\angle B=45^\\circ\\). What is \\(2a-b\\) equal to?",
    },
    solution:
      "The three angles are \\(A = 75^\\circ\\), \\(B = 45^\\circ\\) and therefore \\(C = 180^\\circ - 75^\\circ - 45^\\circ = 60^\\circ\\).\n\n" +
      "By the sine rule, \\(a = 2R\\sin A\\), \\(b = 2R\\sin B\\) and \\(c = 2R\\sin C\\) for the circumradius \\(R\\), so every side can be written on the same scale and the \\(2R\\) will cancel.\n\n" +
      "Take the quantity asked for:\n\n" +
      "\\(2a - b = 2R\\left(2\\sin 75^\\circ - \\sin 45^\\circ\\right)\\).\n\n" +
      "Now \\(\\sin 75^\\circ = \\sin(45^\\circ + 30^\\circ) = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}\\), so\n\n" +
      "\\(2\\sin 75^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2}}{2}\\) and \\(\\sin 45^\\circ = \\dfrac{\\sqrt{2}}{2}\\).\n\n" +
      "Subtracting, the \\(\\sqrt{2}\\) terms cancel:\n\n" +
      "\\(2\\sin 75^\\circ - \\sin 45^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2} - \\sqrt{2}}{2} = \\dfrac{\\sqrt{6}}{2}\\).\n\n" +
      "Compare that with \\(c\\): \\(\\sin C = \\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}\\), and \\(\\sqrt{2}\\cdot\\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{6}}{2}\\), the same value.\n\n" +
      "Hence \\(2a - b = \\sqrt{2}\\,c\\), which is (B).",
  },
  {
    qnum: "426",
    sourceFile: "NDA_Maths_Practice__Algebra__Sequence_and_Series.pdf",
    why:
      "Stem AND all four options corrupt, and the row carried NO SOLUTION AT ALL — which is why nothing had ever caught it. As stored the A.P. condition gives t^2 - 4t + 27/5 = 0 with discriminant -140, so the question has no real answer. Source-verified: the booklet's first term is log_e(5), not log_3(2). Key A unchanged.",
    stem: {
      expect:
        "If \\(\\log_3 2,\\ \\log_3(5^x - 1)\\) and \\(\\log_3\\left(5^x - \\dfrac{11}{5}\\right)\\) are in A.P., then the values of \\(x\\) are",
      to:
        "If \\(\\log_e 5,\\ \\log_e(5^x - 1)\\) and \\(\\log_e\\left(5^x - \\dfrac{11}{5}\\right)\\) are in A.P., then the values of \\(x\\) are",
    },
    options: [
      { label: "A", expect: "\\(\\log_4 4\\) and \\(\\log_4 3\\)", to: "\\(\\log_5 4\\) and \\(\\log_5 3\\)" },
      { label: "B", expect: "1 and \\(\\log_5 3\\)", to: "\\(\\log_3 4\\) and \\(\\log_4 3\\)" },
      { label: "C", expect: "\\(\\log_5 5\\) and \\(\\log_5 2\\)", to: "\\(\\log_3 4\\) and \\(\\log_3 5\\)" },
      { label: "D", expect: "\\(\\log_5 6\\) and \\(\\log_5 2\\)", to: "\\(\\log_5 6\\) and \\(\\log_5 7\\)" },
    ],
    solution:
      "Three terms are in A.P. exactly when twice the middle one equals the sum of the outer two:\n\n" +
      "\\(2\\log_e(5^x - 1) = \\log_e 5 + \\log_e\\left(5^x - \\dfrac{11}{5}\\right)\\).\n\n" +
      "Collapse each side into a single logarithm using \\(2\\log_e A = \\log_e A^2\\) and \\(\\log_e P + \\log_e Q = \\log_e PQ\\):\n\n" +
      "\\(\\log_e (5^x - 1)^2 = \\log_e\\left[5\\left(5^x - \\dfrac{11}{5}\\right)\\right]\\).\n\n" +
      "The logarithm is one-to-one, so the arguments are equal. Writing \\(t = 5^x\\):\n\n" +
      "\\((t - 1)^2 = 5t - 11\\)\n\n" +
      "\\(t^2 - 2t + 1 = 5t - 11\\)\n\n" +
      "\\(t^2 - 7t + 12 = 0\\)\n\n" +
      "\\((t - 3)(t - 4) = 0\\), so \\(t = 3\\) or \\(t = 4\\).\n\n" +
      "Both must be CHECKED against the domain, since a logarithm needs a positive argument: the question requires \\(5^x - 1 > 0\\) and \\(5^x - \\dfrac{11}{5} > 0\\), i.e. \\(t > \\dfrac{11}{5} = 2.2\\). Both 3 and 4 clear that, so neither root is rejected.\n\n" +
      "Finally \\(5^x = 3\\) gives \\(x = \\log_5 3\\) and \\(5^x = 4\\) gives \\(x = \\log_5 4\\). Hence (A).",
  },
  {
    qnum: "79",
    sourceFile: "NDA_Maths_Mock_Test_03.docx",
    why:
      "Option A printed as '--I', the pandoc en-dash artifact from the .docx ingest — a student sees a doubled hyphen where a minus belongs. NOT source-verified (the .docx is not on disk) but settled by the option set: A, B and C are -I, -2X and 2X, so a doubled hyphen is not an expression. Key C unchanged and independently re-derived: X^2 = [[1,-8],[0,9]], so X^2 - 2X + 3I = [[2,-4],[0,6]] = 2X.",
    options: [{ label: "A", expect: "--I", to: "-I" }],
  },
  {
    qnum: "69",
    sourceFile: "NDA1_2021_Maths_QuestionBank.xlsx",
    why:
      "THE ONE GENUINE WRONG KEY of this paper, and the only one across four mocks. The stem is FAITHFUL — verified against the printed page — so unusually it is the answer that is wrong, not the text. Key B (One) -> A (Zero).",
    key: { expect: "B", to: "A" },
    solution:
      "Three points are collinear exactly when the two vectors joining them are parallel, i.e. their cross product is the zero vector. Note that all THREE components must vanish for the SAME \\(k\\) — checking one is not enough, and that is the whole question.\n\n" +
      "Write \\(P = (k,\\ 1,\\ 3)\\), \\(Q = (1,\\ -2,\\ k+1)\\) and \\(R = (15,\\ 2,\\ -4)\\). Then\n\n" +
      "\\(\\vec{PQ} = (1 - k,\\ -3,\\ k - 2)\\) and \\(\\vec{PR} = (15 - k,\\ 1,\\ -7)\\).\n\n" +
      "Take the cross product component by component:\n\n" +
      "\\(\\hat{i}\\): \\((-3)(-7) - (k-2)(1) = 23 - k\\)\n\n" +
      "\\(\\hat{j}\\): \\((k-2)(15-k) - (1-k)(-7) = -k^{2} + 10k - 23\\)\n\n" +
      "\\(\\hat{k}\\): \\((1-k)(1) - (-3)(15-k) = 46 - 4k\\)\n\n" +
      "Now solve each for zero SEPARATELY and compare the root sets:\n\n" +
      "\\(23 - k = 0 \\Rightarrow k = 23\\)\n\n" +
      "\\(k^{2} - 10k + 23 = 0 \\Rightarrow k = 5 \\pm \\sqrt{2}\\)\n\n" +
      "\\(46 - 4k = 0 \\Rightarrow k = \\dfrac{23}{2}\\)\n\n" +
      "The three sets \\(\\{23\\}\\), \\(\\{5 - \\sqrt{2},\\ 5 + \\sqrt{2}\\}\\) and \\(\\left\\{\\dfrac{23}{2}\\right\\}\\) have NO value in common, so no \\(k\\) makes the cross product vanish and the three points are never collinear.\n\n" +
      "Hence the number of possible values is ZERO, which is (A).\n\n" +
      "[Note: this answer is DERIVED. The source paper publishes no answer key, and the value previously stored here came from a prep-house compilation rather than an official one. The stem was checked against the printed paper and is faithful.]",
  },
  {
    qnum: "139",
    sourceFile: "NDA_Maths_Practice__Algebra__Complex_Numbers.pdf",
    why:
      "A TRANSCRIPTION ERROR THAT MADE A WRONG OPTION LOOK RIGHT — the rarest shape seen so far. Our option D read '-3, -1-2w, -1-2w^2', which IS the root set, so the row had TWO correct options (the blind pass flagged it AMBIGUOUS against option A). The booklet actually prints option (d) as '-3, 1-2w, -1-2w^2' — one sign different, and a mixed set that is NOT the roots. Restoring the printed text leaves exactly one correct option, (a). Key D -> A.",
    options: [
      {
        label: "D",
        expect: "\\(-3, -1 - 2\\omega, -1 - 2\\omega^2\\)",
        to: "\\(-3, 1 - 2\\omega, -1 - 2\\omega^2\\)",
      },
    ],
    key: { expect: "D", to: "A" },
    solution:
      "Rewrite the equation as \\((x+1)^3 = -8\\), so \\(x + 1\\) is a cube root of \\(-8\\).\n\n" +
      "The three cube roots of \\(-8\\) are \\(-2\\), \\(-2\\omega\\) and \\(-2\\omega^2\\), because multiplying any one cube root by \\(\\omega\\) or \\(\\omega^2\\) gives the others. Hence\n\n" +
      "\\(x = -3,\\quad x = -1 - 2\\omega,\\quad x = -1 - 2\\omega^2\\).\n\n" +
      "Now put those in the form the options use. With \\(\\omega = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i\\) and \\(\\omega^2 = -\\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}i\\):\n\n" +
      "\\(-1 - 2\\omega = -1 + 1 - \\sqrt{3}i = -\\sqrt{3}i\\) and \\(-1 - 2\\omega^2 = -1 + 1 + \\sqrt{3}i = \\sqrt{3}i\\).\n\n" +
      "So the root set is \\(\\{-3,\\ \\sqrt{3}i,\\ -\\sqrt{3}i\\}\\).\n\n" +
      "Option (A) reads \\(-3,\\ 1 + 2\\omega,\\ 1 + 2\\omega^2\\), and \\(1 + 2\\omega = 1 - 1 + \\sqrt{3}i = \\sqrt{3}i\\), \\(1 + 2\\omega^2 = -\\sqrt{3}i\\) — the SAME three numbers, just written the other way round. Hence (A).\n\n" +
      "(Check the others: \\(1 - 2\\omega = 2 - \\sqrt{3}i\\), whose distance from \\(-1\\) is \\(\\sqrt{12} \\neq 2\\), so it is not a root; the same rules out \\(-1 + 2\\omega\\).)\n\n" +
      "[Textbook: the booklet's own answer key points at the option reading \\(-3,\\ 1 - 2\\omega,\\ -1 - 2\\omega^2\\), but that list is not the root set — its middle entry \\(2 - \\sqrt{3}i\\) does not satisfy the equation. The option naming all three roots is the correct one.]",
  },
  {
    qnum: "43",
    sourceFile: "NDA_Maths_Weekly_Mock_2026_T4.docx",
    why:
      "RULE 5: the entire stored solution was 'Ans : (c)** Both I and II are true.' — it restates the option and derives nothing, on a row where BOTH statements need a real argument. Answer unchanged (C), independently confirmed by the blind pass.",
    solution:
      "Both statements are true, but each needs its own argument.\n\n" +
      "**I. If \\(A\\) is skew-symmetric then \\(A^2\\) is symmetric.**\n\n" +
      "Skew-symmetric means \\(A^{T} = -A\\). Transposing a product reverses it, so\n\n" +
      "\\((A^{2})^{T} = (AA)^{T} = A^{T}A^{T} = (-A)(-A) = A^{2}\\).\n\n" +
      "A matrix equal to its own transpose is symmetric, so \\(A^2\\) is symmetric. (Note this holds for EVERY skew-symmetric \\(A\\), of any order.)\n\n" +
      "**II. The trace of a skew-symmetric matrix of odd order is always zero.**\n\n" +
      "Compare the \\((i,i)\\) entries of \\(A^{T} = -A\\). The transpose leaves the diagonal fixed, so \\(a_{ii} = -a_{ii}\\), giving \\(2a_{ii} = 0\\) and hence \\(a_{ii} = 0\\) for every \\(i\\). Every diagonal entry is zero, so the trace is zero.\n\n" +
      "Both statements are therefore true. Hence (C).\n\n" +
      "Worth noticing: the trace argument never used the order at all, so the conclusion holds for skew-symmetric matrices of ANY order — 'odd' in the statement is a red herring, not a condition. What IS special about odd order is a different fact the question does not ask about: the determinant of an odd-order skew-symmetric matrix is zero.",
  },
  {
    qnum: "43",
    sourceFile: "NDA_Maths_Weekly_Mock_2026_T3.docx",
    why:
      "THE STORED SOLUTION DERIVED THE WRONG OPTION. It summed n terms where the series has n-1, reaching n[[1,(n-1)/2],[0,1]] — which is option A, not the keyed C. The key is right; the working was wrong, and it also carried an 'Ans-(c)**' artifact and a line of Hindi from the .docx ingest. Note the letter-mismatch probe could NOT see this: the solution ends in a matrix, not an option letter.",
    solution:
      "First find the pattern of powers. With \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\), multiplying gives\n\n" +
      "\\(A^{2} = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}\\), \\(A^{3} = \\begin{bmatrix} 1 & 3 \\\\ 0 & 1 \\end{bmatrix}\\), and in general \\(A^{k} = \\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}\\).\n\n" +
      "(Each multiplication by \\(A\\) adds 1 to the top-right entry and leaves the rest alone.)\n\n" +
      "The sum runs from \\(A^{1}\\) to \\(A^{n-1}\\), so it has \\(n - 1\\) TERMS — not \\(n\\). Adding entry by entry:\n\n" +
      "the two diagonal entries each pick up 1 from every term, giving \\(n - 1\\);\n\n" +
      "the top-right entry picks up \\(1 + 2 + \\cdots + (n-1) = \\dfrac{(n-1)n}{2}\\).\n\n" +
      "So\n\n" +
      "\\(A + A^{2} + \\cdots + A^{n-1} = \\begin{bmatrix} n-1 & \\dfrac{n(n-1)}{2} \\\\ 0 & n-1 \\end{bmatrix}\\).\n\n" +
      "Taking the common factor \\(n - 1\\) out of both rows:\n\n" +
      "\\(= (n-1)\\begin{bmatrix} 1 & \\dfrac{n}{2} \\\\ 0 & 1 \\end{bmatrix}\\).\n\n" +
      "Hence (C).\n\n" +
      "The trap is the term count: summing \\(n\\) terms instead of \\(n-1\\) produces \\(n\\begin{bmatrix} 1 & \\frac{n-1}{2} \\\\ 0 & 1 \\end{bmatrix}\\), which is a printed option — so the wrong count lands on a wrong answer rather than on nothing.",
  },
  {
    qnum: "43",
    sourceFile: "NDA_Maths_Mock_Test_01.docx",
    why:
      "The stored solution listed the six pairs correctly and then trailed off — 'i.e., pairs' with the count missing, so the printed answer key never actually states the answer. Answer unchanged (C).",
    solution:
      "Both \\(x\\) and \\(y\\) are positive integers, so each is at least 1, and the constraint is \\(x + y \\le 4\\).\n\n" +
      "Work through the possible sums:\n\n" +
      "\\(x + y = 2\\): \\((1,1)\\) — 1 pair\n\n" +
      "\\(x + y = 3\\): \\((1,2)\\), \\((2,1)\\) — 2 pairs\n\n" +
      "\\(x + y = 4\\): \\((1,3)\\), \\((2,2)\\), \\((3,1)\\) — 3 pairs\n\n" +
      "That is \\(1 + 2 + 3 = 6\\) ordered pairs in all. Hence (C).\n\n" +
      "(In general the number of ordered pairs of positive integers with \\(x + y = s\\) is \\(s - 1\\), so the running total to \\(s = 4\\) is \\(1 + 2 + 3\\).)",
  },
  {
    qnum: "1227",
    sourceFile: "NDA_Maths_Practice__Trigonometry__Trigonometric_Equations.pdf",
    why:
      "The stored solution contained a REAL ALGEBRA ERROR: from 2x = 2n*pi +/- pi/2 it wrote x = 2n*pi +/- pi/4, but halving must halve the n*pi term too, giving x = n*pi +/- pi/4. Separately, option D was transcribed as 'n*pi +/- pi/2' where the booklet prints '2n*pi +/- pi/2' — restored for fidelity (it is a distractor either way; neither form solves the equation). Key A unchanged. The BOOK's own option set is incomplete, which the rewritten solution now says out loud.",
    options: [
      {
        label: "D",
        expect: "\\(n\\pi \\pm \\frac{\\pi}{2}, n \\in Z\\)",
        to: "\\(2n\\pi \\pm \\frac{\\pi}{2}, n \\in Z\\)",
      },
    ],
    solution:
      "Group the outer two terms with the sum-to-product identity. Since \\(\\dfrac{x + 3x}{2} = 2x\\) and \\(\\dfrac{3x - x}{2} = x\\),\n\n" +
      "\\(\\cos x + \\cos 3x = 2\\cos 2x\\cos x\\).\n\n" +
      "The equation therefore becomes\n\n" +
      "\\(2\\cos 2x\\cos x + \\cos 2x = 0\\), i.e. \\(\\cos 2x\\,(2\\cos x + 1) = 0\\).\n\n" +
      "A product is zero when a factor is, so either \\(\\cos 2x = 0\\) or \\(\\cos x = -\\dfrac{1}{2}\\). The stem EXCLUDES the second, which is exactly why that condition is given, so the equation reduces to\n\n" +
      "\\(\\cos 2x = 0\\).\n\n" +
      "Cosine vanishes at the odd multiples of \\(\\dfrac{\\pi}{2}\\), so \\(2x = (2n+1)\\dfrac{\\pi}{2}\\) and hence\n\n" +
      "\\(x = (2n+1)\\dfrac{\\pi}{4}\\) — the odd multiples of \\(\\dfrac{\\pi}{4}\\), which can equally be written \\(x = n\\pi \\pm \\dfrac{\\pi}{4}\\).\n\n" +
      "Hence (A).\n\n" +
      "[Textbook: no printed option is the complete solution set. The keyed option reads \\(2n\\pi \\pm \\dfrac{\\pi}{4}\\), which lists only \\(\\dfrac{\\pi}{4}\\) and \\(\\dfrac{7\\pi}{4}\\) in \\([0, 2\\pi)\\) and so omits \\(\\dfrac{3\\pi}{4}\\) and \\(\\dfrac{5\\pi}{4}\\) — both genuine solutions, at which \\(\\cos x = -\\dfrac{1}{\\sqrt{2}}\\), not the excluded \\(-\\dfrac{1}{2}\\). It is still the only defensible choice: substituting the other three options gives \\(-1\\), \\(1.366\\) and \\(-1\\) respectively, so none of them contains a solution at all.]",
  },
];

// eslint-disable-next-line no-control-regex
const CTRL = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let refused = 0;
  const plan: {
    id: string;
    qnum: string;
    text: string;
    solution: string;
    hash: string;
    before: string;
    opts: { id: string; label: string; text: string; correct: boolean }[];
  }[] = [];

  for (const fix of FIXES) {
    const tag = `Q${fix.qnum} (${fix.sourceFile})`;
    const { data, error } = await db
      .from("questions")
      .select("id, org_id, exam_id, text, solution, content_hash, options(id, label, text, is_correct)")
      .eq("source_file", fix.sourceFile)
      .eq("question_number", fix.qnum);
    if (error) throw error;
    const rows = data as any[];
    if (rows.length !== 1) {
      console.error(`REFUSE ${tag}: matched ${rows.length} rows`);
      refused++;
      continue;
    }
    const q = rows[0];
    let bad = false;

    let text = String(q.text);
    let alreadyDone = 0;
    let edits = 0;
    if (fix.stem) {
      if (fix.stem.expect === fix.stem.to) {
        console.error(`REFUSE ${tag}: stem expect === to`);
        bad = true;
      } else {
        const st = state(text, fix.stem.expect, fix.stem.to);
        if (st === "bad") {
          console.error(`REFUSE ${tag}: stored stem is neither the expected nor the repaired value`);
          console.error(`   stored: ${JSON.stringify(text)}`);
          console.error(`   expect: ${JSON.stringify(fix.stem.expect)}`);
          bad = true;
        } else if (st === "done") {
          alreadyDone++;
        } else {
          text = fix.stem.to;
          edits++;
        }
      }
    }
    if (bad) {
      refused++;
      continue;
    }

    const opts = (q.options as any[])
      .map((o) => ({
        id: o.id as string,
        label: o.label as string,
        text: String(o.text ?? ""),
        correct: !!o.is_correct,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    for (const e of fix.options ?? []) {
      const o = opts.find((x) => x.label === e.label);
      if (!o) {
        console.error(`REFUSE ${tag}: no option ${e.label}`);
        bad = true;
        break;
      }
      const st = state(o.text, e.expect, e.to);
      if (st === "bad") {
        console.error(`REFUSE ${tag}: option ${e.label} is ${JSON.stringify(o.text)}`);
        bad = true;
        break;
      }
      if (st === "done") alreadyDone++;
      else {
        o.text = e.to;
        edits++;
      }
    }
    if (bad) {
      refused++;
      continue;
    }

    // Key flip. Asserted in BOTH directions, and skipped cleanly if already done.
    if (fix.key) {
      const from = opts.find((o) => o.label === fix.key!.expect);
      const to = opts.find((o) => o.label === fix.key!.to);
      if (!from || !to) {
        console.error(`REFUSE ${tag}: key flip names an option that does not exist`);
        refused++;
        continue;
      }
      if (from.correct && !to.correct) {
        from.correct = false;
        to.correct = true;
        edits++;
      } else if (to.correct && !from.correct) {
        alreadyDone++;
      } else {
        console.error(
          `REFUSE ${tag}: key is neither ${fix.key.expect} nor ${fix.key.to} — refusing to guess`
        );
        refused++;
        continue;
      }
    }

    // A solution rewrite is an edit in its own right — without this, a row whose
    // stem/option edits already landed would SKIP and silently drop a later
    // solution fix.
    if (fix.solution && fix.solution !== String(q.solution ?? "")) edits++;

    if (!edits && alreadyDone) {
      console.log(`\n${tag}\n  SKIP — every edit is already applied.`);
      continue;
    }

    if (new Set(opts.map((o) => o.text.trim())).size !== opts.length) {
      console.error(`REFUSE ${tag}: repair leaves duplicate option text`);
      refused++;
      continue;
    }
    const correct = opts.filter((o) => o.correct);
    if (correct.length !== 1) {
      console.error(`REFUSE ${tag}: ${correct.length} correct options`);
      refused++;
      continue;
    }
    const key = correct[0].label;

    const solution = fix.solution ?? String(q.solution ?? "");
    if (
      CTRL.test(text) ||
      opts.some((o) => CTRL.test(o.text)) ||
      CTRL.test(solution) ||
      solution.includes("\\\\(")
    ) {
      console.error(`REFUSE ${tag}: control char or double-escaped delimiter`);
      refused++;
      continue;
    }

    const hash = contentHash(text, opts.map((o) => o.text), key);
    if (hash !== q.content_hash) {
      const { data: clash, error: cErr } = await db
        .from("questions")
        .select("id, question_number, source_file")
        .eq("org_id", q.org_id)
        .eq("exam_id", q.exam_id)
        .eq("content_hash", hash)
        .neq("id", q.id);
      if (cErr) throw cErr;
      if ((clash as any[]).length) {
        console.error(`REFUSE ${tag}: new content_hash collides with ${JSON.stringify(clash)}`);
        refused++;
        continue;
      }
    }

    plan.push({
      id: q.id,
      qnum: fix.qnum,
      text,
      solution,
      hash,
      before: q.content_hash,
      opts: opts.map((o) => ({ id: o.id, label: o.label, text: o.text, correct: o.correct })),
    });

    console.log(`\n${tag}`);
    console.log(`  why: ${fix.why}`);
    if (fix.stem) console.log(`  stem -> ${text}`);
    for (const e of fix.options ?? []) console.log(`  opt ${e.label} -> ${JSON.stringify(e.to)}`);
    if (fix.solution) console.log(`  solution rewritten (${solution.length} chars)`);
    console.log(
      `  key ${key} ${fix.key ? `FLIPPED from ${fix.key.expect}` : "UNCHANGED"} | content_hash ${String(q.content_hash).slice(0, 10)} -> ${hash.slice(0, 10)}`
    );
  }

  if (refused) {
    console.error(`\n${refused} refused — NOTHING written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} question(s) would be updated.`);
    return;
  }
  for (const p of plan) {
    for (const o of p.opts) {
      const { error } = await db
        .from("options")
        .update({ text: o.text, is_correct: o.correct })
        .eq("id", o.id);
      if (error) throw error;
    }
    const { error } = await db
      .from("questions")
      .update({ text: p.text, solution: p.solution, content_hash: p.hash })
      .eq("id", p.id);
    if (error) throw error;
    console.log(`applied Q${p.qnum}`);
  }
  console.log(`\n${plan.length} question(s) updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
