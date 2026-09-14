/**
 * Delete the rows whose ADJUDICATED answer differs from what is stored, so that
 * `commit.ts` can re-insert them from the corrected source.
 *
 *   npx tsx scripts/nda-gat/resync-adjudicated.ts 2026-2
 *   npx tsx scripts/nda-gat/resync-adjudicated.ts 2026-2 --apply
 *
 * ## Why a delete rather than an UPDATE
 *
 * `content_hash = sha256(stem + sorted options + answer)`, so changing an answer
 * changes the row's identity. An in-place UPDATE would leave stored text whose
 * hash no longer matches its preimage, and the next re-commit from the corrected
 * source would hash differently and insert a DUPLICATE. Delete-and-re-commit is
 * the documented pattern for this in the repo.
 *
 * The sibling Maths pipeline instead re-stamps in place, and the reason it must
 * is that its rows sit in teachers' papers, where a new uuid would orphan the
 * `paper_questions` link. That does not apply here and it was CHECKED rather
 * than assumed: all 150 rows are PRIVATE and carry zero references across
 * paper_questions, attempt_answers, question_concept_tags,
 * question_principle_tags, question_bookmarks, question_item_stats and
 * question_reports. This script re-checks that for the rows it is about to
 * delete and refuses if anything now points at them.
 *
 * ## Scope
 *
 * ONLY the rows whose answer actually changed. The other 144 are byte-identical
 * after adjudication, so re-committing them is a no-op and deleting them would
 * churn 144 uuids for nothing.
 */
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { dataPath, requirePaper } from "./config";

dotenv.config({ path: ".env.local", override: true });

type Row = { id: string; question_number: string | null; content_hash: string };

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const adjPath = dataPath(paper.id, "adjudication");
  if (!existsSync(adjPath)) throw new Error(`missing ${adjPath}`);
  const adj = JSON.parse(readFileSync(adjPath, "utf8")) as {
    acceptKeys: { number: number; ours: string; centurion: string }[];
    unresolved: unknown[];
  };
  if (adj.unresolved.length) throw new Error("adjudication still has unresolved rows — refusing.");

  const changed = adj.acceptKeys;
  console.log(`${paper.id}: ${changed.length} adjudicated row(s) change answer`);

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, content_hash, visibility, options(label, text, is_correct)")
    .eq("source_file", paper.sourceFile);
  if (error) throw error;
  const live = (data ?? []) as unknown as (Row & {
    visibility: string;
    options: { label: string; is_correct: boolean }[];
  })[];
  console.log(`  live rows under ${paper.sourceFile}: ${live.length}`);

  const byNumber = new Map(live.map((r) => [String(r.question_number), r]));
  const targets: Row[] = [];
  const errors: string[] = [];

  for (const c of changed) {
    const row = byNumber.get(String(c.number));
    if (!row) {
      errors.push(`Q${c.number}: no live row`);
      continue;
    }
    if (row.visibility !== "PRIVATE") {
      errors.push(`Q${c.number}: visibility is ${row.visibility}, expected PRIVATE — refusing to delete a published row`);
      continue;
    }
    const correct = row.options.filter((o) => o.is_correct).map((o) => o.label);
    if (correct.length !== 1) {
      errors.push(`Q${c.number}: ${correct.length} options flagged correct`);
      continue;
    }
    // ASSERT THE BEFORE-STATE: the live row must still hold the answer we are replacing.
    if (correct[0] !== c.ours) {
      errors.push(
        `Q${c.number}: live answer is ${correct[0]} but the adjudication expects to replace ${c.ours} — ` +
          `already resynced, or the row moved. Refusing.`
      );
      continue;
    }
    console.log(`  Q${c.number}: live=${correct[0]} -> ${c.centurion}  (delete, then re-commit)`);
    targets.push(row);
  }

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to delete.");
  }

  // Re-check references immediately before deleting — the earlier audit is not a guarantee.
  const ids = targets.map((t) => t.id);
  for (const t of [
    "paper_questions",
    "attempt_answers",
    "question_concept_tags",
    "question_principle_tags",
    "question_bookmarks",
    "question_item_stats",
    "question_reports",
  ]) {
    const { count, error: e } = await db.from(t).select("*", { count: "exact", head: true }).in("question_id", ids);
    if (e) throw e;
    if (count) {
      throw new Error(`${t} has ${count} row(s) referencing these questions — refusing to delete.`);
    }
  }
  console.log(`  reference check: 0 rows across 7 tables point at these ${ids.length} questions`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to delete ${ids.length} row(s). Nothing written.`);
    return;
  }

  const { error: delErr, count } = await db.from("questions").delete({ count: "exact" }).in("id", ids);
  if (delErr) throw delErr;
  console.log(`\ndeleted ${count} row(s).`);

  const { count: after } = await db
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("source_file", paper.sourceFile);
  console.log(`rows remaining under ${paper.sourceFile}: ${after}`);
  console.log(`NEXT: npx tsx scripts/nda-gat/commit.ts ${paper.id} --apply   (re-inserts them with the adjudicated answers)`);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
