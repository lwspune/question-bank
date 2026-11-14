/**
 * Commit one UPSC CAPF (AC) Paper I into the bank: PRIVATE, question_kind='pyq',
 * via commitStaged (dedup / taxonomy / content_hash) plus an upload_jobs row.
 *
 *   npx tsx scripts/capf/commit.ts 2026          # dry-run: validate, write nothing
 *   npx tsx scripts/capf/commit.ts 2026 --apply
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
 *  - Items UPSC dropped are loaded in the same run, as CANCELLED rows with a note
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
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { uploadImage } from "../../src/lib/storage/images";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { CREATED_BY, EXAM_ID, ORG_ID, PROVISIONAL_KEYS, dataPath, pattern, pyqNoteFor, requirePaper } from "./config";
import { figurePath } from "./figures";
import { buildRecords, buildWithdrawnRecords, validateRows, type Derivation, type TQ } from "../upsc/lib";

const withdrawnNote = (provisional: boolean) =>
  `Dropped by UPSC: its ${provisional ? "provisional " : ""}answer key drops this question and it was not scored. ` +
  `No option is marked correct. In PYQ Vault mocks it is awarded to every candidate.`;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const mergedFile = dataPath(paper.id, "merged");
  const answersFile = dataPath(paper.id, "answers");
  for (const f of [mergedFile, answersFile]) {
    if (!existsSync(f)) throw new Error(`${f} not found — run merge.ts / crosstab.ts --apply first.`);
  }

  const questions: TQ[] = JSON.parse(readFileSync(mergedFile, "utf8")).questions;
  const answersRaw = JSON.parse(readFileSync(answersFile, "utf8"));
  const answers: Derivation[] = answersRaw.answers;
  const reconciled = new Set<number>(answersRaw.reconciled ?? []);
  // Questions UPSC WITHDREW. They carry no correct answer, so they are absent
  // from the rows on purpose and must not read as a coverage failure.
  const dropped: number[] = answersRaw.dropped ?? [];

  if (!EXAM_ID) throw new Error("EXAM_ID is empty in config.ts: run seed-exam.ts --apply first");
  const keyed = !!answersRaw.source; // keycheck.ts writes `source`; crosstab.ts does not

  const built = buildRecords(questions, answers, { reconciled });
  const working = new Map(answers.map((a) => [a.number, a.reasoning.trim()]));
  if (keyed) {
    // The key supplied the letter, so the shared "no official key" bracket is false.
    for (const r of built) r.solution = working.get(Number(r.questionNumber)) ?? r.solution;
  } else {
    // No key: say so, plainly and without the shared bracket's em dash, and say
    // which rows a person checked.
    const checked = new Set<number>(answersRaw.checked ?? []);
    const overruled = new Set<number>(answersRaw.overruled ?? []);
    for (const r of built) {
      const n = Number(r.questionNumber);
      const how = overruled.has(n)
        ? "Two independent solutions agreed on another answer; it was corrected by hand."
        : reconciled.has(n)
          ? "Two independent solutions disagreed; the answer was settled by hand."
          : checked.has(n)
            ? "Two independent solutions agreed, and the answer was checked by hand."
            : "Two independent solutions agreed.";
      r.solution = `${working.get(n) ?? ""} [Answer worked out by PYQ Vault: UPSC has not published a key for this paper. ${how}]`.trim();
    }
  }
  // A notice (a defective or ambiguous item) goes above the solution, the same
  // "**Note:**" form the other lanes use; `grace` items go to flawed.json below.
  const notices = new Map<number, string>(
    answers.filter((a) => (a as { notice?: string }).notice).map((a) => [a.number, (a as { notice?: string }).notice!])
  );
  for (const r of built) {
    const note = notices.get(Number(r.questionNumber));
    if (note) r.solution = `**Note:** ${note}\n\n${r.solution}`;
  }
  const graceNumbers = answers.filter((a) => (a as { grace?: boolean }).grace).map((a) => a.number);
  const withdrawn = dropped.length
    ? buildWithdrawnRecords(questions, dropped, withdrawnNote(PROVISIONAL_KEYS.has(paper.id)))
    : [];
  for (const r of withdrawn) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
  }
  // Normalise long-form text at the write boundary, mirroring the upload parser.
  // `commitStaged` REJECTS a literal "\n" rather than repairing it, because
  // content_hash is computed by the caller from the pre-normalisation text.
  for (const r of built) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  console.log(`${paper.id}  Paper ${paper.paper}  "${pyqNoteFor(paper)}"`);
  if (PROVISIONAL_KEYS.has(paper.id)) {
    console.log(
      `!! PROVISIONAL KEY. Every row will carry that fact in its pyq_note.\n` +
        `   Re-run keycheck against the FINAL key when UPSC publishes it, and treat\n` +
        `   any answer that moves as a correction rather than a re-derivation.`
    );
  }
  console.log(`source_file: ${paper.sourceFile}`);
  console.log(`${questions.length} transcribed, ${answers.length} derived, ${built.length} rows assembled`);
  if (keyed) {
    const hand: number[] = answersRaw.handSolutions ?? [];
    console.log(`letters from the key; working from a blind pass on ${answers.length - hand.length}, by hand on ${hand.length}\n`);
  } else {
    console.log(`${reconciled.size} answer(s) reconciled by hand, ${answers.length - reconciled.size} agreed blind\n`);
  }

  // Run each row through the SAME validator the Excel upload path uses, so this
  // pipeline cannot write a row shape the normal ingest would have rejected.
  const errs = validateRows(built, 1, pat.questions, { exclude: dropped });
  const parsed = [];
  // Withdrawn rows carry answer CANCELLED, which validateRows (A-D only) would
  // reject, so they go through validateRow alone, as the CSE loader did.
  for (const r of [...built, ...withdrawn]) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  // Every figure item needs its crop on disk, and the crop must not carry a
  // printed watermark (the ISC 2026 lesson).
  const figureItems = questions.filter((q) => (q as TQ & { figure?: unknown }).figure).map((q) => q.number);
  for (const n of figureItems) {
    const path = figurePath(paper.id, n);
    if (!existsSync(path)) {
      errs.push(`Q${n}: figure not cropped (python -P scripts/capf/crop.py ${paper.id})`);
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
    console.log(`VALIDATION: ok (${parsed.length} rows incl. ${withdrawn.length} withdrawn, coverage 1..${pat.questions})`);
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

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", paper.sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
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

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: jobId,
    pyqYear: paper.pyqYear,
    pyqNote: pyqNoteFor(paper),
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
    for (const r of built) {
      const row = (existing ?? []).find((e) => e.question_number === r.questionNumber);
      if (!row || row.solution === r.solution) continue;
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
      .in("question_number", figureItems.map(String));
    if (fErr) throw new Error(`figure row lookup failed: ${fErr.message}`);
    let uploaded = 0;
    for (const n of figureItems) {
      const row = (rows ?? []).find((r) => r.question_number === String(n));
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
      .in("question_number", graceNumbers.map(String));
    if (gErr) throw new Error(`grace row lookup failed: ${gErr.message}`);
    const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
    const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
    const known = new Set(list.map((f) => f.id));
    let added = 0;
    for (const n of graceNumbers) {
      const row = (gRows ?? []).find((r) => r.question_number === String(n));
      if (!row || known.has(row.id)) continue;
      list.push({ id: row.id, reason: `UPSC CAPF (AC) ${paper.pyqYear} Q${n}: ${notices.get(n)!.slice(0, 160)} (scripts/capf)` });
      added++;
    }
    if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
    console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
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
  if ((linked ?? 0) !== pat.questions) {
    console.log(`\n!! expected ${pat.questions} row(s) for this paper, found ${linked}.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
