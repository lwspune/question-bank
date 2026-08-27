/**
 * Source-verified repairs from the RULE 4 blind review of Blueprint Mock 2.
 *
 *   npx tsx scripts/reviews/apply-mock2-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-mock2-fixes.ts --apply
 *
 * The blind pass returned 117 AGREE / 3 NONE / 0 FLIP across 120 questions —
 * ZERO wrong keys. Two of the three NONEs were an artifact of my own batch
 * splitter dropping `context`, so the set-bound pair read as "V and W are never
 * defined"; both keys were confirmed correct once re-derived with the context.
 *
 * That leaves ONE genuine content defect, repaired here, and it is the Mock 1
 * pattern exactly: a CORRECT key under a CORRUPT stem.
 *
 * Q1130 — the stored stem says `tan(alpha/2) = b/a`. The printed booklet
 * (2 Trigonometry page 53-72.pdf, page index 6, left column) says `tan alpha
 * = b/a`. Read as printed by us, the expression evaluates to
 * 2 sin(alpha/2)/sqrt(cos alpha), which matches NO option — checked at four
 * separated angles. With the booklet's `tan alpha` it is exactly
 * 2 sin(alpha)/sqrt(cos 2 alpha), the stored key A, to 30 digits at every test
 * angle. Two further signs the booklet is right: that reading is what forces
 * the stem's own stated range 0 < alpha < pi/4, and it is what keeps the
 * option's radical real.
 *
 * content_hash IS recomputed — the stem is part of the dedup preimage — and the
 * row id is preserved so the paper_questions ref survives.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

type Fix = {
  qnum: string;
  sourceFile: string;
  find: string;
  to: string;
  why: string;
  solution?: string;
};

const FIXES: Fix[] = [
  {
    qnum: "1130",
    sourceFile: "NDA_Maths_Practice__Trigonometry__Trigonometric_Identities.pdf",
    find: "\\tan\\frac{\\alpha}{2} = \\frac{b}{a}",
    to: "\\tan\\alpha = \\frac{b}{a}",
    why:
      "Source-verified against the printed booklet: it prints tan(alpha) = b/a, not tan(alpha/2). As stored, no option was reachable. Key A unchanged.",
    solution:
      "Write \\(t = \\tan\\alpha = \\dfrac{b}{a}\\), so \\(b = at\\) with \\(0 < t < 1\\) (because \\(a > b > 0\\)).\n\n" +
      "Take the two surds over a common form:\n" +
      "\\(\\sqrt{\\dfrac{a+b}{a-b}} - \\sqrt{\\dfrac{a-b}{a+b}} = \\dfrac{(a+b) - (a-b)}{\\sqrt{(a+b)(a-b)}} = \\dfrac{2b}{\\sqrt{a^{2}-b^{2}}}\\).\n\n" +
      "Now substitute \\(b = a\\tan\\alpha\\). The numerator is \\(2a\\tan\\alpha\\), and\n" +
      "\\(a^{2} - b^{2} = a^{2}\\left(1 - \\tan^{2}\\alpha\\right)\\), so \\(\\sqrt{a^{2}-b^{2}} = a\\sqrt{1-\\tan^{2}\\alpha}\\).\n\n" +
      "The \\(a\\) cancels:\n" +
      "\\(\\dfrac{2\\tan\\alpha}{\\sqrt{1-\\tan^{2}\\alpha}} = \\dfrac{2\\sin\\alpha/\\cos\\alpha}{\\sqrt{\\left(\\cos^{2}\\alpha-\\sin^{2}\\alpha\\right)/\\cos^{2}\\alpha}} " +
      "= \\dfrac{2\\sin\\alpha/\\cos\\alpha}{\\sqrt{\\cos 2\\alpha}\\,/\\cos\\alpha} = \\dfrac{2\\sin\\alpha}{\\sqrt{\\cos 2\\alpha}}\\).\n\n" +
      "Hence (A). Note the stated range \\(0 < \\alpha < \\dfrac{\\pi}{4}\\) is exactly what makes \\(\\cos 2\\alpha > 0\\), so the radical is real.",
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
  const plan: { id: string; qnum: string; text: string; solution: string; hash: string; before: string }[] = [];

  for (const fix of FIXES) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, text, solution, content_hash, options(label, text, is_correct)")
      .eq("source_file", fix.sourceFile)
      .eq("question_number", fix.qnum);
    if (error) throw error;
    const rows = data as any[];
    if (rows.length !== 1) {
      console.error(`REFUSE Q${fix.qnum}: matched ${rows.length} rows`);
      refused++;
      continue;
    }
    const q = rows[0];
    if (fix.find === fix.to) {
      console.error(`REFUSE Q${fix.qnum}: find === to (mangled needle?)`);
      refused++;
      continue;
    }
    const hits = String(q.text).split(fix.find).length - 1;
    if (hits !== 1) {
      console.error(`REFUSE Q${fix.qnum}: needle matched ${hits}x, expected exactly 1`);
      console.error(`   find: ${JSON.stringify(fix.find)}`);
      console.error(`   stem: ${JSON.stringify(String(q.text).slice(0, 200))}`);
      refused++;
      continue;
    }
    const text = String(q.text).replace(fix.find, fix.to);
    const solution = fix.solution ?? (q.solution ?? "");
    if (CTRL.test(text) || CTRL.test(solution) || solution.includes("\\\\(")) {
      console.error(`REFUSE Q${fix.qnum}: control char or double-escaped delimiter`);
      refused++;
      continue;
    }
    const key = (q.options as any[]).find((o) => o.is_correct)?.label;
    if (!key) {
      console.error(`REFUSE Q${fix.qnum}: no correct option`);
      refused++;
      continue;
    }
    const hash = contentHash(text, (q.options as any[]).map((o) => o.text as string), key);
    plan.push({ id: q.id, qnum: fix.qnum, text, solution, hash, before: q.content_hash });

    console.log(`\nQ${fix.qnum}  ${fix.why}`);
    console.log(`  stem -> ${text}`);
    console.log(`  key ${key} UNCHANGED | content_hash ${q.content_hash.slice(0, 10)} -> ${hash.slice(0, 10)}`);
    if (fix.solution) console.log(`  solution rewritten (${solution.length} chars)`);
  }

  if (refused) {
    console.error(`\n${refused} refused — nothing written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} question(s) would be updated.`);
    return;
  }
  for (const p of plan) {
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
