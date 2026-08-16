/**
 * Apply corrected SOLUTION text to already-committed practice-paper rows.
 *
 * WHY A SEPARATE PATH: `content_hash` is computed from stem + options + answer
 * and deliberately EXCLUDES `solution`, so a solution-only change never reaches
 * the database through commit-paper's upsert — the row already exists and is
 * skipped. Editing the records file alone would therefore look applied and do
 * nothing. This writes the DB directly AND mirrors back into the records file,
 * so a later re-commit cannot revert it.
 *
 *   npx tsx scripts/practice-paper/apply-solution-fixes.ts <slug> <fixesJson> [--apply]
 *
 * <fixesJson> is { "<printedQNumber>": "<new solution text>" }; any key
 * starting "_" is treated as a comment. Dry by default.
 *
 * GUARDS (each refuses rather than repairing silently):
 *  - every question number must resolve to exactly one row of this source_file
 *  - a solution naming an option letter must name the row's OWN correct letter
 *  - no unicode math, no literal "\n", no control characters
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PAPERS } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const [slug, fixesPath] = process.argv.slice(2);
const apply = process.argv.includes("--apply");
if (!slug || !fixesPath) {
  throw new Error("usage: apply-solution-fixes.ts <slug> <fixesJson> [--apply]");
}
const spec = PAPERS[slug];
if (!spec) throw new Error(`unknown paper slug "${slug}"`);

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const raw = JSON.parse(readFileSync(fixesPath, "utf8")) as Record<string, string>;
  const fixes = Object.entries(raw).filter(([k]) => !k.startsWith("_"));

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, options(label, is_correct)")
    .eq("source_file", spec.sourceFile);
  if (error) throw new Error(error.message);

  type Row = { id: string; question_number: string; options: { label: string; is_correct: boolean }[] };
  const byNum = new Map<string, Row[]>();
  for (const r of (data ?? []) as unknown as Row[]) {
    const list = byNum.get(r.question_number) ?? [];
    list.push(r);
    byNum.set(r.question_number, list);
  }

  const problems: string[] = [];
  const planned: { id: string; n: string; solution: string }[] = [];

  for (const [n, solution] of fixes) {
    const rows = byNum.get(n) ?? [];
    if (rows.length !== 1) {
      problems.push(`Q${n}: resolved ${rows.length} rows, expected exactly 1`);
      continue;
    }
    const row = rows[0];
    const correct = row.options.find((o) => o.is_correct)?.label;
    const claimed = [...solution.matchAll(/Matches option ([A-D])/g)].map((m) => m[1]);
    if (claimed.length > 1) problems.push(`Q${n}: solution names ${claimed.length} option letters`);
    if (claimed.length === 1 && claimed[0] !== correct) {
      problems.push(`Q${n}: solution concludes ${claimed[0]} but the stored key is ${correct}`);
    }
    if (/[×÷≈→²³]/.test(solution)) problems.push(`Q${n}: unicode math in solution`);
    if (solution.includes("\\n")) problems.push(`Q${n}: literal backslash-n in solution`);
    // eslint-disable-next-line no-control-regex
    if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(solution)) {
      problems.push(`Q${n}: control character in solution (shell-mangled?)`);
    }
    planned.push({ id: row.id, n, solution });
  }

  console.log(`fixes: ${fixes.length}  resolved: ${planned.length}`);
  if (problems.length) {
    console.log(`\nREFUSED (${problems.length}):`);
    for (const p of problems) console.log("  " + p);
    console.log("\nnothing written.");
    process.exit(1);
  }
  console.log("all guards passed");

  if (!apply) {
    console.log("\nDRY RUN - pass --apply to write");
    return;
  }

  for (const p of planned) {
    const { error: e } = await db.from("questions").update({ solution: p.solution }).eq("id", p.id);
    if (e) throw new Error(`Q${p.n}: ${e.message}`);
  }
  console.log(`updated ${planned.length} rows in the database`);

  // mirror into the records file, the source of record
  const recPath = join(__dirname, "data", spec.recordsFile);
  const recs = JSON.parse(readFileSync(recPath, "utf8")) as { n: number; solution: string }[];
  let mirrored = 0;
  for (const p of planned) {
    const rec = recs.find((r) => String(r.n) === p.n);
    if (rec) {
      rec.solution = p.solution;
      mirrored += 1;
    }
  }
  writeFileSync(recPath, JSON.stringify(recs, null, 1), "utf8");
  console.log(`mirrored ${mirrored}/${planned.length} back into ${spec.recordsFile}`);
  if (mirrored !== planned.length) {
    console.log("WARNING: a fix did not mirror; a re-commit could revert it.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
