// Apply a chapter's committed shuffle plan (data/<chapterId>.shuffles.json) to
// rows ALREADY in the database: swap the two option texts, move is_correct,
// and update content_hash to the pipeline-computed value — so a later
// commit.ts re-ingest (which applies the same plan) is a clean no-op.
//
//   npx tsx scripts/worksheets/apply-shuffles.ts <chapterId>          # dry-run
//   npx tsx scripts/worksheets/apply-shuffles.ts <chapterId> --apply
//
// Ends with a full-chapter hash verification: every DB row's content_hash must
// equal the pipeline's computed hash (shuffled or not) or the script exits 1.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, EXAM_ID, DATA } from "./config";
import { readChapterQuestions } from "./read";
import { buildWorksheetRows, type ShufflePlan, type WorksheetOverride } from "./lib";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const overridesPath = join(DATA, `${chapter.id}.overrides.json`);
  const overrides: Record<string, WorksheetOverride> = existsSync(overridesPath)
    ? JSON.parse(readFileSync(overridesPath, "utf8"))
    : {};
  const shufflesPath = join(DATA, `${chapter.id}.shuffles.json`);
  if (!existsSync(shufflesPath)) throw new Error(`no shuffle plan at ${shufflesPath} — run plan-shuffles first`);
  const shuffles: ShufflePlan = JSON.parse(readFileSync(shufflesPath, "utf8"));

  // Final (shuffled) pipeline state — the single source of truth for texts/keys/hashes.
  const files = readChapterQuestions(chapter);
  const finalRows = new Map<string, ParsedRowPayload>();
  for (const f of files) {
    const res = buildWorksheetRows(
      { chapterName: chapter.chapterName, subtopicName: f.subtopicName, fileIndex: f.fileIndex },
      f.questions,
      overrides,
      shuffles
    );
    for (const r of res.rows) finalRows.set(r.questionNumber!, r);
  }

  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: dbRows, error } = await client
    .from("questions")
    .select("id, question_number, content_hash, options(id, label, text, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", chapter.sourceFile);
  if (error) throw new Error(error.message);
  const byNumber = new Map((dbRows ?? []).map((r) => [r.question_number as string, r]));

  let updated = 0;
  for (const [qid] of Object.entries(shuffles)) {
    const want = finalRows.get(qid);
    const db = byNumber.get(qid);
    if (!want || !db) throw new Error(`${qid}: in shuffle plan but missing from ${!want ? "pipeline" : "DB"}`);

    const wantByLabel = new Map(want.options.map((o) => [o.label, o]));
    const changes: { id: string; text: string; is_correct: boolean }[] = [];
    for (const dbOpt of db.options as { id: string; label: string; text: string; is_correct: boolean }[]) {
      const w = wantByLabel.get(dbOpt.label as "A" | "B" | "C" | "D")!;
      if (dbOpt.text !== w.text || dbOpt.is_correct !== w.isCorrect) {
        changes.push({ id: dbOpt.id, text: w.text, is_correct: w.isCorrect });
      }
    }
    if (changes.length === 0 && db.content_hash === want.contentHash) continue; // already applied

    console.log(`${qid}: ${changes.length} option updates, hash ${String(db.content_hash).slice(0, 8)} -> ${want.contentHash.slice(0, 8)}`);
    if (!apply) continue;

    // Collision guard: the new hash must not belong to another row in this exam.
    const { data: clash } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", EXAM_ID)
      .eq("content_hash", want.contentHash)
      .neq("id", db.id)
      .maybeSingle();
    if (clash) throw new Error(`${qid}: content_hash collision with question ${clash.id}`);

    for (const c of changes) {
      const { error: oErr } = await client.from("options").update({ text: c.text, is_correct: c.is_correct }).eq("id", c.id);
      if (oErr) throw new Error(`${qid}: option update failed: ${oErr.message}`);
    }
    const { error: qErr } = await client.from("questions").update({ content_hash: want.contentHash }).eq("id", db.id);
    if (qErr) throw new Error(`${qid}: hash update failed: ${qErr.message}`);
    updated++;
  }
  console.log(apply ? `applied ${updated} shuffles.` : `[dry-run] would apply ${Object.keys(shuffles).length} shuffles.`);

  if (apply) {
    // Whole-chapter idempotency proof: DB hash must equal pipeline hash everywhere.
    const { data: fresh } = await client
      .from("questions")
      .select("question_number, content_hash")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", chapter.sourceFile);
    let mismatches = 0;
    for (const r of fresh ?? []) {
      const want = finalRows.get(r.question_number as string);
      if (!want || want.contentHash !== r.content_hash) {
        console.error(`HASH MISMATCH ${r.question_number}: db=${r.content_hash} pipeline=${want?.contentHash}`);
        mismatches++;
      }
    }
    if (mismatches) {
      console.error(`${mismatches} rows out of sync — a re-ingest would duplicate them.`);
      process.exit(1);
    }
    console.log(`hash verification: all ${(fresh ?? []).length} rows match the pipeline — re-ingest is a no-op.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
