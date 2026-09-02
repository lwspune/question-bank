/**
 * Source-verified repairs from the RULE 4 + RULE 5 review of Blueprint Mock 5.
 *
 *   npx tsx scripts/reviews/apply-mock5-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-mock5-fixes.ts --apply
 *
 * EVERY ONE OF THESE WAS SETTLED AGAINST THE PRINTED BOOKLET, and the pattern is
 * the reverse of Mock 3's: there the flags were corrupt transcriptions under
 * correct keys, here most of the transcriptions are FAITHFUL and the defects
 * belong to the book. Four of the six rows the blind pass flagged needed no
 * change at all once the page was read, which is why the page is read first.
 *
 * Q1195 IS THE ONE KEY FLIP, and it is a book error rather than ours. The
 * equation `tan x - sin x = 1 - tan x sin x` factors as
 * `(1 + sin x)(tan x - 1) = 0`. The `sin x = -1` branch forces `cos x = 0`,
 * where `tan x` is UNDEFINED — so those points are not in the domain of the
 * printed equation and cannot satisfy it. They are extraneous roots, introduced
 * only if one clears the denominator (and indeed the cleared equation IS
 * satisfied there, which is exactly how the error arises). The booklet prints
 * BOTH the over-complete family and the correct one as options (a) and (c), so
 * the discrimination is plainly the point of the question — and its own key
 * says (a). Our transcription of stem, options and key is faithful; the book is
 * wrong. Key A -> C, with the defect named in the solution.
 *
 * Q2973 and Q1829 are OUR transcription errors, both in a way that leaves the
 * key correct: the booklet's third option reads `2, 1` where we stored `3, 1`,
 * and the booklet's third position vector reads `lambda i` where we stored
 * `a i` — which is why that stem asked for a `lambda` it never introduced.
 *
 * Q8 is a mis-zoned math delimiter from the .docx ingest: `(x - 1)` sits OUTSIDE
 * the zone while its exponent sits inside, so the row renders as `(x - 1) ^2`
 * with the base in body text. Not source-verifiable (the .docx is not on disk)
 * but unambiguous — no other reading of `(x-1) ... ^2 + (x-3)^2 + (x-5)^2 = 0`
 * exists, and the answer is unaffected.
 *
 * Q2179 keeps its stem and key and gains only an errata note: the booklet really
 * does print the domain as `[0, inf)`, where `f(x) = x + 1/x` is undefined at 0
 * and is not injective on `(0,1) u (1,inf)`. The intended domain is `[1, inf)`,
 * which is the branch that maps onto `[2, inf)` and selects the plus root — so
 * the printed answer is right and only the domain line is loose.
 *
 * The primitive is expect-then-set: each edit states the CURRENT value in full
 * and is REFUSED if the stored value differs. An ALREADY-APPLIED edit is a SKIP
 * so the script stays re-runnable. content_hash is recomputed wherever stem or
 * option text moves; a solution-only change is hash-neutral by construction.
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
  key?: { expect: string; to: string };
  solution?: string;
};

const state = (stored: string, expect: string, to: string): "todo" | "done" | "bad" =>
  stored === expect ? "todo" : stored === to ? "done" : "bad";

const FIXES: Fix[] = [
  {
    qnum: "1195",
    sourceFile: "NDA_Maths_Practice__Trigonometry__Trigonometric_Equations.pdf",
    why:
      "BOOK KEY ERROR. The keyed option adds the family where cos x = 0, at which tan x is undefined — extraneous roots of the cleared equation, not solutions of the printed one. The booklet prints the correct set as its third option and keys the first. Stem, options and key all transcribed faithfully. Key A -> C.",
    key: { expect: "A", to: "C" },
    solution:
      "Bring everything to one side and factor, rather than clearing the denominator:\n\n" +
      "\\(\\tan x - \\sin x - 1 + \\tan x \\sin x = 0\\)\n\n" +
      "Group the terms in pairs: \\(\\tan x(1 + \\sin x) - (1 + \\sin x) = 0\\), so\n\n" +
      "\\((1 + \\sin x)(\\tan x - 1) = 0\\).\n\n" +
      "That gives two candidate branches, and the second one has to be TESTED rather than accepted:\n\n" +
      "**\\(\\tan x = 1\\)** gives \\(x = n\\pi + \\dfrac{\\pi}{4}\\). These are genuine solutions.\n\n" +
      "**\\(\\sin x = -1\\)** forces \\(\\cos x = 0\\) — and \\(\\tan x\\) is UNDEFINED there. The original equation contains \\(\\tan x\\) on both sides, so such an \\(x\\) is not in its domain and cannot satisfy it. These are extraneous.\n\n" +
      "(They look like solutions if you first multiply through by \\(\\cos x\\): the cleared equation \\(\\sin x - \\sin x\\cos x = \\cos x - \\sin^{2}x\\) does hold at \\(x = -\\dfrac{\\pi}{2}\\), both sides equalling \\(-1\\). Multiplying by a quantity that vanishes is what introduces them.)\n\n" +
      "So the solution set is exactly \\(x = n\\pi + \\dfrac{\\pi}{4}\\). Hence (C).\n\n" +
      "[Textbook: the booklet's own answer key gives the option that also lists \\(x = n\\pi + (-1)^n\\left(-\\dfrac{\\pi}{2}\\right)\\). Those values make \\(\\tan x\\) undefined, so that option asserts solutions the equation does not have. The booklet prints the correct set separately, which is what this question is really testing.]",
  },
  {
    qnum: "2973",
    sourceFile: "NDA_Maths_Practice__Calculus__Differential_Equations.pdf",
    why:
      "Our option C read '3, 1'; the booklet prints '2, 1'. Restored for fidelity — a distractor either way. Key B (2, 2) is correct AS PRINTED and unchanged: the booklet really does write dp/dx rather than p, so the highest derivative is the second and squaring away the radical makes the degree 2. (The blind pass suspected a Clairaut corruption; the page says otherwise.)",
    options: [{ label: "C", expect: "3, 1", to: "2, 1" }],
  },
  {
    qnum: "1829",
    sourceFile: "NDA_Maths_Practice__3D__Vectors.pdf",
    why:
      "Our stem introduced the third point as 'a i' and then asked for 'lambda', naming an unknown it never defined. The booklet prints 'lambda i'. Restored. Key B (8) unchanged — the collinearity gives slope -4 from the first two points, so 8/(x-10) = -4 and x = 8.",
    stem: {
      expect:
        "If the points with position vectors \\(10\\hat{i} + 3\\hat{j}, 12\\hat{i} - 5\\hat{j}\\) and \\(a\\hat{i} + 11\\hat{j}\\) are collinear, then \\(\\lambda\\) is equal to",
      to:
        "If the points with position vectors \\(10\\hat{i} + 3\\hat{j}, 12\\hat{i} - 5\\hat{j}\\) and \\(\\lambda\\hat{i} + 11\\hat{j}\\) are collinear, then \\(\\lambda\\) is equal to",
    },
  },
  {
    qnum: "8",
    sourceFile: "NDA_Maths_Weekly_Mock_2026_T1.docx",
    why:
      "Mis-zoned math delimiter from the .docx ingest: the base (x - 1) sits OUTSIDE the math zone while its exponent sits inside, so the row renders with the first bracket in body text and a stray floating square. Key A (0 real roots) unchanged and independently confirmed — a sum of three squares vanishes only if each does, and x cannot be 1, 3 and 5 at once.",
    stem: {
      expect:
        "The number of real roots of the equation (x - 1) \\(\\ ^{2} + (x - 3)^{2} + (x - 5)^{2} = 0\\) is :",
      to:
        "The number of real roots of the equation \\((x - 1)^{2} + (x - 3)^{2} + (x - 5)^{2} = 0\\) is :",
    },
  },
  {
    qnum: "2179",
    sourceFile: "NDA_Maths_Practice__Calculus__Functions.pdf",
    why:
      "No stem or key change — both are faithful to the booklet, which really does print the domain as [0, inf). The solution gains an errata note because that domain is the book's own slip: f(x) = x + 1/x is undefined at 0 and not injective on (0,1) u (1,inf). Key A unchanged.",
    solution:
      "Set \\(y = f(x) = x + \\dfrac{1}{x}\\) and solve for \\(x\\) in terms of \\(y\\).\n\n" +
      "Multiplying by \\(x\\) gives the quadratic \\(x^{2} - yx + 1 = 0\\), so\n\n" +
      "\\(x = \\dfrac{y \\pm \\sqrt{y^{2} - 4}}{2}\\).\n\n" +
      "Two roots, so one has to be chosen — and the choice is what the question is about. The two roots multiply to 1 (their product is the constant term), so one lies in \\((0, 1]\\) and the other in \\([1, \\infty)\\). The inverse must return the branch the function was defined on, which is the one at or above 1, and that is the PLUS root.\n\n" +
      "Replacing \\(y\\) by \\(x\\) in the usual way, \\(f^{-1}(x) = \\dfrac{x + \\sqrt{x^{2} - 4}}{2}\\). Hence (A).\n\n" +
      "(Check: at \\(x = \\dfrac{5}{2}\\) this gives 2, and \\(f(2) = 2 + \\dfrac{1}{2} = \\dfrac{5}{2}\\). The minus root gives \\(\\dfrac{1}{2}\\), whose image is also \\(\\dfrac{5}{2}\\) — which is precisely why the branch has to be pinned down. Note \\(y = 2\\) would NOT settle it: both roots equal 1 there.)\n\n" +
      "[Textbook: the printed domain \\([0, \\infty)\\) cannot be right — \\(f\\) is undefined at \\(x = 0\\), and on \\((0,1) \\cup (1,\\infty)\\) it is not one-one, so no inverse exists. The intended domain is \\([1, \\infty)\\), which is exactly the branch that maps onto \\([2, \\infty)\\) and selects the plus root above.]",
  },
  {
    qnum: "11",
    sourceFile: "NDA_Maths_Mock_Test_05.docx",
    why:
      "RULE 5: the stored solution derives the argument correctly and then states the WRONG conclusion — it reaches Arg = -pi/2 and writes 'therefore z-bar*omega = -1', when a unit modulus at angle -pi/2 is -i, not -1. Worse, -1 is a printed option, so the solution talks a student into a different letter than the key. The key A (-i) is correct and unchanged; only the final line was wrong.",
    solution:
      "Handle the modulus and the argument separately — that is the whole method for a question like this.\n\n" +
      "**Modulus.** Conjugating does not change the modulus, so\n\n" +
      "\\(\\left|\\overline{z}\\,\\omega\\right| = |\\overline{z}||\\omega| = |z||\\omega| = |z\\omega| = 1\\).\n\n" +
      "**Argument.** Conjugating negates the argument, so\n\n" +
      "\\(\\arg\\!\\left(\\overline{z}\\,\\omega\\right) = -\\arg(z) + \\arg(\\omega) = -\\left[\\arg(z) - \\arg(\\omega)\\right] = -\\dfrac{\\pi}{2}\\).\n\n" +
      "So \\(\\overline{z}\\,\\omega\\) is the complex number of modulus 1 at angle \\(-\\dfrac{\\pi}{2}\\):\n\n" +
      "\\(\\overline{z}\\,\\omega = \\cos\\!\\left(-\\dfrac{\\pi}{2}\\right) + i\\sin\\!\\left(-\\dfrac{\\pi}{2}\\right) = 0 - i = -i\\).\n\n" +
      "Hence (A).\n\n" +
      "(The trap is to stop at the angle. An angle of \\(-\\dfrac{\\pi}{2}\\) points down the imaginary axis, giving \\(-i\\); \\(-1\\) would need an angle of \\(\\pi\\), and it is a printed option.)",
  },
  {
    qnum: "105",
    sourceFile: "NDA_Maths_Mock_Test_07.docx",
    why:
      "RULE 5, mildly: the stored solution was a single line, 'P((1,6) or (6,1)) = 2/36 = 1/18'. It is correct and it does compute, but it asserts the favourable pairs rather than showing why they are the only ones — thin for a printed answer key. Key B unchanged and confirmed blind.",
    solution:
      "Two dice give \\(6 \\times 6 = 36\\) equally likely ordered outcomes.\n\n" +
      "We need the pairs whose numbers differ by 5. Since each die shows 1 to 6, the largest possible difference is \\(6 - 1 = 5\\), so a difference of 5 can only happen at the extremes — one die must show 1 and the other 6.\n\n" +
      "That leaves exactly two ordered outcomes: \\((1, 6)\\) and \\((6, 1)\\).\n\n" +
      "\\(P = \\dfrac{2}{36} = \\dfrac{1}{18}\\). Hence (B).\n\n" +
      "(Note the outcomes are ORDERED, so \\((1,6)\\) and \\((6,1)\\) count separately against the 36. Treating them as one would give \\(1/36\\), which is not offered.)",
  },
  {
    qnum: "110",
    sourceFile: "NDA2_2019_Maths_PYQ.xlsx",
    why:
      "A KNIFE-EDGE the stored solution did not own. The cumulative frequency reaches EXACTLY N/2 = 120 at x = 4, so the 120th observation is 4 and the 121st is 5 — by the raw-data rule the median would be 4.5, which is not a printed option. The keyed 5 is right under the standard discrete-series convention, but the stored solution asserted a bare 'first cf strictly exceeding N/2' rule without saying that the tie is what the question is testing. Key B unchanged; solution rewritten to name the convention and address the tie head-on.",
    solution:
      "First build the cumulative frequencies:\n\n" +
      "| \\(x\\) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n" +
      "|---|---|---|---|---|---|---|---|---|\n" +
      "| \\(f\\) | 3 | 15 | 45 | 57 | 50 | 36 | 25 | 9 |\n" +
      "| c.f. | 3 | 18 | 63 | 120 | 170 | 206 | 231 | 240 |\n\n" +
      "So \\(N = 240\\).\n\n" +
      "For a DISCRETE frequency distribution the median is the size of the \\(\\left(\\dfrac{N+1}{2}\\right)\\)th item — note \\(N+1\\), not \\(N\\). Here that is the \\(120.5\\)th item.\n\n" +
      "Read down the cumulative frequency for the first entry that reaches \\(120.5\\): the c.f. is \\(120\\) at \\(x = 4\\), which is still short, and \\(170\\) at \\(x = 5\\), which passes it. The \\(120.5\\)th item therefore has value \\(5\\).\n\n" +
      "Hence (B).\n\n" +
      "**Why the \\(N+1\\) matters here, and it is the whole point of this question.** The c.f. lands on exactly \\(120 = \\dfrac{N}{2}\\) at \\(x = 4\\) — the one case where the two rules can disagree. Using \\(\\dfrac{N}{2}\\) and taking the first c.f. that REACHES it would give 4; the \\(\\dfrac{N+1}{2}\\) rule gives 5. (Treated as raw ungrouped data the 120th and 121st observations are 4 and 5, averaging to 4.5, which is not offered — a sign that the discrete-series convention is the one intended.)\n\n" +
      "Note also that \\(x = 4\\) carries the largest frequency, 57, so it is the MODE. That is what makes it the natural wrong answer here rather than filler.",
  },
  {
    qnum: "1975",
    sourceFile: "NDA_Maths_Practice__3D__3D_Geometry.pdf",
    why:
      "BOOK KEY ERROR, same shape as Q1195: the booklet prints the fuller correct option and keys the narrower one. cos^2(45) + cos^2(60) + cos^2(gamma) = 1 gives cos^2(gamma) = 1/4, so cos(gamma) = +/-1/2 and BOTH 60 and 120 degrees occur — two distinct lines satisfy the stem. Nothing in the question restricts it to the first octant, though the stored solution silently assumed that. Stem, all four options and the key are faithful to the printed page (booklet key: a). Key A -> C.",
    key: { expect: "A", to: "C" },
    solution:
      "For any line, the three direction cosines satisfy \\(l^{2} + m^{2} + n^{2} = 1\\), i.e.\n\n" +
      "\\(\\cos^{2}\\alpha + \\cos^{2}\\beta + \\cos^{2}\\gamma = 1\\).\n\n" +
      "Here \\(\\alpha = 45^\\circ\\) and \\(\\beta = 60^\\circ\\), so\n\n" +
      "\\(\\left(\\dfrac{1}{\\sqrt{2}}\\right)^{2} + \\left(\\dfrac{1}{2}\\right)^{2} + \\cos^{2}\\gamma = 1\\)\n\n" +
      "\\(\\dfrac{1}{2} + \\dfrac{1}{4} + \\cos^{2}\\gamma = 1 \\quad\\Rightarrow\\quad \\cos^{2}\\gamma = \\dfrac{1}{4}\\).\n\n" +
      "Now take the square root — and keep BOTH signs, because nothing in the question rules either out:\n\n" +
      "\\(\\cos\\gamma = \\pm\\dfrac{1}{2} \\quad\\Rightarrow\\quad \\gamma = 60^\\circ \\ \\text{or}\\ 120^\\circ\\).\n\n" +
      "Both are genuine: \\(\\left(\\dfrac{1}{\\sqrt{2}}, \\dfrac{1}{2}, \\dfrac{1}{2}\\right)\\) and \\(\\left(\\dfrac{1}{\\sqrt{2}}, \\dfrac{1}{2}, -\\dfrac{1}{2}\\right)\\) are both valid direction-cosine triples, describing two different lines that each make \\(45^\\circ\\) with the x-axis and \\(60^\\circ\\) with the y-axis — one sloping up out of the xy-plane, one sloping down.\n\n" +
      "Hence (C).\n\n" +
      "[Textbook: the booklet's own answer key gives \\(60^\\circ\\) alone. That discards the negative root, which would only be justified if the line were restricted to the first octant — a condition the question never states. The booklet prints \"\\(60^\\circ\\) and \\(120^\\circ\\)\" as a separate option, which is what the question is really testing.]",
  },
  {
    qnum: "2507",
    sourceFile: "NDA_Maths_Practice__Calculus__Application_of_Derivatives.pdf",
    why:
      "OUR OPTIONS A AND B ARE SWAPPED relative to the printed page, and the key letter was carried across without accounting for it — so the stored key points at the wrong pair. Tellingly the stored SOLUTION derives (3, 16/3) and (-3, -16/3) correctly and then writes 'Hence (A)', which is our option B. The booklet prints that pair as its option (a) and keys (a); in OUR labelling the same pair is B. Key A -> B.",
    key: { expect: "A", to: "B" },
    solution:
      "\"The ordinate decreases at the same rate at which the abscissa increases\" is a statement about time derivatives:\n\n" +
      "\\(\\dfrac{dy}{dt} = -\\dfrac{dx}{dt}\\), and therefore \\(\\dfrac{dy}{dx} = -1\\).\n\n" +
      "Differentiate the ellipse \\(16x^{2} + 9y^{2} = 400\\) implicitly:\n\n" +
      "\\(32x + 18y\\dfrac{dy}{dx} = 0 \\quad\\Rightarrow\\quad \\dfrac{dy}{dx} = -\\dfrac{16x}{9y}\\).\n\n" +
      "Setting that equal to \\(-1\\) gives \\(16x = 9y\\), so \\(y = \\dfrac{16x}{9}\\).\n\n" +
      "Substitute back into the ellipse:\n\n" +
      "\\(16x^{2} + 9\\left(\\dfrac{16x}{9}\\right)^{2} = 16x^{2} + \\dfrac{256x^{2}}{9} = \\dfrac{400x^{2}}{9} = 400\\),\n\n" +
      "so \\(x^{2} = 9\\) and \\(x = \\pm 3\\). Then \\(y = \\dfrac{16x}{9}\\) gives \\(y = \\dfrac{16}{3}\\) at \\(x = 3\\), and \\(y = -\\dfrac{16}{3}\\) at \\(x = -3\\).\n\n" +
      "The points are \\(\\left(3, \\dfrac{16}{3}\\right)\\) and \\(\\left(-3, -\\dfrac{16}{3}\\right)\\). Hence (B).\n\n" +
      "(The sign is the whole question. The other pair, \\(\\left(3, -\\dfrac{16}{3}\\right)\\) and \\(\\left(-3, \\dfrac{16}{3}\\right)\\), lies on the ellipse too — it satisfies \\(16x = -9y\\), which is where \\(\\dfrac{dy}{dx} = +1\\) and the ordinate INCREASES with the abscissa. Checking only that a point is on the curve does not separate them.)",
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
