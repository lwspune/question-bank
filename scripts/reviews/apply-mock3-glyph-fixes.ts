/**
 * Glyph and RULE 5 repairs on three Blueprint Mock 3 rows drawn from the LWS
 * mock .docx files.
 *
 *   npx tsx scripts/reviews/apply-mock3-glyph-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-mock3-glyph-fixes.ts --apply
 *
 * FOUND BY THE RENDER GATE, not by the blind pass. render-check-paper reported
 * PASS on both surfaces but warned twice about "Unrecognized Unicode character
 * '–' (8211)" inside a math zone — KaTeX renders an en-dash in warn mode, so it
 * LOOKS like a minus on screen and nothing downstream complains. Chasing those
 * two warnings surfaced a conversion artifact running through all three rows:
 * pandoc turned the .docx en-dash into a literal `--` in text and left U+2013
 * inside math. A student sees an option printed as `-- A`.
 *
 * NO ANSWER MOVES. Every key here was independently re-derived before touching
 * anything:
 *   Q27   A idempotent, so AB = BA = 0 and (I-A)^2 = I-A; the expression is A.
 *   Q111  centre (1,2,-1), r = 3, plane distance 9/3 = 3 so it is tangent, and
 *         the foot of the perpendicular is (-1,4,-2) = key B.
 *   Q5    2^3 subsets, less the set itself and the empty set, is 6 = key C.
 *
 * TWO SOLUTIONS ARE REWRITTEN because they are RULE 5 failures independent of
 * the glyphs. Q111's stored "solution" is its own stem copied verbatim with the
 * answer tacked on the end — it derives nothing, which is precisely the shape
 * RULE 5 exists to catch. Q27's does derive but is mangled, opening a math zone
 * mid-expression (`A\((I - A) + ...`) and closing another after a stray paren.
 * Q5's is left in place apart from a mismatched brace (`{1,2,3)`) and a stray
 * line-break backslash, plus wording that says "proper subsets" while correctly
 * counting the NON-EMPTY proper ones.
 *
 * SCOPE, deliberately: this repairs the three rows in THIS paper only. The same
 * artifact affects 83 of the 1,694 rows ingested from those .docx files (4.9%),
 * measured 2026-08-29. Those are shipped content, so they are logged as a
 * backfill candidate rather than swept here.
 *
 * The primitive is expect-then-set, not find-and-replace: each edit states the
 * CURRENT value in full and is REFUSED if the stored value differs, so it cannot
 * silently clobber a row something else has touched. content_hash is recomputed
 * wherever stem or option text moves.
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
  solution?: string;
};

const FIXES: Fix[] = [
  {
    qnum: "27",
    sourceFile: "NDA_Maths_Mock_Test_10.docx",
    why:
      "En-dash for minus in the stem's squared term and in option D; option C printed as '-- A'. Solution rewritten: the stored one derives the right value but opens a math zone mid-expression. Key A unchanged.",
    stem: {
      expect:
        "If A is a square matrix such that \\(A^{2}\\)= A & B = \\(I - A\\) , then AB + BA + \\(I\\) - \\({(I\\ –\\ A)}^{2}\\)=",
      to:
        "If A is a square matrix such that \\(A^{2} = A\\) and \\(B = I - A\\), then \\(AB + BA + I - {(I - A)}^{2}\\) =",
    },
    options: [
      { label: "C", expect: "-- A", to: "\\(-A\\)" },
      { label: "D", expect: "\\(I\\ –\\ A\\)", to: "\\(I - A\\)" },
    ],
    solution:
      "\\(A^{2} = A\\) says A is idempotent. Take the three pieces in turn.\n\n" +
      "\\(AB = A(I - A) = A - A^{2} = A - A = 0\\), and in the same way \\(BA = (I - A)A = A - A^{2} = 0\\).\n\n" +
      "For the square, \\({(I - A)}^{2} = I - 2A + A^{2} = I - 2A + A = I - A\\).\n\n" +
      "Substituting all three:\n\n" +
      "\\(AB + BA + I - {(I - A)}^{2} = 0 + 0 + I - (I - A) = A\\).\n\n" +
      "Hence (A). Note \\(B = I - A\\) is itself idempotent, which is why the square collapses back to \\(B\\).",
  },
  {
    qnum: "111",
    sourceFile: "NDA_Maths_Mock_Test_10.docx",
    why:
      "'--' for minus three times in the stem. Solution rewritten: the stored one is the stem copied verbatim with '(- 1, 4, - 2)' appended and no working at all. Key B unchanged.",
    stem: {
      expect:
        "The plane 2x -- 2y + z + 12 = 0 touches the sphere \\(x^{2}\\) + \\(y^{2}\\) + \\(z^{2}\\) - 2x -- 4y + 2z -- \\(3\\) = 0 at the point",
      to:
        "The plane \\(2x - 2y + z + 12 = 0\\) touches the sphere \\(x^{2} + y^{2} + z^{2} - 2x - 4y + 2z - 3 = 0\\) at the point",
    },
    solution:
      "Put the sphere in centre-radius form. Completing the square in each variable, " +
      "\\(x^{2} + y^{2} + z^{2} - 2x - 4y + 2z - 3 = 0\\) has centre \\(C(1,\\ 2,\\ -1)\\) and " +
      "radius \\(r = \\sqrt{1^{2} + 2^{2} + (-1)^{2} + 3} = \\sqrt{9} = 3\\).\n\n" +
      "Confirm the plane really is a tangent by measuring the distance from the centre to it:\n\n" +
      "\\(d = \\dfrac{|2(1) - 2(2) + (-1) + 12|}{\\sqrt{2^{2} + (-2)^{2} + 1^{2}}} = \\dfrac{9}{3} = 3 = r\\).\n\n" +
      "Since \\(d = r\\), the plane touches the sphere at exactly one point, and that point is the foot of the " +
      "perpendicular from \\(C\\). The normal is \\(\\vec{n} = (2,\\ -2,\\ 1)\\) with \\(|\\vec{n}| = 3\\), and the " +
      "signed distance came out positive, so step 3 units from \\(C\\) in the direction \\(-\\vec{n}/|\\vec{n}|\\):\n\n" +
      "\\((1,\\ 2,\\ -1) - 3\\cdot\\dfrac{(2,\\ -2,\\ 1)}{3} = (1 - 2,\\ 2 + 2,\\ -1 - 1) = (-1,\\ 4,\\ -2)\\).\n\n" +
      "Hence (B). (Check: \\((-1,\\ 4,\\ -2)\\) satisfies both the plane and the sphere.)",
  },
  {
    qnum: "5",
    sourceFile: "NDA_Maths_Mock_Test_05.docx",
    why:
      "'non -- empty' in the stem. Solution kept but corrected: it closed the set with a paren, carried a stray line-break backslash, and said 'proper subsets' while counting the NON-EMPTY proper ones. Key C unchanged.",
    stem: {
      expect: "The number of non -- empty proper subsets of the set {1,2,3} is",
      to: "The number of non-empty proper subsets of the set \\(\\{1, 2, 3\\}\\) is",
    },
    solution:
      "A set with 3 elements has \\(2^{3} = 8\\) subsets in all.\n\n" +
      "Two of those are excluded here: the set \\(\\{1, 2, 3\\}\\) itself, which is not a PROPER subset, " +
      "and the empty set, which is not NON-EMPTY.\n\n" +
      "So the count is \\(2^{3} - 2 = 6\\). Hence (C).",
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
    opts: { id: string; label: string; text: string }[];
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
    if (fix.stem) {
      if (text !== fix.stem.expect) {
        console.error(`REFUSE ${tag}: stored stem differs from the expected value`);
        console.error(`   stored: ${JSON.stringify(text)}`);
        console.error(`   expect: ${JSON.stringify(fix.stem.expect)}`);
        bad = true;
      } else if (fix.stem.expect === fix.stem.to) {
        console.error(`REFUSE ${tag}: stem expect === to`);
        bad = true;
      } else {
        text = fix.stem.to;
      }
    }
    if (bad) {
      refused++;
      continue;
    }

    const opts = (q.options as any[])
      .map((o) => ({ id: o.id as string, label: o.label as string, text: String(o.text ?? ""), correct: !!o.is_correct }))
      .sort((a, b) => a.label.localeCompare(b.label));
    for (const e of fix.options ?? []) {
      const o = opts.find((x) => x.label === e.label);
      if (!o) {
        console.error(`REFUSE ${tag}: no option ${e.label}`);
        bad = true;
        break;
      }
      if (o.text !== e.expect) {
        console.error(`REFUSE ${tag}: option ${e.label} is ${JSON.stringify(o.text)}, expected ${JSON.stringify(e.expect)}`);
        bad = true;
        break;
      }
      if (e.expect === e.to) {
        console.error(`REFUSE ${tag}: option ${e.label} expect === to`);
        bad = true;
        break;
      }
      o.text = e.to;
    }
    if (bad) {
      refused++;
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
    const enDash = "–";
    if (
      CTRL.test(text) ||
      opts.some((o) => CTRL.test(o.text)) ||
      CTRL.test(solution) ||
      solution.includes("\\\\(") ||
      text.includes(enDash) ||
      opts.some((o) => o.text.includes(enDash)) ||
      solution.includes(enDash) ||
      text.includes("--") ||
      opts.some((o) => o.text.includes("--")) ||
      solution.includes("--")
    ) {
      console.error(`REFUSE ${tag}: repaired value still carries a control char, en-dash or '--'`);
      refused++;
      continue;
    }

    const hash = contentHash(text, opts.map((o) => o.text), key);
    plan.push({
      id: q.id,
      qnum: fix.qnum,
      text,
      solution,
      hash,
      before: q.content_hash,
      opts: opts.map((o) => ({ id: o.id, label: o.label, text: o.text })),
    });

    console.log(`\n${tag}`);
    console.log(`  why: ${fix.why}`);
    if (fix.stem) console.log(`  stem -> ${text}`);
    for (const e of fix.options ?? []) console.log(`  opt ${e.label} -> ${JSON.stringify(e.to)}`);
    if (fix.solution) console.log(`  solution rewritten (${solution.length} chars)`);
    console.log(`  key ${key} UNCHANGED | content_hash ${String(q.content_hash).slice(0, 10)} -> ${hash.slice(0, 10)}`);
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
      const { error } = await db.from("options").update({ text: o.text }).eq("id", o.id);
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
