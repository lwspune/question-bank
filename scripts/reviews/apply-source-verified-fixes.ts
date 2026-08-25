/**
 * Apply SOURCE-VERIFIED repairs found by the blind review of a paper.
 *
 *   npx tsx scripts/reviews/apply-source-verified-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-source-verified-fixes.ts --apply
 *
 * Every repair below was adjudicated against the PRINTED practice booklet
 * (C:\tmp\Practice\Maths), not derived. In all three transcription defects the
 * stored KEY LETTER was already correct — only the stem/option TEXT was corrupt,
 * which is the reverse of the usual assumption and the reason the source had to
 * be read rather than reasoned about.
 *
 * TWO GUARDS, both of which have caught real mistakes in this repo before:
 *  - every `find` must match EXACTLY ONCE or the whole batch is refused; a
 *    near-miss silently repairing the wrong span is worse than no repair.
 *  - a repair whose `find` equals its `to` is refused — that is what a
 *    shell-mangled needle looks like (the backslashes were eaten).
 *
 * CONTENT_HASH: editing stem or option text changes the dedup preimage, so the
 * hash is RECOMPUTED with the project's own contentHash(). Leaving it stale
 * would let a future re-ingest of the corrected source insert a duplicate.
 * The row id is deliberately preserved so paper_questions refs stay valid.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = "f755370e-e175-4fae-9088-58fda7cc1914";

type Edit = { field: "text" | "solution" | `option:${string}`; find: string; to: string };
type Fix = {
  qnum: string;
  why: string;
  edits: Edit[];
  /** Whole-solution rewrite. Used where the stored solution was written AGAINST
   *  the corrupted question and argues itself into the answer ("Following the
   *  book the length = ...") — there is no span to patch, the reasoning is the
   *  defect. Applied AFTER `edits`. */
  rewriteSolution?: string;
};

const FIXES: Fix[] = [
  {
    qnum: "1111",
    why: "Booklet p58 prints pi/3 in ALL four options; ours has pi/6 in a and c. That corruption both removed the correct answer and made a=d, b=c. Key C already correct.",
    edits: [
      { field: "option:A", find: "\\frac{\\pi}{6} - \\theta", to: "\\frac{\\pi}{3} - \\theta" },
      { field: "option:C", find: "\\frac{\\pi}{6} + \\theta", to: "\\frac{\\pi}{3} + \\theta" },
    ],
    rewriteSolution:
      "\\(\\dfrac{1}{\\sin\\theta} - \\dfrac{\\sqrt3}{\\cos\\theta} = \\dfrac{\\cos\\theta - \\sqrt3\\sin\\theta}{\\sin\\theta\\cos\\theta}\\). " +
      "Write the numerator as \\(2\\left(\\tfrac12\\cos\\theta - \\tfrac{\\sqrt3}{2}\\sin\\theta\\right) = 2\\cos\\!\\left(\\theta + \\dfrac{\\pi}{3}\\right)\\), " +
      "and the denominator as \\(\\tfrac12\\sin 2\\theta\\). " +
      "Hence the expression \\(= \\dfrac{2\\cos\\!\\left(\\frac{\\pi}{3} + \\theta\\right)}{\\tfrac12\\sin 2\\theta} = \\dfrac{4\\cos\\!\\left(\\frac{\\pi}{3} + \\theta\\right)}{\\sin 2\\theta}\\). Hence (C).",
  },
  {
    qnum: "2015",
    why: "Booklet p104 prints (z - z1)/2, not /0. Direction ratios are (0,1,2), so the line is NOT parallel to the y-axis and only 'perpendicular to the x-axis' is true. Key A already correct.",
    edits: [
      { field: "text", find: "\\dfrac{z-z_1}{0}", to: "\\dfrac{z-z_1}{2}" },
      {
        field: "solution",
        find:
          "Direction ratios \\( (0, 1, 0) \\), so the line is parallel to the \\( y \\)-axis. Matches option A. (Note: parallel to the y-axis is itself perpendicular to the x-axis; the printed key is A — perpendicular to the x-axis.)",
        to:
          "Direction ratios are \\( (0, 1, 2) \\). Since \\( (0,1,2)\\cdot(1,0,0) = 0 \\), the line is perpendicular to the \\( x \\)-axis. It is NOT parallel to the \\( y \\)-axis (that would need ratios \\( (0,1,0) \\)), not perpendicular to the \\( yz \\)-plane (that would need \\( (1,0,0) \\)), and not parallel to the \\( xz \\)-plane (since \\( (0,1,2)\\cdot(0,1,0) = 1 \\neq 0 \\)). Hence (A).",
      },
    ],
  },
  {
    qnum: "1826",
    why: "Booklet p95 prints 'the vectors AB = 3i + 4k and AC = ...' with options a. sqrt45 b. sqrt18 c. sqrt72 d. sqrt33. Ours dropped the AB label, read 3 as 8, and shifted options c/d. |AM| = |4i - j + 4k| = sqrt33 = printed d. Key D already correct.",
    edits: [
      {
        field: "text",
        find: "If the vertices \\(8\\hat{i} + 4\\hat{k}\\) and \\(\\vec{AC} = 5\\hat{i} - 2\\hat{j} + 4\\hat{k}\\)",
        to: "If the vectors \\(\\vec{AB} = 3\\hat{i} + 4\\hat{k}\\) and \\(\\vec{AC} = 5\\hat{i} - 2\\hat{j} + 4\\hat{k}\\)",
      },
      { field: "option:C", find: "\\(\\sqrt{33}\\)", to: "\\(\\sqrt{72}\\)" },
      { field: "option:D", find: "\\(\\sqrt{20}\\)", to: "\\(\\sqrt{33}\\)" },
    ],
    rewriteSolution:
      "The median through \\(A\\) meets the midpoint \\(M\\) of \\(BC\\), so \\(\\vec{AM} = \\tfrac12(\\vec{AB} + \\vec{AC})\\). " +
      "With \\(\\vec{AB} = 3\\hat{i} + 4\\hat{k}\\) and \\(\\vec{AC} = 5\\hat{i} - 2\\hat{j} + 4\\hat{k}\\): " +
      "\\(\\vec{AM} = \\tfrac12\\left(8\\hat{i} - 2\\hat{j} + 8\\hat{k}\\right) = 4\\hat{i} - \\hat{j} + 4\\hat{k}\\). " +
      "Hence \\(|\\vec{AM}| = \\sqrt{16 + 1 + 16} = \\sqrt{33}\\). Hence (D).",
  },
  {
    qnum: "748",
    why: "OMML: a superscript on a parenthesised group containing \\cup is unconvertible, so the Word answer key shipped raw LaTeX. \\overline{} is the only form that converts (verified against findOmmlFailures). Web render is unchanged.",
    edits: [
      { field: "solution", find: "P((A \\cup B)^C)", to: "P(\\overline{A \\cup B})" },
    ],
  },
  {
    qnum: "480",
    why: "Internal audit note printed to students. Key A (H.P.) is correct and stays; note reworded to be student-facing.",
    edits: [
      {
        field: "solution",
        find: " [Source answer key prints 'b' (A.P.), which contradicts this derivation.]",
        to: " [Note: some printed keys give A.P.; the derivation above gives H.P.]",
      },
    ],
  },
  {
    qnum: "1252",
    why: "Internal audit note printed to students. Key A is correct and stays.",
    edits: [
      {
        field: "solution",
        find:
          " [Note: the book's printed key marks (C), but the correct value is \\(-\\cos C\\) = option (A).]",
        to: " [Note: some printed keys give \\(\\tan C\\); the identity above gives \\(-\\cos C\\).]",
      },
    ],
  },
  {
    qnum: "134",
    why: "Internal audit note printed to students. Key C (0) is correct and stays.",
    edits: [
      {
        field: "solution",
        find: " [The source answer key prints 'b' (64), but the book's own solution lands on 0.]",
        to: " [Note: some printed keys give 64; both terms equal 64, so the difference is 0.]",
      },
    ],
  },
];

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("paper_questions")
    .select("questions!inner(id,question_number,text,solution,content_hash,options(id,label,text,is_correct))")
    .eq("paper_id", PAPER);
  if (error) throw error;

  const byNum = new Map<string, any>();
  for (const r of data as any[]) byNum.set(String(r.questions.question_number), r.questions);

  let refused = 0;
  const plan: { q: any; text: string; solution: string; opts: Map<string, string>; hash: string }[] = [];

  for (const fix of FIXES) {
    const q = byNum.get(fix.qnum);
    if (!q) {
      console.error(`REFUSE Q${fix.qnum}: not in paper`);
      refused++;
      continue;
    }
    let text: string = q.text;
    let solution: string = q.solution ?? "";
    const opts = new Map<string, string>(q.options.map((o: any) => [o.label, o.text as string]));
    let ok = true;

    for (const e of fix.edits) {
      if (e.find === e.to) {
        console.error(`REFUSE Q${fix.qnum}: find === to (mangled needle?)`);
        ok = false;
        break;
      }
      const read = () =>
        e.field === "text" ? text : e.field === "solution" ? solution : opts.get(e.field.slice(7)) ?? "";
      const src = read();
      const hits = src.split(e.find).length - 1;
      if (hits !== 1) {
        console.error(`REFUSE Q${fix.qnum} [${e.field}]: needle matched ${hits}x, expected exactly 1`);
        console.error(`   find: ${JSON.stringify(e.find)}`);
        console.error(`   src : ${JSON.stringify(src.slice(0, 220))}`);
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
        console.error(`REFUSE Q${fix.qnum}: rewriteSolution is identical to the stored solution`);
        refused++;
        continue;
      }
      solution = fix.rewriteSolution;
    }

    const key = (q.options.find((o: any) => o.is_correct)?.label ?? "") as string;
    const hash = contentHash(text, [...opts.values()], key);
    plan.push({ q, text, solution, opts, hash });
    console.log(`\nQ${fix.qnum}  ${fix.why}`);
    if (text !== q.text) console.log(`  text     -> ${text.slice(0, 150)}`);
    for (const o of q.options as any[]) {
      const nv = opts.get(o.label)!;
      if (nv !== o.text) console.log(`  option ${o.label} -> ${nv}`);
    }
    if (solution !== (q.solution ?? "")) console.log(`  solution -> ${solution.slice(0, 180)}`);
    console.log(`  key ${key} UNCHANGED | content_hash ${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}${hash === q.content_hash ? " (same)" : ""}`);
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
