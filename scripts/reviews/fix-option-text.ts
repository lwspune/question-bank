/**
 * Repair a corrupted OPTION TEXT, in the source of record and the database.
 *
 *   npx tsx scripts/reviews/fix-option-text.ts          # dry run
 *   npx tsx scripts/reviews/fix-option-text.ts --apply
 *
 * WHY THIS IS ITS OWN SCRIPT. A solution-only edit is free: `content_hash` is
 * sha256(stem + sorted option texts + answer) and excludes `solution`. An OPTION
 * edit changes that hash. Leaving the stored hash alone would make it no longer
 * describe its own row, so the next re-ingest from the corrected source would
 * hash differently and insert a DUPLICATE instead of finding this row.
 *
 * So all three have to move together: the source JSON, the option text, and the
 * stored hash — and the source must be fixed too, or the next resync reverts us.
 *
 * THE GUARD THAT MAKES THIS SAFE: before writing anything, recompute the hash
 * from the CURRENT source values and require it to equal what the database
 * already stores. That proves this script feeds `contentHash` exactly what the
 * ingest fed it. If it disagrees, the inputs are wrong and nothing is written —
 * a recomputed "new" hash from wrong inputs would silently orphan the row.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

/** One repair: a corrupted option text that renders literally. */
const FIXES = [
  {
    questionId: "930819d1-f485-4349-8429-0d0e7e0859d8",
    sourceFile: join(process.cwd(), "scripts", "mh-hsc-12-pyq", "data", "differentiation-12-pyq.questions.json"),
    ref: "differentiation-12-pyq#10",
    label: "C",
    from: "--1",
    to: "-1",
    // Two ASCII hyphens sit outside any math zone and print as "--1". The row is
    // the only "--" in this file that is not a markdown table rule, and the key
    // (D) is independently verified: log(x+y)=2xy at x=0 gives y=1, and
    // (1+y')/(x+y) = 2y+2xy' at (0,1) gives y' = 1.
    why: "renders literally as --1 instead of -1",
  },
];

type Opt = { label: string; text: string };
type Q = { ref: string; questionNumber: string; stem: string; options: Opt[]; answer: string };

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const fix of FIXES) {
    const rows: Q[] = JSON.parse(readFileSync(fix.sourceFile, "utf8"));
    const q = rows.find((r) => r.ref === fix.ref);
    if (!q) throw new Error(`ref not in source: ${fix.ref}`);

    const opt = q.options.find((o) => o.label === fix.label);
    if (!opt) throw new Error(`no option ${fix.label} on ${fix.ref}`);
    if (opt.text !== fix.from) throw new Error(`option ${fix.label} is ${JSON.stringify(opt.text)}, expected ${JSON.stringify(fix.from)} — source already changed?`);

    const oldHash = contentHash(q.stem, q.options.map((o) => o.text), q.answer);
    const newOpts = q.options.map((o) => (o.label === fix.label ? { ...o, text: fix.to } : o));
    const newHash = contentHash(q.stem, newOpts.map((o) => o.text), q.answer);

    const { data: dbRow, error } = await db
      .from("questions")
      .select("id, question_number, content_hash")
      .eq("id", fix.questionId)
      .maybeSingle();
    if (error) throw error;
    if (!dbRow) throw new Error(`no DB row ${fix.questionId}`);

    console.log(`\n${dbRow.question_number}  (${dbRow.id})`);
    console.log(`  option ${fix.label}: ${JSON.stringify(fix.from)} -> ${JSON.stringify(fix.to)}   (${fix.why})`);
    console.log(`  stored hash    ${dbRow.content_hash}`);
    console.log(`  recomputed old ${oldHash}`);
    console.log(`  new hash       ${newHash}`);

    // THE GUARD.
    if (dbRow.content_hash !== oldHash) {
      throw new Error(
        `REFUSING: recomputed old hash does not match the stored one.\n` +
          `  This script is not feeding contentHash what the ingest fed it, so the new\n` +
          `  hash would be wrong too and would orphan the row. Fix the inputs first.`
      );
    }
    console.log(`  guard OK — recomputed old hash matches stored`);

    if (!APPLY) {
      console.log(`  (dry run — nothing written)`);
      continue;
    }

    const { error: e1 } = await db
      .from("options")
      .update({ text: fix.to })
      .eq("question_id", dbRow.id)
      .eq("label", fix.label);
    if (e1) throw e1;

    const { error: e2 } = await db.from("questions").update({ content_hash: newHash }).eq("id", dbRow.id);
    if (e2) throw e2;

    q.options = newOpts;
    writeFileSync(fix.sourceFile, JSON.stringify(rows, null, 2) + "\n", "utf8");
    console.log(`  applied: option text + content_hash + source JSON`);
  }
})().catch((e) => {
  console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2));
  process.exit(1);
});
