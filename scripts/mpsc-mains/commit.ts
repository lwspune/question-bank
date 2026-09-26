/**
 * Commit one MPSC Mains paper, once per exam it was sat for.
 *
 *   npx tsx scripts/mpsc-mains/commit.ts aso-2017            # dry-run: validate, write nothing
 *   npx tsx scripts/mpsc-mains/commit.ts aso-2017 --apply
 *
 * Reads data/<id>.merged.json + data/<id>.key.json (+ figures).
 *
 * ORDER, per exam:
 *  1. Rows through commitStaged — the same validator, dedup and content_hash as
 *     every upload. A row's canonical text is the language it was PRINTED in:
 *     most of these questions exist in one language only (lib.ts).
 *  2. The paper set PRIVATE. commitStaged inserts PUBLIC by default; an exam
 *     goes live only by flip-public.ts.
 *  3. The Marathi of a question printed in BOTH languages (the 2018 joint
 *     paper's GK) via put_question_translation.
 *  4. A DERIVED paper (no official key on file) is stamped: `derived_model` +
 *     `derived_at`, and a one-line solution saying the answer was worked out,
 *     not published — in the question's own language.
 *  5. Figures to the question-images bucket.
 *
 * Rollback is by source_file (one label per paper per exam, config.ts).
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { CREATED_BY, DATA_DIR, EXAMS, ORG_ID, dataPath, pyqNoteFor, requirePaper, sourceFileFor } from "./config";
import { buildRows, questionIssues, type KeyLetter, type MainsQuestion } from "./lib";

const BUCKET = "question-images";
export const DERIVED_MODEL = "claude-opus-5-5 · single pass (MPSC Mains: no official key on file)";
const DERIVED_NOTE = {
  en: "No official answer key is on file for this paper. This answer was worked out by PYQ Vault, not published by MPSC.",
  mr: "या प्रश्नपत्रिकेची अधिकृत उत्तरतालिका उपलब्ध नाही. हे उत्तर PYQ Vault ने काढले आहे; ते MPSC ने प्रसिद्ध केलेले नाही.",
};

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");

  for (const kind of ["merged", "key"]) {
    if (!existsSync(dataPath(paper.id, kind))) throw new Error(`${dataPath(paper.id, kind)} missing`);
  }
  const questions: MainsQuestion[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
  const keyJson = JSON.parse(readFileSync(dataPath(paper.id, "key"), "utf8"));
  const key: Record<number, KeyLetter> = keyJson.key;
  if (Boolean(keyJson.derived) !== Boolean(paper.derived)) {
    throw new Error(`key.json derived=${keyJson.derived} disagrees with config derived=${paper.derived}`);
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const nl = (s: string) => normalizeNewlines(s);
  const byN = new Map(questions.map((q) => [q.n, q]));

  for (const exam of paper.exams) {
    const { data: examRow, error: eErr } = await client.from("exams").select("id").eq("name", EXAMS[exam].name).maybeSingle();
    if (eErr || !examRow) throw new Error(`exam "${EXAMS[exam].name}" not found — run seed.ts --apply`);
    const examId = examRow.id as string;
    const sourceFile = sourceFileFor(paper, exam);
    const pyqNote = pyqNoteFor(paper, exam);

    const cancelledNote =
      `Cancelled by MPSC in the final answer key for this paper (${pyqNote}). ` +
      `No option is correct. In PYQ Vault mocks it is awarded to every candidate.`;
    const { rows, cancelled, errors } = buildRows(questions, key, cancelledNote);
    errors.push(...questions.flatMap(questionIssues));
    for (const r of rows) {
      r.question = nl(r.question);
      if (r.context) r.context = nl(r.context);
    }
    const parsed = [];
    for (const r of rows) {
      const v = validateRow(r);
      if (v.errors.length) errors.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
      else parsed.push(v.parsed!);
    }
    const figures = questions.filter((q) => q.figure).map((q) => q.n);
    for (const n of figures) {
      if (!existsSync(join(DATA_DIR, "figures", paper.id, `q${n}.png`))) errors.push(`Q${n}: figure crop missing`);
    }
    if (rows.length !== paper.questions) errors.push(`${rows.length} rows, expected ${paper.questions}`);

    console.log(`${paper.id} → ${EXAMS[exam].name} · "${pyqNote}" · ${sourceFile}`);
    console.log(
      `  ${rows.length} rows · cancelled [${cancelled.join(",")}] · figures [${figures.join(",")}]` +
        ` · translated ${questions.filter((q) => q.translation).length}${paper.derived ? " · DERIVED key" : ""}`
    );
    if (errors.length) {
      for (const e of errors) console.log(`  - ${e}`);
      throw new Error(`${errors.length} validation error(s) — nothing written`);
    }
    if (!apply) {
      console.log("  VALIDATION: ok [dry-run]");
      continue;
    }

    const { count: publicBefore } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", examId)
      .eq("source_file", sourceFile)
      .eq("visibility", "PUBLIC");
    if ((publicBefore ?? 0) > 0 && !args.includes("--allow-unpublish")) {
      throw new Error(`${publicBefore} row(s) of ${sourceFile} are PUBLIC; re-run with --allow-unpublish.`);
    }

    let { data: job } = await client
      .from("upload_jobs")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("filename", sourceFile)
      .limit(1)
      .maybeSingle();
    if (!job) {
      const ins = await client
        .from("upload_jobs")
        .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: parsed.length })
        .select("id")
        .single();
      if (ins.error) throw new Error(`upload_jobs insert failed: ${ins.error.message}`);
      job = ins.data;
    }

    const result = await commitStaged(client, {
      orgId: ORG_ID,
      examId,
      filename: sourceFile,
      createdBy: CREATED_BY,
      rows: parsed,
      uploadJobId: job!.id,
      pyqYear: paper.pyqYear,
      pyqNote,
    });
    console.log(`  commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
    for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);
    if (result.skipped) console.log(`  !! ${result.skipped} row(s) deduped into existing rows — investigate.`);

    const { error: vErr } = await client
      .from("questions")
      .update({ visibility: "PRIVATE" })
      .eq("exam_id", examId)
      .eq("source_file", sourceFile);
    if (vErr) throw new Error(`visibility update failed: ${vErr.message}`);

    const { data: committed, error: cErr } = await client
      .from("questions")
      .select("id, question_number, options(id, label)")
      .eq("exam_id", examId)
      .eq("source_file", sourceFile);
    if (cErr) throw new Error(`read-back failed: ${cErr.message}`);
    const byNumber = new Map((committed ?? []).map((r) => [Number(r.question_number), r]));

    const problems: string[] = [];
    let translated = 0;
    for (const [n, row] of byNumber) {
      const q = byN.get(n);
      if (!q) {
        problems.push(`Q${n}: committed row has no transcription`);
        continue;
      }
      if (q.translation) {
        const opts = [...(row.options as { id: string; label: string }[])].sort((a, b) => a.label.localeCompare(b.label));
        const { error } = await client.rpc("put_question_translation", {
          p_question_id: row.id,
          p_lang: "mr",
          p_text: nl(q.translation.stem),
          p_context: q.translation.context ? nl(q.translation.context) : null,
          p_solution: paper.derived ? DERIVED_NOTE.mr : null,
          p_options: opts.map((o, i) => ({ option_id: o.id, text: nl(q.translation!.options[i]) })),
        });
        if (error) problems.push(`Q${n}: translation — ${error.message}`);
        else translated++;
      }
      if (paper.derived) {
        const { error } = await client
          .from("questions")
          .update({ derived_model: DERIVED_MODEL, derived_at: new Date().toISOString(), solution: DERIVED_NOTE[q.lang] })
          .eq("id", row.id);
        if (error) problems.push(`Q${n}: derived stamp — ${error.message}`);
      }
    }
    console.log(`  translations ${translated}${paper.derived ? ` · derived stamps ${byNumber.size}` : ""}`);

    for (const n of figures) {
      const row = byNumber.get(n);
      if (!row) continue;
      const path = `mpsc-mains/${paper.id}/q${n}.png`;
      const bytes = readFileSync(join(DATA_DIR, "figures", paper.id, `q${n}.png`));
      const { error: upErr } = await client.storage.from(BUCKET).upload(path, bytes, { contentType: "image/png", upsert: true });
      if (upErr) {
        problems.push(`Q${n}: figure upload — ${upErr.message}`);
        continue;
      }
      const { data: pub } = client.storage.from(BUCKET).getPublicUrl(path);
      const { error } = await client.from("questions").update({ image_url: pub.publicUrl }).eq("id", row.id);
      if (error) problems.push(`Q${n}: image_url — ${error.message}`);
    }

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
    console.log(`  done. ${committed?.length} row(s), all PRIVATE.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
