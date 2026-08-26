/**
 * Correct the answer KEY on four NDA PYQ rows REPORTed by the 2026-08-25
 * hand-wave sweep (RULE 5) and adjudicated against the printed papers 2026-08-26.
 *
 *   npx tsx scripts/reviews/apply-report-fixes-pyq.ts            # dry run
 *   npx tsx scripts/reviews/apply-report-fixes-pyq.ts --apply
 *
 * WHY A KEY MOVE IS THE RIGHT CALL HERE, AND WHY IT IS NOT THE USUAL ONE.
 * This repo's convention is to PRESERVE a printed paper's key even when it is
 * wrong, because students were marked against the key that was issued. That
 * convention needs an issued key to preserve. There is none here:
 *
 *   1. All four STEMS were read off the scanned UPSC test booklets
 *      (C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs\Maths_2022_NDA1.pdf and
 *      Maths_2017_NDA2.pdf) and are byte-faithful — stem AND option order.
 *      So there is no transcription defect to repair; the answer is the issue.
 *   2. Those booklets contain NO answer key. Their tail pages are
 *      "SPACE FOR ROUGH WORK". They are the raw question papers as issued.
 *   3. The stored key came from an LWS-prepared Excel
 *      (NDA1_2022_Maths_QuestionBank.xlsx / NDA_II_2017_Maths.xlsx) whose
 *      `Answer` column sits beside an `Answer`-shaped `Solution` column that is
 *      plainly LLM-authored: Q34's contains a literal "?" placeholder mid-
 *      derivation, Q57's says the power is 4 and then concludes 3 "indirectly",
 *      and Q77's ends "REVIEW: official answer is 0; ... check problem
 *      statement." That is a derived answer, not a published key.
 *
 * So our key is itself a derivation — and a demonstrably unreliable one. Every
 * answer below was re-derived from the PRINTED stem, independently and without
 * consulting the stored key, and verified symbolically + numerically at
 * discriminating points (scripts/reviews/_tmp/verify_pyq.py, 25 checks, 0 fail).
 * Each new solution says in its own text that the answer is derived from the
 * printed paper and that no official key was available, so the claim is visible
 * to a reader rather than buried here.
 *
 * RE-GRADING. `mock_attempts` stores a FROZEN score, so a key move does not
 * re-grade an existing attempt. Only ONE stored answer is affected across all
 * four rows — on Q34 a student picked (C), the correct answer, and was marked
 * wrong. Run scripts/reviews/regrade-attempt.ts afterwards.
 *
 * GUARDS: the stored stem must match the printed stem recorded here EXACTLY
 * (so this cannot run against a row someone has since edited); the stored key
 * must be the one adjudicated away from; the new key must name a real option;
 * and content_hash is recomputed because the answer letter is part of the
 * dedup preimage.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type KeyFix = {
  id: string;
  qnum: string;
  paper: string;
  page: string;
  expectStem: string;
  fromKey: string;
  toKey: string;
  why: string;
  solution: string;
};

const DERIVED_NOTE =
  "\n\n[Answer derived from the printed question paper. The UPSC test booklet carries no answer key, " +
  "and the answer previously stored here came from a prep-house spreadsheet whose own working " +
  "contradicted it.]";

const FIXES: KeyFix[] = [
  {
    id: "d4b22b39-0d02-472d-9977-ae698e9f5637",
    qnum: "34",
    paper: "Maths_2022_NDA1.pdf (A - SDFR-S-HTM)",
    page: "booklet p13 / PDF index 6, left column",
    expectStem:
      "A vertical tower stands on a horizontal plane and is surmounted by a vertical flagstaff of height \\(h\\). At a point on the plane the angles of elevation of the bottom and top of the flagstaff are \\(\\theta\\) and \\(2\\theta\\) respectively. What is the height of the tower?",
    fromKey: "A",
    toKey: "C",
    why:
      "Stem and options byte-faithful to the printed paper. T = d tan(theta) and T + h = d tan(2theta) give T/h = cos(2theta) exactly, so the tower is h*cos(2theta) = option (c). Verified symbolically and at four angles; at theta = 30 degrees T = 0.5774 while h*cos(theta) = 1.0000.",
    solution:
      "Let the tower have height \\(T\\) and let the observation point be at horizontal distance \\(d\\) from its foot.\n\n" +
      "The bottom of the flagstaff is the top of the tower, so that is the \\(\\theta\\) sighting:\n" +
      "\\(\\tan\\theta = \\dfrac{T}{d}\\).\n\n" +
      "The top of the flagstaff is at height \\(T + h\\), and that is the \\(2\\theta\\) sighting:\n" +
      "\\(\\tan 2\\theta = \\dfrac{T+h}{d}\\).\n\n" +
      "Subtract the first from the second to isolate \\(h\\):\n" +
      "\\(\\dfrac{h}{d} = \\tan 2\\theta - \\tan\\theta " +
      "= \\dfrac{\\sin 2\\theta}{\\cos 2\\theta} - \\dfrac{\\sin\\theta}{\\cos\\theta} " +
      "= \\dfrac{\\sin 2\\theta\\cos\\theta - \\cos 2\\theta\\sin\\theta}{\\cos 2\\theta\\cos\\theta}\\).\n\n" +
      "The numerator is \\(\\sin(2\\theta - \\theta) = \\sin\\theta\\), so " +
      "\\(\\dfrac{h}{d} = \\dfrac{\\sin\\theta}{\\cos 2\\theta\\cos\\theta}\\).\n\n" +
      "Now divide \\(T = d\\tan\\theta = \\dfrac{d\\sin\\theta}{\\cos\\theta}\\) by that:\n" +
      "\\(\\dfrac{T}{h} = \\dfrac{d\\sin\\theta}{\\cos\\theta} \\cdot \\dfrac{\\cos 2\\theta\\cos\\theta}{d\\sin\\theta} = \\cos 2\\theta\\).\n\n" +
      "Therefore \\(T = h\\cos 2\\theta\\). Hence (C).\n\n" +
      "Sanity check at \\(\\theta = 30^\\circ\\) with \\(d = 1\\): \\(T = \\tan 30^\\circ = 0.5774\\) and " +
      "\\(h = \\tan 60^\\circ - \\tan 30^\\circ = 1.1547\\), so \\(h\\cos 60^\\circ = 0.5774 = T\\), " +
      "while \\(h\\cos 30^\\circ = 1.0000 \\neq T\\)." + DERIVED_NOTE,
  },
  {
    id: "4ac27c60-ea91-4d6b-8b1f-ff3f84c716e5",
    qnum: "57",
    paper: "Maths_2022_NDA1.pdf (A - SDFR-S-HTM)",
    page: "booklet p21 / PDF index 10, left column",
    expectStem:
      "What is the degree of the differential equation \\(1+\\left(\\frac{dy}{dx}\\right)^2=\\left(\\frac{d^2y}{dx^2}\\right)^{\\frac{4}{3}}\\)?",
    fromKey: "C",
    toKey: "D",
    why:
      "Stem and options byte-faithful to the printed paper. Degree is the power of the highest-order derivative once the equation is polynomial in the derivatives; cubing (the least power that clears the 1/3) gives (y'')^4, so the degree is 4 = option (d).",
    solution:
      "The degree of a differential equation is the power of its highest-order derivative — but only " +
      "once the equation has been written as a polynomial in the derivatives. Here the right-hand side " +
      "carries the fractional index \\(\\dfrac43\\), so the equation is not yet in that form.\n\n" +
      "Raise both sides to the power 3 (the least power that clears a denominator of 3):\n" +
      "\\(\\left[1+\\left(\\dfrac{dy}{dx}\\right)^2\\right]^3 = \\left(\\dfrac{d^2y}{dx^2}\\right)^{4}\\).\n\n" +
      "Both sides are now polynomial in \\(\\dfrac{dy}{dx}\\) and \\(\\dfrac{d^2y}{dx^2}\\). " +
      "The highest-order derivative present is \\(\\dfrac{d^2y}{dx^2}\\) (order 2), and it appears " +
      "to the power 4.\n\n" +
      "So the degree is 4. Hence (D).\n\n" +
      "Note the common slip: expanding the left side gives \\(\\left(\\dfrac{dy}{dx}\\right)^6\\), the " +
      "highest power anywhere in the equation. That is irrelevant — degree looks only at the " +
      "HIGHEST-ORDER derivative, which is \\(\\dfrac{d^2y}{dx^2}\\), never at the largest exponent." +
      DERIVED_NOTE,
  },
  {
    id: "d6603eac-055d-4cc3-934d-f2508a7d66a3",
    qnum: "77",
    paper: "Maths_2022_NDA1.pdf (A - SDFR-S-HTM)",
    page: "booklet p27 / PDF index 13, left column",
    expectStem:
      "If the derivative of the function \\(f(x)=\\frac{m}{x}+2nx+1\\) vanishes at \\(x=2\\), then what is the value of \\(m+8n\\)?",
    fromKey: "B",
    toKey: "D",
    why:
      "Stem and options byte-faithful to the printed paper. f'(2)=0 gives m = 8n, i.e. it pins m - 8n = 0 and leaves m + 8n = 16n free. (m,n) = (8,1) and (24,3) both satisfy the condition and give 16 and 48, so the quantity asked for is not determined = option (d).",
    solution:
      "Differentiate: \\(f(x) = \\dfrac{m}{x} + 2nx + 1\\) gives " +
      "\\(f'(x) = -\\dfrac{m}{x^{2}} + 2n\\).\n\n" +
      "Set \\(f'(2) = 0\\):\n" +
      "\\(-\\dfrac{m}{4} + 2n = 0\\). Multiplying by 4, \\(-m + 8n = 0\\), that is \\(m = 8n\\).\n\n" +
      "So the condition pins the DIFFERENCE: \\(m - 8n = 0\\). It says nothing about the sum:\n" +
      "\\(m + 8n = 8n + 8n = 16n\\), which still depends on \\(n\\).\n\n" +
      "Two concrete pairs make this plain. \\((m,n) = (8,1)\\) satisfies \\(f'(2)=0\\) and gives " +
      "\\(m + 8n = 16\\); \\((m,n) = (24,3)\\) also satisfies \\(f'(2)=0\\) and gives \\(m + 8n = 48\\). " +
      "Since two admissible pairs give different values, \\(m + 8n\\) is not determined by the data.\n\n" +
      "Hence (D).\n\n" +
      "The trap: \\(-m + 8n = 0\\) is easy to misread as \\(m + 8n = 0\\). The sign matters — it is the " +
      "difference that vanishes, not the sum." + DERIVED_NOTE,
  },
  {
    id: "fb68b32b-6f4e-492e-924b-4945897f4fd6",
    qnum: "91",
    paper: "Maths_2017_NDA2.pdf (ADU-S-LET/81A)",
    page: "booklet p33 / PDF index 16, right column",
    expectStem:
      "Let \\(g\\) be the greatest integer function. Then the function \\(f(x) = (g(x))^2 - g(x^2)\\) is discontinuous at",
    fromKey: "B",
    toKey: "D",
    why:
      "Stem and options byte-faithful to the printed paper. f is identically 1 on (-1,0) while f(0) = 0, so it IS discontinuous at 0; it is continuous only at 1. That is option (d), not (b). Checked with exact rational arithmetic at every integer from -4 to 4.",
    solution:
      "Write \\([\\,\\cdot\\,]\\) for the greatest integer function, so \\(f(x) = [x]^2 - [x^2]\\).\n\n" +
      "**At a positive integer \\(k \\ge 2\\).** Just to the left of \\(k\\), \\([x] = k-1\\) and " +
      "\\(x^2\\) is just below \\(k^2\\) so \\([x^2] = k^2 - 1\\). The left-hand limit is therefore " +
      "\\((k-1)^2 - (k^2-1) = 2 - 2k\\). But \\(f(k) = k^2 - k^2 = 0\\). These agree only when " +
      "\\(k = 1\\), so \\(f\\) is discontinuous at every integer \\(k \\ge 2\\).\n\n" +
      "**At \\(x = 1\\).** On \\((0,1)\\) both \\([x]\\) and \\([x^2]\\) are 0, so \\(f \\equiv 0\\). " +
      "Just to the right of 1, \\([x] = 1\\) and \\([x^2] = 1\\), so \\(f = 0\\) again. And " +
      "\\(f(1) = 1 - 1 = 0\\). All three agree — \\(f\\) is CONTINUOUS at 1.\n\n" +
      "**At \\(x = 0\\).** This is the one worth checking carefully. On the whole interval " +
      "\\((-1,0)\\) we have \\([x] = -1\\), so \\([x]^2 = 1\\), while \\(x^2 \\in (0,1)\\) gives " +
      "\\([x^2] = 0\\). So \\(f \\equiv 1\\) on \\((-1,0)\\). Yet \\(f(0) = 0 - 0 = 0\\). The " +
      "left-hand limit is 1 and the value is 0, so \\(f\\) IS discontinuous at 0.\n\n" +
      "**At a negative integer \\(k \\le -1\\).** Just to the left of \\(k\\), \\([x] = k-1\\) and " +
      "\\(x^2\\) is just above \\(k^2\\) so \\([x^2] = k^2\\). The left-hand limit is " +
      "\\((k-1)^2 - k^2 = 1 - 2k\\), which is at least 3, while \\(f(k) = 0\\). Discontinuous.\n\n" +
      "So \\(f\\) is discontinuous at every integer except 1. Hence (D)." + DERIVED_NOTE,
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
    .select("id,question_number,text,solution,content_hash,pyq_year,pyq_month,options(id,label,text,is_correct)")
    .in("id", FIXES.map((f) => f.id));
  if (error) throw error;
  const byId = new Map((data as any[]).map((q) => [q.id, q]));

  let refused = 0;
  const plan: { q: any; fix: KeyFix; hash: string }[] = [];

  for (const fix of FIXES) {
    const q = byId.get(fix.id);
    if (!q) {
      console.error(`REFUSE Q${fix.qnum}: id not found`);
      refused++;
      continue;
    }
    // The stem is the thing that was source-verified. If it has drifted, this
    // adjudication no longer describes the row and must not be applied.
    if (q.text !== fix.expectStem) {
      console.error(`REFUSE Q${fix.qnum}: stored stem is not the one adjudicated against.`);
      console.error(`   stored: ${JSON.stringify(q.text)}`);
      console.error(`   expect: ${JSON.stringify(fix.expectStem)}`);
      refused++;
      continue;
    }
    const opts = q.options as any[];
    const cur = opts.find((o) => o.is_correct);
    if (!cur || cur.label !== fix.fromKey) {
      console.error(`REFUSE Q${fix.qnum}: stored key is ${cur?.label ?? "none"}, expected ${fix.fromKey}`);
      refused++;
      continue;
    }
    const next = opts.find((o) => o.label === fix.toKey);
    if (!next) {
      console.error(`REFUSE Q${fix.qnum}: no option labelled ${fix.toKey}`);
      refused++;
      continue;
    }
    if (CTRL.test(fix.solution) || fix.solution.includes("\\\\(")) {
      console.error(`REFUSE Q${fix.qnum}: control char or double-escaped delimiter in authored solution`);
      refused++;
      continue;
    }
    // The answer LETTER is part of the dedup preimage, so a key move changes it.
    const hash = contentHash(q.text, opts.map((o) => o.text as string), fix.toKey);
    plan.push({ q, fix, hash });

    console.log(`\nQ${fix.qnum}  NDA ${q.pyq_year} ${q.pyq_month}  [${fix.paper}, ${fix.page}]`);
    console.log(`  ${fix.why}`);
    console.log(`  stem UNCHANGED (byte-faithful to the printed paper)`);
    console.log(`  KEY  ${fix.fromKey} -> ${fix.toKey}   (${String(next.text).slice(0, 60)})`);
    console.log(`  content_hash ${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}`);
    console.log(`  solution -> ${fix.solution.replace(/\n/g, " ").slice(0, 150)}...`);
  }

  if (refused) {
    console.error(`\n${refused} fix(es) refused — nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} key change(s) would be applied. Re-run with --apply.`);
    return;
  }

  for (const p of plan) {
    for (const o of p.q.options as any[]) {
      const shouldBe = o.label === p.fix.toKey;
      if (o.is_correct === shouldBe) continue;
      const uo = await db.from("options").update({ is_correct: shouldBe }).eq("id", o.id);
      if (uo.error) throw uo.error;
    }
    const up = await db
      .from("questions")
      .update({ solution: p.fix.solution, content_hash: p.hash })
      .eq("id", p.q.id);
    if (up.error) throw up.error;
    console.log(`applied Q${p.fix.qnum}: key ${p.fix.fromKey} -> ${p.fix.toKey}`);
  }
  console.log(`\n${plan.length} key(s) corrected. Now run scripts/reviews/regrade-attempt.ts.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
