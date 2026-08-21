/**
 * Targeted wording repairs to already-applied solutions.
 *
 *   npx tsx scripts/cbse-12-pyq/fix-solution-wording.ts
 *   npx tsx scripts/cbse-12-pyq/fix-solution-wording.ts --apply
 *
 * WHY THIS EXISTS. `audit-keys` compares the option letter a solution CONCLUDES
 * with against the stored key. Two phrasings collide with that extractor while
 * being perfectly correct maths, so the probe reports SOLN≠KEY on a right
 * answer. Relocating the probe would blind it; rewording the solution silences
 * it permanently AND reads better, so the fix belongs here.
 *
 * The two shapes, both confirmed by hand against the paper:
 *
 *   1. ASSERTION-REASON. CBSE labels the two statements (A) and (R), so the
 *      natural conclusion "Hence (A) is true but (R) is false" ends in a token
 *      identical to option letter A. `concludedLetter` already suppresses the
 *      BARE trailing `(A)` for A-R solutions, but not the `Hence (A)` form —
 *      and every CBSE paper carries two A-R questions, so this recurs by
 *      construction. Name the statements in words instead.
 *
 *   2. "option a <text>". The SOLUTION_BRIEF tells authors to name the option
 *      TEXT rather than its letter (a letter goes stale if options are ever
 *      reordered). When the text begins with the article "a", the result is
 *      "option a right-angled triangle" and the extractor reads the article as
 *      letter A. Drop the word "option".
 *
 * EVERY REPAIR MUST MATCH EXACTLY ONCE OR IT IS REFUSED. A near-miss silently
 * applied to the wrong span is undetectable afterwards, and a `find` that has
 * been mangled by a shell layer fails as a near-miss — so a repair whose `find`
 * equals its `replace` is refused too.
 *
 * Rows are addressed by (source_file, question_number). The solution is NOT part
 * of content_hash, so writing one can never orphan a row or move its id.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { concludedLetter } from "../practice/audit-keys";
import { DATA, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Fix = { source: string; qnum: string; why: string; find: string; replace: string };

const FIXES: Fix[] = [
  {
    source: "cbse-12-pyq-2023-65-2-1",
    qnum: "19",
    why: "Assertion-Reason: 'Hence (A)' collides with option letter A. Key (C) is correct — arccos has range [0, pi], so (R) is false while (A) is true.",
    find: "Hence (A) is true but (R) is false. Note that (R), had it been true, would have made (A) false,",
    replace: "So the Assertion is true while the Reason is false. Note that the Reason, had it been true, would have made the Assertion false,",
  },
  {
    source: "cbse-12-pyq-2024-65-4-1",
    qnum: "12",
    why: "'option a right-angled triangle' reads the article as letter A. Key (D) is correct — 6 + 35 = 41, so the converse of Pythagoras applies.",
    find: "so the triangle is right-angled — option a right-angled triangle.",
    replace: "so the triangle is right-angled, matching the choice “a right-angled triangle”.",
  },
];

async function main() {
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const plan: { id: string; label: string; next: string; before: string | null; after: string | null }[] = [];
  const bad: string[] = [];

  for (const f of FIXES) {
    const label = `${f.source} Q${f.qnum}`;
    if (f.find === f.replace) { bad.push(`${label}: find === replace — the needle was probably mangled`); continue; }

    const { data, error } = await client.from("questions")
      .select("id, solution")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .eq("source_file", f.source).eq("question_number", f.qnum);
    if (error) throw new Error(error.message);
    if (!data || data.length !== 1) { bad.push(`${label}: resolves to ${data?.length ?? 0} rows — refusing`); continue; }

    const cur = data[0].solution as string | null;
    if (!cur) { bad.push(`${label}: row carries no solution`); continue; }
    const hits = cur.split(f.find).length - 1;
    if (hits !== 1) { bad.push(`${label}: needle matches ${hits} time(s), need exactly 1 — refusing`); continue; }

    const next = cur.split(f.find).join(f.replace);
    plan.push({
      id: data[0].id as string, label, next,
      before: concludedLetter(cur), after: concludedLetter(next),
    });
  }

  for (const p of plan) {
    console.log(`${p.label}: concludedLetter ${p.before ?? "null"} -> ${p.after ?? "null"}`);
    // The whole point is to stop the probe reading a letter out of correct prose.
    if (p.after !== null) console.log(`  !! still resolves to a letter — the reword did not do its job`);
  }
  if (bad.length) {
    console.log(`\n${bad.length} refusal(s):`);
    for (const b of bad) console.log(`  ${b}`);
  }

  // Mirror into the source-of-record topaper file where one still holds the row.
  // A paper that has been RE-DUMPED no longer carries its already-applied rows
  // (that omission is what keeps the job finite), so the DB is the only live
  // copy for those — git history holds the original text.
  const mirrored: string[] = [];
  const unmirrored: string[] = [];
  if (existsSync(DATA)) {
    for (const file of readdirSync(DATA).filter((x) => x.endsWith(".topaper.json"))) {
      const path = join(DATA, file);
      const doc = JSON.parse(readFileSync(path, "utf8")) as { rows: { questionNumber: string; solution?: string }[] };
      let touched = false;
      for (const f of FIXES) {
        for (const r of doc.rows) {
          if (r.questionNumber !== f.qnum || !r.solution) continue;
          if (r.solution.split(f.find).length - 1 !== 1) continue;
          r.solution = r.solution.split(f.find).join(f.replace);
          touched = true;
          mirrored.push(`${file} Q${f.qnum}`);
        }
      }
      if (touched && apply) writeFileSync(path, JSON.stringify(doc, null, 1));
    }
  }
  for (const f of FIXES) {
    if (!mirrored.some((m) => m.endsWith(`Q${f.qnum}`))) unmirrored.push(`${f.source} Q${f.qnum}`);
  }
  if (mirrored.length) console.log(`\nsource mirror: ${mirrored.join(", ")}`);
  if (unmirrored.length) console.log(`no topaper row to mirror (re-dumped; DB is the live copy): ${unmirrored.join(", ")}`);

  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }
  if (bad.length) throw new Error("refusing to write — resolve the refusals above first.");

  for (const p of plan) {
    const { error } = await client.from("questions").update({ solution: p.next }).eq("id", p.id);
    if (error) throw new Error(`${p.label}: ${error.message}`);
  }
  console.log(`\ndone. ${plan.length} solution(s) reworded.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
