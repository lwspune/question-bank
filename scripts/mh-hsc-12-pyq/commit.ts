/**
 * Commit one chapter of Maharashtra HSC Class-12 board PYQs — PRIVATE,
 * question_kind='pyq' — via the shared commitStaged pipeline.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/commit.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/commit.ts <chapterId> --apply  # write
 *
 * ONE COMMIT PER SITTING. pyq_year / pyq_month are set per commitStaged CALL,
 * not per row, and this corpus spans ten sittings — a single call would stamp
 * every question with one year. groupBySitting does the split; all groups share
 * one source_file and one upload_job, so rollback is still a single delete.
 *
 * Re-commit hazard: content_hash covers stem + options + ANSWER, so editing any
 * of those (including correcting a derived key) INSERTS a new row and orphans
 * the old one. Delete first:
 *     delete from questions where source_file = '<sourceFile>';
 * Editing only `solution` is safe — it is not hashed.
 *
 * Everything lands PRIVATE. flip-public.ts flips the rows that are answered.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { buildPyqRecords, groupBySitting, type PyqQuestion } from "./lib";
import { ORG_ID, EXAM_ID, CREATED_BY, requireChapter, questionsJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  if (ch.blockedOnTextbookChapter) {
    throw new Error(`${id} is blocked on ${ch.blockedOnTextbookChapter} — its DB chapter does not exist.`);
  }
  loadEnv();

  const questions = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PyqQuestion[];
  const sittings = groupBySitting(questions);

  // Build every group BEFORE writing anything, so a validation failure in the
  // last sitting cannot leave the first four committed.
  const built = sittings.map((s) => ({
    ...s,
    ...buildPyqRecords(
      { chapterName: ch.chapterName, subjectName: ch.subjectName, subtopics: ch.subtopics },
      s.questions,
    ),
  }));

  console.log(`\n${ch.subjectName} / ${ch.chapterName} — ${questions.length} board PYQs across ${sittings.length} sittings`);
  for (const g of built) {
    console.log(`  ${String(g.month ?? "(no month)").padStart(10)} ${g.year}  ${String(g.rows.length).padStart(3)} rows`);
  }
  const bySub = new Map<string, number>();
  for (const q of questions) bySub.set(q.subtopic, (bySub.get(q.subtopic) ?? 0) + 1);
  console.log("by subtopic:");
  for (const st of ch.subtopics) console.log(`  ${String(bySub.get(st) ?? 0).padStart(3)}  ${st}`);
  const fmt = questions.filter((q) => q.format === "mcq").length;
  console.log(`format: mcq=${fmt}  subjective=${questions.length - fmt}  with-figure=${questions.filter((q) => q.image).length}`);

  const flags = built.flatMap((g) => g.flags);
  if (flags.length) {
    console.log(`\nflags (${flags.length}):`);
    for (const f of flags) console.log(`  ${f.ref}: ${f.reason}`);
  }

  const unbalanced = questions.flatMap((q) => {
    const bad: string[] = [];
    for (const [name, v] of [["stem", q.stem], ["solution", q.solution ?? ""]] as const) {
      const open = (v.match(/\\\(/g) ?? []).length;
      const close = (v.match(/\\\)/g) ?? []).length;
      if (open !== close) bad.push(`${q.ref} ${name}: ${open} \\( vs ${close} \\)`);
    }
    for (const o of q.options ?? []) {
      const open = (o.text.match(/\\\(/g) ?? []).length;
      const close = (o.text.match(/\\\)/g) ?? []).length;
      if (open !== close) bad.push(`${q.ref} option ${o.label}: ${open} \\( vs ${close} \\)`);
    }
    return bad;
  });
  console.log(unbalanced.length ? `\nLaTeX imbalances (${unbalanced.length}):\n  ${unbalanced.join("\n  ")}` : "\nLaTeX delimiters balanced.");

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (unbalanced.length) throw new Error("refusing to commit with LaTeX imbalances.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existingJob } = await client
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", ch.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client.from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: ch.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: questions.length })
      .select("id").single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id;
  }
  console.log(`\nupload job: ${jobId}`);

  let inserted = 0, skipped = 0, failed = 0;
  for (const g of built) {
    const r = await commitStaged(client, {
      orgId: ORG_ID, examId: EXAM_ID, filename: ch.sourceFile, createdBy: CREATED_BY,
      rows: g.rows, uploadJobId: jobId,
      pyqYear: g.year, pyqMonth: g.month, pyqNote: ch.note,
    });
    inserted += r.inserted; skipped += r.skipped; failed += r.failed;
    console.log(`  ${String(g.month ?? "(no month)").padStart(10)} ${g.year}: inserted=${r.inserted} skipped=${r.skipped} failed=${r.failed}`);
    for (const e of r.errors) console.log(`     err row ${e.sourceRow}: ${e.message}`);
  }
  console.log(`commit total: inserted=${inserted} skipped=${skipped} failed=${failed}`);

  const { error: uErr, count } = await client.from("questions")
    .update({ visibility: "PRIVATE", question_kind: "pyq" }, { count: "exact" })
    .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='pyq'.`);

  // WHICH rows did the DB dedup swallow, and into what?
  //
  // content_hash is unique on (org_id, exam_id, content_hash) — per EXAM, not
  // per chapter. This corpus adds board PYQs to chapters that already hold the
  // Balbharati textbook exercises, and ~30% of these questions have a
  // near-verbatim twin there. Where the match is EXACT the PYQ is absorbed into
  // the existing practice row: no pyq row, no year, no provenance, and the only
  // signal is `skipped=N`. Name them, because a silent skip in a PYQ ingest is
  // indistinguishable from a question that was never in the paper.
  if (skipped) {
    const norm = (t: string) => t.trim().replace(/\s+/g, " ");
    const { data: landed } = await client.from("questions").select("text")
      .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
    const have = new Set((landed ?? []).map((r) => norm(r.text as string)));
    const absorbed = questions.filter((q) => !have.has(norm(q.stem)));
    console.log(`\n${absorbed.length} row(s) ABSORBED by an existing question (exam-scoped content_hash):`);
    const { contentHash, subjectiveContentHash } = await import("../../src/lib/upload/hash");
    for (const q of absorbed) {
      // Must use the SAME helper the build used, or the lookup silently misses:
      // a subjective row is hashed under its own namespace, so the MCQ hash
      // finds nothing and the twin reads as "unidentified".
      const hash =
        q.format === "subjective"
          ? subjectiveContentHash(q.stem, null)
          : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
      const { data: twin } = await client.from("questions")
        .select("question_kind,source_file,chapters(name)")
        .eq("exam_id", EXAM_ID).eq("content_hash", hash).maybeSingle();
      const chapterName = Array.isArray(twin?.chapters)
        ? (twin.chapters[0] as { name: string } | undefined)?.name
        : (twin?.chapters as unknown as { name: string } | null)?.name;
      const into = twin
        ? `${twin.question_kind} row in ${chapterName ?? "?"} (${twin.source_file})`
        : "an unidentified row";
      console.log(`  ${q.ref} [${q.questionNumber}, ${q.pyqMonth ?? ""} ${q.pyqYear}] -> ${into}`);
      console.log(`     ${q.stem.slice(0, 100)}`);
    }
    console.log(
      `  These board PYQs now have NO pyq row and NO year. That is a coverage fact, not a\n` +
      `  failure — the question IS in the bank — but it must be recorded rather than inferred.`,
    );
  }

  const { count: linked } = await client.from("questions")
    .select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  await client.from("upload_jobs").update({
    status: "COMPLETED", total_rows: linked ?? 0, inserted, skipped, finished_at: new Date().toISOString(),
  }).eq("id", jobId);
  console.log(`done. ${linked} rows linked to job ${jobId}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
