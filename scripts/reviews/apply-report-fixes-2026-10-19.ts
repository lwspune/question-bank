/**
 * Fix the rows behind the question + concept reports open on 2026-10-19,
 * each checked against its printed source.
 *
 *   npx tsx scripts/reviews/apply-report-fixes-2026-10-19.ts            # dry run
 *   npx tsx scripts/reviews/apply-report-fixes-2026-10-19.ts --apply
 *
 * SOURCES READ. The NDA rows against the scanned UPSC booklets in
 * C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs (2017-II p3, 2018-I p4 + p42, 2022-I p7,
 * 2024-I p7, 2024-II p41, 2025-I p11 + p13 + p29) and GAT_Edited\GAT_2023_NDA2.pdf
 * p31; the MHT-CET rows against the .docx papers and their answer sheets in
 * C:\Vilas\LWS_Pune\MHT-CET\PYQPs; the State Board rows against the Balbharati
 * chapter PDFs. The booklets carry no answer key, so every NDA key move below is
 * derived from the printed stem and says so in its solution.
 *
 * THREE KINDS OF FIX, recorded separately by record-report-fixes-2026-10-19.ts:
 *   - our copy differed from the paper (NDA 2025-I Q34/35/39/40/95/96, 2024-II
 *     Q112, 2018-I Q118, 2024-I Q12's statement labels): restored to the paper;
 *   - our key was wrong (NDA 2017-II Q2, 2018-I Q11, 2022-I Q18, 2024-I Q12,
 *     2025-I Q34/Q39, 2023-II GAT Q116, MHT-CET 2025-Apr-25 S2 Q141);
 *   - the PAPER is flawed (MHT-CET 2024 12-May S1 Q111: the point (1,1) lies on
 *     neither curve): key kept, defect named at the top of the solution.
 *
 * GUARDS. Every fix names the stored key it moves from and a snippet the stored
 * row must still contain, so it refuses a row someone has edited since it was
 * read. content_hash is recomputed from the new text, EXCEPT for MHT-CET, whose
 * hash must stay the hash of the source text: MHT_CET_AI syncs by it, and a
 * rehash would turn its next sync into a duplicate (see commit 3507ff43).
 *
 * Mock attempts store a frozen score, so after --apply re-grade the eight mocks
 * that carry a moved key with scripts/reviews/regrade-attempt.ts.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash, numericContentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const KEEP_SOURCE_HASH = new Set(["MHT-CET"]);
const CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

const DERIVED =
  "\n\n[Answer derived from the printed UPSC paper, which carries no answer key; the answer stored here before was wrong.]";

type Fix = {
  id: string;
  label: string;
  /** Stored key the fix was adjudicated against (null for numeric rows). */
  fromKey: string | null;
  toKey?: string;
  /** A snippet the stored row (text, context, solution or an option) must still contain. */
  mustContain: string;
  text?: string;
  context?: string;
  solution?: string;
  options?: Record<string, string>;
};

// Contexts shared by every row of a set: each sibling is listed so a set never
// ends up with two different passages.
const CTX_P_ABS = "Let \\(p = |\\sin\\alpha - \\sin(\\alpha - 90^\\circ)|\\).";
const CTX_F_RATIO =
  "The function \\(f(x)\\) satisfies \\(f\\left(\\dfrac{x}{y}\\right) = \\dfrac{f(x)}{f(y)}\\) for all positive real values of \\(x\\) and \\(y\\), and \\(f(2) = 3\\).";

const FIXES: Fix[] = [
  // ── NDA Maths: key wrong, stem printed as stored ────────────────────────────
  {
    id: "6665d7a0-397d-48f7-9f6d-e43db11fa0a8",
    label: "NDA 2017-II Q2 binary division",
    fromKey: "A",
    toKey: "B",
    mustContain: "The remainder and the quotient",
    solution:
      "\\((101110)_2 = 32 + 8 + 4 + 2 = 46\\) and \\((110)_2 = 6\\). Dividing, \\(46 = 6 \\times 7 + 4\\), so the quotient is \\(7 = (111)_2\\) and the remainder is \\(4 = (100)_2\\).\n" +
      "The question asks for the remainder FIRST and then the quotient, so the answer is \\((100)_2\\) and \\((111)_2\\). Matches option B. (Option A gives the same two numbers in the wrong order.)" +
      DERIVED,
  },
  {
    id: "d42ad0e1-e69c-4255-8cf6-29942a49c980",
    label: "NDA 2018-I Q11 logarithms",
    fromKey: "D",
    toKey: "C",
    mustContain: "\\log_{15}(1+3^x)",
    solution:
      "Write \\(x = x\\log_{15}15\\). Then \\(x - x\\log_{15}5 = x(\\log_{15}15 - \\log_{15}5) = x\\log_{15}3 = \\log_{15}3^x\\), and the equation becomes \\(\\log_{15}3^x + \\log_{15}(1 + 3^x) = \\log_{15}12\\), so \\(3^x(1 + 3^x) = 12\\).\n" +
      "Put \\(t = 3^x > 0\\): \\(t^2 + t - 12 = 0\\), \\((t + 4)(t - 3) = 0\\), so \\(t = 3\\) and \\(x = 1\\).\n" +
      "Check: the left side is \\(1 + \\log_{15}4 = \\log_{15}15 + \\log_{15}4 = \\log_{15}60\\), and the right side is \\(\\log_{15}5 + \\log_{15}12 = \\log_{15}60\\). Matches option C." +
      DERIVED,
  },
  {
    id: "f8491cd6-b9ea-4292-aa7a-ed331c39c835",
    label: "NDA 2022-I Q18 quadratic",
    fromKey: "B",
    toKey: "A",
    mustContain: "x^2-ax-bx+ab-c=0",
    solution:
      "The equation is \\(x^2 - (a + b)x + (ab - c) = 0\\) with roots \\(\\alpha, \\beta\\), so \\(\\alpha + \\beta = a + b\\) and \\(\\alpha\\beta = ab - c\\). That gives \\(a + b = \\alpha + \\beta\\) and \\(ab = \\alpha\\beta + c\\).\n" +
      "The quadratic with roots \\(a\\) and \\(b\\) is \\(x^2 - (a + b)x + ab = 0\\), that is \\(x^2 - (\\alpha + \\beta)x + \\alpha\\beta + c = 0\\), or \\(x^2 - \\alpha x - \\beta x + \\alpha\\beta + c = 0\\).\n" +
      "Quick check: the given equation says \\((x - a)(x - b) - c = (x - \\alpha)(x - \\beta)\\), so \\((x - a)(x - b) = (x - \\alpha)(x - \\beta) + c\\). Matches option A." +
      DERIVED,
  },
  {
    id: "5c62111a-5b45-4b42-a863-121a30157fe8",
    label: "NDA 2024-I Q12 matrix statements",
    fromKey: "D",
    toKey: "A",
    mustContain: "C. If \\(A^3=A\\)",
    // The paper numbers the statements 1-3; lettering them A-C clashed with the option letters.
    text:
      "Consider the following statements in respect of a non-singular matrix \\(A\\) of order \\(n\\):\n" +
      "1. \\(A(\\text{adj}\\,A^T) = A(\\text{adj}\\,A)^T\\)\n" +
      "2. If \\(A^2 = A\\), then \\(A\\) is identity matrix of order \\(n\\)\n" +
      "3. If \\(A^3 = A\\), then \\(A\\) is identity matrix of order \\(n\\)\n" +
      "Which of the statements given above are correct?",
    options: { A: "1 and 2 only", B: "2 and 3 only", C: "1 and 3 only", D: "1, 2 and 3" },
    solution:
      "Statement 1: the adjoint of a transpose is the transpose of the adjoint, \\(\\text{adj}(A^T) = (\\text{adj}\\,A)^T\\), so the two sides are equal. Correct.\n" +
      "Statement 2: \\(A^2 = A\\) gives \\(A(A - I) = O\\). Since \\(A\\) is non-singular, multiply on the left by \\(A^{-1}\\): \\(A - I = O\\), so \\(A = I\\). Correct.\n" +
      "Statement 3: \\(A^3 = A\\) gives \\(A(A^2 - I) = O\\), and cancelling \\(A\\) leaves only \\(A^2 = I\\), not \\(A = I\\). For example \\(A = -I\\) is non-singular and \\((-I)^3 = -I = A\\), but \\(A \\ne I\\). Not correct.\n" +
      "Only statements 1 and 2 are correct. Matches option A." +
      DERIVED,
  },

  // ── NDA Maths 2025-I: copied wrong from NDA_Apr2025_QBank.xlsx ────────────
  {
    id: "9990b873-2ce6-49bf-9dd1-077f742c8cd9",
    label: "NDA 2025-I Q34 minimum of p",
    fromKey: "C",
    toKey: "A",
    mustContain: "minimum positive value",
    context: CTX_P_ABS,
    solution:
      "Since \\(\\sin(\\alpha - 90^\\circ) = -\\cos\\alpha\\), \\(p = |\\sin\\alpha + \\cos\\alpha| = \\sqrt{2}\\,|\\sin(\\alpha + 45^\\circ)|\\).\n" +
      "A modulus is never negative, and this one is 0 when \\(\\alpha + 45^\\circ = 180^\\circ\\), that is at \\(\\alpha = 135^\\circ\\): \\(\\sin 135^\\circ + \\cos 135^\\circ = \\dfrac{1}{\\sqrt{2}} - \\dfrac{1}{\\sqrt{2}} = 0\\).\n" +
      "So the minimum value of \\(p\\) is 0. Matches option A." +
      DERIVED,
  },
  {
    id: "49d9d19d-5e2c-4eec-b8cc-6a1adc64a016",
    label: "NDA 2025-I Q35 maximum of p (set sibling)",
    fromKey: "B",
    mustContain: "\\sin(\\alpha - 90°)",
    context: CTX_P_ABS,
    solution:
      "Since \\(\\sin(\\alpha - 90^\\circ) = -\\cos\\alpha\\), \\(p = |\\sin\\alpha + \\cos\\alpha| = \\sqrt{2}\\,|\\sin(\\alpha + 45^\\circ)|\\).\n" +
      "The largest value of \\(|\\sin(\\alpha + 45^\\circ)|\\) is 1, at \\(\\alpha = 45^\\circ\\), so the maximum of \\(p\\) is \\(\\sqrt{2}\\). Matches option B.\n" +
      "Common mistake: taking \\(1 + 1 = 2\\), but \\(\\sin\\alpha\\) and \\(\\cos\\alpha\\) are never both 1 at once.",
  },
  {
    id: "49f6bd22-06da-484d-88ee-075f4ce0be3a",
    label: "NDA 2025-I Q39 PN",
    fromKey: "D",
    toKey: "B",
    mustContain: "\\sqrt{3}-\\sqrt{3}",
    options: {
      A: "\\(\\left(\\dfrac{3-\\sqrt{3}}{2}\\right)a\\)",
      B: "\\(\\left(\\dfrac{3+\\sqrt{3}}{2}\\right)a\\)",
      C: "\\(\\left(\\dfrac{3-\\sqrt{3}}{4}\\right)a\\)",
      D: "\\(\\left(\\dfrac{3+\\sqrt{3}}{4}\\right)a\\)",
    },
    solution:
      "Let the height be \\(MN = h\\). From the angles of elevation, \\(PN = h\\cot 30^\\circ = h\\sqrt{3}\\), \\(QN = h\\cot 45^\\circ = h\\) and \\(RN = h\\cot 60^\\circ = \\dfrac{h}{\\sqrt{3}}\\), so P is farthest from the tower and R nearest.\n" +
      "Then \\(PQ = PN - QN = h(\\sqrt{3} - 1) = a\\), giving \\(h = \\dfrac{a}{\\sqrt{3} - 1} = \\dfrac{(\\sqrt{3} + 1)a}{2}\\).\n" +
      "So \\(PN = h\\sqrt{3} = \\dfrac{\\sqrt{3}(\\sqrt{3} + 1)a}{2} = \\left(\\dfrac{3 + \\sqrt{3}}{2}\\right)a\\). Matches option B." +
      DERIVED,
  },
  {
    id: "c3618086-1c45-4104-a233-32e4e94f66ac",
    label: "NDA 2025-I Q40 MN",
    fromKey: "A",
    mustContain: "\\sqrt{3}+\\sqrt{3}",
    options: {
      A: "\\(\\left(\\dfrac{3+\\sqrt{3}}{2}\\right)b\\)",
      B: "\\(\\left(\\dfrac{3-\\sqrt{3}}{2}\\right)b\\)",
      C: "\\(\\left(\\dfrac{3-\\sqrt{3}}{4}\\right)b\\)",
      D: "\\(\\left(\\dfrac{3+\\sqrt{3}}{4}\\right)b\\)",
    },
    solution:
      "Let the height be \\(MN = h\\). The angles at Q and R are \\(45^\\circ\\) and \\(60^\\circ\\), so \\(QN = h\\) and \\(RN = \\dfrac{h}{\\sqrt{3}}\\).\n" +
      "Then \\(QR = QN - RN = h\\left(1 - \\dfrac{1}{\\sqrt{3}}\\right) = h \\cdot \\dfrac{\\sqrt{3} - 1}{\\sqrt{3}} = b\\), giving \\(h = \\dfrac{\\sqrt{3}\\,b}{\\sqrt{3} - 1} = \\dfrac{\\sqrt{3}(\\sqrt{3} + 1)b}{2} = \\left(\\dfrac{3 + \\sqrt{3}}{2}\\right)b\\). Matches option A.",
  },
  {
    id: "937205fb-14d9-4be3-8be7-11e0670425bc",
    label: "NDA 2025-I Q95 f(16) (set sibling)",
    fromKey: "D",
    mustContain: "f(xy) = f(x)f(y)",
    context: CTX_F_RATIO,
    solution:
      "Put \\(y = x\\): \\(f(1) = \\dfrac{f(x)}{f(x)} = 1\\). Put \\(x = 1\\): \\(f\\left(\\dfrac{1}{y}\\right) = \\dfrac{1}{f(y)}\\). So \\(f(xy) = f\\left(\\dfrac{x}{1/y}\\right) = \\dfrac{f(x)}{f(1/y)} = f(x)f(y)\\).\n" +
      "Then \\(f(4) = f(2)^2 = 9\\) and \\(f(16) = f(4)^2 = 81\\). Matches option D.",
  },
  {
    id: "622e12f7-6ff3-46c3-bc08-65aadd0b7f21",
    label: "NDA 2025-I Q96 f(1)f(4)",
    fromKey: "C",
    mustContain: "\\frac{f(1)}{f(4)}",
    context: CTX_F_RATIO,
    text: "What is \\(f(1)\\,f(4)\\) equal to?",
    solution:
      "Put \\(y = x\\): \\(f(1) = \\dfrac{f(x)}{f(x)} = 1\\). Put \\(x = 1\\): \\(f\\left(\\dfrac{1}{y}\\right) = \\dfrac{1}{f(y)}\\). So \\(f(xy) = f\\left(\\dfrac{x}{1/y}\\right) = \\dfrac{f(x)}{f(1/y)} = f(x)f(y)\\), and \\(f(4) = f(2)f(2) = 9\\).\n" +
      "Hence \\(f(1)\\,f(4) = 1 \\times 9 = 9\\). Matches option C.",
  },

  // ── NDA Maths: copy differed from the paper, key stands ────────────────────
  {
    id: "2edc3844-7df9-457b-80f0-8f8ca92b9f08",
    label: "NDA 2024-II Q112 new mean",
    fromKey: "D",
    mustContain: "\\bar{x}-\\dfrac{x_n-k}{n}",
    options: { C: "\\(\\dfrac{\\bar{x}-x_n-k}{n}\\)" },
    solution:
      "The old total is \\(n\\bar{x}\\). Replacing \\(x_n\\) by \\(k\\) takes \\(x_n\\) out and puts \\(k\\) in, so the new total is \\(n\\bar{x} - x_n + k\\), still over \\(n\\) terms.\n" +
      "New mean \\(= \\dfrac{n\\bar{x} - x_n + k}{n}\\). Matches option D.\n" +
      "Common mistake: option A forgets to divide the change by \\(n\\).",
  },
  {
    id: "0e9bc8db-5744-45aa-a450-a0cc6cb9c5b7",
    label: "NDA 2018-I Q118 probability statements",
    fromKey: "B",
    mustContain: "P(A not B)",
    text:
      "Consider the following in respect of two events \\(A\\) and \\(B\\):\n" +
      "1. \\(P(A \\text{ occurs but not } B) = P(A) - P(B)\\) if \\(B \\subset A\\)\n" +
      "2. \\(P(A \\text{ alone or } B \\text{ alone occurs}) = P(A) + P(B) - P(A \\cap B)\\)\n" +
      "3. \\(P(A \\cup B) = P(A) + P(B)\\) if \\(A\\) and \\(B\\) are mutually exclusive\n" +
      "Which of the above is/are correct?",
    solution:
      "Statement 1: 'A occurs but not B' is the event \\(A \\cap B'\\), and \\(P(A \\cap B') = P(A) - P(A \\cap B)\\). If \\(B \\subset A\\) then \\(A \\cap B = B\\), so \\(P(A \\cap B') = P(A) - P(B)\\). Correct.\n" +
      "Statement 2: 'A alone or B alone' means exactly one of the two occurs: \\(P(A \\cap B') + P(A' \\cap B) = [P(A) - P(A \\cap B)] + [P(B) - P(A \\cap B)] = P(A) + P(B) - 2P(A \\cap B)\\). The statement subtracts \\(P(A \\cap B)\\) only once, which is \\(P(A \\cup B)\\) instead. Not correct.\n" +
      "Statement 3: for mutually exclusive events \\(P(A \\cap B) = 0\\), so \\(P(A \\cup B) = P(A) + P(B)\\). Correct.\n" +
      "Statements 1 and 3 are correct. Matches option B.",
  },

  // ── NDA GAT ────────────────────────────────────────────────────────────────
  {
    id: "9d0f9315-635e-459f-b8f5-f0371a943159",
    label: "NDA 2023-II GAT Q116 Dalton phosphorus",
    fromKey: "C",
    toKey: "D",
    mustContain: "Circle with three-spoke symbol",
    solution:
      "In Dalton's system each element was a small circle with a mark inside. Phosphorus was the circle with three spokes running from the centre to the rim, option (d).\n" +
      "The circle with a cross (+) inside, option (c), is Dalton's symbol for sulphur. A circle with a letter inside marks a metal: L is lead and P is platinum, so options (a) and (b) are not phosphorus either. Matches option D." +
      DERIVED,
  },

  // ── NDA practice + other small fixes ───────────────────────────────────────
  {
    id: "aa228215-8957-485e-bfc6-709de017ec1f",
    label: "NDA practice Binomial Q866 (drop the source note)",
    fromKey: "D",
    mustContain: "NOTE: the source booklet",
    solution:
      "\\(p = \\frac{1}{4}\\), \\(q = \\frac{3}{4}\\). \\(P(\\text{at least one success}) = 1 - \\left(\\frac{3}{4}\\right)^n \\ge \\frac{9}{10} \\Rightarrow \\left(\\frac{3}{4}\\right)^n \\le \\frac{1}{10}\\).\n" +
      "Taking \\(\\log_{10}\\): \\(n(\\log_{10} 3 - \\log_{10} 4) \\le -1\\). Dividing by the negative quantity \\(\\log_{10} 3 - \\log_{10} 4\\) flips the inequality: \\(n(\\log_{10} 4 - \\log_{10} 3) \\ge 1 \\Rightarrow n \\ge \\frac{1}{\\log_{10} 4 - \\log_{10} 3}\\). Matches option D.",
  },
  {
    id: "de62d0c0-725c-45c2-9e8c-c7f7ab3c81e8",
    label: "NDA 2026-II Q89 functional equation (full working)",
    fromKey: "C",
    mustContain: "Matching these for all",
    solution:
      "Expand both sides. \\(f(x) + f\\!\\left(\\tfrac{1}{x}\\right) = x^n + x^{-n} + 2k\\), and \\(f(x)f\\!\\left(\\tfrac{1}{x}\\right) = (x^n + k)(x^{-n} + k) = 1 + k(x^n + x^{-n}) + k^2\\).\n" +
      "Write \\(u = x^n + x^{-n}\\). Setting the two equal: \\(u + 2k = 1 + ku + k^2\\), so \\((1 - k)u = k^2 - 2k + 1 = (1 - k)^2\\).\n" +
      "This must hold for every \\(x\\), but \\(u\\) changes with \\(x\\): it is 2 at \\(x = 1\\) and \\(2^n + 2^{-n} > 2\\) at \\(x = 2\\). An equation \\((1 - k)u = (1 - k)^2\\) can hold for two different values of \\(u\\) only if \\(1 - k = 0\\). So \\(k = 1\\) and \\(f(x) = x^n + 1\\).\n" +
      "Then \\(f(2) = 2^n + 1 = 9\\) gives \\(2^n = 8\\), so \\(n = 3\\) and \\(f(x) = x^3 + 1\\).\n" +
      "Hence \\(f(-1) = (-1)^3 + 1 = 0\\). Matches option C.",
  },
  {
    id: "80cd7000-ceeb-4013-a7f6-4ca0127eec79",
    label: "NDA Oswaal Mock 3 Biology Q115 (match table)",
    fromKey: "B",
    mustContain: "|  |  |",
    text:
      "Match List I with List II and select the correct answer using the codes given below the lists:\n\n" +
      "| List I (Disease) | List II (Diagnosis) |\n" +
      "|---|---|\n" +
      "| A. AIDS | 1. Widal Test |\n" +
      "| B. Tuberculosis | 2. Wayson Stain Test |\n" +
      "| C. Typhoid | 3. ELISA Test |\n" +
      "|  | 4. Mantoux Test |",
  },
  {
    id: "9b3ede98-7afb-4007-8889-60c1f3498dd2",
    label: "NDA GAT practice LWS Mock L3 Q4 (stray line break)",
    fromKey: "A",
    mustContain: "this\nmedicine",
    text: "The shopkeeper said to me, \"I will not give you this medicine without prescription.\"",
  },
  {
    id: "cc638341-314f-4046-a482-5d05ad845401",
    label: "NDA Physics LWS test Q3 (option B misprint)",
    fromKey: "C",
    toKey: "B",
    mustContain: "wire is is",
    text: "If the resistance of wire is \\(10\\,\\Omega\\). Its length is increased by 10% by stretching. The new resistance will be",
    options: { B: "\\(12.1\\,\\Omega\\)" },
    solution:
      "Stretching a wire keeps its volume fixed, so \\(AL\\) is constant and \\(R = \\dfrac{\\rho L}{A} = \\dfrac{\\rho L^{2}}{AL} \\propto L^{2}\\).\n" +
      "\\(L' = 1.1L\\), so \\(R' = R(1.1)^{2} = 10 \\times 1.21 = 12.1\\,\\Omega\\). Matches option B.\n\n" +
      "[The source test prints option (b) as 1.2 ohm, a misprint of 12.1 ohm, corrected here.]",
  },

  // ── JEE ────────────────────────────────────────────────────────────────────
  {
    id: "4d2d4673-66a0-4c78-a1a4-a5b59206d6f1",
    label: "JEE 2025-Jan-28 Chemistry Q46 (stem formatting)",
    fromKey: null,
    mustContain: "\\text{~concentration~}",
    text:
      "Given below is the plot of the molar conductivity vs \\(\\sqrt{\\text{concentration}}\\) for KCl in aqueous solution. If, for the higher concentration of KCl solution, the resistance of the conductivity cell is \\(100\\,\\Omega\\), then the resistance of the same cell with the dilute solution is \\(x\\,\\Omega\\). The value of \\(x\\) is \\(\\_\\_\\_\\_\\_\\_\\) (Nearest integer)",
  },

  // ── Maharashtra State Board Class 11 ───────────────────────────────────────
  {
    id: "ffdc9e7e-e7f4-4074-b5b9-c54955c645b8",
    label: "MH SB 11 Conic Sections Misc I Q11 (powers set on the line)",
    fromKey: "C",
    mustContain: "2\\ \\tfrac{1}{2}",
    options: {
      A: "\\(\\dfrac{1}{2}\\)",
      B: "\\(\\dfrac{1}{2^{1/2}}\\)",
      C: "\\(2^{1/2}\\)",
      D: "\\(\\dfrac{1}{3^{1/2}}\\)",
    },
    solution:
      "For a rectangular hyperbola \\(a = b\\), so \\(e^2 = 1 + \\dfrac{b^2}{a^2} = 2\\) and \\(e = \\sqrt{2} = 2^{1/2}\\). Matches option C. It is also the only option greater than 1, as the eccentricity of every hyperbola must be.\n\n" +
      "[The textbook sets the power 1/2 on the line in these options, so \\(2^{1/2}\\) reads like the mixed number 2 1/2. They are shown here as the powers they stand for.]",
  },
  {
    id: "0c44b997-1c74-4637-b405-9d484f7dd933",
    label: "MH SB 11 Chemistry Organic Ex Q15(A) (stray dot in option A)",
    fromKey: "C",
    mustContain: "a. and b",
    options: { A: "a and b" },
  },

  // ── MHT-CET (hash kept: tied to the source text) ───────────────────────────
  {
    id: "354a93dd-bc28-471b-911f-dacb07ef0074",
    label: "MHT-CET 2024 12-May S1 Q111 (flawed as printed, key kept)",
    fromKey: "A",
    mustContain: "at \\((1,1)\\)",
    solution:
      "[As printed, this question is flawed: the point \\((1, 1)\\) lies on neither curve, since \\(2(1)^2 = 2 \\ne 1\\). The answer key gives option A, found by putting \\(x = 1\\) and \\(y = 1\\) into the two slope formulas, and that is the answer recorded here.]\n\n" +
      "For \\(y = 2x^2\\), \\(\\dfrac{dy}{dx} = 4x\\), which is 4 at \\(x = 1\\). For \\(x = 2y^2\\), \\(1 = 4y\\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{1}{4y}\\), which is \\(\\dfrac{1}{4}\\) at \\(y = 1\\).\n" +
      "Then \\(\\tan\\theta = \\left|\\dfrac{4 - \\frac{1}{4}}{1 + 4 \\cdot \\frac{1}{4}}\\right| = \\dfrac{15/4}{2} = \\dfrac{15}{8}\\). Matches option A.\n\n" +
      "The curves actually meet at \\((0, 0)\\) and \\(\\left(\\tfrac{1}{2}, \\tfrac{1}{2}\\right)\\). At \\(\\left(\\tfrac{1}{2}, \\tfrac{1}{2}\\right)\\) the slopes are \\(2\\) and \\(\\tfrac{1}{2}\\), so \\(\\tan\\theta = \\dfrac{2 - \\frac{1}{2}}{1 + 1} = \\dfrac{3}{4}\\), which is option C.",
  },
  {
    id: "89b647b0-04e7-424c-9753-cb564c8aebde",
    label: "MHT-CET 2025 25-Apr S2 Q141 (acute angle)",
    fromKey: "A",
    toKey: "B",
    mustContain: "(matching option A)",
    solution:
      "The curves meet where \\(3^x = 7^x\\), that is at \\(x = 0\\), the point \\((0, 1)\\). Slopes there: \\(\\dfrac{d}{dx}3^x = 3^x\\log 3\\) gives \\(m_1 = \\log 3\\), and \\(\\dfrac{d}{dx}7^x = 7^x\\log 7\\) gives \\(m_2 = \\log 7\\).\n" +
      "The angle of intersection is the acute angle between the tangents: \\(\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\left|\\dfrac{\\log 3 - \\log 7}{1 + (\\log 3)(\\log 7)}\\right|\\). The numerator is negative and the denominator positive, so \\(\\tan\\theta = \\dfrac{\\log 7 - \\log 3}{1 + (\\log 3)(\\log 7)} = \\dfrac{\\log\\left(\\frac{7}{3}\\right)}{1 + (\\log 3)(\\log 7)}\\). Matches option B.\n\n" +
      "[The source answer key marks option A, but A has a negative tangent and describes the obtuse angle between the curves; the key's own working lists both values.]",
  },
];

type Opt = { id: string; label: string; text: string; is_correct: boolean };

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id,question_format,text,context,solution,content_hash,exams(name),options(id,label,text,is_correct)")
    .in("id", FIXES.map((f) => f.id));
  if (error) throw error;
  const byId = new Map((data as any[]).map((q) => [q.id, q]));

  let refused = 0;
  const refuse = (f: Fix, why: string) => {
    console.error(`REFUSE ${f.label}: ${why}`);
    refused++;
  };
  const plan: { f: Fix; q: any; opts: Opt[]; key: string | null; hash: string }[] = [];

  for (const f of FIXES) {
    const q = byId.get(f.id);
    if (!q) {
      refuse(f, "id not found");
      continue;
    }
    const opts = [...((q.options ?? []) as Opt[])].sort((a, b) => a.label.localeCompare(b.label));
    const stored = opts.find((o) => o.is_correct)?.label ?? null;
    if (stored !== f.fromKey) {
      refuse(f, `stored key is ${stored}, expected ${f.fromKey}`);
      continue;
    }
    const haystack = [q.text, q.context ?? "", q.solution ?? "", ...opts.map((o) => o.text)].join("\n");
    if (!haystack.includes(f.mustContain)) {
      refuse(f, `row no longer contains ${JSON.stringify(f.mustContain)}; it changed since it was read`);
      continue;
    }
    const key = f.toKey ?? f.fromKey;
    if (key && !opts.some((o) => o.label === key)) {
      refuse(f, `no option labelled ${key}`);
      continue;
    }
    for (const label of Object.keys(f.options ?? {})) {
      if (!opts.some((o) => o.label === label)) refuse(f, `no option labelled ${label} to rewrite`);
    }
    const authored = [f.text, f.context, f.solution, ...Object.values(f.options ?? {})].filter(
      (s): s is string => typeof s === "string"
    );
    if (authored.some((s) => CTRL.test(s) || s.includes("\\\\("))) {
      refuse(f, "control character or double-escaped delimiter in authored text");
      continue;
    }

    const newText = f.text ?? q.text;
    const newContext = f.context ?? q.context;
    const newOpts = opts.map((o) => ({ ...o, text: f.options?.[o.label] ?? o.text }));
    const exam = q.exams?.name as string;
    let hash = q.content_hash as string;
    if (!KEEP_SOURCE_HASH.has(exam)) {
      hash =
        q.question_format === "numeric"
          ? numericContentHash(newText, newContext)
          : contentHash(newText, newOpts.map((o) => o.text), key!);
    }
    plan.push({ f, q, opts: newOpts, key, hash });

    console.log(`\n${f.label}  [${exam}]`);
    if (f.text) console.log(`  text     -> ${f.text.replace(/\n/g, " / ").slice(0, 110)}`);
    if (f.context) console.log(`  context  -> ${f.context}`);
    for (const [l, t] of Object.entries(f.options ?? {})) console.log(`  option ${l} -> ${t}`);
    if (f.toKey) console.log(`  KEY ${f.fromKey} -> ${f.toKey}`);
    if (f.solution) console.log(`  solution -> ${f.solution.replace(/\n/g, " ").slice(0, 110)}...`);
    console.log(
      `  content_hash ${hash === q.content_hash ? "unchanged" : `${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}`}`
    );
  }

  // A new hash that another row already carries would trip the per-exam unique
  // index halfway through the writes, so refuse up front instead.
  const moved = plan.filter((p) => p.hash !== p.q.content_hash);
  if (moved.length) {
    const { data: clash, error: ce } = await db
      .from("questions")
      .select("id,content_hash")
      .in("content_hash", moved.map((p) => p.hash));
    if (ce) throw ce;
    for (const c of clash ?? []) {
      const p = moved.find((m) => m.hash === c.content_hash)!;
      if (c.id !== p.q.id) refuse(p.f, `new content_hash already used by question ${c.id}`);
    }
  }

  if (refused) {
    console.error(`\n${refused} refusal(s): nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN: ${plan.length} row(s) would change. Re-run with --apply.`);
    return;
  }

  for (const p of plan) {
    for (const o of p.opts) {
      const orig = (p.q.options as Opt[]).find((x) => x.id === o.id)!;
      const isCorrect = p.key !== null && o.label === p.key;
      if (orig.text === o.text && orig.is_correct === isCorrect) continue;
      const uo = await db.from("options").update({ text: o.text, is_correct: isCorrect }).eq("id", o.id);
      if (uo.error) throw uo.error;
    }
    const patch: Record<string, string> = { content_hash: p.hash };
    if (p.f.text) patch.text = p.f.text;
    if (p.f.context) patch.context = p.f.context;
    if (p.f.solution) patch.solution = p.f.solution;
    const up = await db.from("questions").update(patch).eq("id", p.q.id);
    if (up.error) throw up.error;
    console.log(`applied: ${p.f.label}`);
  }
  console.log(`\n${plan.length} row(s) fixed. Re-grade the affected mocks with scripts/reviews/regrade-attempt.ts.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
