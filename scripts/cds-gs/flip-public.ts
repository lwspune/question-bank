/**
 * Stamp derivation provenance and flip the CDS General Knowledge corpus PUBLIC.
 *
 *   npx tsx scripts/cds-gs/flip-public.ts            # dry-run
 *   npx tsx scripts/cds-gs/flip-public.ts --apply
 *   npx tsx scripts/cds-gs/flip-public.ts --revert --apply   # back to PRIVATE
 *
 * WHY PROVENANCE IS STAMPED HERE AND NOT AT COMMIT. It should have been at commit
 * and was not — the rows carried a `pyq_note` naming the paper and nothing else,
 * and `derived_model` was NULL on all 2,280. Published in that state a student sees
 * an answer with no indication it is DERIVED rather than taken from an official
 * key, which is the one thing this corpus must not imply.
 *
 * THIS CORPUS HAS NO ANSWER KEY. Not in the booklets, not on disk, and no external
 * anchor — UPSC reuses ENGLISH items between NDA and CDS but not GK, and a probe of
 * five distinctive stems found zero matches in the NDA GK bank. Every answer is the
 * product of two INDEPENDENT blind derivations, reconciled by a crosstab, with each
 * disagreement adjudicated by hand against the printed page. Across nineteen papers
 * that ran 99.2% agreement with HIGH confidence agreeing 1798/1798, but agreement
 * bounds DISAGREEMENT risk and not CORRELATED error: two passes can be wrong the
 * same way, and no amount of agreement detects it. Hence the stamp.
 *
 * The same reasoning is why every sibling key-less corpus in this bank stamps
 * `derived_model`/`derived_at` plus a note clause — mh-sb-9's humanities books and
 * mh-ssc-10's board papers both do.
 *
 * SCOPED to this exam AND to this corpus's source files, so it cannot reach the
 * CDS ENGLISH rows that share the exam.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, PAPERS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DERIVED_MODEL = "claude-opus-5 (two independent blind passes)";
const NOTE_CLAUSE =
  " [No official answer key is published for this paper. The answer and solution here were " +
  "derived independently by two blind passes and, where those disagreed, adjudicated by hand " +
  "against the printed page.]";

async function main() {
  const apply = process.argv.includes("--apply");
  const revert = process.argv.includes("--revert");
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const sourceFiles = Object.values(PAPERS).map((p) => p.sourceFile);

  const { count: total } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).in("source_file", sourceFiles);
  const { count: pub } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).in("source_file", sourceFiles).eq("visibility", "PUBLIC");
  const { count: stamped } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID).in("source_file", sourceFiles).not("derived_model", "is", null);

  console.log(`\nCDS General Knowledge — ${sourceFiles.length} papers`);
  console.log(`  rows            ${total}`);
  console.log(`  already PUBLIC  ${pub}`);
  console.log(`  provenance      ${stamped} stamped`);

  if (revert) {
    console.log(`\n[revert] would set ${pub} row(s) back to PRIVATE (provenance is left in place).`);
    if (!apply) return console.log("[dry-run] pass --apply.");
    const { error, count } = await client
      .from("questions").update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("exam_id", EXAM_ID).in("source_file", sourceFiles).eq("visibility", "PUBLIC");
    if (error) throw new Error(error.message);
    console.log(`reverted ${count} row(s) to PRIVATE.`);
    return;
  }

  if (total !== 2280) {
    throw new Error(`expected 2280 rows across the 19 papers, found ${total} — refusing to flip a partial corpus.`);
  }

  console.log(`\nwould stamp provenance on ${(total ?? 0) - (stamped ?? 0)} row(s) and flip ${(total ?? 0) - (pub ?? 0)} to PUBLIC`);
  if (!apply) return console.log("[dry-run] pass --apply. Reverse with --revert --apply.");

  // 1. provenance BEFORE visibility — a row must never be publicly readable
  //    without the note saying its answer is derived.
  const now = new Date().toISOString();
  for (const id of Object.keys(PAPERS)) {
    const sf = PAPERS[id].sourceFile;
    const { data: rows, error: rErr } = await client
      .from("questions").select("id, pyq_note")
      .eq("exam_id", EXAM_ID).eq("source_file", sf).is("derived_model", null);
    if (rErr) throw new Error(rErr.message);
    for (const r of rows ?? []) {
      const note = (r.pyq_note ?? "").includes("No official answer key")
        ? r.pyq_note
        : `${r.pyq_note ?? ""}${NOTE_CLAUSE}`;
      const { error } = await client
        .from("questions")
        .update({ derived_model: DERIVED_MODEL, derived_at: now, pyq_note: note })
        .eq("id", r.id);
      if (error) throw new Error(`${id}: ${error.message}`);
    }
    if ((rows ?? []).length) console.log(`  stamped ${(rows ?? []).length} row(s) — ${id}`);
  }

  // 2. visibility
  const { error, count } = await client
    .from("questions").update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID).in("source_file", sourceFiles).eq("visibility", "PRIVATE");
  if (error) throw new Error(error.message);
  console.log(`\nflipped ${count} row(s) to PUBLIC.`);
  console.log(`reverse with:  npx tsx scripts/cds-gs/flip-public.ts --revert --apply`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
