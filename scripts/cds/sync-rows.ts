/**
 * Re-sync named CDS English rows from their source after a SECTION change, in place (ids kept).
 *
 *   npx tsx scripts/cds/sync-rows.ts <paperId> <q> [<q> ...] --why="<reason>"           # dry run
 *   npx tsx scripts/cds/sync-rows.ts <paperId> <q> [<q> ...] --why="<reason>" --apply   # write
 *
 * WHEN. A <paper>.sections.json edit (a section's type, directions or boundaries) moves a row's
 * chapter, subtopic, context and set — fields apply-notes-fixes.ts deliberately does not touch, and
 * that a re-commit could only reach by minting new uuids (orphaning concept tags and mock refs).
 * Found during the /notes pass: 2024-2 Q16-20 are printed as idioms but were filed as sentence
 * completion; 2025-2 Q96-100 sit under their own word-usage directions but were filed with the
 * word-pair section above them.
 *
 * Each row is rebuilt with buildRecords -> normalizeNewlines -> validateRow (the commit pipeline)
 * and the rebuilt text, context, solution, options, content_hash, chapter, subtopic and set_id
 * (`<upload_job_id>:<setLabel>`, the commitStaged rule) are written onto the EXISTING row. The
 * chapter must already exist under CDS English; a missing subtopic is created in it. One
 * stem_fixed review per row (run "notes:cds-english").
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";
import { buildRecords, normalizeQuestions, type Section, type Underlines } from "./lib";
import { EXAM_ID, dataPath, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const why = args.find((a) => a.startsWith("--why="))?.slice(6);
  const [pid, ...rest] = args.filter((a) => !a.startsWith("--"));
  const nums = rest.map(Number);
  if (!pid || !nums.length || nums.some((n) => !Number.isInteger(n)) || !why) {
    throw new Error('usage: sync-rows.ts <paperId> <q> [...] --why="..." [--apply]');
  }
  const paper = requirePaper(pid);
  const sections: Section[] = JSON.parse(readFileSync(dataPath(paper.id, "sections"), "utf8"));
  const ulPath = dataPath(paper.id, "underlines");
  const underlines: Underlines = existsSync(ulPath) ? JSON.parse(readFileSync(ulPath, "utf8")) : {};
  const { rows } = buildRecords(sections, normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"))), underlines);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: subj, error: se } = await db.from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", "English").single();
  if (se || !subj) throw new Error(`CDS English subject: ${se?.message}`);

  const reviews: ReviewInput[] = [];
  for (const n of nums) {
    const r = rows.find((x) => Number(x.questionNumber) === n);
    if (!r) throw new Error(`${pid} Q${n}: not built from source`);
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
    const v = validateRow(r);
    if (v.errors.length || !v.parsed) throw new Error(`${pid} Q${n}: ${v.errors.join("; ")}`);
    const p = v.parsed;

    const { data: live, error: le } = await db.from("questions")
      .select("id, upload_job_id, text, context, set_id, content_hash, chapters(name), subtopics(name)")
      .eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile).eq("question_number", String(n));
    if (le) throw le;
    if (live?.length !== 1) throw new Error(`${pid} Q${n}: expected 1 live row, found ${live?.length}`);
    const row = live[0] as any;

    const { data: ch } = await db.from("chapters").select("id").eq("subject_id", subj.id).eq("name", p.chapterName).maybeSingle();
    if (!ch) throw new Error(`${pid} Q${n}: chapter "${p.chapterName}" does not exist under CDS English`);
    const setId = p.setLabel ? `${row.upload_job_id}:${p.setLabel}` : null;

    console.log(`${pid} Q${n} (${row.id.slice(0, 8)})`);
    console.log(`  chapter  ${row.chapters?.name} / ${row.subtopics?.name}  ->  ${p.chapterName} / ${p.subtopicName}`);
    console.log(`  set      ${row.set_id}  ->  ${setId}`);
    if (row.context !== (p.context ?? null)) console.log(`  context  ${String(row.context).slice(0, 70)}  ->  ${String(p.context).slice(0, 70)}`);
    if (row.text !== p.text) console.log(`  text     ${JSON.stringify(row.text).slice(0, 70)}  ->  ${JSON.stringify(p.text).slice(0, 70)}`);
    if (!apply) continue;

    let { data: st } = await db.from("subtopics").select("id").eq("chapter_id", ch.id).eq("name", p.subtopicName!).maybeSingle();
    if (!st) {
      const ins = await db.from("subtopics").insert({ chapter_id: ch.id, name: p.subtopicName }).select("id").single();
      if (ins.error) throw ins.error;
      st = ins.data;
    }
    for (const o of p.options) {
      const { error } = await db.from("options").update({ text: o.text, is_correct: o.isCorrect }).eq("question_id", row.id).eq("label", o.label);
      if (error) throw error;
    }
    const { error: ue } = await db.from("questions").update({
      text: p.text, context: p.context ?? null, solution: p.solution ?? null, content_hash: p.contentHash,
      chapter_id: ch.id, subtopic_id: st!.id, set_id: setId,
    }).eq("id", row.id);
    if (ue) throw ue;
    reviews.push({ questionId: row.id, reviewedContentHash: p.contentHash, method: "blind_rederivation", verdict: "stem_fixed",
      runLabel: "notes:cds-english", derivedModel: "claude-opus-5", note: why.slice(0, 480) });
  }
  if (!apply) return console.log("\ndry run — add --apply to write");
  console.log(formatRecordResult(await recordReviews(db, reviews)));
}

main().catch((e) => { console.error(e); process.exit(1); });
