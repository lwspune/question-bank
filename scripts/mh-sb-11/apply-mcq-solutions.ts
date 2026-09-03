/**
 * Write the MCQ `solution` text that this pipeline has no path for.
 *
 * `apply-solutions.ts` DOES have an MCQ branch, but until 2026-09-03 it read a
 * `solution` field while `dump-mcq.ts`'s printed contract asked the verifier for
 * `why` — so a file written to the contract updated nothing and reported
 * "updated solution on 0 mcq row(s)", which reads like "there were none". That
 * silent no-op is why 132 of the 203 MCQ rows across the 18 shipped Maths
 * chapters are `solution IS NULL`. Both halves now agree, so that path works
 * too; this script remains the explicit, guarded one to reach for, and is what
 * `dump-mcq.ts` names.
 *
 * Editing `solution` alone is content_hash-safe, and the README's own guidance
 * for rows outside a solutions file is a direct scoped UPDATE.
 *
 * Guards: update by PRIMARY KEY, require each to match exactly one row, verify
 * the row belongs to this chapter's source_file first, and refuse to overwrite a
 * solution that already exists (so a re-run cannot clobber a later edit).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, requireChapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);

  // Read the blind-verify file directly. `dump-mcq.ts` asks the verifier for a
  // `why`, and nothing downstream ever writes it anywhere — which is the whole
  // reason 132 of the 203 MCQ rows in the shipped Maths chapters have no
  // solution. A `solution` field is accepted too, so a verifier that writes one
  // (the stateboard convention) also works here.
  const raw: { id: string; ref: string; why?: string; solution?: string }[] = JSON.parse(
    readFileSync(join(DATA, `${id}.blind.mcq-verify.json`), "utf8")
  );
  const rows = raw.map((r) => {
    const text = (r.solution ?? r.why ?? "").trim();
    if (!text) throw new Error(`${r.ref}: no \`why\` or \`solution\` — refusing to write an empty solution`);
    if (text.length < 60) throw new Error(`${r.ref}: justification is only ${text.length} chars — too thin to ship`);
    // The audit:keys trap: a trailing bare capital reads as a concluded option letter.
    if (/\b[A-D]\.?$/.test(text.trim())) throw new Error(`${r.ref}: ends on a bare option letter`);
    return { id: r.id, ref: r.ref, solution: text };
  });

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let wrote = 0;
  let skipped = 0;
  for (const r of rows) {
    const { data: cur, error: selErr } = await db
      .from("questions")
      .select("id, question_number, question_format, solution, source_file")
      .eq("id", r.id)
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile);
    if (selErr) throw new Error(`${r.ref}: ${selErr.message}`);
    if (!cur || cur.length !== 1) throw new Error(`${r.ref}: matched ${cur?.length ?? 0} rows — refusing`);
    const row: any = cur[0];
    if (row.question_number !== r.ref) throw new Error(`${r.ref}: id maps to ${row.question_number} — pairing wrong`);
    if (row.question_format !== "mcq") throw new Error(`${r.ref}: not an mcq row`);
    if (row.solution && row.solution.trim()) {
      console.log(`  skip (already has a solution): ${r.ref}`);
      skipped++;
      continue;
    }
    if (!apply) {
      console.log(`  would write: ${r.ref} (${r.solution.length} chars)`);
      wrote++;
      continue;
    }
    const { error: updErr } = await db.from("questions").update({ solution: r.solution }).eq("id", r.id);
    if (updErr) throw new Error(`${r.ref}: ${updErr.message}`);
    console.log(`  wrote: ${r.ref} (${r.solution.length} chars)`);
    wrote++;
  }
  console.log(`\n${apply ? "wrote" : "would write"} ${wrote}; skipped ${skipped}.`);
  if (!apply) console.log("[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
