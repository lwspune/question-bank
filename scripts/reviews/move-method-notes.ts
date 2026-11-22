/**
 * Move every method note out of the stored solutions (2026-11-22).
 *
 *   npx tsx scripts/reviews/move-method-notes.ts            # dry run: counts, samples, refusals
 *   npx tsx scripts/reviews/move-method-notes.ts --apply    # backup, record, cut
 *
 * A method note is a bracket on HOW an answer was got ("[Answer worked out by
 * PYQ Vault: ... Two independent solutions agreed.]", "[Derived answer — ...
 * Verify before relying on it.]"). Owner, 2026-11-22: "any disclaimer should be
 * for internal consumption and should not reach to student on any surface."
 * The kinds are src/lib/questions/methodNotes.ts; migration 0280 then refuses
 * them for good.
 *
 * What --apply does, in order:
 *  1. writes every touched row's current solution to backups/ (gitignored), so
 *     the whole run can be put back;
 *  2. records the note in question_reviews (a table no student page reads) as an
 *     `unverifiable` blind derivation, the same record scripts/cds/clean-markers.ts
 *     left for CDS English. Skipped where a review already stands (newest wins,
 *     and an `unverifiable` must never sit over a checked row) and for a keyed
 *     note ("[Answer from the official ...]"): the key, not a derivation, is
 *     that answer's basis, and derived_model already says so;
 *  3. writes the solution with the note cut out.
 * Steps 2 and 3 are safe to repeat: reviews upsert on (question, run, hash) and a
 * cut solution no longer matches.
 *
 * SAFE ON HASHES: no content hash takes `solution` (src/lib/upload/hash.ts), so a
 * question keeps its identity; mocks, saves and history are untouched.
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { METHOD_NOTE_OPENINGS, splitMethodNotes } from "../../src/lib/questions/methodNotes";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN_LABEL = "method-notes:moved-2026-11-22";
/** The longest note seen is ~200 characters; a cut past this has matched something else. */
const MAX_CUT = 400;

type Row = {
  id: string;
  solution: string;
  content_hash: string;
  visibility: string;
  exam: { name: string } | null;
};

async function main() {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Every row carrying a note, any visibility. Read whole before writing, so paging
  // is never disturbed by the rows this run changes.
  const pattern = `\\[(${METHOD_NOTE_OPENINGS.join("|")})`;
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("id, solution, content_hash, visibility, exam:exams(name)")
      .filter("solution", "imatch", pattern)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`questions: ${error.message}`);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < 1000) break;
  }

  const plan: { row: Row; after: string; notes: string[] }[] = [];
  const refused: string[] = [];
  for (const row of rows) {
    const { solution, notes } = splitMethodNotes(row.solution);
    // The database matched loosely (case-insensitive); the splitter is exact. A row
    // only the database matched is reported, never cut by guesswork.
    if (notes.length === 0) refused.push(`${row.id}: matched in SQL but no exact note`);
    else if (solution === null) refused.push(`${row.id}: the solution is only a note`);
    else if (row.solution.length - solution.length > MAX_CUT) refused.push(`${row.id}: cut ${row.solution.length - solution.length} chars`);
    else plan.push({ row, after: solution, notes });
  }

  const byExam = new Map<string, number>();
  for (const p of plan) {
    const k = `${p.row.exam?.name ?? "?"} (${p.row.visibility})`;
    byExam.set(k, (byExam.get(k) ?? 0) + 1);
  }
  console.log(`${rows.length} row(s) carry a method note; ${plan.length} to cut, ${refused.length} refused.\n`);
  for (const [k, n] of [...byExam].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)}  ${k}`);
  for (const r of refused) console.log(`  REFUSED ${r}`);
  for (const p of plan.slice(0, 3)) {
    console.log(`\n${p.row.id}\n  before: …${p.row.solution.slice(-160).replace(/\s+/g, " ")}\n  after:  …${p.after.slice(-100).replace(/\s+/g, " ")}`);
  }

  // A review where none stands yet, and not for a keyed note.
  const reviewed = new Set<string>();
  const ids = plan.map((p) => p.row.id);
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client.from("question_reviews").select("question_id").in("question_id", ids.slice(i, i + 200));
    if (error) throw new Error(`question_reviews: ${error.message}`);
    for (const r of data ?? []) reviewed.add(r.question_id as string);
  }
  const reviews: ReviewInput[] = plan
    .filter((p) => !reviewed.has(p.row.id) && !p.notes.every((n) => n.startsWith("Answer from the official")))
    .map((p) => ({
      questionId: p.row.id,
      reviewedContentHash: p.row.content_hash,
      method: "blind_rederivation",
      verdict: "unverifiable",
      runLabel: RUN_LABEL,
      note:
        `Method note moved here from the solution (owner rule 2026-11-22: no such note reaches a student). ` +
        `It read: ${p.notes.map((n) => `"${n}"`).join(" ")}. NOT a confirmation.`,
    }));
  console.log(`\n${reviews.length} review(s) to record; ${plan.length - reviews.length} skipped (a review already stands, or the answer is keyed).`);

  if (!APPLY) {
    console.log("\nDRY RUN: nothing written. Re-run with --apply.");
    return;
  }
  if (refused.length) throw new Error("refusing --apply while any row is refused; settle those first");

  const dir = join(process.cwd(), "backups");
  mkdirSync(dir, { recursive: true });
  const backup = join(dir, `method-notes-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(backup, JSON.stringify(plan.map((p) => ({ id: p.row.id, solution: p.row.solution })), null, 1));
  console.log(`backup: ${backup} (${plan.length} rows)`);

  const rec = await recordReviews(client, reviews);
  if (rec.error) throw new Error(`question_reviews: ${rec.error}`);
  console.log(`question_reviews: ${rec.written} written of ${rec.attempted}${rec.rejected.length ? `, ${rec.rejected.length} rejected` : ""}`);
  if (rec.rejected.length) throw new Error(`rejected reviews: ${JSON.stringify(rec.rejected.slice(0, 3))}`);

  let done = 0;
  const queue = [...plan];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      for (let p = queue.shift(); p; p = queue.shift()) {
        const { error } = await client.from("questions").update({ solution: p.after }).eq("id", p.row.id);
        if (error) throw new Error(`${p.row.id}: ${error.message}`);
        if (++done % 500 === 0) console.log(`  ${done} / ${plan.length}`);
      }
    })
  );
  console.log(`cut ${done} solution(s).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
