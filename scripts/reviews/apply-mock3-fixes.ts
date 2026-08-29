/**
 * Source-verified repairs from the RULE 4 + RULE 5 review of Blueprint Mock 3.
 *
 *   npx tsx scripts/reviews/apply-mock3-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-mock3-fixes.ts --apply
 *
 * THE HEADLINE, for the third paper running: the blind pass produced FIVE
 * letter-level disagreements and NOT ONE of them was a wrong key. Every one was
 * a CORRUPT TRANSCRIPTION under a CORRECT key, settled by rendering the printed
 * booklet page. Acting on the derivations alone would have flipped five correct
 * keys and shipped five wrong answers.
 *
 *   Q161   stem invented three extra factors and an ellipsis. The booklet prints
 *          exactly four factors and stops. Four give 16 = key D; seven give
 *          -128w, which is not real and matches no option.
 *   Q304   stem constant AND all four options corrupt. Booklet: T(n+1)-T(n)=36
 *          with options 2/5/6/9; ours: =10 with 5/10/8/7. The stored SOLUTION
 *          was already solving the booklet's real question ("=36 ... n=9").
 *   Q1572  two coefficient errors in one stem. Booklet: x^2+y^2-4y=0 and
 *          x^2+y^2-8x-4y+11=0; ours: -2y-4 and -11. The booklet's pair gives
 *          exactly sqrt(135)/4 = key C; ours gives sqrt(4403)/17, no option.
 *   Q1892  option A alone is corrupt: booklet prints pi/3, ours pi/2. B, C, D
 *          are all faithful, and the stored solution already derives pi/3 and
 *          says "Matches option A".
 *   Q1912  the leading "(b+c) ." was dropped from the expression and a comma
 *          left in its place, leaving a bare comma operator. Booklet:
 *          (b+c) . a x {(b+c) x a}.
 *
 * TWO GLYPH REPAIRS ARE NOT SOURCE-VERIFIED and are labelled as such below.
 * Their .docx sources are not on disk, so the mathematics has to settle them —
 * which it does unambiguously, because in each case the option set itself names
 * the intended character (see the per-fix `sourceVerified` note).
 *
 * THREE SOLUTIONS ARE REWRITTEN. All three were RULE 5 failures independent of
 * the stem repairs, and one was worse than that: Q1572's stored solution derives
 * 2*sqrt(259/68) (about 3.903) and then writes "= sqrt(135)/4" (about 2.905) —
 * an arithmetically FALSE equality, printed to a student, silently swapping to
 * the keyed answer at the last step. Q1912's ended "Book result is 13", an
 * appeal to a booklet the student has never seen, with an unfinished "= ..."
 * above it. Q161's asserted a pairing rule without ever applying it.
 *
 * content_hash IS recomputed wherever text or options move — both are in the
 * dedup preimage — and the row id is preserved so every paper_questions ref
 * survives. A recomputed hash that would collide with a DIFFERENT question in
 * the same (org, exam) is REFUSED rather than written, because that write would
 * fail the unique index halfway through the batch.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Edit = { find: string; to: string };
type OptionEdit = Edit & { label: string };

type Fix = {
  qnum: string;
  sourceFile: string;
  stem?: Edit[];
  options?: OptionEdit[];
  solution?: string;
  /** Where the printed page was read, or why no page could be read. */
  sourceVerified: string;
  why: string;
};

const FIXES: Fix[] = [
  {
    qnum: "161",
    sourceFile: "NDA_Maths_Practice__Algebra__Complex_Numbers.pdf",
    sourceVerified:
      "01. Algebra_questions.pdf page index 8, right column: the product is printed with FOUR factors and no ellipsis, options a.4 b.8 c.12 d.16.",
    why: "Stem invented three factors and an ellipsis. Key D unchanged.",
    stem: [
      {
        find: "(1 - \\omega^4 + \\omega^8) \\ldots (1 - \\omega^{64} + \\omega^{128})",
        to: "(1 - \\omega^4 + \\omega^8)(1 - \\omega^8 + \\omega^{16})",
      },
    ],
    solution:
      "Use \\(\\omega^3 = 1\\) and \\(1 + \\omega + \\omega^2 = 0\\). The second identity is what collapses each bracket: " +
      "\\(1 + \\omega^2 = -\\omega\\) and \\(1 + \\omega = -\\omega^2\\).\n\n" +
      "Reduce every exponent mod 3 and take the brackets one at a time:\n\n" +
      "\\((1 - \\omega + \\omega^2) = (1 + \\omega^2) - \\omega = -\\omega - \\omega = -2\\omega\\)\n\n" +
      "\\((1 - \\omega^2 + \\omega^4) = 1 - \\omega^2 + \\omega = (1 + \\omega) - \\omega^2 = -\\omega^2 - \\omega^2 = -2\\omega^2\\)   (since \\(\\omega^4 = \\omega\\))\n\n" +
      "\\((1 - \\omega^4 + \\omega^8) = 1 - \\omega + \\omega^2 = -2\\omega\\)   (since \\(\\omega^8 = \\omega^2\\))\n\n" +
      "\\((1 - \\omega^8 + \\omega^{16}) = 1 - \\omega^2 + \\omega = -2\\omega^2\\)   (since \\(\\omega^{16} = \\omega\\))\n\n" +
      "So the product is \\((-2\\omega)(-2\\omega^2)(-2\\omega)(-2\\omega^2) = (-2)^4\\,\\omega^{1+2+1+2} = 16\\,\\omega^{6}\\).\n\n" +
      "And \\(\\omega^6 = (\\omega^3)^2 = 1\\), so the value is \\(16\\). Hence (D).",
  },
  {
    qnum: "304",
    sourceFile: "NDA_Maths_Practice__Algebra__Permutation_and_Combination.pdf",
    sourceVerified:
      "01. Algebra_questions.pdf page index 14, right column: prints T(n+1) - T(n) = 36 with options a.2 b.5 c.6 d.9.",
    why:
      "Stem constant and all four option values corrupt. Key D unchanged, and the booklet's (d) is 9 — which is what the stored solution already derives.",
    stem: [{ find: "T_{n+1} - T_{n} = 10", to: "T_{n+1} - T_{n} = 36" }],
    options: [
      { label: "A", find: "5", to: "2" },
      { label: "B", find: "10", to: "5" },
      { label: "C", find: "8", to: "6" },
      { label: "D", find: "7", to: "9" },
    ],
  },
  {
    qnum: "1572",
    sourceFile: "NDA_Maths_Practice__2D__Circles.pdf",
    sourceVerified:
      "3. 2D Geometry page 73-92.pdf page index 8: prints x^2+y^2-4y=0 and x^2+y^2-8x-4y+11=0.",
    why:
      "Two coefficient errors in one stem. As stored the chord is sqrt(4403)/17, matching no option; option B was geometrically impossible against the stored radius. Key C unchanged.",
    stem: [
      { find: "x^2 + y^2 - 2y - 4 = 0", to: "x^2 + y^2 - 4y = 0" },
      { find: "x^2 + y^2 - 8x - 4y - 11 = 0", to: "x^2 + y^2 - 8x - 4y + 11 = 0" },
    ],
    solution:
      "Subtract the two equations to get the common chord (the radical axis). The \\(x^2 + y^2\\) terms cancel:\n\n" +
      "\\((x^2 + y^2 - 4y) - (x^2 + y^2 - 8x - 4y + 11) = 8x - 11 = 0\\), so the chord lies on \\(x = \\dfrac{11}{8}\\).\n\n" +
      "Take the first circle, \\(x^2 + y^2 - 4y = 0\\): centre \\((0, 2)\\) and radius \\(r = \\sqrt{0 + 4 - 0} = 2\\).\n\n" +
      "Its distance from the chord is \\(d = \\left|0 - \\dfrac{11}{8}\\right| = \\dfrac{11}{8}\\).\n\n" +
      "A chord of a circle at distance \\(d\\) from the centre has length \\(2\\sqrt{r^2 - d^2}\\):\n\n" +
      "\\(2\\sqrt{4 - \\dfrac{121}{64}} = 2\\sqrt{\\dfrac{256 - 121}{64}} = 2\\cdot\\dfrac{\\sqrt{135}}{8} = \\dfrac{\\sqrt{135}}{4}\\).\n\n" +
      "Hence (C). (Sanity check: \\(\\sqrt{135}/4 \\approx 2.90\\), comfortably under the diameter \\(2r = 4\\), as any chord must be.)",
  },
  {
    qnum: "1892",
    sourceFile: "NDA_Maths_Practice__3D__Vectors.pdf",
    sourceVerified:
      "3. 3D Geometry page 93-109.pdf page index 5: options print a. pi/3, b. pi/6, c. 2pi/3, d. None of these.",
    why:
      "Option A alone was corrupt (pi/2 for pi/3). The stem, the other three options and the stored solution — which derives pi/3 and says 'Matches option A' — were all already correct. Key A unchanged.",
    options: [{ label: "A", find: "\\frac{\\pi}{2}", to: "\\frac{\\pi}{3}" }],
  },
  {
    qnum: "1912",
    sourceFile: "NDA_Maths_Practice__3D__Vectors.pdf",
    sourceVerified:
      "3. 3D Geometry page 93-109.pdf page index 6: prints ( b + c ) . a x {( b + c ) x a} is equal to.",
    why:
      "The leading '(b+c) .' was dropped and a comma left between the two halves, leaving no operator joining them. Key C unchanged.",
    stem: [
      {
        find:
          "\\( \\vec{a} \\times (\\vec{b} + \\vec{c}) \\), \\( \\vec{a} \\times [(\\vec{b} + \\vec{c}) \\times \\vec{a}] \\)",
        to:
          "\\( (\\vec{b} + \\vec{c}) \\cdot \\vec{a} \\times \\{(\\vec{b} + \\vec{c}) \\times \\vec{a}\\} \\)",
      },
    ],
    solution:
      "First collapse the repeated vector. \\(\\vec{b} + \\vec{c} = (-1 + 2)\\hat{i} + (2 - 2)\\hat{j} + (3 - 3)\\hat{k} = \\hat{i}\\), " +
      "so write \\(\\vec{u} = \\vec{b} + \\vec{c} = \\hat{i}\\).\n\n" +
      "Now expand the inner triple product with \\(\\vec{a} \\times (\\vec{u} \\times \\vec{a}) = \\vec{u}\\,(\\vec{a}\\cdot\\vec{a}) - \\vec{a}\\,(\\vec{a}\\cdot\\vec{u})\\).\n\n" +
      "Here \\(\\vec{a}\\cdot\\vec{a} = 1 + 4 + 9 = 14\\) and \\(\\vec{a}\\cdot\\vec{u} = 1\\), so\n\n" +
      "\\(\\vec{a} \\times (\\vec{u} \\times \\vec{a}) = 14\\hat{i} - (\\hat{i} + 2\\hat{j} + 3\\hat{k}) = 13\\hat{i} - 2\\hat{j} - 3\\hat{k}\\).\n\n" +
      "Dot that with \\(\\vec{u} = \\hat{i}\\): only the \\(\\hat{i}\\) component survives, giving \\(13\\). Hence (C).\n\n" +
      "Worth noting the shortcut: \\(\\vec{u}\\cdot[\\vec{a} \\times (\\vec{u} \\times \\vec{a})] = |\\vec{a}|^2|\\vec{u}|^2 - (\\vec{a}\\cdot\\vec{u})^2 = |\\vec{u} \\times \\vec{a}|^2\\), " +
      "which is \\(14 \\times 1 - 1^2 = 13\\) without computing a single cross product.",
  },
  {
    qnum: "71",
    sourceFile: "NDA_Maths_Mock_Test_02.docx",
    sourceVerified:
      "NOT source-verified — the .docx is not on disk. Settled by the option set itself: the four options of a question asking for a power of i are 1, -1, i, -i, and A and B are already 1 and -1. A capital 'I' is not a quantity, and '--i' is not an expression.",
    why: "Two glyph defects: option C is a capital I for i, option D a doubled hyphen. Key C unchanged.",
    options: [
      { label: "C", find: "I", to: "i" },
      { label: "D", find: "--i", to: "-i" },
    ],
  },
  {
    qnum: "69",
    sourceFile: "NDA_Maths_Mock_Test_07.docx",
    sourceVerified:
      "NOT source-verified — the .docx is not on disk. Settled by the mathematics: on 1 < x < 3 the function is (x-1) + (3-x) = 2, a constant, so the derivative at x = 2 is 0. The letter O is not a value, and 0 completes the option set -2, 0, 2, Undefined.",
    why: "Option B is a capital letter O where the digit 0 belongs. Key B unchanged.",
    options: [{ label: "B", find: "\\(O\\)", to: "\\(0\\)" }],
  },
];

// eslint-disable-next-line no-control-regex
const CTRL = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

type Planned = {
  id: string;
  qnum: string;
  text: string;
  solution: string | null;
  hash: string;
  beforeHash: string;
  opts: { id: string; label: string; text: string }[];
  orgId: string;
  examId: string;
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let refused = 0;
  const plan: Planned[] = [];

  for (const fix of FIXES) {
    const label = `Q${fix.qnum} (${fix.sourceFile})`;
    const { data, error } = await db
      .from("questions")
      .select(
        "id, org_id, exam_id, question_number, text, solution, content_hash, options(id, label, text, is_correct)"
      )
      .eq("source_file", fix.sourceFile)
      .eq("question_number", fix.qnum);
    if (error) throw error;
    const rows = data as any[];
    if (rows.length !== 1) {
      console.error(`REFUSE ${label}: matched ${rows.length} rows, expected 1`);
      refused++;
      continue;
    }
    const q = rows[0];

    if (!fix.stem?.length && !fix.options?.length && !fix.solution) {
      console.error(`REFUSE ${label}: no edit specified`);
      refused++;
      continue;
    }

    // --- stem, applied in order, each needle matching exactly once ---
    let text = String(q.text);
    let bad = false;
    for (const e of fix.stem ?? []) {
      if (e.find === e.to) {
        console.error(`REFUSE ${label}: stem find === to (mangled needle?)`);
        bad = true;
        break;
      }
      const hits = text.split(e.find).length - 1;
      if (hits !== 1) {
        console.error(`REFUSE ${label}: stem needle matched ${hits}x, expected 1`);
        console.error(`   find: ${JSON.stringify(e.find)}`);
        console.error(`   stem: ${JSON.stringify(text.slice(0, 240))}`);
        bad = true;
        break;
      }
      text = text.replace(e.find, e.to);
    }
    if (bad) {
      refused++;
      continue;
    }

    // --- options ---
    const opts = (q.options as any[])
      .map((o) => ({ id: o.id as string, label: o.label as string, text: String(o.text ?? ""), correct: !!o.is_correct }))
      .sort((a, b) => a.label.localeCompare(b.label));
    for (const e of fix.options ?? []) {
      const o = opts.find((x) => x.label === e.label);
      if (!o) {
        console.error(`REFUSE ${label}: no option ${e.label}`);
        bad = true;
        break;
      }
      if (e.find === e.to) {
        console.error(`REFUSE ${label}: option ${e.label} find === to`);
        bad = true;
        break;
      }
      const hits = o.text.split(e.find).length - 1;
      if (hits !== 1) {
        console.error(
          `REFUSE ${label}: option ${e.label} needle matched ${hits}x in ${JSON.stringify(o.text)}`
        );
        bad = true;
        break;
      }
      o.text = o.text.replace(e.find, e.to);
    }
    if (bad) {
      refused++;
      continue;
    }

    // Options must stay four distinct strings, or a repair has manufactured a twin.
    const distinct = new Set(opts.map((o) => o.text.trim()));
    if (distinct.size !== opts.length) {
      console.error(`REFUSE ${label}: repair leaves duplicate option text`);
      refused++;
      continue;
    }

    const correct = opts.filter((o) => o.correct);
    if (correct.length !== 1) {
      console.error(`REFUSE ${label}: ${correct.length} correct options`);
      refused++;
      continue;
    }
    const key = correct[0].label;

    const solution = fix.solution ?? (q.solution as string | null);
    if (
      CTRL.test(text) ||
      opts.some((o) => CTRL.test(o.text)) ||
      (solution ? CTRL.test(solution) || solution.includes("\\\\(") : false)
    ) {
      console.error(`REFUSE ${label}: control char or double-escaped delimiter`);
      refused++;
      continue;
    }

    const hash = contentHash(
      text,
      opts.map((o) => o.text),
      key
    );

    // A recomputed hash colliding with a DIFFERENT row in the same (org, exam)
    // violates the unique index — catch it here rather than mid-batch.
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
        console.error(`REFUSE ${label}: new content_hash collides with ${JSON.stringify(clash)}`);
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
      beforeHash: q.content_hash,
      opts: opts.map((o) => ({ id: o.id, label: o.label, text: o.text })),
      orgId: q.org_id,
      examId: q.exam_id,
    });

    console.log(`\n${label}`);
    console.log(`  why:    ${fix.why}`);
    console.log(`  source: ${fix.sourceVerified}`);
    if (fix.stem?.length) console.log(`  stem -> ${text}`);
    for (const e of fix.options ?? []) {
      const o = opts.find((x) => x.label === e.label)!;
      console.log(`  opt ${e.label} -> ${JSON.stringify(o.text)}`);
    }
    if (fix.solution) console.log(`  solution rewritten (${(solution ?? "").length} chars)`);
    console.log(
      `  key ${key} UNCHANGED | content_hash ${String(q.content_hash).slice(0, 10)} -> ${hash.slice(0, 10)}`
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
