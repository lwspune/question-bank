/**
 * Reconcile the live CDS rows for a paper against its transcription JSON.
 *
 *   npx tsx scripts/cds/resync.ts <paperId>            # dry-run
 *   npx tsx scripts/cds/resync.ts <paperId> --apply    # delete the stale rows
 *   npx tsx scripts/cds/resync.ts --all [--apply]
 *
 * WHY THIS EXISTS
 * ---------------
 * `content_hash` covers stem + options + answer, so REPAIRING a question mints a
 * different hash. `commit.ts` upserts on that hash, which means a re-commit
 * INSERTS the corrected row and leaves the original sitting there — the paper
 * silently grows past 120 and keeps serving the defective version alongside the
 * fixed one. Something has to delete the superseded rows, and it must not be a
 * blanket "delete the paper and re-commit": **202 teacher paper placements
 * already reference CDS questions** (org staff could build from PRIVATE rows),
 * and a blanket delete would cascade real papers away.
 *
 * So this deletes exactly the rows whose hash no longer appears in the JSON, and
 * REFUSES if any of them is referenced by a teacher paper — that case needs a
 * human decision (re-point the placement, or keep the old row), not a cascade.
 *
 * The expected hash set is computed by running the SAME pipeline `commit.ts`
 * runs (buildRecords -> normalizeNewlines -> validateRow), so the two cannot
 * disagree about what a row hashes to. Anything else would be reimplementing the
 * hash, which is exactly how a resync tool ends up deleting good rows.
 *
 * ORDER MATTERS: run `commit.ts <paper> --apply --allow-unpublish` FIRST (insert
 * the corrected rows), then this (remove the superseded ones), then
 * `flip-public.ts <paper> --apply`. Running this before the commit would delete
 * the live row before its replacement exists.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { buildRecords, normalizeQuestions, type Section, type Underlines } from "./lib";
import { EXAM_ID, PAPERS, dataPath, requirePaper, type Paper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** The content_hash set this paper's JSON currently implies. */
function expectedHashes(paper: Paper): Set<string> {
  const sections: Section[] = JSON.parse(readFileSync(dataPath(paper.id, "sections"), "utf8"));
  const questions = normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8")));
  const ulPath = dataPath(paper.id, "underlines");
  const underlines: Underlines = existsSync(ulPath) ? JSON.parse(readFileSync(ulPath, "utf8")) : {};
  const { rows } = buildRecords(sections, questions, underlines);
  const out = new Set<string>();
  for (const r of rows) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
    const v = validateRow(r);
    if (v.errors.length || !v.parsed) {
      throw new Error(`${paper.id} Q${r.questionNumber} does not validate: ${v.errors.join("; ")}`);
    }
    out.add(v.parsed.contentHash);
  }
  return out;
}

async function resyncPaper(db: SupabaseClient, paper: Paper, apply: boolean) {
  const want = expectedHashes(paper);
  const { data, error } = await db
    .from("questions")
    .select("id, question_number, content_hash, visibility")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`${paper.id}: fetch failed: ${error.message}`);
  const live = (data ?? []) as {
    id: string;
    question_number: string;
    content_hash: string;
    visibility: string;
  }[];

  const stale = live.filter((r) => !want.has(r.content_hash));
  const missing = want.size - (live.length - stale.length);

  const head = `${paper.id.padEnd(8)} json=${want.size} live=${live.length} stale=${stale.length} missing=${missing}`;
  if (stale.length === 0 && missing === 0) {
    console.log(`  ✓ ${head}  (in sync)`);
    return { stale: 0, deleted: 0 };
  }
  console.log(`  • ${head}`);
  for (const s of stale) console.log(`      stale Q${s.question_number} ${s.visibility} ${s.content_hash.slice(0, 12)} (${s.id})`);
  if (missing > 0) {
    console.log(
      `      ! ${missing} JSON row(s) have no live match — run ` +
        `\`commit.ts ${paper.id} --apply --allow-unpublish\` FIRST, then re-run this.`
    );
  }

  // A superseded row that a teacher already put in a paper is not ours to delete.
  const ids = stale.map((s) => s.id);
  if (ids.length > 0) {
    const { data: refs, error: rErr } = await db
      .from("paper_questions")
      .select("question_id, paper_id")
      .in("question_id", ids);
    if (rErr) throw new Error(`${paper.id}: paper_questions check failed: ${rErr.message}`);
    if ((refs ?? []).length > 0) {
      console.log(`      ✗ REFUSING: ${refs!.length} of these are used in teacher papers:`);
      for (const r of refs!) console.log(`          question ${r.question_id} in paper ${r.paper_id}`);
      console.log(`        Re-point or accept those placements before deleting.`);
      return { stale: stale.length, deleted: 0, refused: true };
    }
  }

  if (!apply) return { stale: stale.length, deleted: 0 };
  if (missing > 0) {
    console.log(`      ✗ REFUSING to delete while ${missing} replacement row(s) are missing.`);
    return { stale: stale.length, deleted: 0, refused: true };
  }
  const { error: dErr, count } = await db
    .from("questions")
    .delete({ count: "exact" })
    .in("id", ids);
  if (dErr) throw new Error(`${paper.id}: delete failed: ${dErr.message}`);
  console.log(`      deleted ${count ?? 0}`);
  return { stale: stale.length, deleted: count ?? 0 };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const all = process.argv.includes("--all");
  const paperId = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!all && !paperId) throw new Error("pass a paperId or --all");
  const papers = all ? Object.values(PAPERS) : [requirePaper(paperId)];

  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(`CDS resync — ${papers.length} paper(s)\n`);
  let stale = 0;
  let deleted = 0;
  let refused = 0;
  for (const p of papers) {
    const r = await resyncPaper(db, p, apply);
    stale += r.stale;
    deleted += r.deleted;
    if (r.refused) refused += 1;
  }
  console.log(`\n${apply ? "Deleted" : "Would delete"} ${apply ? deleted : stale} stale row(s).`);
  if (refused > 0) console.log(`${refused} paper(s) REFUSED — see above.`);
  if (!apply && stale > 0) console.log("(dry-run — re-run with --apply)");
  if (refused > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
