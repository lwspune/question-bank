/**
 * Commit one MPSC paper: English rows, then their Marathi, then figures.
 *
 *   npx tsx scripts/mpsc/commit.ts 2024-b            # dry-run: validate, write nothing
 *   npx tsx scripts/mpsc/commit.ts 2024-b --apply
 *
 * Reads data/<id>.merged.json (merge.ts --write) + data/<id>.key.json (keys.ts
 * --write) + data/figures/<id>/q<N>.png (extract.py figures).
 *
 * ORDER, and why:
 *  1. English rows through commitStaged — the same validator, dedup and
 *     content_hash as every upload. English is the canonical row. A question
 *     the Commission cancelled is committed with NO correct option and a
 *     notice (cancelled_note, migration 0119), never dropped or keyed.
 *  2. The whole paper set PRIVATE. commitStaged inserts PUBLIC by default
 *     (migration 0022); a paper goes live only by flip-public.ts, after its
 *     Marathi has been read in a browser.
 *  3. Marathi via put_question_translation — one transaction per question
 *     (question + its four options), options matched by LABEL. Upsert, so a
 *     corrected transcription re-runs cleanly without touching the English.
 *  4. Figures to the question-images bucket, image_url set.
 *
 * Rollback is by source_file (one label per paper, see config.ts): deleting
 * those questions cascades to their options and translations.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { CREATED_BY, DATA_DIR, EXAM_ID, ORG_ID, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { buildRecords, parityIssues, type BilingualQuestion, type KeyLetter } from "./lib";

const BUCKET = "question-images";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");

  for (const kind of ["merged", "key"]) {
    if (!existsSync(dataPath(paper.id, kind))) throw new Error(`${dataPath(paper.id, kind)} missing`);
  }
  const questions: BilingualQuestion[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
  const key: Record<number, KeyLetter> = JSON.parse(readFileSync(dataPath(paper.id, "key"), "utf8")).key;
  const waiverFile = dataPath(paper.id, "waivers");
  const waivers: Record<string, string> = existsSync(waiverFile) ? JSON.parse(readFileSync(waiverFile, "utf8")) : {};

  // The notice a cancelled question carries (migration 0119). It names the
  // sitting, because "cancelled" is a fact about one paper's final key.
  const cancelledNote =
    `Cancelled by MPSC in the final answer key for this paper (${paper.pyqNote}). ` +
    `No option is correct. In PYQ Vault mocks it is awarded to every candidate.`;
  const { rows, cancelled, errors } = buildRecords(questions, key, cancelledNote);
  const nl = (s: string) => normalizeNewlines(s);
  for (const r of rows) {
    r.question = nl(r.question);
    if (r.context) r.context = nl(r.context);
  }

  // Refuse to write a paper whose two versions still disagree unexplained.
  const unexplained = questions.filter((q) => parityIssues(q).length && !waivers[q.n]).map((q) => q.n);
  if (unexplained.length) errors.push(`parity flags without a waiver: Q${unexplained.join(", Q")}`);

  const parsed = [];
  for (const r of rows) {
    const v = validateRow(r);
    if (v.errors.length) errors.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }
  const figures = questions.filter((q) => q.figure).map((q) => q.n);
  for (const n of figures) {
    if (!existsSync(join(DATA_DIR, "figures", paper.id, `q${n}.png`))) errors.push(`Q${n}: figure crop missing — run extract.py figures`);
  }

  console.log(`${paper.id} "${paper.pyqNote}" source_file ${paper.sourceFile}`);
  console.log(
    `${questions.length} transcribed · ${rows.length} rows · cancelled [${cancelled.join(",")}] · figures [${figures.join(",")}]`
  );
  if (rows.length !== QUESTIONS_PER_PAPER) errors.push(`${rows.length} rows, expected ${QUESTIONS_PER_PAPER}`);
  if (errors.length) {
    for (const e of errors) console.log(`  - ${e}`);
    throw new Error(`${errors.length} validation error(s) — nothing written`);
  }
  console.log("VALIDATION: ok");
  if (!apply) return console.log("[dry-run] pass --apply to write.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Was any of it already live? Then this run would unpublish it.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) {
    throw new Error(`${publicBefore} row(s) of ${paper.sourceFile} are PUBLIC; re-run with --allow-unpublish to proceed.`);
  }

  let { data: job } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", paper.sourceFile)
    .limit(1)
    .maybeSingle();
  if (!job) {
    const ins = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: paper.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length })
      .select("id")
      .single();
    if (ins.error) throw new Error(`upload_jobs insert failed: ${ins.error.message}`);
    job = ins.data;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID,
    filename: paper.sourceFile,
    createdBy: CREATED_BY,
    rows: parsed,
    uploadJobId: job!.id,
    pyqYear: paper.pyqYear,
    pyqNote: paper.pyqNote,
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);
  if (result.skipped) console.log(`!! ${result.skipped} row(s) deduped into existing rows — investigate.`);

  const { error: vErr } = await client
    .from("questions")
    .update({ visibility: "PRIVATE" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (vErr) throw new Error(`visibility update failed: ${vErr.message}`);

  // Marathi. Map committed rows back by question_number.
  const { data: committed, error: cErr } = await client
    .from("questions")
    .select("id, question_number, options(id, label)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (cErr) throw new Error(`read-back failed: ${cErr.message}`);
  const byNumber = new Map((committed ?? []).map((r) => [Number(r.question_number), r]));

  let translated = 0;
  const problems: string[] = [];
  for (const q of questions) {
    const row = byNumber.get(q.n);
    if (!row) {
      problems.push(`Q${q.n}: no committed row`);
      continue;
    }
    const opts = [...(row.options as { id: string; label: string }[])].sort((a, b) => a.label.localeCompare(b.label));
    if (opts.length !== 4) {
      problems.push(`Q${q.n}: ${opts.length} options in the bank`);
      continue;
    }
    const { error } = await client.rpc("put_question_translation", {
      p_question_id: row.id,
      p_lang: "mr",
      p_text: nl(q.mr.stem),
      p_context: q.mr.context ? nl(q.mr.context) : null,
      p_solution: null,
      p_options: opts.map((o, i) => ({ option_id: o.id, text: nl(q.mr.options[i]) })),
    });
    if (error) problems.push(`Q${q.n}: ${error.message}`);
    else translated++;
  }
  console.log(`marathi: ${translated} question(s) translated`);

  for (const n of figures) {
    const row = byNumber.get(n);
    if (!row) continue;
    const path = `mpsc/${paper.id}/q${n}.png`;
    const bytes = readFileSync(join(DATA_DIR, "figures", paper.id, `q${n}.png`));
    const { error: upErr } = await client.storage.from(BUCKET).upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) {
      problems.push(`Q${n}: figure upload failed — ${upErr.message}`);
      continue;
    }
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(path);
    const { error } = await client.from("questions").update({ image_url: pub.publicUrl }).eq("id", row.id);
    if (error) problems.push(`Q${n}: image_url update failed — ${error.message}`);
  }
  console.log(`figures: ${figures.length} attached`);

  await client
    .from("upload_jobs")
    .update({
      status: problems.length ? "FAILED" : "COMPLETED",
      total_rows: committed?.length ?? 0,
      inserted: result.inserted,
      skipped: result.skipped,
      finished_at: new Date().toISOString(),
    })
    .eq("id", job!.id);

  if (problems.length) {
    for (const p of problems) console.log(`  !! ${p}`);
    process.exitCode = 1;
  }
  console.log(`done. ${committed?.length} row(s) for ${paper.sourceFile}, all PRIVATE.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
