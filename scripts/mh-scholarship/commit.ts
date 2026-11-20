/**
 * Commit one Homi Bhabha paper into the bank: PRIVATE, question_kind='pyq',
 * via commitStaged (dedup / taxonomy / content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/mh-scholarship/commit.ts ms8-2026-p1          # dry-run: validate, write nothing
 *   npx tsx scripts/mh-scholarship/commit.ts ms8-2026-p1 --apply
 *   npx tsx scripts/mh-scholarship/commit.ts ms8-2026-p1 --resync   # a PUBLISHED paper: sync solutions + grace only
 *
 * Reads  data/<id>.merged.json    the transcription
 *        data/<id>.answers.json   keycheck.ts (keyed) or crosstab.ts (keyless)
 *        figures/<id>/qNNN.png    crop.py, for every item with a `figure`
 *
 * ALWAYS PRIVATE. Publishing is a separate, deliberate step.
 *
 * Differences from the CSE copy this came from:
 *  - On a KEYED paper the solution is the working alone. The shared buildRecords
 *    stamps "[Derived answer, this booklet carries no official key...]", which is
 *    false once the key supplied the letter (the CSE lane shipped that bracket on
 *    its keyed years; logged in SUGGESTIONS.md). The provisional-key caveat
 *    travels in pyq_note instead.
 *  - Items the key dropped are loaded in the same run, as CANCELLED rows with a note
 *    (the CSE lane's load-withdrawn.ts did this as a second step).
 *  - Figure crops are uploaded onto image_url.
 *
 * Rollback is by `source_file`: every row this writes carries the booklet's
 * filename, so one DELETE removes exactly this paper and nothing else.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { uploadImage } from "../../src/lib/storage/images";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { CREATED_BY, EXAMS, ORG_ID, examIdOf, expectedCount, pattern, pyqNoteFor, requirePaper } from "./config";
import { figurePath } from "./figures";
import type { TQ } from "../upsc/lib";
import { buildPaperRows } from "./rows";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const EXAM_ID = examIdOf(paper);
  const rows = buildPaperRows(paper);
  const { questions, answers, answersRaw, keyed, reconciled, dropped, graceNumbers, notices, parsed, errs, qnOf } = rows;
  const expected = paper.format === "written" ? parsed.length : expectedCount(paper, rows.held);

  console.log(`${paper.id}  ${EXAMS[paper.exam].name}  "${pyqNoteFor(paper)}"`);
  if (paper.key && !paper.key.final) {
    console.log(
      `!! PROVISIONAL KEY. Every row will carry that fact in its pyq_note.
` +
        `   Re-run keycheck against the FINAL key when it is published, and treat
` +
        `   any answer that moves as a correction rather than a re-derivation.`
    );
  }
  console.log(`source_file: ${paper.sourceFile}`);
  console.log(`${questions.length} transcribed, ${answers.length} derived, ${rows.builtCount} rows assembled`);
  if (keyed) {
    const hand: number[] = answersRaw.handSolutions ?? [];
    console.log(`letters from the key; working from a blind pass on ${answers.length - hand.length}, by hand on ${hand.length}
`);
  } else {
    console.log(`${reconciled.size} answer(s) reconciled by hand, ${answers.length - reconciled.size} agreed blind
`);
  }

  // Every figure item needs its crop on disk, and the crop must not carry a
  // printed watermark (the ISC 2026 lesson).
  const figureItems = questions.filter((q) => (q as TQ & { figure?: unknown }).figure).map((q) => q.number);
  for (const n of figureItems) {
    const path = figurePath(paper.id, n);
    if (!existsSync(path)) {
      errs.push(`Q${n}: figure not cropped (python -P scripts/mh-scholarship/crop.py ${paper.id})`);
      continue;
    }
    const declared = ((questions.find((q) => q.number === n) as TQ & { figure?: { watermark?: string } }).figure ?? {}).watermark;
    const wm = figureWatermarkIssue(`Q${n}`, await checkFigureFile(path), declared);
    if (wm) errs.push(wm);
  }
  console.log(`figures: ${figureItems.length ? `Q${figureItems.join(", Q")}` : "none"}; withdrawn: ${dropped.length ? `Q${dropped.join(", Q")}` : "none"}`);

  if (errs.length) {
    console.log(`VALIDATION: ${errs.length} error(s)`);
    for (const e of errs.slice(0, 40)) console.log(`  - ${e}`);
    if (errs.length > 40) console.log(`  ... and ${errs.length - 40} more`);
  } else {
    console.log(`VALIDATION: ok (${parsed.length} rows incl. ${rows.withdrawnCount} withdrawn, coverage 1..${paper.format === "written" ? parsed.length : pat.questions})`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (errs.length) throw new Error("refusing to commit with validation errors — fix the source first.");

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // --resync: the paper is committed (and may be PUBLIC). Insert nothing, touch no visibility
  // and no upload job: only sync each row's solution and the grace list, after a ruling changed.
  const resync = args.includes("--resync");
  let jobId: string | undefined;
  let result: Awaited<ReturnType<typeof commitStaged>> | undefined;
  if (!resync) {
  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", paper.sourceFile)
    .limit(1)
    .maybeSingle();
  jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({
        org_id: ORG_ID,
        filename: paper.sourceFile,
        created_by: CREATED_BY,
        status: "PROCESSING",
        total_rows: parsed.length,
      })
      .select("id")
      .single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  // Count PUBLIC rows BEFORE inserting anything.
  //
  // Taken after commitStaged this guard is unusable on a first commit: new rows
  // default to PUBLIC (migration 0022), so it would see the rows it just created
  // and refuse a paper that was never published at all. Taken here it means what
  // it says — "was this paper already live before this run?" — so only a genuine
  // re-commit of a published paper trips it.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) {
    throw new Error(
      `${publicBefore} row(s) of ${paper.sourceFile} are already PUBLIC, and this run would ` +
        `set the whole paper PRIVATE. Re-run with --allow-unpublish if that is what you intend, ` +
        `then re-publish deliberately.`
    );
  }

  result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: jobId,
    pyqYear: paper.pyqYear,
    pyqNote: pyqNoteFor(paper),
    // PRIVATE at insert (2026-11-18): rows used to land on the PUBLIC column
    // default and be hidden by the update below, so a network error between the
    // two left 27 AISSEE rows public (milschool lane, 2026-11-18) for half an hour.
    visibility: "PRIVATE",
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  // A skip is content_hash dedup absorbing a row into an existing one. On a PYQ
  // ingest that is almost never benign — it means two items of one paper hashed
  // the same — so name them rather than printing a count.
  if (result.skipped > 0) {
    console.log(
      `\n!! ${result.skipped} row(s) were SKIPPED as duplicates. On a 1..${pat.questions} ` +
        `paper that means two items collided on content_hash — investigate before trusting this commit.`
    );
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE.`);
  }

  // Sync each row's solution. commitStaged skips a row whose content_hash
  // already exists, so a re-run after a ruling changed (a fixed solution, a new
  // notice) would otherwise leave the stored text stale. The solution is not
  // part of content_hash, so this changes no id.
  {
    const { data: existing, error: sErr } = await client
      .from("questions")
      .select("id, question_number, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile);
    if (sErr) throw new Error(`solution sync read failed: ${sErr.message}`);
    let synced = 0;
    for (const r of parsed) {
      const row = (existing ?? []).find((e) => e.question_number === r.questionNumber);
      // A withdrawn row builds with no solution (undefined) and stores null: the same.
      if (!row || (row.solution ?? null) === (r.solution ?? null)) continue;
      const { error: uErr2 } = await client.from("questions").update({ solution: r.solution }).eq("id", row.id);
      if (uErr2) throw new Error(`Q${r.questionNumber}: solution sync failed: ${uErr2.message}`);
      synced++;
    }
    console.log(`solutions: ${synced} updated in place.`);
  }

  // Figures onto image_url, matched by question number within this paper.
  if (figureItems.length) {
    const { data: rows, error: fErr } = await client
      .from("questions")
      .select("id, question_number, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .in("question_number", figureItems.map(qnOf));
    if (fErr) throw new Error(`figure row lookup failed: ${fErr.message}`);
    let uploaded = 0;
    for (const n of figureItems) {
      const row = (rows ?? []).find((r) => r.question_number === qnOf(n));
      if (!row) {
        console.log(`  !! Q${n}: no row found for its figure`);
        continue;
      }
      if (row.image_url) continue;
      const url = await uploadImage(client, ORG_ID, readFileSync(figurePath(paper.id, n)), "image/png");
      const { error: iErr } = await client.from("questions").update({ image_url: url }).eq("id", row.id);
      if (iErr) throw new Error(`Q${n}: image_url update failed: ${iErr.message}`);
      uploaded++;
    }
    console.log(`figures: ${uploaded} uploaded, ${figureItems.length - uploaded} already present or missing.`);
  }

  // Grace in every mock (owner policy 2026-10-29): src/lib/mocks/flawed.json is
  // the one list the mock builders read.
  if (graceNumbers.length) {
    const { data: gRows, error: gErr } = await client
      .from("questions")
      .select("id, question_number")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .in("question_number", graceNumbers.map(qnOf));
    if (gErr) throw new Error(`grace row lookup failed: ${gErr.message}`);
    // Beside THIS script's checkout, never process.cwd(): commits run from the
    // main checkout (it holds .env.local; a worktree must not), and a cwd path
    // wrote these entries into the shared main checkout (2026-11-19).
    const file = join(__dirname, "..", "..", "src", "lib", "mocks", "flawed.json");
    const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
    const known = new Set(list.map((f) => f.id));
    let added = 0;
    for (const n of graceNumbers) {
      const row = (gRows ?? []).find((r) => r.question_number === qnOf(n));
      if (!row || known.has(row.id)) continue;
      list.push({ id: row.id, reason: `${EXAMS[paper.exam].name} ${paper.pyqYear} Q${n}: ${notices.get(n)!.slice(0, 160)} (scripts/mh-scholarship)` });
      added++;
    }
    if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
    console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
  }

  if (resync || !result) {
    console.log("resync: done (no insert, visibility untouched).");
    return;
  }
  const { count: linked } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  await client
    .from("upload_jobs")
    .update({
      status: "COMPLETED",
      total_rows: linked ?? 0,
      inserted: result.inserted,
      skipped: result.skipped,
      finished_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  console.log(`done. ${linked} rows linked to job ${jobId}.`);
  // Withdrawn items are loaded too (as CANCELLED rows), so a whole paper is all
  // of its items.
  if ((linked ?? 0) !== expected) {
    console.log(`\n!! expected ${expected} row(s) for this paper, found ${linked}.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
