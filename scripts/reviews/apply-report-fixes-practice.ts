/**
 * Apply SOURCE-VERIFIED repairs for the 10 PRACTICE rows REPORTed by the
 * 2026-08-25 hand-wave sweep (RULE 5) and adjudicated 2026-08-26.
 *
 *   npx tsx scripts/reviews/apply-report-fixes-practice.ts            # dry run
 *   npx tsx scripts/reviews/apply-report-fixes-practice.ts --apply
 *
 * WHAT THE SOURCE SAID. Every row was read off the printed practice booklet
 * (C:\tmp\Practice\Maths, the PDFs `scripts/practice/config.ts` points at) and
 * every stored key was checked against the booklet's own printed answer key.
 *
 *   ALL TEN KEYS WERE ALREADY CORRECT — 10/10 matched the printed key.
 *
 * So not one of these is a wrong answer. Eight are TRANSCRIPTION defects (our
 * vision ingest corrupted the stem, the options, or both) and two are BOOK
 * defects where our transcription is byte-faithful and the printed page is
 * itself wrong. That split is the whole reason the source had to be read
 * instead of reasoned about: the rewriters' reconstructions of the "intended"
 * stem were wrong on 3 of the 4 rows where they offered one.
 *
 * KEYS ARE NEVER TOUCHED HERE. This script edits stem/option/solution text
 * only; `is_correct` is left exactly as stored, and the script asserts the key
 * it recomputes the hash with is the key it read.
 *
 * CONTENT_HASH is recomputed wherever stem or option text changes — that text
 * is the dedup preimage, and a stale hash would let a re-ingest of the
 * corrected source insert a duplicate. Row ids are preserved so any
 * paper_questions / mock refs stay valid.
 *
 * GUARDS (each has caught a real mistake in this repo):
 *   - a `find` must match EXACTLY ONCE, else the whole batch is refused;
 *   - `find === to` is refused (that is what a shell-mangled needle looks like);
 *   - a `rewriteSolution` identical to the stored solution is refused;
 *   - control characters and double-escaped delimiters are refused.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Edit = { field: "text" | "solution" | `option:${string}`; find: string; to: string };
type Fix = {
  id: string;
  qnum: string;
  source: string;
  why: string;
  edits: Edit[];
  rewriteSolution?: string;
};

const FIXES: Fix[] = [
  // ───────────────────────── 3D Geometry ─────────────────────────
  {
    id: "e7e39e1c-4e6d-462e-92b2-fc42c620a31e",
    qnum: "2007",
    source: "3D Geometry booklet, PDF page index 11, left column",
    why:
      "THREE transcription defects. The printed first line is (x-2)/2 = (y-1)/5 = (z+3)/-3; we had (x-1)/2 and a y-denominator of 3. Printed option (b) is 23/(9*sqrt38); we had 3/(9*sqrt38). With the printed direction (2,5,-3) the magnitude is exactly sqrt(38) — which is what every option's denominator already implied — and the dot with (-1,8,4) is 26. Key D confirmed by the booklet's printed key.",
    edits: [
      { field: "text", find: "\\dfrac{x-1}{2} = \\dfrac{y-1}{3}", to: "\\dfrac{x-2}{2} = \\dfrac{y-1}{5}" },
      { field: "option:B", find: "\\dfrac{3}{9\\sqrt{38}}", to: "\\dfrac{23}{9\\sqrt{38}}" },
    ],
    rewriteSolution:
      "The angle between two lines is the angle between their direction vectors.\n\n" +
      "Read the directions off the denominators: \\(\\vec{a} = (2,\\,5,\\,-3)\\) and \\(\\vec{b} = (-1,\\,8,\\,4)\\).\n\n" +
      "Magnitudes: \\(|\\vec{a}| = \\sqrt{2^2+5^2+(-3)^2} = \\sqrt{4+25+9} = \\sqrt{38}\\) and " +
      "\\(|\\vec{b}| = \\sqrt{(-1)^2+8^2+4^2} = \\sqrt{1+64+16} = \\sqrt{81} = 9\\).\n\n" +
      "Dot product: \\(\\vec{a}\\cdot\\vec{b} = (2)(-1) + (5)(8) + (-3)(4) = -2 + 40 - 12 = 26\\).\n\n" +
      "Therefore \\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\,|\\vec{b}|} = \\dfrac{26}{9\\sqrt{38}}\\), " +
      "so \\(\\theta = \\cos^{-1}\\!\\left(\\dfrac{26}{9\\sqrt{38}}\\right)\\). Hence (D).",
  },
  {
    id: "d677d35f-54ba-4373-9734-54998a6097c3",
    qnum: "2010",
    source: "3D Geometry booklet, PDF page index 11, left column",
    why:
      "FIVE transcription defects. Printed: (x+2)/(4L+1) = (y-1)/4 = z/-18 and x/-3 = (y+1)/(5M-3) = (z-1)/6. We had y-2, x/1 and (z-1)/9. Printed options (a) and (b) are (-2, 1/3) and (2, -1/3); we had (2, -1/3) and (2, -2/3) — our (A) was in fact (b)'s value, so the option block was shifted as well as corrupted. Key C confirmed by the booklet's printed key.",
    edits: [
      { field: "text", find: "\\dfrac{y-2}{4}", to: "\\dfrac{y-1}{4}" },
      { field: "text", find: "\\dfrac{x}{1}", to: "\\dfrac{x}{-3}" },
      { field: "text", find: "\\dfrac{z-1}{9}", to: "\\dfrac{z-1}{6}" },
      { field: "option:A", find: "\\left(2, -\\dfrac{1}{3}\\right)", to: "\\left(-2, \\dfrac{1}{3}\\right)" },
      { field: "option:B", find: "\\left(2, -\\dfrac{2}{3}\\right)", to: "\\left(2, -\\dfrac{1}{3}\\right)" },
    ],
    rewriteSolution:
      "Two lines are parallel exactly when their direction vectors are proportional.\n\n" +
      "Directions: \\((4\\lambda+1,\\ 4,\\ -18)\\) and \\((-3,\\ 5\\mu-3,\\ 6)\\).\n\n" +
      "Proportional means \\((4\\lambda+1,\\,4,\\,-18) = t\\,(-3,\\,5\\mu-3,\\,6)\\) for some \\(t \\neq 0\\). " +
      "The \\(z\\)-components are the only pair with both entries known, so they fix \\(t\\) first: " +
      "\\(-18 = 6t \\Rightarrow t = -3\\).\n\n" +
      "Now use that \\(t\\) in the other two components.\n" +
      "\\(x\\): \\(4\\lambda + 1 = -3(-3) = 9 \\Rightarrow 4\\lambda = 8 \\Rightarrow \\lambda = 2\\).\n" +
      "\\(y\\): \\(4 = -3(5\\mu - 3) \\Rightarrow 5\\mu - 3 = -\\dfrac43 \\Rightarrow 5\\mu = 3 - \\dfrac43 = \\dfrac53 \\Rightarrow \\mu = \\dfrac13\\).\n\n" +
      "Check: the directions become \\((9,4,-18)\\) and \\((-3,-\\tfrac43,6)\\), and indeed " +
      "\\((9,4,-18) = -3\\left(-3,-\\tfrac43,6\\right)\\). So \\((\\lambda,\\mu) = \\left(2,\\ \\dfrac13\\right)\\). Hence (C).",
  },
  {
    id: "c0a31791-5fda-4d01-8613-9a73380685ae",
    qnum: "2013",
    source: "3D Geometry booklet, PDF page index 11, right column",
    why:
      "TWO transcription defects. Printed: x - 1 = (2y+3)/3 = (z-5)/2 and x = 3r + 2; y = -2r - 1; z = 2. We had a denominator of 2 under 2y+3, and the second line's parametric form was mangled into 'x = 3y - 2 = -2r - 1', which is not a line at all. With the printed stem the directions are (2,3,4) and (3,-2,0), whose dot product is 6 - 6 + 0 = 0. Key D confirmed by the booklet's printed key.",
    edits: [
      { field: "text", find: "\\dfrac{2y+3}{2}", to: "\\dfrac{2y+3}{3}" },
      { field: "text", find: "x = 3y - 2 = -2r - 1; z = 2", to: "x = 3r + 2; \\, y = -2r - 1; \\, z = 2" },
    ],
    rewriteSolution:
      "Put each line into direction-vector form.\n\n" +
      "First line: set \\(x - 1 = \\dfrac{2y+3}{3} = \\dfrac{z-5}{2} = t\\). Then \\(x = t+1\\), " +
      "\\(y = \\dfrac{3t-3}{2}\\) and \\(z = 2t+5\\), so the direction is " +
      "\\(\\left(1,\\ \\tfrac32,\\ 2\\right)\\), or after clearing the fraction \\(\\vec{a} = (2,\\,3,\\,4)\\).\n\n" +
      "Second line: \\(x = 3r+2\\), \\(y = -2r-1\\), \\(z = 2\\). Differentiating with respect to the " +
      "parameter \\(r\\) gives the direction \\(\\vec{b} = (3,\\,-2,\\,0)\\) — the \\(z\\)-component is 0 " +
      "because \\(z\\) is constant on that line.\n\n" +
      "Now test for perpendicularity: \\(\\vec{a}\\cdot\\vec{b} = (2)(3) + (3)(-2) + (4)(0) = 6 - 6 + 0 = 0\\).\n\n" +
      "A zero dot product means the angle is \\(\\dfrac{\\pi}{2}\\). Hence (D).",
  },
  {
    id: "35ea0233-9a59-4fca-a388-829cf0d35fbe",
    qnum: "2023",
    source: "3D Geometry booklet, PDF page index 12, left column",
    why:
      "ONE transcription defect. The printed line is (x+1)/2 = (y+1)/3 = (z+1)/4; we had y-1. With the printed line the parameter comes out at exactly 1 and P = (1,2,3), giving OP = sqrt(14). Key A confirmed by the booklet's printed key.",
    edits: [{ field: "text", find: "\\dfrac{y-1}{3}", to: "\\dfrac{y+1}{3}" }],
    rewriteSolution:
      "Write a general point of the line using the parameter \\(t\\):\n" +
      "\\(\\dfrac{x+1}{2} = \\dfrac{y+1}{3} = \\dfrac{z+1}{4} = t\\) gives " +
      "\\((x,y,z) = (2t-1,\\ 3t-1,\\ 4t-1)\\).\n\n" +
      "Substitute into the plane \\(x + 2y + 3z = 14\\):\n" +
      "\\((2t-1) + 2(3t-1) + 3(4t-1) = 2t - 1 + 6t - 2 + 12t - 3 = 20t - 6\\).\n\n" +
      "Set that equal to 14: \\(20t - 6 = 14 \\Rightarrow 20t = 20 \\Rightarrow t = 1\\).\n\n" +
      "So \\(P = (2-1,\\ 3-1,\\ 4-1) = (1,\\ 2,\\ 3)\\), and it does satisfy the plane: " +
      "\\(1 + 4 + 9 = 14\\).\n\n" +
      "Finally \\(OP = \\sqrt{1^2 + 2^2 + 3^2} = \\sqrt{1+4+9} = \\sqrt{14}\\). Hence (A).",
  },

  // ───────────────────────── Vectors ─────────────────────────
  {
    id: "ca6660d0-239a-438b-901f-a8461df2b6fe",
    qnum: "1803",
    source: "3D Geometry booklet (Vectors section), PDF page index 1, left column",
    why:
      "A BOOK defect plus two transcription defects. The printed question names FOUR points P, Q, R, S and prints only THREE position vectors — the book omits Q's. Our transcription then corrupted two of the three it did print (3i+3j became 3i+j, and -3i+2j became i+2j). The omitted vector is not guessed: with P, R, S fixed, PQRS is a parallelogram for exactly one Q, namely 4i, and the booklet's own key (a) asserts it is a parallelogram. Key A confirmed by the booklet's printed key.",
    edits: [
      {
        field: "text",
        find:
          "position vectors \\(-2\\hat{i} - \\hat{j}, 3\\hat{i} + \\hat{j}\\) and \\(\\hat{i} + 2\\hat{j}\\) respectively",
        to:
          "position vectors \\(-2\\hat{i} - \\hat{j}\\), \\(4\\hat{i}\\), \\(3\\hat{i} + 3\\hat{j}\\) and \\(-3\\hat{i} + 2\\hat{j}\\) respectively",
      },
    ],
    rewriteSolution:
      "Write the four points as coordinates: \\(P(-2,-1)\\), \\(Q(4,0)\\), \\(R(3,3)\\), \\(S(-3,2)\\).\n\n" +
      "**Is it a parallelogram?** Compare one pair of opposite sides as vectors:\n" +
      "\\(\\vec{PQ} = Q - P = (4-(-2),\\ 0-(-1)) = (6,\\,1)\\)\n" +
      "\\(\\vec{SR} = R - S = (3-(-3),\\ 3-2) = (6,\\,1)\\)\n" +
      "They are equal, so \\(PQ\\) and \\(SR\\) are parallel and of equal length — PQRS is a parallelogram.\n\n" +
      "**Is it a rhombus?** That needs adjacent sides equal. " +
      "\\(|\\vec{PQ}| = \\sqrt{6^2+1^2} = \\sqrt{37}\\), while \\(\\vec{QR} = R - Q = (-1,\\,3)\\) gives " +
      "\\(|\\vec{QR}| = \\sqrt{1+9} = \\sqrt{10}\\). Since \\(\\sqrt{37} \\neq \\sqrt{10}\\), it is not a rhombus.\n\n" +
      "**Is it a rectangle?** That needs adjacent sides perpendicular. " +
      "\\(\\vec{PQ}\\cdot\\vec{QR} = (6)(-1) + (1)(3) = -6 + 3 = -3 \\neq 0\\), so it is not a rectangle.\n\n" +
      "A parallelogram that is neither a rhombus nor a rectangle. Hence (A).\n\n" +
      "[Textbook: the printed question names four points P, Q, R, S but prints only three position vectors — the one for Q is missing from the page. It is restored above as \\(4\\hat{i}\\), which is the unique choice making PQRS a parallelogram, as the book's own answer key (a) requires: \\(Q = P + (R - S) = (-2,-1) + (6,1) = (4,0)\\).]",
  },
  {
    id: "9bf3f0a3-00d1-481f-a98c-903d8c16a5d4",
    qnum: "1831",
    source: "3D Geometry booklet (Vectors section), PDF page index 2, right column",
    why:
      "The stem's data was symbolised away. The printed sides are the CONCRETE vectors i + j - k and 2i - 3j + k; our transcription rendered them as a + b and 2a - 3b, which is why the question appeared to state no magnitudes and no angle. Three distractors were also corrupted: printed (b), (c), (d) are sqrt3/sqrt14, sqrt13/sqrt14 and sqrt21/sqrt3. Key A confirmed by the booklet's printed key.",
    edits: [
      { field: "text", find: "\\(\\vec{a} + \\vec{b}\\)", to: "\\(\\hat{i} + \\hat{j} - \\hat{k}\\)" },
      { field: "text", find: "\\(2\\vec{a} - 3\\vec{b}\\)", to: "\\(2\\hat{i} - 3\\hat{j} + \\hat{k}\\)" },
      { field: "option:B", find: "\\sqrt{3}, \\sqrt{4}", to: "\\sqrt{3}, \\sqrt{14}" },
      { field: "option:C", find: "\\sqrt{21}, \\sqrt{4}", to: "\\sqrt{13}, \\sqrt{14}" },
      { field: "option:D", find: "\\sqrt{21}, \\sqrt{5}", to: "\\sqrt{21}, \\sqrt{3}" },
    ],
    rewriteSolution:
      "If \\(\\vec{u}\\) and \\(\\vec{v}\\) are adjacent sides of a parallelogram, its diagonals are " +
      "\\(\\vec{u} + \\vec{v}\\) and \\(\\vec{u} - \\vec{v}\\).\n\n" +
      "Here \\(\\vec{u} = \\hat{i} + \\hat{j} - \\hat{k} = (1,\\,1,\\,-1)\\) and " +
      "\\(\\vec{v} = 2\\hat{i} - 3\\hat{j} + \\hat{k} = (2,\\,-3,\\,1)\\).\n\n" +
      "First diagonal: \\(\\vec{u} + \\vec{v} = (1+2,\\ 1-3,\\ -1+1) = (3,\\,-2,\\,0)\\), so its length is " +
      "\\(\\sqrt{3^2 + (-2)^2 + 0^2} = \\sqrt{9+4} = \\sqrt{13}\\).\n\n" +
      "Second diagonal: \\(\\vec{u} - \\vec{v} = (1-2,\\ 1+3,\\ -1-1) = (-1,\\,4,\\,-2)\\), so its length is " +
      "\\(\\sqrt{1 + 16 + 4} = \\sqrt{21}\\).\n\n" +
      "The diagonals are \\(\\sqrt{21}\\) and \\(\\sqrt{13}\\). Hence (A).",
  },

  // ───────────────── Calculus / Trigonometry — BOOK defects ─────────────────
  {
    id: "ce7779cd-0984-4b44-8ff2-a26fd6faabb2",
    qnum: "2406",
    source: "Calculus booklet, PDF page index 1, left column",
    why:
      "BOOK DEFECT — our transcription is byte-faithful. The printed stem really does show a MINUS between 2x and the radical (verified at 12x zoom), but the printed domain and the printed key both belong to the PRODUCT form 2x*sqrt(1-x^2). No stem edit; the solution now derives the intended reading and names the defect. Key C confirmed by the booklet's printed key.",
    edits: [],
    rewriteSolution:
      "Substitute \\(x = \\sin t\\). The stated domain \\(-\\dfrac{1}{\\sqrt2} \\le x \\le \\dfrac{1}{\\sqrt2}\\) " +
      "corresponds to \\(-\\dfrac{\\pi}{4} \\le t \\le \\dfrac{\\pi}{4}\\).\n\n" +
      "Then \\(2x\\sqrt{1-x^2} = 2\\sin t\\cos t = \\sin 2t\\).\n\n" +
      "Because \\(t\\) lies in \\(\\left[-\\dfrac{\\pi}{4},\\dfrac{\\pi}{4}\\right]\\), the angle \\(2t\\) lies in " +
      "\\(\\left[-\\dfrac{\\pi}{2},\\dfrac{\\pi}{2}\\right]\\), which is exactly the principal range of " +
      "\\(\\sin^{-1}\\). So \\(\\sin^{-1}(\\sin 2t) = 2t\\) with no adjustment, and\n" +
      "\\(y = 2t = 2\\sin^{-1}x\\).\n\n" +
      "Differentiating, \\(\\dfrac{dy}{dx} = \\dfrac{2}{\\sqrt{1-x^2}}\\). Hence (C).\n\n" +
      "[Textbook: the printed stem shows \\(\\sin^{-1}\\!\\left(2x - \\sqrt{1-x^2}\\right)\\), a difference. " +
      "That cannot be the intended function: at \\(x = -0.4\\) the argument is \\(-1.7165\\), outside " +
      "\\([-1,1]\\), so \\(y\\) is not even real on the domain the question itself states, and its " +
      "derivative matches no option. The printed domain is precisely the range on which " +
      "\\(\\sin^{-1}\\!\\left(2x\\sqrt{1-x^2}\\right) = 2\\sin^{-1}x\\), and the printed answer " +
      "\\(2/\\sqrt{1-x^2}\\) is the derivative of that. The minus sign is a misprint for a product.]",
  },
  {
    id: "630637a2-9f90-4a0f-8f42-b0d8f4487c81",
    qnum: "1163",
    source: "Trigonometry booklet, PDF page index 7, right column",
    why:
      "BOOK DEFECT — our transcription is byte-faithful. The printed numerator really is 2cos2B - 1 (verified at 16x zoom), but that relation gives tan^2 A = (1+7t^2)/(3+t^2), which matches no option. The intended numerator is 3cos2B - 1. No stem edit; the solution derives the intended reading and names the defect. Key A confirmed by the booklet's printed key.",
    edits: [],
    rewriteSolution:
      "Use \\(\\cos 2\\theta = \\dfrac{1-\\tan^2\\theta}{1+\\tan^2\\theta}\\) on both sides. " +
      "Write \\(t = \\tan\\alpha\\) and \\(u = \\tan\\beta\\), and take the intended relation " +
      "\\(\\cos 2\\alpha = \\dfrac{3\\cos 2\\beta - 1}{3 - \\cos 2\\beta}\\).\n\n" +
      "Right-hand side, substituting \\(\\cos 2\\beta = \\dfrac{1-u^2}{1+u^2}\\):\n" +
      "numerator \\(= \\dfrac{3(1-u^2) - (1+u^2)}{1+u^2} = \\dfrac{2 - 4u^2}{1+u^2}\\),\n" +
      "denominator \\(= \\dfrac{3(1+u^2) - (1-u^2)}{1+u^2} = \\dfrac{2 + 4u^2}{1+u^2}\\).\n\n" +
      "The \\((1+u^2)\\) cancels, leaving \\(\\dfrac{2-4u^2}{2+4u^2} = \\dfrac{1-2u^2}{1+2u^2}\\).\n\n" +
      "So \\(\\dfrac{1-t^2}{1+t^2} = \\dfrac{1-2u^2}{1+2u^2}\\). Cross-multiplying, " +
      "\\((1-t^2)(1+2u^2) = (1+t^2)(1-2u^2)\\), which expands to " +
      "\\(1 + 2u^2 - t^2 - 2t^2u^2 = 1 - 2u^2 + t^2 - 2t^2u^2\\). " +
      "The \\(1\\) and the \\(2t^2u^2\\) cancel from both sides, giving \\(4u^2 = 2t^2\\), i.e. \\(t^2 = 2u^2\\).\n\n" +
      "Therefore \\(\\tan\\alpha = \\sqrt{2}\\,\\tan\\beta\\). Hence (A).\n\n" +
      "[Textbook: the printed numerator is \\(2\\cos 2\\beta - 1\\). The same substitution then gives " +
      "\\(\\tan^2\\alpha = \\dfrac{1 + 7\\tan^2\\beta}{3 + \\tan^2\\beta}\\), which matches none of the four " +
      "options — e.g. \\(\\beta = 30^\\circ\\) forces \\(\\cos 2\\alpha = 0\\) and \\(\\tan\\alpha = 1\\), while " +
      "the options give 0.816, 0.408, 0.236 and 0.577. Note the trap: the printed and intended relations " +
      "agree only at \\(\\tan^2\\beta = 1\\), so a spot-check at \\(\\beta = 45^\\circ\\) — the natural angle " +
      "to try — passes by coincidence and appears to confirm the misprint.]",
  },

  // ───────────────────────── Algebra ─────────────────────────
  {
    id: "1985017e-003e-4cc8-b473-917124956f2f",
    qnum: "741",
    source: "Algebra booklet, PDF page index 35, right column",
    why:
      "TWO transcription defects. The printed stem says the other 2 questions have TWO options each, namely true and false; we had 'three options each (A, B, C)', which makes the keyed probability unreachable. Printed option (a) is 5/32, not 3/32. With two-option questions the sum is exactly 3/64. Key D confirmed by the booklet's printed key.",
    edits: [
      {
        field: "text",
        find: "(A, B, C, D) and two questions have three options each (A, B, C).",
        to: "(A, B, C, D) with one option being the correct answer. The other 2 questions have two options each, namely true and false.",
      },
      { field: "option:A", find: "\\dfrac{3}{32}", to: "\\dfrac{5}{32}" },
    ],
    rewriteSolution:
      "Ticking at random, the chance of being right is \\(\\dfrac14\\) on each of the three four-option " +
      "questions and \\(\\dfrac12\\) on each of the two true/false questions.\n\n" +
      "\"At least four correct\" out of five means all five correct, or exactly four correct.\n\n" +
      "**All five correct:** \\(\\left(\\dfrac14\\right)^3\\left(\\dfrac12\\right)^2 = \\dfrac{1}{64}\\cdot\\dfrac14 = \\dfrac{1}{256}\\).\n\n" +
      "**Exactly four correct** — one question is wrong, and there are two cases for which one.\n" +
      "A four-option question is the wrong one (3 ways to choose it): " +
      "\\(3 \\times \\left(\\dfrac14\\right)^2\\left(\\dfrac34\\right)\\left(\\dfrac12\\right)^2 = 3 \\times \\dfrac{3}{64} \\times \\dfrac14 = \\dfrac{9}{256}\\).\n" +
      "A true/false question is the wrong one (2 ways): " +
      "\\(2 \\times \\left(\\dfrac14\\right)^3\\left(\\dfrac12\\right)\\left(\\dfrac12\\right) = 2 \\times \\dfrac{1}{64}\\times\\dfrac14 = \\dfrac{2}{256}\\).\n\n" +
      "Adding all three pieces: \\(\\dfrac{1}{256} + \\dfrac{9}{256} + \\dfrac{2}{256} = \\dfrac{12}{256} = \\dfrac{3}{64}\\). Hence (D).",
  },
  {
    id: "2265828d-9802-4f1d-90d8-70ce4ac650c7",
    qnum: "447",
    source: "Algebra booklet, PDF page index 20, left column",
    why:
      "TWO transcription defects. The printed first term is the stacked fraction (1/6)sin(theta), which our vision pass read as '1 - sin(theta)'. Printed option (d) is n*pi + pi/3, not n*pi +/- pi/3. With the printed first term the cubic factors as (2c-1)(3c^2+2c+1), whose only real root is cos(theta) = 1/2. Key B confirmed by the booklet's printed key.",
    edits: [
      { field: "text", find: "\\(1 - \\sin\\theta,\\", to: "\\(\\dfrac{1}{6}\\sin\\theta,\\" },
      { field: "option:D", find: "n\\pi \\pm \\dfrac{\\pi}{3}", to: "n\\pi + \\dfrac{\\pi}{3}" },
    ],
    rewriteSolution:
      "Three terms are in geometric progression when the middle one squared equals the product of the outer two:\n" +
      "\\(\\cos^2\\theta = \\left(\\dfrac{1}{6}\\sin\\theta\\right)\\tan\\theta\\).\n\n" +
      "Write \\(\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}\\):\n" +
      "\\(\\cos^2\\theta = \\dfrac{\\sin^2\\theta}{6\\cos\\theta}\\), so \\(6\\cos^3\\theta = \\sin^2\\theta\\).\n\n" +
      "Replace \\(\\sin^2\\theta = 1 - \\cos^2\\theta\\) and put \\(c = \\cos\\theta\\):\n" +
      "\\(6c^3 = 1 - c^2 \\Rightarrow 6c^3 + c^2 - 1 = 0\\).\n\n" +
      "\\(c = \\dfrac12\\) satisfies this \\(\\left(6\\cdot\\dfrac18 + \\dfrac14 - 1 = \\dfrac34 + \\dfrac14 - 1 = 0\\right)\\), " +
      "so \\((2c-1)\\) is a factor:\n" +
      "\\(6c^3 + c^2 - 1 = (2c-1)(3c^2 + 2c + 1)\\).\n\n" +
      "The quadratic has discriminant \\(2^2 - 4(3)(1) = -8 < 0\\), so it has no real root. " +
      "Hence \\(\\cos\\theta = \\dfrac12\\) is the only possibility, and the general solution of " +
      "\\(\\cos\\theta = \\cos\\dfrac{\\pi}{3}\\) is \\(\\theta = 2n\\pi \\pm \\dfrac{\\pi}{3}\\). Hence (B).",
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

  const { data, error } = await db
    .from("questions")
    .select("id,question_number,text,solution,content_hash,options(id,label,text,is_correct)")
    .in("id", FIXES.map((f) => f.id));
  if (error) throw error;
  const byId = new Map((data as any[]).map((q) => [q.id, q]));

  let refused = 0;
  const plan: { q: any; text: string; solution: string; opts: Map<string, string>; hash: string; key: string }[] = [];

  for (const fix of FIXES) {
    const q = byId.get(fix.id);
    if (!q) {
      console.error(`REFUSE Q${fix.qnum}: id not found`);
      refused++;
      continue;
    }
    let text: string = q.text;
    let solution: string = q.solution ?? "";
    const opts = new Map<string, string>((q.options as any[]).map((o) => [o.label, o.text as string]));
    let ok = true;

    for (const e of fix.edits) {
      if (e.find === e.to) {
        console.error(`REFUSE Q${fix.qnum}: find === to (mangled needle?)`);
        ok = false;
        break;
      }
      const src =
        e.field === "text" ? text : e.field === "solution" ? solution : opts.get(e.field.slice(7)) ?? "";
      const hits = src.split(e.find).length - 1;
      if (hits !== 1) {
        console.error(`REFUSE Q${fix.qnum} [${e.field}]: needle matched ${hits}x, expected exactly 1`);
        console.error(`   find: ${JSON.stringify(e.find)}`);
        console.error(`   src : ${JSON.stringify(src.slice(0, 240))}`);
        ok = false;
        break;
      }
      const out = src.replace(e.find, e.to);
      if (e.field === "text") text = out;
      else if (e.field === "solution") solution = out;
      else opts.set(e.field.slice(7), out);
    }
    if (!ok) {
      refused++;
      continue;
    }

    if (fix.rewriteSolution) {
      if (fix.rewriteSolution === solution) {
        console.error(`REFUSE Q${fix.qnum}: rewriteSolution identical to stored solution`);
        refused++;
        continue;
      }
      solution = fix.rewriteSolution;
    }

    // Authoring hazards: a shell-mangled backslash lands as a control char, and
    // a double-escaped delimiter renders as literal text on the page.
    const bad = [text, solution, ...opts.values()].filter((v) => CTRL.test(v) || v.includes("\\\\("));
    if (bad.length) {
      console.error(`REFUSE Q${fix.qnum}: control char or double-escaped delimiter in authored text`);
      refused++;
      continue;
    }

    const key = ((q.options as any[]).find((o) => o.is_correct)?.label ?? "") as string;
    if (!key) {
      console.error(`REFUSE Q${fix.qnum}: no correct option marked`);
      refused++;
      continue;
    }
    const hash = contentHash(text, [...opts.values()], key);
    plan.push({ q, text, solution, opts, hash, key });

    console.log(`\nQ${fix.qnum}  [${fix.source}]`);
    console.log(`  ${fix.why}`);
    if (text !== q.text) console.log(`  text     -> ${text}`);
    for (const o of q.options as any[]) {
      const nv = opts.get(o.label)!;
      if (nv !== o.text) console.log(`  option ${o.label} -> ${nv}`);
    }
    if (solution !== (q.solution ?? ""))
      console.log(`  solution -> ${solution.replace(/\n/g, " ").slice(0, 160)}...`);
    console.log(
      `  key ${key} UNCHANGED | content_hash ${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}${hash === q.content_hash ? " (same)" : ""}`
    );
  }

  if (refused) {
    console.error(`\n${refused} fix(es) refused — nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} question(s) would be updated. Re-run with --apply.`);
    return;
  }

  for (const p of plan) {
    const up = await db
      .from("questions")
      .update({ text: p.text, solution: p.solution, content_hash: p.hash })
      .eq("id", p.q.id);
    if (up.error) throw up.error;
    for (const o of p.q.options as any[]) {
      const nv = p.opts.get(o.label)!;
      if (nv === o.text) continue;
      const uo = await db.from("options").update({ text: nv }).eq("id", o.id);
      if (uo.error) throw uo.error;
    }
    console.log(`applied Q${p.q.question_number}`);
  }
  console.log(`\n${plan.length} question(s) updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
